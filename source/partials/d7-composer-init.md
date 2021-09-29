1. Initialize composer to create a `composer.json` file with the Drupal 7 package repository:

  ```bash{promptUser: user}
  composer init --repository=https://packages.drupal.org/7 --no-interaction
  ```

1. Edit the `composer.json` to add extra configuration that specifies installation paths for Drupal modules, libraries, and themes.

  <Alert title="Note" type="info">

  Since Pantheon does not support Git submodules <Popover title="Git submodules" content="Some Composer packages are added as Git submodules, which place a Git repository within a subdirectory of your site’s repository." />, we recommend using the provided script `remove-git-submodules` to remove any `.git` directories upon install and update.

  </Alert>

  ```json:title=composer.json
  {
    "repositories": [
      {
        "type": "composer",
        "url": "https://packages.drupal.org/7"
      }
    ],
    "require": {},
    "extra": {
      "installer-paths": {
        "sites/all/modules/{$name}/": ["type:drupal-module"],
        "sites/all/themes/{$name}/": ["type:drupal-theme"],
        "sites/all/libraries/{$name}/": ["type:drupal-library"]
      }
    },
    "scripts": {
      "remove-git-submodules": "find . -mindepth 2 -type d -name .git | xargs rm -rf",
      "post-install-cmd": [
        "@remove-git-submodules"
      ],
      "post-update-cmd": [
        "@remove-git-submodules"
      ]
    },
    "config": {
      "vendor-dir": "sites/all/vendor"
    }
  }
  ```
  