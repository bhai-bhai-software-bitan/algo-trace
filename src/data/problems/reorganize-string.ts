import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "reorganize-string",
  "title": "Reorganize String",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Rearrange the letters so no two identical letters are adjacent. Return an empty string when that is impossible.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 767,
    "title": "Reorganize String",
    "slug": "reorganize-string"
  },
  "algorithms": [
    "Hash Table",
    "String",
    "Greedy"
  ],
  "functionName": "reorganizeString",
  "trackedVariables": [
    "arr"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "\"aab\"",
      "args": [
        "aab"
      ],
      "expected": "aba"
    }
  ],
  "pointerVariables": [
    "idx"
  ],
  "pointerTargets": {
    "arr": [
      "idx"
    ]
  },
  code: `function reorganizeString(s) {
  const count = {};
  for (let i = 0; i < s.length; i++) count[s[i]] = (count[s[i]] || 0) + 1;
  const keys = Object.keys(count).sort((a, b) => count[b] - count[a] || a.charCodeAt(0) - b.charCodeAt(0));
  if (count[keys[0]] > Math.floor((s.length + 1) / 2)) return '';
  const arr = [];
  for (let i = 0; i < s.length; i++) arr.push('');
  let idx = 0;
  for (let k = 0; k < keys.length; k++) {
    for (let c = 0; c < count[keys[k]]; c++) {
      if (idx >= s.length) idx = 1;
      arr[idx] = keys[k];
      idx += 2;
    }
  }
  return arr.join('');
}
`
};

export default problem;
