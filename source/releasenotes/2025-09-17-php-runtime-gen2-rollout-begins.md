---
title: PHP Runtime Generation 2 rolling out to existing sites
published_date: "2025-09-17"
categories: [infrastructure]
---

[PHP Runtime Generation 2](/php-runtime-generation-2) includes updated extensions, PHP 8.4 availability, and enhanced security features. This new PHP runtime is currently rolling out to existing sites on the platform.

We continue to encourage customers to [upgrade to Generation 2 proactively](/php-runtime-generation-2#how-to-opt-in), or [manually opt-out](/php-runtime-generation-2#q-how-do-i-opt-out-of-the-upcoming-platform-rollout) if you need more time.

## Rollout Timeline

The upgrade rollout will take place over the next 40 days.

| Estimated Date for Upgrades to Begin | Site Plans | Environments |
|-----------|------------------|--------------|
| September 17 | Sandbox | Dev/Multidevs |
| October 1 | Sandbox | Test/Live |
| October 1 | Basic | Dev/Multidevs |
| October 15 | Basic | Test/Live |
| October 15 | Performance/Elite | Dev/Multidevs |
| October 22 | Performance/Elite | Test/Live |

<Alert type="info" title="Deploying code will upgrade test/live environments">

Once the Dev environment for a site has been upgraded to Generation 2, deploying commits from Dev to Test will automatically upgrade the Test environment to Generation 2 as well. Following this pattern, an upgrade to the Live environment takes place once commits are deployed from the Test to Live environment.

</Alert>

## How to determine which PHP runtime your site environment is using

The PHP Runtime is set at the environment-level. You can find out which generation an environment is using via Terminus or the Pantheon Dashboard.

* **Terminus:** Use the command `terminus env:info <site>.<env>`
* **Dashboard:** Navigate to the Site then look for "Software Versions" on the environment's Status page