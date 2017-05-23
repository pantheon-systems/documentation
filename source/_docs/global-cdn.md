---
title: Early Access: Pantheon Global CDN
earlyaccess: true
description: Improve Site Performance and Security
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

CHART

## Eligibility
Upgrading to the Global CDN is available for most Professional and Business level sites.
## Global CDN vs Legacy
<table class="table  table-bordered table-responsive">
  <thead>
    <tr>
      <th></th>
      <th>Global CDN</th>
      <th>Legacy</th>
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
      <td>Included</td>
      <td>$30/mo surcharge</td>
    </tr>
    <tr>
      <th>Delivery</th>
      <td>Global Distribution</td>
      <td>ORD Datacenter</td>
    </tr>
    <tr>
      <th>Cache Sharding</th>
      <td>None</td>
      <td>3-4 per site</td>
    </tr>
    <tr>
      <th>Cache Clearing</th>
      <td>Granular</td>
      <td>Flush All</td>
    </tr>
  </tbody>
</table>


## Enabling the Global CDN

### Find Eligible Sites in the Dashboard
Look for site thumbnails that show **Global CDN Upgrade Available** in your User Dashboard or use the **Global CDN Upgrade** search facet in the [Organization Dashboard](/docs/organization-dashboard/#filter-sites) to filter eligible sites.

### Upgrade Your Site

1. Click the **Start Upgrade** button from the Site Dashboard.
2. It can take up to an hour for the new certificate to deploy across the entire CDN. If you want to avoid any possible hiccoughs you can wait 60 minutes before updating DNS.

  ![Domains and HTTPS action required](/source/docs/assets/images/dashboard/domains-action-required.png)

  If you want to proceed without waiting, we strongly recommend testing locally before making the final DNS change:

      * Copy the A record value provided for the site's bare domain.
      * Add a line to your <a href="https://en.wikipedia.org/wiki/Hosts_(file)">local hosts</a> file which includes the IP address followed by the domain, for example:

          ```
          192.123.456.789 example.com
          ```

      * Test your site locally by entering your domain in the browser. Once you have finished testing, remove the edits made to your hosts file.


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

For more information see our detailed docs on the Let's Encrypt HTTPS solution, as well as the Global CDN FAQ.
