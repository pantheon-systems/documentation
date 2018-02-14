---
title: Pantheon Global CDN
description: Improve Site Performance and Security
earlynote: The documentation on this page discusses features and options that are not available across the entire platform.
searchboost: 200
---

Pantheon's new [Global CDN](https://pantheon.io/global-cdn){.external} is a core platform offering, with improved performance and security for customer sites. Content is served from 40+ global POPs (points of presence) where site pages and assets are cached, plus [free managed HTTPS](/docs/https) using [Let's Encrypt](https://letsencrypt.org){.external}.

<div class="enablement">
  <h4 class="info" markdown="1">[Agency DevOps Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
  <p>Get the most out of Global CDN with help from the experts at Pantheon. We deliver custom workshops to help development teams master the platform and improve internal DevOps.</p>
</div>


## How Does It Work?
This new service takes Pantheon's traditional high-performance page and asset caching system (Varnish) and pushes it out globally. Rather than requests coming all the way to our primary datacenter, we can now terminate HTTPS and serve pages from a location much closer to the end-user. This speeds up the time to render a web-page significantly.

Additionally, the Global CDN has an improved cache strategy that eliminates Pantheon's legacy "cache sharding" which meant that the same content needed to be cached in separate edge cache instances. This means higher cache hit rates.

Finally, the Global CDN includes interfaces to dynamically expire selected content from the cache, rather than doing a full cache flush. There are basic implementations available as Drupal modules and WordPress plugins, as well as a developer API for implementing custom cache tagging/clearing behavior.

In early testing we saw multi-second speedups in Visual Progress <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title="Visual Progress" data-content="The pace at which content renders on the visible page"><em class="fa fa-info-circle"></em></a> even within the continental US. International users will benefit even more:

![Example before and after page load time](/docs/assets/images/global-cdn-time-to-load.png)

## Eligibility
Open a support chat to enable the upgrade.

## Feature Comparison
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
      <th>Price</th>
      <td>$30/mo surcharge for HTTPS</td>
      <td>Included</td>
    </tr>
    <tr>
      <th>Delivery</th>
      <td>US Datacenter</td>
      <td>Global Distribution</td>
    </tr>
    <tr>
      <th>Cache Lookups</th>
      <td>Randomly Routed to One of Three Pools</td>
      <td>Routed to the Pool Most Likely to Hit</td>
    </tr>
    <tr>
      <th>Cache Clearing</th>
      <td>Blocks, takes up to 2000ms</td>
      <td>Non-blocking, takes up to 150ms to take effect</td>
    </tr>
    <tr>
      <th>HTTPS Service</th>
      <td>BYO Cert</td>
      <td markdown="1">[Free and Managed](/docs/https)</td>
    </tr>
  </tbody>
</table>

## Cache Clearing
We recommend installing the Pantheon Advanced Page Cache [plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/){.external} or [module](https://www.drupal.org/project/pantheon_advanced_page_cache){.external} to take advantage of the granular cache clearing capabilities of the Global CDN. Additionally, you can remove all pages from cache at once from the Site Dashboard, within the Site Admin, and even from the command line.

For more details, see [Clearing Caches for Drupal and WordPress](/docs/clear-caches/).

## Enabling the Global CDN

If you don't see action required in your Domains / HTTPS tool, please [contact support](/docs/getting-support) to enable the upgrade.

### Upgrade Your Site

1. Click the **Start Upgrade** button from the Site Dashboard.
2. It can take up to an hour for the new certificate to deploy across the entire CDN. If you want to avoid any possible hiccoughs you can wait 60 minutes before updating DNS.

  If you want to proceed without waiting, we strongly recommend testing locally before making the final DNS change:

      1. Click the "Details" button next to your site's bare domain.
      2. Copy the "A" record's IP address provided for the site's bare domain.
      3. Add a line to your [local hosts file](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/){.external} with the IP address from the previous step followed by the domain name, for example:

        ```
        192.123.456.789 example.com
        ```

      4. Test HTTPS locally by entering your domain in the browser. If the site is accessible over HTTPS with a <span class="secure glyphicons glyphicons-lock"></span> [Secure status](https://support.google.com/chrome/answer/95617?hl=en){.external}, the test was successful. Remove the edits made to your hosts file once you have finished testing.


3. Click **Details** next to each custom domain to identify DNS values needed to point the domain to your site. Domains that are not yet configured will indicate action is required. You will need to configure your DNS host to use the provided values.

    <div class="alert alert-info">
    <h4 class="info">Pro Tip</h4>
Look up your DNS host with this free web tool: <a class="external" href="https://mxtoolbox.com/DNSLookup.aspx">https://mxtoolbox.com/DNSLookup.aspx</a>
</div>

  DNS records are cached across the internet and can take up to 72 hours to propagate, depending on the time to live (TTL) configured for the domain's DNS records. Most records update more quickly, and you can track the progress of DNS propagation.

      <div class="alert alert-info">
      <h4 class="info">Pro Tip</h4>
Check the current state of DNS propagation from different parts of the world using this free web tool <a class="external" href="https://www.whatsmydns.net/">https://www.whatsmydns.net/</a>
</div>

4. If your site relied on the www-redirector provided on our Legacy service, you will need to [redirect incoming requests within `wp-config.php` or `settings.php`](/docs/guides/launch/redirects/).

For more details, see [HTTPS on Pantheon's Global CDN](/docs/https).

## Frequently Asked Questions

### Is there a deadline to upgrade?
Ultimately the Global CDN will be the default for every site on Pantheon. We encourage customers to upgrade as soon as they have time to do the changes.

### I already have a CDN - should I switch?
Pantheon's Global CDN has some advantages over solutions some customers may already have in place:

1. It includes [free and automatic HTTPS service](/docs/https)
2. It is heavily optimized for website performance
3. It is configured, maintained, and supported by Pantheon
4. It is available at no additional cost

Even if you want to retain your existing CDN because of specific features they provide, the upgrade will improve your end-user experience, as your custom CDN will be able to pull pages and assets from a nearby Pantheon Global CDN location, rather than the origin datacenter.

### Is the www-redirector service still available?
No, the www-redirector service is part of the legacy infrastructure. You can choose your primary domain and redirect all traffic to HTTPS by adding [301 redirects](/docs/guides/launch/redirects/) to your site's configuration file (wp-config.php or settings.php).

### Are vanity domains supported?
You can upgrade a site to Global CDN that is using [vanity domains](/docs/vanity-domains/), but HTTPS will not be provisioned for the vanity domains. Only custom domains will have HTTPS provisioned.

### What about Cloudflare?
See [Cloudflare Domain Configuration](/docs/cloudflare/).

### Is the CDN configurable?
No, we pre-configured the CDN so you don’t have to hassle with configuration, and we can guarantee performance and uptime. The Global CDN's behavior is the same as our legacy cache which is heavily optimized for Drupal and WordPress sites, and serves billions of pages monthly, except it's globally distributed.

### Do I get access to hit rates or other statistics?
Hit rates or other statistics are not currently available.

### Can I use other CDNs with the Pantheon Global CDN?
Yes, but because it adds additional complexity, we suggest you only do so if you identify a need that the Pantheon Global CDN doesn't address. We recommend that you ensure you are enforcing HTTPS only at the outer CDN and are assuming HTTPS in the application. Check your CDN for how to redirect all traffic to HTTPS.

### Can I use my own Fastly account with the Pantheon Global CDN?
You can, but as mentioned above you should identify a need for adding additional complexity first. If you're using Fastly TLS services with WordPress, you'll want to check for the `HTTP_FASTLY_SSL` header so that WordPress can build URLs to your CSS and JS assets correctly. Do this by adding the following to `wp-config.php`:

```php
if (!empty( $SERVER['HTTP_FASTLY_SSL'])) {
  $SERVER['HTTPS'] = 'on';
}
```
