# 🗂️ Full Project Structure

> 📁 Complete emoji file tree for the GitHub Work Gallery project.

---

## 🌳 File tree

```txt
📦 github-work-gallery-pwa/
├── 🧬 .github/
│   └── ⚙️ workflows/
│       └── 🚀 pages.yml
├── 📚 docs/
│   ├── 📘 CHANGELOG.md
│   ├── 📘 CONFIGURATION.md
│   ├── 📘 DEPLOY_GITHUB_PAGES.md
│   ├── 📘 FULL_GUIDE.md
│   ├── 📘 PROJECT_STRUCTURE.md
│   ├── 📘 PWA_ONLINE_ONLY.md
│   └── 📘 REPO_PREVIEWS.md
├── 🌐 public/
│   ├── 🎨 icons/
│   │   ├── 🖼️ app-icon.svg
│   │   ├── 🖼️ apple-touch-icon.png
│   │   ├── 🖼️ favicon-48.png
│   │   ├── 🖼️ pwa-icon-192.png
│   │   ├── 🖼️ pwa-icon-512.png
│   │   ├── 🖼️ pwa-maskable-192.png
│   │   └── 🖼️ pwa-maskable-512.png
│   ├── 🖼️ images/
│   │   ├── 🧑‍💼 profile/
│   │   │   └── 🖼️ profile.svg
│   │   ├── 📦 projects/
│   │   │   ├── 📁 gallery/
│   │   │   └── 🖼️ project-placeholder.svg
│   │   └── 📘 readme/
│   │       └── 🖼️ top-banner.svg
│   ├── 📱 manifest.webmanifest
│   └── 🟨 sw.js
├── 🧠 src/
│   ├── 🧩 components/
│   │   ├── 🎨 icons/
│   │   │   └── ⚛️ Icon.jsx
│   │   ├── ⚛️ CategoryFilter.jsx
│   │   ├── ⚛️ Header.jsx
│   │   ├── ⚛️ Hero.jsx
│   │   ├── ⚛️ IconButton.jsx
│   │   ├── ⚛️ Layout.jsx
│   │   ├── ⚛️ ProfileSidebar.jsx
│   │   ├── ⚛️ ProjectModal.jsx
│   │   ├── ⚛️ ProjectTimeline.jsx
│   │   ├── ⚛️ PwaInstallButton.jsx
│   │   ├── ⚛️ ReadmeViewer.jsx
│   │   ├── ⚛️ SearchBox.jsx
│   │   ├── ⚛️ SectionHeader.jsx
│   │   ├── ⚛️ StatStrip.jsx
│   │   ├── ⚛️ ThemeToggle.jsx
│   │   └── ⚛️ WorkTiles.jsx
│   ├── ⚙️ config/
│   │   ├── 🟨 projects.config.js
│   │   └── 🟨 site.config.js
│   ├── 🪝 hooks/
│   │   ├── 🟨 useGithubRepos.js
│   │   └── 🟨 useHashRoute.js
│   ├── 📄 pages/
│   │   ├── ⚛️ Contact.jsx
│   │   ├── ⚛️ Home.jsx
│   │   └── ⚛️ Projects.jsx
│   ├── 📱 pwa/
│   │   ├── 🟨 registerOnlineOnlyPwa.js
│   │   └── 🟨 usePwaInstallPrompt.js
│   ├── 🎨 styles/
│   │   └── 🎨 index.css
│   ├── 🧰 utils/
│   │   ├── 🟨 format.js
│   │   ├── 🟨 github.js
│   │   └── 🟨 repoPreview.js
│   ├── ⚛️ App.jsx
│   └── ⚛️ main.jsx
├── 📦 .npmrc
├── 🌐 index.html
├── 🔧 package.json
├── 📘 README.md
└── 🟨 vite.config.js
```

---

## 🧭 Folder guide

| Folder | Meaning |
|---|---|
| 🧬 `.github/workflows/` | GitHub Actions deployment workflow |
| 📚 `docs/` | Full Markdown documentation files |
| 🌐 `public/` | Static files copied directly to the final build |
| 🎨 `public/icons/` | PWA icons, favicon, Apple icon, maskable icons |
| 🖼️ `public/images/` | Profile, project, and README banner images |
| 🧠 `src/components/` | Reusable React UI components |
| 🧭 `src/config/` | Profile, repo, category, and project config |
| 🪝 `src/hooks/` | Custom React hooks |
| 📄 `src/pages/` | Main route pages: Home, Projects, Contact |
| 📱 `src/pwa/` | PWA registration and install prompt logic |
| 🎨 `src/styles/` | Main CSS and GitHub README preview styling |
| 🧰 `src/utils/` | GitHub API helpers, formatting, repo preview generator |

---

## 🔥 Most edited files

| File | Edit when... |
|---|---|
| ⚙️ `src/config/site.config.js` | Changing profile, links, categories, username, UI settings |
| 📦 `src/config/projects.config.js` | Adding selected repo links, custom icons, photos, tags, notes |
| 🎨 `src/styles/index.css` | Updating UI spacing, colors, typography, modal sizes |
| 📘 `src/components/ReadmeViewer.jsx` | Changing README preview behavior |
| 📱 `public/manifest.webmanifest` | Changing PWA name, icon list, shortcuts, theme color |
| 📡 `public/sw.js` | Changing online-only PWA network behavior |
