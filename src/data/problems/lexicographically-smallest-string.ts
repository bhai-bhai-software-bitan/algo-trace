import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "lexicographically-smallest-string",
  "title": "Lexicographically Smallest String After Substring Operation",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "You may decrement one contiguous run of letters that are not a. Return the lexicographically smallest string.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 2734,
    "title": "Lexicographically Smallest String After Substring Operation",
    "slug": "lexicographically-smallest-string-after-substring-operation"
  },
  "algorithms": [
    "String",
    "Greedy"
  ],
  "functionName": "smallestString",
  "trackedVariables": [
    "chars"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "\"cbabc\"",
      "args": [
        "cbabc"
      ],
      "expected": "baabc"
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "chars": [
      "i"
    ]
  },
  code: `function smallestString(s) {
  const chars = s.split('');
  let i = 0;
  while (i < chars.length && chars[i] === 'a') i += 1;
  if (i === chars.length) {
    chars[chars.length - 1] = 'z';
    return chars.join('');
  }
  while (i < chars.length && chars[i] !== 'a') {
    chars[i] = String.fromCharCode(chars[i].charCodeAt(0) - 1);
    i += 1;
  }
  return chars.join('');
}
`
};

export default problem;
