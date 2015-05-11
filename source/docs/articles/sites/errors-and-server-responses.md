---
title: Errors and Server Responses
description: Understand server responses and error messages.
category:
  - debugging
---
## Pantheon Error Messages

Sometimes there are problems in the cloud and one of Pantheon's services is unable to fulfill a request. In those rare and unfortunate circumstances, Pantheon will serve an error message instead of expected site content.  

Given the low-level nature of these errors, these messages cannot be customized for a particular site. Changes are system-wide, not site specific.  

There are some extreme circumstances where these error messages can be inadvertently triggered by your site code without an actual server error. Be aware if you are implementing a Drupal site using a module such as `services`.  

If you feel that you reached one of these messages in error, please submit a support ticket through your Dashboard describing the full URL and circumstances which led to the error.

### Pantheon 401 Unauthorized
![](/source/docs/assets/images/desk_images/184676.png)  
"This site is locked. Please contact the administrator for access." This is the default response of an HTTP Basic Auth failure after a site administrator has enabled security for an environment with a username and password. This is usually not a platform failure, as users can set environment access from their dashboard security.  

In some circumstances, a 401 can be triggered inadvertently if a site environment is locked, a user passes the HTTP auth but the site sends a 401 HTTP status code. The workaround is to disable HTTP auth security for the environment in question.

### Pantheon 403 Forbidden
![](/source/docs/assets/images/desk_images/184677.png)  

"Access denied to uploaded PHP files." This message is shown when a PHP file is attempted to be accessed in Valhalla, Pantheon's network file system.  

Pantheon also prevents public access via the webserver to private files, .htaccess, and directory listings.

### Pantheon - 404 Unknown Site
![](/source/docs/assets/images/desk_images/184679.png)  
"The hostname ... is unknown. Please double-check that this is the right url. If so, make sure it matches your dashboard's custom domain settings." This typically is shown when there is an internal routing problem or a site environment does not exist.

### Pantheon - 502 Bad Gateway
![](/source/docs/assets/images/desk_images/184849.png)<br />
"There was an error connecting to the PHP backend." If the php-fpm process hangs or cannot start, Nginx, the web server will report this problem.

### Pantheon - 502 Routing failure
![](/source/docs/assets/images/desk_images/184850.png)<br />

"Page Could Not Be Loaded. The request could not be completed due to a networking failure. Contact support if this issue persists." An internal networking issue has occurred with Styx, Pantheon's routing mesh.

### Pantheon - 503 Target in maintenance
![](/source/docs/assets/images/desk_images/184852.png)<br />

"The web site you were looking for is currently undergoing maintenance." This is  **not**  a web application (WordPress or Drupal) maintenance mode; this is a manually toggled emergency message reserved for unusual circumstances when a site is known to be not available.

### Pantheon - 503 Target not responding
![](/source/docs/assets/images/desk_images/184854.png)<br />

"The web page you were looking for could not be delivered." No Application Containers are available to complete the request. These errors occur when PHP rendering resources for your site are full. Each Application Container has a fixed limit of requests it can concurrently process. When this limit gets hit, nginx will queue up to 100 requests in the hope that PHP resources will free up to service those requests. Once nginx's queue fills up, the Application Container cannot accept any more requests.

We could increase the nginx queue above 100, but it would only mask the problem for longer. It would be like a retail store with a grand opening line longer than it can serve in the business hours of a single day. At some point, it's better to turn away further people and serve those already in line.

This can be caused by sustained spikes in traffic (often caused by search engine crawlers) and by having PHP processes that run too slowly or have long waiting times for external resources which occupy the Application Container for long periods. If you have too much traffic for your site's resources, consider [upgrading your site plan](/docs/articles/sites/settings/selecting-a-plan/).

### Pantheon - 503 Database not responding
![](/source/docs/assets/images/desk_images/184855.png)<br />

"The web page you were looking for could not be delivered." The MySQL database is not responding, possible from being suspended and not resuming.

### Error 503 - Service Unavailable
![](/source/docs/assets/images/desk_images/231974.png)<br />

This error generally occurs when a request is going through our Rackspace Cloud load balancer, which imposes a timed limit on requests. If end-user pages take longer than this threshold, there is a performance issue with the site. More information about [Timeouts on Pantheon](/docs/articles/sites/timeouts/) is available in our helpdesk.

If you get a generic Service Unavailable that is not styled like the above and you're using AJAX when HTTP basic auth (the security username/password), then that's a misleading message; the best workaround is to disable the security option for the environment for testing.

### Pantheon - 504 Gateway Timeout
![](/source/docs/assets/images/desk_images/185064.png)<br />
"Your request has timed out while waiting for PHP to execute." There's two possibilities. Pantheon's routing and caching layer can only sustain open HTTP requests for so long. We do our best, but you may encounter this message if your application takes awhile to respond. The other is that there was a server problem, typically php-fpm or MySQL timing out. More information about [Timeouts on Pantheon](/docs/articles/sites /timeouts/) is available in our helpdesk.

Typically the request timeout is much shorter than the hard timeout for PHP. While you may be able to let an operation run for several minutes in your local Development environment, this isn't possible on Pantheon. Luckily there are ways to solve the problem.

There are many things which could cause your site to exceed the request timeout limit. The first step to fixing any problem is to identify the root cause.

## Administrative Pages in Drupal

It is unfortunately possible for some normal administrative operations to outlast the request timeout in Drupal. Submitting the modules page, manually running cron, running update.php, or flushing caches can be extremely slow operations on Drupal powered sites with large numbers of modules and/or a lot of data and activity.

If you are seeing request timeouts for administrative operations, you may be able to address this by optimizing your application, or by using a work-around (see below).

## Slow Queries / High Query Volume

Pages which leverage a large number of views can often bog down because of the slow speed of the queries. It can also happen that a sufficiently high query volume (1,000+ queries on one page) can push things over the edge.

Individually slow queries should be refactored if possible. However, often cacheing can help mitigate slow queries or high query volumes quickly. There will still be slow page loads when the cache needs to be populated, but subsequent page-loads should be speedier.

## External Web Service Calls

It is not uncommon for API or web-service integration extensions (plugins or modules) to make calls out to third party APIs or services. Given the synchronous nature of PHP, these will halt the execution of your application until a response is received. Obviously, a slow response from the external service could lead to a timeout on Pantheon.

Even the most reliable web services will occasionally experience slowness, and it is also inevitable that there are network disruptions which could slow down external calls. That's why extensions (plugins or modules) and custom code should set a relatively low timeout threshold for the external call itself. If the external web service doesn't respond in a few seconds, it should fail gracefully and move on.

If you are seeing frequent problems with external web services, it's a good idea to evaluate the code making the call, if not the service provider themselves.

## Overloaded Workers

If your PHP workers are overloaded, it's possible that pages will timeout before they are ever even picked up by the back-end. This can happen if you are suddenly hit with a flood of un-cachable/authenticated traffic.

<script src="https://gist.github.com/timani/412437aa8c1e5e6b5abe.js"></script>
### Fix Errors

If your site is throwing a lot of warning and notices, there is a performance penalty are resources are used to log errors to disk and slow down your site by performing additional database write operations. In this case the solution is not to disable watchdog bug fix the errors.

Even with the watchdog off these errors will still be written to the PHP error logs so they should be addressed as soon as possible.

### Optimize the Site

Long running processes like batch jobs, background tasks and heavy operations cron jobs can also lead to backend resources being maxed out on your site. [Use New Relic](/docs/articles/sites/newrelic/new-relic-performance-analysis#End-UserOverview) to identify performance bottlenecks, fix errors and make changes to enhance performance.


### Upgrade Your Plan

If the all the errors have been resolved and the views, batches and tasks have been optimized, the next step is to look into [upgrading your plan](https://www.getpantheon.com/pricing) for more resources. The recommendation here is to select the most appropriate plan for the resource usage of your site.

### Unexpected Timeouts

There's no accounting for buggy code. We've seen bugs ranging from Drupal running cron on every page-load, to the Drupal module `advanced_help` spidering the entire code tree looking for help files cause sufficiently slow page load times to trigger timeouts.

If you are seeing timeouts in unexpected places, debugging with New Relic or looking at your php slow logs can be informative.

## Admin Work-Arounds

In the best of all possible worlds, there are no slow queries, all external calls are fast, and the application is a finely-tuned highly-optimized cheetah of the web. In reality, sometimes we just need to get around a pesky timeout in order to get the job done.

[Terminus](https://github.com/pantheon-systems/cli) is a great workaround for many administrative bottlenecks. There are no time limits because it runs via the PHP command-line. Enabling/disabling modules or plugins, running update.php for Drupal, clearing caches, are all actions supported by Terminus for both WordPress and Drupal.

## Handle More Traffic

See our article on [debugging performance bottlenecks](/docs/articles/sites/code/debugging-slow-performance) for details on how to streamline your site to handle additional traffic.
