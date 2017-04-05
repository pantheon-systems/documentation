---
title: Adding HTTPS For Free With Cloudflare
description: Add HTTPS and other security features to your Pantheon Drupal or WordPress site using Cloudflare's free DNS service.
tags: [siteintegrations, security, dns]
categories: []
type: guide
permalink: docs/guides/:basename/
contributors:
  - joshkoenig
  - iameap
  - suzannealdrich
date: 6/1/2015
---
More and more, it's expected that websites run under HTTPS to appear professional, and for any site which uses a CMS, securing administrative login credentials should be a priority. Now that HTTPS is in the mix for search engine rankings, even sites that don't handle sensitive information have good reason to want HTTPS.

Historically, running HTTPS required additional cost and complexity due to the need to obtain a certificate. However, thanks to a concerted effort by many providers, these barriers are being eliminated, and it is now possible for anyone to offer secure encrypted transport as the default for their website.

This guide will show you how to take advantage of Cloudflare's free HTTPS service for any site on Pantheon, including those using the Personal plan. Best of all, you will be able to use __Full SSL__ mode, which insures that traffic is encrypted end-to-end, without any "air gap".

## Sign up for Cloudflare

For the purposes of this guide, we assume you have a site that is already live on Pantheon, or one that is ready to be launched.

When you first register, Cloudflare will direct you immediately towards migrating your domain name. It's best to go ahead with this and to take the time to use Cloudflare as your DNS provider. Their handy wizard will help you port over your existing settings.

## DNS Configuration

In addition to gratis HTTPS service, content distribution, and many nifty security features, Cloudflare also offers the ability to use a CNAME for the "root" domain for your site through something they call [CNAME Flattening](https://blog.cloudflare.com/introducing-cname-flattening-rfc-compliant-cnames-at-a-domains-root/).

We recommend you take advantage of this feature as it frees you up from being tied to a single IP address, which is inherently risky. In addition, using CNAME Flattening is the only way to standardize on HTTPS with a root domain. Here are some example DNS settings:

![Example DNS Settings](/source/docs/assets/images/cloudflare-dns1.png)

In this example we used the `@` symbol to set up the "root" CNAME and are using the Pantheon-provided `env-site-sitename.pantheonsite.io` domain as the target. In the case of legacy gotpantheon.com sites, use `edge.live.getpantheon.com` for the CNAME target of the root record.

As this example shows, you can set additional CNAME records for your Dev and Test environments, then add them to your Pantheon Dashboard using the [Domains Tab](/docs/domains). That is optional, but you will see references to these additional domains later on in the CMS configuration instructions.

## Cloudflare Security Settings

The next step is to go to the **Crypto** page and set the SSL option to **Full** protection mode:

![Enable SSL](/source/docs/assets/images/cloudflare-ssl.png)

SSL certificate issuance may take up to 24 hours as Cloudflare sets up a certificate for you. At the free level, the certificate they provide will be one that is also used for some other domains, but it will be a fully valid certificate.

It's important to use __Full__ protection mode.  Pantheon provides HTTPS service out of the box so you can encrypt end-to-end, but because the certificate provided by Pantheon is for the default domain (e.g. `live-yoursite.pantheonsite.io`) you cannot use the __Full (strict)__ mode:

![SSL Details](/source/docs/assets/images/cloudflare-ssl-types.png)

While __Full__ mode is not the highest security setting, it is available for free, and provides much better security for your website compared to __Flexible__ as the traffic is fully encrypted end-to-end.

Customers wanting to use Cloudflare in __Full (strict)__ mode can do so, but incurs additional costs: they must purchase their own certificate and upgrade their Pantheon site to the Professional service level. When using __Full (strict)__, follow the regular directions on [adding HTTPS to the platform](https://pantheon.io/docs/enable-https/), particularly important is that you must use A records to the load balancer IP rather than the CNAME flattening discussed in the rest of this article.

## Testing Under HTTPS

At this point you're ready to try loading your site under HTTPS. It's a good idea to set aside time to test your site's appearance and functionality under HTTPS before making it the default mode, as there are some common gotchas associated with this transfer.

To start testing, open your website normally, and manually change the "Location" in your browser to start with `https` instead of plain `http`. You should try browsing a number of pages, logging in, etc.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>If your browser does not give any response back at all, or you get a "connection terminated" error, you probably need to allow a little more time for Cloudflare's free certificate provisioning.</p></div>

Another common issue is to have the site load incorrectly due to the presence of insecure content on the page. Most modern browsers won't load CSS or JS files that are included via HTTP on a page that was requested over HTTPS. Getting fully switched to HTTPS usually requires some changes to your CMS settings in order to complete the transition.

## CMS Settings

There are a few CMS-specific settings and techniques you'll want to be aware of when transitioning a site to run securely under HTTPS. As a best-practice, we recommend that you standardize on your production domain in addition to HTTPS to prevent confusion.

Pantheon's www-redirection service does not apply to sites using HTTPS. You'll need to add logic within the site's `settings.php` or `wp-config.php` file in order to standardize on a domain.

### Drupal

If you're going to run under HTTPS for Drupal, you must set the `$base_url` parameter in `settings.php`. This is generally a best practice (many things can get wonky without a `$base_url`) but it becomes a necessity to prevent issues with CSS and JS failing to load.

The best way to do this on Pantheon is to make use of our environment variables. Here's an example of what you can put in `settings.php`, again assuming you have custom domains for Dev and Test:

    # Set the $base_url parameter if we are running on Pantheon:

    if (defined('PANTHEON_ENVIRONMENT')) {
      if (PANTHEON_ENVIRONMENT == 'dev') {
        $domain = 'sandbox.mysite.com';
      }
      else if (PANTHEON_ENVIRONMENT == 'test') {
        $domain = 'staging.mysite.com';
      }
      else if (PANTHEON_ENVIRONMENT == 'live') {
        $domain = 'www.mysite.com';
      }
      else {
        # Fallback value for multidev or other environments.
        # This covers environment-sitename.pantheonsite.io domains
        # that are generated per environment.
        $domain = $_SERVER['HTTP_HOST'];
      }

      # This global variable determines the base for all URLs in Drupal.
      $base_url = 'https://'. $domain;
    }

Pantheon already handles the necessary environment settings to ensure that Drupal is aware the site is running under HTTPS and that user session cookies should be secured.

### WordPress

On WordPress, you should similarly set the `WP_HOME` and `WP_SITEURL` constants in your `wp-config.php`. Note that you will need to _replace_ the existing code that sets these constants, since constants can only be defined once:

    if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
      if ($_ENV['PANTHEON_ENVIRONMENT'] === 'dev'):
        $domain = 'sandbox.mysite.com';
      elseif ($_ENV['PANTHEON_ENVIRONMENT'] === 'test'):
        $domain = 'staging.mysite.com';
      elseif ($_ENV['PANTHEON_ENVIRONMENT'] === 'live'):
        $domain = 'www.mysite.com';
      else:
        # Fallback value for multidev or other environments.
        # This covers environment-sitename.pantheonsite.io domains
        # that are generated per environment.
        $domain = $_SERVER['HTTP_HOST'];
      endif;

      # Define constants for WordPress on Pantheon.
      define('WP_HOME', 'https://' . $domain);
      define('WP_SITEURL', 'https://' . $domain);

    }

Also, you may have a number of stored references to `http` links stored in your WordPress database. These can be updated using the search/replace function available in WP-CLI, which is bundled on the platform and [accessible via the command line](/docs/guides/wordpress-commandline/):


```bash
terminus wp <site>.<env> -- search-replace http://www.mysite.com https://www.mysite.com
```

You can find more about the power of WP-CLI's features at [wp-cli.org](http://wp-cli.org/).

## Standardizing All Traffic On HTTPS

The final step is to standardize all traffic under HTTPS. This is a much better option than running the site in a "mixed mode". It is less complex and more secure, and thanks to modern crypto technologies, there is no performance penalty.

In order to go all-in, you will need to configure your site to redirect any requests that are unencrypted over to HTTPS. One way to do this is via Cloudflare's __Page Rules__ feature:

![Cloudflare Page Rules](/source/docs/assets/images/cloudflare-always-https.png)

By setting up a blanket page rule to match all URLs and apply the __Always HTTPS__ parameter, Cloudflare redirect browsers making HTTP requests to HTTPS.

You can also achieve this by writing your own redirection code into your `settings.php` or `wp-config.php`. Assuming you use one of the code blocks above which sets up a `$domain` parameter, the following should work for you:

     if (isset($_SERVER['PANTHEON_ENVIRONMENT']) && (php_sapi_name() != "cli")) {
       if ($_SERVER['HTTP_HOST'] != $domain ||
       !isset($_SERVER['HTTP_X_SSL']) || $_SERVER['HTTP_X_SSL'] != 'ON' ) {
         header('HTTP/1.0 301 Moved Permanently');
         header('Location: https://' . $domain . $_SERVER['REQUEST_URI']);
         header('Cache-Control: public, max-age=3600');
         exit();
       }
     }

There are a few things worth noting in the above example:

1. This technique has the added benefit of insuring that any visitor who somehow gets a link to the `env-sitename.pantheonsite.io` domain will be immediately bounced to your proper production hostname.
2. Checking `isset($_SERVER['PANTHEON_ENVIRONMENT'])` is important because this will only be `TRUE` if the request is running as a result of a web request through Pantheon's PHP container matrix. This prevents redirects from interrupting command-line operations.
3. Adding the `header('Cache-Control: public, max-age=3600')` allows Pantheon's Edge (and Cloudflare, further upstream) to cache the redirect, which is always nice.

Depending on whether you like to control these things directly with code or prefer to use a tool like Cloudflare, as well as how concerned you are with `pantheonsite.io` domains potentially "leaking", you can choose your implementation. It's probably wisest to pick one route to avoid future confusion.

## Compatibility and Limitations

Cloudflare's free HTTPS service is compatible with browsers and clients that support server name indication (SNI), an extension of the TLS protocol. Whereas traditionally, a single IP address is bound to a single certificate, SNI allows a server to present multiple certificates across multiple domains from the same IP address.

Although SNI allows services like Cloudflare to economically offer HTTPS for free at scale, its support is not universal. Below are some notable incompatibilities:

* Any version of Internet Explorer or Safari on Windows XP
* Versions of Chrome prior to 6
* Versions of Firefox prior to 2.0
* Versions of iOS 3 and older
* Versions of Android 2.x and older
* The New Relic Pro [availability monitoring service](https://docs.newrelic.com/docs/alerts/alert-policies/downtime-alerts/availability-monitoring#limits)

Or check this [more complete compatibility list](http://en.wikipedia.org/wiki/Server_Name_Indication#Implementation).

## Alternative Methods For HTTPS

Because of the structure of our network, we won't be able to offer reduced-cost HTTPS service any time soon, so for Personal sites this is the best way to get HTTPS service. However, for developers who want to run their site securely but don't want to (or can't) make use of Cloudflare, there are options.

This basic technique — terminating your HTTPS elsewhere and then "backending" to Pantheon's provided certificate — can be used with other services, including your own infrastructure. Here's an example of [an nginx config that does essentially the same thing](https://gist.github.com/caktux/00a2161b5d849335e644).

As the movement for **encryption everywhere** (e.g. [Let's Encrypt](https://letsencrypt.org/)) picks up steam, we look forward to being able to support many fine avenues for running sites under HTTPS at a low cost.
