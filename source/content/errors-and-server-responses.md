---
title: Errors and Server Responses
description: Detailed information on your Pantheon site's server responses and error messages.
tags: [services]
categories: [platform]
---
Error messages in the cloud are served when Pantheon is unable to fulfill a request. Given the low-level nature of these errors, these messages cannot be customized for a particular site. Changes are system-wide, not site specific.

There are some extreme circumstances where these error messages can be inadvertently triggered by your site code without an actual server error. Monitor plugins or modules that integrate external applications closely, such as [services](https://www.drupal.org/project/services) for Drupal.

If you feel that you reached one of these messages in error, [contact support](/support) and provide the full URL and circumstances which led to the error.

## Error Messages

### Pantheon 401 Unauthorized

This is the default response of an HTTP Basic Auth failure after a site administrator has [locked the site's environment](/security). This is usually not a platform failure, as environment access can be set from the Dashboard Security tab.

In some circumstances, a 401 can be triggered inadvertently if a site environment is locked, and a user passes the HTTP auth but the site sends a 401 HTTP status code. The workaround is to disable HTTP auth security for the environment in question.

### Pantheon 403 Forbidden
"Access denied to uploaded PHP files." This message is shown when a PHP file is attempted to be accessed in Valhalla, Pantheon's network file system.

Pantheon also prevents public access via the webserver to private files, .htaccess, and directory listings.

### Pantheon 404 Unknown Site
"The hostname ... is unknown. Please double-check that this is the right URL. If so, make sure it matches your Dashboard's custom domain settings." This typically is shown when there is an internal routing problem or a site environment does not exist.

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
"Header overflow" The new Pantheon Global Edge size limit for cookies (as sent in the request `"Cookie: .."` header) is 10K. If more than that is sent, all cookies will be dropped and the request will continue to be processed as if no cookies had been sent at all. The header `"X-Cookies-Dropped: 1"` will be added to the request and response indicating that these have been truncated. You can either ignore this scenario in your PHP code or handle it (perhaps by displaying a custom error page).

This response can also occur on Drupal 8 sites using the cacheability debug service, which can generate HTTP headers (e.g. `X-Drupal-Cache-Tags` and `X-Drupal-Cache-Contexts`) that exceed size limits. For details, see [Environment-Specific Configurations for Drupal 8](/environment-specific-config-d8/#troubleshoot-503-response-header-overflow).

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

This error can be caused by sustained spikes in traffic (often caused by search engine crawlers) and by having PHP processes that run too slowly or have long waiting times for external resources which occupy the application container for long periods. If you have too much traffic for your site's resources, consider [upgrading your site plan](/site-plan).

### Pantheon 504 Gateway Timeout
"The application did not respond in time." There are two possibilities. Pantheon's routing and caching layer can only sustain open HTTP requests for so long. We do our best, but you may encounter this message if your application takes awhile to respond. The other option is that there was an application problem, resulting in php-fpm or MySQL timing out. See [Timeouts on Pantheon](/timeouts) for more information.

Typically the request timeout is much shorter than the hard timeout for PHP. While you may be able to let an operation run for several minutes in your local development environment, this isn't possible on Pantheon. Luckily there are ways to solve the problem.

There are many things that could cause your site to exceed the request timeout limit. The first step to fixing any problem is to identify the root cause.

### Error 561 No site detected
"No site detected. Make sure your code is pulled into this environment." This typically occurs when a site has been created, but no CMS has been installed. You will also see this instead of a 403 "Directory listing denied" error, if you have no index file.

## Retries Across Application Server Containers (High Availability)

Higher plan levels on Pantheon deploy multiple containers for the live environment. Rather than just supporting scale, Pantheon also uses the extra containers for high-availability. Here are the different cases when Pantheon's edge may retry a request against a different application container.

### Failed Connections

Pantheon's edge starts by randomly distributing requests to application containers. However, to allow sites to fully use every bit of container capacity, nginx uses a short request queue (about 128) so that containers refuse to queue more requests once they've already filled up. Such a refused connection causes the Pantheon edge to reattempt the request against up to all other healthy containers and up to a few unhealthy containers (where an unhealthy container is any container with a failed connection or 5xx code in the last 10 minutes).

### Any HTTP 502 or 560 Response to Requests with Idempotent HTTP Methods

When Pantheon updates application container software or configuration, the resulting reloads and restarts can briefly cause the first requests to return HTTP 502 responses. When the HTTP method of the request is idempotent (is safe to re-attempt, which on Pantheon includes all methods except POST, PUT, DELETE, and PATCH), we retry the request against up to a few healthy application containers.

Additionally, customer code may determine that a resource necessary to process a request is unavailable. By sending an HTTP 560 response, the application can trigger the same reattempts under the same conditions as an HTTP 502 response.

## Administrative Pages in Drupal
It is unfortunately possible for some normal administrative operations to outlast the request timeout in Drupal. Submitting the modules page, manually running cron, running update.php, or flushing caches can be extremely slow operations on Drupal powered sites with large numbers of modules and/or a lot of data and activity.

If you are seeing request timeouts for administrative operations, you may be able to address this by optimizing your application or by using a work-around (see below).

## Slow Queries / High Query Volume
Pages that leverage a large number of views can often bog down because of the slow speed of the queries. It can also happen that a sufficiently high query volume (1,000+ queries on one page) can push things over the edge.

Individually slow queries should be refactored if possible. However, often caching can help mitigate slow queries or high query volumes quickly. There will still be slow page loads when the cache needs to be populated, but subsequent page-loads should be speedier.

## External Web Service Calls

It is not uncommon for API or web-service integration extensions (plugins or modules) to make calls out to third-party APIs or services. Given the synchronous nature of PHP, these will halt the execution of your application until a response is received. Obviously, a slow response from the external service could lead to a [timeout](/timeouts) on Pantheon.

Even the most reliable web services will occasionally experience slowness, and it is also inevitable that there are network disruptions which could slow down external calls. That's why extensions (plugins or modules) and custom code should set a relatively low timeout threshold for the external call itself. If the external web service doesn't respond in a few seconds, it should fail gracefully and move on.

### Examples: Set a timeout on an external request

- Set a 10 second timeout on a generic PHP curl request:

   ```php
   curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
   curl_setopt($ch, CURLOPT_TIMEOUT, 10);
   ```

- Set a 10 second timeout on an external request made with Drupal 7's `drupal_http_request` function:

   ```php
   $options = array('timeout' => 10);
   drupal_http_request($url, $options);
   ```

- Drupal 8's `httpClient` class utilizes the Guzzle library and comes with a 30 second timeout by default. Override that to set a lower value:

   - Globally:

     ```php
     $settings['http_client_config']['timeout'] = 10;
     ```

   - For an individual request:

     ```php
     $client = \Drupal::httpClient(['base_url' => 'https://example.com/api']);
     $client->request('GET', $url, ['timeout' => 10]);
     ```

- WordPress: Add timeouts using the [http_request_args](https://developer.wordpress.org/reference/hooks/http_request_args/) filter, or the [http_api_curl](https://developer.wordpress.org/reference/hooks/http_api_curl/) action. This code would go in a custom plugin or your theme's `functions.php` file:

   ```php
   add_filter( 'http_request_args', 'pantheon_http_request_args', 100, 1 );
   function pantheon_http_request_args( $r )
   {
       $r['timeout'] = 10;
       return $r;
   }
​
   add_action( 'http_api_curl', 'pantheon_http_api_curl', 100, 1 );
   function pantheon_http_api_curl( $handle )
   {
       curl_setopt( $handle, CURLOPT_CONNECTTIMEOUT, 10 );
       curl_setopt( $handle, CURLOPT_TIMEOUT, 10 );
   }
   ```

If you encounter frequent problems with external web services, evaluate the code making the call, and the service provider itself.

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

Long running processes like batch jobs, background tasks, and heavy operations cron jobs can also lead to backend resources being maxed out on your site. [Use New Relic&reg; Performance Monitoring](/new-relic) to identify performance bottlenecks, fix errors, and make changes to enhance performance.


### Upgrade Your Plan

If the all the errors have been resolved and the views, batches and tasks have been optimized, the next step is to look into [upgrading your plan](https://www.pantheon.io/pricing) for more resources. The recommendation here is to select the most appropriate plan for the resource usage of your site.


### Unexpected Timeouts

There's no accounting for buggy code. We've seen bugs ranging from Drupal running cron on every page load, to the Drupal module `advanced_help` spidering the entire code tree looking for help files cause sufficiently slow page load times to trigger timeouts.

If you are seeing timeouts in unexpected places, debugging with New Relic&reg; Performance Monitoring or looking at your php slow logs can be informative.

## Admin Work-Arounds

In the best of all possible worlds, there are no slow queries, all external calls are fast, and the application is a finely-tuned highly-optimized cheetah of the web. In reality, sometimes we just need to get around a pesky timeout in order to get the job done.

[Terminus](/terminus) is a great workaround for many administrative bottlenecks. There are no time limits because it runs via the PHP command-line. Enabling/disabling modules or plugins, running update.php for Drupal, clearing caches, are all actions supported by Terminus for both WordPress and Drupal.

## Handle More Traffic

See [Debugging Performance Bottlenecks](/debug-slow-performance) for details on how to streamline your site to handle additional traffic.
