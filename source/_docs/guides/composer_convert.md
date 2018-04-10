---
title: Converting a Standard Drupal 8 Site to a Composer Managed Site
description: Drupal 8 sites often require the usage of Composer to manage site dependencies. The need to begin using Composer for a site build can often surface after a site is in development, necessitating a divergance from the Pantheon managed upstream.
draft: true
contributors: dustinleblanc
---
<div class="alert alert-info">
  <h4 class="info">Note</h4><p markdown="1">Converting to a Composer managed site *removes* the ability to [apply updates via the site dashboard](/docs/upstream-updates/). This is for advanced users who are comfortable taking complete responsibility for the management of site updates. 
</p>
</div>

## Before You Begin

 - Make sure to review our documentation on [Git](/docs/git) and have `git` installed.
 - Make sure to review our documentation on [Composer](/docs/composer) and have `composer` installed.
 - Make sure to clone your _current_ Pantheon site repository to a working directory on your workstation.

## Checkout a New Branch
We're about to make some massive changes to the codebase, it is wise to do this work on a branch as it might take you sometime to complete and rolling back can be complicated:
```sh
git checkout -b composify
```

## Create a New Project with Composer

On your local workstation, from the site directory of your Pantheon site, execute the following command:

```command
cd .. && composer create-project pantheon-systems/example-drops-8-composer --stability=alpha my-site-composer
```
Make sure to substitute your project's name for `my-site`

This will create a new directory based on the example project [pantheon-systems/example-drops-8-composer](https://github.com/pantheon-system/example-drops-8-composer) in the `my-site-composer` directory. The directory structure should now look like this;
```sh
Sites
|-my-site
|-my-site-composer
```

## Add in your Contrib/Custom code

What makes your site code unique is your selection of contributed modules and themes and any custom modules or themes your development team has created. These customizations need to be replicated in our new project structure.

### Contributed Code
#### Modules
A Composer managed site should be able to include all custom code via Composer. Begin by reviewing your existing site's code. Check for contributed modules in `/modules`, `/modules/contrib`, `/sites/all/modules`, and `/sites/all/modules/contrib`. Add these modules to your new codebase using Composer by doing the following for each module in the `my-site-composer` directory:
```sh
composer require drupal/module_name
``` 
Where `module_name` is the machine name of the module in question

#### Themes
Repeat the same process with themes, checking `/themes`, `/themes/contrib`, `/sites/all/themes`, and `/sites/all/themes/contrib`. Use Composer in the same way as above to require these.

#### Libraries
Libraries can be handled in the same way, the specifics dependent on how your library code was included in the source site. If using the Libraries API, you may have to do additional work to ensure the libraries function properly.

### Custom Code
#### Modules and Themes

Custom code should be manually copied from the existing site repository.

module:
```sh
me@my-computer:~/Sites/my-site(composify) $ cp -r /modules/custom/awesome_module ../my-site-composer/web/modules/custom
```
theme:
```sh
me@my-computer:~/Sites/my-site(composify) $ cp -r /themes/custom/great_theme ../my-site-composer/web/themes/custom
```

Follow suit with any other custom code you need to carry over.

#### Settings.php
Your existing site may have customizations to `settings.php` or any other config files. Review these carefully and extract relavent changes from these files to copy over, always review any file paths referenced in the code as these may change in the transition. It is not wise to completely overwrite the file with the old one as there are customizations for moving the configuration directory you don't want to overwrite.

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

Locate the configuration files in your existing site and move them here. If they are stored in the files directory on your existing site, you will want to retreive them via SFTP (as the Git clone would not contain them).

## Prepare to Deploy 	&#128640;

At this point, your new project directory should contain all of the unique code from your existing Drupal 8 site plus all of the code required to make a Composer driven project work. Since Pantheon requires all runtime code to be present when deploying to the platform, if no CI solution is a part of your workflow, you must now modify the project to be deployable straight to Pantheon. From the `my-site-composer` directory, run the following:

```sh
composer prepare-for-pantheon
```

This should modify the `.gitignore` file and cleanup an errant `.git` directories in the codebase to prepare your new code for direct deployment to Pantheon.

## Commit
We now have to commit all this work to our Pantheon repo. From the `my-site` directory, run the following:

```sh
cp -r .git ../my-site-composer 
cd ../my-site-composer
git add .
git commit -m "Convert to Composer Based install
```

You should see a large amount of files committed to the new branch we created earlier.

## Deploy &#128640;

Now that we've committed the code on a branch, if the site has multi-dev, you can deploy that branch directly to a new multidev and test the site in the browser. If there are any issues, utilize your site's logs via `terminus drush my-site.composify -- wd-show` to inspect the watchdog logs, or follow the directions on (our documentation on log collect)[/docs/logs]

Once you have confirmed the site is working, merge in master, and follow the standard workflow to QA a code change before going live.

If your plan does not include multidev, you will have to merge to master before deploying, then follow the rest of the steps above.
