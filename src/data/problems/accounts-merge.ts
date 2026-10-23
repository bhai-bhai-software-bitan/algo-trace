import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "accounts-merge",
  "title": "Accounts Merge",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Accounts that share an email belong to one person. Return each name with that person's sorted emails.",
  "companies": [
    "Grab"
  ],
  "leetcode": {
    "number": 721,
    "title": "Accounts Merge",
    "slug": "accounts-merge"
  },
  "algorithms": [
    "Array",
    "Hash Table",
    "Union Find"
  ],
  "functionName": "accountsMerge",
  "trackedVariables": [
    "result"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "[[\"John\",\"johnsmith@mail.com\",\"john_newyork@mail.com\"],[\"John\",\"johnsmith@mail.com\",\"john00@mail.com\"],[\"Mary\",\"mary@mail.com\"],[\"John\",\"johnnybravo@mail.com\"]]",
      "args": [
        [
          [
            "John",
            "johnsmith@mail.com",
            "john_newyork@mail.com"
          ],
          [
            "John",
            "johnsmith@mail.com",
            "john00@mail.com"
          ],
          [
            "Mary",
            "mary@mail.com"
          ],
          [
            "John",
            "johnnybravo@mail.com"
          ]
        ]
      ],
      "expected": [
        [
          "John",
          "john00@mail.com",
          "john_newyork@mail.com",
          "johnsmith@mail.com"
        ],
        [
          "John",
          "johnnybravo@mail.com"
        ],
        [
          "Mary",
          "mary@mail.com"
        ]
      ]
    }
  ],
  "pointerVariables": [
    "i"
  ],
  code: `function accountsMerge(accounts) {
  const parent = {};
  const owner = {};
  function find(email) {
    if (parent[email] !== email) parent[email] = find(parent[email]);
    return parent[email];
  }
  for (let i = 0; i < accounts.length; i++) {
    const name = accounts[i][0];
    for (let j = 1; j < accounts[i].length; j++) {
      const email = accounts[i][j];
      if (parent[email] === undefined) parent[email] = email;
      owner[email] = name;
      if (j > 1) {
        const rootA = find(accounts[i][1]);
        const rootB = find(email);
        if (rootA !== rootB) parent[rootA] = rootB;
      }
    }
  }
  const groups = {};
  const emails = Object.keys(parent);
  for (let i = 0; i < emails.length; i++) {
    const root = find(emails[i]);
    if (!groups[root]) groups[root] = [];
    groups[root].push(emails[i]);
  }
  const out = [];
  const roots = Object.keys(groups);
  for (let i = 0; i < roots.length; i++) {
    const list = groups[roots[i]].sort();
    out.push([owner[list[0]]].concat(list));
  }
  out.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : a[1] < b[1] ? -1 : 1));
  return out;
}
`
};

export default problem;
