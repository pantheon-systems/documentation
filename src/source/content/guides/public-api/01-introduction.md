---
title: Pantheon Public API
subtitle: Introduction
description: Learn about managing your Pantheon sites programmatically with the Pantheon Public API.
reviewed: "2026-09-29"
contenttype: [doc]
innav: [true]
permalink: docs/guides/public-api
---

The Pantheon Public API is a REST API for managing your Pantheon account, sites, and environments. Use it to build your own scripts, automation, and integrations: look up your sites, create and manage environments, deploy code, run backups, and more.

## Who it's for

Any Pantheon user can use the Public API. It's built for developers and teams who want to automate Pantheon tasks from their own tools, such as CI/CD pipelines, internal dashboards, or custom scripts.

## How it works

All API requests are made over HTTPS to the following base URL:

```none
https://api.pantheon.io/v1
```

Every request is authenticated with a [Personal Access Token](/personal-access-tokens), sent in the `Authorization` header. The API acts as you: it can only see and do what your Pantheon account can already see and do. If your account can't perform an action, such as creating a multidev on a particular site, the API can't either.

<Partial file="public-api-pat-only.md" />

Many actions, such as creating an environment or deploying code, start a _workflow_ that runs in the background. The API returns the workflow's ID right away, and you poll the workflow to find out when it completes. See [Start and monitor workflows](/guides/public-api/workflows) for details.

## API reference

The complete, interactive API reference is available at [api.pantheon.io/docs](https://api.pantheon.io/docs). The OpenAPI specification is available at [api.pantheon.io/v1/openapi.json](https://api.pantheon.io/v1/openapi.json) for use with API clients and code generators.

## In this guide

1. [Authenticate with the Public API](/guides/public-api/authentication): create a Personal Access Token and make your first request.
1. [Get site information](/guides/public-api/sites): look up a site by its UUID or name.
1. [Start and monitor workflows](/guides/public-api/workflows): create a multidev environment and poll for completion.
