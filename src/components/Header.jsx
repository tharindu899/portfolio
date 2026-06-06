import { siteConfig } from '../config/site.config.js';
import Icon from './icons/Icon.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import PwaInstallButton from './PwaInstallButton.jsx';

const nav = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/projects', label: 'Projects', icon: 'grid' },
  { path: '/contact', label: 'Contact', icon: 'mail' }
];

export default function Header({ activeRoute, theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <a className="nav-logo" href="#/" aria-label="Home">
        {siteConfig.profile.firstName}<em>.</em>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        {nav.map((item) => {
          const isActive = activeRoute === item.path;
          return (
            <a key={item.path} href={`#${item.path}`} className={isActive ? 'active' : ''} aria-current={isActive ? 'page' : undefined}>
              <Icon name={item.icon} size={13} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <PwaInstallButton />
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  );
}
