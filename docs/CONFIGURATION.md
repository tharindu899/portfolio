# ⚙️ Configuration Guide

> 🧩 All profile, link, category, repo, photo, and UI settings are controlled from config files.

---

## 🧑‍💼 Profile config

File:

```txt
src/config/site.config.js
```

Important fields:

| Field | Meaning |
|---|---|
| 🏷️ `site.name` | Full website/app name |
| 🔖 `site.shortName` | Header logo text |
| 🧬 `site.githubUsername` | GitHub username or profile link |
| 🌐 `site.website` | Main website link |
| 🧑 `profile.name` | Profile card name |
| 💼 `profile.role` | Developer role/subtitle |
| 📍 `profile.location` | Location shown in profile |
| 📧 `profile.email` | Main email |
| 🖼️ `profile.avatar` | Online profile image |
| 🗂️ `profile.localAvatar` | Local fallback image |
| 🧩 `profile.highlights` | Small skill chips |
| 📊 `profile.skills` | Sidebar skill progress bars |

---

## 🔗 Contact links

Edit the `links` array:

```js
links: [
  {
    label: 'GitHub',
    icon: 'github',
    url: 'https://github.com/tharindu899',
    note: 'Public repositories and releases'
  }
]
```

Recommended link icons:

```txt
💻 github
📧 mail
🌐 globe
✈️ telegram
💬 whatsapp
💼 linkedin
📸 instagram
▶️ youtube
```

---

## 🗂️ Categories

Edit:

```js
categories: [
  { id: 'all', label: 'All work', icon: 'grid' },
  { id: 'android', label: 'Android', icon: 'android' },
  { id: 'web', label: 'Web', icon: 'react' },
  { id: 'automation', label: 'Automation', icon: 'bolt' },
  { id: 'media', label: 'Media', icon: 'film' },
  { id: 'finance', label: 'Finance', icon: 'wallet' },
  { id: 'tools', label: 'Tools', icon: 'terminal' }
]
```

---

## 📦 Selected repo links

File:

```txt
src/config/projects.config.js
```

Example:

```js
export const repositoryLinks = [
  'https://github.com/tharindu899/CashNest_X',
  'tharindu899/Inkwell'
];
```

Leave it empty to show all public repos from `githubUsername`.

---

## 🎨 Manual project overrides

```js
export const projectOverrides = {
  Inkwell: {
    title: 'Inkwell',
    category: 'android',
    featured: true,
    icon: 'pen',
    photo: 'images/projects/inkwell.png',
    shortNote: 'Note-taking app with Drive sync and reading mode.',
    tags: ['React', 'Capacitor', 'Android'],
    status: 'Active'
  }
};
```

---

## 🖼️ Custom photos

Store images in:

```txt
public/images/projects/
```

Use relative paths without `public/`:

```js
photo: 'images/projects/cashnest-x.png'
```

Gallery photos:

```js
photos: [
  'images/projects/cashnest-x.png',
  'images/projects/gallery/cashnest-home.png'
]
```


---

## 📌 Home page item limits

The UI config keeps the home page clean by showing only pinned items, capped to 3.

```js
ui: {
  pinnedProjectLimit: 3,
  workItemLimit: 3
}
```

| Option | Meaning |
|---|---|
| 📌 `pinnedProjectLimit` | Maximum number of pinned repos shown on Home only |
| 🧩 `workItemLimit` | Number of focus/method cards shown on Home |

The **Projects** page still displays every repo and keeps the normal non-pinned card style.

### ✅ CashNest X pin example

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

Use `CashNest_X` as the key because it must match the real GitHub repo slug. The app also supports `title` and `aliases` matching now.
---

## 🛡️ Safe config edit rule

When editing config:

- ✅ Keep commas between object fields
- ✅ Keep strings inside quotes
- ✅ Use existing icon/category IDs when possible
- ✅ Run `pnpm build` after changes
- ❌ Do not remove `export const` lines
