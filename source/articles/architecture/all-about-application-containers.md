---
title: All About Application Containers
description: Learn more about Pantheon's grid-model infrastructure.
categories:
  - getting-started
filename: source/_tools/all-about-application-containers.md
slug: sites

---

 
## Overview

Pantheon's infrastructure includes a number of layers. Our edge layer provides robust caching to help your site perform quickly under a traffic spike, but when it comes to generating unique pages and serving logged-in users, the real horsepower is in the Runtime Matrix, which is our way of provisioning and scaling application containers.

## Application Containers

Pantheon's infrastructure is based on a grid model. We serve our customers by provisioning isolated linux container with an optimized PHP stack in place. Each container includes its own Nginx, APC cache, and PHP worker agent. They are deployed with a checkout of your codebase and service-bindings to use a dedicated MySQL container, networked file filesystem, and optionally Redis object cache and Apache Solr search indexing.

Every environment for your site (Dev, Test, Live) runs on its own container. In the case of a Live site, at the Pro level and above you can have many containers serving your site.

## What's In an Application Container?

- All containers are created equally; free accounts are not underpowered.
- All environments contain a (PHP-FPM) and a modern version of PHP. For a comprehensive list of what's installed, see [phpinfo()](http://php.net/manual/en/function.phpinfo.php)
  - **Packages**: LDAP, SOAP, GD, Mcrypt, MySQL, Imagick (ImageMagick), PDO, mbstring, XML, IMAP
  - **Extensions**: APC, New Relic, OAuth, Redis
  - [short\_open\_tag](http://www.php.net/manual/en/ini.core.php#ini.short-open-tag) is off (Pantheon does not support <? ?> syntax; use <?php /> instead)
  - Maximum PHP execution time is 90 seconds
  - Maximum upload\_max\_filesize and post\_max\_size is 100MB
  - Each PHP process can either 256MB or 512MB of memory ( [depends on the plan](https://www.getpantheon.com/pricing))

- For a comprehensive list of MySQL settings [access your database](/documentation/advanced-topics/accessing-mysql-databases/) and issue the [SHOW VARIABLES;](http://dev.mysql.com/doc/refman/5.0/en/show-variables.html) query.
- Other than error reporting settings, the runtime configuration is the same across environments.
- We do not support custom PEAR or PECL modules at this time, but we can work with you to make common-sense libraries available globally.
- Your containers can access a whitelisted set of [binary tools](/documentation/howto/external-libraries-on-pantheon/-external-libraries-on-pantheon-) (e.g. wkhtmltopdf). Contact us if you have specific needs.

## Performance and Scalability

It is important to understand the distinction between _performance_ and _scalability_ when planning your project on Pantheon.

- **Performance**: the speed at which an individual request is handled.
- **Scalability**: the ability to handle many concurrent requests.

While these are related topics, they need to be evaluated separately for your project.

Typically, the best practice is to optimize for performance first, and then begin to look at handling scale. In most cases, if you are able to deliver an individual request quickly, handling more requests is primarily a matter of adding more containers up to the point where other bottlenecks (typically SQL queries) emerge. At that point, the next step really depends on your application.

Because Pantheon does not handicap or limit free sandbox or dev instances, you should be able to get a good sense of your sites live performance as you develop. Support is happy to answer questions about site performance if you feel it's not up to where it should be. We also provide tools like [New Relic](/documentation/howto/new-relic-performance-analysis-on-pantheon/) to give you insights about your site's performance.
