import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "daily-temperatures",
  "title": "Daily Temperatures",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "For each day, return how many days you wait until a warmer temperature. The last day waits 0.",
  "companies": [
    "Agoda",
    "Grab"
  ],
  "leetcode": {
    "number": 739,
    "title": "Daily Temperatures",
    "slug": "daily-temperatures",
    "neetcode": "Stack"
  },
  "algorithms": [
    "Array",
    "Monotonic Stack"
  ],
  "functionName": "dailyTemperatures",
  "trackedVariables": [
    "temperatures",
    "answer",
    "stack"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[73,74,75,71,69,72,76,73]",
      "args": [
        [
          73,
          74,
          75,
          71,
          69,
          72,
          76,
          73
        ]
      ],
      "expected": [
        1,
        1,
        4,
        2,
        1,
        1,
        0,
        0
      ]
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "temperatures": [
      "i"
    ]
  },
  code: `function dailyTemperatures(temperatures) {
  const answer = [];
  const stack = [];
  for (let i = 0; i < temperatures.length; i++) answer.push(0);
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prev = stack.pop();
      answer[prev] = i - prev;
    }
    stack.push(i);
  }
  return answer;
}
`
};

export default problem;
