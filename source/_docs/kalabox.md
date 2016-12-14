---
title: Developing Locally with Kalabox
description: Work locally and deploy to Pantheon using Kalabox.  
tags: [develop]
categories: [develop]
---
Kalabox is a Free and Open Source project allows you to quickly create and manage local environments that mirror site environments on Pantheon with the press of a button, including add on services such as Redis and Solr. Kalabox includes both an intuitive GUI and  command-line interface, and is powered by Docker under the hood.

Support for Kalabox is provided via their [GitHub issue queue](https://github.com/kalabox/kalabox).

Visit the [Kalabox documentation site](http://pantheon.kalabox.io/en/stable/) for more detailed information on the [Kalabox GUI](http://pantheon.kalabox.io/en/stable/users/gui/) and [development tools](http://pantheon.kalabox.io/en/stable/users/tooling/).

## Installation
Installation is as simple as grabbing the latest release from [kalabox.io](http://www.kalabox.io/) and installing it. There are OS specific details in the [Kalabox Documentation](http://docs.kalabox.io/en/stable/users/install/) if necessary.

## Authenticate Your Account
Kalabox uses [Machine Tokens](/docs/machine-tokens) to authenticate access to your sites on Pantheon. If you already have a working Terminus installation, it will automatically detect and use that token. However, if this is your first time using a token-based integration, setting it up is very quick:

1. Click the **+** icon to open the sidebar.
2. Select **Pantheon** in the **Add Account** section.
3. Generate a [new machine token](https://dashboard.pantheon.io/machine-token/create/Kalabox), copy/paste it into Kalabox GUI click **Submit**.

Your Pantheon account is now authenticated with Kalabox and will appear in the sidebar.

## Create Local Environments for Existing Pantheon Sites
1. Click **Add new site** or **+** to open the sidebar, and select your Pantheon user account.
2. Select a site.
3. Name your site, pick the environment you'd like to pull from, and click **Submit**.

 ![Kalabox add new site](/source/docs/assets/images/kalabox-add-site.png)

## Pull Changes from Pantheon into a Local Environment
1. Click <em class="fa fa-cog"></em> and select **Pull** on the target application.

 ![Kalabox add new site](/source/docs/assets/images/kalabox-action-pull.png)

2. Choose whether to pull database and files, and click **Submit**.

## Push Changes to Pantheon
1. Click <em class="fa fa-cog"></em> and select **Push** on the target application.

 ![Kalabox add new site](/source/docs/assets/images/kalabox-action-push.png)

2. Enter a commit message.
3. Choose whether to pull database and files, and click **Submit**.

## Troubleshooting

### Push to Pantheon Fails
Commits that exist on the target Pantheon environment must also exist locally before changes can be pushed. Additionally, uncommitted SFTP changes on Dev or Multidev environments will prevent Kalabox from pushing work to Pantheon. This can be resolved by the following:

Delete or commit outstanding file changes within the target environment (Dev or Multidev), pull changes from Pantheon, then push again.
