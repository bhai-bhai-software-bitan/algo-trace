import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "subarray-sum-equals-k",
  "title": "Subarray Sum Equals K",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Return how many contiguous subarrays add up to k.",
  "companies": [
    "Agoda",
    "Grab"
  ],
  "leetcode": {
    "number": 560,
    "title": "Subarray Sum Equals K",
    "slug": "subarray-sum-equals-k",
    "neetcode": "Prefix Sum"
  },
  "algorithms": [
    "Array",
    "Hash Table",
    "Prefix Sum"
  ],
  "functionName": "subarraySum",
  "trackedVariables": [
    "nums",
    "seen"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[1,1,1], 2",
      "args": [
        [
          1,
          1,
          1
        ],
        2
      ],
      "expected": 2
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
  code: `function subarraySum(nums, k) {
  const seen = { 0: 1 };
  let sum = 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (seen[sum - k]) count += seen[sum - k];
    seen[sum] = (seen[sum] || 0) + 1;
  }
  return count;
}
`
};

export default problem;
