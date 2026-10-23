import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "remove-adjacent-duplicates-ii",
  "title": "Remove All Adjacent Duplicates in String II",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Delete every group of k identical adjacent letters until none remain. Return what is left.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 1209,
    "title": "Remove All Adjacent Duplicates in String II",
    "slug": "remove-all-adjacent-duplicates-in-string-ii"
  },
  "algorithms": [
    "String",
    "Stack"
  ],
  "functionName": "removeDuplicates",
  "trackedVariables": [
    "stack"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "\"deeedbbcccbdaa\", 3",
      "args": [
        "deeedbbcccbdaa",
        3
      ],
      "expected": "aa"
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "stack": [
      "i"
    ]
  },
  code: `function removeDuplicates(s, k) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (stack.length && stack[stack.length - 1][0] === ch) stack[stack.length - 1][1] += 1;
    else stack.push([ch, 1]);
    if (stack[stack.length - 1][1] === k) stack.pop();
  }
  let out = '';
  for (let i = 0; i < stack.length; i++) {
    for (let c = 0; c < stack[i][1]; c++) out += stack[i][0];
  }
  return out;
}
`
};

export default problem;
