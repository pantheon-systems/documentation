---
title: APCu Cache Basics
description: Understand APCu and its uses within the Pantheon WebOps workflow.
tags: [cache, workflow]
reviewed: "2020-10-08"
contenttype: [doc]
innav: [true]
categories: [cache]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
---

**APCu** is a user-accessible PHP cache. Pantheon provides APCu by default across all plans, but the size of the APCu memory cache ([apc.shm_size](https://www.php.net/manual/en/apcu.configuration.php#ini.apcu.shm-size)) varies depending on the service level. See the [Application Containers overview](/application-containers) to learn more about APCu on Pantheon's container architecture.

## Frequently Asked Questions

### Can APCu be used as a cache backend on Pantheon?

Yes, APCu can be used as a cache backend or a "key-value store"; however, this is not recommended. APCu lacks the ability to span multiple application containers. Instead, Pantheon provides a Redis-based [Object Cache](/object-cache) as a caching backend for Drupal and WordPress, which has coherence across multiple [application containers](/application-containers).

### How can I determine what my current APCu settings are?


The `shm_size` is determined by the site plan. Sandbox sites and Basic site plans have a `shm_size` of 128 MB. Performance site plans and higher have a `shm_size` of 256 MB. These values can be seen in [phpinfo](/guides/secure-development/phpinfo).

## Does "Clear Caches" Affect ACPu

No. The **Clear Caches** button in the Site Dashboard does not interact with APCu. The function [`apcu_clear_cache`](https://www.php.net/manual/en/function.apcu-clear-cache.php) will clear the APCu cache for a single application container.

## More Resources

- [Application Containers overview](/application-containers)
- [Clearing the cache](/clear-caches)
- [Object Cache Overview](/object-cache)
- [Securely Working with phpinfo](/guides/secure-development/phpinfo)
