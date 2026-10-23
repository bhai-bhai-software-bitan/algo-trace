import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "number": 49,
  "slug": "group-anagrams",
  "title": "Group Anagrams",
  "category": "Arrays & Hashing",
  "difficulty": "Medium",
  "description": "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
  "functionName": "groupAnagrams",
  "trackedVariables": [
    "strs",
    "word",
    "sortedKey",
    "groups"
  ],
  "pointerVariables": [
    "i"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1: Classic 6 Words",
      "inputSummary": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
      "args": [
        [
          "eat",
          "tea",
          "tan",
          "ate",
          "nat",
          "bat"
        ]
      ],
      "expected": [
        [
          "eat",
          "tea",
          "ate"
        ],
        [
          "tan",
          "nat"
        ],
        [
          "bat"
        ]
      ]
    },
    {
      "id": "tc-2",
      "label": "Case 2: Single Empty String",
      "inputSummary": "strs = [\"\"]",
      "args": [
        [
          ""
        ]
      ],
      "expected": [
        [
          ""
        ]
      ]
    }
  ],
  code: `function groupAnagrams(strs) {
  const groups = {};
  for (let i = 0; i < strs.length; i++) {
    const word = strs[i];
    const sortedKey = word.split('').sort().join('');
    if (!groups[sortedKey]) {
      groups[sortedKey] = [];
    }
    groups[sortedKey].push(word);
  }
  return Object.values(groups);
}`
};

export default problem;
