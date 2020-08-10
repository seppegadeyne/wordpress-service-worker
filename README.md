# Install a service worker
## Progressive Web App.
Install a service worker to make your website work faster and also support offline viewing. You're website will be a qualified Progressive Web App (PWA). By installing a service worker you will increase page loading times up to +50x times.

### Register the service worker
You can use this setup for any kind of website. 

#### WordPress 
Add this to your functions.php
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

#### Other
Add this to your html files.
```javascript
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
```
### Setup service worker
Add ```service-worker.js``` to your root folder. It has to be placed under ```/service-worker.js```. Modify if needed although this setup will work for most websites.
