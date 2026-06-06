# 🖼️ Repo Preview SVG Guide

> ✨ Every repo details page can show a beautiful matching SVG cover automatically.

---

## 🧭 What it does

When a project has no custom screenshot, the app creates a matching SVG preview using repo data.

The generated preview includes:

- 🏷️ Title
- 👤 Owner/repo name
- 🧭 Category
- 💻 Main language
- ⭐ Stars
- 🍴 Forks
- 🚦 Status
- 🧩 Tags

---

## 📁 Main file

```txt
src/utils/repoPreview.js
```

This file builds the SVG string and returns it as a data image.

---

## ✅ Automatic mode

You do not need to add images for every repo.

If `photo` is empty or uses the placeholder, the app uses the generated preview.

```js
photo: 'images/projects/project-placeholder.svg'
```

---

## 🎨 Custom screenshot mode

Add your own images here:

```txt
public/images/projects/
```

Example:

```js
projectOverrides: {
  CashNest_X: {
    photo: 'images/projects/cashnest-x.png'
  }
}
```

---

## 🖼️ Multiple screenshots

```js
CashNest_X: {
  photos: [
    'images/projects/cashnest-x.png',
    'images/projects/gallery/cashnest-home.png',
    'images/projects/gallery/cashnest-settings.png'
  ]
}
```

---

## 🧠 Best practice

- ✅ Use automatic SVG for repos without real screenshots
- ✅ Use custom screenshots for apps with polished UI
- ✅ Keep image names lowercase and simple
- ✅ Use `.png`, `.jpg`, `.webp`, or `.svg`
- ✅ Put gallery images in `public/images/projects/gallery/`
