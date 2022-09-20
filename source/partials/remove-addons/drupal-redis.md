1. Disable the [Redis Object Cache](https://www.drupal.org/project/redis) module.

1. Delete the Redis configuration from `settings.php`.

1. Commit and deploy code changes to the Live environment.

1. Navigate to <span class="glyphicons glyphicons-cogwheel"></span> Settings, select **Add Ons**, then click **Remove** for Redis.

1. Navigate to the Site Dashboard, and click <span class="glyphicons glyphicons-cleaning"></span> Clear Caches.

