const PLACEHOLDER_PATH = 'images/projects/project-placeholder.svg';

const CATEGORY_LABELS = {
  android: 'Android app',
  web: 'Web project',
  automation: 'Automation',
  media: 'Media tool',
  finance: 'Finance app',
  tools: 'Developer tool'
};

const CATEGORY_MARKS = {
  android: { label: 'APK', shape: 'rounded' },
  web: { label: 'WEB', shape: 'grid' },
  automation: { label: 'CI', shape: 'bolt' },
  media: { label: 'PLAY', shape: 'play' },
  finance: { label: 'Rs', shape: 'coin' },
  tools: { label: '</>', shape: 'terminal' }
};

function escapeSvg(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function safeLine(value = '', max = 44) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  return text.length > max ? `${text.slice(0, max - 1).trim()}…` : text;
}

function splitTitle(value = '') {
  const words = String(value || 'GitHub Repo').replace(/[-_]+/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (words.length <= 2) return [words.join(' ') || 'GitHub Repo', ''];

  const first = [];
  const second = [];
  words.forEach((word) => {
    const firstLength = first.join(' ').length;
    if (firstLength < 18 || !second.length) first.push(word);
    else second.push(word);
  });

  return [safeLine(first.join(' '), 24), safeLine(second.join(' '), 26)];
}

function stat(value = 0) {
  const number = Number(value || 0);
  if (number >= 1000) return `${(number / 1000).toFixed(number >= 10000 ? 0 : 1)}k`;
  return String(number);
}

function markSvg(category = 'tools') {
  const mark = CATEGORY_MARKS[category] || CATEGORY_MARKS.tools;

  if (mark.shape === 'grid') {
    return `
      <rect x="862" y="170" width="44" height="44" rx="10" fill="#10100f"/>
      <rect x="918" y="170" width="44" height="44" rx="10" fill="#10100f" opacity=".78"/>
      <rect x="862" y="226" width="44" height="44" rx="10" fill="#10100f" opacity=".78"/>
      <rect x="918" y="226" width="44" height="44" rx="10" fill="#10100f"/>
    `;
  }

  if (mark.shape === 'bolt') {
    return `<path d="M915 151 848 262h58l-16 82 78-128h-57l4-65Z" fill="#10100f"/>`;
  }

  if (mark.shape === 'play') {
    return `<path d="M856 164v154l132-77-132-77Z" fill="#10100f"/>`;
  }

  if (mark.shape === 'coin') {
    return `
      <circle cx="912" cy="235" r="86" fill="#10100f"/>
      <text x="912" y="258" text-anchor="middle" font-size="58" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#c8f04a">${escapeSvg(mark.label)}</text>
    `;
  }

  if (mark.shape === 'terminal') {
    return `
      <rect x="826" y="174" width="180" height="116" rx="24" fill="#10100f"/>
      <path d="m862 216 34 27-34 27" fill="none" stroke="#c8f04a" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="916" y="256" width="48" height="12" rx="6" fill="#c8f04a"/>
    `;
  }

  return `
    <rect x="830" y="170" width="170" height="170" rx="44" fill="#10100f"/>
    <text x="915" y="263" text-anchor="middle" font-size="46" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#c8f04a">${escapeSvg(mark.label)}</text>
  `;
}

export function isPlaceholderPhoto(photo = '') {
  const clean = String(photo || '').trim();
  return !clean || clean === PLACEHOLDER_PATH || clean.endsWith('/project-placeholder.svg');
}

export function createRepoPreviewSvg(project = {}) {
  const title = project.title || project.name || 'GitHub Repo';
  const [titleLineOne, titleLineTwo] = splitTitle(title);
  const ownerRepo = project.owner && project.name ? `${project.owner}/${project.name}` : project.repoUrl || 'github repository';
  const category = project.category || 'tools';
  const categoryLabel = CATEGORY_LABELS[category] || 'GitHub repo';
  const language = project.language || 'Repo';
  const status = project.status || 'Public';
  const updated = project.updatedAt ? new Date(project.updatedAt).getFullYear() : new Date().getFullYear();
  const description = safeLine(project.shortNote || project.description || project.note || 'Public GitHub repository preview.', 74);
  const tags = Array.isArray(project.tags) ? project.tags.slice(0, 4) : [];
  const tagLabels = tags.length ? tags : [language, categoryLabel];

  const tagSvg = tagLabels.map((tag, index) => {
    const x = 112 + index * 152;
    return `<rect x="${x}" y="526" width="132" height="42" rx="21" fill="rgba(255,255,255,.11)" stroke="rgba(255,255,255,.10)"/>
      <text x="${x + 66}" y="553" text-anchor="middle" font-size="18" font-family="Inter, Arial, sans-serif" font-weight="800" fill="#efeee9">${escapeSvg(safeLine(tag, 12))}</text>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" role="img" aria-label="${escapeSvg(title)} repository preview">
  <defs>
    <linearGradient id="paper" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#fbfaf6"/><stop offset="1" stop-color="#eee9df"/></linearGradient>
    <linearGradient id="panel" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#0d0d0c"/><stop offset="1" stop-color="#252521"/></linearGradient>
    <linearGradient id="lime" x1="0" x2="1"><stop stop-color="#c8f04a"/><stop offset="1" stop-color="#ecff93"/></linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="26" stdDeviation="24" flood-color="#111" flood-opacity=".15"/></filter>
  </defs>
  <rect width="1200" height="720" rx="58" fill="url(#paper)"/>
  <rect x="70" y="70" width="1060" height="580" rx="54" fill="url(#panel)" filter="url(#shadow)"/>
  <rect x="110" y="110" width="212" height="42" rx="21" fill="url(#lime)"/>
  <text x="216" y="138" text-anchor="middle" font-size="17" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#10100f" letter-spacing="2.5">${escapeSvg(categoryLabel.toUpperCase())}</text>
  <circle cx="922" cy="246" r="128" fill="url(#lime)"/>
  ${markSvg(category)}
  <text x="110" y="232" font-size="72" font-family="Georgia, 'Times New Roman', serif" font-weight="900" fill="#f7f6f2" letter-spacing="-2">${escapeSvg(titleLineOne)}</text>
  ${titleLineTwo ? `<text x="110" y="314" font-size="72" font-family="Georgia, 'Times New Roman', serif" font-weight="900" fill="#f7f6f2" letter-spacing="-2">${escapeSvg(titleLineTwo)}</text>` : ''}
  <text x="112" y="366" font-size="22" font-family="Inter, Arial, sans-serif" font-weight="700" fill="#aaa9a1">${escapeSvg(safeLine(ownerRepo, 60))}</text>
  <text x="112" y="416" font-size="24" font-family="Inter, Arial, sans-serif" font-weight="500" fill="#d4d2ca">${escapeSvg(description)}</text>
  <rect x="112" y="462" width="770" height="1" fill="rgba(255,255,255,.12)"/>
  <text x="112" y="500" font-size="18" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-weight="800" fill="#c8f04a">${escapeSvg(language)}</text>
  <text x="270" y="500" font-size="18" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-weight="800" fill="#aaa9a1">★ ${escapeSvg(stat(project.stars))}</text>
  <text x="374" y="500" font-size="18" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-weight="800" fill="#aaa9a1">⑂ ${escapeSvg(stat(project.forks))}</text>
  <text x="484" y="500" font-size="18" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-weight="800" fill="#aaa9a1">${escapeSvg(status)}</text>
  <text x="612" y="500" font-size="18" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-weight="800" fill="#aaa9a1">${escapeSvg(updated)}</text>
  ${tagSvg}
  <text x="1050" y="586" text-anchor="end" font-size="18" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#c8f04a">README PREVIEW</text>
</svg>`;
}

export function createRepoPreviewDataUri(project = {}) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(createRepoPreviewSvg(project))}`;
}

export function ensureRepoPreviewImage(project = {}) {
  const preview = createRepoPreviewDataUri(project);
  const hasCustomPhoto = !isPlaceholderPhoto(project.photo);
  const photos = Array.isArray(project.photos) ? project.photos.filter(Boolean) : [];
  const hasCustomPhotos = photos.some((photo) => !isPlaceholderPhoto(photo));

  if (hasCustomPhotos) {
    return {
      ...project,
      repoPreview: preview,
      photos: photos.map((photo) => (isPlaceholderPhoto(photo) ? preview : photo)),
      photo: hasCustomPhoto ? project.photo : preview
    };
  }

  return {
    ...project,
    repoPreview: preview,
    photo: preview,
    photos: [preview]
  };
}
