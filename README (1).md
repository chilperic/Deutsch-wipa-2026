# Vokabular — German Vocabulary Trainer

A personal vocabulary trainer powered by Claude AI.
Translate German words into 9+ languages with explanations and example sentences.

---

## 🚀 How to put this app online (step by step, no coding needed)

### Step 1 — Create a GitHub account (skip if you already have one)

1. Go to **https://github.com**
2. Click **Sign up** (top right)
3. Enter your email, a password, and a username
4. Confirm your email address

---

### Step 2 — Create a new repository (= a folder on GitHub)

1. Once logged in, click the **＋** icon at the top right of the page
2. Click **New repository**
3. Fill in:
   - **Repository name:** `german-vocab` (no spaces)
   - **Visibility:** ✅ Public  ← this is required for free hosting
   - ✅ Check **Add a README file**
4. Click the green **Create repository** button

You now have an empty folder on GitHub.

---

### Step 3 — Upload your files

1. You should see your new repository page (it shows a `README.md` file)
2. Click **Add file** → **Upload files**
3. Drag and drop these three files from your computer into the upload area:
   - `index.html`
   - `vocab.json`  (the Chapter 1 word list)
   - `README.md`   (this file, optional — you can skip it)
4. At the bottom, leave the default message as-is
5. Click the green **Commit changes** button

---

### Step 4 — Turn on GitHub Pages (= make the site public)

1. Still on your repository page, click **Settings** (top tab, with a gear icon)
2. In the left menu, click **Pages**
3. Under **Branch**, change the dropdown from `None` to `main`
4. Leave the folder as `/ (root)`
5. Click **Save**
6. Wait about 1–2 minutes

---

### Step 5 — Open your app

1. Refresh the Settings → Pages page
2. You will see a green banner:
   > **Your site is live at https://YOUR-USERNAME.github.io/german-vocab/**
3. Click that link — your app is now online and accessible to anyone

**Your personal URL will be:**
```
https://YOUR-USERNAME.github.io/german-vocab/
```

---

## 🔑 Get your Anthropic API key (to generate translations)

1. Go to **https://console.anthropic.com**
2. Sign up for a free account
3. Click **API Keys** in the left menu
4. Click **Create Key**
5. Copy the key (it starts with `sk-ant-…`)
6. Paste it into the **"Anthropic API Key"** field in the app sidebar

> **Your API key is stored only in your browser.**
> It is never uploaded to GitHub or visible to anyone else.
> Every visitor who uses the app must enter their own key.

---

## 📥 How to add a new chapter of words

1. Upload your new PDF to Claude and ask:
   > *"Extract all vocabulary words from this PDF into a JSON file in the same format as before"*
2. Download the generated `kapitel2_vocab.json`
3. Go to your GitHub repository
4. Click **Add file** → **Upload files**
5. Upload the new JSON file
6. In the app, click **↑ Import JSON** and select the file
7. Click **Generate X translations**
8. After generating, click **↓ Export JSON** — this saves a `vocab.json` with all translations cached
9. Upload that `vocab.json` back to GitHub (it replaces the old one):
   - Click the `vocab.json` file in your repository
   - Click the **pencil icon** (edit)
   - Or: upload the new file — GitHub will ask if you want to replace it

---

## ⌨️ Keyboard shortcuts

| Key | Action |
|-----|--------|
| `←` | Previous card |
| `→` | Next card |
| `Space` | Flip card |

---

## 📁 Files in this project

| File | What it does |
|------|-------------|
| `index.html` | The entire app — one self-contained file |
| `vocab.json` | Your word list with cached translations |
| `README.md`  | This guide |
