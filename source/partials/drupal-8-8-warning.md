<Alert title="Warning" type="danger">

Drupal 8.7.x sites that have modified the following the `config_sync_directory` value in `settings.php` must update as follows before upgrading to Drupal 8.8.x:

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

</Alert>
