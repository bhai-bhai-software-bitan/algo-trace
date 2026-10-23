import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "diameter-endpoints",
  "title": "Find Diameter Endpoints of a Tree",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "A tree has n nodes and undirected edges. Return the two endpoints of one longest path.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "title": "Find Diameter Endpoints of a Tree",
    "slug": "find-diameter-endpoints-of-a-tree"
  },
  "algorithms": [
    "Tree",
    "Breadth-First Search"
  ],
  "functionName": "diameterEndpoints",
  "trackedVariables": [
    "edges"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "4, [[0,1],[1,2],[1,3]]",
      "args": [
        4,
        [
          [
            0,
            1
          ],
          [
            1,
            2
          ],
          [
            1,
            3
          ]
        ]
      ],
      "expected": [
        0,
        2
      ]
    }
  ],
  "context": "Listed for Agoda on CodeJeet. The LeetCode statement is premium, so this extra uses the standard algorithm the title describes.",
  code: `function diameterEndpoints(n, edges) {
  const adj = [];
  for (let i = 0; i < n; i++) adj.push([]);
  for (let i = 0; i < edges.length; i++) {
    adj[edges[i][0]].push(edges[i][1]);
    adj[edges[i][1]].push(edges[i][0]);
  }
  function farthest(start) {
    const dist = [];
    for (let i = 0; i < n; i++) dist.push(-1);
    const queue = [start];
    dist[start] = 0;
    let qi = 0;
    let far = start;
    while (qi < queue.length) {
      const node = queue[qi];
      qi += 1;
      if (dist[node] > dist[far]) far = node;
      for (let j = 0; j < adj[node].length; j++) {
        const next = adj[node][j];
        if (dist[next] === -1) {
          dist[next] = dist[node] + 1;
          queue.push(next);
        }
      }
    }
    return far;
  }
  const a = farthest(0);
  const b = farthest(a);
  return a < b ? [a, b] : [b, a];
}
`
};

export default problem;
