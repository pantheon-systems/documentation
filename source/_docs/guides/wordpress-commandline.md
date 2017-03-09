---
title: Use the Command Line to Create a WordPress Site Using Terminus and WP-CLI
description: Learn how to install and use Terminus and WP-CLI to control a WordPress site on Pantheon.
tags: [cli]
categories: [develop, cli]
type: guide
permalink: docs/guides/:basename/
contributors:
  - bmackinney
  - calevans
  - stevector
  - tessak22
date: 3/7/2017
---
Many developers feel more at home using the command line than they do using a GUI. Edit a text file, issue a command, and bang—you've completed your task. There's just something about doing it all from the command line that makes it a little more exciting.

Until recently, WordPress didn't have a great answer for developers who are most at home on the CLI.

WP-CLI is a tool used to manage a WordPress installation. However, don't think of it as a simple backup or search and replace tool. Yes, it can do those things, but it's so much more than that. This guide will walk you through creating and configuring a site using WP-CLI and Pantheon's own CLI, called Terminus.

## Before You Begin

Be sure that you:

- Are familiar with your operating system's command line.
- Are using a Unix-based system (Linux or Mac OS X). Windows commands may vary slightly.
- Have created a [Pantheon account](https://dashboard.pantheon.io/register). Pantheon accounts are always free for development.

## Installing and authenticating with Terminus

The most reliable way to install Terminus is with our dedicated installer:

`curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install`

Once Terminus is installed, you can sign in with a [machine token generated in the Dashboard](https://dashboard.pantheon.io/machine-token/create).

`terminus auth:login --machine-token=‹machine-token›`

If you have trouble with these steps, [see our full installation documentation](https://pantheon.io/docs/terminus/install/).

Once installed, test it using the following command:

`terminus art`

![Patheon Terminus Artwork](/source/docs/assets/images/wordpress-commandline-art.png)

If you see some sweet artwork, then it was installed successfully!

#### Site List

To start, let's take a look at a list of all your sites.

`terminus site:list`

![Pantheon Dashboard Site List View](/source/docs/assets/images/wordpress-commandline-site-list.png)

Once you are comfortable with Terminus, you may find it faster to use than the browser. Terminus also opens the door to writing scripts that combine multiple Terminus commands to accommodate whatever workflow needs you have. For more information about Terminus itself, see our [Terminus Manual](https://pantheon.io/docs/terminus/).

## Create Site - Dev, Test & Live Environments

#### Create Your WordPress Site

In this command, you will create a machine name as well as a label for your site. I used 'tessa-site-wp' for my machine name, 'Terminus Demo Site' for my label and 'WordPress' is indiciating the type of site I want to install.

![Pantheon Dashboard: Create Site](/source/docs/assets/images/wordpress-commandline-create-site.png)

`terminus site:create tessa-site-wp "Terminus Demo Site" WordPress`

NOTE: If you are copy and pasting these examples, you will need to replace `tessa-site-wp` in each command.

![Pantheon Dashboard: Choose Site Type](/source/docs/assets/images/wordpress-commandline-create-site-upstream.png)

#### Adding your site to an organization

There is an additional setting for assigning the Organization ID `--org` for your site. To get your organization's ID, run `terminus org:list`.

To add your site to an organization after creating your site, replace <site> and <orgid> and run the following command:

`terminus site:org:add <site> <orgid>`

#### Opening your site dashboard in browser

In case you want to see what you are doing in the site dashboard, you can obtain a link in command line to your site dashboard. Keep this window open while you are completing these commands, you will be able to see the changes you are making in Terminus almost immediately in your dashboard. Cool huh?

`terminus dashboard:view tessa-site-wp --print`

OR you can have your computer open your browser for you to your site dashboard:

`terminus dashboard:view tessa-site-wp`

![Pantheon Dashboard: Site Dashboard](/source/docs/assets/images/wordpress-commandline-site-dashboard.png)

#### Connection information

In your browser dashboard you can easily get connection information. Let's grab our connection info for your new site.

`terminus connection:info tessa-site-wp.dev`

![Pantheon Site Dashboard: Connection Info](/source/docs/assets/images/wordpress-commandline-connection-info.png)

## Install WordPress

It's time to actually install WordPress now! This step you will want to understand the [wp-cli core install](http://wp-cli.org/commands/core/install/) command:

`terminus wp tessa-site-wp.dev -- core install --url=http://dev-tessa-site-wp.pantheonsite.io --title="Terminus Demo Site" --admin_user=admin --admin_password=changemelater --admin_email=name@yoursite.com -yes`

![Pantheon Site Dashboard: Install WordPress, Choose Language](/source/docs/assets/images/wordpress-commandline-wp-lang-install.png)

![Pantheon Site Dashboard: Install WordPress](/source/docs/assets/images/wordpress-commandline-wp-install.png)

#### Using a variable for the site name
Instead of having to type all of this out, let's change our site name to a variable so we can copy/paste the remainder of our commands.

`export TERMINUS_SITE=tessa-site-wp`

This is basically stating that anytime we type $TERMINUS_SITE it's the same as typing tessa-site-wp. We can test that this worked by echo-ing our variable.

`echo $TERMINUS_SITE`

Since we have created this variable, you can now copy/paste the remainder of these commands without replacing the site name, as the remaining commands include the variable we just created instead.

Let's get our connection info again, using our variable.

`terminus connection:info $TERMINUS_SITE.dev`

## Let's Write Some Code

I use a few plugins on every site, but for this example we will install Contact Form 7.

`terminus wp $TERMINUS_SITE.dev -- plugin install contact-form-7 --activate`

![Pantheon Site Dashboard: Install CF7](/source/docs/assets/images/wordpress-commandline-install-cf7.png)

If you have the Site Dashboard open, you'll see the 78 files with changes ready to commit in a yellow box. You can expand that to see which files changed and commit through the UI, or commit these changes with the following commands.

Check to see what has changed:

`terminus env:diffstat $TERMINUS_SITE.dev`

Commit the files:

`terminus env:commit $TERMINUS_SITE.dev --message="Install CF7"`

![Pantheon Site Dashboard: Commit CF7](/source/docs/assets/images/wordpress-commandline-commit-cf7-to-dev.png)

## Create test environment

Now that we have WordPress installed and we installed and activated Contact Form 7, let's deploy these code changes to test. Before we deploy, your dashboard will show commits that are available to deploy.

![Pantheon Site Dashboard: Before Test Deployment](/source/docs/assets/images/wordpress-commandline-before-deploy-test.png)

`terminus env:deploy $TERMINUS_SITE.test --sync-content --updatedb --cc --note="Deploy after CF7 Install"`

We are running the env:deploy command with the --sync-content flag which will bring the database down from the Live environment before deploying the code. In a real-world scenario, your content editors may have added posts and files in the Live environment. You would want those updates present on the Test environment with your deployed code. The --updatedb flag runs WordPress's database update script. And --cc clears caches. The --note flag adds a message that is tied to the record of the deployment. Under the hood, Pantheon creates a git tag for each deployment. This note field is used as an annotation on the git tag. To see the tag that was just created.

![Pantheon Site Dashboard: After Test Deployment](/source/docs/assets/images/wordpress-commandline-after-deploy-test.png)

## Create live environment

Test is ready to go and looking good! Let's deploy this to live. Before we deploy, if we peek in the site dashboard under Live, we can see there are 2 commits ready to be deployed.

![Pantheon Site Dashboard: Before Live Deployment](/source/docs/assets/images/wordpress-commandline-before-live-deploy.png)

`terminus env:deploy $TERMINUS_SITE.live --updatedb --cc --note="Deploy after CF7 Install"`

We don't need the --sync-content flag when going to the Live environment because that environment already has our canonical database.

![Pantheon Site Dashboard: After Live Deployment](/source/docs/assets/images/wordpress-commandline-after-live-deploy.png)

## Customize Your Site
Now that you have a stock WordPress install, let's make it look a little better by adding a new theme.

### Install and Add a New Theme

WordPress has a plethora of free and paid themes you can install to customize your site. We've chosen one from the WordPress.org Themes Repository named Shapely. Note: There is no need to download the theme first, WP-CLI will pull it for us from WordPress.org.

Position your Pantheon Dashboard window where you can see it while working in the terminal. To install and activate the new theme on your site, use the following command:

`terminus wp $TERMINUS_SITE.dev -- theme install shapely --activate`

Watch your Dashboard. It recognizes your uncommitted changes.

![Pantheon Site Dashboard: Theme Ready to Commit](/source/docs/assets/images/wordpress-commandline-after-install-theme.png)

`terminus env:commit $TERMINUS_SITE.dev --message="Install Shapely Theme"`

![Pantheon Site Dashboard: Commit Theme Files](/source/docs/assets/images/wordpress-commandline-commit-theme-files.png)

![Pantheon Site Dashboard: Theme Installed in WordPress](/source/docs/assets/images/wordpress-commandline-theme-in-wordpress.png)

Terminus connects to Pantheon's API, which makes real-time updates to any Dashboard you have open. What you do in Terminus is immediately represented in your Dashboard, so it is always up to date.

Now that we've committed our changes, go back to your dev site in the browser and refresh it to see what you've created.

### Theming Best Practices

No WordPress site is ready for development without a child theme. Let's create one:

`terminus wp $TERMINUS_SITE.dev -- scaffold child-theme tessa-site --parent_theme=shapely`

![Pantheon Site Dashboard: Child Theme Files](/source/docs/assets/images/wordpress-commandline-child-theme-files.png)

![Pantheon Site Dashboard: Child Theme Installed in WordPress](/source/docs/assets/images/wordpress-commandline-child-theme-wp.png)

Next, we'll commit it.

`terminus env:commit $TERMINUS_SITE.dev --message="Create Child of Shapely Theme"`

Now you're ready to edit your theme, allowing for upstream theme improvements in the shapely theme to happen without interfering with the functionality of your site.

![Pantheon Site Dashboard: Child Theme Commit Log](/source/docs/assets/images/wordpress-commandline-child-theme-commit-log.png)

#### Deploy to Test

`terminus env:deploy $TERMINUS_SITE.test --sync-content --updatedb --cc --note="Deploy Themes"`

![Pantheon Site Dashboard: Final Deploy to Test](/source/docs/assets/images/wordpress-commandline-final-deploy-test.png)

#### Deploy to Live

`terminus env:deploy $TERMINUS_SITE.live --updatedb --cc --note="Deploy Themes"`

![Pantheon Site Dashboard: Final Deploy to Live](/source/docs/assets/images/wordpress-commandline-final-deploy-live.png)

## The Power of Terminus and WP-CLI

If you're a developer who lives in the command line, you now see the power of Terminus and WP-CLI. This guide has just scratched the surface of what can be done. Terminus provides the power to manage most aspects of your Pantheon sites, while tools like WP-CLI (and drush for Drupal) give you the power to manage the inner workings of your WordPress powered site. Now you're ready to take the sandbox site we've setup and explore on your own to see what else is possible.
