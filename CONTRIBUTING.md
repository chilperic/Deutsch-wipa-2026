# Contributing

Before adding new content:

1. Use existing module schemas where possible.
2. Avoid duplicate prompts with different answers.
3. Avoid placeholder meanings such as `meaning to be added` in curated material.
4. Keep generated content out of curated lists unless manually checked.
5. Run:

```bash
npm run check
npm run audit
```

Content that fails the audit should not be shipped.
