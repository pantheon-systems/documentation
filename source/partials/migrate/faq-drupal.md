### How should I migrate a site with a custom Drupal-based upstream?

If you'd like your existing Drupal site to get one-click updates from your [Custom Upstream](/custom-upstream), then the migration process will be slightly different. The general process will be the same as a vanilla Drupal site, but start with **Create New Site** instead of **Migrate existing site**. Then use `terminus site:import <site> <url>` to import your site archive, or follow the [Manual migration](/migrate-manual) instructions if your site archive exceeds file size limits.

### What if I can't use drush on my existing Drupal site?

As an alternative to `drush` you can manually export and migrate. For details, see [Manually Migrate Sites to Pantheon](/migrate-manual).
