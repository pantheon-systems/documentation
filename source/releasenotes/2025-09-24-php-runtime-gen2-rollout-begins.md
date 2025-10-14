---
title: PHP Runtime Generation 2 rolling out to existing sites
published_date: "2025-09-24"
categories: [infrastructure]
---

[PHP Runtime Generation 2](/php-runtime-generation-2) includes updated extensions, PHP 8.4 availability, and enhanced security features. This new PHP runtime is currently rolling out to existing sites on the platform.

We continue to encourage customers to [upgrade to Generation 2 proactively](/php-runtime-generation-2#how-to-opt-in), or [manually opt-out](/php-runtime-generation-2#q-how-do-i-opt-out-of-the-upcoming-platform-rollout) if you need more time.

## Rollout Timeline

The upgrade rollout will take place over the next 60<sup>1</sup> days. The table below shows which upgrades are being processed. We will update this release note as we begin each phase.

| Start Date for Upgrades | Site Plans | Environments |
|-----------|------------------|--------------|
| September 24 | Sandbox | Dev/Multidevs |
| October 14<sup>2</sup> | Sandbox | Test/Live |
| October 16<sup>3</sup> | Basic | Dev/Multidevs |

_**Editorial note:**_

_<sup>1</sup> This has been revised from 40 to 60 days_

_<sup>2</sup> This date has been revised from October 6 to October 14_

_<sup>3</sup> Timeline has been updated to include rollout to Basic site plans._ 

<Alert type="info" title="Deploying code will upgrade test/live environments">

Once the Dev environment for a site has been upgraded to Generation 2, deploying commits from Dev to Test will automatically upgrade the Test environment to Generation 2 as well. Following this pattern, an upgrade to the Live environment takes place once commits are deployed from the Test to Live environment.

</Alert>

## How to determine which PHP runtime your site environment is using

The PHP Runtime is set at the environment-level. You can find out which generation an environment is using via [Terminus](/terminus/install):

* **Terminus 4.0.2+:** Use the command `terminus env:info <site>.<env>`

<Alert type="info" title="Post-upgrade discrepancy">

During the automated rollout, an environment may appear as Generation 2 with the Terminus command above but the the upgrade process may not have completed yet. The upgrade process fully completes within 48 hours, or when code is committed/deployed to the environment.

</Alert>
