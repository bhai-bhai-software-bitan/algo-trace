import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "coin-change",
  "title": "Coin Change",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Return the fewest coins that make amount. Return -1 if it is impossible.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 322,
    "title": "Coin Change",
    "slug": "coin-change",
    "neetcode": "1-D Dynamic Programming"
  },
  "algorithms": [
    "Array",
    "Dynamic Programming"
  ],
  "functionName": "coinChange",
  "trackedVariables": [
    "dp",
    "coins"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[1,2,5], 11",
      "args": [
        [
          1,
          2,
          5
        ],
        11
      ],
      "expected": 3
    }
  ],
  code: `function coinChange(coins, amount) {
  const dp = [];
  for (let i = 0; i <= amount; i++) dp.push(amount + 1);
  dp[0] = 0;
  for (let amountLeft = 1; amountLeft <= amount; amountLeft++) {
    for (let i = 0; i < coins.length; i++) {
      if (coins[i] <= amountLeft && dp[amountLeft - coins[i]] + 1 < dp[amountLeft]) {
        dp[amountLeft] = dp[amountLeft - coins[i]] + 1;
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}
`
};

export default problem;
