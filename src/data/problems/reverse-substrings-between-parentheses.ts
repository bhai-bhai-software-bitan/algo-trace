import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "reverse-substrings-between-parentheses",
  "title": "Reverse Substrings Between Each Pair of Parentheses",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Reverse the text inside each pair of parentheses, from the inside out. Return the string with the parentheses removed.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 1190,
    "title": "Reverse Substrings Between Each Pair of Parentheses",
    "slug": "reverse-substrings-between-each-pair-of-parentheses"
  },
  "algorithms": [
    "String",
    "Stack"
  ],
  "functionName": "reverseParentheses",
  "trackedVariables": [
    "stack"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "\"(u(love)i)\"",
      "args": [
        "(u(love)i)"
      ],
      "expected": "iloveu"
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
  code: `function reverseParentheses(s) {
  const stack = [''];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') stack.push('');
    else if (s[i] === ')') {
      const chunk = stack.pop().split('').reverse().join('');
      stack[stack.length - 1] += chunk;
    } else stack[stack.length - 1] += s[i];
  }
  return stack[0];
}
`
};

export default problem;
