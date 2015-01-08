---
title: Database Connection Errors
description: Understand the causes and solutions for database connection errors.
category:
  - debugging

---

## Overview
If your site suddenly reverts to install.php, or you see database connection errors like the following:

![](https://www.getpantheon.com/sites/default/files/docs/desk_images/64774)

    Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock'...).

This indicates that there's an issue connecting to the Pantheon database. There are two common causes.

## Overwritten Pressflow Core
Pantheon provides Pressflow core as the underlying basis for all Drupal sites. This is important for performance reasons, but also to take advantage of the ability to load configuration out of the server environment. You can literally run Drupal on Pantheon with no `settings.php` file, though there are still plenty of great uses for `settings.php`.

However, if you overwrite the Pressflow core — most commonly by unpacking a tarball from drupal.org "over" your git checkout and then pushing the change, or updating core via drush — your site loses the ability to read the environmental configuration.

To see if this is the case, examine your `includes/bootstrap.inc` file, and be sure that you see code in the `drupal_settings_initialize()` function which loads data from `$_SERVER['PRESSFLOW_SETTINGS']`.

If you don't see that, you'll want to look into recent changes and revert or remove whatever overwrote your core.

## Non-Standard Bootstraps
Some modules — for instance the **domain.module** — change Drupal's standard bootstrap process. They typically require you to add an include file to the end of your `settings.php`, which causes an escalated bootstrap earlier than normal so they can perform some higher level functions like checking to see if a user has access.

However, because the Pantheon environment data is not loaded at this time, any bootstrap to the DB level will fail since there is no valid connection information. In this case, you will need to include a snippet in your settings.php _before_ the module's include call. An example for using domain's include would be as follows:

### Drupal 6 Style
    $settings = json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE);
      $info = $settings['databases']['default']['default'];
      $db_url = sprintf("%s://%s:%s@%s:%s/%s",
                        $info['driver'],
                        $info['username'],
                        $info['password'],
                        $info['host'],
                        $info['port'],
                        $info['database']);
      $conf = $settings['conf'];
      # Include any other settings.php magic here.
      include './sites/all/modules/domain/settings.inc';

###Drupal 7 Style

    # Include any other settings.php magic here.
      extract(json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE));
      include './sites/all/modules/domain/settings.inc';

You can also use the above to develop Drupal 8 on Pantheon!

**Note:** If you use any other advanced `settings.php` tricks (e.g. enabling redis), you will need to do this _before_ the snippit in D7, or _after_ in D6 to insure you have a consistent `$conf` array.
