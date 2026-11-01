# Agent guide

Offline UTS practice app, written in Indonesian. README.md covers what it does and how friends install it.

Source material (PDF, PPTX) lives in the parent folder `D:\UTS` on the owner's laptop. It is not in this repo, so a fresh clone cannot see it.

## Hard rules

- The app opens from `file://` through `Study.exe`. Do not use `type="module"`, `import`, `fetch`, frameworks, npm packages, or a build step. These can pass on a local server and still give a blank page from `file://`.
- Use classic scripts and globals. Pure logic uses the UMD pattern at the bottom of `app/js/check.js`, so Node tests can load it.
- Load order in `app/index.html` matters: `js/bank.js`, then `data/*`, then the remaining `js/*`.
- Do not fetch fonts or other assets from the network. The app must work with no internet.
- Keep student-facing text in Indonesian.
- Commit or push only when the owner asks. The repo is public, so never commit personal data, such as an email visible in a source PDF.

## Question data

Data files in `app/data/` register questions:

```js
BANK.mcq('ks', 'k7', 'Topic name', [{ q, a, w: [...], ex }]);
BANK.isian('ca', 'topic-id', 'Topic name', [
  { type: 'fill', q, fields: [{ label, a, tol?, set?, unit? }], table?, ex },
  { type: 'essay', q, points: [...], model, ex }
]);
```

- `a` is the correct option, `w` holds 3 or 4 wrong options, and `ex` is a short explanation.
- A fill field's `a` is a number, a string, or a list of accepted strings. `set: true` ignores order. `tol` is the numeric tolerance.
- Add a new data file to `app/index.html` and to `FILES` in `app/sw.js`. A test fails when either is missing.
- `BANK.uraian` registers fill and essay items for the course's Uraian & Isian tab, apart from normal practice. `BANK.materi` registers the Materi tab.
- Item IDs are `course-topicId-index`, and saved progress uses them. Never rename a `topicId`. Append to the end of a topic, and do not reorder or delete items, because that moves progress onto different questions.
- On multiple choice courses, a topic with only essays starts unticked, so a random 25-question set stays multiple choice.
- Do not guess answer keys. If a source does not show the key, say so, and label self-written keys in `ex`.

## Layout

- `app/js/app.js`: hash router and pages.
- `app/js/quiz.js`: practice and exam runner.
- `app/js/check.js`: answer checking.
- `app/js/store.js`: progress in `localStorage` (`uts-study-v1`). Keep this format compatible, or existing progress is lost.
- `app/js/tools/`: algorithms for the labs. `app/js/tools-ui.js`: lab pages.
- `app/sw.js`, `app/manifest.webmanifest`: phone install and offline support on GitHub Pages. `app.js` registers them on `https:` only, so `file://` is unaffected.
- `launcher/`: source for `Study.exe`. Run `launcher/build.bat` after changing `Study.cs`.

## Verify

```bash
node --test tests/
```

All tests must pass. For a UI change, also open `Study.exe` or `app/index.html` directly from disk, because a local server hides `file://` failures. Check the phone layout at 375px wide.
