import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "climbing-stairs",
  "title": "Climbing Stairs",
  "category": "Extras I",
  "difficulty": "Easy",
  "description": "You can climb 1 or 2 steps. Return how many ways you can climb n steps.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 70,
    "title": "Climbing Stairs",
    "slug": "climbing-stairs",
    "neetcode": "1-D Dynamic Programming"
  },
  "algorithms": [
    "Math",
    "Dynamic Programming"
  ],
  "functionName": "climbStairs",
  "trackedVariables": [
    "result"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "5",
      "args": [
        5
      ],
      "expected": 8
    }
  ],
  "pointerVariables": [
    "i"
  ],
  code: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev = 1;
  let curr = 2;
  for (let i = 3; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}
`
};

export default problem;
