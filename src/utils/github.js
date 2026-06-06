import { siteConfig } from '../config/site.config.js';
import { defaultProjectConfig, projectOverrides, repositoryLinks } from '../config/projects.config.js';
import { ensureRepoPreviewImage } from './repoPreview.js';

const API = 'https://api.github.com';
const UNGH_API = 'https://ungh.cc';
const REQUEST_TIMEOUT = 12000;

function githubFetchOptions(accept = 'application/vnd.github+json') {
  return {
    cache: 'no-store',
    headers: {
      Accept: accept,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  };
}

function timeoutSignal(ms = REQUEST_TIMEOUT) {
  if (typeof AbortController === 'undefined') return {};
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return {
    signal: controller.signal,
    done: () => clearTimeout(timer)
  };
}

async function fetchWithTimeout(url, options = {}, label = 'Request') {
  const timeout = timeoutSignal();
  try {
    const response = await fetch(url, { ...options, signal: timeout.signal });
    if (!response.ok) {
      const detail = await readResponseError(response);
      throw new Error(`${label} failed (${response.status})${detail}`);
    }
    return response;
  } finally {
    timeout.done?.();
  }
}

async function readResponseError(response) {
  try {
    const payload = await response.clone().json();
    return payload?.message ? `: ${payload.message}` : '';
  } catch {
    try {
      const text = await response.clone().text();
      return text ? `: ${text.slice(0, 140)}` : '';
    } catch {
      return '';
    }
  }
}

async function fetchJson(url, label = 'GitHub request', options = githubFetchOptions()) {
  const response = await fetchWithTimeout(url, options, label);
  return response.json();
}

function sortProjectsByUpdate(projects = []) {
  return [...projects].sort((a, b) => {
    const ta = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const tb = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return tb - ta;
  });
}

function uniqueById(projects = []) {
  const seen = new Set();
  return projects.filter((project) => {
    const key = comparableRepoKey(project.id || `${project.owner}/${project.name}`);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ─── GitHub config parsing ──────────────────────────────────────────────────

function cleanPart(value = '') {
  return String(value).trim().replace(/^@+/, '').replace(/\.git$/i, '').replace(/^\/+|\/+$/g, '');
}

function normalizeRepoName(name = '') {
  return cleanPart(name).toLowerCase();
}

function comparableRepoKey(value = '') {
  return cleanPart(value)
    .toLowerCase()
    .replace(/^https?:\/\/(www\.)?github\.com\//, '')
    .replace(/^git@github\.com:/, '')
    .replace(/\.git$/i, '')
    .replace(/[^a-z0-9]/g, '');
}

export function getGithubUsername(value = siteConfig.site.githubUsername) {
  const raw = String(value || '').trim();
  if (!raw) return '';

  try {
    const url = raw.startsWith('http') ? new URL(raw) : null;
    if (url?.hostname?.toLowerCase().includes('github.com')) {
      return cleanPart(url.pathname.split('/').filter(Boolean)[0] || '');
    }
  } catch {
    // Keep parsing below.
  }

  if (raw.includes('github.com/')) {
    const match = raw.match(/github\.com\/?([^/#?\s]+)/i);
    if (match?.[1]) return cleanPart(match[1]);
  }

  if (/^[^/]+\/[^/]+/.test(raw)) return cleanPart(raw.split('/')[0]);
  return cleanPart(raw);
}

export function getGithubProfileUrl(value = siteConfig.site.githubUsername) {
  const username = getGithubUsername(value);
  return username ? `https://github.com/${username}` : 'https://github.com';
}

export function parseGithubRepo(input, fallbackOwner = getGithubUsername()) {
  if (!input) return null;

  if (typeof input === 'object') {
    const source = input.repo || input.repository || input.full_name || input.url || input.repoUrl || input.html_url || input.name;
    const parsed = parseGithubRepo(source, input.owner || fallbackOwner);
    if (!parsed) return null;
    return { ...parsed, ...input, owner: parsed.owner, name: parsed.name, url: parsed.url };
  }

  const raw = String(input).trim();
  if (!raw) return null;

  const sshMatch = raw.match(/^git@github\.com:([^/\s]+)\/([^/#?\s]+?)(?:\.git)?$/i);
  if (sshMatch) {
    const owner = cleanPart(sshMatch[1]);
    const name = cleanPart(sshMatch[2]);
    return { owner, name, url: `https://github.com/${owner}/${name}` };
  }

  try {
    const url = raw.startsWith('http') ? new URL(raw) : null;
    if (url?.hostname?.toLowerCase().includes('github.com')) {
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        const owner = cleanPart(parts[0]);
        const name = cleanPart(parts[1]);
        return { owner, name, url: `https://github.com/${owner}/${name}` };
      }
      return null;
    }
  } catch {
    // Keep parsing below.
  }

  const short = raw.replace(/^github\.com\//i, '').replace(/[?#].*$/, '');
  const parts = short.split('/').filter(Boolean);
  if (parts.length >= 2) {
    const owner = cleanPart(parts[0]);
    const name = cleanPart(parts[1]);
    return { owner, name, url: `https://github.com/${owner}/${name}` };
  }

  const owner = cleanPart(fallbackOwner);
  const name = cleanPart(short);
  return owner && name ? { owner, name, url: `https://github.com/${owner}/${name}` } : null;
}

function configuredRepoSources() {
  const explicitLinks = Array.isArray(repositoryLinks) ? repositoryLinks : [];
  return explicitLinks.map((item) => parseGithubRepo(item)).filter(Boolean);
}

function overrideSourceForEntry(key, value = {}) {
  const fromValue = value.repo || value.repository || value.full_name || value.url || value.repoUrl || value.html_url;
  return parseGithubRepo(fromValue || key);
}

function overrideRepoSources() {
  return Object.keys(projectOverrides)
    .map((key) => overrideSourceForEntry(key, projectOverrides[key]) || parseGithubRepo(key))
    .filter(Boolean);
}

function getOverride(repoName, owner = getGithubUsername()) {
  const exact = projectOverrides[repoName];
  if (exact) return exact;

  const repoKey = comparableRepoKey(repoName);
  const ownerRepoKey = comparableRepoKey(`${owner}/${repoName}`);

  const key = Object.keys(projectOverrides).find((item) => {
    const override = projectOverrides[item] || {};
    const source = overrideSourceForEntry(item, override);
    const aliases = Array.isArray(override.aliases) ? override.aliases : [];
    const titleKey = comparableRepoKey(override.title || '');
    const aliasMatch = aliases.some((alias) => {
      const aliasKey = comparableRepoKey(alias);
      return aliasKey === repoKey || aliasKey === ownerRepoKey;
    });

    if (normalizeRepoName(item) === normalizeRepoName(repoName)) return true;

    return (
      comparableRepoKey(item) === repoKey ||
      comparableRepoKey(item) === ownerRepoKey ||
      titleKey === repoKey ||
      aliasMatch ||
      (source && comparableRepoKey(source.name) === repoKey) ||
      (source && comparableRepoKey(`${source.owner}/${source.name}`) === ownerRepoKey)
    );
  });

  return key ? projectOverrides[key] : {};
}

function applySourceConfig(project, source = {}) {
  if (!source || typeof source !== 'object') return project;

  const next = { ...project };
  const simpleFields = ['title', 'homepage', 'shortNote', 'note', 'status', 'language', 'defaultBranch'];
  simpleFields.forEach((field) => {
    if (source[field] !== undefined && source[field] !== '') next[field] = source[field];
  });

  if (source.repoUrl || source.url) next.repoUrl = source.repoUrl || source.url;
  if (source.photo) next.photo = source.photo;
  if (source.photos) next.photos = source.photos;
  else if (source.photo) next.photos = [source.photo];
  if (source.tags) next.tags = source.tags;
  if (source.featured !== undefined) next.featured = Boolean(source.featured);
  if (source.category) next.category = source.category;
  if (source.icon) next.icon = source.icon;
  else if (source.category) next.icon = detectIcon(next.category, next);
  if (source.shortNote) next.description = source.shortNote;

  return next;
}

// ─── auto-detectors ─────────────────────────────────────────────────────────

function detectTitle(name = '') {
  return cleanPart(name)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function repoCorpus(repo = {}) {
  const topics = Array.isArray(repo.topics) ? repo.topics : [];
  return [repo.name, repo.title, repo.description, repo.language, repo.homepage, ...topics]
    .filter(Boolean)
    .join(' ')
    .replace(/[-_./]+/g, ' ')
    .toLowerCase();
}

function topicIncludes(repo, words = []) {
  const topics = Array.isArray(repo.topics) ? repo.topics.map((t) => String(t).toLowerCase()) : [];
  return topics.some((topic) => words.includes(topic));
}

function detectCategory(repo) {
  const lang = String(repo.language || '').toLowerCase();
  const corpus = repoCorpus(repo);

  if (
    topicIncludes(repo, ['finance', 'fintech', 'budget', 'money', 'expense', 'salary', 'cash', 'wallet']) ||
    /\bcash\b|\bmoney\b|\bfinance\b|\bfinancial\b|\bwallet\b|\bbudget\b|\bsalary\b|\bledger\b|\bexpense\b|\bincome\b|\btracker\b|\bbank\b|\bloan\b|\bsaving\b|\bpayment\b/.test(corpus)
  ) return 'finance';

  if (
    topicIncludes(repo, ['media', 'movie', 'movies', 'streaming', 'tmdb', 'telegram', 'video', 'music', 'anime']) ||
    /\bmovies?\b|\bfilm\b|\bcinema\b|\bstream|\bvideo|\bmusic\b|\bpodcast\b|\btmdb\b|\btelegram.?bot\b|\bseries\b|\banime\b|\biptv\b|\bstremio\b/.test(corpus)
  ) return 'media';

  if (
    lang === 'kotlin' ||
    lang === 'java' ||
    topicIncludes(repo, ['android', 'kotlin', 'jetpack-compose', 'apk', 'capacitor', 'cordova']) ||
    /\bandroid\b|\bapk\b|\baab\b|\bplay store\b|\bjetpack\b|\bcompose\b|\bcapacitor\b|\bcordova\b|\bmobile app\b/.test(corpus)
  ) return 'android';

  if (
    lang === 'shell' ||
    lang === 'dockerfile' ||
    topicIncludes(repo, ['automation', 'ci-cd', 'github-actions', 'bot', 'script', 'workflow', 'termux', 'deploy', 'docker']) ||
    /\bautomation\b|\bci\b|\bcd\b|\bworkflow\b|\bgithub.?action\b|\bscript\b|\bdeploy\b|\btermux\b|\bpipeline\b|\bbot\b|\bscheduler\b|\bdocker\b|\bworker\b|\bcron\b/.test(corpus)
  ) return 'automation';

  if (
    ['javascript', 'typescript', 'html', 'css', 'vue', 'svelte'].includes(lang) ||
    topicIncludes(repo, ['react', 'vite', 'vue', 'nextjs', 'website', 'web', 'pwa', 'portfolio', 'dashboard']) ||
    /\breact\b|\bvite\b|\bvue\b|\bsvelte\b|\bangular\b|\bnextjs\b|\bwebsite\b|\bportfolio\b|\bdashboard\b|\blanding.?page\b|\bpwa\b|\bwebapp\b/.test(corpus)
  ) return 'web';

  return 'tools';
}

function detectIcon(category, repo = {}) {
  const lang = String(repo.language || '').toLowerCase();
  const corpus = repoCorpus(repo);

  if (/\bnote\b|\bnotes\b|\bmarkdown\b|\bwriter\b|\bink\b|\bjournal\b|\bdiary\b/.test(corpus)) return 'pen';
  if (/\bbook\b|\bread\b|\breader\b|\bdocs?\b|\bwiki\b/.test(corpus)) return 'book';
  if (/\bchart\b|\banalytics\b|\btrading\b|\bindicator\b|\bdashboard\b|\breport\b/.test(corpus)) return 'chart';

  switch (category) {
    case 'android':
      return 'android';
    case 'finance':
      if (/\bpiggy\b|\bsaving\b|\bsavings\b|cashnest/.test(corpus)) return 'piggy';
      if (/\bsalary\b|\bincome\b|\bpayroll\b|\bpayment\b|\bpay\b/.test(corpus)) return 'money';
      return 'wallet';
    case 'media':
      return 'film';
    case 'automation':
      return ['shell', 'python', 'dockerfile'].includes(lang) || /\btermux\b|\bscript\b|\bcli\b|\bcommand\b/.test(corpus) ? 'terminal' : 'bolt';
    case 'web':
      return /\bportfolio\b|\bwebsite\b|\blanding\b|\bpage\b/.test(corpus) || ['html', 'css'].includes(lang) ? 'globe' : 'react';
    default:
      return ['shell', 'python', 'dockerfile'].includes(lang) ? 'terminal' : 'code';
  }
}

function detectTags(repo) {
  const lang = repo.language || '';
  const topics = Array.isArray(repo.topics) ? repo.topics : [];

  const topicTags = topics
    .map((t) => String(t)
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '))
    .filter((t) => t.toLowerCase() !== String(lang).toLowerCase());

  const base = lang ? [lang, ...topicTags] : topicTags;
  return base.length ? base.slice(0, 4) : [defaultProjectConfig.tags[0]];
}

function detectStatus(repo) {
  if (!repo.pushed_at && !repo.updated_at) return 'Public';
  const last = new Date(repo.pushed_at || repo.updated_at);
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 6);
  return last > cutoff ? 'Active' : 'Public';
}

// ─── fallback/local projects ────────────────────────────────────────────────

function makeFallbackProject(source, index = 0) {
  const parsed = typeof source === 'string' ? parseGithubRepo(source) : source;
  const name = parsed?.name || cleanPart(source);
  const owner = parsed?.owner || getGithubUsername();
  const override = getOverride(name, owner);
  const repoUrl = override.repoUrl || override.url || parsed?.url || `https://github.com/${owner}/${name}`;
  const fallbackRepo = {
    name,
    title: override.title,
    description: override.shortNote || override.note || defaultProjectConfig.shortNote,
    language: override.language,
    topics: override.tags || []
  };
  const category = override.category || parsed?.category || detectCategory(fallbackRepo);
  const icon = override.icon || parsed?.icon || detectIcon(category, fallbackRepo);

  const project = {
    id: `${owner}/${name}`,
    owner,
    name,
    title: override.title || parsed?.title || detectTitle(name),
    repoUrl,
    homepage: override.homepage || parsed?.homepage || '',
    description: override.shortNote || parsed?.shortNote || defaultProjectConfig.shortNote,
    shortNote: override.shortNote || parsed?.shortNote || defaultProjectConfig.shortNote,
    note: override.note || parsed?.note || defaultProjectConfig.note,
    category,
    tags: override.tags || parsed?.tags || defaultProjectConfig.tags,
    status: override.status || parsed?.status || defaultProjectConfig.status,
    featured: Boolean(override.featured || parsed?.featured || index < 3),
    photo: override.photo || parsed?.photo || defaultProjectConfig.photo,
    photos: override.photos || parsed?.photos || [override.photo || parsed?.photo || defaultProjectConfig.photo],
    language: override.language || parsed?.language || 'GitHub',
    stars: Number(parsed?.stars || parsed?.stargazers_count || 0),
    forks: Number(parsed?.forks || parsed?.forks_count || 0),
    updatedAt: parsed?.updatedAt || parsed?.updated_at || parsed?.pushed_at || override.updatedAt || '',
    icon,
    defaultBranch: override.defaultBranch || parsed?.defaultBranch || parsed?.default_branch || 'main',
    fromFallback: true
  };

  return ensureRepoPreviewImage(applySourceConfig(project, parsed));
}

export function fallbackProjects() {
  const explicitRepos = configuredRepoSources();
  if (explicitRepos.length) return explicitRepos.map((source, i) => makeFallbackProject(source, i));

  return Object.keys(projectOverrides)
    .map((key) => overrideSourceForEntry(key, projectOverrides[key]) || parseGithubRepo(key))
    .filter(Boolean)
    .map((source, i) => makeFallbackProject(source, i));
}

// ─── live repo mappers ──────────────────────────────────────────────────────

function unghRepoToGithubShape(repo = {}, ownerFromRequest = '') {
  const owner = repo.owner?.login || repo.owner || repo.user || ownerFromRequest || getGithubUsername();
  const name = repo.name || repo.repo || repo.slug;
  return {
    owner: { login: owner },
    name,
    full_name: `${owner}/${name}`,
    html_url: repo.html_url || repo.url || `https://github.com/${owner}/${name}`,
    homepage: repo.homepage || repo.website || '',
    description: repo.description || '',
    language: repo.language || '',
    topics: repo.topics || [],
    stargazers_count: repo.stargazers_count ?? repo.stars ?? repo.starCount ?? 0,
    forks_count: repo.forks_count ?? repo.forks ?? repo.forkCount ?? 0,
    updated_at: repo.updated_at || repo.updatedAt || repo.pushed_at || repo.pushedAt || '',
    pushed_at: repo.pushed_at || repo.pushedAt || repo.updated_at || repo.updatedAt || '',
    default_branch: repo.default_branch || repo.defaultBranch || 'main',
    private: Boolean(repo.private),
    fork: Boolean(repo.fork),
    archived: Boolean(repo.archived)
  };
}

export function repoToProject(repo) {
  const owner = repo.owner?.login || repo.owner || getGithubUsername();
  const override = getOverride(repo.name, owner);
  const photo = override.photo || defaultProjectConfig.photo;
  const category = override.category || detectCategory(repo);

  const project = {
    id: `${owner}/${repo.name}`,
    owner,
    name: repo.name,
    title: override.title || detectTitle(repo.name),
    repoUrl: override.repoUrl || override.url || repo.html_url || `https://github.com/${owner}/${repo.name}`,
    homepage: override.homepage || repo.homepage || '',
    description: repo.description || override.shortNote || defaultProjectConfig.shortNote,
    shortNote: override.shortNote || repo.description || defaultProjectConfig.shortNote,
    note: override.note || repo.description || defaultProjectConfig.note,
    category,
    tags: override.tags || detectTags(repo),
    status: override.status || detectStatus(repo),
    featured: Boolean(override.featured),
    photo,
    photos: override.photos || [photo],
    language: repo.language || override.language || 'Other',
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    updatedAt: repo.updated_at || repo.pushed_at || '',
    icon: override.icon || detectIcon(category, repo),
    defaultBranch: repo.default_branch || override.defaultBranch || 'main',
    fromFallback: false
  };

  return project;
}

async function fetchRepoFromGithub(owner, name) {
  return fetchJson(`${API}/repos/${owner}/${name}`, `${owner}/${name}`);
}

async function fetchRepoFromUngh(owner, name) {
  const payload = await fetchJson(`${UNGH_API}/repos/${owner}/${name}`, `${owner}/${name} mirror`, { cache: 'no-store' });
  const repo = payload?.repo || payload?.repository || payload;
  if (!repo) throw new Error('Mirror repo response empty');
  return unghRepoToGithubShape(repo, owner);
}

async function fetchRepoAny(source) {
  const attempts = [
    () => fetchRepoFromGithub(source.owner, source.name),
    () => fetchRepoFromUngh(source.owner, source.name)
  ];

  let lastError;
  for (const attempt of attempts) {
    try {
      const repo = await attempt();
      if (repo?.name) return repo;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error(`Could not load ${source.owner}/${source.name}`);
}

async function fetchConfiguredRepos(sources) {
  const results = await Promise.allSettled(sources.map((source) => fetchRepoAny(source)));
  const projects = results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return ensureRepoPreviewImage(applySourceConfig(repoToProject(result.value), sources[index]));
    }
    return makeFallbackProject(sources[index], index);
  });

  return sortProjectsByUpdate(uniqueById(projects));
}

async function fetchGithubUserRepos(owner) {
  const repos = [];
  let page = 1;
  while (true) {
    const batch = await fetchJson(
      `${API}/users/${owner}/repos?type=owner&sort=updated&direction=desc&per_page=100&page=${page}`,
      `${owner} public repos`
    );
    if (!Array.isArray(batch) || batch.length === 0) break;
    repos.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }
  return repos;
}

async function fetchGithubSearchRepos(owner) {
  const repos = [];
  let page = 1;
  while (true) {
    const payload = await fetchJson(
      `${API}/search/repositories?q=user:${encodeURIComponent(owner)}+fork:false&sort=updated&order=desc&per_page=100&page=${page}`,
      `${owner} search repos`
    );
    const batch = Array.isArray(payload?.items) ? payload.items : [];
    if (!batch.length) break;
    repos.push(...batch);
    if (batch.length < 100 || repos.length >= 1000) break;
    page += 1;
  }
  return repos;
}

async function fetchUnghUserRepos(owner) {
  const payload = await fetchJson(`${UNGH_API}/users/${owner}/repos`, `${owner} mirror repos`, { cache: 'no-store' });
  const batch = Array.isArray(payload?.repos)
    ? payload.repos
    : Array.isArray(payload?.repositories)
      ? payload.repositories
      : Array.isArray(payload)
        ? payload
        : [];
  return batch.map((repo) => unghRepoToGithubShape(repo, owner));
}

async function fetchUserReposAny(owner) {
  const attempts = [fetchGithubUserRepos, fetchGithubSearchRepos, fetchUnghUserRepos];
  const errors = [];

  for (const attempt of attempts) {
    try {
      const repos = await attempt(owner);
      if (Array.isArray(repos) && repos.length) return repos;
    } catch (error) {
      errors.push(error);
    }
  }

  throw errors[0] || new Error(`Could not load ${owner} repos`);
}

export async function fetchPublicRepos(username = siteConfig.site.githubUsername) {
  const explicitRepos = configuredRepoSources();
  if (explicitRepos.length) return fetchConfiguredRepos(explicitRepos);

  const owner = getGithubUsername(username);
  const localSources = overrideRepoSources();
  if (!owner && localSources.length) return fetchConfiguredRepos(localSources);
  if (!owner) return fallbackProjects();

  try {
    const repos = await fetchUserReposAny(owner);
    const projects = repos
      .filter((repo) => repo?.name && !repo.private && !repo.fork && !repo.archived)
      .map((repo) => ensureRepoPreviewImage(repoToProject(repo)));

    if (projects.length) return sortProjectsByUpdate(uniqueById(projects));
  } catch (error) {
    console.warn('Live GitHub repo loading failed. Trying configured repos.', error);
  }

  // Last safe path: use your configured project/repo links. This means the site
  // still works even when the browser blocks api.github.com or GitHub rate-limits.
  if (localSources.length) {
    const projects = await fetchConfiguredRepos(localSources);
    if (projects.length) return projects;
  }

  return fallbackProjects();
}

// ─── misc exports ───────────────────────────────────────────────────────────

export function projectYearRange(projects = []) {
  const years = projects
    .map((p) => (p.updatedAt ? new Date(p.updatedAt).getFullYear() : null))
    .filter(Boolean);
  if (!years.length) return String(new Date().getFullYear());
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? String(max) : `${min} \u2014 ${max}`;
}

export async function fetchProjectReadme(project) {
  if (!project?.name) throw new Error('Missing project name');
  const owner = project.owner || getGithubUsername();
  const branch = project.defaultBranch || 'main';

  const attempts = [
    async () => {
      const apiUrl = `${API}/repos/${owner}/${project.name}/readme`;
      const response = await fetchWithTimeout(apiUrl, githubFetchOptions('application/vnd.github.raw'), `${owner}/${project.name} README`);
      return response.text();
    },
    ...['README.md', 'readme.md', 'README', 'Readme.md'].map((name) => async () => {
      const raw = `https://raw.githubusercontent.com/${owner}/${project.name}/${branch}/${name}`;
      const response = await fetchWithTimeout(raw, { cache: 'no-store' }, `${name} raw README`);
      return response.text();
    })
  ];

  let lastError;
  for (const attempt of attempts) {
    try {
      const text = await attempt();
      if (text) return text;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('README not found for this public repo.');
}

export function summarizeProjects(projects = []) {
  const languages = new Set(projects.map((p) => p.language).filter(Boolean));
  return {
    projects: projects.length,
    stars: projects.reduce((s, p) => s + (p.stars || 0), 0),
    forks: projects.reduce((s, p) => s + (p.forks || 0), 0),
    languages: languages.size
  };
}
