---
title: APCU Cache Basics
description: Understand APC User Cache and its uses within the Pantheon WebOps workflow.
categories: [platform]
tags: [cache, workflow]
reviewed: "2020-10-08"
---

The **APC User Cache** is a user-accessible PHP cache. PHP is a dynamic language that is compiled on-demand into bytecode at execution time. To improve performance, APCU stores this bytecode so that it can be reused instead of having to be recompiled each time.

Pantheon provides APCU by default across all plans, but the size of the APCU memory cache ([apc.shm_size](https://www.php.net/manual/en/apcu.configuration.php#ini.apcu.shm-size")) varies depending on the service level. See the [Application Containers overview](/application-containers) to learn more about APCU on Pantheon's container architecture.

## Frequently Asked Questions

#### Can APCU be used as a cache backend on Pantheon?

Yes, APCU can be used as a cache backend or a "key-value store"; however, this is not recommended. APCU lacks the ability to span multiple server environments. Instead, Pantheon provides [Redis](/redis) as a caching backend for Drupal and WordPress, which has better performance.

#### What happens if the APCU memory cache is too small?

If the size of the scripts loaded exceed the size of the APCU cache, the cache will be flushed and rebuilt, resulting in slow execution time. Symptoms of this will include the following message in dev environments and in watchdog logs:

```php
Warning: require_once(): Unable to allocate memory for pool.
```

In these circumstances, either increasing the SHM size by [upgrading your account](https://www.pantheon.io/plans/pricing "Pantheon Pricing"), or reducing the amount of scripts read by PHP by disabling unneeded modules typically resolves the issue. To learn more about how much memory your site is using, visit the site's [New Relic dashboard](/new-relic).

#### How can I determine what my current APCU settings are?

Search for `shm_size` in phpinfo.

See [Securely Working with phpinfo](/phpinfo).

## Can the shm_size be configured manually?

No, as this is not a runtime configuration, the `shm_size` cannot be changed. If a greater `shm_size` is needed, then the two options available are to optimize the codebase to operate within the service level, or to [upgrade the site account](https://www.pantheon.io/plans/pricing "Pantheon Pricing") for a larger `shm_size` allocation.

## Does "Clear Caches" Affect ACPU

No. The **Clear Caches** button in the Site Dashboard does not interact with APCU. Use [`apcu_clear_cache`](https://www.php.net/manual/en/function.apcu-clear-cache.php) to clear the APCU cache.

## See Also

- [Application Containers overview](/application-containers)
- [Clearing the cache](/clear-caches)
- [Redis](/redis)
- [Securely Working with phpinfo](/phpinfo)
