---
title: What is APC and what is it used for?
categories:
  - getting-started
permalink: documentation/advanced-topics/what-is-apc-and-what-is-it-used-for/
Metadata
filename: source/_docs/what-is-apc-and-what-is-it-used-for.md
---

APC stands for the [Alternative PHP Cache](http://php.net/manual/en/book.apc.php "Alternative PHP Cache manual on php.net"). PHP is a high-level language that is compiled on-demand into bytecode at execution time. To improve performance, APC optimizes compiled PHP and stores the result in shared memory (SHM).

Pantheon provides APC by default across all plans, but the size of the APC memory cache ( [apc.shm\_size](http://www.php.net/manual/en/apc.configuration.php#ini.apc.shm-size "apc.shm\_size reference")) varies depending on the service level.

## Can APC be used as a cache backend on Pantheon?

While APC can be used as an explicit cache backend for Drupal using the [APC module](http://drupal.org/project/apc "APC project page on drupal.org"), it's not recommended as a Drupal cache backend due to its inability to span multiple server environments and less than optimal performance. Instead, Pantheon provides  [Redis as a caching backend](/documentation/howto/redis-as-a-caching-backend/ "Redis as a caching backend
"), which has better performance.

## What happens if the APC memory cache is too small?

If the size of the scripts loaded exceed the size of the APC cache, the cache will be flushed and rebuilt, resulting in slow execution time. Symptoms of this will include the following message in dev environments and in watchdog logs:

    Warning: require_once(): Unable to allocate memory for pool.

In these circumstances, either increasing the SHM size by [upgrading your account](https://www.getpantheon.com/pricing "Pantheon Pricing"), or reducing the amount of scripts read by PHP by disabling unneeded modules typically resolves the issue. If you want to learn more about how much memory your site is using, enable [New Relic](/documentation/howto/new-relic-performance-analysis-on-pantheon/-enabling-new-relic "Enabling New Relic") to log and visualize performance.

## How can I determine what my current APC settings are?

The PHP function [phpinfo()](http://php.net/manual/en/function.phpinfo.php "phpinfo() manual on php.net") will display the current environment's configuration, including APC settings. A word of caution; there are a number of environmental variables that are also disclosed using this technique, so only do this in a temporary file on a secured development server. Create a file named "delete\_me\_security\_hole.php" in your web root with the following contents:

    <?php php_info();

Navigate to http://dev.<yoursite>.gotpantheon.com/delete_me_security_hole.php and search for <tt>shm_size</tt>.</yoursite>

## Can the shm\_size be configured manually?

No; as this is not a runtime configuration, the <tt>shm_size</tt> cannot be changed. If a greater <tt>shm_size</tt> is needed, then the two options available are to optimize the codebase to operate within the service level, or to [upgrade the site account](https://www.getpantheon.com/pricing "Pantheon Pricing") for a larger <tt>shm_size</tt> allocation.

## Troubleshooting

### I got a fatal error about redeclaring a class in Drupal core; what should I do?

In some rare cases, there is a [known issue with APC](http://drupal.org/node/838744 "Opcode (APC) and drupal autoloader") where it attempts to load a file that has already been cached. For example:

    Fatal error: Cannot redeclare class InsertQuery_mysql in ... on line 87

If this happens often, a workaround would be to place the following at the top of the file in question:

    if (!class_exists('NAMEOFCLASSBEINGREDECLARED')) {

then closing the condition with the corresponding

    }

at the bottom.

### Clearing the APC opcode cache

Sometimes, due to (very rare) corruption, the APC opcode cache will need to be cleared.

#### Manual

To do this manually, write a tiny script named <tt>apc_cache_clear.php</tt> in your root directory with the following contents:

    <?php
    apc_clear_cache();

Then browse to http://dev.<NAMEOFSITE><yoursite>.gotpantheon.com/apc_cache_clear.php to clear the opcode cache.</yoursite>

#### Dashboard

Clearing the cache via the dashboard will also clear the APC cache along with Drupal, Varnish and Redis.

### APC related errors are happening on Dev, but not in Test or Live. Why?

APC shared memory is separate and distinct for each environment. A corruption in one environment will not affect the other. However, if the environments are running the same code, they can potentially experience the same problem.

### The site has been online a while, what would trigger the error now?

When the cache is cleared from the dashboard, the APC cache is also flushed. As a result, the Drupal page load will repopulate the cache, which may in turn exceed the available shared memory. This circumstance is rare, but is possible.


