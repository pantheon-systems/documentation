This process involves significant changes to the codebase that may take some time to complete, and can be complicated to roll back. 

To minimize issues, these steps make the codebase changes in a new branch:

1. In your local terminal, change directories to the site project. For example, if you keep your projects in a folder called `projects` in the home directory:

  ```bash{promptUser:user}
  cd ~/projects/$SITE/
  ```

1. Add the Pantheon Drupal Project upstream as a new remote called `ic`, fetch the `ic` upstream, and checkout to a new local branch based on it called `composerify`:

  ```bash{outputLines:2}
  git remote add ic git@github.com:pantheon-upstreams/drupal-recommended.git && git fetch ic && git checkout --no-track -b composerify ic/master
  Switched to a new branch 'composerify'
  ```

  If you prefer, you can replace `composerify` with another branch name. If you do, remember to adjust the other examples in this doc to match.

  <Accordion title="Troubleshoot: Permission denied (publickey)" id="permission-denied-publickey" icon="question-sign">

  If you encounter a `Permission denied (publickey)` error, check that your [SSH keys](/ssh-keys) are set up correctly.

  If you continue to encounter the error, use HTTPS to add the remote:

   ```bash{outputLines:2}
   git remote add ic https://github.com/pantheon-upstreams/drupal-recommended.git && git fetch ic && git checkout --no-track -b composerify ic/master
   Switched to a new branch 'composerify'
   ```

  </Accordion>

### Set Drupal Core Version

Set the Drupal core version, to ensure the site remains on Drupal 8 for now:

  ```bash{promptUser:user}
  composer require --no-update drupal/core-recommended:^8.9
  composer require --dev drupal/core-dev:^8.9
  git add composer.*
  git commit -m "Remain on Drupal 8"
  ```

### Add Upgrade Status Module

This step is optional; you may wait and add the Upgrade Status module to your site later.

The Upgrade Status module will help to determine whether or not your site is ready to upgrade to Drupal 9.

Add the Upgrade Status module to your site with Composer:

  ```bash{promptUser:user}
  composer require drupal/upgrade_status
  git add composer.*
  git commit -m "Add Upgrade Status module"
  ```

When you are ready to begin upgrading your site to Drupal 9, you may enable this module and view the status report it provides to find things that need to be done before upgrading.

### Copy Existing Configuration

Copy any existing configuration from the default branch. If no files are copied through this step, that's ok:

  ```bash{promptUser:user}
  git checkout master sites/default/config
  git mv sites/default/config/* config
  git rm -f sites/default/config/.htaccess
  git commit -m "Pull in configuration from default branch"
  ```

### Copy pantheon.yml

1. Compare the old codebase's `pantheon.yml` to the new `pantheon.upstream.yml`:

  ```bash{promptUser:user}
  git diff master:pantheon.yml pantheon.upstream.yml
  ```

  Press `q` on your keyboard to exit the diff display.

1. Copy the old `pantheon.yml` to preserve settings:

  ```bash{promptUser:user}
  git checkout master pantheon.yml
  git add pantheon.yml
  git commit -m 'Copy my pantheon.yml'
  ```

  Remove any values from `pantheon.yml` that you prefer to keep listed in `pantheon.upstream.yml`. Then add `build_step: true` to `pantheon.yml` if it is not already included.

 In the `pantheon.yml` file, the `api_version: 1` and `build_step: true` values are required.

## Add in the Custom and Contrib Code Needed to Run Your Site

What makes your site code unique is your selection of contributed modules and themes, and any custom modules or themes your development team has created. These customizations need to be replicated in your new project structure.

### Contributed Code

#### Modules and Themes

The goal of this process is to have Composer manage all the site's contrib modules, contrib themes, core upgrades, and libraries (we'll call this _contributed code_). The only things that should be migrated from the existing site are custom code, custom themes, and custom modules that are specific to the existing site.

The steps here ensure that any modules and themes from [drupal.org](https://drupal.org) are in the `composer.json` `require` list.

Once Composer is aware of all the contributed code, you'll be able to run `composer update` from within the directory to have Composer upgrade all the contributed code automatically.

Begin by reviewing the existing site's code. Check for contributed modules in `/modules`, `/modules/contrib`, `/sites/all/modules`, and `/sites/all/modules/contrib`.

1. Review the site and make a list of exactly what versions of modules and themes you depend on. One way to do this is to run the `pm:list` Drush command from within a contributed modules folder (e.g. `/modules`, `/themes`, `/themes/contrib`, `/sites/all/themes`, `/sites/all/themes/contrib`, etc.).

  This will list each module followed by the version of that module that is installed:

  ```bash{promptUser:user}
  terminus drush $SITE.dev pm:list -- --no-core --fields=name,version  --format=table
  ```

1. You can add these modules to your new codebase using Composer by running the following for each module in the `$SITE` directory:

  ```bash{promptUser:user}
  composer require drupal/MODULE_NAME:^VERSION
  ```

<Partial file="module-name.md" />

  Some modules use different version formats.

   - For older-style Drupal version strings:

   ```none
   Chaos Tools (ctools)  8.x-3.4
   ```

    Replace the `8.x-` to convert this into `^3.4`

   - Semantic Versioning version strings:

   ```none
   Devel (devel)  4.1.1
   ```

    Use the version directly, e.g. `^4.1.1`

    <Partial file="could-not-find-version-module_name.md" />	  


#### Other Composer Packages

If you have added non-Drupal packages to your site via Composer, use the command `composer require` to migrate each package. You can use the following command to display the differences between the master and your current `composer.json`:

```
git diff master:composer.json composer.json
```

#### Libraries

Libraries can be handled similarly to modules, but the specifics depend on how your library code was included in the source site. If you're using a library's API, you may have to do additional work to ensure that library functions properly.

### Custom Code

Manually copy custom code from the existing site repository to the Composer-managed directory.

#### Modules and Themes

To move modules, use the following commands:

```bash{promptUser:user}
git checkout master modules/custom
git mv modules/custom web/modules/
git commit -m "Copy custom modules"
```

To move themes, use the following commands:

```bash{promptUser:user}
git checkout master themes/custom
git mv themes/custom web/themes/
git commit -m "Copy custom themes"
```

Use the above commands with any of the custom code.

#### settings.php

Your existing site may have customizations to `settings.php` or other configuration files. Review these carefully and extract relevant changes from these files to copy over. Always review any file paths referenced in the code, as these paths may change in the transition to Composer.

We don't recommend that you completely overwrite the `settings.php` file with the old one, as it contains customizations for moving the configuration directory you don't want to overwrite, as well as platform-specific customizations.

```bash{promptUser:user}
git status # Ensure working tree is clean
git show master:sites/default/settings.php > web/sites/default/original-settings.php
diff -Nup --ignore-all-space web/sites/default/settings.php web/sites/default/original-settings.php
# edit web/sites/default/settings.php and commit as needed
rm web/sites/default/original-settings.php
```

The resulting `settings.php` should have no `$databases` array.

### Additional Composer Configuration

Any additional Composer configuration that you have added to your site should be ported over to the new `composer.json` file. This can include configurations related to repositories, minimum-stability, or extra sections.

You can use the diff command to get the information you need to copy:

```
git diff master:composer.json composer.json
```

## Deploy

You've now committed the code to the local branch. Deploy that branch directly to a new Multidev (called `composerify` in the steps below) and test the site in the browser.

### Deploy to a Multidev

1. Push the changes to a Multidev called `composerify` to safely test the site without affecting the Dev environment:

   ```bash{promptUser:user}
   git push -u origin composerify && terminus env:create $SITE.dev composerify
   ```

1. Make a small change to `pantheon.yml`:

   ```yaml:title=pantheon.yml
   database:
    version: 10.4

   # add a comment to trigger a change and build
   ```

1. Commit and push the change to trigger an Integrated Composer build on the Multidev:

   ```bash{promptUser: user}
   git commit -am "trigger composer build"
   git push origin composerify
   ```

Since the commit history of the `composerify` Multidev has no commits in common with the `master` branch, you cannot view the Multidev commit history from the Dashboard or the Integrated Composer logs.

If the site is not working, try this Composer command on the local `composerify` branch:

```bash{promptUser:user}
composer --no-dev --optimize-autoloader --no-interaction --no-progress --prefer-dist --ansi install
```

If Composer runs into an error or if any files have been changed (files that are not ignored by `.gitignore`), resolve those issues before you continue. See the [Integrated Composer Troubleshooting](/guides/integrated-composer#troubleshooting-code-syncs-and-upstream-updates) section for more information about troubleshooting Integrated Composer.

### Move composerify to the Main Dev Branch

Once you have confirmed that the site works in the Multidev, replace the `master` branch and its commit history with the `composerify` Multidev's commit history.

1. Retrieve the most recent commit hash from the local `composerify` branch:

   ```bash{promptUser:user}
   git log --format="%H" -n 1
   ```

   This will give you a commit hash like `fd3636f58f5b275b998bb1c9267bff8808353840`.

1. Reset the `master` branch to match that commit then force push that to the Dev environment:

   ```bash{promptUser: user}
   git checkout master
   git reset --hard fd3636f58f5b275b998bb1c9267bff8808353840
   git push --force origin master
   ```

Your site's Dev environment is now set up to use the Drupal 9 Integrated Composer upstream. 

### Troubleshooting: Inspect Site Logs

If the site doesn't load properly, before you do too much work to investigate issues, clear the cache and try again.

Use Terminus to inspect the site's logs;

```bash{promptUser: user}
terminus drush $SITE.composerify -- wd-show
```

See our [logs collection](/logs) documentation for more information.
