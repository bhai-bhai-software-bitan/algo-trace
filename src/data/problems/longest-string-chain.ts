import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "longest-string-chain",
  "title": "Longest String Chain",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "A word can follow another when it adds exactly one letter. Return the longest chain.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 1048,
    "title": "Longest String Chain",
    "slug": "longest-string-chain"
  },
  "algorithms": [
    "Array",
    "Hash Table",
    "Dynamic Programming"
  ],
  "functionName": "longestStrChain",
  "trackedVariables": [
    "sorted"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[\"a\",\"b\",\"ba\",\"bca\",\"bda\",\"bdca\"]",
      "args": [
        [
          "a",
          "b",
          "ba",
          "bca",
          "bda",
          "bdca"
        ]
      ],
      "expected": 4
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "sorted": [
      "i"
    ]
  },
  code: `function longestStrChain(words) {
  const sorted = words.slice().sort((a, b) => a.length - b.length);
  const dp = {};
  let best = 1;
  for (let i = 0; i < sorted.length; i++) {
    const word = sorted[i];
    dp[word] = 1;
    for (let j = 0; j < word.length; j++) {
      const prev = word.slice(0, j) + word.slice(j + 1);
      if (dp[prev] && dp[prev] + 1 > dp[word]) dp[word] = dp[prev] + 1;
    }
    if (dp[word] > best) best = dp[word];
  }
  return best;
}
`
};

export default problem;
