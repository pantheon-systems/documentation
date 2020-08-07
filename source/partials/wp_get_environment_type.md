WordPress 5.5 [introduced the `wp_get_environment_type` function](https://make.wordpress.org/core/2020/07/24/new-wp_get_environment_type-function-in-wordpress-5-5/).

`wp_get_environment_type` allows you to define a constant within `wp-config.php`:

```php:title=wp-config.php
define( 'WP_ENVIRONMENT_TYPE', 'development' );
```

Note that the environment variables used by WordPress differ from the names used on Pantheon:

| Pantheon Environment | `wp_get_environment_type` |
|----------------------|---------------------------|
| dev / Multidev       | development               |
| test                 | staging                   |
| live                 | production                |
