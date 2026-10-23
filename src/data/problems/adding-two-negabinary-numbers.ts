import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "adding-two-negabinary-numbers",
  "title": "Adding Two Negabinary Numbers",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Both arrays are base -2 numbers, most significant bit first. Return their sum in the same form, without leading zeros.",
  "companies": [
    "Grab"
  ],
  "leetcode": {
    "number": 1073,
    "title": "Adding Two Negabinary Numbers",
    "slug": "adding-two-negabinary-numbers"
  },
  "algorithms": [
    "Array",
    "Math"
  ],
  "functionName": "addNegabinary",
  "trackedVariables": [
    "arr1",
    "arr2",
    "out"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[1,1,1,1,1], [1,0,1]",
      "args": [
        [
          1,
          1,
          1,
          1,
          1
        ],
        [
          1,
          0,
          1
        ]
      ],
      "expected": [
        1,
        0,
        0,
        0,
        0
      ]
    }
  ],
  "pointerVariables": [
    "i",
    "j"
  ],
  "pointerTargets": {
    "arr1": [
      "i",
      "j"
    ]
  },
  code: `function addNegabinary(arr1, arr2) {
  const out = [];
  let i = arr1.length - 1;
  let j = arr2.length - 1;
  let carry = 0;
  while (i >= 0 || j >= 0 || carry !== 0) {
    let sum = carry;
    if (i >= 0) sum += arr1[i];
    if (j >= 0) sum += arr2[j];
    out.push(sum & 1);
    carry = -(sum >> 1);
    i -= 1;
    j -= 1;
  }
  while (out.length > 1 && out[out.length - 1] === 0) out.pop();
  out.reverse();
  return out;
}
`
};

export default problem;
