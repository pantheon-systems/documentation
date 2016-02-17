---
title: Platform Reasources by Plan
description: Get detailed information about platform resources by plan level.
keywords: site, RAM, pantheon, backup, plan
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
        <th>Enterprise</th>
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
        <td>256</td>
        <td>256</td>
        <td>512</td>
        <td>1024</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">MySQL Buffer Pool</th>
        <td>128</td>
        <td>512</td>
        <td>1024</td>
        <td>2014+</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">Redis Cache Size</th>
        <td>n/a</td>
        <td>235</td>
        <td>471</td>
        <td>up to 16777</td>
      </tr>
    </tbody>
  </table>
  <tr> <p style="font-size:12px"> * All memory sizes shown in MB </p style>

## Glossary

**Application Containers**: Each application container is a separate deployment of your site's code. All dev and test environments have one container, but at higher service levels, the live environment may be scaled to multiple containers to handle more requests.
<hr>   
**PHP Concurrency**: How many simultaneous processes PHP can run within a given container. The number of requests your website can handle is a product of the number of containers, and each containers' concurrency, as well as your application performance (see below).
<hr>
**PHP Memory Limit**: Maximum amount of memory a single PHP process can use. Exceeding this limit will kill the process, resulting in a failed request from the user's perspective. 
<hr>
**MySQL Buffer Pool**: The buffer pool is InnoDB's cache for frequently-accessed data in your database. If queries can run out of the buffer alone, they will be dramatically accelerated.
<hr>
**Redis Cache Suze**: Amount of data a Redis instance can store. Note these numbers are intentionally set below the maximum memory for the Redis instance (which is the next logical power of 2) in order to insure good performance. 

## Viewing Service Configuration Details

### MySQL
For a comprehensive list of MySQL settings, [access your database](https://pantheon.io/docs/articles/local/accessing-mysql-databases/) and issue the [SHOW VARIABLES;](http://dev.mysql.com/doc/refman/5.0/en/show-variables.html) query.

### Redis
Get your Redis connection string by going to the **Site Dashboard > Environment (e.g. Dev) > Connection Info**, and then run: `<your redis string> config get *memory*`

### PHP
 See [Securely Working with phpinfo](https://pantheon.io/docs/articles/sites/secure-phpinfo/#method-1-(drupal)) for ways to view your specific PHP configuration.

## Frequently Asked Questions (FAQs)

#### Are these the complete specs and memory for my site?
There are many "under the hood" configuration values not show here, but these are the most important values for understanding whether or not Pantheon will fit for a given site.

#### Is memory shared between containers?
No, your database and application container resources are not shared. They operate in their own linux userspace with their own memory.

#### Are the specs the same for all three environments (Dev/Test/Live)?  
Yes they have the same infrastructure; however, Business plans and above have multiple application containers.

## Calculating Concurrent User / Dynamic Page Capacity

One common need in determining a plan level is calculating the amount of concurrent traffic a site can handle, especially when all or some of the traffic cannot be handled by caching. 

The first thing you must know is how fast your site responds to dynamic (uncached) page requests. Take the product of your containers and concurrency, and divide by that value to give you your max dynamic requests per second:

`Containers * Concurrency / Average Page Response = Dynamic Capacity`

So, on a Personal plan, if your site responds in 750ms on average, your dynamic capcity would be about 5 requests per second:

`1 * 4 / 0.75 = 5.333`

Calculating what this means for logged in users can be done by making a "time between clicks" estimate so you can understand how many requests per second the average user generates. 

`Containers * Concurrency / Average Page Response * Time Between Clicks = User Capacity`

The amount of time between users clicking — e.g. how frequently they need a new page — will vary a lot depending on your use-case, but it's important to make an estimate.

For instance, if you are running an interactive user forum on a Business plan. You've tuned your site, and know that your average backend response time is around 1500ms. You also know that broadly speaking the average user clicks a new link once every 20 seconds. Using the formula:

`20 / .75 * 2 * 8 = 213` 

You would know that your business plan should max out at around 200 concurrent users.
