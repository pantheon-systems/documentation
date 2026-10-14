---
title: "Next-generation Advanced Global CDN: Phase 2 migrations begin October 15"
published_date: "2026-10-14"
published_at: "2026-10-14T17:24:57Z"
categories: [new-feature, infrastructure, action-required]
description: "Starting October 15, 2026, AGCDN customers who use rate limiting or geolocation, and whose current configuration is fully supported in Phase 2, are eligible to migrate. Pantheon will contact eligible customers directly."
---

Pantheon is continuing the phased migration of Advanced Global CDN (AGCDN) to our next-generation edge platform. Starting October 15, 2026, AGCDN customers who use rate limiting or geolocation, and whose current configuration is fully supported in Phase 2, are eligible to migrate. Pantheon will contact eligible customers directly.

## What's included

Phase 2 adds two features that you configure yourself in a `pantheon-edge.yml` file at the root of your site's code repository. Each site environment uses its own settings, and changes go live when you push and deploy your code. Changes no longer require a request to Pantheon.

- **[Rate limiting](/guides/nextgen-gcdn/advanced-edge/rate-limiting):** Limit how many requests a single client, identified by IP address or JA4 fingerprint, can make to a site environment, using one of four pre-defined tiers.
- **[Geolocation](/guides/nextgen-gcdn/advanced-edge/geolocation):** Send the visitor's approximate location, such as country, region, and city, to your site in a single `Pantheon-Geo` request header.

## Before you migrate

- If your site reads AGCDN geolocation headers, update your code to read the `Pantheon-Geo` header. The header name, format, and available fields are different from AGCDN.
- Rate limiting uses pre-defined tiers. Custom request thresholds and time windows, including 1-second windows, aren't available.
- At launch, `pantheon-edge.yml` is supported for sites that push code to their Pantheon Git repository. Support for sites that use GitHub, GitLab, or Bitbucket integration, and for Next.js sites, is coming later.

## How migration works

This migration is not self-serve. Pantheon's Professional Services team will:

1. Review your current Legacy AGCDN configuration and confirm feature support with current capabilities on NextGen.
1. Migrate your supported rules and configuration.
1. Make the migrated configuration available for you to review.
1. Coordinate the DNS cutover with you during an agreed change window.
1. Validate the configuration after cutover.

## Action required

If you are eligible for Phase 2, you will receive an email. Respond to the ticket to confirm your technical contact so we can schedule your migration.

AGCDN customers who are not contacted for Phase 1 or Phase 2 don't need to do anything at this time, and will be contacted at a later date.

Learn how to configure rate limiting and geolocation in the [Advanced Edge documentation](/guides/nextgen-gcdn/advanced-edge). Learn more about our switch to Next-generation GCDN with bot protection in [this related blog post](https://pantheon.io/blog/democratizing-pantheon-global-cdn).
