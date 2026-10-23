import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "three-sum",
  "title": "3Sum",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Return every unique triplet that adds to zero.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 15,
    "title": "3Sum",
    "slug": "3sum",
    "neetcode": "Two Pointers"
  },
  "algorithms": [
    "Array",
    "Two Pointers",
    "Sorting"
  ],
  "functionName": "threeSum",
  "trackedVariables": [
    "arr"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[-1,0,1,2,-1,-4]",
      "args": [
        [
          -1,
          0,
          1,
          2,
          -1,
          -4
        ]
      ],
      "expected": [
        [
          -1,
          -1,
          2
        ],
        [
          -1,
          0,
          1
        ]
      ]
    }
  ],
  "pointerVariables": [
    "i",
    "left",
    "right"
  ],
  "pointerTargets": {
    "arr": [
      "i",
      "left",
      "right"
    ]
  },
  code: `function threeSum(nums) {
  const arr = nums.slice().sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) continue;
    let left = i + 1;
    let right = arr.length - 1;
    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];
      if (sum === 0) {
        out.push([arr[i], arr[left], arr[right]]);
        left += 1;
        right -= 1;
        while (left < right && arr[left] === arr[left - 1]) left += 1;
        while (left < right && arr[right] === arr[right + 1]) right -= 1;
      } else if (sum < 0) left += 1;
      else right -= 1;
    }
  }
  return out;
}
`
};

export default problem;
