import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "jump-game-ii",
  "title": "Jump Game II",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "nums[i] is how far you can jump from i. Return the fewest jumps that reach the last index.",
  "companies": [
    "Grab"
  ],
  "leetcode": {
    "number": 45,
    "title": "Jump Game II",
    "slug": "jump-game-ii",
    "neetcode": "Greedy"
  },
  "algorithms": [
    "Array",
    "Greedy"
  ],
  "functionName": "jump",
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
  code: `function jump(nums) {
  let jumps = 0;
  let end = 0;
  let far = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    if (i + nums[i] > far) far = i + nums[i];
    if (i === end) {
      jumps += 1;
      end = far;
    }
  }
  return jumps;
}
`
};

export default problem;
