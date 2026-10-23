import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "valid-parentheses",
  "title": "Valid Parentheses",
  "category": "Extras I",
  "difficulty": "Easy",
  "description": "Return whether the brackets are closed in the right order.",
  "companies": [
    "Agoda",
    "Grab"
  ],
  "leetcode": {
    "number": 20,
    "title": "Valid Parentheses",
    "slug": "valid-parentheses",
    "neetcode": "Stack"
  },
  "algorithms": [
    "String",
    "Stack"
  ],
  "functionName": "isValid",
  "trackedVariables": [
    "stack"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "\"()[]{}\"",
      "args": [
        "()[]{}"
      ],
      "expected": true
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "stack": [
      "i"
    ]
  },
  code: `function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);
    else if (stack.pop() !== pairs[ch]) return false;
  }
  return stack.length === 0;
}
`
};

export default problem;
