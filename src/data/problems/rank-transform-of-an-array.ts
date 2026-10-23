import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "rank-transform-of-an-array",
  "title": "Rank Transform of an Array",
  "category": "Extras I",
  "difficulty": "Easy",
  "description": "Replace each value by its rank. Equal values share a rank, and the next distinct value gets the next rank.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 1331,
    "title": "Rank Transform of an Array",
    "slug": "rank-transform-of-an-array"
  },
  "algorithms": [
    "Array",
    "Hash Table",
    "Sorting"
  ],
  "functionName": "arrayRankTransform",
  "trackedVariables": [
    "arr"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[40,10,20,30]",
      "args": [
        [
          40,
          10,
          20,
          30
        ]
      ],
      "expected": [
        4,
        1,
        2,
        3
      ]
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "arr": [
      "i"
    ]
  },
  code: `function arrayRankTransform(arr) {
  const sorted = arr.slice().sort((a, b) => a - b);
  const rank = {};
  let nextRank = 1;
  for (let i = 0; i < sorted.length; i++) {
    if (rank[sorted[i]] === undefined) {
      rank[sorted[i]] = nextRank;
      nextRank += 1;
    }
  }
  const out = [];
  for (let i = 0; i < arr.length; i++) out.push(rank[arr[i]]);
  return out;
}
`
};

export default problem;
