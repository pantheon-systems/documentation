---
title: Bots and Indexing on Pantheon
description: Information on managing bots and indexing while avoiding performance degradation on your Pantheon WordPress or Drupal site.
tags: [measure, traffic]
contenttype: [doc]
innav: [true]
categories: [optimize]
cms: [wordpress, drupal]
audience: [development]
product: [--]
integration: [--]
---

Bots are part of every public-facing website's lifecycle. We wouldn't be able to find a thing on the internet without them! Bots perform the hard work taken for granted when browsing the multitudes of indexed search results from any given search engine. In the wrong hands, bots can become nagging nuisances slowing down or even taking down your site.

## Bots in My Logs: Real World Scenarios and Identifiers

Bots don't browse like humans. Analyzing access patterns in the nginx log is one of the quickest ways to determine the presence of bots.

### Rapid Fire Requests/Duplicates

In the log snippet below, there are multiple requests coming in for the same path in rapid fire succession. The time stamp reflects 5 identical requests at the same millisecond. You should investigate these requests.

```none
127.0.0.1 - - [11/Nov/2013:19:05:24 +0000] "POST /index.php?q=comment/reply/545 HTTP/1.0" 500 588 "http://www.mywebsite.com/node/545?page=399" "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; MRA 4.3 (build 51720))" 0.848 "195.200.54.200, 10.200.200.21, ::ffff:127.0.0.1,::ffff:127.0.0.1"
unix: - - [11/Nov/2013:19:05:24 +0000] "POST /index.php?q=comment/reply/545 HTTP/1.0" 500 588 "http://www.mywebsite.com/node/545?page=399" "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; MRA 4.3 (build 51720))" 1.059 "195.200.54.200, 10.200.200.21, ::ffff:127.0.0.1,::ffff:127.0.0.1"
127.0.0.1 - - [11/Nov/2013:19:05:24 +0000] "POST /index.php?q=comment/reply/545 HTTP/1.0" 500 588 "http://www.mywebsite.com/node/545?page=399" "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; MRA 4.3 (build 51720))" 1.059 "195.200.54.200, 10.200.200.21, ::ffff:127.0.0.1,::ffff:127.0.0.1"
unix: - - [11/Nov/2013:19:05:24 +0000] "POST /index.php?q=comment/reply/545 HTTP/1.0" 500 588 "http://www.mywebsite.com/node/545?page=399" "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; MRA 4.3 (build 51720))" 1.271 "195.200.54.200, 10.200.200.21, ::ffff:127.0.0.1,::ffff:127.0.0.1"
127.0.0.1 - - [11/Nov/2013:19:05:24 +0000] "POST /index.php?q=comment/reply/545 HTTP/1.0" 500 588 "http://www.mywebsite.com/node/545?page=399" "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; MRA 4.3 (build 51720))" 1.271 "195.200.54.200, 10.200.200.21, ::ffff:127.0.0.1,::ffff:127.0.0.1"
unix:\xC8\xFB\x7F - - [11/Nov/2013:19:05:24 +0000] "POST /index.php?q=comment/reply/545 HTTP/1.0" 500 588 "http://www.mywebsite.com/node/545?page=399" "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; MRA 4.3 (build 51720))" 1.481 "195.200.54.200, 10.200.200.21, ::ffff:127.0.0.1,::ffff:127.0.0.1"
127.0.0.1 - - [11/Nov/2013:19:05:24 +0000] "POST /index.php?q=comment/reply/545 HTTP/1.0" 500 588 "http://www.mywebsite.com/node/545?page=399" "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; MRA 4.3 (build 51720))" 1.482 "195.200.54.200, 10.200.200.21, ::ffff:127.0.0.1,::ffff:127.0.0.1"
```

### Bots Converging on Erroring Pages

Some legitimate [bots/crawlers/proxies](https://useragent.openadmintools.com/) (such as BingBot or AdsBotGoogle) will identify themselves. Since search-indexing is desirable for most sites, tread carefully in order to avoid wreaking havoc on a site's SEO. That said, there may be instances in which crawlers/spiders converge on a page that is erroring out ( [502s](/guides/errors-and-server-responses) in the example below). These repetitive requests can increase the pageload issues by putting more load on the server. Investigate these errors immediately. When the error has been fixed, the bots/crawlers will no longer be hung-up on the give path.

```none
127.0.0.1 - - [26/Jul/2013:15:27:38 +0000] "GET /index.php?q=shop/kits/shebang-kit HTTP/1.0" 502 166 "-" "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" 14.188 "157.56.93.49, 10.183.252.21, 127.0.0.1,127.0.0.1"
unix: - - [26/Jul/2013:15:27:38 +0000] "GET /index.php?q=shop/kits/shebang-kit HTTP/1.0" 502 166 "-" "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" 14.476 "157.56.93.49, 10.183.252.21, 127.0.0.1,127.0.0.1"
127.0.0.1 - - [26/Jul/2013:15:27:38 +0000] "GET /index.php?q=shop/kits/shebang-kit HTTP/1.0" 502 166 "-" "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" 14.477 "157.56.93.49, 10.183.252.21, 127.0.0.1,127.0.0.1"
127.0.0.1 - - [26/Jul/2013:15:26:37 +0000] "GET /index.php?q=gush/content/name-pimp-november-2008&page=17 HTTP/1.0" 502 166 "-" "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" 14.722 "157.56.93.49, 10.183.252.21, 127.0.0.1,127.0.0.1"
10.208.128.192 - - [26/Jul/2013:15:26:37 +0000] "GET /gush/content/name-pimp-november-2008?page=17 HTTP/1.1" 502 166 "-" "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" 14.999 "157.56.93.49, 10.183.252.21, 127.0.0.1,127.0.0.1"
unix: - - [26/Jul/2013:15:26:37 +0000] "GET /index.php?q=gush/content/name-pimp-november-2008&page=17 HTTP/1.0" 502 166 "-" "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" 14.998 "157.56.93.49, 10.183.252.21, 127.0.0.1,127.0.0.1"
10.208.128.192 - - [26/Jul/2013:15:31:03 +0000] "GET / HTTP/1.1" 500 109 "-" "checks.panopta.com" 0.126 "5.63.145.72, 10.183.252.21, 127.0.0.1,127.0.0.1"
```

## Indexing Your Pantheon Site

While Drupal and WordPress both generate their own `robots.txt` file by default, a custom or CMS-standard `robots.txt` will only work in Live environments of a paid site with a custom domain. It is important to note that each of your site environments have a `robots.txt` file associated with the [platform domain](/guides/domains) (e.g. `dev-site-name.pantheonsite.io`), or [custom Vanity domain](/guides/domains/vanity-domains) (e.g. `dev-sites.myagency.com`), that contains the following:

```none:title=robots.txt
# Pantheon's documentation on robots.txt: https://docs.pantheon.io/bots-and-indexing/
User-agent: *
Allow: /

User-agent: RavenCrawler
User-agent: rogerbot
User-agent: dotbot
User-agent: SemrushBot
User-agent: SiteAuditBot
User-agent: SplitSignalBot
User-agent: PowerMapper
User-agent: Swiftbot
Allow: /
```

Additionally, Pantheon's edge layer adds the [`X-Robots-Tag: noindex` HTTP header](https://developers.google.com/search/reference/robots_meta_tag) when serving requests from platform domains (e.g. `live-site-name.pantheonsite.io`). This instructs most bots/crawlers not to index the page and prevents it from being returned in search results.

### Indexing Before You Launch

The `pantheonsite.io` domains are intended for development use and cannot be used for production. Adding sub-domains (i.e. `dev.example.com`, `test.example.com`) for DEV or TEST  will remove the `X-Robots-Tag: noindex` header only, but still serve the Pantheon `robots.txt` from the platform domain.

To support pre-launch SEO and site search testing, we allow the following bots access to platform domains:

- [Site Auditor](https://raven.zendesk.com/hc/en-us/articles/202346870) by Raven
- [SEMrush](https://www.semrush.com/bot/)
- [RogerBot](https://moz.com/help/guides/moz-procedures/what-is-rogerbot) by Moz
- [Dotbot](https://moz.com/help/guides/moz-procedures/dotbot) by Moz
- [PowerMapper](https://www.powermapper.com/products/mapper/)
- [Swiftbot](https://swiftype.com/swiftbot) by Swiftype

Some tools (like [Siteimprove](https://siteimprove.com/) or [ScreamingFrog](https://www.screamingfrog.co.uk/seo-spider/)) can be set to ignore `robots.txt` when scanning. If you're testing links or SEO with other tools, you may request the addition of the tool to our `robots.txt` file by [contacting support](/guides/support/faq/#can-i-request-a-feature-be-added-to-the-platform) to create a feature request. Otherwise, you can connect a custom domain (like `seo.example.com`) to the Live environment and test your links following the alternative domain.

If you run SEO toolsets locally, you can utilize an `/etc/hosts` file entry on your local development box to spoof your production domain on Pantheon:

<Partial file="_hosts-file.md" />

You can index your site under your production domain once it's added to the Live environment. There are many contrib module options available for creating sitemaps for Drupal, including [XMLSiteMap](https://drupal.org/project/xmlsitemap) and [Site_Map](https://drupal.org/project/site_map). WordPress users can install the [Google XML Sitemaps](https://wordpress.org/plugins/google-sitemap-generator/) or [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/) plugins, which will maintain sitemap updates automatically. It is up to you to configure the extensions to work as you desire. Pantheon does not offer support for Drupal modules or WordPress plugins.

## Robots.txt with Composer and Drupal

When using Drupal scaffolding, the root `web/robots.txt` file will be overwritten on each `composer install`, whether it is managed locally or on Pantheon using Integrated Composer. For more information, refer to [Using Drupal's Composer Scaffold](https://www.drupal.org/docs/develop/using-composer/using-drupals-composer-scaffold).

Modifications are made in a separate file that is appended to the existing `robots.txt`. The path and name of the file are arbitrary. In the example below, we'll create a new file in an assets folder located at the root of the website host to which it applies.

In the terminal, run the following command in the root directory of your local Git repository:

```bash{promptUser: user}
touch assets/my-robots-additions.txt
```

You can now add your changes into that newly created file using a text editor.

Modify the site's root `composer.json` file to append this new file when copying Drupal's scaffolding. The `...` represents existing content. If you already have `"file-mapping"`, content can be added to the section.

```json:title=composer.json
"file-mapping": {
    ...
    "[web-root]/robots.txt": {
        "append": "assets/my-robots-additions.txt"
    }
}
```

You can test this locally using `composer install`. If successful, use the following commands to commit changes:

```bash{promptUser: user}
git add assets/my-robots-additions.txt composer.json
git commit -m "Append robots.txt changes via composer"
```

## Troubleshooting

### Robots.txt conflicting with Composer

The default Drupal upstream includes a line in `.gitignore` to exclude tracking `web/robots.txt` because it is automatically generated during `composer install`. Occasionally, this is removed and modifications to `robots.txt` are committed. This will cause a merge conflict when attempting to run composer, and will cause builds to fail on Integrated Composer.

Move the accidentally tracked file out of the repository and into `.gitignore`. You may want to pull any changes you need out of this file and in to a temporary text file for later use.

In the terminal, run the following commands in the root directory of your local Git repository:

```bash{promptUser: user}
git rm --cached web/robots.txt
git commit -m "Remove auto-generated robots.txt"
```

In your text editor add the following to `.gitignore`:
```
/web/robots.txt
```

Commit that change using the following command:

```bash{promptUser: user}
git add .gitignore
git commit -m "Do not track changes to generated robots.txt"
```

You can now proceed with the recommended method of using [Robots.txt with Composer and Drupal](/bots-and-indexing#robotstxt-with-composer-and-drupal)

### Sitemaps Produce a White Screen of Death (WSOD)

Some modules or plugins are configured by default to fetch all URLs at once during sitemap generation which can result in a blank white page (WSOD) due to exceeding PHP's memory limit. To resolve this issue, adjust the plugin or module configuration so that URLs are fetched individually instead of all at once.

For example, if you have a Drupal site using the [XMLSiteMap](https://drupal.org/project/xmlsitemap) module, navigate to `admin/config/search/xmlsitemap/settings` and uncheck **Prefetch URL aliases during sitemap generation**. Save the configuration and clear caches for the Live environment on the Pantheon Dashboard or via [Terminus](/terminus):

```bash{promptUser: user}
terminus env:clear-cache
```

Props to [Will Hall](https://twitter.com/HN_Will) for highlighting this solution in a related [blog post](https://www.willhallonline.co.uk/blog/get-xml-sitemaps-working-pantheon).

### Legacy Sitemap Submissions Generating 404s

Sitemaps can (and should) be submitted directly to Google Webmaster Tools. However, if there are legacy submissions out there generating 404s, you'll need to redirect via PHP within `wp-config.php` or `settings.php`. For example, WordPress sites running the [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/) plugin can use the following:

```php
// 301 Redirect from /sitemap.xml to /sitemap_index.xml
if (($_SERVER['REQUEST_URI'] == '/sitemap.xml') &&
  (php_sapi_name() != "cli")) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location: /sitemap_index.xml');
  exit();
}
```

For more examples of redirecting via PHP, see [Configure Redirects](/guides/redirect).

### Incorrect robots.txt Output in WordPress

In WordPress, do not enable **Discourage search engines from indexing this site** on Dev or Test environments. This option is set in **Settings** > **Reading** > **Search Engine Visibility** in the WordPress Admin Dashboard.

This setting creates a built-in `robots.txt` file that disallows or blocks crawlers. While the file applied by the platform normally overrides it, it doesn't when there's a trailing slash on the URL pointing to `robots.txt`.

As a workaround, you can override the output by creating your custom filter for `robots_txt`. You can add this as a custom plugin, or an entry in your theme's `functions.php` file:

```php:title=functions.php
add_filter('robots_txt', 'custom_robots_txt', 10,  2);

function custom_robots_txt($output, $public) {

    $robots_txt =  "User-agent: * \n";
    $robots_txt .=  "Sitemap: https://www.example.com/sitemap_index.xml \n";
    $robots_txt .=  "Disallow: /secure/ ";
    // add more $robots_txt .= for each line

    return $robots_txt;
}
```
