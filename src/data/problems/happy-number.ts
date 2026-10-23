import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "happy-number",
  "title": "Happy Number",
  "category": "Extras I",
  "difficulty": "Easy",
  "description": "Replace a number by the sum of the squares of its digits. Return whether you reach 1.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 202,
    "title": "Happy Number",
    "slug": "happy-number",
    "neetcode": "Math"
  },
  "algorithms": [
    "Hash Table",
    "Math"
  ],
  "functionName": "isHappy",
  "trackedVariables": [
    "seen"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "19",
      "args": [
        19
      ],
      "expected": true
    }
  ],
  code: `function isHappy(n) {
  const seen = {};
  while (n !== 1 && !seen[n]) {
    seen[n] = true;
    let next = 0;
    let value = n;
    while (value > 0) {
      const digit = value % 10;
      next += digit * digit;
      value = Math.floor(value / 10);
    }
    n = next;
  }
  return n === 1;
}
`
};

export default problem;
