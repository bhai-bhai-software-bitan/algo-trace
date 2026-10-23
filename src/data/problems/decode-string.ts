import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "decode-string",
  "title": "Decode String",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "k[abc] means abc repeated k times, and groups can nest. Return the expanded string.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 394,
    "title": "Decode String",
    "slug": "decode-string",
    "neetcode": "Stack"
  },
  "algorithms": [
    "String",
    "Stack"
  ],
  "functionName": "decodeString",
  "trackedVariables": [
    "parts",
    "counts"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "\"3[a]2[bc]\"",
      "args": [
        "3[a]2[bc]"
      ],
      "expected": "aaabcbc"
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "parts": [
      "i"
    ]
  },
  code: `function decodeString(s) {
  const counts = [];
  const parts = [''];
  let num = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch >= '0' && ch <= '9') num = num * 10 + (ch.charCodeAt(0) - 48);
    else if (ch === '[') {
      counts.push(num);
      parts.push('');
      num = 0;
    } else if (ch === ']') {
      const chunk = parts.pop();
      parts[parts.length - 1] += chunk.repeat(counts.pop());
    } else parts[parts.length - 1] += ch;
  }
  return parts[0];
}
`
};

export default problem;
