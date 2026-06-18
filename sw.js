/* Birthstarday — Service Worker */
const CACHE = 'bsd-v1';
const CORE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

/* Install: cache core assets */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

/* Activate: clean old caches */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* Fetch: network-first, cache fallback */
self.addEventListener('fetch', e => {
  /* Pass through non-GET and cross-origin tile/CDN requests */
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.hostname.includes('openstreetmap') ||
      url.hostname.includes('cloudflare') ||
      url.hostname.includes('nominatim') ||
      url.hostname.includes('onesignal')) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('/index.html')))
  );
});

/* Push notification handler */
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || 'Birthstarday 🌙';
  const options = {
    body: data.body || 'Your Janma Tithi is approaching — check your Indian birthday!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'bsd-reminder',
    data: { url: data.url || '/' }
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url || '/'));
});
