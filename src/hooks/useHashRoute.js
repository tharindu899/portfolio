import { useEffect, useState } from 'react';

function normalizeHash() {
  const route = window.location.hash.replace(/^#/, '') || '/';
  return route.startsWith('/') ? route : `/${route}`;
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => (typeof window === 'undefined' ? '/' : normalizeHash()));

  useEffect(() => {
    const onHashChange = () => setRoute(normalizeHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}
