---
title: Switching Sites from HTTP to HTTPS
description: Best-practice HTTPS configurations for WordPress and Drupal to fix mixed-content browser warnings and excessive redirects.
tags: [security]
---
Connect a custom domain to the Site Dashboard and point DNS at Pantheon to trigger the automated process of provisioning HTTPS. The platform will deploy a certificate for your custom domain to the target environment (typically Live) at which point, HTTPS is enabled. For details, see [Free and Automated HTTPS](/docs/https/).

The following describes how to switch WordPress and Drupal sites over from HTTP to HTTPS.

## Before you begin
Be sure that you have:

- [Paid Pantheon plan](/docs/guides/launch/plans/)
- [Domain connected](/docs/guides/launch/domains/) to the target Pantheon environment (typically Live) with DNS properly configured.
- HTTPS provisioned, indicated by the following notice:

    <blockquote class="block-success">
    <h3 class="info">HTTPS</h3>
    <span class="glyphicons glyphicons-ok text-success"></span> Let’s Encrypt certificate deployed to Pantheon’s Global CDN. Certificate renews automatically with no additional cost.</blockquote>

## Test HTTPS availability and existing redirects
Start by testing a simple HTML or Text file in your browser with HTTPS on your custom domain. The test is successful if the browser loads the file securely with no warnings:

![Example HTTPS Test](/source/docs/assets/images/dummy-html-https-test.png)

Requests bounced from HTTPS to HTTP indicate test failure. Remove existing redirects to HTTP within the site's framework (e.g., `wp-config.php` or `settings.php`) in addition to CDN configurations if applicable (e.g., page rules in Cloudflare).

Mixed-content warnings in the browser are expected at this stage; such issues will be visible in Chrome as an HTTPS URL with either no “Secure” label *or* a “Secure” label and a small warning icon:

![Mixed content browser warnings](/source/docs/assets/images/mixed-content-console-error.png)

Continue once you're able to load a normal page of your WordPress or Drupal site with HTTPS without _redirecting_ (browser warnings are okay for now).

## Assume HTTPS within WordPress and Drupal
Configure your site to assume users are visiting via HTTPS and the site’s primary domain. Templates for example should reference HTTPS in absolute CSS and Javascript sources, even when accessed with HTTP. While testing, you may find it necessary to bust through the edge cache by adding something like `?cache-bust=1` to the end of a URL.

### Reveal violations in bulk
There are more than a few ways to identify mixed-content violations across your site, but Google Chrome is arguably one of the fastest and simplest. Right click on a page showing as insecure and select inspect, then review the console.

Another easy to use tool is [https://www.whynopadlock.com/](https://www.whynopadlock.com/), for those preferential to GUIs.

Fans of the command line might find [mixed-content-scan by Bramus](https://github.com/bramus/mixed-content-scan) helpful.
### Hotfix violations in bulk
If you're in a bind and need a quick fix, set the `Content-Security-Policy` header to `upgrade-insecure-requests` to upgrade all HTTP resources to the HTTPS protocol client-side, on the fly:

```PHP
// Upgrade HTTP requests to secure HTTPS
header("Content-Security-Policy: upgrade-insecure-requests;");
// Report all insecure requests, but do not refuse
header("Content-Security-Policy-Report-Only: img-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline';");
```

Use this as temporary solution while working to fix each problem at it's origin.
### Database cleanup
Use the following techniques to replace insecure references to your domain in the site's database. The result should be that the browser loads pages of your WordPress or Drupal site securely with no warnings.

#### WordPress
Use [Terminus](/docs/terminus) to run `wp search-replace` to converts URLs from HTTP to HTTPS:

```
terminus remote:wp <site>.<env> -- search-replace 'http://www.example.com' 'https://www.example.com' --all-tables --verbose
```
#### Drupal
Drupal 7 sites can use [Drush Search and Replace (sar)](https://www.drupal.org/project/sar) by [adding custom Drush command](/docs/drush/#add-custom-drush-commands). Drupal 8 sites can use the [Entity API](https://www.drupal.org/docs/8/api/entity-api/introduction-to-entity-api-in-drupal-8) to fetch data from entities in the database that may include insecure references.

## Clear Caches
Clear Drupal and WordPress object caches in the [database and/or in Redis](/docs/redis/#clear-cache)) in addition to manually flush edge caches by going to your Pantheon Dashboard and clicking the **Clear Caches** button.

At this point, all visitors to the site should be able to securely access all pages over HTTPS with no browser warnings.
## Redirect to HTTPS and the primary domain
Configure redirects to the primary domain with HTTPS in `settings.php` or `wp-config.php` if a visitor arrives either (1) on a different domain or (2) without HTTPS.

{% include("redirects.twig") %}

Attempting to visit any page with HTTP or a non-primary domain should redirect to a page with the primary domain and a “Secure” label.

### Spot-check new and existing redirects
Consider your site's existing redirect logic and minimize the number of redirects whenever possible.

The bare domain should resolve to the preferred URL in a single redirect, like this:

* http://example.com => https://www.example.com

Not like this:

* http://example.com => https://example.com => https://www.example.com

cURL the bare domain with HTTP and review the output, checking for a single redirect like:

```
$ curl -LI http://example.com/
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=UTF-8
Location: https://www.example.com/
```

You can use this [redirect mapper by Patrick Sexton](https://varvy.com/tools/redirects/) to investigate redirect behaviors as an alternative to cURL:

![Varvy Redirects example.com](/source/docs/assets/images/varvy-redirect-mapper.png)  

Check all configured services when looking for redirects to remove, like page rules on some external CDN.

### HTTPS Strict Transport Security (optional)
Send headers for HTTPS Strict Transport Security. This creates a long-term commitment to delivering the site with HTTPS and should raise the SSL Labs grade to A+ (if the site uses Global CDN). For details, see [Require HTTPS with the HSTS Header](/docs/hsts).
