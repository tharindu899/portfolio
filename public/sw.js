const OFFLINE_MESSAGE = 'This PWA is online-only. Please connect to the internet and reload.';

async function clearEveryCache() {
  if (!self.caches) return;
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => caches.delete(key)));
}

self.addEventListener('install', (event) => {
  event.waitUntil(clearEveryCache().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clearEveryCache().then(() => self.clients.claim()));
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'CLEAR_PWA_CACHE' || event.data?.type === 'CLEAR_ALL_CACHES') {
    event.waitUntil(clearEveryCache());
  }
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  // External live data must bypass the service worker completely.
  // This keeps GitHub API, raw README files, avatars, and badges fresh.
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).catch(() => new Response(OFFLINE_MESSAGE, {
      status: 503,
      statusText: 'Offline',
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
      }
    }))
  );
});
