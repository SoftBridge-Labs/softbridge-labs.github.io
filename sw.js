const CACHE_NAME = 'softbridge-media-cache-v3';
const MEDIA_ASSETS = [
  '/assets/favicon.ico',
  '/assets/backgrounds/home.jpg',
  '/assets/backgrounds/about.jpg',
  '/assets/backgrounds/products.jpg',
  '/assets/backgrounds/blog.jpg',
  '/assets/backgrounds/legal.jpg',
  '/assets/backgrounds/settings.jpg',
  '/assets/backgrounds/videos/home.mp4',
  '/assets/backgrounds/videos/about.mp4',
  '/assets/backgrounds/videos/products.mp4',
  '/assets/backgrounds/videos/blog.mp4',
  '/assets/backgrounds/videos/legal.mp4',
  '/assets/backgrounds/videos/app.mp4',
  '/assets/backgrounds/videos/settings.mp4',
  '/assets/backgrounds/app.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened Media Cache');
      return cache.addAll(MEDIA_ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only handle media files
  if (url.pathname.match(/\.(mp4|jpg|jpeg|png|gif|svg|ico)$/)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        });
      })
    );
  }
  // All other requests (HTML, CSS, JS) bypass Cache and go directly to Network
  return;
});
