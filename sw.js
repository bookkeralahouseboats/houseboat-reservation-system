const CACHE_NAME = 'houseboat-pwa-v4';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/BKH_icon_192x192.png',
  './icons/BKH_icon_512x512 (1).png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch((error) => {
        console.warn('Asset caching failed during install:', error);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('script.google.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
