---
title: Create a Drupal 8 Site From the Command Line Using Terminus and Drush
description: Learn how to add modules, and manage configuration between Pantheon environments.
cms: "Drupal 8"
categories: [get-started]
tags: [terminus, site, cli]
type: guide
permalink: docs/guides/:basename
contributors: [stevector]
date: 2/15/2017
---

[Drush](https://github.com/drush-ops/drush) is a tool for working with Drupal from the command line. Terminus is a way to do on the command line everything you can do in Pantheon's browser-based dashboard. You can also run Drush commands directly from Terminus, making it a single solution for using the command line to develop on Pantheon.

This guide will walk through using the command line to create a new Drupal 8 site, add modules, create content, and move configurations between Pantheon environments.

## Before You Begin

Be sure that you:

- Are familiar with your operating system's command line.
- Are using a Unix-based system (Linux or Mac OS X). Windows commands may vary slightly.
- Have created a [Pantheon account](https://dashboard.pantheon.io/register). Pantheon accounts are always free for development.
- Have an [SSH key](/ssh-keys) generated, added to your Pantheon dashboard, and loaded into your local SSH agent.

## Install and Authenticate Terminus

Terminus provides advanced interaction with the platform and allows us to run Drush commands remotely. Terminus also opens the door to automating parts of your workflow by combining multiple operations. For more information about Terminus itself, see our [Terminus Manual](/terminus).

1. Install Terminus within the `$HOME/terminus` directory:

  ```bash{promptUser: user}
  mkdir $HOME/terminus
  cd $HOME/terminus
  curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install
  ```

1. [Generate a Machine Token](https://dashboard.pantheon.io/login?destination=%2Fuser#account/tokens/create/terminus/) from within **User Dashboard** > **Account** > **Machine Tokens**. Then use it to authenticate Terminus:

  ```bash{promptUser: user}
  terminus auth:login --machine-token=‹machine-token›
  ```

1. Once installed, verify your session:

  ```bash{promptUser: user}
  terminus site:list
  ```

If you see your Pantheon sites, then it was installed and authenticated successfully! Once you are comfortable with Terminus, you may find it faster to use than the browser.

## Create Your Site and Initialize Environments

<Alert title="Note" type="info">

The next few sections of this guide use the example variables `steve-site-d8` and `"Steve's Site D8"` as the site name and label. Make sure to replace each instance, as well as other variables, with your desired values.

</Alert>

1. Create a new Drupal 8 site on Pantheon:

  ```bash{promptUser: user}
  terminus site:create steve-site-d8 "My Site D8" "Drupal 8"
  ```

  If you would like to associate this site with an Organization, you can add the `--org` option to the command above and pass the Organization name, label, or ID. To associate an existing site with an Organization, use the `site:org:add` command.

1. Open your new Site Dashboard in a browser:

  ```bash{promptUser: user}
  terminus dashboard:view steve-site-d8
  ```

  Keep this window open while you continue reading so you can see the changes you are making in Terminus almost immediately in your Site Dashboard.

1. Use the Drush [`site-install`](https://drushcommands.com/drush-8x/core/site-install/) command to install Drupal 8 on the Dev environment:

  ```bash{promptUser: user}
  terminus drush steve-site-d8.dev -- site-install -y
  ```

  Use the password included in the output of that command to sign into the site with your browser, or use this command to get a one-time login link:

   ```bash{promptUser: user}
   terminus drush  steve-site-d8.dev  -- user-login
  ```

1. Create the Test environment:

  ```bash{promptUser: user}
  terminus env:deploy steve-site-d8.test
  ```

1. Create the Live environment:

  ```bash{promptUser: user}
  terminus env:deploy steve-site-d8.live
  ```

### Export the Site Name as a Variable

At this point you are probably tired of replacing `steve-site-d8` in every command.

1. Instead of having to type the site name out, let's export our site name to a variable so we can copy/paste the remainder of our commands:

  ```bash{promptUser: user}
  export TERMINUS_SITE=steve-site-d8
  ```

  This sets an [**environment variable**](https://en.wikipedia.org/wiki/Environment_variable) named `$TERMINUS_SITE` with the value `steve-site-d8`. Anytime we use the variable name it's replaced in the executed command with the value.

1. We can test this by echoing our variable:

  ```bash{promptUser: user}
  echo $TERMINUS_SITE
  ```

  You can now copy and paste the remainder of these commands without replacing the site name, as they use the `$TERMINUS_SITE` variable.

1. Let's see our new variable in action. Get the connection information for the Dev environment:

  ```bash{promptUser: user}
  terminus connection:info $TERMINUS_SITE.dev
  ```

## Install Drupal Modules

We are going to download and enable modules from the `devel` package. These modules are helpful while a site is under construction. You can read more about [this package of modules on drupal.org](https://www.drupal.org/project/devel).

You may want to remove these modules after you launch your site, or use more advanced configuration management techniques to keep the module on in the Dev environment and off in Test and Live. For this exercise on a Sandbox site, it is fine to have the modules installed in all three environments.

<Alert title="Note" type="info">

You may have heard that some Drupal 8 developers are [using Composer](https://pantheon.io/docs/composer/) to manage all modules. You can even use our [Terminus Composer plugin](https://github.com/pantheon-systems/terminus-composer-plugin) to run Composer commands on your Dev environment. However, for this guide we will stick to simply downloading modules with Drush.

</Alert>

1. Download and install the latest stable release of the `devel` package from drupal.org:

  ```bash{promptUser: user}
  terminus drush $TERMINUS_SITE.dev -- pm-download devel
  ```

1. Review the file changes:

  ```bash{promptUser: user}
  terminus env:diffstat $TERMINUS_SITE.dev
  ```

1. Commit your changes to the Dev environment:

  ```bash{promptUser: user}
  terminus env:commit  $TERMINUS_SITE.dev --message="Adding devel module"
  ```

1. Enable the modules:

  ```bash{promptUser: user}
  terminus drush $TERMINUS_SITE.dev -- pm-enable devel devel_generate kint webprofiler -y
  ```

  All of these modules are helpful during active development. We use Devel Generate later in this walkthrough to make nodes on the Live environment.

1. If you haven't done so yet, sign into your Dev environment, where you will see a footer of helpful development information provided by the `webprofiler` module we just installed:

  ```bash{promptUser: user}
  terminus drush $TERMINUS_SITE.dev -- user-login
  ```

  ![The webprofiler toolbar](../../images/drupal8-commandline--webprofiler.png)

1. Export the configuration in the Dev environment:

  ```bash{promptUser: user}
  terminus drush $TERMINUS_SITE.dev -- config-export -y
  ```

  [Configuration management is a complex topic with its own detailed recommendations](/drupal-8-configuration-management). For this guide, all you need to know is that by default, Drupal 8 configuration is stored in the database and can be cleanly exported to `yml` files. Once exported to files and committed to git, these configuration changes can be deployed to different environments (like Test and Live) where they can then be imported to the database.

1. Commit the changes:

  ```bash{promptUser: user}
  terminus env:commit  $TERMINUS_SITE.dev --message="export of config files"
  ```

1. Deploy the changes to the Test environment:

  ```bash{promptUser: user}
  terminus env:deploy $TERMINUS_SITE.test --sync-content --updatedb --cc  --note="Deploying exported config to enable modules"
  ```

  <Alert title="Note" type="info">

  The `--sync-content` option will pull the database and files down from the Live environment. In a real-world scenario, your content editors most likely have added content and files in the Live environment. For proper testing, you want those updates present on the Test environment with your deployed code. For more information on options for the this command, run `terminus env:deploy -h`.

  </Alert>

1. With the `yml` configuration files now present on the Test environment, they can be imported to the database there:

  ```bash{promptUser: user}
  terminus drush $TERMINUS_SITE.test -- config-import -y
  ```

1. Sign into Drupal in the Test environment to see the enabled modules:

  ```bash{promptUser: user}
  terminus drush $TERMINUS_SITE.test -- user-login
  ```

1. Sign into Drupal in the Live environment to see that the modules aren't there yet:

  ```bash{promptUser: user}
  terminus drush $TERMINUS_SITE.live -- user-login
  ```

  Now that you are signed into all three environments you should be seeing the development footer in Dev and Test but not Live.

1. Push your code changes to the Live environment:

  ```bash{promptUser: user}
  terminus env:deploy $TERMINUS_SITE.live --updatedb --cc  --note="Deploying exported config to enable modules"
  ```

1. Import the configuration on the Live environment:

  ```bash{promptUser: user}
  terminus drush $TERMINUS_SITE.live -- config-import -y
  ```

  Once this command completes you will be able to refresh the Live environment in your browser and see the development footer.

## Managing Content, Configuration, and Code Across Environments

In the lifecycle of managing a site, you can expect content editors to add new material to the Live environment. That content needs to be brought down into the Test and Dev environments from time to time so you can build and test features with fresh material from Live.

1. As a demonstration of the typical workflow on Pantheon, let's create some content in Live using [the `generate-content` command](https://drushcommands.com/drush-8x/devel-generate/generate-content/):

  ```bash{promptUser: user}
  terminus drush $TERMINUS_SITE.live -- generate-content 25
  ```

1. Copy the database and media files from Live into the Dev environment:

  ```bash{promptUser: user}
  terminus env:clone-content $TERMINUS_SITE.live dev
  ```

1. Make some configuration change on the Dev environment, such as enabling the [Views Glossary](https://www.drupal.org/project/views_glossary) module:

  ```bash{promptUser: user}
  terminus drush $TERMINUS_SITE.dev -- views-enable glossary
  ```

1. Export the configuration change so it can be managed in code:

  ```bash{promptUser: user}
  terminus drush $TERMINUS_SITE.dev -- config-export -y
  ```

1. Commit your code changes to the Dev environment:

  ```bash{promptUser: user}
  terminus env:commit $TERMINUS_SITE.dev --message="Enabling glossary View"
  ```

1. Let's check the Test environment before we deploy to get a deeper understanding of this workflow.

  Visit `/glossary` and `/admin/content` in your Test environment. You should see a 404 message for the glossary page and the administrative content list should not contain the articles and pages that were made on live. Once we deploy our code in the next step, we should see something different on both URLs.

1. Deploy code and import configuration changes to Test:

  ```bash{outputLines: 2}
  terminus env:deploy $TERMINUS_SITE.test --sync-content --updatedb --cc --note="Deploying glossary View"

  terminus drush $TERMINUS_SITE.test -- config-import -y
  ```

1. Check the Test environment and visit `/glossary` and `/admin/content` again. You should see both the glossary View and a full list of content on the administrative page.

1. Deploy to the Live environment and import the changes:

  ```bash{outputLines: 2}
  terminus env:deploy $TERMINUS_SITE.live --updatedb --cc --note="Deploying glossary View"

  terminus drush $TERMINUS_SITE.live -- config-import -y
  ```

  With the change to the glossary View deployed and imported on the Live environment you should be able to see the glossary page (`/glossary`).

## The Power of Terminus and Drush

If you're a developer who lives in the command line, you now see the power of Terminus and Drush. This guide has just scratched the surface of what can be done. Terminus provides the power to manage most aspects of your Pantheon sites, while tools like Drush (and WP-CLI for WordPress) give you the power to manage the inner workings of your Drupal powered site. Now you're ready to take the sandbox site we've setup and explore on your own to see what else is possible.

## See Also

- [Use the Pantheon Workflow](/pantheon-workflow)
- [Configuration Workflow for Drupal 8 Sites](/drupal-8-configuration-management)
- [The Terminus Manual](/terminus)
- [Drupal Drush Command-Line Utility](/drush)
