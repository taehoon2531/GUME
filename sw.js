// ===================================================================
// (주)에스앤더블류 구매 관리 대시보드 — Service Worker (PWA)
// ===================================================================
const CACHE_NAME = 'snw-pwa-v4.6';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './data/vendor_bank_docs.js',
  './data/vendor_master_data.js',
  './data/sub_order_master.js',
  './data/sub_order_sheets_history.js',
  './lib/pdf.min.js',
  './lib/pdf.worker.min.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/icon.svg'
];

// Install: Pre-cache App Shell & force immediate activate
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS).catch(err => {
        console.warn('PWA Pre-cache notice:', err);
      });
    })
  );
});

// Activate: Clean up all older caches & take control immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name.startsWith('snw-pwa-') && name !== CACHE_NAME)
          .map(name => {
            console.log('PWA deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Strictly Network-First with Safe Fallback
self.addEventListener('fetch', event => {
  const req = event.request;
  
  if (req.method !== 'GET' || !req.url.startsWith('http')) {
    return;
  }

  const isHtml = req.mode === 'navigate' || (req.headers.get('accept') && req.headers.get('accept').includes('text/html'));
  const isJs = req.url.includes('.js');
  
  event.respondWith(
    fetch(req, isHtml ? { cache: 'no-cache' } : {})
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(req, resClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(req).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (isHtml) {
            return caches.match('./index.html');
          }
          if (isJs) {
            // Return empty JS instead of 503 text to prevent SyntaxError crash
            return new Response('/* offline fallback */', {
              headers: { 'Content-Type': 'application/javascript; charset=utf-8' }
            });
          }
          return new Response('Offline', { status: 404, statusText: 'Not Found' });
        });
      })
  );
});
