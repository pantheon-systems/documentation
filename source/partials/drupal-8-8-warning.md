Drupal 8.7.x sites that have modified the `config_sync_directory` value in `settings.php` may see this error when upgrading to Drupal 8.8.x:

> **`CONFIGURATION SYNC DIRECTORY`**
>
> The directory *sites/default/config* does not exist.
>
>

To resolve (or avoid before upgrading), update the modified code as follows:

1. Locate:

  ```php:title=settings.php
  $config_directories = array(
  CONFIG_SYNC_DIRECTORY => dirname(DRUPAL_ROOT) . '/config',
  );
  ```

1. Replace it with:

  ```php:title=settings.php
  $settings['config_sync_directory'] = dirname(DRUPAL_ROOT) . '/config';
  ```

**Note:** `example-drops-8-composer` (the starting template for all Composer-managed sites on Pantheon) includes this configuration in `settings.php`. Any site built from this example (e.g. using either the No CI workflow or the Build Tools workflow) will need to be updated.

