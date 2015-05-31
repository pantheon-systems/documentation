---
title: Adding HTTPS For Free With CloudFlare
description: Enjoy the protection of HTTPS and other security features using CloudFlare's free DNS service
category:
  - going-live
  - security
authors:
  - joshkoenig
date: 6/1/2015
---

More and more, it's expected that websites run under HTTPS to appear professional, and for any site which uses a CMS, securing administrative login credentials should be a priority. Now that HTTPS is in the mix for search engine rankings, even sites which don't handle sensitive information have good reason to want HTTPS.

Historically, running HTTPS required additional cost and complexity due to the need to obtain a certificate. However, thanks to a concerted effort by many providers, these barriers are being eliminated, and it is now possible for anyone to offer secure encrypted transport as the default for their website. 

This guide will show you how to take advantage of CloudFlare's _free_ HTTPS service for any site on Pantheon, including those using the Personal plan. Best of all, you will be able to use __Full SSL__ mode, which insures that traffic is encrypted end-to-end, without any "air gap".

## Signing up for CloudFlare

For the purposes of this guide we assume that you have a site which is already live on Pantheon, or is ready to be launched. Once that's the case, you'll want to start by signing up for CloudFlare.

When you first register, CloudFlare will direct you immediately towards migrating your domain name. It's best to go ahead with this, and to take the time to use CloudFlare as your DNS provider. Their handy wizard will help you port over your existing settings.

## DNS Configuration

In addition to gratis HTTPS service, Content Distribution, and some nifty security features, CloudFlare also offers the ability to use a CNAME for the "root" domain for your site through something they call [CNAME Flattening](https://blog.cloudflare.com/introducing-cname-flattening-rfc-compliant-cnames-at-a-domains-root/). 

We recommend you take advantage of this feature as it frees you up from being tied to a single IP address, which is inherently risky. Here are some example DNS settings:

![Example DNS Settings](/source/docs/assets/images/cloudflare-dns.png)

In this example we used the `@` symbol to set up the "root" CNAME, and are using the Pantheon-provided `env-site-sitename.pantheon.io` domain as the target.

## CloudFlare Security Settings

The next step is to click over to the "Crypto" page and enable the "SSL with SPDY" option, setting it to **Full** protection mode:

![Enable SSL](/source/docs/assets/images/cloudflare-ssl.png)

This setting will take a few minutes to go into effect as CloudFlare sets up a certificate for you. At the free level, the certificate they provide will be one that is also used for some other domains, but it will be a fully valid cert. 

It's important to use *Full* protection mode. Because Pantheon provides HTTPS service out of the box you can encrypt end-to-end, but because the certificate provided by Pantheon is for the sandbox domain you cannot use the "strict" mode:

![SSL Details](/source/docs/assets/images/cloudflare-ssl-types.png)

However, this free option still provides solid security for your website: the traffic is fully encrypted end-to-end.

## Testing Under HTTPS

At this point you're ready to try loading your site under HTTPS. It's a good idea to set aside time to test your site's appearance and functionality under HTTPS before making it the default mode, as there are some common gotchas associated with this transfer.

To start testing, just open your website normally, and then manually change the "Location" in your browser to start with `https` instead of plain `http`. You should try browsing a number of pages, logging in, etc.

Note: if your browser does not give any response back at all, or you get a "connection terminated", then you probably need to allow a little more time for CloudFlare's free certificate provisioning. 

Another common issue is to have the site load incorrectly due to the presence of insecure content on the page. Most modern browsers won't load CSS or JS files that are included via HTTP on a page that was requested over HTTPS. Getting fully switched to HTTPS usually requires some changes to your CMS settings in order to complete the transition.

## CMS Settings

There are a few CMS-specific settings and techniques you'll want to be aware of when transitioning a site to run securely under HTTPS.

### Drupal

If you're going to run under HTTPS for Drupal, you must set the `$base_url` parameter in `settings.php`. This is generally a best practice (many things can get wonky without a `$base_url`) but it becomes a necessity to prevent issues with CSS and JS failing to load.

The best way to do this on Pantheon is to make use of our environment variables. Here's an example of what you can put in `settings.php`:

    # Set the $base_url parameter if we are running on Pantheon:

    if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
      if ($_ENV['PANTHEON_ENVIRONMENT'] === 'dev') {
        $domain = 'sandbox.mysite.com';
      }
      if ($_ENV['PANTHEON_ENVIRONMENT'] === 'test') {
        $domain = 'staging.mysite.com';
      }
      if ($_ENV['PANTHEON_ENVIRONMENT'] === 'live') {
        $domain = 'www.mysite.com';
      }

      # This is a global variable
      $base_url = 'https://'. $domain;
    }

Pantheon already handles the necessary environment settings to insure that Drupal is aware the site is running under HTTPS and that user session cookies should be secured.

### WordPress

On WordPress, you should similarly set the `WP_HOME` and `WP_SITEURL` constants in your `wp-config.php`:

    if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
      if ($_ENV['PANTHEON_ENVIRONMENT'] === 'dev') {
        $domain = 'sandbox.mysite.com';
      }
      if ($_ENV['PANTHEON_ENVIRONMENT'] === 'test') {
        $domain = 'staging.mysite.com';
      }
      if ($_ENV['PANTHEON_ENVIRONMENT'] === 'live') {
        $domain = 'www.mysite.com';
      }

      # Define constants
      define('WP_HOME', 'https://' . $domain);
      define('WP_SITEURL', 'https://' . $domain);
    }

Also, you may have a number of stored references to `http` links stored in your WordPress database. These can be updated using the search/replace function available in WP-CLI, which is bundled on the platform and [accessible via the command line](/docs/guides/create-a-wordpress-site-from-the-commandline-with-terminus-and-wp-cli/):


    terminus wp search-replace http://www.mysite.com https://www.mysite.com --site=mysite --env=live


You can find more about the power of WP-CLI's features at [wp-cli.org](http://wp-cli.org/).

## Standardizing All Traffic On HTTPS

The final step for your transition is to standardize all traffic under HTTPS. This is a much better option than running the site in a "mixed mode." It is less complex and more secure, and thanks to modern crypto technologies there is no performance penalty.

In order to go all-in, you will need to configure your site to redirect any requests that are unencrypted over to HTTPS. One way to do this is via CloudFlare's "Page Rules" feature:

![CloudFlare Page Rules](/source/docs/assets/images/cloudflare-always-https.png)

By setting up a blanket page rule to match all urls and apply the "Always HTTPS" parameter, CloudFlare will handle redirecting users.

You can also achieve this by writing your own redirection code into your `settings.php` or `wp-config.php`. Assuming you use one of the code blocks above which sets up a `$domain` parameter, the following should work for you:

    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
         ($_SERVER['HTTP_X_FORWARDED_PROTO'] != 'https' || 
         $_SERVER['HTTP_HOST'] != $domain)) {
      header('HTTP/1.0 301 Moved Permanently');
      header('Location: ' . $base_url . $_SERVER['REQUEST_URI']);
      header('Cache-Control: public, max-age=3600');
      exit();
    }

There are a few things worth noting in the above example:

1. Checking `isset($_SERVER['PANTHEON_ENVIRONMENT'])` is important because this will only be `TRUE` if the request is running as a result of a web request through Pantheon's php container matrix. This prevents redirects from interrupting command-line operations.
2. `$_SERVER['HTTP_X_FORWARDED_PROTO']` is PHP's way of exposing the `X-Forwarded-Proto` HTTP header, an internet standard for communicating when another "upstream" service has terminated HTTPS.
3. Adding the `header('Cache-Control: public, max-age=3600')` allows Pantheon's Edge (and CloudFlare, further upstream) to cache the redirect, which is always nice.

Depending on whether you like to control these things directly with code, or prefer to use a tool like CloudFlare, you can choose your implementation. It's probably wisest to pick one route, however, to avoid future confusion.

## Alternative Methods For HTTPS

Because of the structure of our network, we won't be able to offer reduced-cost HTTPS service any time soon, so for Personal sites this is the best way to get HTTPS service. However, for developers who want to run their site securely but don't want to (or can't) make use of CloudFlare, there are options. 

This basic technique — terminating your HTTPS elsewhere and then "backending" to Pantheon's provided certificatn — can be used with other services, including your own infrastructure. Here's an example of [an nginx config that does essentially the same thing](https://gist.github.com/caktux/00a2161b5d849335e644).

As the movement for **Encryption Everywhere** (e.g. [Let's Encrypt](https://letsencrypt.org/)) picks up steam, we look forward to being able to support many fine avenues for running sites under HTTPS at a low cost.