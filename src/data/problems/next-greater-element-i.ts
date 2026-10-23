import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "next-greater-element-i",
  "title": "Next Greater Element I",
  "category": "Extras I",
  "difficulty": "Easy",
  "description": "For each value in nums1, find the next greater value to its right in nums2. Use -1 when none exists.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 496,
    "title": "Next Greater Element I",
    "slug": "next-greater-element-i"
  },
  "algorithms": [
    "Array",
    "Hash Table",
    "Stack"
  ],
  "functionName": "nextGreaterElement",
  "trackedVariables": [
    "nums2",
    "stack"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[4,1,2], [1,3,4,2]",
      "args": [
        [
          4,
          1,
          2
        ],
        [
          1,
          3,
          4,
          2
        ]
      ],
      "expected": [
        -1,
        3,
        -1
      ]
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "nums2": [
      "i"
    ]
  },
  code: `function nextGreaterElement(nums1, nums2) {
  const next = {};
  const stack = [];
  for (let i = 0; i < nums2.length; i++) {
    while (stack.length && nums2[i] > stack[stack.length - 1]) next[stack.pop()] = nums2[i];
    stack.push(nums2[i]);
  }
  const out = [];
  for (let i = 0; i < nums1.length; i++) {
    out.push(next[nums1[i]] === undefined ? -1 : next[nums1[i]]);
  }
  return out;
}
`
};

export default problem;
