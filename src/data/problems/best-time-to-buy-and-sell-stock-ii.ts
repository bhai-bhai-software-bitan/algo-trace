import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "best-time-to-buy-and-sell-stock-ii",
  "title": "Best Time to Buy and Sell Stock II",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "You may buy and sell as many times as you want. Return the largest total profit.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 122,
    "title": "Best Time to Buy and Sell Stock II",
    "slug": "best-time-to-buy-and-sell-stock-ii"
  },
  "algorithms": [
    "Array",
    "Greedy"
  ],
  "functionName": "maxProfitII",
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
      "expected": 7
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
  code: `function maxProfitII(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
  }
  return profit;
}
`
};

export default problem;
