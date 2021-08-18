<alert type="danger" title="Warning">

Partial Composer adoption for Drupal 8 sites is not supported since Composer is used by core, meaning any change to `composer.json` or the `vendor` directory would result in massive merge conflicts when trying to update core via one-click updates in the Pantheon Site Dashboard. Composer with Drupal 8 is an all or nothing proposition. To use Composer to manage Drupal 8 sites, use the [Build Tools](/guides/build-tools) or [convert an existing Drupal 8 site to Integrated Composer](/guides/composer-convert) on Pantheon methods.

</alert>
