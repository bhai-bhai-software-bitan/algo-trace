import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "maximum-team-size",
  "title": "Maximum Team Size with Overlapping Intervals",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Each interval is inclusive. Return how many intervals share one common point.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "title": "Maximum Team Size with Overlapping Intervals",
    "slug": "maximum-team-size-with-overlapping-intervals"
  },
  "algorithms": [
    "Array",
    "Sweep Line"
  ],
  "functionName": "maximumTeamSize",
  "trackedVariables": [
    "intervals",
    "events"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[[1,3],[2,4],[3,5]]",
      "args": [
        [
          [
            1,
            3
          ],
          [
            2,
            4
          ],
          [
            3,
            5
          ]
        ]
      ],
      "expected": 3
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "intervals": [
      "i"
    ]
  },
  "context": "Listed for Agoda on CodeJeet. The LeetCode statement is premium, so this extra uses the standard algorithm the title describes.",
  code: `function maximumTeamSize(intervals) {
  const events = [];
  for (let i = 0; i < intervals.length; i++) {
    events.push([intervals[i][0], 1]);
    events.push([intervals[i][1], -1]);
  }
  events.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  let current = 0;
  let best = 0;
  for (let i = 0; i < events.length; i++) {
    current += events[i][1];
    if (current > best) best = current;
  }
  return best;
}
`
};

export default problem;
