---
title: All About Application Containers
description: Information on Pantheon's container-based, grid-model infrastructure.
tags: [infrastructure]
categories: []
---
Pantheon's infrastructure includes a number of layers. Our edge layer provides robust caching to help your site perform quickly under a traffic spike, but when it comes to generating unique pages and serving logged-in users, the real horsepower is in the [Runtime Matrix](https://pantheon.io/features/elastic-hosting), a distributed grid of over a million Linux containers running PHP and NGINX that allow us to provision and scale application containers for your site.

## Application Containers

Pantheon's infrastructure is based on a grid model. We serve our customers by provisioning isolated linux containers with an optimized PHP stack in place. Each container includes its own Nginx, APC cache, and PHP worker agent. They are deployed with a checkout of your codebase and service-bindings to use a dedicated MySQL container, networked file filesystem, and optionally Redis object cache and Apache Solr search indexing. See our [interactive diagram](https://pantheon.io/features/elastic-hosting) to learn more about Pantheon's infrastructure.

Every environment for your site (Dev, Test, Live) runs on its own container. In the case of a Live site, at the Performance Medium level and above you can have [multiple containers](#multiple-application-containers) serving your site.

### Idle Containers
Pantheon containers spin down (sleep) after ~1 hour of idle time. Live environments on a paid plan will spin down after 12 hours of idle time. Upon receiving a web request, the environments are spun up, usually within 30 seconds.

Attempts to remotely access services, such as MySQL or SFTP connections, will fail on idle containers. Wake the environment and resolve connection errors by loading the home page in your browser or with the following [Terminus](/docs/terminus) command:

```bash
terminus env:wake <site>.<env>
```

## What's In an Application Container?

- All containers are created equally; free accounts are not underpowered.
- All environments contain a highly tuned PHP-FPM worker and a modern version of PHP. For a comprehensive list of what's installed, see [Securely Working with phpinfo](/docs/phpinfo).
  - Packages:
    - LDAP
    - SOAP
    - GD
    - Mcrypt (when running PHP versions under 7.2) or Sodium (when running PHP version 7.3 and later)
    - MySQL
    - Imagick (ImageMagick)
    - PDO
    - mbstring
    - XML
    - IMAP
  - Extensions: APC, New Relic PHP agent, OAuth, Redis
  - [short\_open\_tag](https://secure.php.net/manual/en/ini.core.php#ini.short-open-tag) is off (Pantheon does not support `<? ?>` syntax; use `<?php ?>` instead)
  - Maximum PHP execution time and other timeouts can be configured as noted in [Timeouts on Pantheon](/docs/timeouts/).
  - Maximum upload\_max\_filesize and post\_max\_size is 100MB. This cannot be changed.
  - Maximum max\_file\_uploads is 20. This cannot be changed.
  - WordPress migrations via `wp-cli` may require [changing the WP_MAX_MEMORY_LIMIT constant](https://codex.wordpress.org/Editing_wp-config.php#Increasing_memory_allocated_to_PHP).
  - Each PHP process can have either 256MB or 512MB of memory ([depends on the plan](https://www.pantheon.io/pricing)).
- For a comprehensive list of MySQL settings, [access your database](/docs/mysql-access/) and issue the [SHOW VARIABLES;](https://dev.mysql.com/doc/refman/5.7/en/show-variables.html) query.
- Other than error reporting settings, the runtime configuration is the same across environments.
- We do not support custom PEAR or PECL modules at this time, but we can work with you to make common sense libraries available globally.
- Your containers can access a whitelisted set of [binary tools](/docs/external-libraries) (e.g. wkhtmltopdf). Contact us if you have specific needs.

## Performance and Scalability

It is important to understand the distinction between _performance_ and _scalability_ when planning your project on Pantheon.

- **Performance**: The speed at which an individual request is handled.
- **Scalability**: The ability to handle many concurrent requests.

While these are related topics, they need to be evaluated separately for your project.

Typically, the best practice is to optimize for performance first and then begin to look at handling scale. In most cases, if you are able to deliver an individual request quickly, handling more requests is primarily a matter of adding more containers up to the point where other bottlenecks (typically SQL queries) emerge. At that point, the next step really depends on your application.

Because Pantheon does not restrict or limit Sandbox sites or dev instances, you should be able to get a good sense of your sites live performance as you develop. We also provide [New Relic APM Pro](/docs/new-relic) to give you insights about your site's performance.

## Multiple Application Containers
Live environments on sites with a service level of Performance Medium and above can have multiple application containers serving the site for [smooth scaling](https://pantheon.io/features/smooth-scaling). If a site has multiple application containers, the load will be distributed among them.

### Expected Behavior
Requests can be served from any of the available containers on Live. As a result, you may notice different log files for each container; this is expected. For instructions on downloading logs from multiple application containers, see [Automate Downloading Logs from the Live Environment](/docs/logs#automate-downloading-logs).

### Failover Application Containers
All paid service levels have failover application containers which are **not** used for load balancing. If the primary container is not healthy, traffic will be switched to the failover.
