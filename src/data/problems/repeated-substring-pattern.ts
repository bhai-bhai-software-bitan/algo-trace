import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "repeated-substring-pattern",
  "title": "Repeated Substring Pattern",
  "category": "Extras I",
  "difficulty": "Easy",
  "description": "Return whether the string is built by repeating one shorter string.",
  "companies": [
    "Grab"
  ],
  "leetcode": {
    "number": 459,
    "title": "Repeated Substring Pattern",
    "slug": "repeated-substring-pattern"
  },
  "algorithms": [
    "String",
    "String Matching"
  ],
  "functionName": "repeatedSubstringPattern",
  "trackedVariables": [
    "result"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "\"abab\"",
      "args": [
        "abab"
      ],
      "expected": true
    }
  ],
  code: `function repeatedSubstringPattern(s) {
  return (s + s).slice(1, -1).indexOf(s) !== -1;
}
`
};

export default problem;
