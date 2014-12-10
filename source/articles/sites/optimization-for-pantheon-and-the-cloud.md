---
title: Optimization for Pantheon and the Cloud
description: Learn how to optimize your site to efficiently function on Pantheon's cloud.  
category:
  - optimizing
framework:
  - Drupal
filename: source/_guides/optimization-for-pantheon-and-the-cloud.md
---

<iframe allowfullscreen="" frameborder="0" height="315" src="//www.youtube.com/embed/3IMk8oYoFsg" width="420"></iframe>  
 

Pantheon as a platform attempts to balance the tradeoff between high performance and high availability. It is important to reduce single points of failure and insure scalability, but this effort can introduce complexity and latency vs a “one box” architecture.  


A traditional single server has a high risk of being impacted by any unexpected event because it is a single point of failure. If a single service becomes unavailable due to a webserver problem, database failure, network degradation, or even because of high traffic, the entire site goes down.  


As distributed web architecture has evolved, best practices for high availability have emerged: application servers can be put behind load balancers, database servers can be replicated, backups can be hosted at remote locations. Cloud-based file systems, such as our Valhalla cluster, also reduce the impact of even the most severe outages. This evolution has other advantages: our cloud-based distributed architecture allows for smooth scaling in seconds via software, rather than through adding servers.  


However, there are tradeoffs to the cloud. On a single server, where the database is sharing an operating system with the webserver, there is no communication latency executing a MySQL query during a page load. In a distributed scenario, this same transaction may take one or two milliseconds to traverse servers. While this does not seem like a prohibitively long time, loading a single Drupal page may execute hundreds of mysql queries. The aggregate result will be that moving to the cloud can slow an inefficient site down.  


There are a number of solutions for optimizing your site for the cloud. A site should be built with a clear idea of what an acceptable performance profile is for anonymous and logged in users. Establishing this first can drive the site architecture and caching strategy. Here are other important steps:

1. **Varnish Caching:** Pantheon integrates a Varnish reverse-proxy caching layer, which is a standard tool for reducing the load on a Drupal site’s database and speeding anonymous responses. [Using Varnish](/documentation/advanced-topics/varnish-caching-for-high-performance/-working-with-varnish-on-pantheon) may mean reconfiguring how your site uses cookies, and making minor changes to cache configuration; no modules are required.
2. **Redis Caching:** By offsetting database requests [using redis](/documentation/howto/redis-as-a-caching-backend/-understanding-redis-cache) as the caching backend, you can greatly reduce the number of round trips required to build a page. If you’ve written custom queries, use Drupal’s cache\_set and cache\_get to store and retrieve caches.
3. **Code/Query Optimization:** This may require analysis and refactoring of unwieldy queries or code optimization. In these circumstances, tools such as New Relic (included with every site), [Devel](https://drupal.org/project/devel), and the site’s slow query log (in the /logs directory) are valuable in determining the root of degraded or inefficient performance.
4. **Front End Optimization:** After a response has been built by Drupal, it needs to be transferred and rendered in the client browser. Reducing unnecessary markup, aggregating and compressing JavaScript and CSS, using a CDN for static content can help improve browser rendering time. Tools like [YSlow](http://yslow.org/) and Google's [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights)will identify bottlenecks.
5. **Module Evaluation:** Lowering the number of enabled modules will reduce the overhead required by Drupal to perform any operation.

In short, a lightweight site is a happy site. By taking steps to optimize your site to take advantage of a cloud architecture, you’ll improve your users site experience and satisfaction.

For additional tips for success on our platform, check out our [required reading](/documentation/getting-started/required-reading-essential-pantheon-documentation/-required-reading-essential-pantheon-documentation) page.
