import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "simplify-path",
  "title": "Simplify Path",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Simplify a Unix path. . stays, .. goes up, and repeated slashes collapse.",
  "companies": [
    "Grab"
  ],
  "leetcode": {
    "number": 71,
    "title": "Simplify Path",
    "slug": "simplify-path"
  },
  "algorithms": [
    "String",
    "Stack"
  ],
  "functionName": "simplifyPath",
  "trackedVariables": [
    "stack"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "\"/home//foo/\"",
      "args": [
        "/home//foo/"
      ],
      "expected": "/home/foo"
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
  code: `function simplifyPath(path) {
  const parts = path.split('/');
  const stack = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '' || parts[i] === '.') continue;
    if (parts[i] === '..') stack.pop();
    else stack.push(parts[i]);
  }
  return '/' + stack.join('/');
}
`
};

export default problem;
