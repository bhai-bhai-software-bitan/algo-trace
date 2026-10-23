import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "number-of-steps-binary",
  "title": "Number of Steps to Reduce a Number in Binary to One",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "The string is a binary number. If it is even, divide by two. If it is odd, add one. Return how many steps reach 1.",
  "companies": [
    "Grab"
  ],
  "leetcode": {
    "number": 1404,
    "title": "Number of Steps to Reduce a Number in Binary Representation to One",
    "slug": "number-of-steps-to-reduce-a-number-in-binary-representation-to-one"
  },
  "algorithms": [
    "String",
    "Bit Manipulation"
  ],
  "functionName": "numSteps",
  "trackedVariables": [
    "bits"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "\"1101\"",
      "args": [
        "1101"
      ],
      "expected": 6
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "bits": [
      "i"
    ]
  },
  code: `function numSteps(s) {
  const bits = s.split('');
  let steps = 0;
  while (!(bits.length === 1 && bits[0] === '1')) {
    steps += 1;
    if (bits[bits.length - 1] === '0') bits.pop();
    else {
      let i = bits.length - 1;
      while (i >= 0 && bits[i] === '1') {
        bits[i] = '0';
        i -= 1;
      }
      if (i < 0) bits.unshift('1');
      else bits[i] = '1';
    }
  }
  return steps;
}
`
};

export default problem;
