import type { ProblemEntry } from '@/types/problem';

const problem: ProblemEntry = {
  "slug": "longest-substring-without-repeating",
  "title": "Longest Substring Without Repeating Characters",
  "category": "Extras I",
  "difficulty": "Medium",
  "description": "Return the length of the longest substring that has no repeated character.",
  "companies": [
    "Agoda"
  ],
  "leetcode": {
    "number": 3,
    "title": "Longest Substring Without Repeating Characters",
    "slug": "longest-substring-without-repeating-characters",
    "neetcode": "Sliding Window"
  },
  "algorithms": [
    "Hash Table",
    "String",
    "Sliding Window"
  ],
  "functionName": "lengthOfLongestSubstring",
  "trackedVariables": [
    "result"
  ],
  "testCases": [
    {
      "id": "tc-1",
      "label": "Case 1",
      "inputSummary": "\"abcabcbb\"",
      "args": [
        "abcabcbb"
      ],
      "expected": 3
    }
  ],
  "pointerVariables": [
    "i",
    "left"
  ],
  code: `function lengthOfLongestSubstring(s) {
  const last = {};
  let left = 0;
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    if (last[s[i]] !== undefined && last[s[i]] >= left) left = last[s[i]] + 1;
    last[s[i]] = i;
    if (i - left + 1 > best) best = i - left + 1;
  }
  return best;
}
`
};

export default problem;
