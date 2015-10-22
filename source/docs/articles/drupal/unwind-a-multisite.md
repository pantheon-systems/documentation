---
title: Extracting Sites from a Drupal Multisite
description: Learn how to separate the codebases to import individual sites to Pantheon.
keywords: drupal, multisite
---

Pantheon only supports one application codebase and one database per site. We do not support database prefixes or multisite. If you have a multisite that you want to import, you'll need to separate the codebases to create individual sites or create a custom upstream.

## Migrate a Single Site to Pantheon from a Multisite

This method will safely migrate a single multi-site site into Pantheon. You may experience some issues, such as  warnings from Launch Check about multisite, but they are generally false positives.

1. Create a site archive for the site you want to migrate by running `drush ard sitename1`.

2. Keep a local copy of the archive. You may need to restore `settings.php`, check against `sites.php`, and then use the import wizard to import the site to Pantheon.

3. Check your site to make sure it is still working, even though there will be assets missing. Take note of the paths for the broken assets, usually `sites/sitename1/files/image.png`.

4. [Configure](https://pantheon.io/blog/fix-drush-site-aliases-policy-file) the new site to use Drush 7 or greater.

5. Install [Drush SAR 2.x](https://www.drupal.org/project/sar) as described in this [blog post](https://pantheon.io/blog/expand-use-drush-pantheon-more-commands).

6. [Backup the site](/docs/articles/sites/backups/backup-creation/#create-a-backup) in the Dashboard.

7. Run `terminus --site=my-site --env=dev drush sar --dry-run sites/sitename1 sites/default` to test the search and replace. This exact command can change depending on the broken assets in step 3.

8. Run `terminus--site=my-site --env=dev drush sar sites/sitename1 sites/default`.

9. Check your site again and fix broken links and images. We recommend using a link checker.

10. You may need to edit `settings.php` to be a Pantheon-friendly version and then put it back in after the migration.


## Maintain a Single Codebase for Multiple Sites

This method requires one of the following organization service levels with custom upstreams: Partner, Strategic Partner, EDU+, Enterprise, and Reseller.    

1. Create a [custom upstream](/docs/articles/organizations/adding-a-custom-upstream/) based on the multisite configuration.

2. [Archive](/docs/articles/sites/migrate/#pack-up) each of your sites.

3. [Create a new site](https://dashboard.pantheon.io/sites/create) based on the upstream.

Then for each site:

4. [Git clone the repo](/docs/articles/local/starting-with-git/#clone-your-site-codebase) locally.

5. If there are customizations on the individual sites that are not incorporated into the upstream repository, commit those changes from your archives into the local repo.

6. [Import the database](/docs/articles/sites/migrate/manual-site-import/#database).

7. Run `drush sar --dry-run sites/sitename1 sites/default` to test the search and replace. You can run `terminus drush` or run `terminus sites aliases`, and then run local Drush.

8. Run `drush sar sites/sitename1 sites/default`.

9. Check your site and fix broken links and images. We recommend using a link checker.

10. You may need to edit `settings.php` to be a Pantheon-friendly version and then put it back in after the migration.
