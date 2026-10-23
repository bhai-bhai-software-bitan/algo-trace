import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "sliding-window-maximum",
  "title": "Sliding Window Maximum",
  "category": "Extras I",
  "difficulty": "Hard",
  "description": "Return the maximum of every contiguous window of length k.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 239,
    "title": "Sliding Window Maximum",
    "slug": "sliding-window-maximum",
    "neetcode": "Sliding Window"
  },
  "algorithms": [
    "Array",
    "Queue",
    "Sliding Window"
  ],
  "functionName": "maxSlidingWindow",
  "trackedVariables": [
    "nums",
    "deque",
    "out"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[1,3,-1,-3,5,3,6,7], 3",
      "args": [
        [
          1,
          3,
          -1,
          -3,
          5,
          3,
          6,
          7
        ],
        3
      ],
      "expected": [
        3,
        3,
        5,
        5,
        6,
        7
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
  code: `function maxSlidingWindow(nums, k) {
  const deque = [];
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] <= i - k) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) out.push(nums[deque[0]]);
  }
  return out;
}
`
};

export default problem;
