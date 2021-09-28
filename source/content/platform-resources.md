---
title: Platform Resources for Legacy Site Plans
description: Information about platform resources for Drupal or WordPress sites on legacy site plans.
categories: [platform]
tags: [billing]
---

<Alert title="Legacy Site Plans Only" type="info">

This page reflects resources for legacy site plans. Sites that have been upgraded or launched to our new plans should refer to [Site Plans FAQs](/site-plans-faq/) for current information.

</Alert>

The platform resources provided to your website depend on your current plan. Pantheon can scale instantly, so changing your service level will immediately change your resources to the values for the new plan, as shown in the table below.

## Legacy Platform Resources

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
        <td>512MB<Popover content="Up to 1024MB is available for certain Elite plans. <a href='https://pantheon.io/pantheon-elite-plans'>Learn more about Pantheon Elite Plans</a> and contact Sales for information about plans with custom resources." /></td>
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
        <th scope="row" class="thead-inverse">Custom Domain Limit (per site) <Popover content="For details, see <a href='/domains/#custom-domains'>Domains and Redirects</a>." /></th>
        <td>5</td>
        <td>25</td>
        <td>100</td>
        <td>200</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">Free and managed HTTPS <Popover content="For details, see <a href='/https/'>HTTPS on Pantheon's Global CDN</a>." /></th>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">New Relic <Popover content="For details, see <a href='/new-relic/'>New Relic APM Pro</a>." /></th>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">Object Cache <Popover content="For details, see <a href='/object-cache/'>Object Cache (formerly Redis) for Drupal or WordPress</a>." /></th>
        <td></td>
        <td>✓</td>
        <td>✓</td>
        <td>✓</td>
      </tr>
      <tr>
      <th scope="row" class="thead-inverse">Multidev <Popover content="All sites associated with an organization have access to <a href='/multidev/'>Multidev</a>, regardless of plan." /></th>
        <td></td>
        <td></td>
        <td>✓</td>
        <td>✓</td>
      </tr>
    </tbody>
</table>

## Glossary

**Application Containers**: Each [application container](/application-containers) is a separate deployment of your site's code. All Dev and Test environments for Personal and Performance sites have one container, and Test environments for Business and Elite sites have two containers. The Live environment for Elite sites may be scaled to multiple containers to handle more requests.

**PHP Concurrency**: The amount of simultaneous processes PHP can run within a given container. The number of requests your website can handle is a product of the number of containers, and each containers' concurrency, as well as your application performance.

**PHP Memory Limit (Application Memory Limit)**: The maximum amount of memory a single PHP process can use. Exceeding this limit will kill the process, resulting in a failed request from the user's perspective.

**MySQL Buffer Pool**: The buffer pool is InnoDB's cache for frequently-accessed data in your database. If queries can run out of the buffer alone, they will be dramatically accelerated.

## See Also

- [Application Containers](/application-containers)
- [Site Plans FAQs](/site-plans-faq/)