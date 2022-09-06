---
title: Errors and Server Responses
subtitle: Overloaded Workers
description: Learn how to resolve overloaded workers on Pantheon.
tags: [services]
categories: [platform]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/error-server-responses/overloaded-workers
anchorid: overloaded-workers
---

This section provides information on how to resolve overloaded workers on Pantheon.

## Overloaded Workers

If your PHP workers are overloaded, it's possible that pages will timeout before they are ever even picked up by the back-end. This can happen if you are suddenly hit with a flood of un-cachable/authenticated traffic.

```php
2014/05/15 08:57:21 [error] 31914#0: *13543 connect() to unix:/srv/bindings/0181b7c2caqe34534qw34533453e69cd027b13556df00/run/php-fpm.sock failed (11: Resource temporarily unavailable) while connecting to upstream, client: 127.0.0.1, server: , request: "GET /index.php?q=user HTTP/1.0", upstream: "fastcgi://unix:/srv/bindings/0181b7c2caqe34534qw34533453e69cd027b13556df00/run/php-fpm.sock:", host: "dev-example.gotpantheon.com"
2014/05/15 08:57:21 [alert] 31914#0: *13546 128 worker_connections are not enough while connecting to upstream, client: unix:ded-fo, server: , request: "GET /index.php?q=user HTTP/1.0", upstream: "http://127.0.0.1:452/index.php?q=user", host: "dev-example.gotpantheon.com"
```

### Fix Errors

If your site is throwing a lot of warnings or notices, there is a performance penalty — resources are used to log errors to disk, and these can slow down your site by performing database write operations. In this case the solution is not to disable logging but to fix the errors.

Even with logging disabled, these errors will still be written to the server PHP error logs, so they should be addressed as soon as possible.

### Optimize the Site

Long running processes like batch jobs, background tasks, and heavy operations cron jobs can also lead to backend resources being maxed out on your site. [Use New Relic&reg; Performance Monitoring](/guides/new-relic) to identify performance bottlenecks, fix errors, and make changes to enhance performance.


### Upgrade Your Plan

If the all the errors have been resolved and the views, batches and tasks have been optimized, the next step is to look into [upgrading your plan](https://www.pantheon.io/pricing) for more resources. The recommendation here is to select the most appropriate plan for the resource usage of your site.


### Unexpected Timeouts

There's no accounting for buggy code. We've seen bugs ranging from Drupal running cron on every page load, to the Drupal module `advanced_help` spidering the entire code tree looking for help files cause sufficiently slow page load times to trigger timeouts.

If you are seeing timeouts in unexpected places, debugging with New Relic&reg; Performance Monitoring or looking at your php slow logs can be informative.
