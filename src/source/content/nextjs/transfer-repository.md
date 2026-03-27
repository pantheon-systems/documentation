---
title: How to transfer a repository to a different GitHub organization
description: Transfer the GitHub repository connected to your Next.js site to a different GitHub organization.
reviewed: "2026-03-11"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/transfer-repository
---

<Partial file="nextjs-pre-ga.md" />

This guide walks through moving a Next.js site's GitHub repository from one GitHub organization to another while maintaining the Pantheon build integration.

## Requirements

* [Terminus](/terminus/install) with the [Terminus Repository Plugin](https://github.com/pantheon-systems/terminus-repository-plugin)

## Step 1: Make sure the GitHub App is installed in the destination organization

Before transferring the repository, the [Pantheon Site Integration](https://github.com/apps/pantheon-site-integration) GitHub App must be installed in the destination GitHub organization. Without this, Pantheon cannot detect code changes and trigger builds.

You can install the GitHub App in one of two ways:

* **Create a new site** in the destination organization's Pantheon workspace. The site creation flow prompts you to install and authorize the GitHub App.
* **Use Terminus** to add the VCS connection directly:

  ```bash{promptUser: user}
  terminus vcs:connection:add <workspace>
  ```

  Replace `<workspace>` with the name, label, or ID of the Pantheon workspace associated with the destination GitHub organization. This command opens a browser window where you can install and authorize the GitHub App for the destination organization.

You can verify the connection exists by running:

```bash{promptUser: user}
terminus vcs:connection:list <workspace>
```

## Step 2: Transfer the repository in GitHub

Follow [GitHub's documentation on transferring a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository) to move the repository from the source organization to the destination organization.

## Step 3: Verify the integration

After the transfer, confirm that the Pantheon build integration is working:

1. Push a small change to the repository's `main` branch or open a pull request.
1. Verify that a build is triggered on the Pantheon site.

## Troubleshooting

### Builds are not triggered after the transfer

The GitHub App may not be properly installed in the destination organization. Verify the installation by checking the [Pantheon Site Integration](https://github.com/apps/pantheon-site-integration) app settings in your destination GitHub organization.

If the issue persists, [contact Pantheon support](/guides/support/contact-support/) for assistance reconnecting the integration.

### Repository was transferred before installing the GitHub App

If you transferred the repository to a new GitHub organization before installing the Pantheon Site Integration GitHub App in that organization, your site's build integration is broken. To fix this:

1. Install the GitHub App in the destination organization by following [Step 1](#step-1-make-sure-the-github-app-is-installed-in-the-destination-organization).
1. [Contact Pantheon support](/guides/support/contact-support/) to restore the connection between your site and the repository.
