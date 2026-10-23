import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "best-time-to-buy-and-sell-stock",
  "title": "Best Time to Buy and Sell Stock",
  "category": "Extras I",
  "difficulty": "Easy",
  "description": "Prices are one day each. Buy once and sell once later. Return the largest profit.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 121,
    "title": "Best Time to Buy and Sell Stock",
    "slug": "best-time-to-buy-and-sell-stock",
    "neetcode": "Arrays & Hashing"
  },
  "algorithms": [
    "Array"
  ],
  "functionName": "maxProfit",
  "trackedVariables": [
    "prices"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[7,1,5,3,6,4]",
      "args": [
        [
          7,
          1,
          5,
          3,
          6,
          4
        ]
      ],
      "expected": 5
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "prices": [
      "i"
    ]
  },
  code: `function maxProfit(prices) {
  let best = 0;
  let low = prices[0];
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] - low > best) best = prices[i] - low;
    if (prices[i] < low) low = prices[i];
  }
  return best;
}
`
};

export default problem;
