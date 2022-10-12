---
title: WP-CLI on the Pantheon Platform
subtitle: Create a WordPress Site with Terminus and WP-CLI
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

This section provides information on how to create and configure a site, and initialize your environments with Terminus, which allows you to call WP-CLI remotely without using a local installation.

## Before You Begin

Be sure that you:

- Are familiar with your operating system's command line.
- Are using a Unix-based system (Linux or Mac OS X). Windows commands may vary slightly.
- Have already created a [Pantheon account](https://dashboard.pantheon.io/register). Pantheon accounts are always free for development.

## Install and Authenticate Terminus

Terminus provides advanced interaction with the platform and allows you to run WP-CLI commands remotely. Terminus allows you to automate parts of your workflow by combining multiple operations. Refer to the [Terminus Manual](/terminus) for more information.

1. Install Terminus within the `$HOME/terminus` directory:

    ```bash
    mkdir $HOME/terminus
    cd $HOME/terminus
    curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install
    ```

2. Navigate to your **User Dashboard**, select **Account**, select **Machine Tokens**, and then [Generate a Machine Token](https://dashboard.pantheon.io/login?destination=%2Fuser#account/tokens/create/terminus/). T

1. Use the Machine token to authenticate Terminus:

    ```bash
    terminus auth:login --machine-token=‹machine-token›
    ```

3. Verify your session after the installation is complete:

    ```bash
    terminus site:list
    ```

    The installation and authentication were successful if you can see your Pantheon sites.

## Create Your Site and Initialize Environments

<Alert title="Note" type="info">

The next sections use the example variables `tessa-site-wp` and `"Terminus Demo Site"` as the site name and label. Make sure you replace each instance, as well as other variables like the site URL and user/password combinations, with your own values.

</Alert>

1. Create a new WordPress site on Pantheon:

    ```bash
    terminus site:create tessa-site-wp "Terminus Demo Site" WordPress
    ```

    - Add the `--org` option to the command above and pass the Organization name, label, or ID if you want to associate this site with an Organization. 

    - Use the `site:org:add` command to associate an existing site with an Organization.

2. Open your new Site Dashboard in a browser:

    ```bash
    terminus dashboard:view tessa-site-wp
    ```

   Keep this window open to see the changes you are making in Terminus appear almost immediately in your Site Dashboard.

3. Retrieve the platform domain for the Dev environment:

    ```bash
    terminus env:info tessa-site-wp.dev --field=domain
    ```

   You'll need this information to fill out the `--url` option in the next step.

4. Use the [WP-CLI `core install`](https://developer.wordpress.org/cli/commands/core/install/) command to install WordPress on the Dev environment:

    ```bash
    terminus wp tessa-site-wp.dev -- core install --url=https://dev-tessa-site-wp.pantheonsite.io --title="Terminus Demo Site" --admin_user=admin --admin_password=changemelater --admin_email=name@yoursite.com
    ```

    As a reminder, WP-CLI is the command line utility for WordPress itself.	Terminus is simply passing through the WP-CLI commands to the site on Pantheon. Run the command below to get a full list of WP-CLI commands:

    ```bash
    terminus wp tessa-site-wp.dev -- help
    ```

    The `--` signifies the end of the Terminus options, anything after `--` is passed straight to WP-CLI.

4. Create the Test environment:

    ```bash
    terminus env:deploy tessa-site-wp.test --updatedb --note="Initialize the Test environment"
    ```

5. Create the Live environment:

    ```bash
    terminus env:deploy tessa-site-wp.live  --updatedb --note="Initialize the Live environment"
    ```

### Export the Site Name as a Variable

1. Export your site name as a variable to avoid the need to copy/paste the remainder of your commands:

    ```bash
    export TERMINUS_SITE=tessa-site-wp
    ```

  This sets an [**environment variable**](https://en.wikipedia.org/wiki/Environment_variable) named `$TERMINUS_SITE` with the value `tessa-site-wp`. Anytime you use the variable name it's replaced in the executed command with the variable value.

2. Echo your variable to test that it works correctly:

    ```bash
    echo $TERMINUS_SITE
    ```

    You can now copy and paste the remainder of these commands without replacing the site name now that the commands use the `$TERMINUS_SITE` variable.

3. Run the command below to get the connection information for the Dev environment:

    ```bash
    terminus connection:info $TERMINUS_SITE.dev
    ```


## Using Terminus and WP-CLI

Terminus provides the power to manage most aspects of your Pantheon sites. Tools such as WP-CLI (and Drush for Drupal) give you the power to manage the inner workings of your WordPress-powered site. Now you're ready to take the Sandbox site you've setup and explore on your own to see what else is possible.

## More Resources

- [Use the Pantheon Workflow](/pantheon-workflow)
- [WordPress Configuration Management (WP-CFM)](/wp-cfm)
- [The Terminus Manual](/terminus)