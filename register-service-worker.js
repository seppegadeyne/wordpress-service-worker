const addToCache = async (pages) => {
    const pageCache = await window.caches.open('page-cache');
    await pageCache.addAll(pages);
}

if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js?ver=0.0.4');
    });

    let nodes = document.querySelectorAll('body a');
    nodes.forEach(node => {
        node.addEventListener('mouseover', event => {
            if(event.target.origin === 'https://my-domain.com') {
                addToCache([event.target.pathname]);
            }
        });
        node.addEventListener('touchstart', event => {
            if(event.target.origin === 'https://my-domain.com') {
                addToCache([event.target.pathname]);
            }
        });
    });
}
