# wordpress-service-worker
## Add to functions.php
``
function wp_enqueue_scripts() {
  if(get_current_user_id() == 0) {
    // Load register-service-worker.js from your /scripts theme's folder.
    // Add the script at the bottom of your page. 
    wp_enqueue_script('service-worker', get_stylesheet_directory_uri() . '/scripts/register-service-worker.js', array(), '0.0.1', true);
  }
}
``
