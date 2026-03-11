---
title: How to transfer a site between Pantheon workspaces
description: Prepare your Next.js site for transfer between Pantheon workspaces by linking the VCS connection.
reviewed: "2026-03-11"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/transfer-site
---

<Partial file="nextjs-pre-ga.md" />

This guide walks through transferring a Next.js site from one Pantheon workspace to another. When a site is transferred, the VCS connection (GitHub App installation) must also be linked to the destination workspace.

<Alert title="Note" type="info">

The actual site transfer between workspaces must be performed by Pantheon's Customer Success Engineering (CSE) team. This guide covers the prerequisites you must complete before requesting the transfer.

</Alert>

## Requirements

* Access granted for the [Next.js Private Beta Program](/nextjs/#access--availability)
* Administrative access to both the source and destination Pantheon workspaces
* The [Pantheon Site Integration](https://github.com/apps/pantheon-site-integration) GitHub App installed in the GitHub organization used by the site
* Install the following CLI applications:
  - [Terminus](/terminus/install)
  - [Terminus Repository Plugin](https://github.com/pantheon-systems/terminus-repository-plugin)

## Step 1: Link the VCS connection to the destination workspace

Before requesting a site transfer, you must link the GitHub App installation to the destination workspace. Run:

```bash{promptUser: user}
terminus vcs:connection:link <destination-workspace> --vcs-org=<github-org> --source-org=<source-workspace>
```

Replace:
* `<destination-workspace>` with the name, label, or ID of the destination Pantheon workspace
* `<github-org>` with the GitHub organization name where the app is installed
* `<source-workspace>` with the name, label, or ID of the source Pantheon workspace that has the existing VCS connection

<Alert title="Note" type="info">

If you omit `--vcs-org` or `--source-org`, the command prompts you to select from available options interactively.

</Alert>

You can verify existing connections by running:

```bash{promptUser: user}
terminus vcs:connection:list <workspace>
```

## Step 2: Request the site transfer

Once you have linked the VCS connection to the destination workspace, [contact Pantheon support](/guides/support/contact-support/) to request the site transfer. Provide the following information:

* The site name or ID
* The source workspace name or ID
* The destination workspace name or ID

## Step 3: Verify

After the CSE team completes the transfer, confirm:

1. The site appears in the destination workspace.
1. Push a small change to the repository and verify it triggers a build on the site.

## GitHub User accounts

If the GitHub App was installed on a personal GitHub account (rather than a GitHub organization), the standard `vcs:connection:link` command may not work as expected. In this case, the user who originally installed the GitHub App should be the one to run the `vcs:connection:link` command, since they have direct access to the installation.

If you encounter issues with this scenario, [contact Pantheon support](/guides/support/contact-support/) for assistance.
