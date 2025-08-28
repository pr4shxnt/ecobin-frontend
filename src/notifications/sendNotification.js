export const sendLocalNotification = async (title, body) => {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification(title, {
      body,
      icon: "/android-chrome-192x192.png",
      badge: "/icons/badge-72x72.png",
    });
  }
};
