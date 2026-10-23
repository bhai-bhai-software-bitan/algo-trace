import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "minimum-absolute-difference",
  "title": "Minimum Absolute Difference",
  "category": "Extras I",
  "difficulty": "Easy",
  "description": "Return every pair whose difference is the smallest in the array.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 1200,
    "title": "Minimum Absolute Difference",
    "slug": "minimum-absolute-difference"
  },
  "algorithms": [
    "Array",
    "Sorting"
  ],
  "functionName": "minimumAbsDifference",
  "trackedVariables": [
    "arr"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[4,2,1,3]",
      "args": [
        [
          4,
          2,
          1,
          3
        ]
      ],
      "expected": [
        [
          1,
          2
        ],
        [
          2,
          3
        ],
        [
          3,
          4
        ]
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
  code: `function minimumAbsDifference(arr) {
  const nums = arr.slice().sort((a, b) => a - b);
  let best = nums[1] - nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] < best) best = nums[i] - nums[i - 1];
  }
  const out = [];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] === best) out.push([nums[i - 1], nums[i]]);
  }
  return out;
}
`
};

export default problem;
