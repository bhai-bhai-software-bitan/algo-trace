import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "sort-colors",
  "title": "Sort Colors",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Sort an array of 0, 1, and 2 in place and return it.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 75,
    "title": "Sort Colors",
    "slug": "sort-colors",
    "neetcode": "Two Pointers"
  },
  "algorithms": [
    "Array",
    "Two Pointers",
    "Sorting"
  ],
  "functionName": "sortColors",
  "trackedVariables": [
    "nums"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[2,0,2,1,1,0]",
      "args": [
        [
          2,
          0,
          2,
          1,
          1,
          0
        ]
      ],
      "expected": [
        0,
        0,
        1,
        1,
        2,
        2
      ]
    }
  ],
  "pointerVariables": [
    "low",
    "mid",
    "high"
  ],
  "pointerTargets": {
    "nums": [
      "low",
      "mid",
      "high"
    ]
  },
  code: `function sortColors(nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      const tmp = nums[low];
      nums[low] = nums[mid];
      nums[mid] = tmp;
      low += 1;
      mid += 1;
    } else if (nums[mid] === 1) mid += 1;
    else {
      const tmp = nums[high];
      nums[high] = nums[mid];
      nums[mid] = tmp;
      high -= 1;
    }
  }
  return nums;
}
`
};

export default problem;
