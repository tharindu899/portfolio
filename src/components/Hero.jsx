import { siteConfig } from '../config/site.config.js';
import Icon from './icons/Icon.jsx';
import { formatNumber } from '../utils/format.js';
import { getGithubProfileUrl, getGithubUsername } from '../utils/github.js';

const HIGHLIGHT_ICONS = {
  android: 'android', Android: 'android',
  react: 'react', React: 'react',
  kotlin: 'code', Kotlin: 'code',
  vite: 'bolt', Vite: 'bolt',
  firebase: 'bolt', Firebase: 'bolt',
  'github actions': 'terminal', 'GitHub Actions': 'terminal',
  automation: 'bolt', Automation: 'bolt',
  web: 'react', Web: 'react',
  ui: 'pen', 'UI/UX': 'pen',
};

function highlightIcon(label) {
  return HIGHLIGHT_ICONS[label] || HIGHLIGHT_ICONS[label?.toLowerCase()] || 'code';
}

export default function Hero({ stats }) {
  const { profile, home, site } = siteConfig;
  const mainLinks = siteConfig.links.slice(0, 4);
  const githubUsername = getGithubUsername(site.githubUsername);
  const githubProfileUrl = getGithubProfileUrl(site.githubUsername);
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-kicker">{home.kicker}</div>
        <h1 className="hero-name">
          {profile.firstName}<br />
          <em>{profile.lastName}</em>
        </h1>
        <p className="hero-desc">{home.intro}</p>
        <a className="github-badge" href={githubProfileUrl} target="_blank" rel="noreferrer">
          <span className="github-badge__icon"><Icon name="github" size={22} /></span>
          <span><strong>@{githubUsername || 'GitHub'}</strong><small>{formatNumber(stats.projects)} public repos · public builder</small></span>
          <Icon name="external" size={14} />
        </a>
        <div className="hero-chips">
          {profile.highlights.map((item) => (
            <span className={`chip ${item === profile.highlights[0] ? 'dark' : ''}`} key={item}>
              <Icon name={highlightIcon(item)} size={12} /> {item}
            </span>
          ))}
        </div>
      </div>
      <div className="hero-right">
        <div>
          <div className="hero-stat-num">{formatNumber(stats.projects)}+</div>
          <div className="hero-stat-label">public repos</div>
        </div>
        <div className="hero-social">
          {mainLinks.map((link) => (
            <a href={link.url} target="_blank" rel="noreferrer" key={link.label} aria-label={link.label} data-social={link.icon}>
              <Icon name={link.icon} size={15} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
