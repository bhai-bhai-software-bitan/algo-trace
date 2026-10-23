import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "subsets",
  "title": "Subsets",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Return every subset of distinct numbers. The empty subset is included.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 78,
    "title": "Subsets",
    "slug": "subsets"
  },
  "algorithms": [
    "Array",
    "Backtracking"
  ],
  "functionName": "subsets",
  "trackedVariables": [
    "nums",
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
        [],
        [
          1
        ],
        [
          2
        ],
        [
          1,
          2
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
  code: `function subsets(nums) {
  const out = [[]];
  for (let i = 0; i < nums.length; i++) {
    const size = out.length;
    for (let j = 0; j < size; j++) out.push(out[j].concat([nums[i]]));
  }
  return out;
}
`
};

export default problem;
