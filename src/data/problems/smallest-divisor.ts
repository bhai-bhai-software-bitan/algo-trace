import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "smallest-divisor",
  "title": "Find the Smallest Divisor Given a Threshold",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Divide every number by a positive divisor and round up. Return the smallest divisor whose rounded sum is at most threshold.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 1283,
    "title": "Find the Smallest Divisor Given a Threshold",
    "slug": "find-the-smallest-divisor-given-a-threshold"
  },
  "algorithms": [
    "Array",
    "Binary Search"
  ],
  "functionName": "smallestDivisor",
  "trackedVariables": [
    "nums"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[1,2,5,9], 6",
      "args": [
        [
          1,
          2,
          5,
          9
        ],
        6
      ],
      "expected": 5
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
  code: `function smallestDivisor(nums, threshold) {
  let low = 1;
  let high = nums[0];
  for (let i = 1; i < nums.length; i++) if (nums[i] > high) high = nums[i];
  let answer = high;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    let sum = 0;
    for (let i = 0; i < nums.length; i++) sum += Math.ceil(nums[i] / mid);
    if (sum <= threshold) {
      answer = mid;
      high = mid - 1;
    } else low = mid + 1;
  }
  return answer;
}
`
};

export default problem;
