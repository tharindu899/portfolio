# 🚀 GitHub Pages Deployment Guide

> 🌐 Deploy the portfolio as a public GitHub Pages website using the included GitHub Actions workflow.

---

## ✅ 1. Push project to GitHub

```bash
git init
git add .
git commit -m "initial portfolio gallery"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## ⚙️ 2. Enable GitHub Pages

In your GitHub repo:

1. Open **Settings**
2. Open **Pages**
3. Under **Build and deployment**, choose **GitHub Actions**
4. Save settings

---

## 🧪 3. Workflow file

The deploy workflow is already included:

```txt
.github/workflows/pages.yml
```

It runs when you push to:

- 🌿 `main`
- 🌿 `master`

---

## 🏗️ 4. Build command

The workflow runs:

```bash
pnpm install
pnpm build
```

The Vite output is:

```txt
dist/
```

---

## 🌐 5. Open deployed site

After workflow success, your site will usually be:

```txt
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

---

## 🧩 6. Custom domain optional

If you use a custom domain:

1. Add the domain in GitHub Pages settings.
2. Add DNS records from your domain provider.
3. Add `public/CNAME` if needed.

---

## 🧪 7. Deploy checklist

- ✅ Repo is public or Pages is allowed for private repo plan
- ✅ Pages source is GitHub Actions
- ✅ Workflow completed successfully
- ✅ Site opens with correct route
- ✅ GitHub repos load
- ✅ README preview opens
- ✅ PWA manifest loads
- ✅ App icon appears in browser install prompt
