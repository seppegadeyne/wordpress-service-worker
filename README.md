# Install a service worker
## Optimized for WordPress
Install a service worker to make your website work faster and also support offline viewing. You're website will be a qualified Progressive Web App (PWA). 

By installing a service worker you will increase page loading times up to +50x times. You can use this setup for any kind of website.

### Register the service worker
#### Add to your functions.php
```php
function serviceworker() {
  if(get_current_user_id() == 0) {
  ?>
    <script>
        const addToCache = async(urls) => {
            const pageCache = await window.caches.open('page-cache');
            await pageCache.addAll(urls);
        }

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js?ver=0.0.15');

                let nodes = document.querySelectorAll('body a');

                nodes.forEach(node => {
                    node.addEventListener('mouseover', event => {
                        if(event.target.origin === self.location.origin) {
                            addToCache([event.target.pathname]);
                        }
                    });
                    node.addEventListener('touchstart', event => {
                        if(event.target.origin === self.location.origin) {
                            addToCache([event.target.pathname]);
                        }
                    }, { passive: true });
                });
            });
        }
    </script>
    <?php
  }
}
add_action('wp_head', 'serviceworker');
```
