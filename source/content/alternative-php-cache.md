---
title: What is APC and what is it used for?
description: Understand Alternative PHP Cache and its uses within the Pantheon WebOps workflow.
categories: [platform]
tags: [cache, workflow]
reviewed: "2020-05-05"
---
APC stands for the [Alternative PHP Cache](https://secure.php.net/manual/en/book.apc.php "Alternative PHP Cache manual on php.net"). PHP is a dynamic language that is compiled on-demand into bytecode at execution time. To improve performance, APC stores this bytecode so that it can be reused instead of having to be recompiled each time.

Pantheon provides APC by default across all plans, but the size of the APC memory cache ([apc.shm\_size](https://secure.php.net/manual/en/apc.configuration.php#ini.apc.shm-size "apc.shm\_size reference")) varies depending on the service level. See the [Application Containers overview](/application-containers) to learn more about APC on Pantheon's container architecture.

## Frequently Asked Questions

#### Can APC be used as a cache backend on Pantheon?

Yes, APC can be used as a cache backend or a "key-value store"; however, this is not recommended. APC lacks the ability to span multiple server environments. Instead, Pantheon provides [Redis](/redis) as a caching backend for Drupal and WordPress, which has better performance.

#### What happens if the APC memory cache is too small?

If the size of the scripts loaded exceed the size of the APC cache, the cache will be flushed and rebuilt, resulting in slow execution time. Symptoms of this will include the following message in dev environments and in watchdog logs:

```php
Warning: require_once(): Unable to allocate memory for pool.
```

In these circumstances, either increasing the SHM size by [upgrading your account](https://www.pantheon.io/plans/pricing "Pantheon Pricing"), or reducing the amount of scripts read by PHP by disabling unneeded modules typically resolves the issue. To learn more about how much memory your site is using, visit the site's [New Relic dashboard](/new-relic).

#### How can I determine what my current APC settings are?

Search for `shm_size` in phpinfo.

See [Securely Working with phpinfo](/phpinfo).

## Can the shm_size be configured manually?

No, as this is not a runtime configuration, the <tt>shm_size</tt> cannot be changed. If a greater <tt>shm_size</tt> is needed, then the two options available are to optimize the codebase to operate within the service level, or to [upgrade the site account](https://www.pantheon.io/plans/pricing "Pantheon Pricing") for a larger <tt>shm_size</tt> allocation.

## Troubleshooting

### I got a fatal error about redeclaring a class in Drupal core; what should I do?

In some rare cases, there is a [known issue with APC](https://www.drupal.org/node/838744 "Opcode (APC) and drupal autoloader") where it attempts to load a file that has already been cached. For example:

```php
Fatal error: Cannot redeclare class InsertQuery_mysql in ... on line 87
```

If this happens often, a workaround would be to place the following at the top of the file in question:

```php
if (!class_exists('NAMEOFCLASSBEINGREDECLARED')) {
```

then closing the condition with the corresponding bracket at the bottom:

```php
}
```

### How do I clear the APC opcode cache?

Sometimes, due to (very rare) corruption, the APC opcode cache will need to be cleared.

#### Manual

To do this manually, write a small script named <tt>apc_cache_clear.php</tt> in your root directory with the following contents:

```php
<?php
apc_clear_cache();
```

Then browse to `https://dev.YOURSITE.pantheon.io/apc_cache_clear.php` to clear the opcode cache.

#### Dashboard

[Clearing the cache](/clear-caches) via the Dashboard will also clear the APC cache along with the Global CDN cache.

### APC related errors are happening on Dev, but not in Test or Live. Why?

APC shared memory is separate and distinct for each environment. A corruption in one environment will not affect the other. However, if the environments are running the same code, they can potentially experience the same problem.

### The site has been online a while, what would trigger the error now?

When the cache is cleared from the Dashboard, the APC cache is also flushed. As a result, the Drupal page load will repopulate the cache, which may in turn exceed the available shared memory. This circumstance is rare, but is possible.

## See Also

- [Application Containers overview](/application-containers)
- [Clearing the cache](/clear-caches)
- [Redis](/redis)
- [Securely Working with phpinfo](/phpinfo)
