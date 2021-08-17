Before you attempt to upgrade to Drupal 9, it is important to know whether your site is ready. Drupal provides a contribute module, [Upgrade Status](https://www.drupal.org/project/upgrade_status), that will answer this question.

If you are a Drupal 8 user with a site that is not managed by Composer (`drops-8`), doing a conversion to [Integrated Composer](/integrated-composer) would take some effort. The concept behind [Upgrade Status](https://www.drupal.org/project/upgrade_status) is that it is quick and easy to run.

Drupal versions `8.8.0` or later are "Composer-ready," which means that it is possible to run `composer require` on a stock Drupal 8 site and have a site that still works. Doing this means that you cannot upgrade via the Dashboard or Drush any longer, and further work (a full Composer conversion) would be required to be able to apply future updates via [Composer](/integrated-composer). However, it is not necessary for the resulting site to be upgradable if your only goal is to run the Upgrade Status report and view your site's upgrade readiness.

Reasonable results can be achieved by installing Upgrade Status into a Multidev, and then deleting the entire environment when done:

1. Create a new Multidev
1. Clone your site locally
1. Check out the Multidev branch
1. Add Upgrade Status module via `composer require drupal/upgrade_status`
1. Add, commit, and push code
1. Visit Multidev environment in browser- enable upgrade status, view upgrade status page and profit
1. Delete Multidev when done
