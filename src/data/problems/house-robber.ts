import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "house-robber",
  "title": "House Robber",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Each house has money. You cannot rob two adjacent houses. Return the most you can rob.",
  "companies": [
    "Agoda",
    "Grab"
  ],
  "leetcode": {
    "number": 198,
    "title": "House Robber",
    "slug": "house-robber",
    "neetcode": "1-D Dynamic Programming"
  },
  "algorithms": [
    "Array",
    "Dynamic Programming"
  ],
  "functionName": "rob",
  "trackedVariables": [
    "nums"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[1,2,3,1]",
      "args": [
        [
          1,
          2,
          3,
          1
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
  code: `function rob(nums) {
  let prev = 0;
  let curr = 0;
  for (let i = 0; i < nums.length; i++) {
    const next = Math.max(curr, prev + nums[i]);
    prev = curr;
    curr = next;
  }
  return curr;
}
`
};

export default problem;
