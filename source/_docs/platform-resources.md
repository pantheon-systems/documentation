---
title: Platform Resources for Legacy Plans
description: Get detailed information about platform resources for your Drupal or WordPress site.
tags: [services]
categories: []
deprecated: true
deprecatednote: This page reflects resources for legacy site plans. Sites that have been upgraded or launched to our new plans should refer to <a data-proofer-ignore href="/docs/new-plans-faq/#what-are-the-resource-comparisons-between-new-and-legacy-plans" class="external">New Site Plans FAQs</a> for a comparison on resources by plan.
---
The platform resources provided to your website depend on your current plan. Pantheon can scale instantly, so changing your service level will immediately change your resources to the values for the new plan, as shown in the table below.

## Platform Resources

<table class="table table-condensed table-bordered">
    <thead class="thead-inverse">
      <tr>
        <th scope="row" class="thead-inverse"></th>
        <th>Personal</th>
        <th>Professional</th>
        <th>Business</th>
        <th>Elite</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="thead-inverse">Application Containers</th>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>4+</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">PHP Concurrency</th>
        <td>4</td>
        <td>8</td>
        <td>8</td>
        <td>8</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">PHP Memory Limit</th>
        <td>256MB</td>
        <td>256MB</td>
        <td>512MB</td>
        <td>up to 1024MB</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">MySQL Buffer Pool</th>
        <td>128MB</td>
        <td>512MB</td>
        <td>1024MB</td>
        <td>2014MB+</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">Redis Cache Size</th>
        <td>n/a</td>
        <td>235MB</td>
        <td>471MB</td>
        <td>1024MB</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">Storage</th>
        <td>5GB</td>
        <td>20GB</td>
        <td>30GB</td>
        <td>100GB+</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">Custom Domain Limit (per site) <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/domains/#custom-domains'>Domains and Redirects</a>."><em class="fa fa-info-circle"></em></a></th>
        <td>5</td>
        <td>25</td>
        <td>100</td>
        <td>200</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">Free and managed HTTPS <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>."><em class="fa fa-info-circle"></em></a></th>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">New Relic <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/new-relic/'>New Relic APM Pro</a>."><em class="fa fa-info-circle"></em></a></th>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">Redis <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="For details, see <a href='/docs/redis/'>Installing Redis on Drupal or WordPress</a>."><em class="fa fa-info-circle"></em></a></th>
        <td></td>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
      </tr>
      <tr>
      <th scope="row" class="thead-inverse">Multidev <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="All sites associated with an organization have access to <a href='/docs/multidev/'>Multidev</a>, regardless of plan."><em class="fa fa-info-circle"></em></a></th>
        <td></td>
        <td></td>
        <td>✓</td>
        <td>✓</td>
      </tr>
    </tbody>
</table>

## Glossary

**Application Containers**: Each application container is a separate deployment of your site's code. All Dev and Test environments for Personal and Performance sites have one container, and Test environments for Business and Elite sites have two containers. The Live environment for Elite sites may be scaled to multiple containers to handle more requests.
<hr>
**PHP Concurrency**: The amount of simultaneous processes PHP can run within a given container. The number of requests your website can handle is a product of the number of containers, and each containers' concurrency, as well as your application performance (see below).
<hr>
**PHP Memory Limit (Application Memory Limit)**: The maximum amount of memory a single PHP process can use. Exceeding this limit will kill the process, resulting in a failed request from the user's perspective.
<hr>
**MySQL Buffer Pool**: The buffer pool is InnoDB's cache for frequently-accessed data in your database. If queries can run out of the buffer alone, they will be dramatically accelerated.
<hr>
**Redis Cache Size**: Amount of data a Redis instance can store. Note these numbers are intentionally set below the maximum memory for the Redis instance (which is the next logical power of 2) in order to ensure good performance.

## View Service Configuration Details

### MySQL
For a comprehensive list of MySQL settings, [access your database](/docs/mysql-access/) and issue the [SHOW VARIABLES;](https://dev.mysql.com/doc/refman/5.7/en/show-variables.html) query.

### Redis
Get your Redis connection string by going to the **Site Dashboard > Environment (e.g. Dev) > Connection Info**, and then run: `<your redis string> config get *memory*`

### PHP
See [Securely Working with phpinfo](/docs/phpinfo#drupal-note) for ways to view your specific PHP configuration.

## Calculate Concurrent User / Dynamic Page Capacity
<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p markdown="1">This following content is considered deprecated. Refer to [Traffic Limits and Overages](/docs/traffic-limits/) for updated information on how Pantheon defines plans and site traffic.</p></div>

One common need in determining a plan level is calculating the amount of concurrent traffic a site can handle, especially when all or some of the traffic cannot be handled by caching.

The first thing you must know is how fast your site responds to dynamic (uncached) page requests. Take the product of your containers and concurrency, and divide by that value to give you your max dynamic requests per second:

`Containers * Concurrency / Average Page Response = Dynamic Capacity`

So on a Personal plan, if your site responds in 750ms on average, your dynamic capacity would be about 5 requests per second:

`1 * 4 / 0.75 = 5.333`

Calculating what this means for logged in users can be done by making a "time between clicks" estimate so you can understand how many requests per second the average user generates.

`Containers * Concurrency / Average Page Response * Time Between Clicks = User Capacity`

The amount of time between users clicking (i.e. how frequently they need a new page) will vary a lot depending on your use case, but it's important to make an estimate.

Example:
If you're running an interactive user forum on a Business plan, you've tuned your site and know that your average backend response time is around 1500ms. You also know that broadly speaking the average user clicks a new link once every 20 seconds. Using this formula tells you that your Business plan should max out at around 200 concurrent users:

`20 / 1.5 * 2 * 8 = 213`

## Frequently Asked Questions (FAQs)

#### Are these the complete specs and memory for my site?
There are many "under the hood" configuration values not show here, but these are the most important values for understanding whether or not Pantheon will fit for a given site.

#### Is memory shared between containers?
No, your database and application container resources are not shared. They operate in their own Linux user space with their own memory.

#### Are the specs the same for all three environments (Dev/Test/Live)?
Yes they have the same infrastructure; however, Live environments on Business plans and above have multiple application containers, while Dev and Test environments have only one.
