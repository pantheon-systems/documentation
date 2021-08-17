## Apply All Available Upstream Updates

[Update the site](/core-updates) to the latest [Pantheon Drops 8](https://github.com/pantheon-systems/drops-8) Upstream and apply all available updates.

1. Use Terminus to list all available updates:

  ```bash{outputLines:2}
  terminus upstream:updates:list $SITE
  [warning] There are no available updates for this site.
  ```

1. If any updates are available, apply them using the command line or via the [Pantheon Dashboard](/core-updates#apply-upstream-updates-via-the-site-dashboard):

  ```bash{promptUser: user}
  terminus upstream:updates:apply $SITE.dev --updatedb
  ```

## Add the Pantheon Integrated Composer Upstream in a New Local Branch

This process involves significant changes to the codebase. We recommend you to do this work on a new branch, as it might take you some time to complete and rolling back changes can be complicated:

1. In your local terminal, change directories to the site project. For example, if you keep your projects in a folder called `projects` in the home directory:

  ```bash{promptUser:user}
  cd ~/projects/$SITE/
  ```

1. Add the Pantheon Drupal Upstream as a new remote called `ic`, fetch the `ic` upstream, and checkout to a new local branch based on it called `composerify`:

  ```bash{outputLines:2}
  git remote add ic git@github.com:pantheon-upstreams/drupal-project.git && git fetch ic && git checkout --no-track -b composerify ic/master
  Switched to a new branch 'composerify'
  ```

  If you prefer, you can replace `composerify` with another branch name. If you do, remember to adjust the other examples in this doc to match.

1. Copy any existing configuration from the default branch. If no files are copied through this step, that's ok:

  ```bash{promptUser:user}
  git checkout master sites/default/config
  git mv sites/default/config/* config
  git rm -f sites/default/config/.htaccess
  git commit -m "Pull in configuration from default branch"
  ```

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

 Remove any values from `pantheon.yml` that you prefer to keep as listed in `pantheon.upstream.yml`.

 Both `pantheon.yml` and the `api_version: 1` value in it are required.

## Add in the Custom and Contrib Code Needed to Run Your Site

What makes your site code unique is your selection of contributed modules and themes, and any custom modules or themes your development team has created. These customizations need to be replicated in your new project structure.

### Contributed Code

#### Modules and Themes

The goal of this process is to have Composer manage all the site's contrib modules, contrib themes, core upgrades, and libraries (we'll call this _contributed code_). The only things that should be migrated from the existing site are custom code, custom themes, and custom modules that are specific to the existing site.

The steps here ensure that any modules and themes from [drupal.org](https://drupal.org) are in the `composer.json` `require` list.

Once Composer is aware of all the contributed code, you'll be able to run `composer upgrade` from within the directory to have Composer upgrade all the contributed code automatically.

Begin by reviewing the existing site's code. Check for contributed modules in `/modules`, `/modules/contrib`, `/sites/all/modules`, and `/sites/all/modules/contrib`.

1. When reviewing the site, take stock of exactly what versions of modules and themes you depend on. One way to do this is to change to run the `pm:projectinfo` Drush command from within a contributed modules folder (e.g. `/modules`, `/themes`, `/themes/contrib`, `/sites/all/themes`, `/sites/all/themes/contrib`, etc.).

  ```bash{promptUser:user}
  terminus drush $SITE.dev -- pm:projectinfo --fields=name,version --format=table
  ```

  This will list each module followed by the version of that module that is installed.

1. You can add these modules to your new codebase using Composer by running the following for each module in the `$SITE` directory:

  ```bash{promptUser:user}
  composer require drupal/MODULE_NAME:^VERSION
  ```

  Where `MODULE_NAME` is the machine name of the module in question, and `VERSION` is the version of that module the site is currently using. Composer may pull in a newer version than what you specify, depending upon what versions are available. You can read more about the caret (`^`) in the [Composer documentation](https://getcomposer.org/doc/articles/versions.md#caret-version-range-).

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

  If you get the following error, the module listed in the error (or its dependencies) does not meet compatibility requirements:

   ```none
   [InvalidArgumentException]
   Could not find a version of package drupal/MODULE_NAME matching your minimum-stability (stable). Require it with an explicit version constraint allowing its desired stability.
   ```

   If there is no stable version you can switch to, you may need to adjust the `minimum-stability` setting of `composer.json` to a more relaxed value, such as `beta`, `alpha`, or `dev` (not recommended). You can read more about `minimum-stability` in the [Composer documentation](https://getcomposer.org/doc/04-schema.md#minimum-stability).

     - If a dev version of a module fails because it requires a dev version of a dependency, allowlist the dev dependency in the same `composer require` as the module:

     ```bash{promptUser:user}
     composer require drupal/some-module:^1@dev org/some-dependency:^2@dev
     ```

<!-- commenting out until the script has a proper place to live

**Trust a robot?**

One of Pantheon's engineers got tired of doing this process by hand, so he trained some robots to identify modules and put them into `composer.json`.

Robots are cool, but they're not perfect, so you should understand the goal of this process as well as the limitations of automating the process.

<Accordion title="A script that can help add modules to composer.json" id="modules-script" icon="cogs">

First, disclaimers:

This script is provided without warranty or direct support. Issues and questions may be filed in GitHub but their resolution is not guaranteed.

Proceed at your own risk. Automation is better when you understand what it's doing.

- The script does not resolve `composer.json` version problems.

  - If there's a version conflict when you run `composer install`, you will need to resolve the conflicts yourself.

- The script does not check for Drupal 9 compatibility.

  - Use the [Upgrade Status](https://drupal.org/project/upgrade_status) module to check for Drupal 9 compatibility.

- The script does not resolve module stability.

  - If you get the following error, the module listed in the error (or its dependencies) does not meet compatibility requirements:

   ```none
   [InvalidArgumentException]
   Could not find a version of package drupal/MODULE_NAME matching your minimum-stability (stable). Require it with an explicit version constraint allowing its desired stability.
   ```

   If there is no stable version you can switch to, you may need to adjust the `minimum-stability` setting of `composer.json` to a more relaxed value, such as `beta`, `alpha`, or even `dev`. You can read more about `minimum-stability` in the [Composer documentation](https://getcomposer.org/doc/04-schema.md#minimum-stability).

- The script does not resolve patches.

  Many times a module will be "patched" or have a `.patch` file that fixes known issues before the fix is available in the downloaded version. This script does not attempt to resolve any patches.

If you still want to try it:

1. Say the following out loud: "Pantheon is not responsible for what I am about to do."

1. Create a directory called `bin` within your repository and copy the `migrateModules.php` file from [GitHub](https://github.com/pantheon-upstreams/drupal-project/pull/8/files#diff-c68470275758ca395b98d53ed258b63519435d492dd51531c4cf372814c6593e) into that directory.

1. To run the module migration script, `cd` to the root directory of the repository and run `bin/migrateModules.php`.

1. To see which modules were added, run `git diff composer.json`.

1. Remove the `composer.lock` file. Composer will create a new one with the modules you just added.

1. Run `composer install` and resolve any remaining version conflicts.

</Accordion>
-->

#### Libraries

Libraries can be handled similarly to modules, but the specifics depend on how your library code was included in the source site. If you're using a library's API, you may have to do additional work to ensure that library functions properly.

### Custom Code

Manually copy custom code from the existing site repository to the Composer-managed directory.

#### Modules and Themes

Modules:

```bash{promptUser:user}
git checkout master modules/custom
git mv modules/custom web/modules/
git commit -m "Copy custom modules"
```

Themes:

```bash{promptUser:user}
git checkout master themes/custom
git mv themes/custom web/themes/
git commit -m "Copy custom themes"
```

Follow suit with any other custom code you need to carry over.

#### Settings.php

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

If Composer runs into an error or if any files have been changed (files that are not ignored by `.gitignore`), resolve those issues before you continue. See the [Integrated Composer Troubleshooting](/integrated-composer#troubleshooting-code-syncs-and-upstream-updates) section for more information about troubleshooting Integrated Composer.

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

Now the site's Dev environment has a Drupal 9 codebase.

### Inspect Site Logs to Troubleshoot

If the site doesn't load properly, before you do too much work to investigate issues, clear the cache and try again.

Use Terminus to inspect the site's logs;

```bash{promptUser: user}
terminus drush $SITE.composerify -- wd-show
```

See our [logs collection](/logs) documentation for more information.
