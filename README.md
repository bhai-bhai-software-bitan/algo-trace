# AlgoTrace

AlgoTrace is a static site for watching a JavaScript solution run, one step at a time. Open a problem, pick a test case, and the page highlights the current line while arrays, hash maps, strings, and plain values update beside the code.

The live app is [algotrace-ac31a.web.app](https://algotrace-ac31a.web.app/).

There is no backend, database, or account. Every problem, solution, and test case is a file in this repository. Next.js builds those files into static HTML, and Firebase Hosting serves the result.

## What you can practice

The home page has two groups.

**NeetCode 150.** Numbered problems such as Contains Duplicate, Two Sum, and Group Anagrams. The counter shows how many of the 150 are in the repo so far.

**Extras I.** Interview-style problems reported for [Agoda](https://codejeet.com/company/agoda) and [Grab](https://codejeet.com/company/grab). These cards have no practice number. Each one is tagged with the company that asks it, the original LeetCode problem, and the algorithm family (hash table, stack, binary search, and so on). A few of those LeetCode statements are premium, so the extra here is the standard public version of that algorithm.

Search works by title, company, algorithm, or LeetCode number. Typing `Agoda`, `Grab`, or `739` filters the list.

## What a problem page does

1. The page shows the description, your JavaScript solution, and the test cases.
2. Choosing a test case runs that solution in the browser. A Babel tracer records the variables after each statement, with a 500-step guard so a loop cannot run forever.
3. Playback steps through that recording. Arrow keys move one step, and Space plays or pauses.
4. Arrays show index pointers, objects show as key-value buckets, and the last step checks the return value against the expected output.

## Run it locally

This project uses pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3010](http://localhost:3010). Port 3010 is fixed in the `dev` script so it does not collide with another app on port 3000.

`pnpm build` writes the static site to `out/`. `pnpm lint` runs ESLint.

## Add a problem

Create one file per problem. Name it with the slug, for example `src/data/problems/two-sum.ts`, and export the problem as the default. Then import that file from `src/data/problems/index.ts` and add it to the `PROBLEMS` array.

A numbered NeetCode entry sets `number`. An extra leaves `number` off, sets `category` to `Extras I`, and can set `companies`, `leetcode`, and `algorithms`. `code` is the JavaScript function the tracer will run. `functionName` must match that function. `testCases` supplies the arguments and the expected return value. `trackedVariables` are the names drawn on the stage, and `pointerVariables` are indexes such as `i` or `left`.

The route is `/problems/<slug>/`. After the file is registered, the next production build includes that page.

## Deploy

Hosting is the Firebase project `algotrace-ac31a`.

```bash
pnpm run deploy
```

That builds `out/` and publishes it with `firebase deploy --only hosting`. The public URL is [https://algotrace-ac31a.web.app](https://algotrace-ac31a.web.app/).
