import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "number": 1,
  "slug": "two-sum",
  "title": "Two Sum",
  "category": "Arrays & Hashing",
  "difficulty": "Easy",
  "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  "companies": [
    "Agoda",
    "Grab"
  ],
  "leetcode": {
    "number": 1,
    "title": "Two Sum",
    "slug": "two-sum",
    "neetcode": "Arrays & Hashing"
  },
  "algorithms": [
    "Array",
    "Hash Table"
  ],
  "functionName": "twoSum",
  "trackedVariables": [
    "nums",
    "target",
    "seen",
    "current",
    "complement"
  ],
  "pointerVariables": [
    "i"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1: Target 9",
      "inputSummary": "nums = [2, 7, 11, 15], target = 9",
      "args": [
        [
          2,
          7,
          11,
          15
        ],
        9
      ],
      "expected": [
        0,
        1
      ]
    },
    {
      "id": "tc-2",
      "label": "Case 2: Target 6",
      "inputSummary": "nums = [3, 2, 4], target = 6",
      "args": [
        [
          3,
          2,
          4
        ],
        6
      ],
      "expected": [
        1,
        2
      ]
    },
    {
      "id": "tc-3",
      "label": "Case 3: Duplicate Pair",
      "inputSummary": "nums = [3, 3], target = 6",
      "args": [
        [
          3,
          3
        ],
        6
      ],
      "expected": [
        0,
        1
      ]
    }
  ],
  code: `function twoSum(nums, target) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const complement = target - current;
    if (seen[complement] !== undefined) {
      return [seen[complement], i];
    }
    seen[current] = i;
  }
  return [];
}`
};

export default problem;
