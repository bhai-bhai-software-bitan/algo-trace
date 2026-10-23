import * as parser from '@babel/parser';
import _traverse from '@babel/traverse';
import _generate from '@babel/generator';
import * as t from '@babel/types';
import type { TraceSnapshot } from '@/types/problem';

// Safe CJS/ESM interop for Next.js client bundling.
const traverse = (
  typeof _traverse === 'function' ? _traverse : (_traverse as { default: typeof _traverse }).default
) as typeof _traverse;

const generate = (
  typeof _generate === 'function' ? _generate : (_generate as { default: typeof _generate }).default
) as typeof _generate;

const MAX_STEPS = 500;

function isInjectedRecord(statement: t.Statement): boolean {
  return (
    t.isExpressionStatement(statement) &&
    t.isCallExpression(statement.expression) &&
    t.isIdentifier(statement.expression.callee, { name: '__record' })
  );
}

function createTraceCall(line: number, varNames: string[]) {
  const reads = varNames.map((varName) =>
    t.tryStatement(
      t.blockStatement([
        t.expressionStatement(
          t.assignmentExpression(
            '=',
            t.memberExpression(t.identifier('__out'), t.identifier(varName)),
            t.identifier(varName),
          ),
        ),
      ]),
      t.catchClause(t.identifier('__err'), t.blockStatement([])),
    ),
  );

  return t.expressionStatement(
    t.callExpression(t.identifier('__record'), [
      t.numericLiteral(line),
      t.arrowFunctionExpression(
        [],
        t.blockStatement([
          t.variableDeclaration('const', [
            t.variableDeclarator(t.identifier('__out'), t.objectExpression([])),
          ]),
          ...reads,
          t.returnStatement(t.identifier('__out')),
        ]),
      ),
    ]),
  );
}

function instrumentLoopBody(body: t.Statement, line: number, varNames: string[]) {
  if (!t.isBlockStatement(body)) return;
  if (body.body[0] && isInjectedRecord(body.body[0])) return;
  body.body.unshift(createTraceCall(line, varNames));
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function runAndTrace(
  code: string,
  functionName: string,
  args: unknown[],
  trackedVars: string[],
  pointerVars: string[] = [],
): { timeline: TraceSnapshot[]; result: unknown; error?: string } {
  const timeline: TraceSnapshot[] = [];
  const allVars = Array.from(new Set([...trackedVars, ...pointerVars]));

  if (!/^[A-Za-z_$][\w$]*$/.test(functionName)) {
    return { timeline, result: null, error: `Invalid function name: ${functionName}` };
  }

  try {
    const ast = parser.parse(code, { sourceType: 'script' });

    traverse(ast, {
      Statement(path) {
        if (isInjectedRecord(path.node)) {
          path.skip();
          return;
        }

        if (
          path.isBlockStatement() ||
          path.isFunctionDeclaration() ||
          path.isForStatement() ||
          path.isWhileStatement() ||
          path.isDoWhileStatement() ||
          path.isForOfStatement() ||
          path.isForInStatement() ||
          path.isIfStatement() ||
          path.node.loc == null
        ) {
          return;
        }

        const line = path.node.loc.start.line;
        const traceCall = createTraceCall(line, allVars);

        if (path.isReturnStatement()) {
          path.insertBefore(traceCall);
        } else if (path.isVariableDeclaration() || path.isExpressionStatement()) {
          const parent = path.parentPath;
          if (
            parent != null &&
            (parent.isForStatement() || parent.isForInStatement() || parent.isForOfStatement()) &&
            path.key === 'init'
          ) {
            return;
          }
          path.insertAfter(traceCall);
        }
      },
      ForStatement(path) {
        const line = path.node.loc?.start.line ?? 1;
        instrumentLoopBody(path.node.body, line, allVars);
      },
      WhileStatement(path) {
        const line = path.node.loc?.start.line ?? 1;
        instrumentLoopBody(path.node.body, line, allVars);
      },
      DoWhileStatement(path) {
        const line = path.node.loc?.start.line ?? 1;
        instrumentLoopBody(path.node.body, line, allVars);
      },
      ForOfStatement(path) {
        const line = path.node.loc?.start.line ?? 1;
        instrumentLoopBody(path.node.body, line, allVars);
      },
      ForInStatement(path) {
        const line = path.node.loc?.start.line ?? 1;
        instrumentLoopBody(path.node.body, line, allVars);
      },
    });

    const instrumentedCode = generate(ast).code;

    let stepCount = 0;
    let prevSerialized: Record<string, string> = {};

    const __record = (line: number, getVars: () => Record<string, unknown>) => {
      stepCount += 1;
      if (stepCount > MAX_STEPS) {
        throw new Error('Execution exceeded 500 steps (Infinite loop protection triggered).');
      }

      const rawVars = getVars();
      const clonedVars: Record<string, unknown> = {};
      const currentSerialized: Record<string, string> = {};
      const changedVars: string[] = [];

      for (const [key, value] of Object.entries(rawVars)) {
        if (value === undefined) continue;
        const serialized = JSON.stringify(value);
        clonedVars[key] = JSON.parse(serialized) as unknown;
        currentSerialized[key] = serialized;
        if (prevSerialized[key] !== serialized) {
          changedVars.push(key);
        }
      }

      prevSerialized = currentSerialized;

      timeline.push({
        step: timeline.length + 1,
        line,
        variables: clonedVars,
        changedVars,
      });
    };

    const runner = new Function(
      '__record',
      '__args',
      `${instrumentedCode}\nreturn ${functionName}(...__args);`,
    ) as (record: typeof __record, fnArgs: unknown[]) => unknown;

    const result = runner(__record, cloneJson(args));

    if (timeline.length > 0) {
      timeline[timeline.length - 1].returnValue = result !== undefined ? cloneJson(result) : undefined;
    }

    return { timeline, result };
  } catch (err: unknown) {
    return {
      timeline,
      result: null,
      error: err instanceof Error ? err.message : 'Unknown execution error',
    };
  }
}
