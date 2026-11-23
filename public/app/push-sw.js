/* Order alerts for the owner web app (iPhone home-screen app included).
   Plain Web Push from our own server — no third-party account. Also caches the app shell for fast reopen. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { title: 'QR Menu', body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(d.title || 'QR Menu', {
    body: d.body || '', tag: d.tag, renotify: !!d.tag, icon: 'icons/Icon-192.png', badge: 'icons/Icon-192.png',
    data: { url: d.url || './' }, requireInteraction: /order/i.test(d.title || ''),
  }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) if (c.url.startsWith(self.registration.scope) && 'focus' in c) return c.focus();
    return self.clients.openWindow(url);
  }));
});
