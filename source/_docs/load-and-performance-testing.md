---
title: Load and Performance Testing
description: Learn how to monitor internal execution performance of your Pantheon Drupal or WordPress site.
tags: [performance, cache]
categories: [platform, cache]
---

## Load vs Performance Testing

Before getting started testing your site its important to understand the difference between load and performance testing and know when to use each.

Load testing is the process in which you apply requests to your site that will represent the most load that your site will face once it is live.  This test will ensure that the site can withstand the peak traffic spikes after launch.

<div class="alert alert-danger" role="alert">
<h3 class="info">Warning</h3>
<p>You should not perform load testing on your live environment if the site is actually open to the public.  <strong>Load testing should be done on your live environment before you go live</strong>.  If your site is already live then you should run load tests on your test evironment.  Keep in mind that your test environment only has one container so try to run a proportionate amount of traffic based on how many containers you currently have on your live environment<p></div>

Performance testing is the process in which you test your application for performance bottlenecks proactively.  Performance testing should be done often and should always be done prior to a load test.  If your application is not performing well then you can be assured that the load test will not go well.  Performance testing scope should be limited to the application itself without any caching.  This will give you an honest look into your application and show exactly how uncached requests will perform.  Performance testing should be done on the dev environment or (if available on you site's service level) a [multidev](/docs/multidev) environment would be preferrable.

<div class="alert alert-info" role="alert">
<h3 class="info">Note</h3>
<p><strong>Performance testing environments should be uncached</strong>. Where possible, try to ensure that no-cache headers are applied to the response.
</p></div>
See [Bypassing Cache with HTTP Headers](/docs/cache-control)

## How to Load/Performance Test your Site
How to Load/Performance Test your Site
The procedure for running a load test and a performance test are similar.

###Setup New Relic
First, [enable new relic pro](/docs/new-relic) to ensure that you have clear reporting on specific bottlenecks.  Set your <a target ="_blank" href="https://docs.newrelic.com/docs/apm/new-relic-apm/apdex/apdex-measuring-user-satisfaction#score">apdex</a> threshold according to your business rules (.5 is the default).  Be careful not to set this too high otherwise you will not get as many transaction traces in New Relic.  If you have any transactions that you want to ensure transaction trace is on be sure to set them up as <a target="_blank" href="https://docs.newrelic.com/docs/apm/transactions/key-transactions/key-transactions-tracking-important-transactions-or-events">key transactions</a>.

###Use a load testing tool
There are many tools that will accomplish both goals of load and performance testing.  Tools like:

* SaaS Solutions
 * <a target="_blank" href="https://www.blazemeter.com/">Blazemeter</a>
 * <a target="_blank" href="https://loadimpact.com/">Load Impact</a>
* Open Source tools
 * <a target="_blank" href="http://jmeter.apache.org/">Jmeter</a>
 * <a target="_blank" href="http://locust.io/">Locust.io</a>

The Pantheon onboarding team uses Locust.io for load testing.  The benefit of locust is that is open source, it is fairly easy to build out test scripts and it allows you to crawl the site instead of using predefined urls for the load test.  Crawling the site has the added benefit of hitting every page that is linked to anywhere on the site.  This means that a lot of edge case performance bottlenecks can be found where other more rigid tests would have not.

Ultimately, is doesn't matter what tool you decide to use as long as it allows you to test your site properly.  Be sure to allow for any authenticated traffic as well as anonymous.  Which brings the next step, how to determine how much load to apply.  

For performance tests a smaller load should suffice as you should be able to see transactional bottlenecks with 10-20 concurrent users.

For load tests, to determine how many concurrent users you must start with looking at your historical analytics of your site.  Try to find the peak hourly sessions of your site and the average session duration. 

Next do some math: hourly_sessions / (60 / average_duration) = Concurrent Users 

###Run the tests
If this is a performance test be sure to run the test in the dev environment or if your service level allows it run the test in a multidev environment.  If the test is a load test and the site is not public yet run the test in the live environment.

Before starting the test be sure to write down the time you started the test.  As you run the tests its a good idea to keep a close eye on the [logs](/docs/logs).  Make note of any errors and warnings that pop up during test to fix.  

Once the test is up and running try to do common things that editors/administrators would do and make note of what time you triggered these events

Examples:
* Clear the drupal cache
* Clear the edge cache (if this is a load test, performance tests should not be cached)
* Run Drupal cron
* Run any scripts that could be triggered while users are on the site.

##Assess the results of the test
Now that the test is complete take a look at New Relic.  The overview will give you an average response time for the duration of the test.  A good response time would be 750ms or less. 

Next, review the transactions tab in new relic, sort by slowest average response time.  Click on the slowest transaction to pull up the transaction trace.  Review the transaction trace to determine where the performance bottleneck is occuring.

Finally, review the logs and the errors tab in new relic.  PHP errors are a huge performance bottleneck.  If you have errors fix them first, then move on to optimizing any other slow transactions.












