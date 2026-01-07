---
title: "Final PHP Runtime Generation 2 rollout for previously excluded Solr 3 sites"
published_date: "2026-01-07"
categories: [infrastructure]
---

The final set of sites previously excluded from the [PHP Runtime Generation 2](/php-runtime-generation-2) rollout are now being migrated. These sites were excluded because they were using Solr 3 with Drupal 9+. With [Solr 3 support for Drupal 9+ ending](/release-notes/2025/08/solr-3-drupal-94-eol) in December 2025, these sites are no longer excluded from the Generation 2 rollout.

## Rollout Timeline

| Start Date | Environments |
|------------|--------------|
| January 7, 2026 | Dev/Multidev |
| January 14, 2026 | Test/Live |

<Alert type="info" title="Deploying code will upgrade test/live environments">

Once the Dev environment for a site has been upgraded to Generation 2, deploying commits from Dev to Test will automatically upgrade the Test environment to Generation 2 as well. Following this pattern, an upgrade to the Live environment takes place once commits are deployed from the Test to Live environment.

</Alert>

## Opting Out

Sites may continue to [opt out of PHP Runtime Generation 2](/php-runtime-generation-2#q-how-do-i-opt-out-of-php-runtime-generation-2) until the [Gen 1 removal](/release-notes/2025/12/php-runtime-generation-1-removal-date) takes place starting April 6, 2026.
