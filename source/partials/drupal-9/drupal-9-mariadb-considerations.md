---
contenttype: partial
categories: [upgrade]
newcms: [drupal9]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

The default database version for new sites is MariaDB 10.4.

If your site has any older contrib modules that are not compatible with MariaDB 10.4, set the MariaDB version of the new site to `10.3` in your `pantheon.yml` file.

Drupal 9 requires MariaDB 10.3 or later. If you have a Drupal 8 site that you plan to upgrade to Drupal 9, confirm that the database has been upgraded to MariaDB 10.3 or 10.4 in all environments before you begin the Drupal 9 upgrade.
