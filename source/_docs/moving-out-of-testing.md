---
title: Moving Drupal 8 Sites Out of Testing
description: Pantheon sites created during the Drupal 8 testing period will be deleted at some point in the future. Follow these instructions to keep your site on the platform.
---
The Drupal 8 testing organization "owns" all Drupal 8 sites created on the platform prior to October 9, 2015. All of these sites will be moved into our freezer at some point in the future. To keep your site running on the platform, follow these instructions:

1. [Update Drupal to the latest release](/docs/applying-upstream-updates). This is only possible for sites running Drupal 8 Beta 14 or later, and may not work in all cases.
2. [Create and download backups](/docs/backups).
3. To use the same development URLs for the site, [delete the site](/docs/deleting-a-site/).
4. [Create a new Drupal 8 site](https://dashboard.pantheon.io/sites/create) and select **Start from scratch**. The importer does not work with Drupal 8 sites.
5. [Manually import code, database, and files](/docs/manual-site-import).

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Sites running versions of Drupal 8 prior to beta 13 do not have a supported upgrade path. If your upstream update fails (step 1), consider creating a new site and rebuilding the site with Drupal 8-RC compatible code.
</div>
