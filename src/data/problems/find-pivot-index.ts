import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "find-pivot-index",
  "title": "Find Pivot Index",
  "category": "Extras I",
  "difficulty": "Easy",
  "description": "Return the index where the sum on the left equals the sum on the right. Return -1 if there is none.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 724,
    "title": "Find Pivot Index",
    "slug": "find-pivot-index"
  },
  "algorithms": [
    "Array",
    "Prefix Sum"
  ],
  "functionName": "pivotIndex",
  "trackedVariables": [
    "nums"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[1,7,3,6,5,6]",
      "args": [
        [
          1,
          7,
          3,
          6,
          5,
          6
        ]
      ],
      "expected": 3
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "nums": [
      "i"
    ]
  },
  code: `function pivotIndex(nums) {
  let total = 0;
  for (let i = 0; i < nums.length; i++) total += nums[i];
  let left = 0;
  for (let i = 0; i < nums.length; i++) {
    if (left === total - left - nums[i]) return i;
    left += nums[i];
  }
  return -1;
}
`
};

export default problem;
