---
title: Command Line Tools to use with Next.js on Pantheon
description: Terminus commands and other CLI tools to manage Next.js sites on Pantheon
reviewed: "2026-06-22"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/cli-tools

---

In addition to Pantheon's primary command line tool, [Terminus](/terminus), there are built-in Terminus commands and other CLI tools that are useful when working with Next.js sites on Pantheon.

## Terminus Commands

As of [Terminus 4.2.0](/release-notes/2026/04/terminus-4-2-0), commands for managing Next.js sites — including secrets, repository connections, and build logs — are built directly into Terminus core. No additional plugins are required.

### Create a Next.js site

You can create a Next.js site from the [Pantheon Dashboard](/nextjs/hello-world-tutorial) or via Terminus. To create a site via Terminus:

```bash{promptUser: user}
terminus site:create <pantheon-site-name> <site-label> <upstream-name|ID> --org=<organization-name|ID> --vcs-provider=github --vcs-org=<github-organization|username> --repository-name=<github-repository-name>
```

Required arguments and flags:

- `<upstream-name|ID>` — Any upstream your Pantheon user has access to, e.g. `nextjs16` or an upstream UUID. If omitted, Terminus will display available upstreams.
- `--org` — The Pantheon organization is required for site creation via Terminus.
- `--vcs-provider=github` — Required for sites using the GitHub application.
- `--vcs-org` — The GitHub organization or username. If omitted, you will be prompted.
- `--repository-name` — The GitHub repository name to create. Must be unique within the organization or user account.

For full details see the [GitHub Application setup guide](/guides/github-application/setup).

### Manage secrets and environment variables

Terminus includes commands for setting and managing secrets, which is the recommended way to manage environment variables for Next.js sites on Pantheon.

See [general documentation on using Secrets Manager](/guides/secrets) and [specific documentation on using it with Next.js](/nextjs/environment-variables).

### View build and runtime logs

Terminus includes commands for viewing build and runtime logs for Next.js sites on Pantheon. Most developers will prefer to view logs through the Pantheon Dashboard, but these commands are useful for scripting or automating log retrieval.

To list recent builds for a given site and environment:

```bash{promptUser: user}
terminus node:logs:build:list <site>.<env>
```

To retrieve runtime logs:

```bash{promptUser: user}
terminus node:logs:runtime:get <site>.<env>
```

For a full list of available Node.js commands, run `terminus help` or see the [Terminus command reference](/terminus/commands).

## Content Publisher CLI

If the Next.js site you are deploying to Pantheon uses [Content Publisher](https://docs.content.pantheon.io/nextjs-tutorial), you may want to use the [Content Publisher CLI](https://docs.content.pantheon.io/cli-setup) to create a starter codebase or manage collections.
