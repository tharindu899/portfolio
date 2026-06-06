const isBrowser = typeof window !== 'undefined' && typeof navigator !== 'undefined';

function swUrl() {
  const base = import.meta.env.BASE_URL || '/';
  return `${base.endsWith('/') ? base : `${base}/`}sw.js`;
}

async function clearBrowserCaches() {
  if (!('caches' in window)) return;
  const keys = await window.caches.keys();
  await Promise.all(keys.map((key) => window.caches.delete(key)));
}

export function registerOnlineOnlyPwa() {
  if (!isBrowser || !('serviceWorker' in navigator) || !import.meta.env.PROD) return;

  let reloadedForFreshWorker = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloadedForFreshWorker) return;
    reloadedForFreshWorker = true;
    window.location.reload();
  });

  window.addEventListener('load', async () => {
    try {
      await clearBrowserCaches();
      const registration = await navigator.serviceWorker.register(swUrl(), {
        scope: import.meta.env.BASE_URL || './',
        updateViaCache: 'none'
      });

      registration.active?.postMessage({ type: 'CLEAR_ALL_CACHES' });
      registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
      await registration.update();
    } catch (error) {
      console.warn('PWA service worker registration failed:', error);
    }
  });
}
