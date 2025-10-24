---
title: Environment Variables Tutorial for Next.js
description: Set and read environment variables for Next.js on Pantheon
reviewed: "2025-10-01"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/environment-variables

---

<Partial file="nextjs-pre-ga.md" />

Many Next.js sites rely on environment variables to provide API keys, and other configuration values critical to the operation of the site.

For instance, a Next.js site that uses our [Content Publisher](https://docs.content.pantheon.io/nextjs-tutorial) Starter Kits would rely on two variables the Collection ID (Site ID) and Authentication token respectively.
In local development, these variables would be set in a `.env.local` file as

```
PCC_SITE_ID=12345
PCC_TOKEN=ABC-DEF
```

When the site is deployed to Pantheon, these environment variables need to be set in a way that the Next.js application can read in both the [build and runtime phases](/nextjs/architecture).

## Setting environment variables on Pantheon

Pantheon provides a way to set environment variables using [Secrets Manager](/guides/secrets) that can be read by applications running on Pantheon.

First, install the [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin) if you don't already have it:

```bash{promptUser: user}
terminus self:plugin:install terminus-secrets-manager-plugin
```

```bash{promptUser: user}
terminus secret:site:set <site-name>  PCC_SITE_ID 12345 --type=env --scope=web
```

For somes variables for some sites, you may need a different value for the Live environment than for all other environments.

## Environment-specific values

To set a different value for a given environment, specify the environment after the site name.

```bash{promptUser: user}
terminus secret:site:set <site-name>.live  MY_VARIABLE my-variable-value-for-live-environment --type=env --scope=web
```

## Reading environment variables in Next.js

Once set, these environment variables can be read in your Next.js application code using `process.env.VARIABLE_NAME`.

To learn more about using Secrets Manager to set environment variables, see [Managing Environment Variables with Secrets Manager](/guides/secrets).
