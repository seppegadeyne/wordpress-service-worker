# Install a service worker
## Optimized for a WordPress stack 
Install a service worker to make your website work faster and also support offline viewing. You're website will be a qualified Progressive Web App (PWA). 

## Add to functions.php
```php
function wp_enqueue_scripts() {
  if(get_current_user_id() == 0) {
    // Load register-service-worker.js from your /scripts theme's folder.
    // Add the script at the bottom of your page. 
    wp_enqueue_script('service-worker', get_stylesheet_directory_uri() . '/scripts/register-service-worker.js', array(), '0.0.1', true);
  }
}
```
