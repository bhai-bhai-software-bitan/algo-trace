import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "backspace-string-compare",
  "title": "Backspace String Compare",
  "category": "Extras I",
  "difficulty": "Easy",
  "description": "# deletes the previous character. Return whether the two typed strings become the same.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 844,
    "title": "Backspace String Compare",
    "slug": "backspace-string-compare"
  },
  "algorithms": [
    "Two Pointers",
    "String",
    "Stack"
  ],
  "functionName": "backspaceCompare",
  "trackedVariables": [
    "result"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "\"ab#c\", \"ad#c\"",
      "args": [
        "ab#c",
        "ad#c"
      ],
      "expected": true
    }
  ],
  "pointerVariables": [
    "i"
  ],
  code: `function backspaceCompare(s, t) {
  function build(str) {
    const out = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '#') out.pop();
      else out.push(str[i]);
    }
    return out.join('');
  }
  return build(s) === build(t);
}
`
};

export default problem;
