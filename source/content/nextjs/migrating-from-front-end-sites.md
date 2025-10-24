---
title: How to migrate from Front-End Sites
description: Move your existing Next.js site from Pantheon's Front-End Sites to updated Next.js infrastructure.
reviewed: "2025-10-01"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/migrating-from-front-end-sites

---

<Partial file="nextjs-pre-ga.md" />

## Befor you begin

* Do you have admin access to your GitHub repository?
* Do you have access to create new Next.js sites on Pantheon?
* Do you have access to your DNS provider to update DNS records?

### Differences between Front-End Sites and new Next.js sites

_Link to blog post_

_table of differences between Front-End Sites and new Next.js support_

## Replicating your Front-End Site on new Next.js infrastructure

### Connect the GitHub application to your repository

```bash{promptUser: user}
terminus site:create my-site-name my-site-label nextjs15 \
--org="My Pantheon Org name" \
--vcs-provider=github \
--vcs-org=my-github-org-name \
--repository-name=name-of-the-existing-repo
--no-create-repo
```

(Even if your codebase is not spefic to Next.js 15, use the `nextjs15` option to create the site.)

This command will provision new infrastructure for your Next.js site and will take a few minutes to complete. You can monitor the progress of the initial build in the Pantheon Dashboard or by using the [Node Logs Plugin for Terminus](/nextjs/cli-tools).

For many sites, builds will fail until required environment variables are set.

### Replicate environment variables as Pantheon secrets

Front-End Sites provided a dashboard interface for setting environment variables.
The new Next.js support on Pantheon uses [Secrets Manager](/guides/secrets) to set environment variables.

### Confirm your site is working as expected

Once your environment variables are set, and another build process has completed without error, confirm that your site is working as expected in the Dev environment.

https://github.com/pantheon-systems/terminus-secrets-manager-plugin

## Going Live

### Consider your workflow for deploying code changes to Test and Live environments

One of the key differences between Front-End Sites and the new Next.js support on Pantheon is the automatic inclusion of Test and Live environments.

Front-End Sites was designed to have a Live environment a non-live environments (per pull request or specially named "Multidev" environments) only.

Like our infrastructure for PHP-based sites, the new Next.js support on Pantheon includes Dev, Test, and Live environments by default.
Your `main` branch will deploy to Dev and deployments to [Test and Live will be triggered by Git tags](/nextjs/test-and-live-env).
Depending on your perspective this change could be a beneficial safeguard or an inconvenience.

If you prefer a workflow in which code changes deploy to Live immediately upon merging to `main`, you can consider using GitHub Actions or another CI/CD tool to automate the creation of Git tags upon merges to `main`. That tactic is described within our documentation on [Deploying to Test and Live using Git tags](/nextjs/test-and-live-env).

### Switch to a plan that allows custom domains

Newly created sites on Pantheon start on an unpaid "Sandbox" tier which does not allow custom domains.
To connect a custom domain to your Live environment, contact a Pantheon employee through the channels of the Alpha program.

[Follow this GitHub issue for when these instructions will be updated](https://github.com/pantheon-systems/documentation/issues/9735).

### Pre-live checklist

Before switching your DNS records to point to the new Live environment consider doing any load or performance testing that you feel is necessary to confirm that the new infrastructure meets your needs.

For fully thorough testing, you may want to modify your local `hosts` file to point your custom domain to the IP address of the new Live environment [using these instructions](/guides/domains/hosts-file).

### Update your DNS records to point to the new Live environment

Once you are satisfied with the performance and functionality of your new Live environment, update your DNS records to point to the new Live environment using the same instructions as for WordPress and Drupal sites: [Connecting a Custom Domain to Pantheon](/guides/launch/configure-dns/).

