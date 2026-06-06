import { useEffect, useState } from 'react';
import { siteConfig } from '../config/site.config.js';
import Header from './Header.jsx';

const STORAGE_KEY = 'work-gallery-command-theme';

function getSavedTheme() {
  if (typeof window === 'undefined') return siteConfig.ui.defaultTheme || 'day';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'day') return saved;
  return siteConfig.ui.defaultTheme || 'day';
}

export default function Layout({ children, activeRoute, routes = [] }) {
  const [theme, setTheme] = useState(getSavedTheme);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
  }, [theme]);

  const activeIndex = Math.max(0, routes.indexOf(activeRoute));
  const toggleTheme = () => setTheme((value) => (value === 'day' ? 'dark' : 'day'));

  return (
    <div className="app-shell">
      <Header activeRoute={activeRoute} theme={theme} onToggleTheme={toggleTheme} />
      <main>{children}</main>
      <div className="swipe-dots" aria-label="Swipe page indicator">
        {routes.map((route, index) => (
          <a key={route} href={`#${route}`} className={index === activeIndex ? 'active' : ''} aria-label={`Go to page ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}
