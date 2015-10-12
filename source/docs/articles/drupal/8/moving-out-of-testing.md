---
title: Moving Drupal 8 Sites Out of Testing
description: Pantheon sites created during the Drupal 8 testing period will be deleted at some point in the future. Follow these instructions to keep your site on the platform.
---
The Drupal 8 testing organization owns all Drupal 8 sites created on the platform prior to October 9, 2015. All of these sites will be deleted on <DATE>. To keep your site running on the platform, follow these instructions:

1. [Update Drupal to the latest release](/docs/articles/sites/code/applying-upstream-updates).
1. [Create and download backup archives](/docs/articles/sites/backups).
2. To use the same URLs for the site, [delete the site](/docs/articles/sites/deleting-a-site/).
3. [Create a new Drupal 8 site](https://dashboard.pantheon.io/products/drupal8/spinup).
4. [Import the code, database, and files archives](/docs/articles/sites/migrate/manual-site-import).


<div class="alert alert-info" role="alert">
<h4>Note</h4>
Sites running versions of Drupal 8 prior to beta 13 do not have a supported upgrade path. If your upstream update fails (step 1), consider creating a new site and migrating your data with another method.</div>
