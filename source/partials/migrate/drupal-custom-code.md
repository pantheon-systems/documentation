Complete the steps below if you have custom code that you would like to move to your new site.

1. Manually copy custom code from the old site to the corresponding Pantheon site directory and commit the changes.

1. Update the new `.gitignore` file to keep it aligned with the current site to avoid potential issues in the future.

If you plan to install libraries using Composer via a `drupal-library` project, do not add anything to `web/libraries` and use Composer to install the libraries instead.

If you commit libraries directly to `web/libraries`, then add each directory to be allowed (not ignored) by `.gitignore`. For example, to commit a `favorite-library` directory, add it and each directory to `.gitignore` before you use `git add`:

```none:title=.gitignore
!/web/libraries/favorite-library
!/web/libraries/other-favorite-library
```

If you do not plan on adding any libraries with Composer in the future, you can remove the `web/libraries` line from the `.gitignore` file. This might lead to builds failing in the future if at some point you or another developer use Composer to add a library.
