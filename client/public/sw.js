// Service Worker with enhanced caching strategy
const CACHE_VERSION = '1';
const CACHE_NAMES = {
  static: `fyi-static-v${CACHE_VERSION}`,
  images: `fyi-images-v${CACHE_VERSION}`,
  api: `fyi-api-v${CACHE_VERSION}`,
};

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  '/robots.txt',
  '/sitemap.xml'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAMES.static)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Fetch event - implement stale-while-revalidate strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle API requests (Google Maps, YouTube) - cache with fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(CACHE_NAMES.api)
        .then(cache => {
          return fetch(request)
            .then(response => {
              // Cache successful responses
              if (response.ok) {
                cache.put(request, response.clone());
              }
              return response;
            })
            .catch(() => {
              // Return cached response on error
              return cache.match(request)
                .then(cachedResponse => {
                  if (cachedResponse) {
                    return cachedResponse;
                  }
                  // Return offline fallback for API errors
                  return new Response(
                    JSON.stringify({ error: 'Offline - Cached data unavailable' }),
                    { status: 503, statusText: 'Service Unavailable', headers: { 'Content-Type': 'application/json' } }
                  );
                });
            });
        })
    );
    return;
  }

  // Handle image requests - cache with stale-while-revalidate
  if (request.destination === 'image' || url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    event.respondWith(
      caches.open(CACHE_NAMES.images)
        .then(cache => {
          return cache.match(request)
            .then(cachedResponse => {
              const fetchPromise = fetch(request)
                .then(response => {
                  // Cache new images
                  if (response.ok) {
                    cache.put(request, response.clone());
                  }
                  return response;
                })
                .catch(() => {
                  // Return placeholder on error
                  return new Response(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="#e5e7eb" width="400" height="300"/></svg>',
                    { headers: { 'Content-Type': 'image/svg+xml' } }
                  );
                });

              // Return cached response immediately, update in background
              return cachedResponse || fetchPromise;
            });
        })
    );
    return;
  }

  // Handle static assets (JS, CSS, etc.) - cache first
  event.respondWith(
    caches.open(CACHE_NAMES.static)
      .then(cache => {
        return cache.match(request)
          .then(response => {
            if (response) {
              return response;
            }
            return fetch(request)
              .then(response => {
                if (response.ok) {
                  cache.put(request, response.clone());
                }
                return response;
              });
          });
      })
      .catch(() => {
        // Return offline page if available
        return caches.match('/');
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = Object.values(CACHE_NAMES);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
      .then(() => self.clients.claim())
  );
});