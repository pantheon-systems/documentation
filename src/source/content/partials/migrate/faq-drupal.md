---
contenttype: [partial]
categories: [migrate]
cms: [drupal]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

## Drupal FAQ

### How should I migrate a site with a custom Drupal-based upstream?

If you'd like your existing Drupal site to get one-click updates from your [Custom Upstream](/guides/custom-upstream), then the migration process will be slightly different. The general process will be the same as a vanilla Drupal site, but start with **Create New Site** instead of **Migrate existing site**. Then use `terminus site:import <site> <url>` to import your site archive, or follow the [Manual migration](/migrate-manual) instructions if your site archive exceeds file size limits.

### What if I can't use drush on my existing Drupal site?

You can manually export and migrate your site as an alternative to `drush`. For details, see [Manually Migrate Sites to Pantheon](/migrate-manual).

### How do I migrate a local site to Pantheon?

Drupal users with access to Drush 8 or earlier can run the provided Drush command to generate an archive then upload it to a third party service (like [Dropbox](https://www.dropbox.com/) or [Google Drive](https://drive.google.com)) to continue the standard migration procedure. You must [manually migrate](/migrate-manual) your site if Drush 8 is not available or the archive file size exceeds 500MB.
