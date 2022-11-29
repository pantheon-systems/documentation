---
contenttype: partial
categories: [migrate]
newcms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

1. Copy your package list from the `requires` section of the existing site's `composer.json` and add it to the new site's `composer.json`.

   - If the existing `composer.json` defines additional repositories or patches, copy those over too. Take care not to overwrite the `upstream-configuration` package and repository.

   - If the old site has custom patches in its codebase, make sure to copy those over as well.

1. Run `composer update` to have Composer create a `composer.lock` file with all versions and dependencies:

  ```bash{promptUser: user}
  composer update
  ```

1. Run the `git status` command to confirm that all changed files have names that start with `composer.`.

1. Add other folders to `.gitignore` until `git status` only shows the Composer files being modified:

  ```bash{promptUser: user}
  git status
  ```

1. Add and commit the changed Composer files to Git:

  ```shell{promptUser: user}
  git add composer.*; git commit -m "Add composer packages"
  ```
