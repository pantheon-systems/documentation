## Ensure Dependencies are Drupal 9 Compatible

Before changing the Drupal core version to Drupal 9, make sure all the components of your site are Drupal 9 compatible. Review the steps in drupal.org's [Upgrading a Drupal 8 site to Drupal 9](https://www.drupal.org/docs/upgrading-drupal/how-to-prepare-your-drupal-7-or-8-site-for-drupal-9/upgrading-a-drupal-8-site) for details, and use [Upgrade Status](https://www.drupal.org/project/upgrade_status) to check the compatibility of all contributed modules and themes.

## Set Drupal Core Version

Set the Drupal core version to Drupal 9:

  ```shell{promptUser: user}
  composer require --update-with-dependencies --no-update 'drupal/core-recommended:^9' 'drupal/core-composer-scaffold:^9'
  composer update drupal/core* -W
  git add composer.*
  git commit -m "upgrade to Drupal 9"
  ```

If you receive the error message "Your requirements could not be resolved to an installable set of packages", use the command `composer update` instead of `composer update drupal/core* -W`.

## Ongoing Core Updates

One-click core updates can be made through the Dashboard.

Navigate to **Code** in the Dev tab of the site's Dashboard. Click **Check Now**. If updates are available, click **Apply Updates**.