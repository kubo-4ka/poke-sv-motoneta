// Offline support. Bump VERSION whenever app files change so installed apps pick up the update.
const VERSION = 'pmz-v12';
const APP_FILES = [
  './',
  'index.html',
  'style.css',
  'app.js',
  'data-pokemon.js',
  'data-tm.js',
  'data-movestats.js',
  'data-items.js',
  'data-items2.js',
  'data-materials.js',
  'data-bag.js',
  'data-life.js',
  'data-fashion.js',
  'data-trainers.js',
  'data-marks.js',
  'data-abilities.js',
  'data-abilities2.js',
  'data-shoplocs.js',
  'data-food.js',
  'data-natures.js',
  'data.js',
  'favicon.svg',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !isFont) return;

  // network first (so updates show up), falling back to the cache when offline
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok || res.type === 'opaque') {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => {
        if (hit) return hit;
        // ページの移動のときだけ index.html を返す（フォントや画像に HTML を返さない）
        if (req.mode === 'navigate') return caches.match('index.html');
        return Response.error();
      }))
  );
});
