import * as parser from '@babel/parser';
import _traverse from '@babel/traverse';
import type { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

const traverse = (
  typeof _traverse === 'function' ? _traverse : (_traverse as { default: typeof _traverse }).default
) as typeof _traverse;

export type SolutionInspection = {
  trackedVariables: string[];
  pointerVariables: string[];
};

const MAX_SOURCE_CHARS = 200_000;

export function javascriptFileError(fileName: string): string | null {
  if (fileName.toLowerCase().endsWith('.js')) return null;
  return 'Only JavaScript (.js) can be visualized. TypeScript and other files are not played.';
}

export function inspectSolution(
  source: string,
  functionName: string,
): { ok: true; inspection: SolutionInspection } | { ok: false; error: string } {
  if (source.length > MAX_SOURCE_CHARS) {
    return { ok: false, error: 'That solution is larger than 200 KB.' };
  }
  if (!source.trim()) {
    return { ok: false, error: 'Paste a JavaScript function first.' };
  }

  let ast: t.File;
  try {
    ast = parser.parse(source, { sourceType: 'script' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Invalid JavaScript.';
    return { ok: false, error: message };
  }

  const found: { fn: t.Function | null } = { fn: null };

  traverse(ast, {
    Function(path: NodePath<t.Function>) {
      if (found.fn) return;
      if (
        path.isFunctionDeclaration() &&
        path.node.id?.name === functionName &&
        path.parentPath?.isProgram()
      ) {
        found.fn = path.node;
        return;
      }
      const declarator = path.parentPath;
      if (!declarator?.isVariableDeclarator()) return;
      if (!t.isIdentifier(declarator.node.id, { name: functionName })) return;
      const declaration = declarator.parentPath;
      if (declaration?.isVariableDeclaration() && declaration.parentPath?.isProgram()) {
        found.fn = path.node;
      }
    },
  });

  if (!found.fn) {
    return {
      ok: false,
      error: `Declare function ${functionName}(...) so this problem can call it.`,
    };
  }

  const tracked = new Set<string>();
  const pointers = new Set<string>();

  for (const param of found.fn.params) {
    if (t.isIdentifier(param)) tracked.add(param.name);
  }

  traverse(found.fn, {
    noScope: true,
    VariableDeclarator(path: NodePath<t.VariableDeclarator>) {
      if (t.isIdentifier(path.node.id)) tracked.add(path.node.id.name);
    },
    ForStatement(path: NodePath<t.ForStatement>) {
      collectLoopNames(path.node.init, pointers);
    },
    ForOfStatement(path: NodePath<t.ForOfStatement>) {
      collectLoopNames(path.node.left, pointers);
    },
    ForInStatement(path: NodePath<t.ForInStatement>) {
      collectLoopNames(path.node.left, pointers);
    },
  });

  return {
    ok: true,
    inspection: {
      trackedVariables: [...tracked],
      pointerVariables: [...pointers],
    },
  };
}

function collectLoopNames(node: t.Node | null | undefined, pointers: Set<string>) {
  if (!node) return;
  if (t.isVariableDeclaration(node)) {
    for (const declarator of node.declarations) {
      if (t.isIdentifier(declarator.id)) pointers.add(declarator.id.name);
    }
    return;
  }
  if (t.isIdentifier(node)) pointers.add(node.name);
}

export function parsePracticeCase(
  label: string,
  argsText: string,
  expectedText: string,
):
  | { ok: true; label: string; args: unknown[]; expected: unknown; inputSummary: string }
  | { ok: false; error: string } {
  const trimmedLabel = label.trim();
  if (!trimmedLabel) return { ok: false, error: 'Add a short label for this case.' };

  let args: unknown;
  try {
    args = JSON.parse(argsText);
  } catch {
    return {
      ok: false,
      error: 'Arguments must be a JSON array, like [[2, 7, 11, 15], 9].',
    };
  }
  if (!Array.isArray(args)) {
    return { ok: false, error: 'Arguments must be a JSON array of the function inputs.' };
  }

  let expected: unknown;
  try {
    expected = JSON.parse(expectedText);
  } catch {
    return { ok: false, error: 'Expected value must be JSON, like [0, 1] or true.' };
  }

  return {
    ok: true,
    label: trimmedLabel,
    args,
    expected,
    inputSummary: argsText.trim(),
  };
}
