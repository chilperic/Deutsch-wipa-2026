# Repository structure and contribution guide

This guide separates maintained code, inputs, provenance and disposable outputs. It does not move existing files.

| Location | Purpose |
| --- | --- |
| `index.html, app.js, styles.css` | Published learner application. |
| `grammatik/, vokabular/, training/, data/` | Curated teaching content and data consumed by the application. |
| `assets/` | Published application icons. |
| `sw.js and manifest.webmanifest` | Service worker and application manifest; paths affect offline scope. |
| `dev/` | Local server and content checks. |
| `docs/` | Dated release and interface notes. |

## Outputs and version control

Use root `outputs/` or `tmp/` for disposable local runs. Curated figures, datasets, manuscripts, reference outputs and reproducibility evidence should be committed explicitly in their relevant project directory. Do not hide all PDFs, PNGs, CSVs, notebooks or HTML files with extension-wide ignore rules.

The ignore file prevents accidental additions of local environments, caches and credentials. It does not remove files that are already tracked and it does not erase Git history. Review `git status --short` before committing. Preserve lockfiles and sanitized environment examples when they are introduced.

Keep reusable code in the existing package/module directories and executable workflows in `scripts/` or `tools/`. Preserve original research material and its attribution under the existing provenance directories. A historical folder is not proof that its code is obsolete or safe to delete.

## Public URL preservation

Repository names, owner names, published HTML paths, assets, downloadable files, route anchors, worker/module URLs and service-worker scope form a compatibility boundary. A directory move needs an explicit mapping that keeps the existing public URLs, followed by tests of the relevant links and browser interactions. Do not change Pages source settings or hosting project roots as a cleanup shortcut.
