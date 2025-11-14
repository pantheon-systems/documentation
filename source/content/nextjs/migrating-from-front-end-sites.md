---
title: How to migrate from Front-End Sites
description: Move your existing Next.js site from Pantheon's Front-End Sites to updated Next.js infrastructure.
reviewed: "2025-10-31"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/migrating-from-front-end-sites

---

<Partial file="nextjs-pre-ga.md" />

This guide walks through moving a Next.js site away from Pantheon's earlier [Front-End Sites offering](/guides/decoupled).

## Requirements

* Access granted for the [Next.js Private Beta Program](/nextjs/#access--availability)
* Administrative access to the GitHub repo used for your Next.js site.
* Install the following CLI applications:
  - [Terminus](/terminus/install)
  - [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin)
  - [Terminus Repository Plugin](https://github.com/pantheon-systems/terminus-repository-plugin)
  - [Terminus Node Logs Plugin](https://github.com/pantheon-systems/terminus-node-logs-plugin) (optional)


## Differences between Front-End Sites and new Next.js sites

In the years since Front-End Sites was architected, frameworks like Next.js has moved in the direction of "dynamic by default" as seen with the addition of [Cache Components](https://nextjs.org/docs/app/getting-started/cache-components) in [Next.js 16](https://nextjs.org/blog/next-16#cache-components). The infrastucture well suited to this direction (horizontally scalable containers with shared caches) is different from the static-first architecture made for leading JAMStack leaders like Gatsby.

Pantheon pioneered containerized PHP and runs Next.js in a similar architecture. Read more about [ our Next.js architecture here](/nextjs/architecture).

Additional differences between Front-End Sites and our updated Next.js offering include:

* Next.js sites can now be created and managed on the command line via Terminus.
* [Pantheon's Secrets Manager](/guides/secrets/) should be used instead of Front-End Sites' environment variable interface.
  * Secrets Manager should also be used to hold connection credentials to any given WordPress or Drupal site on Pantheon.
* Next.js sites have three environments (Dev, Test, and Live) unlike Front-End Sites.
  * Multidev environments are still created for every pull request opened and for branches starting with `multi-`.
* Sites are routed through Pantheon's Global CDN and get URLs structured as `https://<env>-<site>.pantheonsite.io` instead of routing through a different CDN that used `https://<env>-<site>.appa.pantheon.site/` as the pattern of domain names.
* Our new support for Next.js _does not_ supply "webhooks" for triggering full rebuilds and deployments when content changes in a connected CMS. Next.js running in a container can re-fetch content when needed.

Front-End Sites and our new support for Next.js both use distinct GitHub Applications as the mechanism for trigger builds and deployments.
Configuring that new connection to our GitHub Application is the first step of migrating.

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

For each variable set in your Front-End Sites environment variables field, set as secret using Pantheon's Secrets Manager.


```bash{promptUser: user}
terminus secret:site:set <site-name> NEXT_PUBLIC_CMS_BASE_URL "http://example.com" --type=env --scope=web
```

[See here for more information on using Secrets Manager to set environment variables for Next.js sites](/nextjs/environment-variables).

### Confirm your site is working as expected

Once your environment variables are set, trigger a new build by pushing a code change to the `main` branch or opening a pull request. Once another build process has completed without error, confirm that your site is working as expected in the Dev environment.

(Optional) You can follow the build process along by either refreshing the Build tab in the Site Dashboard or via Terminus:

```bash{promptUser: user}
terminus node:logs:build:list <site>.<env>
```


## Going Live

### Consider your workflow for deploying code changes to Test and Live environments

One of the key differences between Front-End Sites and the new Next.js support on Pantheon is the automatic inclusion of Test and Live environments.

Front-End Sites was designed to have a Live environment a non-live environments (per pull request or specially named "Multidev" environments) only.

Like our infrastructure for PHP-based sites, the new Next.js support on Pantheon includes Dev, Test, and Live environments by default.
Your `main` branch will deploy to Dev and deployments to [Test and Live will be triggered by Git tags](/nextjs/test-and-live-env).
Depending on your perspective this change could be a beneficial safeguard or an inconvenience.

If you prefer a workflow in which code changes deploy to Live immediately upon merging to `main`, you can consider using GitHub Actions or another CI/CD tool to automate the creation of Git tags upon merges to `main`. That tactic is described within our documentation on [Deploying to Test and Live using Git tags](/nextjs/test-and-live-env).

### Connect your custom domain to the new Live environment

To connect a custom domain name to your Live environment, follow the instructions in [Connecting a Custom Domain Name](/nextjs/connecting-custom-domain-name).
