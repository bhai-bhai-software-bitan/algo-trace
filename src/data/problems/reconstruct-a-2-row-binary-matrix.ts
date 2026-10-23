import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "reconstruct-a-2-row-binary-matrix",
  "title": "Reconstruct a 2-Row Binary Matrix",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Place 0 and 1 in two rows so the row sums are upper and lower and each column sum matches colsum. Return any valid matrix, or an empty matrix.",
  "companies": [
    "Grab"
  ],
  "leetcode": {
    "number": 1253,
    "title": "Reconstruct a 2-Row Binary Matrix",
    "slug": "reconstruct-a-2-row-binary-matrix"
  },
  "algorithms": [
    "Array",
    "Greedy",
    "Matrix"
  ],
  "functionName": "reconstructMatrix",
  "trackedVariables": [
    "top",
    "bottom",
    "colsum"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "2, 1, [1,1,1]",
      "args": [
        2,
        1,
        [
          1,
          1,
          1
        ]
      ],
      "expected": [
        [
          1,
          1,
          0
        ],
        [
          0,
          0,
          1
        ]
      ]
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "top": [
      "i"
    ]
  },
  code: `function reconstructMatrix(upper, lower, colsum) {
  const top = [];
  const bottom = [];
  const pending = [];
  for (let i = 0; i < colsum.length; i++) {
    top.push(0);
    bottom.push(0);
    if (colsum[i] === 2) {
      top[i] = 1;
      bottom[i] = 1;
      upper -= 1;
      lower -= 1;
    } else if (colsum[i] === 1) pending.push(i);
  }
  if (upper < 0 || lower < 0) return [];
  for (let i = 0; i < pending.length; i++) {
    const col = pending[i];
    if (upper > 0) {
      top[col] = 1;
      upper -= 1;
    } else if (lower > 0) {
      bottom[col] = 1;
      lower -= 1;
    } else return [];
  }
  if (upper !== 0 || lower !== 0) return [];
  return [top, bottom];
}
`
};

export default problem;
