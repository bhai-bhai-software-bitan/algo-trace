import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "number": 217,
  "slug": "contains-duplicate",
  "title": "Contains Duplicate",
  "category": "Arrays & Hashing",
  "difficulty": "Easy",
  "description": "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
  "functionName": "containsDuplicate",
  "trackedVariables": [
    "nums",
    "seen",
    "num"
  ],
  "pointerVariables": [
    "i"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1: Duplicate Found",
      "inputSummary": "nums = [1, 2, 3, 1]",
      "args": [
        [
          1,
          2,
          3,
          1
        ]
      ],
      "expected": true
    },
    {
      "id": "tc-2",
      "label": "Case 2: All Distinct",
      "inputSummary": "nums = [1, 2, 3, 4]",
      "args": [
        [
          1,
          2,
          3,
          4
        ]
      ],
      "expected": false
    },
    {
      "id": "tc-3",
      "label": "Case 3: Adjacent Duplicates",
      "inputSummary": "nums = [7, 7, 1, 2]",
      "args": [
        [
          7,
          7,
          1,
          2
        ]
      ],
      "expected": true
    }
  ],
  code: `function containsDuplicate(nums) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (seen[num] !== undefined) {
      return true;
    }
    seen[num] = true;
  }
  return false;
}`
};

export default problem;
