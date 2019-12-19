<Alert title="Warning" type="danger">

Drupal 8.7.x sites updating to Drupal 8.8.x require a manual update of `settings.pantheon.php` to follow updated Drupal 8.8.x recommendations:

- Use `$settings["file_temp_path"]` instead of `$config[system.file][path][temporary]`
- Use `$settings['config_sync_directory']` instead of `$config_directories[CONFIG_SYNC_DIRECTORY]`

</Alert>
