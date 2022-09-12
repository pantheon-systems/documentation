1. Disable the [Redis Object Cache](https://www.drupal.org/project/redis) module.

1. Delete Redis configuration from `settings.php`.

1. Commit and deploy code changes to the Live environment.

1. Navigate to <span class="glyphicons glyphicons-cogwheel"></span> Settings > **Add Ons** and click **Remove** for Redis.

1. From the Site Dashboard, click <span class="glyphicons glyphicons-cleaning"></span> Clear Caches.
