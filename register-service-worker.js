const addToCache = async (pages) => {
    const pageCache = await window.caches.open('page-cache');
    await pageCache.addAll(pages);
}

// Check that service workers are registered
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        addToCache([window.location.pathname]);
        navigator.serviceWorker.register('/service-worker.js');
    });
}
