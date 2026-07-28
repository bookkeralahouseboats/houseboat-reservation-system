const CACHE_NAME = 'houseboat-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  ); 
});

self.addEventListener('fetch', (event) => {
  // Let Google Apps Script requests pass through directly to the network
  if (event.request.url.includes('script.google.com')) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
