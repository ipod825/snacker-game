// A name for our cache
const CACHE_NAME = 'snaker-game-cache-v1';

// The files we want to cache
const urlsToCache = [
  '/', 'index.html',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap'
];

// Install the service worker and cache the game assets
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    console.log('Opened cache');
    return cache.addAll(urlsToCache);
  }));
});

// Fetch assets from the cache or network
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => {
    // Cache hit - return response from cache
    if (response) {
      return response;
    }
    // Not in cache - fetch from network
    return fetch(event.request);
  }));
});
