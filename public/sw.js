// The site no longer ships a service worker. This one replaces the old
// offline cache: it clears every cache it left behind, unregisters itself,
// and reloads open tabs so visitors get the new site from the network.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.registration.unregister();
      const tabs = await self.clients.matchAll({ type: "window" });
      tabs.forEach((tab) => tab.navigate(tab.url));
    })(),
  );
});
