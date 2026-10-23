import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "triangle",
  "title": "Triangle",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Each step moves to an adjacent number in the next row. Return the smallest path sum from top to bottom.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 120,
    "title": "Triangle",
    "slug": "triangle"
  },
  "algorithms": [
    "Array",
    "Dynamic Programming"
  ],
  "functionName": "minimumTotal",
  "trackedVariables": [
    "dp"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[[2],[3,4],[6,5,7],[4,1,8,3]]",
      "args": [
        [
          [
            2
          ],
          [
            3,
            4
          ],
          [
            6,
            5,
            7
          ],
          [
            4,
            1,
            8,
            3
          ]
        ]
      ],
      "expected": 11
    }
  ],
  code: `function minimumTotal(triangle) {
  const dp = triangle[triangle.length - 1].slice();
  for (let row = triangle.length - 2; row >= 0; row--) {
    for (let col = 0; col < triangle[row].length; col++) {
      dp[col] = triangle[row][col] + Math.min(dp[col], dp[col + 1]);
    }
  }
  return dp[0];
}
`
};

export default problem;
