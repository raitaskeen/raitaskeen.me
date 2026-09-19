// Service Worker for raitaskeen portfolio PWA
const CACHE_NAME = "raitaskeen-v5";
const CACHE_PREFIX = "raitaskeen-";
const MAX_DYNAMIC_ITEMS = 60;

const PRECACHE_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/assets/images/logo.svg",
  "/icon-192.png",
  "/icon-192-maskable.png",
  "/icon-512.png",
  "/icon-maskable.png",
];

const OFFLINE_FALLBACK_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Offline | Taskeen Haider</title>
  <style>
    body {
      margin: 0;
      padding: 40px 20px;
      background: #0b0c0e;
      color: #e2e4e9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .card {
      max-width: 460px;
      background: #14151a;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 32px;
      text-align: center;
    }
    h1 { font-size: 20px; color: #ffdb70; margin-top: 0; }
    p { color: #9ea0a8; font-size: 14px; line-height: 1.6; }
    a {
      display: inline-block;
      margin-top: 16px;
      padding: 10px 20px;
      background: #ffdb70;
      color: #0b0c0e;
      font-weight: 600;
      border-radius: 6px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Connection Offline</h1>
    <p>You appear to be offline or experiencing connection disruption. Previously visited pages remain available.</p>
    <a href="/">Return to Home</a>
  </div>
</body>
</html>`;

// Helper: Trim dynamic cache to prevent unbounded storage growth
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    const excess = keys.length - maxItems;
    for (let i = 0; i < excess; i++) {
      // Don't delete precached root shell
      const url = new URL(keys[i].url);
      if (url.pathname !== "/") {
        await cache.delete(keys[i]);
      }
    }
  }
}

// Install: Cache critical app shell assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: Purge obsolete caches strictly within app namespace and claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch: Strategy depending on request type
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Always bypass Service Worker for API routes and PDF files (e.g. fresh résumé)
  if (url.pathname.startsWith("/api/") || url.pathname.endsWith(".pdf")) {
    return;
  }

  // Bypass Next.js Server Component streaming and router prefetch requests
  if (
    request.headers.get("RSC") === "1" ||
    request.headers.has("Next-Router-Prefetch") ||
    url.searchParams.has("_rsc")
  ) {
    return;
  }

  // 1. Navigation requests: Network-first with cached shell fallback and reliable offline response
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            event.waitUntil(
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone))
            );
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;

          // Fallback to precached home shell
          const homeResponse = await caches.match("/");
          if (homeResponse) return homeResponse;

          // Reliable offline HTML response if no cache available (never return undefined)
          return new Response(OFFLINE_FALLBACK_HTML, {
            status: 200,
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        })
    );
    return;
  }

  // 2. Immutable hashed static assets: Cache-First
  const isImmutableAsset = url.pathname.startsWith("/_next/static/");

  if (isImmutableAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            event.waitUntil(
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone))
            );
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 3. Public static assets & fonts: Stale-While-Revalidate with bounded dynamic cache
  const isPublicAsset =
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/manifest.") ||
    url.pathname.match(/\.(js|css|svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|webmanifest|json)$/);

  if (isPublicAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              event.waitUntil(
                caches
                  .open(CACHE_NAME)
                  .then((cache) => cache.put(request, responseClone))
                  .then(() => trimCache(CACHE_NAME, MAX_DYNAMIC_ITEMS))
              );
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
