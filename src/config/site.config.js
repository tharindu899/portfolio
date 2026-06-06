export const siteConfig = {
  site: {
    name: 'Tharindu Work Gallery',
    shortName: 'Tharindu.',
    githubUsername: 'tharindu899',
    website: 'https://tharindu899.github.io',
    tagline: 'Mobile & web developer building useful apps, tools, and automation.',
    description:
      'A portfolio command-center for my public GitHub work, project READMEs, categories, photos, notes, and contact links.',
    repoYearLabel: '2024 — 2026'
  },

  profile: {
    name: 'Tharindu Prabath',
    firstName: 'Tharindu',
    lastName: 'Prabath',
    role: 'Mobile & Web Developer • UI/UX Builder',
    location: 'Sri Lanka',
    city: 'Colombo, Sri Lanka',
    email: 'prabath99t@gmail.com',
    avatar: 'https://avatars.githubusercontent.com/u/116081100?v=4',
    localAvatar: 'images/profile/profile.svg',
    bio:
      'I build Android apps, React/Vite websites, GitHub release systems, Termux tools, media automation, dashboards, and smooth mobile-first UI systems.',
    highlights: ['Android', 'React', 'Kotlin', 'Vite', 'Firebase', 'GitHub Actions'],
    skills: [
      { label: 'Android / Kotlin', value: 90 },
      { label: 'React / Vite', value: 86 },
      { label: 'Capacitor / PWA', value: 82 },
      { label: 'GitHub Actions', value: 80 },
      { label: 'UI / UX Design', value: 74 }
    ]
  },

  home: {
    kicker: 'Portfolio · Sri Lanka',
    headline: 'Building modern apps, web tools, and automation systems.',
    intro:
      'A clean place for my public work: Android apps, React websites, media tools, notes, finance trackers, GitHub workflows, and deploy scripts.',
    workItems: [
      {
        title: 'Android apps',
        icon: 'android',
        text: 'Mobile-first APK projects with polished screens, local data, backup/restore, and release workflows.'
      },
      {
        title: 'React websites',
        icon: 'react',
        text: 'Fast Vite + React interfaces for portfolios, dashboards, project galleries, and public tools.'
      },
      {
        title: 'Automation',
        icon: 'bolt',
        text: 'GitHub Actions, release notes, CI/CD, deploy scripts, Termux commands, and repeatable workflows.'
      },
      {
        title: 'Media tools',
        icon: 'film',
        text: 'Movie, Telegram, poster, metadata, streaming helper tools, and content workflow utilities.'
      }
    ]
  },

  ui: {
    defaultTheme: 'day',
    showProfilePhoto: true,
    enableRemoteRepoFetch: true,
    enableSwipeNavigation: true,
    // Home page limits: keep pinned/focus sections clean with only 3 cards.
    pinnedProjectLimit: 3,
    workItemLimit: 3,
    fallbackImage: 'images/projects/project-placeholder.svg'
  },

  links: [
    {
      label: 'GitHub',
      icon: 'github',
      url: 'https://github.com/tharindu899',
      note: 'Public repositories and releases'
    },
    {
      label: 'Email',
      icon: 'mail',
      url: 'mailto:prabath99t@gmail.com',
      note: 'Project and collaboration email'
    },
    {
      label: 'Website',
      icon: 'globe',
      url: 'https://tharindu899.github.io',
      note: 'Main website link'
    },
    {
      label: 'Telegram',
      icon: 'telegram',
      url: 'https://t.me/tharindu899',
      note: 'Fast chat link'
    },
    {
      label: 'WhatsApp',
      icon: 'whatsapp',
      url: 'https://wa.me/94700000000',
      note: 'Replace with your WhatsApp number'
    },
    {
      label: 'LinkedIn',
      icon: 'linkedin',
      url: 'https://www.linkedin.com/in/tharindu-prabath',
      note: 'Professional profile'
    },
    {
      label: 'Instagram',
      icon: 'instagram',
      url: 'https://instagram.com/tharindu899',
      note: 'Personal updates'
    },
    {
      label: 'YouTube',
      icon: 'youtube',
      url: 'https://youtube.com/@tharindu899',
      note: 'Video content'
    }
  ],

  categories: [
    { id: 'all', label: 'All work', icon: 'grid' },
    { id: 'android', label: 'Android', icon: 'android' },
    { id: 'web', label: 'Web', icon: 'react' },
    { id: 'automation', label: 'Automation', icon: 'bolt' },
    { id: 'media', label: 'Media', icon: 'film' },
    { id: 'finance', label: 'Finance', icon: 'wallet' },
    { id: 'tools', label: 'Tools', icon: 'terminal' }
  ]
};
