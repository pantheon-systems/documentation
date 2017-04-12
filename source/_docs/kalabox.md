---
title: Developing Locally with Kalabox
description: Work locally and deploy to Pantheon using Kalabox.  
tags: [local]
categories: []
---
[Kalabox](http://www.kalabox.io/) is a Free and Open Source project allows you to quickly create and manage local environments that mirror site environments on Pantheon with the press of a button, including add on services such as Redis and Solr. Kalabox includes both an intuitive GUI and  command-line interface, and is powered by [Docker](https://www.docker.com/) under the hood.

Support for Kalabox is provided via their [GitHub issue queue](https://github.com/kalabox/kalabox).

Visit the [Kalabox documentation site](http://pantheon.kalabox.io/en/stable/) for more detailed information on the [Kalabox GUI](http://pantheon.kalabox.io/en/stable/users/gui/) and [development tools](http://pantheon.kalabox.io/en/stable/users/tooling/).

## Installation
Installation is as simple as grabbing the latest release from [kalabox.io](http://www.kalabox.io/) and installing it. There are OS specific details in the [Kalabox Documentation](http://docs.kalabox.io/en/stable/users/install/) if necessary.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">Kalabox requires ports `80`, `443`, and `8160`. If you're running another local web server on those ports, it will interfere with Kalabox's ability to function.</p></div>

## Authenticate Your Account
Kalabox uses [Machine Tokens](/docs/machine-tokens) to authenticate access to your sites on Pantheon. If you already have a working Terminus installation, it will automatically detect and use that token. However, if this is your first time using a token-based integration, setting it up is very quick:

1. Click the **+** icon to open the sidebar.
2. Select **Pantheon** in the **Add Account** section.
3. Generate a [new machine token](https://dashboard.pantheon.io/machine-token/create/Kalabox), copy/paste it into Kalabox GUI click **Submit**.

Your Pantheon account is now authenticated with Kalabox and will appear in the sidebar.

## Create Local Environments for Existing Pantheon Sites
1.  Click **Add new site** or **+** to open the sidebar, and select your Pantheon user account.
2.  Select a site.
3.  Name your site, pick the environment you'd like to pull from, and click **Submit**.

    ![Kalabox add new site](/source/docs/assets/images/kalabox-add-site.png)

    This process may take several minutes while Kalabox builds the local environment for your site.

## Pull Changes from Pantheon into a Local Environment
1. Click <em class="fa fa-cog"></em> and select **Pull** on the target application.

 ![Kalabox add new site](/source/docs/assets/images/kalabox-action-pull.png)

2. Choose whether to pull database and files, and click **Submit**.

## View Your Local Environment

Click on your site in the Kalabox app. This will open a new browser window or tab, with the address `<YOURSITE>.kbox.site`. While it may appear that you're accessing a remote site, Kalabox is using a remote DNS server to redirect back to your local instance.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">If your site won't load, it may be due to local network restrictions on **DNS rebinding** (some open-source routing software like DD-WRT does this by default). If you can't or don't want to remove this restriction, follow the steps for working offline.</p></div>

## Make Changes to Your Site

In addition to changes made from the WordPress or Drupal interface, you can view and edit your site files at `~/Kalabox/<yoursite>/code`. You can also click <em class="fa fa-cog"></em> then **<em class="fa fa-terminal"></em>Terminal** to launch your default terminal software in that directory.

## Push Changes to Pantheon
1. Click <em class="fa fa-cog"></em> and select **Push** on the target application.

 ![Kalabox add new site](/source/docs/assets/images/kalabox-action-push.png)

2. Enter a commit message.
3. Choose whether to pull database and files, and click **Submit**.

## Work Offline With Kalabox

Even though your Kalabox environment is running on your local computer, it uses a remote DNS server to direct your web browser. To work offline, you need to modify your `hosts` file.

The location of `hosts` differs between operating systems. On MacOS and Linux, the file is at `/etc/hosts`. On Windows, it's `c:\windows\system32\drivers\etc\hosts` (it may be hidden). Add the following lines to `hosts`:

 - **Windows and MacOS**

        127.0.0.1    <yoursite>.kbox.site


 - **Linux**

        10.13.37.100   <yoursite>.kbox.site

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">Plugins that pull data from external sources may not load or display unpredictable behavior when working offline.</p></div>

## Troubleshooting

### Push to Pantheon Fails
Commits that exist on the target Pantheon environment must also exist locally before changes can be pushed. Additionally, uncommitted SFTP changes on Dev or Multidev environments will prevent Kalabox from pushing work to Pantheon. This can be resolved by the following:

Delete or commit outstanding file changes within the target environment (Dev or Multidev), pull changes from Pantheon, then push again.
