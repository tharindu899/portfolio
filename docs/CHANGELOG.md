# 📝 Changelog

## 🟢 v1.0.22 — Live GitHub repo loading fix

- 🛠️ Fixed the online-only service worker so it no longer intercepts external GitHub API requests
- 📡 GitHub API, raw README, avatars, and badge image requests now bypass the PWA worker
- 🔁 Added `no-store` fetch handling for live GitHub repo and README requests
- 🧩 Added safer fallback: if the full profile repo list fails, configured/override repo links are checked one by one
- 📌 Kept Home pinned limit and Projects page pinned badges unchanged

---

## 🟢 v1.0.21 — Project page pinned badge restored

- 📌 Restored `Pinned` badge visibility on the Projects page
- 🗂️ Projects page still shows all repos, not only pinned repos
- 🏠 Home page still shows only pinned/featured repos with the 3-item limit

---

## 🟢 v1.0.20 — Project page pinned badge cleanup

- 📌 Kept `Pinned` badges only on the Home featured section
- 🧹 Added a safe plain timeline mode for the Projects page
- 🗂️ Projects page still shows all repos with normal card styling

> 📌 Human-readable release notes for the GitHub Work Gallery project.

## 🟢 v1.0.19 — CashNest X pin matching fix

- 📌 Fixed pinned matching for repo names like `CashNest_X` vs display titles like `CashNest X`
- 🔁 Added alias matching support for project overrides
- 💰 Updated default CashNest override to `CashNest_X` with proper title/icon/category
- 📝 Updated docs with the correct CashNest X pin method

---

## 🟢 v1.0.18 — Home-only pinned display

### 🔧 Changes

- 📌 Home now shows only manually pinned/featured repos, capped to 3
- 🏠 Pinned color and `Pinned` badge are now Home-page only
- 🗂️ Projects page keeps the full repo list and normal card style
- 📚 Updated docs to explain Home-only pin behavior

---

## 🟢 v1.0.17 — Home pinned item limit

### 🔧 Changes

- 📌 Capped Home featured/pinned repos to 3 items
- 🧩 Capped Home focus/method cards to 3 items
- 🎨 Updated work card grid to match the 3-item layout
- ⚙️ Added `pinnedProjectLimit` and `workItemLimit` config options

---

## 🟢 v1.0.16 — Modern README and docs update

### ✨ New features

- 🖼️ Added modern top banner SVG for README and docs
- 🏷️ Added shield badges for React, Vite, PWA, GitHub Pages, version, and cache mode
- 📚 Added full explained Markdown documentation folder
- 🗂️ Added emoji file structure docs with every project file

### 🔧 Changes

- 📘 Rebuilt `README.md` with a modern GitHub-style layout
- 🧭 Added clear setup, config, repo loading, PWA, preview, and deployment sections
- 🧩 Added better documentation links and project overview tables

---

## 🟢 v1.0.15 — Repo preview SVG

### ✨ New features

- 🖼️ Added automatic repo preview SVG generator
- 🧠 Repo details pages now use generated covers when screenshots are missing
- 🧩 Preview includes title, owner/repo, category, language, stars, forks, status, and tags

---

## 🟢 v1.0.14 — Online-only PWA

### ✨ New features

- 📱 Added PWA manifest
- 📡 Added online-only service worker
- 🎨 Added matching app icons and favicon
- 🧷 Added optional install button in header

### 🔧 Changes

- 🚫 Disabled stale app cache behavior
- 🌐 Kept all app/README/GitHub requests network-only

---

## 🟢 v1.0.13 — GitHub README preview style

### ✨ New features

- 📘 GitHub-like README preview design
- 🧱 Better code block and table styling
- 🌗 Light/dark markdown colors

---

## 🟢 v1.0.12 — Contact page cleanup

### 🔧 Changes

- 🧑‍💼 Removed unnecessary top profile box from Contact page
- 🏷️ Restored Contact text/header
- 🎯 Fixed nav active icon color swapping
