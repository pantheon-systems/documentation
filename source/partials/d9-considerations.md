## Considerations - Drupal 9

The default database version for new sites is MariaDB 10.4. In the event your site has any older contrib modules, that are not compatible with MariaDB 10.4, you can set the MariaDB version to `10.3` in your `pantheon.yml` file.

Note that Drupal 9 requires MariaDB 10.3 or later. If you have a Drupal 8 site that you plan to upgrade to Drupal 9, ensure that the database has been upgraded to MariaDB 10.3 or 10.4 in all environments before you begin the Drupal 9 upgrade.