---
title: Load and Performance Testing
description: Learn how to monitor internal execution performance of your Pantheon Drupal or WordPress site.
categories: [performance]
tags: [measure, newrelic, professional-services]
reviewed: "2020-04-02"
---

Load and performance tests are critical steps in going live procedures, as they help expose and identify potential performance killers. These tests provide insight for how a site will perform in the wild under peak traffic spikes.

<Alert title="Note" type="info">

Load testing is one of the services offered by our [Onboarding](/guides/professional-services/onboarding#pre-launch-load-testing) team.

</Alert>

## Load vs Performance Testing

Before you start, it's important to understand the difference between load and performance testing and know when to use each.

### Performance Testing

Performance testing is the process in which you measure an application's response time to proactively expose bottlenecks. In addition to regularly referring to your New Relic reports, you should consider regularly executing performance tests as part of routine maintenance to ensure performance isn't being degraded by code or configuration changes.  You should run these test before any load testing. If your application is not performing well, then you can be assured that the load test will not go well.  

The scope of performance tests should be limited to the application itself on a development environment (Dev or [Multidev](/multidev)) without caching. This will give you an honest look into your application and show exactly how uncached requests will perform. You can bypass cache by [setting the `no-cache` HTTP headers](/cache-control) in responses.

### Load Testing

Load testing is the process in which you apply requests to your site that will represent the most load that your site will face once it is live.  This test will ensure that the site can withstand the peak traffic spikes after launch. This test should be done on the Live environment before the site has launched, in advance of anticipated major-traffic events, or after major overhauls, remembering to provide enough time to fix any issues identified after performance testing.

If your site is already live, then you should run load tests on the Test environment. For Live environments with multiple application containers, keep in mind that the Test environment has two application containers. Run a proportionate amount of traffic based on the number of Live environment app containers you have. If you have four app containers in live, then test with half of your anticipated peak. You can see the number of app containers using [Pantheon's free New Relic&reg; Performance Monitoring offering](/new-relic).

## Preparing for Tests

The procedure for executing a load test and a performance test are similar:

1. Enable [New Relic&reg; Performance Monitoring](/new-relic) within the Site Dashboard on Pantheon to ensure you have clear reporting to monitor response times.

   * Set your [apdex](https://docs.newrelic.com/docs/apm/new-relic-apm/apdex/apdex-measuring-user-satisfaction#score) threshold according to your business rules (.5 is the default). Be careful not to set this too high, otherwise you will not get as many transaction traces in New Relic.
   * If you have particular transactions that you want to ensure are traced, set them up as [key transactions](https://docs.newrelic.com/docs/apm/transactions/key-transactions/key-transactions-tracking-important-transactions-or-events).

2. Select a load testing tool:

   * SaaS Solutions
     * [Blazemeter](https://www.blazemeter.com)
     * [K6.io](https://k6.io)
   * Open Source tools
     * [Jmeter](https://jmeter.apache.org/)
     * [Locust](http://locust.io/)

  The Pantheon onboarding team uses Locust, an open source load testing tool. Locust makes it easy to build out test scripts, and it allows you to crawl the site instead of using predefined URLs. Crawling the site has the added benefit of loading every page that is linked to anywhere on the site. This exposes edge case performance bottlenecks that would have gone undetected under tests with predefined URLs.

  Ultimately, it doesn't matter what tool(s) you use as long as you test your site against the anticipated traffic patterns of the site in terms of overall volume and the proportion of anonymous versus authenticated traffic. Note that load testing for anonymous visits is considerably easier than testing authenticated workflows, which will require more investment of time and skills.  

3. Determine how much load to apply.

   * **Performance Tests**: Smaller loads should suffice, as you should be able to see transactional bottlenecks with 10-20 concurrent users.
   * **Load Tests**: Determine how many concurrent users per second the site is expected to serve based on historical analytics for the site. Identify the peak hourly sessions and average session duration, then do some math: `Concurrent Users = ( hourly_sessions x average_duration ) / 3600`

## Running the Tests

If this is a performance test, be sure to run the test on a development environment (Dev or [Multidev](/multidev)) without caching. Run load tests on the Live environment before launching the site. If the site is already launched, use the Test environment instead.

<Alert title="Warning" type="danger">

We do not recommend load testing on the Live environment if the site has already launched because you risk overwhelming your live site and causing downtime.

</Alert>

Note the start time for the test. As the test executes, it's a good idea to keep a close eye on [log files](/logs). Make note of any errors and warnings that pop up during the test so that you can fix them.

Once the test is running, execute common tasks done by editors and administrators and note the time. Example tasks may include:

* Clear the cache
* Clear the edge cache (if this is a load test, performance tests should not be cached)
* Run cron
* Run any scripts that could be triggered while users are on the site
* Flush Redis cache (if Redis is running)

## Assess Results

Now that the test is complete, examine the New Relic data. The **Overview** tab will give you an average response time for the duration of the test. Times above 750ms are good indicators of performance optimization opportunities.

Next, review the **Transactions** tab in New Relic and sort by **Slowest average response time**. Click on the slowest transaction to pull up the transaction trace. Review the transaction trace to find the performance bottleneck.

Finally, review the **Error analytics** tab in New Relic. PHP errors often indicate huge performance bottlenecks. If you have errors, fix them.

### Calculating Load Capacity After Launch

After launch, you can establish a baseline that `X` response time will let you handle `Y` traffic. If `X` degrades in Dev/Test, that will impact how much traffic Live can handle.

## See Also

* [Load Testing Drupal and WordPress with BlazeMeter](/guides/load-testing-with-blazemeter)
