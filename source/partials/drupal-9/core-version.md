Run the code below to set the Drupal core version to Drupal 9:

  ```shell{promptUser: user}
  composer require --update-with-dependencies --no-update 'drupal/core-recommended:^9' 'drupal/core-composer-scaffold:^9'
  composer update drupal/core* -W
  git add composer.*
  git commit -m "upgrade to Drupal 9"
  ```


<Alert title="Note" type="info" >
Use the command `composer update` instead of `composer update drupal/core* -W` if you receive the error message "Your requirements could not be resolved to an installable set of packages." 
</Alert>