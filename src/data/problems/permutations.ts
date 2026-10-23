import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "permutations",
  "title": "Permutations",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Return every ordering of the distinct numbers.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 46,
    "title": "Permutations",
    "slug": "permutations"
  },
  "algorithms": [
    "Array",
    "Backtracking"
  ],
  "functionName": "permute",
  "trackedVariables": [
    "nums",
    "path",
    "out"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[1,2]",
      "args": [
        [
          1,
          2
        ]
      ],
      "expected": [
        [
          1,
          2
        ],
        [
          2,
          1
        ]
      ]
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
  code: `function permute(nums) {
  const out = [];
  const used = [];
  const path = [];
  function walk() {
    if (path.length === nums.length) {
      out.push(path.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      walk();
      path.pop();
      used[i] = false;
    }
  }
  walk();
  return out;
}
`
};

export default problem;
