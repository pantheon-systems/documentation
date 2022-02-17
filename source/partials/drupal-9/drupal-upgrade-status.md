This section is optional, but recommended.

Before you attempt to upgrade to Drupal 9, confirm that the site is ready with the [Upgrade Status](https://www.drupal.org/project/upgrade_status) Drupal module.

Converting a Drupal 8 site that is not managed by Composer (`drops-8`) to use [Integrated Composer](/guides/integrated-composer) is time-consuming. Upgrade Status helps find potential issues before you invest the time to convert the site.

<Accordion title="Test Drupal Upgrade Status in a Temporary Multidev" id="drupal-upgrade-status" icon="lightbulb">

Drupal `8.8.0` and later are "Composer-ready," which means that it is possible to run `composer require` on a Drupal 8 site and have a site that still works.

Doing this would mean that you cannot upgrade via the Dashboard or Drush any longer, and a full [Composer conversion](/guides/composer-convert) would be required in order to apply future updates via Composer.

Since you are checking whether or not a site can be upgraded, install the Upgrade Status module in a temporary Multidev and view the results. Delete the environment when done:

1. Create a new Multidev:

  ```bash{promptUser: user}
  terminus multidev:create $SITE.dev site-upstat
  ```

1. Check out the Multidev branch:

  ```bash{promptUser: user}
  git checkout site-upstat
  ```

1. Add the Upgrade Status module:

  ```bash{promptUser: user}
  composer require drupal/upgrade_status
  ```

1. Add, commit, and push the code:

  ```bash{promptUser: user}
  git add . && git commit -m "test site upgrade status" && git push origin site-upstat
  ```

1. Use a web browser to visit the Drupal admin in the Multidev environment. Enable the Upgrade Status module and view the Upgrade Status page.

1. Delete Multidev when done:

  ```bash{promptUser: user}
  terminus multidev:delete --delete-branch -- $SITE.site-upstat
  ```

</Accordion>
