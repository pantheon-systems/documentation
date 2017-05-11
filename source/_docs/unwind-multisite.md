---
title: Extracting Sites from a Drupal Multisite
description: Learn how to separate the codebases to import individual Drupal sites to Pantheon.
tags: [export]
categories: [drupal]
---

Pantheon only supports one application codebase and one database per site. We do not recommend using database prefixes or offer support for Drupal Multisite implementations. If you are currently struggling with a Drupal Multisite and want to use Pantheon, you'll need to "unwind" the implementation, separating it into individual sites. You may also create a Custom Upstream if appropriate for your use-case.

## Migrate One Site Out of a Multisite to Pantheon

This method will safely migrate a single site out of your Drupal Multisite and into Pantheon. You may experience some issues, such as  warnings from Launch Check about multisite, but they are generally false positives, and you can clean that up once the site is liberated and on it's own.

1. Create a site archive for the site you want to migrate by running `drush ard sitename1`.

2. Use the import wizard to import the site to Pantheon. Keep a local copy of the archive. You may need to restore `settings.php`, check against `sites.php`.

3. Check the imported site on Pantheon to make sure it is working, even though there will likely be file assets missing. Take note of the paths for the broken assets, usually `sites/sitename1/files/image.png`.

4. [Configure](https://pantheon.io/blog/fix-drush-site-aliases-policy-file) the new site to use Drush 7 or greater.

5. Install [Drush SAR 2.x](https://www.drupal.org/project/sar) as described in this [blog post](https://pantheon.io/blog/expand-use-drush-pantheon-more-commands).

6. [Backup the site](/docs/backups/#create-a-backup) in the Dashboard, just in case.

7. Run `terminus drush <site>.<env> -- sar --dry-run sites/sitename1 sites/default` to test the search and replace. This exact command can change depending on the name of your site, and broken assets in step 3.

8. Once the dry run looks good, do it for real, e.g. `terminus drush <site>.<env> -- sar sites/sitename1 sites/default`.

9. Check your site again for broken links and images. We recommend using a link checker.

10. You may need to edit `settings.php` to be a Pantheon-friendly version and then put it back in after the migration.


## Maintain a Single Codebase for Multiple Sites

This method uses a [Custom Upstream](/docs/custom-upstream), a feature available to EDUs, Enterprises, and agencies that sign up for [Pantheon for Agencies](https://pantheon.io/agencies/pantheon-for-agencies).


1. Create a [Custom Upstream](/docs/custom-upstream) based on the multisite configuration.

2. [Archive](/docs/migrate#drupal) each of your sites.

3. [Create a new site](https://dashboard.pantheon.io/sites/create) based on the upstream.

Then for each site:

4. [Git clone the repo](/docs/git/#clone-your-site-codebase) locally.

5. If there are customizations on the individual sites that are not incorporated into the upstream repository, commit those changes from your archives into the local repo.

6. <a data-proofer-ignore href="/docs/migrate-manual/#step-3-add-database"> Import the database.</a>

7. Run `drush sar --dry-run sites/sitename1 sites/default` to test the search and replace. You can run `terminus drush` or run `terminus aliases`, and then run local Drush.

8. Run `drush sar sites/sitename1 sites/default`.

9. Check your site and fix broken links and images. We recommend using a link checker.

10. You may need to edit `settings.php` to be a Pantheon-friendly version and then put it back in after the migration.
