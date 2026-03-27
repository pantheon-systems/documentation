---
title: How to set environment variables for Next.js
description: Use Pantheon's Secrets Manager to set environment variables for all environments or specific environments of a Next.js site.
reviewed: "2025-12-10"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/environment-variables

---

<Partial file="nextjs-pre-ga.md" />

Many Next.js sites rely on environment variables to provide API keys, and other configuration values critical to the operation of the site.

For instance, a Next.js site that connects reads data out of a content management system might rely on a secret on an environment variable to set the URL where the CMS lives.
In local development, that variable would likely be set in a `.env.local` file as

```
NEXT_PUBLIC_CMS_BASE_URL=http://example.com
```

When the site is deployed to Pantheon, these environment variables need to be set in a way that the Next.js application can read in both the [build and runtime phases](/nextjs/architecture).

## Setting site-wide environment variables on Pantheon

Pantheon provides a way to set environment variables using [Secrets Manager](/guides/secrets) that can be read by applications running on Pantheon.

First, install the [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin) if you don't already have it:

```bash{promptUser: user}
terminus self:plugin:install terminus-secrets-manager-plugin
```

```bash{promptUser: user}
terminus secret:site:set <site_name> NEXT_PUBLIC_CMS_BASE_URL "http://example.com" --type=env --scope=web
```

For somes variables for some sites, you may need a different value for the Live environment than for all other environments.

## Setting Environment-specific overrides

To set a different value for a given environment, specify the environment after the site name.

```bash{promptUser: user}
terminus secret:site:set <site_name>.live  MY_VARIABLE my-variable-value-for-live-environment --type=env --scope=web
```

## Reading environment variables in Next.js

Once set, these environment variables can be read in your Next.js application code using `process.env.VARIABLE_NAME`.

To learn more about using Secrets Manager to set environment variables, see [Managing Environment Variables with Secrets Manager](/guides/secrets).
