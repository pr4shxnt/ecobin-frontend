// Install event
self.addEventListener("install", (event) => {
  console.log("Service Worker installed.");
  self.skipWaiting(); // Activate immediately
});

// Activate event
self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
  return self.clients.claim();
});

// Listen for push events
self.addEventListener("push", (event) => {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const title = data.title || "New Notification";
  const options = {
    body: data.body || "You have a new message!",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    data: data.url || "/", // Open URL when clicked
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data;
  event.waitUntil(clients.openWindow(url));
});
