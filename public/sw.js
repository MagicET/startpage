const CACHE_NAME = 'app-cache-v1';
const PRECACHE = [
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/sw.js',
  '/favicon_star_192.png',
  '/favicon_star_512.png',
  '/favicon_star.svg',
  '/assets/index-0fY-pEGC.css',
  '/assets/index-DL-C6QIE.js'
];

// インストール時に、必要なファイルをキャッシュする
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// 有効化時に、古いキャッシュを削除する
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// リクエストのたびに呼ばれる
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // ページ遷移:ネットワーク優先、失敗したらキャッシュ → offline.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cached = await caches.match(request);
        return cached || caches.match('/offline.html');
      })
    );
    return;
  }

  // それ以外(CSS・画像など):キャッシュ優先、なければ取得して保存
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
