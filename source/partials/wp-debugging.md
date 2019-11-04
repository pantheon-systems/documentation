```php:title=wp-config.php
// All Pantheon Environments.
if (defined('PANTHEON_ENVIRONMENT')) {
  // Turns on WordPress debug settings in development and multidev environments, and disables in test and live.
  if (!in_array(PANTHEON_ENVIRONMENT, array('test', 'live'))) {
    // Debugging enabled.
    if (!defined( 'WP_DEBUG' )) {
      define( 'WP_DEBUG', true );
    }
    define( 'WP_DEBUG_LOG', __DIR__ . '/wp-content/uploads/debug.log' ); // Moves the log file to a location writable while in git mode.
    define( 'WP_DEBUG_DISPLAY', true );
  }
  // WordPress debug settings in Test and Live environments.
  else {
    // Debugging disabled.
    ini_set('log_errors','Off');
    ini_set('display_errors','Off');
    ini_set('error_reporting', E_ALL );
    define('WP_DEBUG', false);
    define('WP_DEBUG_LOG', false);
    define('WP_DEBUG_DISPLAY', false);
  }
}
```

