---
contenttype: [partial]
categories: [migrate]
newcms: [drupal]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

Complete the steps below if you have custom code that you would like to move to your new site.

1. Manually copy custom code from the old site to the corresponding Pantheon site directory and commit the changes.

1. Update the new `.gitignore` file to keep it aligned with the current site to avoid potential issues in the future.

### Install Libraries with drupal-library

Do not add anything to `web/libraries` if you want to install libraries using Composer via a `drupal-library` project. Use must use Composer to install your libraries.

1. Add each directory to be allowed (not ignored) by `.gitignore` if you commit libraries directly to `web/libraries`.

    - For example, to commit a `favorite-library` directory, add it and each directory to `.gitignore`. 

1. Run the  `git add` command:

    ```none:title=.gitignore
    !/web/libraries/favorite-library
    !/web/libraries/other-favorite-library
    ```

You can remove the `web/libraries` line from the `.gitignore` file if you do not plan on adding any libraries with Composer in the future. This might lead to builds failing in the future if you or another developer use Composer to add a library later on.
