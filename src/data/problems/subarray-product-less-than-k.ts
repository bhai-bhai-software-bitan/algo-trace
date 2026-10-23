import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "subarray-product-less-than-k",
  "title": "Subarray Product Less Than K",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Return how many contiguous subarrays have a product strictly less than k.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 713,
    "title": "Subarray Product Less Than K",
    "slug": "subarray-product-less-than-k"
  },
  "algorithms": [
    "Array",
    "Sliding Window"
  ],
  "functionName": "numSubarrayProductLessThanK",
  "trackedVariables": [
    "nums"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[10,5,2,6], 100",
      "args": [
        [
          10,
          5,
          2,
          6
        ],
        100
      ],
      "expected": 8
    }
  ],
  "pointerVariables": [
    "right",
    "left"
  ],
  "pointerTargets": {
    "nums": [
      "right",
      "left"
    ]
  },
  code: `function numSubarrayProductLessThanK(nums, k) {
  if (k <= 1) return 0;
  let product = 1;
  let left = 0;
  let count = 0;
  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];
    while (product >= k) {
      product /= nums[left];
      left += 1;
    }
    count += right - left + 1;
  }
  return count;
}
`
};

export default problem;
