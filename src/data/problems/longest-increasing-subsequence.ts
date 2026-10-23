import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "longest-increasing-subsequence",
  "title": "Longest Increasing Subsequence",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Return the length of the longest strictly increasing subsequence.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 300,
    "title": "Longest Increasing Subsequence",
    "slug": "longest-increasing-subsequence",
    "neetcode": "1-D Dynamic Programming"
  },
  "algorithms": [
    "Array",
    "Dynamic Programming"
  ],
  "functionName": "lengthOfLIS",
  "trackedVariables": [
    "nums",
    "dp"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[10,9,2,5,3,7,101,18]",
      "args": [
        [
          10,
          9,
          2,
          5,
          3,
          7,
          101,
          18
        ]
      ],
      "expected": 4
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
  code: `function lengthOfLIS(nums) {
  const dp = [];
  let best = 1;
  for (let i = 0; i < nums.length; i++) {
    dp.push(1);
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) dp[i] = dp[j] + 1;
    }
    if (dp[i] > best) best = dp[i];
  }
  return best;
}
`
};

export default problem;
