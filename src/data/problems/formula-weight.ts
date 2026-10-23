import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "formula-weight",
  "title": "Formula Weight",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Each element has a fixed value: its IUPAC abridged atomic weight times 1000. A digit multiplies the atom or parenthesized group before it, and a digit in front of a parenthesis multiplies that group. Return the total.",
  "context": "This is the real-formula version of LeetCode 726 Number of Atoms. CodeJeet lists that problem for Agoda. The same parentheses pattern is LeetCode 394 Decode String, NeetCode Stack.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 726,
    "title": "Number of Atoms",
    "slug": "number-of-atoms"
  },
  "algorithms": [
    "Hash Table",
    "String",
    "Stack"
  ],
  "functionName": "formulaWeight",
  "trackedVariables": [
    "chars",
    "stack",
    "counts",
    "factors",
    "name",
    "mult",
    "total"
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "chars": [
      "i"
    ]
  },
  "testCases": [
    {
      "id": "tc-1",
      "label": "Methane",
      "inputSummary": "CH4",
      "args": [
        "CH4"
      ],
      "expected": 16043
    },
    {
      "id": "tc-2",
      "label": "Calcium hydroxide",
      "inputSummary": "Ca(OH)2",
      "args": [
        "Ca(OH)2"
      ],
      "expected": 74092
    },
    {
      "id": "tc-3",
      "label": "Aluminum sulfate",
      "inputSummary": "Al2(SO4)3",
      "args": [
        "Al2(SO4)3"
      ],
      "expected": 342132
    },
    {
      "id": "tc-4",
      "label": "Group coefficient",
      "inputSummary": "4(H2O)",
      "args": [
        "4(H2O)"
      ],
      "expected": 72060
    }
  ],
  code: `function formulaWeight(formula) {
  const weights = {
    H: 1008,
    C: 12011,
    N: 14007,
    O: 15999,
    Al: 26982,
    S: 32060,
    Ca: 40078,
    Cu: 63546,
  };
  const chars = formula.split('');
  let counts = {};
  const stack = [counts];
  const factors = [];
  let i = 0;
  let name = '';
  let mult = 0;
  let total = 0;

  while (i < chars.length) {
    const ch = chars[i];
    if (ch >= 'A' && ch <= 'Z') {
      name = ch;
      i += 1;
      while (i < chars.length && chars[i] >= 'a' && chars[i] <= 'z') {
        name += chars[i];
        i += 1;
      }
      mult = 0;
      while (i < chars.length && chars[i] >= '0' && chars[i] <= '9') {
        mult = mult * 10 + (chars[i].charCodeAt(0) - 48);
        i += 1;
      }
      if (mult === 0) mult = 1;
      counts = stack[stack.length - 1];
      counts[name] = (counts[name] || 0) + mult;
    } else if (ch === '(') {
      counts = {};
      stack.push(counts);
      factors.push(1);
      i += 1;
    } else if (ch === ')') {
      i += 1;
      mult = 0;
      while (i < chars.length && chars[i] >= '0' && chars[i] <= '9') {
        mult = mult * 10 + (chars[i].charCodeAt(0) - 48);
        i += 1;
      }
      if (mult === 0) mult = 1;
      const factor = factors.pop() * mult;
      const group = stack.pop();
      counts = stack[stack.length - 1];
      const keys = Object.keys(group);
      for (let k = 0; k < keys.length; k++) {
        const key = keys[k];
        counts[key] = (counts[key] || 0) + group[key] * factor;
      }
    } else if (ch >= '0' && ch <= '9') {
      mult = 0;
      while (i < chars.length && chars[i] >= '0' && chars[i] <= '9') {
        mult = mult * 10 + (chars[i].charCodeAt(0) - 48);
        i += 1;
      }
      if (chars[i] === '(') {
        counts = {};
        stack.push(counts);
        factors.push(mult);
        i += 1;
      }
    } else {
      i += 1;
    }
  }

  counts = stack[0];
  const keys = Object.keys(counts);
  total = 0;
  for (let k = 0; k < keys.length; k++) {
    total += counts[keys[k]] * weights[keys[k]];
  }
  return total;
}`
};

export default problem;
