---
title: Local Development with Kalabox
description: Work locally and deploy to Pantheon using Kalabox.  
categories: [developing]
tags: [local, code]
---
Kalabox allows you to create local environments that mirror site environments on Pantheon with the press of a button, including add on services such as Redis and Solr. Support is maintained at [https://github.com/kalabox/kalabox/issues](https://github.com/kalabox/kalabox).

## Installing
Refer to the [Kalabox Documentation](http://docs.kalabox.io/en/stable/users/install/) for installation instructions.

## Authenticating
Kalabox uses [Machine Tokens](/docs/machine-tokens) to authenticate access to your sites on Pantheon:

1. Click **+** to open the sidebar.
2. Select **Pantheon** from within the **Add Account** section.
3. Provide an existing machine token or generate a [new one](https://dashboard.pantheon.io/machine-token/create/Kalabox), then click **Submit**.
4. Your Pantheon account is now authenticated with Kalabox and will appear in the sidebar.

## Creating Local Environments for Existing Pantheon Sites
1. Click **Add new site** or **+** to open the sidebar, then select your Pantheon user account.
2. Select a site.
3. Name your site and pick the environment you'd like to pull from, then click **Submit**.

## Pulling Changes from Pantheon into a Local Environment
1. Click <em class="fa fa-cog"></em> and select **Pull** on the target application.
2. Choose whether to pull database and files, then click **Submit**.

## Pushing Changes to Pantheon
1. Click <em class="fa fa-cog"></em> and select **Push** on the target application.
2. Enter a commit message.
3. Choose whether to pull database and files, then click **Submit**.

## Troubleshooting

### Push to Pantheon Fails
Commits that exist on the target Pantheon environment must also exist locally before changes can be pushed. Additionally, uncommitted SFTP changes on Dev or Multidev environments will prevent Kalabox from pushing work to Pantheon. This can be resolved by the following:

Delete or commit outstanding file changes within the target environment (Dev or Multidev), pull changes from Pantheon, then retry pushing to resolve.
