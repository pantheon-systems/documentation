---
title: Errors and Server Responses
subtitle: 5xx Level Errors
description: Get explanations for 500-level error messages.
tags: [services]
categories: [platform]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/errors-and-server-responses/5xx-errors
anchorid: 5xx-errors
---

This section provides information on how to resolve 4xx errors.

### 502 Upstream Header Too Big
"Upstream sent too big header while reading response header from upstream."
This error will occur when the payload or size of the request being sent is greater than the `fastcgi_buffer_size`. Removing additional images reduces the size of the payload being sent to the buffer for nginx to process, and will allow you to post the request. If this happens again, check to see if you are making heavy requests with a number of assets or data being passed.

### 502 Timeout/Segfault Error
This issue can happen with HTTP Basic Auth and Drupal’s AJAX, as it doesn't always send the authentication if it is performing an AJAX request.

We recommend disabling Basic Auth to see if it works, and then re-enabling it. However, if it is possible to ensure those headers are always passed for JS files, that is the best solution.

### Pantheon 502 Bad Gateway
"There was an error connecting to the PHP backend." If the php-fpm process hangs or cannot start, nginx (the web server) will report this problem.

### Pantheon 502 Routing failure
"Page Could Not Be Loaded. The request could not be completed due to a networking failure. Contact support if this issue persists." This means an internal networking issue has occurred with Styx, Pantheon's routing mesh.

### 503 First Byte Timeout
"Page Could Not Be Loaded. We're very sorry, but the page could not be loaded properly. This should be fixed very soon, and we apologize for any inconvenience." This error message will be accompanied by a page title of "503 First Byte Timeout". This means that the request has exceeded the platform web request timeout of 60 seconds (see our [timeouts documentation](/timeouts) for more information). See our [documentation on debugging](/debug-slow-performance) for some helpful insights on how to handle these cases.

### 503 Header Overflow
"Header overflow." The new Pantheon Global Edge size limit for cookies, sent in the request `"Cookie: .."` header, is 10KB. If more than 10KB are sent, all cookies are dropped and the request is processed as if no cookies were sent. The header `"X-Cookies-Dropped: 1"` is added to truncated requests and responses. You can ignore this scenario in your PHP code or handle it by displaying a custom error page.

This response can also occur on Drupal 8 sites using the cacheability debug service, which can generate HTTP headers (e.g. `X-Drupal-Cache-Tags` and `X-Drupal-Cache-Contexts`) that exceed size limits. For more information, refer to [Environment-Specific Configurations for Drupal 9](/guides/environment-configuration/environment-specific-config-d9/#troubleshoot-503-response-header-overflow).

Try reducing the number of set-cookie headers in the response, if you receive a 503 error and your cookie size is smaller than 10KB.

### Pantheon 503 Target in Maintenance
"The web site you were looking for is currently undergoing maintenance." This is  **not**  a web application (WordPress or Drupal) maintenance mode; this is a manually toggled emergency message reserved for unusual circumstances when a site is known to be not available.

### Pantheon 503 Database not responding
"The web page you were looking for could not be delivered." The MySQL database is not responding, possibly from being suspended and not resuming.

### Error 503 Service Unavailable
This error generally occurs when a request timeouts. If end user pages take longer than this threshold, there is a performance issue with the site. Learn more about [Timeouts on Pantheon](/timeouts).

If you get a generic Service Unavailable and you're using AJAX when HTTP Basic Auth is enabled (the security username/password), then that's a misleading message. The best workaround is to disable the security option for the environment for testing.

### Pantheon 504 Target Not Responding
"The web page you were looking for could not be delivered." 

A common cause for this error is an [idle container](/application-containers#idle-containers) that has spun down due to inactivity. Wake the environment by loading the home page in your browser or using the [`terminus env:wake` command](/terminus/commands/env-wake).

"No php workers are available to handle the request."

 These errors occur when PHP processing resources for your site are exhausted. Each application container has a fixed limit of requests it can concurrently process. When this limit is reached, nginx will queue up to 100 requests in the hope that PHP workers will free up to serve these requests. 
 
 Once the nginx queue fills up, the application container cannot accept any more requests. We could increase the nginx queue above 100, but it would only mask the problem. It would be like a retail store with a grand opening line longer than it can serve in the business hours of a single day. At some point, it's better to turn away further people and serve those already in line. For more information, jump to [Overloaded Workers](#overloaded-workers).

This error can be caused by sustained spikes in traffic (often caused by search engine crawlers) and by having PHP processes that run too slowly or have long waiting times for external resources which occupy the application container for long periods. If you have too much traffic for your site's resources, consider [upgrading your site plan](/guides/legacy-dashboard/site-plan).

### Pantheon 504 Gateway Timeout
"The application did not respond in time." There are two possibilities. Pantheon's routing and caching layer can only sustain open HTTP requests for so long. We do our best, but you may encounter this message if your application takes awhile to respond. The other option is that there was an application problem, resulting in php-fpm or MySQL timing out. See [Timeouts on Pantheon](/timeouts) for more information.

Typically the request timeout is much shorter than the hard timeout for PHP. While you may be able to let an operation run for several minutes in your local development environment, this isn't possible on Pantheon. Luckily there are ways to solve the problem.

There are many things that could cause your site to exceed the request timeout limit. The first step to fixing any problem is to identify the root cause.

### Error 561 No site detected
"No site detected. Make sure your code is pulled into this environment." This typically occurs when a site has been created, but no CMS has been installed. You will also see this instead of a 403 "Directory listing denied" error, if you have no index file.

