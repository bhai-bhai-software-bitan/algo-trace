import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "squares-of-a-sorted-array",
  "title": "Squares of a Sorted Array",
  "category": "Extras I",
  "difficulty": "Easy",
  "description": "The input is sorted. Return the squares, also sorted.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 977,
    "title": "Squares of a Sorted Array",
    "slug": "squares-of-a-sorted-array"
  },
  "algorithms": [
    "Array",
    "Two Pointers",
    "Sorting"
  ],
  "functionName": "sortedSquares",
  "trackedVariables": [
    "nums",
    "out"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[-4,-1,0,3,10]",
      "args": [
        [
          -4,
          -1,
          0,
          3,
          10
        ]
      ],
      "expected": [
        0,
        1,
        9,
        16,
        100
      ]
    }
  ],
  "pointerVariables": [
    "left",
    "right"
  ],
  "pointerTargets": {
    "nums": [
      "left",
      "right"
    ]
  },
  code: `function sortedSquares(nums) {
  const out = [];
  let left = 0;
  let right = nums.length - 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (Math.abs(nums[left]) > Math.abs(nums[right])) {
      out[i] = nums[left] * nums[left];
      left += 1;
    } else {
      out[i] = nums[right] * nums[right];
      right -= 1;
    }
  }
  return out;
}
`
};

export default problem;
