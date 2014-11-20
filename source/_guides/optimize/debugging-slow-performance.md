---
title: Debugging slow performance
parent_guide:
  - getting-started
permalink: documentation/advanced-topics/debugging-slow-performance/
Metadata
filename: source/_guides/optimize/debugging-slow-performance.md
---


## Overview

When your site is fast, everybody wins. When it’s slow, nobody's happy... so how can you fix it? In this article, we’ll discuss the most common causes for performance problems, demonstrate how to diagnose bottlenecks, and provide actionable solutions for developers.

## Every PHP error slows execution

An often ignored cause of bad performance is [PHP errors within site code](/documentation/getting-started/php-errors-and-exceptions/), as every single PHP error will slow your site down, including both notices and warnings that don’t crash your site.  


Here's a graphic example of how PHP errors can slow down a site. This benchmark was performed with [Generate Errors](https://drupal.org/project/generate_errors), with a TRUNCATE of watchdog before each test to avoid tainting results from the aggregate.  


​ ![](https://pantheon-systems.desk.com/customer/portal/attachments/200873)  
Each loop executed user\_load(1, TRUE), then triggered the error. Times are rounded to 2 decimals.

<colgroup>
		<col width="120">
		<col width="120">
		<col width="120">
		<col width="120">
		<col width="120">
		<col width="120">
		<col width="120">
	</colgroup><thead>
		<tr>
			<th> </th>
			<th>1 time</th>
			<th>25 times</th>
			<th>50 times</th>
			<th>100 times</th>
			<th>1,000 times</th>
			<th>10,000 times</th>
		</tr>
	</thead><tbody>
		<tr>
			<td><strong>none</strong></td>
			<td>0.00s</td>
			<td>0.08s</td>
			<td>0.17s</td>
			<td>0.30s</td>
			<td>3.04s</td>
			<td>32.81s</td>
		</tr>
		<tr>
			<td><strong>E_NOTICE</strong></td>
			<td>0.01s</td>
			<td>0.16s</td>
			<td>0.34s</td>
			<td>0.71s</td>
			<td>7.10s</td>
			<td>79.52s</td>
		</tr>
		<tr>
			<td><strong>E_WARNING</strong></td>
			<td>0.01s</td>
			<td>0.16s</td>
			<td>0.33s</td>
			<td>0.70s</td>
			<td>7.67s</td>
			<td>134.68s</td>
		</tr>
	</tbody>
 

Turning off error reporting suppresses the symptom, not the problem, and PHP execution will still be slow if there are errors.  


PHP errors are not always obvious at first glance, so don’t ignore watchdog entries or error messages in your development environment. Do what it takes to fix them, including the notices.  


Compounding the issue, writing those errors to watchdog takes time and is a blocking operation - other queries can’t happen until the write is done. The bigger the table, the longer the write will take, so if you have a lot of errors, well, you get the picture.  


Don’t shoot the messenger - disabling db\_log will not fix bad code, and ignoring the problem is not going to make it go away.  


As a graphic example, if your slowest database operation is an INSERT to watchdog, then you really should address the problem and fix the PHP errors that are causing the writes. Notice that watchdog INSERTS is taking literally 70.6% of the execution time.  


 ![](https://pantheon-systems.desk.com/customer/portal/attachments/200891)  


Learn more about [debugging sites with log files](/documentation/advanced-topics/debugging-sites-with-log-files/).

## Too many database queries

The next performance killer is an excessive number of database queries per request. You can see that in your [New Relic dashboard](/documentation/howto/new-relic-performance-analysis-on-pantheon/) by going to the Map tab, which will show you how the various low-level components in your application are performing together.  


 ![](https://pantheon-systems.desk.com/customer/portal/attachments/200890)Looking at an example, the average number of queries per request is shown in the lower-left, which in this case is 110 queries - a bit high in my opinion. In the upper-right, the average query duration is shown. That’s actually very respectable.  


Therefore, with an average of 110 queries taking 1.19 seconds means on average, each request will spend .132 seconds in the database. A second example with the same query duration, but with 239 queries per request, that’s .28 seconds in the database. A final example with 421 queries per request averaging 2.66 milliseconds equals **1.1** seconds per request in the database. Monstrously slow.  


The moral? Query count matters, so keep it low through caching and avoiding queries in loops.

## Not caching

Non-optimized caching also is a huge problem. If you’re not caching anonymous pages, well, anonymous performance will be bad - especially as our Varnish caching respects your headers - which won’t be set if anonymous page caching is turned off.  


If your cache lifetime is set to something that doesn’t make sense for your traffic, like if only get one hit per hour yet only have a 5 minute cache? That’s not enough to help.  


See our [guidelines on Drupal's performance settings](/documentation/running-drupal/drupal-s-performance-and-caching-settings/) for more details.  


Other caching systems that aren’t on by default that should be enabled include [block caching](/documentation/running-drupal/drupal-s-performance-and-caching-settings/), [Views](https://drupal.org/project/views) result and query caching, and [Panels](https://drupal.org/project/panels) caching.

## Using the database to cache

By default, Drupal uses the database as a caching backend. This is an example of a fairly high traffic site, and as you can see, database cache hits are the vast majority of the slow queries.  


 ![](https://pantheon-systems.desk.com/customer/portal/attachments/200898)  


Also note the impact of watchdog INSERTs - this is why you should fix your PHP errors.  


One of the services Pantheon offers is [redis as a caching backend](/documentation/howto/redis-as-a-caching-backend/), which a key-value store and is optimized for this type of work. For a real-world use-case, see [why we recommend redis as a Drupal caching backend](https://www.getpantheon.com/blog/why-we-recommend-redis-caching-backend).​

## Not enough traffic

The next problem is when a site doesn’t have enough traffic, which may seem paradoxical.  


Cache misses are by nature slow - whatever needs to be cached is performed and the cache is populated, which is slower than just returning the value from cache.  


There are a large number of caches involved in every single request, including:

- [Varnish](/documentation/advanced-topics/varnish-caching-for-high-performance/) - spread out across multiple servers, and the cache is not shared between servers.
- [APC](/documentation/advanced-topics/what-is-apc-and-what-is-it-used-for/) - PHP has it’s own opcode cache, which is not shared between application servers.
- [Drupal](https://drupal.org/node/326504) and [redis](/documentation/howto/redis-as-a-caching-backend/) - Shared between your servers, but caches do have expirations, and if it’s old and stale, it’ll need to be regenerated.
​​Therefore, more traffic means more cache hits and faster performance, given the number of components involved.
## Too much traffic

Of course, too much site traffic can be a problem if you just don't have enough resources.  


If your site is already optimized to the best of your knowledge, including eliminating PHP errors, leveraging caching like Redis and caching things like blocks and views, and your database response time is responding quickly to a reasonable amount of queries, then you might be a victim of your own success.  


If you’ve reached this point, it’s probably time to consider upgrading your [Pantheon plan](/documentation/howto/selecting-a-plan/). We have a number of self-service options for scaling to your needs, but if you’ve already maxed out a self-service plan, then [Enterprise](https://www.getpantheon.com/enterprise) is an option - and the sky’s the limit.

<style type="text/css">.raw_data th {
  font-weight: bold;
  text-align: left;
}
.raw_data td {
  border: 1px solid black;
  font-family:courier new,courier,monospace;
}
</style>
