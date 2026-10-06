---
title: "Public API v1 (Beta)"
published_date: "2026-10-06"
published_at: "2026-10-06T13:48:34Z"
categories: [new-feature]
description: "Pantheon is opening the Beta of the Public API v1, a stable, Auth0-secured REST API for automating platform operations across your fleet."
---
Pantheon is opening the Beta of the Public API v1, a stable, Auth0-secured REST API for automating platform operations across your fleet.

The Public API v1 gives partners, DevOps teams, and agencies a documented, contract-stable way to run Pantheon operations programmatically. It extends the earlier alpha with expiring tokens and an OpenAPI 3.x schema that Pantheon commits to through GA.

## What's included
* Auth0-secured authentication with expiration, replacing full-grant session tokens.
* Full operational surface: site, environment, backup, domain, and workflow operations.
* Initial capabilities: Upstream, Secrets Manager, access to Next.js build and runtime logs, and more.
* Published as an OpenAPI 3.x schema, so you can generate first-class clients directly.
* v1 contract stability, committed through GA.

## Who it's for
Technology partners embedding Pantheon in their own products, enterprise DevOps teams standardizing across many sites, agencies building client dashboards, and regulated-industry customers who require expiring tokens.

## How to get started
The API is served at `api.pantheon.io` under `/v1`. Interactive docs are at `/v1/docs` and the OpenAPI spec at `/v1/openapi.json`. Authenticate with your own Auth0-issued token.

For more details, see [related documentation](/guides/public-api).

## Alpha (v0) users
The v0 API keeps running for about 60 days after today's Beta release of v1, then shuts down. The `/v1` endpoints reject [legacy machine tokens](/personal-access-tokens#legacy-machine-tokens), so move to [personal access tokens](/personal-access-tokens).

## Availability
All Pantheon customers. For feedback, please sign up for the [Pantheon Community Slack here](https://pantheon.io/customer-community/) if you don't already have an account and join us in the `#beta-public-api` channel.

