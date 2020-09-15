importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.setConfig({
    debug: false
})

workbox.googleAnalytics.initialize();

workbox.routing.registerRoute(
    ({url, request}) => request.destination === 'font' &&
                        !url.pathname.startsWith('/wp-admin/'),
    new workbox.strategies.CacheFirst({
        cacheName: 'font-cache',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    ({url, request}) => request.destination === 'style' &&
                        !url.pathname.startsWith('/wp-admin/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'css-cache',
    })
);

workbox.routing.registerRoute(
    ({url, request}) =>  request.destination === 'script' &&
                    !url.pathname.startsWith('/wp-admin/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'js-cache',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            })
        ]
    })
);

workbox.routing.registerRoute(
    ({url, request}) =>  request.destination === 'image' &&
                    !url.pathname.startsWith('/wp-admin/'),
    new workbox.strategies.CacheFirst({
        cacheName: 'images-cache',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    })
);

workbox.routing.registerRoute(
    ({url}) =>  url.origin === self.location.origin &&
                !url.pathname.startsWith('/wp-admin/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'page-cache',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60 // 7 Days
            })
        ]
    })
);

workbox.routing.setCatchHandler(({ url, event, params }) => {
    return caches.match('/offline/')
});
