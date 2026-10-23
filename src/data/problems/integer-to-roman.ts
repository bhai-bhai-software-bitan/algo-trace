import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "integer-to-roman",
  "title": "Integer to Roman",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Convert a positive integer to its Roman numeral.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 12,
    "title": "Integer to Roman",
    "slug": "integer-to-roman"
  },
  "algorithms": [
    "Hash Table",
    "Math",
    "String"
  ],
  "functionName": "intToRoman",
  "trackedVariables": [
    "result"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "1994",
      "args": [
        1994
      ],
      "expected": "MCMXCIV"
    }
  ],
  "pointerVariables": [
    "i"
  ],
  code: `function intToRoman(num) {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let out = '';
  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      out += symbols[i];
      num -= values[i];
    }
  }
  return out;
}
`
};

export default problem;
