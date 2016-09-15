---
title: Developing Locally with Kalabox
description: Work locally and deploy to Pantheon using Kalabox.  
categories: [developing]
tags: [local, code]
---
Kalabox allows you to create local environments that mirror site environments on Pantheon with the press of a button, including add on services such as Redis and Solr. Support is maintained at [https://github.com/kalabox/kalabox/issues](https://github.com/kalabox/kalabox).

## Installation
Refer to the [Kalabox Documentation](http://docs.kalabox.io/en/stable/users/install/) for instructions.

## Authenticate Your Account
Kalabox uses [Machine Tokens](/docs/machine-tokens) to authenticate access to your sites on Pantheon:

1. Click the **+** icon to open the sidebar.
2. Select **Pantheon** in the **Add Account** section.
3. Provide an existing machine token or generate a [new one](https://dashboard.pantheon.io/machine-token/create/Kalabox), and click **Submit**.

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
