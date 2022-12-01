---
contenttype: [partial]
categories: [upgrade]
newcms: [drupal9]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

Run the code below to set the Drupal core version to Drupal 9:

  ```bash{promptUser: user}
  composer require --update-with-dependencies --no-update 'drupal/core-recommended:^9' 'drupal/core-composer-scaffold:^9'
  composer update drupal/core* -W
  git add composer.*
  git commit -m "upgrade to Drupal 9"
  ```

<Alert title="Note" type="info" >

If you receive the error message `Your requirements could not be resolved to an installable set of packages`, replace the `composer update drupal/core* -W` command with `composer update`

</Alert>
