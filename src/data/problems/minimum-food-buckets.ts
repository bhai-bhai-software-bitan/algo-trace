import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "minimum-food-buckets",
  "title": "Minimum Number of Food Buckets to Feed the Hamsters",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "H is a hamster and . is an empty place. A bucket feeds a hamster beside it. Return the fewest buckets, or -1.",
  "companies": [
    "Grab"
  ],
  "leetcode": {
    "number": 2086,
    "title": "Minimum Number of Food Buckets to Feed the Hamsters",
    "slug": "minimum-number-of-food-buckets-to-feed-the-hamsters"
  },
  "algorithms": [
    "String",
    "Greedy"
  ],
  "functionName": "minimumBuckets",
  "trackedVariables": [
    "cells"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "\"H..H\"",
      "args": [
        "H..H"
      ],
      "expected": 2
    }
  ],
  "pointerVariables": [
    "i"
  ],
  "pointerTargets": {
    "cells": [
      "i"
    ]
  },
  code: `function minimumBuckets(street) {
  const cells = street.split('');
  let buckets = 0;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] !== 'H') continue;
    if (i > 0 && cells[i - 1] === 'B') continue;
    if (i + 1 < cells.length && cells[i + 1] === '.') {
      cells[i + 1] = 'B';
      buckets += 1;
    } else if (i > 0 && cells[i - 1] === '.') {
      cells[i - 1] = 'B';
      buckets += 1;
    } else return -1;
  }
  return buckets;
}
`
};

export default problem;
