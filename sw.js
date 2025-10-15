// ================================
// 🧩 Misura Service Worker (v2)
// ================================

// const CACHE_NAME = "misura-v2";
const CACHE_NAME = "misura-v3"; // ← sürümü artır
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./arka_plan.svg"
];

// 🔹 INSTALL EVENT
self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(ASSETS);
      self.skipWaiting(); // hemen aktif ol
    })()
  );
});

// 🔹 ACTIVATE EVENT
self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
      self.clients.claim(); // aktif SW hemen kontrol etsin
    })()
  );
});

// 🔹 FETCH EVENT
self.addEventListener("fetch", event => {
  // Sadece GET isteklerini ele al (POST istekleri bozulmasın)
  if (event.request.method !== "GET") return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);

      try {
        // Ağdan getir ve cache’i güncelle
        const fetchResponse = await fetch(event.request);
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (error) {
        // Eğer offline’sa cache’den ver
        return cachedResponse || new Response("Offline moddasınız.", { status: 503 });
      }
    })()
  );
});
