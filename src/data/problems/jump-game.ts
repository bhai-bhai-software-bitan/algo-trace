import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "jump-game",
  "title": "Jump Game",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "nums[i] is how far you can jump from i. Return whether you can reach the last index.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 55,
    "title": "Jump Game",
    "slug": "jump-game",
    "neetcode": "Greedy"
  },
  "algorithms": [
    "Array",
    "Greedy"
  ],
  "functionName": "canJump",
  "trackedVariables": [
    "nums"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[2,3,1,1,4]",
      "args": [
        [
          2,
          3,
          1,
          1,
          4
        ]
      ],
      "expected": true
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
  code: `function canJump(nums) {
  let far = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > far) return false;
    if (i + nums[i] > far) far = i + nums[i];
  }
  return true;
}
`
};

export default problem;
