<div class="alert alert-danger">
<h4 class="info">Warning</h4>

Partial Composer adoption for Drupal 8 sites is not supported since Composer is used by core, meaning any change to `composer.json` or the `vendor` directory would result in massive merge conflicts when trying to update core via one-click updates in the Pantheon Site Dashboard. Composer with Drupal 8 is an all or nothing proposition. To use Composer to manage Drupal 8 sites, use the [Build Tools](/guides/build-tools) or [Drupal 8 and Composer on Pantheon Without Continuous Integration](/guides/drupal-8-composer-no-ci) methods.

</div>
