import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "minimum-cost-for-tickets",
  "title": "Minimum Cost For Tickets",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Travel days need a 1-day, 7-day, or 30-day pass. Return the cheapest way to cover every travel day.",
  "companies": [
    "Grab"
  ],
  "leetcode": {
    "number": 983,
    "title": "Minimum Cost For Tickets",
    "slug": "minimum-cost-for-tickets"
  },
  "algorithms": [
    "Array",
    "Dynamic Programming"
  ],
  "functionName": "mincostTickets",
  "trackedVariables": [
    "dp",
    "days"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[1,4,6,7,8,20], [2,7,15]",
      "args": [
        [
          1,
          4,
          6,
          7,
          8,
          20
        ],
        [
          2,
          7,
          15
        ]
      ],
      "expected": 11
    }
  ],
  "pointerVariables": [
    "day"
  ],
  "pointerTargets": {
    "dp": []
  },
  code: `function mincostTickets(days, costs) {
  const travel = {};
  for (let i = 0; i < days.length; i++) travel[days[i]] = true;
  const last = days[days.length - 1];
  const dp = [0];
  for (let day = 1; day <= last; day++) {
    if (!travel[day]) dp[day] = dp[day - 1];
    else {
      const one = dp[day - 1] + costs[0];
      const seven = (day >= 7 ? dp[day - 7] : 0) + costs[1];
      const thirty = (day >= 30 ? dp[day - 30] : 0) + costs[2];
      dp[day] = Math.min(one, seven, thirty);
    }
  }
  return dp[last];
}
`
};

export default problem;
