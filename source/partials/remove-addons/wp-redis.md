1. Uninstall the [WP Redis](https://wordpress.org/plugins/wp-redis/) plugin. Review the [Uninstall Plugins](/cms-admin#uninstall-plugins) section of Working in the WordPress Dashboard and Drupal Admin Interface for detailed instructions.
1. Delete the `wp-content/object-cache.php` file.
1. Commit and deploy code changes to the Live environment.
1. Go to <span class="glyphicons glyphicons-cogwheel"></span> Settings > **Add Ons** and click the **Remove** button for Redis.
1. From the Site Dashboard, click on <span class="glyphicons glyphicons-cleaning"></span>.

