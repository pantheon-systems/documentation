### How can I migrate from WP Engine?

Follow the [standard procedure for migrating WordPress sites to Pantheon](#migrate-existing-sites) as described above. Note that WP Engine blocks the Let's Encrypt challenge file, so you should schedule a [maintenance window](/guides/launch/domains/#maintenance-window) for HTTPS. If your migration fails, you can try the following workaround:

1. Create and download a backup point from WP Engine.

1. Unzip your site's backup point on your local machine.

1. Remove the WP Engine remnants. There are a few files you'll need to remove:
   - Drop-in plugins (e.g. `wpengine-common`) located at: `\wp-content\mu-plugins`
   - `.gitattributes` and `.gitignore` from the root folder
   - If object caching is enabled, remove the `object-cache.php` file located in `/wp-content`.

1. Replace existing `wp-config.php` with [Pantheon's `wp-config.php`](https://github.com/pantheon-systems/WordPress/blob/default/wp-config.php) file. Preserve necessary logic from your existing file.

1. Move the `mysql.sql` database out of the `wp-content` directory and into the project's root directory.

1. Follow the procedure to [manually migrate](/migrate-manual) your site.

