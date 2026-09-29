---
title: "Next-generation Advanced Global CDN: Phase 1 migrations begin September 30"
published_date: "2026-09-30"
published_at: "2026-09-30T00:00:00Z"
categories: [new-feature, infrastructure, action-required]
description: "Starting September 30, 2026, AGCDN customers whose current configuration is fully supported in Phase 1 are eligible to migrate. Pantheon will contact eligible customers directly."
---

Pantheon is beginning the phased migration of Advanced Global CDN (AGCDN) to our next-generation edge platform. Starting September 30, 2026, AGCDN customers whose current configuration is fully supported in Phase 1 are eligible to migrate. Pantheon will contact eligible customers directly.

## What's included

Once your migration is complete, [you control your edge settings yourself in the Pantheon Dashboard](/guides/nextgen-gcdn/advanced-edge-blocking). Changes no longer require a request to Pantheon. Phase 1 controls are configured at the workspace level, apply to every site and environment in the workspace, and are enforced at the edge before requests reach your site.

- IP and CIDR blocking
- Geo blocking
- ASN blocking
- Enterprise WAF
- Image Optimization

## How migration works

This migration is not self-serve. Pantheon's Professional Service will:

1. Review your current Legacy AGCDN configuration and confirm feature support with current capabilities on NextGen. 
1. Migrate your supported rules and configuration.
1. Make the migrated configuration available for you to review.
1. Coordinate the DNS cutover with you during an agreed change window.
1. Validate the configuration after cutover.

## Action required

If you are eligible for Phase 1, you will receive an email. Respond to the ticket to confirm your technical contact so we can schedule your migration.

AGCDN customers who are not contacted for Phase 1 don't need to do anything at this time, and will be contacted at a later date. 

Learn more about our switch to Next-generation GCDN with bot protection in [this related blog post](https://pantheon.io/blog/democratizing-pantheon-global-cdn).