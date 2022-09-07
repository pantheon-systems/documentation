---
title: Errors and Server Responses
subtitle: Overloaded Workers
description: Learn how to resolve overloaded workers on Pantheon.
tags: [services]
categories: [platform]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/errors-and-server-responses/overloaded-workers
anchorid: overloaded-workers
---

This section provides information on how to resolve overloaded workers on Pantheon.

## Overloaded Workers

It's possible that pages will timeout before they are picked up by the back-end if your PHP workers are overloaded. This can happen if you are suddenly hit with a flood of un-cachable or authenticated traffic.

```php
2014/05/15 08:57:21 [error] 31914#0: *13543 connect() to unix:/srv/bindings/0181b7c2caqe34534qw34533453e69cd027b13556df00/run/php-fpm.sock failed (11: Resource temporarily unavailable) while connecting to upstream, client: 127.0.0.1, server: , request: "GET /index.php?q=user HTTP/1.0", upstream: "fastcgi://unix:/srv/bindings/0181b7c2caqe34534qw34533453e69cd027b13556df00/run/php-fpm.sock:", host: "dev-example.gotpantheon.com"
2014/05/15 08:57:21 [alert] 31914#0: *13546 128 worker_connections are not enough while connecting to upstream, client: unix:ded-fo, server: , request: "GET /index.php?q=user HTTP/1.0", upstream: "http://127.0.0.1:452/index.php?q=user", host: "dev-example.gotpantheon.com"
```

### Fix Errors

There is a performance penalty as your resources are used to log errors to your disk if your site is throwing a lot of warnings or notices. This can slow down your site by performing database write operations. The solution is not to disable logging but to fix the errors.

Even with logging disabled, these errors will still be written to the server PHP error logs, which means you should be resolve the errors as soon as possible.

### Optimize the Site

Long running processes can also lead to backend resources being maxed out on your site, including:

- Batch jobs
- Background tasks
- Heavy operations cron jobs

[Use New Relic&reg; Performance Monitoring](/guides/new-relic) to identify performance bottlenecks, fix errors, and make changes to enhance performance.

### Upgrade Your Plan

Consider [upgrading your plan](https://www.pantheon.io/pricing) for more resources after the all the errors have been resolved and the views, batches, and tasks have been optimized. Select the most appropriate plan for the resource usage of your site.

### Unexpected Timeouts

There's no accounting for buggy code. Bugs ranging from Drupal running cron on every page load, to the Drupal module `advanced_help` spidering the entire code tree looking for help files can cause sufficiently slow page load times to trigger timeouts.

Debugging with New Relic&reg; Performance Monitoring or looking at your php slow logs can be informative if you are seeing timeouts in unexpected places.

## More Resources

- [PHP Slow Log and FPM Error Log](/guides/php/php-slow-log)

- [Timeouts on Pantheon](/timeouts)

- [PHP Errors and Exceptions](/guides/php/php-errors)

- [Cron for Drupal](/drupal-cron)

- [Cron for WordPress](/wordpress-cron)