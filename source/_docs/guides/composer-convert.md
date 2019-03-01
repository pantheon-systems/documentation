---
title: Convert a Standard Drupal 8 Site to a Composer Managed Site
description: Drupal 8 sites often require the usage of Composer to manage site dependencies. The need to begin using Composer for a site build can often surface after a site is in development, necessitating a divergance from the Pantheon managed upstream.
type: guide
permalink: docs/guides/:basename/
tags: [moreguides, workflow, composer]
contributors: [dustinleblanc]
---
<div class="alert alert-info">
  <h4 class="info">Note</h4><p markdown="1">Converting to a Composer managed site *removes* the ability to [apply updates via the site dashboard](/docs/core-updates/). This is for advanced users who are comfortable taking complete responsibility for the management of site updates.</p>
  <p markdown="1"> If you don't need Composer as part of your site, we strongly suggest sticking to the standard Drupal core.
</p>
</div>

## Before You Begin

{% include("content/composer-updating.html")%}

 - Review our documentation on [Git](/docs/git/), [Composer](/docs/composer/), and [Terminus](/docs/terminus/), and have them installed and configured on your local computer.
 - [Clone](/docs/git#clone-your-site-codebase) your _current_ Pantheon site repository to a working directory on your local computer.
 - Review [Serving Sites from the Web Subdirectory](/docs/nested-docroot/)

<div class="alert alert-export" role="alert">
<h4 class="info">Exports</h4>
<p markdown="1">This guide uses the local command line environment, and there are several commands dependent on your specific site. Before we begin, set the variable `$site` in your terminal session to match your site name:
<pre>
<code class="bash">export site=yoursitename
</code></pre>
</p>
</div>

## Checkout a New Branch
You're about to make some massive changes to the codebase. We recommend you to do this work on a new branch, as it might take you some time to complete and rolling back can be complicated:

1. In your local terminal, change directories to your site project. For example, if you keep your projects in a folder called `projects` in the home directory:

    ```bash
    cd ~/projects/$site/
    ```

2. Create the new branch:

    ```bash
    git checkout -b composify
    ```

    You can replace `composify` with a branch name of your choosing, but all following steps assume this name.

## Setup a Multidev (optional)

If your Pantheon account has access to [multidev](/docs/multidev/), create a multidev to push your new code to:

```bash
git push origin composify && terminus env:create $site.dev composify
```

This will setup the multidev environment to receive and demo our changed code.

## Create a New Composer Project

1. In your local terminal, from the repository root of your Pantheon site, move a directory up:

    ```bash
    cd ..
    ```

2. Use Composer to create a new project, using the [Pantheon Drupal 8 Composer](https://github.com/pantheon-systems/example-drops-8-composer){.external} repository:

    ```bash
    composer create-project pantheon-systems/example-drops-8-composer $site-composer
    ```

This will create a new directory based on the example project [pantheon-systems/example-drops-8-composer](https://github.com/pantheon-systems/example-drops-8-composer) in the `$site-composer` directory.

### Copy pantheon.upstream.yml

Since the drops-8 upstream has a `pantheon.upstream.yml` and the example-drops-8-composer upstream does not, copy over our old file for the platform to properly load the site. From the `$site-composer` directory, run:

```bash
cp ../$site/pantheon.upstream.yml .
```

`ls` should reveal that the new code repository now has a copy of the `pantheon.upstream.yml`.

## Add in your Contrib/Custom code

What makes your site code unique is your selection of contributed modules and themes, and any custom modules or themes your development team has created. These customizations need to be replicated in your new project structure.

### Contributed Code
#### Modules
A Composer managed site should be able to include all custom code via Composer. Begin by reviewing your existing site's code. Check for contributed modules in `/modules`, `/modules/contrib`, `/sites/all/modules`, and `/sites/all/modules/contrib`. Add these modules to your new codebase using Composer by running the following for each module in the `my-site-composer` directory:

```bash
composer require drupal/module_name
```

Where `module_name` is the machine name of the module in question.

#### Themes
Repeat the same process with themes, checking `/themes`, `/themes/contrib`, `/sites/all/themes`, and `/sites/all/themes/contrib`. Use Composer in the same way as above to require these.

#### Libraries
Libraries can be handled in the same way, but the specifics depend on how your library code was included in the source site. If you're using a library's API, you may have to do additional work to ensure that library functions properly.

### Custom Code
#### Modules and Themes

Custom code should be manually copied from the existing site repository to the Composer managed directory.

Modules:

```bash
cp -r /modules/custom/awesome_module ../$site-composer/web/modules/custom
```

Themes:

```bash
cp -r /themes/custom/great_theme ../$site-composer/web/themes/custom
```

Follow suit with any other custom code you need to carry over.

#### Settings.php
Your existing site may have customizations to `settings.php` or any other config files. Review these carefully and extract relevant changes from these files to copy over. Always review any file paths referenced in the code, as these paths may change in the transition to Composer.

It is not wise to completely overwrite the  `settings.php` file with the old one, as there are customizations for moving the configuration directory you don't want to overwrite, as well as platform specific customizations.

The resulting `settings.php` should have no `$databases` array.

#### Configuration
The preferred (and assumed) location of the configuration directories when using a nested docroot and Composer is at the root of the repository next to the web directory:
```
my-site-composer
|-web
|-config    <--Here!
|-vendor
|-composer.json
|-etc...
```

Locate the configuration files in your existing site and move them here. If they are stored in the files directory on your existing site, retrieve them via [SFTP](/docs/sftp/), as the Git clone would not contain them. The example project is configured to use this location.

## Prepare to Deploy

At this point, your new project directory should contain all of the unique code from your existing Drupal 8 site, plus all of the code required to make a Composer driven project work. Since Pantheon requires all runtime code to be present when deploying to the platform, if no CI solution is a part of your workflow, you must now modify the project to be deployable straight to Pantheon.

If you do plan on using a CI solution, refer to our [Build Tools](/docs/guides/build-tools/) guide at this point.

From the `$site-composer` directory, run the following:

```bash
composer prepare-for-pantheon
```

The output `> DrupalProject\composer\ScriptHandler::prepareForPantheon` means the command was successful. This should modify the `.gitignore` file and cleanup any errant `.git` directories in the codebase, to prepare your new code for direct deployment to Pantheon.

### Commit
Commit your work to the git repo. From the `$site` directory, run the following:

```sh
cp -r .git ../$site-composer/
cd ../$site-composer
git add .
git commit -m "Convert to Composer based install"
```

You should see a large amount of files committed to the new branch we created earlier.

## Deploy

You've now committed the code to a branch. If your site has multidev, you can deploy that branch directly to a new multidev and test the site in the browser. If the site doesn't load properly, clear the cache. If there are any issues, utilize your site's logs via `terminus drush $site.composify -- wd-show` to inspect the watchdog logs, or follow the directions on [our documentation on log collection](/docs/logs).

Once you have confirmed the site is working, merge `composify` into `master`, and follow the standard workflow to QA a code change before going live.

If your plan does not include multidev, you will have to merge to master before deploying, then follow the rest of the steps above. If you have a local development solution, consider testing your `composify` branch locally before merging.


## Change Upstreams

Your Pantheon site is no longer compatible with traditional upstream updates. Avoid confusion by moving your site to an empty upstream:

```bash
terminus site:upstream:set $site empty
```

## Ongoing Core Updates

Core updates are carried out via Composer:

```bash
git pull origin master
composer update drupal/core --with-dependencies
composer prepare-for-pantheon
```

Review and commit file changes, then push back to Pantheon.

## See Also

 - [Composer Fundamentals and Workflows](/docs/composer/)
