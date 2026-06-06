# 📱 Online-only PWA Guide

> ⚡ The app is installable like a PWA, but it stays fully online and avoids old cached UI problems.

---

## 🧭 Why online-only?

Normal PWAs often cache app files. That can cause a GitHub Pages site to show old UI after you deploy a new version.

This project uses an **online-only service worker**:

- ✅ Browser can install the app
- ✅ App icon appears on Android/iOS home screen
- ✅ Every page load uses the network
- ✅ No old app shell after updates
- ✅ No old GitHub README/API data
- ✅ Offline users see a clean online-only message

---

## 📁 PWA files

| File | Purpose |
|---|---|
| 🌐 `public/manifest.webmanifest` | App name, icons, theme, shortcuts, standalone mode |
| 📡 `public/sw.js` | Network-only service worker with no precache |
| 🧩 `src/pwa/registerOnlineOnlyPwa.js` | Registers service worker in production |
| 📲 `src/pwa/usePwaInstallPrompt.js` | Handles browser install prompt |
| 🧷 `src/components/PwaInstallButton.jsx` | Header install button |
| 🎨 `public/icons/` | App icons, favicon, Apple icon, maskable icons |

---

## 🧠 Service worker behavior

The service worker does:

- ✅ `fetch()` same-origin app files from the network
- ✅ `cache: 'no-store'` where possible
- ✅ no `caches.open()` app shell storage
- ✅ no precache list
- ✅ no stale fallback files
- ✅ bypass external requests like `api.github.com`, `raw.githubusercontent.com`, avatars, and badges

It does not:

- ❌ save README responses
- ❌ save GitHub API responses
- ❌ intercept GitHub API CORS responses
- ❌ save old JavaScript bundles
- ❌ save old CSS bundles

---

## 🖼️ Icon files

| Icon | Usage |
|---|---|
| 🧩 `app-icon.svg` | Main vector app icon |
| 📱 `pwa-icon-192.png` | Android/Chrome small icon |
| 🧱 `pwa-icon-512.png` | Android/Chrome large icon |
| 🎭 `pwa-maskable-192.png` | Android adaptive/maskable icon |
| 🎭 `pwa-maskable-512.png` | Android adaptive/maskable large icon |
| 🍎 `apple-touch-icon.png` | iPhone/iPad home screen icon |
| 🌐 `favicon-48.png` | Browser tab icon |

---

## 🧪 Test install

1. 🚀 Deploy to GitHub Pages.
2. 📱 Open the deployed site in Android Chrome.
3. ⋮ Open browser menu.
4. ➕ Tap **Install app** or **Add to Home screen**.
5. ✅ Launch from the home screen.

---

## 🧹 Fix old PWA cache on device

If your phone still shows an old build:

1. Open browser site settings.
2. Clear site data.
3. Uninstall the old home-screen app shortcut.
4. Reopen deployed URL.
5. Install again.

Because this project uses online-only service worker behavior, future updates should not stay stuck in old cache.

---

## 🧯 Live GitHub repos not loading?

If you see `Could not load live GitHub repos`, reload once after deploying this version. The updated worker does not intercept external GitHub API requests anymore.

✅ `api.github.com` bypasses the worker  
✅ `raw.githubusercontent.com` bypasses the worker  
✅ README previews stay live  
✅ Avatar and badge images stay live
