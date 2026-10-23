import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "insert-delete-getrandom",
  "title": "Insert Delete GetRandom O(1)",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Run insert, remove, and getRandom. insert and remove report whether the set changed. getRandom returns one value that is still present.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 380,
    "title": "Insert Delete GetRandom O(1)",
    "slug": "insert-delete-getrandom-o1",
    "neetcode": "Arrays & Hashing"
  },
  "algorithms": [
    "Array",
    "Hash Table"
  ],
  "functionName": "randomizedSet",
  "trackedVariables": [
    "values"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[[\"insert\",1],[\"insert\",2],[\"remove\",1],[\"getRandom\"]]",
      "args": [
        [
          [
            "insert",
            1
          ],
          [
            "insert",
            2
          ],
          [
            "remove",
            1
          ],
          [
            "getRandom"
          ]
        ]
      ],
      "expected": [
        true,
        true,
        true,
        2
      ]
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "values": [
      "i"
    ]
  },
  code: `function randomizedSet(ops) {
  const index = {};
  const values = [];
  const out = [];
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i][0];
    const val = ops[i][1];
    if (op === 'insert') {
      if (index[val] !== undefined) out.push(false);
      else {
        index[val] = values.length;
        values.push(val);
        out.push(true);
      }
    } else if (op === 'remove') {
      if (index[val] === undefined) out.push(false);
      else {
        const at = index[val];
        const last = values[values.length - 1];
        values[at] = last;
        index[last] = at;
        values.pop();
        delete index[val];
        out.push(true);
      }
    } else out.push(values[0]);
  }
  return out;
}
`
};

export default problem;
