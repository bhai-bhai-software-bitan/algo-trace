export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Company = 'Agoda' | 'Grab';

export interface LeetCodeMap {
  number?: number;
  title: string;
  slug: string;
  neetcode?: string;
}

export interface TestCase {
  id: string;
  label: string;
  inputSummary: string;
  args: unknown[];
  expected: unknown;
}

export interface ProblemEntry {
  number?: number;
  slug: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  description: string;
  context?: string;
  companies?: Company[];
  leetcode?: LeetCodeMap;
  algorithms?: string[];
  functionName: string;
  trackedVariables: string[];
  pointerVariables?: string[];
  pointerTargets?: Record<string, string[]>;
  code: string;
  testCases: TestCase[];
}

export interface TraceSnapshot {
  step: number;
  line: number;
  variables: Record<string, unknown>;
  changedVars: string[];
  returnValue?: unknown;
}
