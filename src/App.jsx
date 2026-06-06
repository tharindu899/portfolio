import { useEffect } from 'react';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import { useHashRoute } from './hooks/useHashRoute.js';
import { siteConfig } from './config/site.config.js';

const routeOrder = ['/', '/projects', '/contact'];
const routes = { '/': Home, '/projects': Projects, '/contact': Contact };

function interactiveTarget(target) {
  return Boolean(target?.closest?.('a, button, input, textarea, select, [role="button"], .repo-drawer, .repo-overlay, .readme-content, .toolbar'));
}

function useSwipeRoute(activeRoute) {
  useEffect(() => {
    if (!siteConfig.ui.enableSwipeNavigation || typeof window === 'undefined') return undefined;
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let tracking = false;

    const go = (direction) => {
      const currentIndex = routeOrder.indexOf(activeRoute);
      const safeIndex = currentIndex === -1 ? 0 : currentIndex;
      const nextIndex = Math.min(routeOrder.length - 1, Math.max(0, safeIndex + direction));
      const nextRoute = routeOrder[nextIndex];
      if (nextRoute && nextRoute !== activeRoute) window.location.hash = nextRoute;
    };

    const start = (event) => {
      if (document.body.classList.contains('modal-open') || interactiveTarget(event.target)) return;
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = Date.now();
      tracking = true;
    };

    const end = (event) => {
      if (!tracking || document.body.classList.contains('modal-open')) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      tracking = false;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6 && Date.now() - startTime < 900) go(dx < 0 ? 1 : -1);
    };

    window.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('touchend', end, { passive: true });
    return () => {
      window.removeEventListener('touchstart', start);
      window.removeEventListener('touchend', end);
    };
  }, [activeRoute]);
}

export default function App() {
  const route = useHashRoute();
  const Page = routes[route] || Home;
  useSwipeRoute(route);

  return (
    <Layout activeRoute={route} routes={routeOrder}>
      <div key={route} className="page-transition">
        <Page />
      </div>
    </Layout>
  );
}
