---
title: Convert a Standard Drupal 8 Site to a Composer Managed Site
description: Drupal 8 sites often require the usage of Composer to manage site dependencies. The need to begin using Composer for a site build can often surface after a site is in development, necessitating a divergence from the Pantheon managed upstream.
type: guide
permalink: docs/guides/:basename/
cms: "Drupal 8"
categories: [develop]
tags: [composer, site, workflow]
contributors: [dustinleblanc]
---

<Alert title="Note" type="info">

Converting to a Composer managed site *removes* the ability to [apply updates via the site dashboard](/core-updates). This is for advanced users who are comfortable taking complete responsibility for the management of site updates.

 If you don't need Composer as part of your site, we strongly suggest sticking to the standard Drupal core.

</Alert>

## Before You Begin

<Partial file="composer-updating.html" />

- Review our documentation on [Git](/git), [Composer](/composer), and [Terminus](/terminus), and have them installed and configured on your local computer.
- [Clone](/git#clone-your-site-codebase) your _current_ Pantheon site repository to a working directory on your local computer.
- Review [Serving Sites from the Web Subdirectory](/nested-docroot)

<Alert title="Exports" type="export">

This guide uses the local command line environment, and there are several commands dependent on your specific site. Before we begin, set the variable `$site` in your terminal session to match your site name:

```bash{promptUser:user}
export site=yoursitename
```

</Alert>

## Checkout a New Branch
You're about to make some massive changes to the codebase. We recommend you to do this work on a new branch, as it might take you some time to complete and rolling back can be complicated:

1. In your local terminal, change directories to your site project. For example, if you keep your projects in a folder called `projects` in the home directory:

  ```bash{promptUser:user}
  cd ~/projects/$site/
  ```

2. Create the new branch:

  ```bash{promptUser:user}
  git checkout -b composify
  ```

  You can replace `composify` with a branch name of your choosing, but all following steps assume this name.

## Setup a Multidev (optional)
If your Pantheon account has access to [multidev](/multidev), create a multidev to push your new code to:

```bash{promptUser:user}
git push origin composify && terminus env:create $site.dev composify
```

This will setup the multidev environment to receive and demo our changed code.

## Create a New Composer Project

1. In your local terminal, from the repository root of your Pantheon site, move a directory up:

  ```bash{promptUser:user}
  cd ..
  ```

2. Use Composer to create a new project, using the [Pantheon Drupal 8 Composer](https://github.com/pantheon-systems/example-drops-8-composer) repository:

    ```bash{promptUser:user}
    composer create-project pantheon-systems/example-drops-8-composer $site-composer
    cd $site-composer
    ```

This will create a new directory based on the example project [pantheon-systems/example-drops-8-composer](https://github.com/pantheon-systems/example-drops-8-composer) in the `$site-composer` directory.

### Copy pantheon.upstream.yml
Since the drops-8 upstream has a `pantheon.upstream.yml` and the example-drops-8-composer upstream does not, copy over our old file for the platform to properly load the site. From the `$site-composer` directory, run:

```bash{promptUser:user}
cp ../$site/pantheon.upstream.yml .
```

`ls` should reveal that the new code repository now has a copy of the `pantheon.upstream.yml`.

## Add in the Custom and Contrib Code Needed to Run Your Site
What makes your site code unique is your selection of contributed modules and themes, and any custom modules or themes your development team has created. These customizations need to be replicated in your new project structure.

### Contributed Code
#### Modules
A Composer-managed site should be able to include all custom code via Composer. Begin by reviewing your existing site's code. Check for contributed modules in `/modules`, `/modules/contrib`, `/sites/all/modules`, and `/sites/all/modules/contrib`.

When reviewing your site, take stock of exactly what versions of modules you depend on. One way to do this is to use a command like the following from within a contributed modules folder (e.g. `/modules`, etc):

```bash{outputLines:2-4}
find . -maxdepth 2 -name '*.info.yml' \
  -exec basename '{}' '.info.yml' ';' \
  -exec grep -e '^version' '{}' ';' \
  -exec echo ';'
```

This will list each module followed by the version of that module that is installed.

You can add these modules to your new codebase using Composer by running the following for each module in the `$site-composer` directory:

```{promptUser:user}
composer require drupal/MODULE_NAME:^VERSION
```

Where `MODULE_NAME` is the machine name of the module in question, and `VERSION` is the version of that module your site is currently using. Composer may pull in a newer version than what you specify, depending upon what versions are available. You can read more about the caret (`^`) [in the documentation for Composer](https://getcomposer.org/doc/articles/versions.md#caret-version-range-) itself.

If you get the following error:

```none
[InvalidArgumentException]
Could not find a version of package drupal/MODULE_NAME matching your minimum-stability (stable). Require it with an explicit version constraint allowing its desired stability.
```

It means that one of the modules you are using (or its dependencies) are not stable. If there is not a stable version you can switch to, you may need to adjust the `minimum-stability` setting of `composer.json` to a more relaxed value, such as `beta`, `alpha`, or even `dev`. You can read more about `minimum-stability` [in the documentation for Composer](https://getcomposer.org/doc/04-schema.md#minimum-stability) itself.

#### Themes
Repeat the same process with themes, checking `/themes`, `/themes/contrib`, `/sites/all/themes`, and `/sites/all/themes/contrib`. Use Composer in the same way as above to require these.

#### Libraries
Libraries can be handled in the same way, but the specifics depend on how your library code was included in the source site. If you're using a library's API, you may have to do additional work to ensure that library functions properly.

### Custom Code
#### Modules and Themes
Custom code should be manually copied from the existing site repository to the Composer managed directory.

Modules:

```bash{promptUser:user}
cp -r /modules/custom/awesome_module ../$site-composer/web/modules/custom
```

Themes:

```bash{promptUser:user}
cp -r /themes/custom/great_theme ../$site-composer/web/themes/custom
```

Follow suit with any other custom code you need to carry over.

#### Settings.php
Your existing site may have customizations to `settings.php` or any other config files. Review these carefully and extract relevant changes from these files to copy over. Always review any file paths referenced in the code, as these paths may change in the transition to Composer.

It is not wise to completely overwrite the  `settings.php` file with the old one, as there are customizations for moving the configuration directory you don't want to overwrite, as well as platform specific customizations.

The resulting `settings.php` should have no `$databases` array.

#### Configuration
If you are using an exported config, you will need to move the configuration files to a new location. The preferred (and assumed) location of the configuration directories when using a nested docroot and Composer is at the root of the repository next to the web directory:

```none
 site-composer
|-web
|-config    <--Here!
|-vendor
|-composer.json
|-etc...
```

Locate the configuration files in your existing site and move them here. If they are stored in the files directory on your existing site, retrieve them via [SFTP](/sftp), as the Git clone would not contain them. The example project is configured to use this location.

## Update to Latest Drupal Core
The Pantheon Drupal 8 Composer repository may not depend on the latest secure release of Drupal Core. To keep your site safe, it's a good idea to pull the latest version in now -- before moving on -- by running:

```bash{promptUser:user}
composer update drupal/core --with-dependencies
```

## Prepare to Deploy
At this point, your new project directory should contain all of the unique code from your existing Drupal 8 site, plus all of the code required to make a Composer driven project work. Since Pantheon requires all runtime code to be present when deploying to the platform, if no CI solution is a part of your workflow, you must now modify the project to be deployable straight to Pantheon.

If you do plan on using a CI solution, refer to our [Build Tools](/guides/build-tools) guide at this point.

From the `$site-composer` directory, run the following:

```bash{promptUser:user}
composer prepare-for-pantheon
composer install --no-dev
```

This should modify the `.gitignore` file and cleanup any errant `.git` directories in the codebase, to prepare your new code for direct deployment to Pantheon.

## Commit
Commit your work to the git repo. From the `$site` directory, run the following:

```bash{promptUser:user}
cp -r .git ../$site-composer/
cd ../$site-composer
git add .
git commit -m "Convert to Composer based install"
```

You should see a large amount of files committed to the new branch we created earlier.

## Deploy
You've now committed the code to a branch. If your site has multidev, you can deploy that branch directly to a new multidev and test the site in the browser. If the site doesn't load properly, clear the cache. If there are any issues, utilize your site's logs via `terminus drush $site.composify -- wd-show` to inspect the watchdog logs, or follow the directions on [our documentation on log collection](/logs).

Once you have confirmed the site is working, merge `composify` into `master`, and follow the standard workflow to QA a code change before going live.

If your plan does not include multidev, you will have to merge to master before deploying, then follow the rest of the steps above. If you have a local development solution, consider testing your `composify` branch locally before merging.

## Change Upstreams
Your Pantheon site is no longer compatible with traditional upstream updates. Avoid confusion by moving your site to an empty upstream:

```bash{promptUser:user}
terminus site:upstream:set $site empty
```

## Ongoing Core Updates
Core updates are carried out via Composer:

```bash{promptUser:user}
git pull origin master
composer update drupal/core --with-dependencies
composer prepare-for-pantheon
composer install --no-dev
```

Review and commit file changes, then push back to Pantheon.

## See Also

- [Composer Fundamentals and Workflows](/composer)
