// Add full GitHub repository links here when you want to show only selected repos.
// Supported formats:
//   'https://github.com/tharindu899/CashNest_X'
//   'tharindu899/CashNest_X'
//   { url: 'https://github.com/tharindu899/CashNest_X', featured: true }
// Leave this array empty to automatically load all public repos from site.config.js → githubUsername.
// If GitHub blocks/rate-limits the live API, these links still show as safe project cards.
export const repositoryLinks = [];

export const projectOverrides = {
  // ✅ Repo key must match the real GitHub repo name.
  // CashNest X repo usually uses underscore: CashNest_X
  CashNest_X: {
    title: 'CashNest X',
    aliases: ['CashNest', 'CashNest X', 'cashnest-x'],
    category: 'finance',
    featured: true,
    icon: 'piggy',
    photo: 'images/projects/project-placeholder.svg',
    shortNote: 'Mobile-first personal finance tracker with categories, budgets, charts, and backups.',
    note: 'A polished personal finance tracker focused on mobile workflows, local data, backup/restore, reports, and APK release automation.',
    tags: ['React', 'Vite', 'PWA', 'Finance'],
    status: 'Active'
  },
  Inkwell: {
    title: 'Inkwell',
    category: 'android',
    featured: true,
    icon: 'pen',
    photo: 'images/projects/project-placeholder.svg',
    shortNote: 'Note-taking app with Drive sync, offline support, and Android packaging.',
    note: 'Feature-rich notes app with mobile gestures, Google Drive backup, reading mode, code blocks, and GitHub release workflow.',
    tags: ['React', 'Capacitor', 'Android', 'Drive'],
    status: 'Active'
  },
  CineLink: {
    title: 'CineLink',
    category: 'media',
    featured: true,
    icon: 'film',
    photo: 'images/projects/project-placeholder.svg',
    shortNote: 'Movie and series discovery interface with admin and notification workflows.',
    note: 'Movie/TV project around discovery, metadata, admin management, Telegram notifications, and modern mobile UI.',
    tags: ['React', 'Firebase', 'TMDb', 'Telegram'],
    status: 'Public'
  },
  CashWise: {
    title: 'CashWise',
    category: 'finance',
    featured: false,
    icon: 'wallet',
    photo: 'images/projects/project-placeholder.svg',
    shortNote: 'Finance tracker concept with backups, analytics, and Android release workflow.',
    note: 'Personal money manager work with categories, analytics, Drive backup, and clean mobile-first screens.',
    tags: ['Android', 'Kotlin', 'Finance', 'Drive'],
    status: 'Public'
  },
  NovaPad: {
    title: 'NovaPad',
    category: 'android',
    featured: false,
    icon: 'book',
    photo: 'images/projects/project-placeholder.svg',
    shortNote: 'Notes app experiment with Compose, Google auth, backup, and CI/CD.',
    note: 'Android notes project focused on modern architecture, sign-in, backup, and GitHub Actions.',
    tags: ['Android', 'Compose', 'Auth', 'CI/CD'],
    status: 'Public'
  },
  SalaryTracker: {
    title: 'Salary Tracker',
    category: 'finance',
    featured: false,
    icon: 'money',
    photo: 'images/projects/project-placeholder.svg',
    shortNote: 'Salary and calendar day-type tracker with loans and Firebase features.',
    note: 'Dual app/web tracking idea for salary, day types, loans, and sync workflows.',
    tags: ['Kotlin', 'React', 'Firebase', 'Calendar'],
    status: 'Public'
  },
  'BB-Shark': {
    title: 'BB Shark',
    category: 'tools',
    featured: false,
    icon: 'chart',
    photo: 'images/projects/project-placeholder.svg',
    shortNote: 'Trading strategy helper and educational tool around Bollinger Bands.',
    note: 'Trading tools, guides, and indicator-style projects around strategy workflows and signal explanations.',
    tags: ['Trading', 'Pine Script', 'React', 'Guide'],
    status: 'Public'
  }
};

export const defaultProjectConfig = {
  category: 'tools',
  featured: false,
  icon: 'code',
  photo: 'images/projects/project-placeholder.svg',
  shortNote: 'Public GitHub repository from Tharindu.',
  note: 'Public GitHub repository. Open the full preview to read the repository README and details.',
  tags: ['GitHub'],
  status: 'Public'
};
