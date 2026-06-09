# Deployment checklist

Before pushing:

```bash
git status
```

Then:

```bash
git add .
git commit -m "Upgrade grouped learning UI and grammar engines"
git push
```

After GitHub Pages updates, check:

```js
window.VOKABULAR_BUILD
```

Expected:

```text
themed-grouped-learning-2026-06-08
```

Basic manual test:

```text
1. Open the app.
2. Enter learner name.
3. Choose Appearance + Flavor.
4. Start Konnektoren.
5. Answer one question.
6. Exit.
7. Open Tracker.
8. Confirm progress is visible.
```
