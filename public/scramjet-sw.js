importScripts('/sj-assets/scramjet.all.js?v=3');
const workerModule = self.$scramjetLoadWorker();
const scramjet = new workerModule.ScramjetServiceWorker();
self.addEventListener('install', function(event) { self.skipWaiting(); });
self.addEventListener('activate', function(event) { event.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(event) {
  event.respondWith((async function() {
    await scramjet.loadConfig();
    if (scramjet.route(event)) return await scramjet.fetch(event);
    return fetch(event.request);
  })());
});