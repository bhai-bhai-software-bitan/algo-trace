import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "sort-array-by-increasing-frequency",
  "title": "Sort Array by Increasing Frequency",
  "category": "Extras I",
  "difficulty": "Easy",
  "description": "Sort so rarer values come first. If two values are equally common, the larger value comes first.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 1636,
    "title": "Sort Array by Increasing Frequency",
    "slug": "sort-array-by-increasing-frequency"
  },
  "algorithms": [
    "Array",
    "Hash Table",
    "Sorting"
  ],
  "functionName": "frequencySort",
  "trackedVariables": [
    "nums"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[1,1,2,2,2,3]",
      "args": [
        [
          1,
          1,
          2,
          2,
          2,
          3
        ]
      ],
      "expected": [
        3,
        1,
        1,
        2,
        2,
        2
      ]
    }
  ],
  code: `function frequencySort(nums) {
  const count = {};
  for (let i = 0; i < nums.length; i++) count[nums[i]] = (count[nums[i]] || 0) + 1;
  return nums.slice().sort((a, b) => count[a] - count[b] || b - a);
}
`
};

export default problem;
