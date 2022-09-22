1. Uninstall the [WP Redis](https://wordpress.org/plugins/wp-redis/) plugin. Review [Uninstall Plugins](/cms-admin#uninstall-plugins) for detailed instructions.

1. Delete the `wp-content/object-cache.php` file.

1. Commit and deploy code changes to the Live environment.

1. Navigate to <span class="glyphicons glyphicons-cogwheel"></span> Settings, select **Add Ons**, then click the **Remove** button for Redis.

1. Navigate to the Site Dashboard, and click <span class="glyphicons glyphicons-cleaning"></span> Clear Caches.

