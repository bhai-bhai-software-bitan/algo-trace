import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "eliminate-maximum-monsters",
  "title": "Eliminate Maximum Number of Monsters",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "A monster at distance dist[i] approaches at speed[i]. You can kill one monster per minute. Return how many you can kill before one reaches you.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 1921,
    "title": "Eliminate Maximum Number of Monsters",
    "slug": "eliminate-maximum-number-of-monsters"
  },
  "algorithms": [
    "Array",
    "Greedy",
    "Sorting"
  ],
  "functionName": "eliminateMaximum",
  "trackedVariables": [
    "time"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[1,3,4], [1,1,1]",
      "args": [
        [
          1,
          3,
          4
        ],
        [
          1,
          1,
          1
        ]
      ],
      "expected": 3
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "time": [
      "i"
    ]
  },
  code: `function eliminateMaximum(dist, speed) {
  const time = [];
  for (let i = 0; i < dist.length; i++) time.push(dist[i] / speed[i]);
  time.sort((a, b) => a - b);
  for (let i = 0; i < time.length; i++) {
    if (time[i] <= i) return i;
  }
  return time.length;
}
`
};

export default problem;
