---
title: Early Access: Pantheon Global CDN
earlyaccess: true
description: Improve Site Performance and Security
earlynote: The documentation on this page discusses features and options that are not available across the entire platform. 
---

Pantheon is rolling out a Global CDN as a core platform offering, with improved performance and security for customer sites. The Global CDN includes over 20 global points of presence where site pages and assets are cached, plus free managed HTTPS using [Let's Encrypt](https://letsencrypt.org). This doc describes how existing HTTPS customers can opt-in to this new set of features.

## Pantheon's Global CDN
Research has shown that each second of latency in rendering a site results in approxomately a 10% drop-off in user engagement. With more and more traffic coming through mobile devices (and their networks), meeting user expectations for performance can be a real challenge.

On top of that, Google and others are now directly factoring in performance and security as part of their SEO weighting algorithms. Browser makers are beginning to show obtrusive warnings for any login page or other form submission that happens "in the clear" over plain HTTP.

Pantheon is helping developers solve both of these challenges with one elegant solution: an integrated performance-first content delivery network which includes free managed HTTPS service. Faster pages, all HTTPS, all the time.

## How Does It Work?
This new service takes Pantheon's traditional high-performance cache system and pushes it out globally. Rather than requests coming all the way to our primary datacenter, we can now terminate HTTPS and serve pages from a location much closer to the end-user. This speeds up the time to render a web-page significantly.

Additionally, the Global CDN has an improved cache strategy that eliminates Pantheon's legacy "cache sharding" which meant that the same content needed to be cached in separate edge cache instances. This means higher cache hit rates.

Finally, the Global CDN includes interfaces to dynamically expire selected content from the cache, rather than doing a full cache flush. There are basic implementations available as Drupal modules and WordPress plugins, as well as a developer API for implementing custom cache tagging/clearing behavior.

In early testing we saw multi-second speedups even within the continental US. International users will benefit even more:

<iframe src="http://speedtest.pantheon.website/video/view.php?id=170509_0b7008bcd3803a049ae94bfa01ef9feaaef6f007&embed=1&width=816&height=384" width="816" height="384"></iframe>

Here's an example of the load time chart. See more at the [full speedtest report](http://speedtest.pantheon.website/video/compare.php?tests=170509_VC_3-l%3AGlobal+CDN%2C170509_BG_2-l%3ALegacy&thumbSize=200&ival=100&end=doc).

[![Example before and after page load time](/docs/assets/images/global-cdn-time-to-load.png)]()

## Eligibility
Upgrading to the Global CDN is available for most Professional and Business level sites.

## Global CDN vs Legacy
<table class="table  table-bordered table-responsive">
  <thead>
    <tr>
      <th></th>
      <th>Legacy</th>
      <th>Global CDN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Plans</th>
      <td>Pro and Above</td>
      <td>Pro and Above</td>
    </tr>
    <tr>
      <th>Price</th>
      <td>$30/mo surcharge</td>
      <td>Included</td>
    </tr>
    <tr>
      <th>Delivery</th>
      <td>ORD Datacenter</td>
      <td>Global Distribution</td>
    </tr>
    <tr>
      <th>Cache Shards</th>
      <td>3-4 per site</td>
      <td>None</td>
    </tr>
    <tr>
      <th>Cache Clearing</th>
      <td>Flush All</td>
      <td>Granular</td>
    </tr>
  </tbody>
</table>

## Granular Cache Clearing

Developers looking to take advantage of the granular cache clearing capabilities of the Global CDN are encouraged to start with our CMS integrations:

- WordPress: [Pantheon Advanced Page Cache](https://github.com/pantheon-systems/pantheon-advanced-page-cache)
- Drupal: D7 and D8 modules coming soon

Lower-level documentation for custom implementation of caching strategies is also coming soon. Please [contact our enablement team](https://pantheon.io/agencies/learn-pantheon) if you are interested in implementing a custom cache strategy.

## Enabling the Global CDN

### Find Eligible Sites in the Dashboard
Look for site thumbnails that show **Global CDN Upgrade Available** in your User Dashboard or use the **Global CDN Upgrade** search facet in the [Organization Dashboard](/docs/organization-dashboard/#filter-sites) to filter eligible sites.

### Upgrade Your Site

1. Click the **Start Upgrade** button from the Site Dashboard.
2. It can take up to an hour for the new certificate to deploy across the entire CDN. If you want to avoid any possible hiccoughs you can wait 60 minutes before updating DNS.

  ![Domains and HTTPS action required](/source/docs/assets/images/dashboard/domains-action-required.png)

  If you want to proceed without waiting, we strongly recommend testing locally before making the final DNS change:

      1. Copy the A record value provided for the site's bare domain.
      2. Add a line to your [local hosts](https://en.wikipedia.org/wiki/Hosts_(file)) file which includes the IP address followed by the domain, for example:

        ```
        192.123.456.789 example.com
        ```

      3. Test your site locally by entering your domain in the browser. Once you have finished testing, remove the edits made to your hosts file.


3. Click **Show DNS Recommendations** next to each custom domain to identify DNS values needed to point the domain to your site. Domains that are not yet configured will indicate action is required. You will need to configure your DNS provider to use the provided IP addresses.

    <div class="alert alert-info">
    <h4 class="info">Pro Tip</h4>
Look up your DNS provider with this free web tool: <a href="https://mxtoolbox.com/DNSLookup.aspx">https://mxtoolbox.com/DNSLookup.aspx</a>
</div>

  DNS records are cached across the internet and can take up to 72 hours to propagate, depending on the time to live (TTL) configured for the domain's DNS records. Most records update more quickly, and you can track the progress of DNS propagation.

      <div class="alert alert-info">
      <h4 class="info">Pro Tip</h4>
Check the current state of DNS propagation from different parts of the world using this free web tool <a href="https://www.whatsmydns.net/">https://www.whatsmydns.net/</a>
</div>

For more information on HTTPS see our detailed docs on the [Let's Encrypt HTTPS solution](/docs/free-https).

## Frequently Asked Quesitons

### I already have a CDN - should I switch?
Pantheon's Global CDN has some advantages over solutions some customers may already have in place:

1. It includes [free and automatic HTTPS service](/docs/free-https)
2. It is heavily optimized for website performance
3. It is configured, maintained, and supported by Pantheon
4. It is available at no additional cost

Even if you want to retain your existing CDN because of specific features they provide, the upgrade will improve your end-user experience, as your custom CDN will be able to pull pages and assets from a nearby Pantheon Global CDN location, rather than the origin datacenter.

### What about CloudFlare?
Many customers currently take advantage of CloudFlare's awesome Universal SSL offering to get free HTTPS service for their website. If you are _just_ using CloudFlare for the HTTPS service, you can switch to the Global CDN and get an upgrade in performance and SSLLabs score.

However, customers using CloudFlare's WAF tools or other features may want to keep CloudFlare in their stack. We still recommend upgrading your Pantheon site to the Global CDN as this will improve cache hitrates and performance. There are no known issues with layering CloudFlare and the Global CDN together.

### Is the Global CDN mandatory?
Currently we are in the early access phase, but ultimately the Global CDN will be the default for every site on Pantheon. We encourage customers to upgrade as soon as they have time to do the changes. 

### Is the CDN configurable? 
No, we pre-configured the CDN so you don’t have to hassle with configuration, and we can guarantee performance and uptime. The Global CDN's behavior is the same as our legacy cache which is heavily optimized for Drupal and WordPress sites, and serves billions of pages monthly, except it's globally distributed.

### Do I get access to hit rates or other statistics?
Hit rates or other statistics are not currently available.

### Why does the Domains and HTTPS tool indicate action required even though I've updated DNS records?
The action required message may be due to one of the following:

  - **DNS changes can take some time to take effect:** Check the current state of DNS propagation from different parts of the world using this [free web tool](https://www.whatsmydns.net/).
  -  **AAAA records not detected:**: Ensure you've added both AAAA records for the bare domain (e.g. `example.com`) to route IPv6 traffic to your site. There are two AAAA records for improved uptime and reliability. They may look similar, but the addresses are distinct.
  - **Old DNS records detected:** If you also have old records in addition to the new ones, make sure to delete the old records.

