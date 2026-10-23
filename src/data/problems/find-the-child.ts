import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "find-the-child",
  "title": "Find the Child Who Has the Ball",
  "category": "Extras I",
  "difficulty": "Easy",
  "description": "n children stand in a line and pass a ball back and forth. Return who holds it after k seconds.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 3178,
    "title": "Find the Child Who Has the Ball After K Seconds",
    "slug": "find-the-child-who-has-the-ball-after-k-seconds"
  },
  "algorithms": [
    "Math",
    "Simulation"
  ],
  "functionName": "numberOfChild",
  "trackedVariables": [
    "result"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "3, 5",
      "args": [
        3,
        5
      ],
      "expected": 1
    }
  ],
  code: `function numberOfChild(n, k) {
  const cycle = (n - 1) * 2;
  const t = k % cycle;
  if (t < n) return t;
  return cycle - t;
}
`
};

export default problem;
