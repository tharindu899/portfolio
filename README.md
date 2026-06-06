<p align="center">
  <img src="public/images/readme/top-banner.svg" alt="GitHub Work Gallery banner" width="100%" />
</p>

<h1 align="center">✨ Tharindu Work Gallery</h1>

<p align="center">
  <b>🌐 A modern GitHub portfolio gallery with live repositories, GitHub-style README previews, automatic repo categories, matching SVG preview covers, and online-only PWA install support.</b>
</p>

<p align="center">
  <a href="https://react.dev/"><img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=111111"></a>
  <a href="https://vitejs.dev/"><img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=ffffff"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub%20Pages-ready-222222?style=for-the-badge&logo=githubpages&logoColor=ffffff"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps"><img alt="PWA" src="https://img.shields.io/badge/PWA-online--only-C9FF3D?style=for-the-badge&logo=pwa&logoColor=111111"></a>
</p>

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.19-C9FF3D?style=flat-square">
  <img alt="No cache" src="https://img.shields.io/badge/cache-network--only-black?style=flat-square">
  <img alt="Mobile first" src="https://img.shields.io/badge/mobile-first-8A2BE2?style=flat-square">
  <img alt="License" src="https://img.shields.io/badge/license-personal-lightgrey?style=flat-square">
</p>

---

## 🧭 What is this?

**Tharindu Work Gallery** is a clean **React + Vite** portfolio project that loads public GitHub repositories and presents them in a beautiful command-center style UI.

It is built for:

- 🧑‍💻 **Developer portfolios** with real GitHub repos
- 📦 **Project galleries** with repo details and README previews
- 🧠 **Automatic categories and icons** from repo name, language, topics, and description
- 🖼️ **Automatic SVG project preview covers** when screenshots are missing
- 📱 **Installable PWA** that stays fully online and avoids stale cache problems
- 🚀 **GitHub Pages deployment** with a ready workflow

---

## ✨ Main features

| Feature | Status | Details |
|---|---:|---|
| 🧭 Modern portfolio UI | ✅ Ready | Sticky top navigation, hero, timeline projects, smooth mobile layout |
| 🔴 Live GitHub repo loading | ✅ Ready | Loads selected repos or all public repos from your GitHub profile |
| 🧠 Auto category detection | ✅ Ready | Finance, Android, Web, Automation, Media, Tools |
| 🎯 Auto icon detection | ✅ Ready | Wallet, piggy, film, terminal, React, Android, pen, book, and more |
| 📘 GitHub-style README preview | ✅ Ready | GitHub-like fonts, headings, code blocks, tables, links, and dark mode |
| 🖼️ Automatic repo preview SVG | ✅ Ready | Matching preview cover for every repo details page |
| 📱 Online-only PWA | ✅ Ready | Installable app, network-only service worker, no stale app cache |
| 🌗 Theme toggle | ✅ Ready | Day/dark theme with matching UI colors |
| 📲 Mobile-first layout | ✅ Ready | Works cleanly on phone screens and desktop screens |
| 🚀 GitHub Pages workflow | ✅ Ready | `.github/workflows/pages.yml` deploys the built site |

---

## 🚀 Quick start

```bash
corepack enable
corepack prepare pnpm@9.15.4 --activate
pnpm install
pnpm dev
```

Open the local URL from Vite, then edit the config files below.

---

## ⚙️ Main setup files

| File | Purpose |
|---|---|
| 🧑‍💼 `src/config/site.config.js` | Profile info, contact links, GitHub username, category list, UI options |
| 📦 `src/config/projects.config.js` | Selected repo links, manual overrides, custom photos, tags, notes, status |
| 🌐 `public/manifest.webmanifest` | PWA name, icons, theme color, shortcuts |
| 📡 `public/sw.js` | Online-only service worker with no precache |
| 🖼️ `src/utils/repoPreview.js` | Automatic matching SVG preview generator |
| 📘 `src/components/ReadmeViewer.jsx` | GitHub-like README preview renderer |

---

## 🔗 GitHub repo loading methods

### 🟢 Method 1 — load all public repos from one account

Edit `src/config/site.config.js`:

```js
githubUsername: 'tharindu899'
```

A full profile link also works:

```js
githubUsername: 'https://github.com/tharindu899'
```

### 🟣 Method 2 — show only selected repo links

Edit `src/config/projects.config.js`:

```js
export const repositoryLinks = [
  'https://github.com/tharindu899/CashNest_X',
  'tharindu899/Inkwell',
  {
    url: 'https://github.com/tharindu899/MyRepo',
    featured: true,
    photo: 'images/projects/my-repo.png'
  }
];
```

When `repositoryLinks` has items, the app loads only those exact repos. When it is empty, the app loads all public repos from `githubUsername`.


---

## 📌 Home pinned item limit

> ✅ Latest: pinned badges now show on both Home and Projects page, but Home is still limited to 3 pinned items.


The home page now shows only **pinned project items**, capped to **3**, and only **3 focus/method cards**.

The Projects page is not limited. It keeps the normal full repo list, and pinned repos show a `Pinned` badge there too.

Edit `src/config/site.config.js` when you want to change the Home limit:

```js
ui: {
  pinnedProjectLimit: 3,
  workItemLimit: 3
}
```

Project page still shows **all repos**. Repos with `featured: true` also show the `Pinned` badge on the Projects page.

### ✅ Pin CashNest X correctly

GitHub repo names use the real repo slug, not only the display title. For **CashNest X**, use `CashNest_X` in `projectOverrides`:

```js
export const projectOverrides = {
  CashNest_X: {
    title: 'CashNest X',
    aliases: ['CashNest', 'CashNest X', 'cashnest-x'],
    featured: true,
    category: 'finance',
    icon: 'piggy'
  }
};
```

The app now also matches override `title` and `aliases`, so `CashNest X`, `CashNest_X`, and `cashnest-x` can all point to the same repo.
---

## 🧠 Automatic categories and icons

The app checks repo name, owner, description, topics, language, and homepage to choose the best category and icon.

| Category | Emoji | Detected from |
|---|---:|---|
| Finance | 💰 | cash, money, budget, salary, expense, loan, bank, wallet |
| Media | 🎬 | movie, film, cinema, stream, video, TMDb, Telegram, anime |
| Android | 🤖 | Android, APK, AAB, Kotlin, Java, Capacitor, Cordova, Compose |
| Web | 🌐 | React, Vite, website, portfolio, dashboard, PWA, HTML, CSS |
| Automation | ⚡ | GitHub Actions, workflow, script, deploy, Termux, Docker, bot |
| Tools | 🧰 | Default fallback when nothing else matches |

Need a custom result? Use `projectOverrides`.

```js
export const projectOverrides = {
  CashNest_X: {
    title: 'CashNest X',
    category: 'finance',
    featured: true,
    icon: 'piggy',
    photo: 'images/projects/cashnest-x.png',
    shortNote: 'Mobile-first personal finance tracker.',
    tags: ['React', 'Capacitor', 'Finance'],
    status: 'Active'
  }
};
```

---

## 🖼️ Preview image method

### ✅ Automatic SVG preview

Every project details page gets a generated SVG preview when no screenshot is set.

The SVG preview includes:

- 🏷️ Repo title
- 👤 Owner/repo name
- 🧭 Category
- 💻 Main language
- ⭐ Stars
- 🍴 Forks
- 🚦 Status
- 🧩 Tags

### ✅ Custom screenshots

Put images here:

```txt
public/images/projects/my-project.png
public/images/projects/gallery/my-project-screen-1.png
```

Then set:

```js
MyRepoName: {
  photo: 'images/projects/my-project.png',
  photos: [
    'images/projects/my-project.png',
    'images/projects/gallery/my-project-screen-1.png'
  ]
}
```

---

## 📱 Online-only PWA method

This app is installable as a PWA, but it intentionally does **not** keep old cached app files.

- ✅ Install support through `manifest.webmanifest`
- ✅ Service worker registration through `src/pwa/registerOnlineOnlyPwa.js`
- ✅ Network-only fetch in `public/sw.js`
- ✅ Same-origin app files handled by the service worker
- ✅ External GitHub API, raw README files, avatars, and badges bypass the service worker
- ✅ No precache list
- ✅ No stale UI after updates
- ✅ Offline message instead of old cached pages

This is useful for GitHub Pages projects where you want every visit to load the latest deployed build while live GitHub repo data still loads correctly.

---

## 🧾 Full project structure

<details open>
<summary>📁 Click to show every file with emoji labels</summary>

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

</details>

---

## 📚 Full documentation

| Guide | What it explains |
|---|---|
| 📘 [`docs/FULL_GUIDE.md`](docs/FULL_GUIDE.md) | Complete A-Z setup, edit, run, build, deploy, and customize guide |
| 🗂️ [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) | Full emoji file tree and explanation for every important folder |
| ⚙️ [`docs/CONFIGURATION.md`](docs/CONFIGURATION.md) | Profile, links, categories, repo links, overrides, screenshots |
| 📱 [`docs/PWA_ONLINE_ONLY.md`](docs/PWA_ONLINE_ONLY.md) | Online-only PWA method, icons, no-cache behavior, install notes |
| 🖼️ [`docs/REPO_PREVIEWS.md`](docs/REPO_PREVIEWS.md) | Automatic SVG previews and custom screenshot method |
| 🚀 [`docs/DEPLOY_GITHUB_PAGES.md`](docs/DEPLOY_GITHUB_PAGES.md) | GitHub Pages deployment with Actions workflow |
| 📝 [`docs/CHANGELOG.md`](docs/CHANGELOG.md) | Project update notes and release history |

---

## 🛠️ Commands

```bash
# 🧩 Install dependencies
pnpm install

# 🔥 Start local development
pnpm dev

# 🏗️ Build production files
pnpm build

# 👀 Preview production build
pnpm preview
```

---

## 🚀 Deploy to GitHub Pages

1. 📤 Push this project to a public GitHub repo.
2. ⚙️ Go to **Settings → Pages**.
3. 🧪 Set **Build and deployment** to **GitHub Actions**.
4. 🌿 Push to `main` or `master`.
5. ✅ The workflow builds and deploys the website.

---

## 🧩 Tech stack

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-UI-61DAFB?style=for-the-badge&logo=react&logoColor=111111">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-build-646CFF?style=for-the-badge&logo=vite&logoColor=ffffff">
  <img alt="Markdown" src="https://img.shields.io/badge/Markdown-preview-000000?style=for-the-badge&logo=markdown&logoColor=ffffff">
  <img alt="GitHub" src="https://img.shields.io/badge/GitHub-API-181717?style=for-the-badge&logo=github&logoColor=ffffff">
  <img alt="PWA" src="https://img.shields.io/badge/PWA-install-C9FF3D?style=for-the-badge&logo=pwa&logoColor=111111">
</p>

---

## 🧑‍💻 Author

**Tharindu Prabath**  
📍 Sri Lanka  
🌐 GitHub: `tharindu899`  
📧 Email: `prabath99t@gmail.com`

---

## ✅ Latest update

- 🛠️ Fixed live GitHub repo loading in the online-only PWA
- 📡 Service worker now bypasses external GitHub API/README/avatar/badge requests
- 🔁 Added safer GitHub fetch handling with `no-store` live requests
- 🧩 If the full GitHub profile list is blocked, configured/override repos are checked one by one first
- 📌 Pinned project logic stays the same: Home shows pinned max 3, Projects shows all repos with badges

```bash
./push.sh "fix live github repo loading; update online pwa api bypass; improve configured repo fallback"
```


## 🛠️ Live GitHub Repo Loading Fix

This app now uses a stronger online loader:

1. 🌐 GitHub user repos API
2. 🔎 GitHub search API fallback
3. 🪞 mirror metadata fallback
4. 📌 configured repo links / project overrides as the final safe fallback

If your browser was already using an old installed PWA cache, open the site once and hard refresh. On Android Chrome, use **Site settings → Storage → Clear & reset** if the old page still appears. The new service worker is online-only and clears old caches automatically after it loads.

