---
title: Command Line Tools to use with Next.js on Pantheon
description: Terminus plugins and other CLI tools to manage Next.js sites on Pantheon
reviewed: "2025-10-01"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/cli-tools

---

<Partial file="nextjs-pre-ga.md" />

In addition to Pantheon's primary command line tool, [Terminus](https://docs.pantheon.io/terminus), there are a few plugins and other command line tools that are useful when working with Next.js sites on Pantheon.

## Terminus Plugins

Terminus plugins add functionality to Terminus that is either too specialized or too early in development to be included in the core Terminus tool.

### Secrets Manager Plugin for setting environment variables

[The Secrets Manager plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin) for Terminus allows you to set and manage environment variables which is especially useful for Next.js sites. It has no equivalent functionality in the Pantheon Dashboard.

See here for [general documentation on using Secrets Manager](/guides/secrets) and here for [specific documentation on using it with Next.js](/nextjs/environment-variables).

### Node Logs Plugin

[This plugin](https://github.com/pantheon-systems/terminus-node-logs-plugin) adds commands to Terminus for viewing build and runtime logs for Node.js applications running on Pantheon.

Most developers will prefer to view logs through the Pantheon Dashboard, but this plugin is useful for scripting or automating log retrieval.

### Site Repository Plugin

[This plugin](https://github.com/pantheon-systems/terminus-repository-plugin) adds commands to Terminus for connecting external Git repositories (such as GitHub) to Pantheon sites.

It is required when creating a Next.js site on Pantheon through the command line.
It is not needed if you create the site through the Pantheon Dashboard.

## Content Publisher CLI

If the Next.js site you are deploying to Pantheon uses [Content Publisher](https://docs.content.pantheon.io/nextjs-tutorial), you may want to use the [Content Publisher CLI](https://docs.content.pantheon.io/cli-setup) to create a starter codebase or manage collections.
