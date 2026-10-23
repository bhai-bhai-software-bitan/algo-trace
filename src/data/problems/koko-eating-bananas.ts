import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "koko-eating-bananas",
  "title": "Koko Eating Bananas",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "piles[i] is a pile of bananas. Eating at speed k takes ceil(pile / k) hours. Return the slowest speed that finishes within h hours.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 875,
    "title": "Koko Eating Bananas",
    "slug": "koko-eating-bananas",
    "neetcode": "Binary Search"
  },
  "algorithms": [
    "Array",
    "Binary Search"
  ],
  "functionName": "minEatingSpeed",
  "trackedVariables": [
    "piles"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[3,6,7,11], 8",
      "args": [
        [
          3,
          6,
          7,
          11
        ],
        8
      ],
      "expected": 4
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "piles": [
      "i"
    ]
  },
  code: `function minEatingSpeed(piles, h) {
  let low = 1;
  let high = piles[0];
  for (let i = 1; i < piles.length; i++) if (piles[i] > high) high = piles[i];
  let answer = high;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    let hours = 0;
    for (let i = 0; i < piles.length; i++) hours += Math.ceil(piles[i] / mid);
    if (hours <= h) {
      answer = mid;
      high = mid - 1;
    } else low = mid + 1;
  }
  return answer;
}
`
};

export default problem;
