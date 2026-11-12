// 숭실대학교 화학공학과 공식 PWA Service Worker
const CACHE_NAME = 'ssu-cheme-v1.1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './admin.html',
  './data.js',
  './manifest.webmanifest',
  './assets/css/style.css',
  './assets/css/admin.css',
  './assets/js/app.js',
  './assets/js/admin-core.js',
  './assets/js/admin.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/apple-touch-icon.png',
  './assets/ssu-logo.png'
];

// Install: Cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching App Shell');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => console.warn('Cache addAll error:', err));
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Stale-While-Revalidate strategy for internal assets, Network-First for external
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip cross-origin non-CDN requests or API requests
  if (url.origin !== self.location.origin && !url.hostname.includes('cdn') && !url.hostname.includes('unpkg')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});

// Push notification listener (ready for Firebase FCM / Web Push)
self.addEventListener('push', (event) => {
  let title = '숭실대학교 화학공학과';
  let options = {
    body: '새로운 학과 공지사항이 등록되었습니다.',
    icon: './assets/icons/icon-192.png',
    badge: './assets/icons/icon-192.png',
    data: { url: './index.html#notices' }
  };

  if (event.data) {
    try {
      const data = event.data.json();
      title = data.title || title;
      options.body = data.body || options.body;
      if (data.url) options.data.url = data.url;
    } catch (e) {
      options.body = event.data.text();
    }
  }

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || './index.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
