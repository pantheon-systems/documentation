---
title: WP-CLI on the Pantheon Platform
subtitle: Create a WordPress Site From the Command Line Using Terminus and WP-CLI
description: Learn how to install and use Terminus and WP-CLI to control a WordPress site on Pantheon.
cms: "WordPress"
categories: [get-started]
tags: [terminus, wp-cli]
contributors: [bmackinney, calevans, stevector, tessak22, davidneedham]
layout: guide
showtoc: true
permalink: docs/guides/create-wp-site
anchorid: create-wp-site
---

This section provides information on how to create a site and initialize your environments with WP-CLI.

Many developers feel more at home using the command line than they do using a GUI. Edit a text file, issue a command, and bang—you've completed your task. There's just something about doing it all from the command line that makes it a little more exciting. Until recently, WordPress didn't have a great answer for developers who are most at home on the CLI.

WP-CLI is a tool used to manage a WordPress installation. However, don't think of it as a simple backup or search and replace tool. Yes, it can do those things, but it's so much more than that. This guide will walk you through creating and configuring a site from the command line using Pantheon's own CLI, called Terminus, which allows you to call WP-CLI remotely without using a local installation.

## Before You Begin

Be sure that you:

- Are familiar with your operating system's command line.
- Are using a Unix-based system (Linux or Mac OS X). Windows commands may vary slightly.
- Have created a [Pantheon account](https://dashboard.pantheon.io/register). Pantheon accounts are always free for development.

## Install and Authenticate Terminus
Terminus provides advanced interaction with the platform and allows us to run WP-CLI commands remotely. Terminus also opens the door to automating parts of your workflow by combining multiple operations. For more information about Terminus itself, see our [Terminus Manual](/terminus).

1. Install Terminus within the `$HOME/terminus` directory:

    ```bash
    mkdir $HOME/terminus
    cd $HOME/terminus
    curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install
    ```

2. [Generate a Machine Token](https://dashboard.pantheon.io/login?destination=%2Fuser#account/tokens/create/terminus/) from within **User Dashboard** > **Account** > **Machine Tokens**. Then use it to authenticate Terminus:

    ```bash
    terminus auth:login --machine-token=‹machine-token›
    ```

    For details, see [Terminus Manual: Install](/terminus/install).

3. Once installed, verify your session:

    ```bash
    terminus site:list
    ```

    If you see your Pantheon sites, then it was installed and authenticated successfully! Once you are comfortable with Terminus, you may find it faster to use than the browser.

## Create Your Site and Initialize Environments

<Alert title="Note" type="info">

The next few secions of this guide use the example variables `tessa-site-wp` and `"Terminus Demo Site"` as the site name and label. Make sure to replace each instance, as well as other variables like the site URL and user/password combinations, with your desired values.

</Alert>

1. Create a new WordPress site on Pantheon:

    ```bash
    terminus site:create tessa-site-wp "Terminus Demo Site" WordPress
    ```

   If you would like to associate this site with an Organization, you can add the `--org` option to the command above and pass the Organization name, label, or ID. To associate an existing site with an Organization, use the `site:org:add` command.

2. Open your new Site Dashboard in a browser:

    ```bash
    terminus dashboard:view tessa-site-wp
    ```

   Keep this window open while you continue reading so you can see the changes you are making in Terminus almost immediately in your Site Dashboard.

3. Get the platform domain for the Dev environment:

    ```bash
    terminus env:info tessa-site-wp.dev --field=domain
    ```

   You'll need this to fill out the `--url` option in the next step.

4. Use the [WP-CLI `core install`](https://developer.wordpress.org/cli/commands/core/install/) command to install WordPress on the Dev environment:

    ```bash
    terminus wp tessa-site-wp.dev -- core install --url=https://dev-tessa-site-wp.pantheonsite.io --title="Terminus Demo Site" --admin_user=admin --admin_password=changemelater --admin_email=name@yoursite.com
    ```

    As a reminder, WP-CLI is the command line utility for WordPress itself.	Terminus is simply passing through the WP-CLI commands to the site on Pantheon. To get a full list of WP-CLI commands run:

    ```bash
    terminus wp tessa-site-wp.dev -- help
    ```

    The `--` signifies the end of the Terminus options, anything after `--` gets passed straight to WP-CLI.

4. Create the Test environment:

    ```bash
    terminus env:deploy tessa-site-wp.test --updatedb --note="Initialize the Test environment"
    ```

5. Create the Live environment:

    ```bash
    terminus env:deploy tessa-site-wp.live  --updatedb --note="Initialize the Live environment"
    ```

### Export the Site Name as a Variable
1. Instead of having to type the site name out, let's export our site name to a variable so we can copy/paste the remainder of our commands:

    ```bash
    export TERMINUS_SITE=tessa-site-wp
    ```

  This sets an [**environment variable**](https://en.wikipedia.org/wiki/Environment_variable) named `$TERMINUS_SITE` with the value `tessa-site-wp`. Anytime we use the variable name it's replaced in the executed command with the value.

2. We can test this by echoing our variable:

    ```bash
    echo $TERMINUS_SITE
    ```

    You can now copy and paste the remainder of these commands without replacing the site name, as they use the `$TERMINUS_SITE` variable.

3. Let's see our new variable in action. Get the connection information for the Dev environment:

    ```bash
    terminus connection:info $TERMINUS_SITE.dev
    ```


## Using Terminus and WP-CLI

This guide has just scratched the surface of what can be done. Terminus provides the power to manage most aspects of your Pantheon sites, while tools like WP-CLI (and Drush for Drupal) give you the power to manage the inner workings of your WordPress powered site. Now you're ready to take the Sandbox site we've setup and explore on your own to see what else is possible.

## More Resources

 - [Use the Pantheon Workflow](/pantheon-workflow)
 - [WordPress Configuration Management (WP-CFM)](/wp-cfm)
 - [The Terminus Manual](/terminus)