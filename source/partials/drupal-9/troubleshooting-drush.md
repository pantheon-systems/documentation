## Site-local Drush Is Required for Drupal 9 Sites

Do not remove `drush/drush` from `composer.json`. If it is removed, `terminus drush` commands will fail with errors related to Twig.

