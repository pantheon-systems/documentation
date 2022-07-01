Your existing site may have customizations to `settings.php` or other configuration files.

1. Copy the existing `settings.php` to the Pantheon site and remove the `$databases` array if it exists.

1. Ensure that everything in the [Pantheon settings.php](https://github.com/pantheon-upstreams/drupal-composer-managed/blob/master/web/sites/default/settings.php) is included.

1. Confirm that the `settings.php` file on the Pantheon D9 site:

   - Has one `$settings['container_yamls'][]`
   - Contains no duplicates
   - Contains `include __DIR__ . "/settings.pantheon.php";`
