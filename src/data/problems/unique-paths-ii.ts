import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "unique-paths-ii",
  "title": "Unique Paths II",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "A robot starts at the top-left of a grid. 1 is blocked. Return how many ways it can reach the bottom-right, moving only right or down.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 63,
    "title": "Unique Paths II",
    "slug": "unique-paths-ii"
  },
  "algorithms": [
    "Array",
    "Dynamic Programming",
    "Matrix"
  ],
  "functionName": "uniquePathsWithObstacles",
  "trackedVariables": [
    "dp"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[[0,0,0],[0,1,0],[0,0,0]]",
      "args": [
        [
          [
            0,
            0,
            0
          ],
          [
            0,
            1,
            0
          ],
          [
            0,
            0,
            0
          ]
        ]
      ],
      "expected": 2
    }
  ],
  code: `function uniquePathsWithObstacles(obstacleGrid) {
  const rows = obstacleGrid.length;
  const cols = obstacleGrid[0].length;
  const dp = [];
  for (let c = 0; c < cols; c++) dp.push(0);
  dp[0] = obstacleGrid[0][0] === 0 ? 1 : 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (obstacleGrid[r][c] === 1) dp[c] = 0;
      else if (c > 0) dp[c] += dp[c - 1];
    }
  }
  return dp[cols - 1];
}
`
};

export default problem;
