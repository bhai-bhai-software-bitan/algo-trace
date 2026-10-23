import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "ship-within-days",
  "title": "Ship Packages Within Days",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Packages must ship in order. weights[i] is a package weight, and the ship sails once per day. Return the smallest capacity that delivers every package within days.",
  "context": "CodeJeet lists this for Agoda next to Koko Eating Bananas. Both are the NeetCode binary-search-on-the-answer pattern.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 1011,
    "title": "Capacity To Ship Packages Within D Days",
    "slug": "capacity-to-ship-packages-within-d-days",
    "neetcode": "Binary Search"
  },
  "algorithms": [
    "Array",
    "Binary Search"
  ],
  "functionName": "shipWithinDays",
  "trackedVariables": [
    "weights",
    "days",
    "low",
    "high",
    "mid",
    "need",
    "load",
    "answer"
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "weights": [
      "i"
    ]
  },
  "testCases": [
    {
      "id": "tc-1",
      "label": "Five days",
      "inputSummary": "weights = [1..10], days = 5",
      "args": [
        [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10
        ],
        5
      ],
      "expected": 15
    },
    {
      "id": "tc-2",
      "label": "Three days",
      "inputSummary": "weights = [3,2,2,4,1,4], days = 3",
      "args": [
        [
          3,
          2,
          2,
          4,
          1,
          4
        ],
        3
      ],
      "expected": 6
    }
  ],
  code: `function shipWithinDays(weights, days) {
  let low = weights[0];
  let high = 0;
  for (let i = 0; i < weights.length; i++) {
    if (weights[i] > low) low = weights[i];
    high += weights[i];
  }
  let answer = high;
  let mid = 0;
  let need = 1;
  let load = 0;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    need = 1;
    load = 0;
    for (let i = 0; i < weights.length; i++) {
      if (load + weights[i] > mid) {
        need += 1;
        load = 0;
      }
      load += weights[i];
    }
    if (need <= days) {
      answer = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return answer;
}`
};

export default problem;
