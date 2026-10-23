import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "fizz-buzz",
  "title": "Fizz Buzz",
  "category": "Extras I",
  "difficulty": "Easy",
  "description": "Write the numbers from 1 to n. Multiples of 3 are Fizz, multiples of 5 are Buzz, and multiples of both are FizzBuzz.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 412,
    "title": "Fizz Buzz",
    "slug": "fizz-buzz"
  },
  "algorithms": [
    "Math",
    "String",
    "Simulation"
  ],
  "functionName": "fizzBuzz",
  "trackedVariables": [
    "out"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "5",
      "args": [
        5
      ],
      "expected": [
        "1",
        "2",
        "Fizz",
        "4",
        "Buzz"
      ]
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "out": [
      "i"
    ]
  },
  code: `function fizzBuzz(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) out.push('FizzBuzz');
    else if (i % 3 === 0) out.push('Fizz');
    else if (i % 5 === 0) out.push('Buzz');
    else out.push(String(i));
  }
  return out;
}
`
};

export default problem;
