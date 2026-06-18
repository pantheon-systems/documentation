---
title: PHP Runtime Generation 2 rolling out to existing sites
published_date: "2025-09-24"
categories: [infrastructure]
---

[PHP Runtime Generation 2](/php-runtime-generation-2) includes updated extensions, PHP 8.4 availability, and enhanced security features. This new PHP runtime is currently rolling out to existing sites on the platform.

We continue to encourage customers to [upgrade to Generation 2 proactively](/php-runtime-generation-2#how-to-opt-in), or [manually opt-out](/php-runtime-generation-2#q-how-do-i-opt-out-of-php-runtime-generation-2) if you need more time.

## Rollout Timeline

The upgrade rollout will take place over the next 60<sup>1</sup> days. For granular timeline details<sup>2</sup>, see [related documentation](/php-runtime-generation-2/#timeline).

_**Editorial note:**_

_<sup>1</sup> This has been revised from 40 to 60 days_

_<sup>2</sup> Timeline has been relocated out of release notes into related documentation_ 

<Alert type="info" title="Deploying code will upgrade test/live environments">

Once the Dev environment for a site has been upgraded to Generation 2, deploying commits from Dev to Test will automatically upgrade the Test environment to Generation 2 as well. Following this pattern, an upgrade to the Live environment takes place once commits are deployed from the Test to Live environment.

</Alert>

## How to determine which PHP runtime your site environment is using

The PHP Runtime is set at the environment-level. You can find out which generation an environment is using via [Terminus](/terminus/install):

* **Terminus 4.0.2+:** Use the command `terminus env:info <site>.<env>`

<Alert type="info" title="Post-upgrade discrepancy">

During the automated rollout, an environment may appear as Generation 2 with the Terminus command above but the the upgrade process may not have completed yet. The upgrade process fully completes within 48 hours, or when code is committed/deployed to the environment.

</Alert>
