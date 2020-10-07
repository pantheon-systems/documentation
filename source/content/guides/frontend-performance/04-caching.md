---
title: Frontend Performance 
subtitle: Caching
description: Caching strategies for improved performance.
anchorid: caching
layout: guide
categories: [performance]
tags: [measure, traffic]
type: guide
permalink: docs/guides/frontend-performance/caching
editpath: frontend-performance/04-caching.md
image: CDN-speedTest-docs-guide
reviewed: "2020-10-10"
---

Caching topics.

## Page Caching

Varnish and page caching.

### Pantheon's Global CDN
Reduce page rendering speeds from seconds to sub-seconds by caching content _and_ resources alike across 40+ points of presence (POPs) on Pantheon's Global CDN.

<TabList>

<Tab title="Global" id="globaltab1" active={true}>

![Global CDN Map](../../images/guides/front-end-performance/CDN-map.png)

</Tab>

<Tab title="N. America" id="natab1">

![North America CDN Map](../../images/guides/front-end-performance/CDN-map-NA.png)
<p class="pop-desc">Ashburn (x2), Atlanta (x2), Boston, Chicago (x2), Dallas, Denver, Los Angeles (x2), Miami, Minneapolis, Montreal, New York (x2), San Jose (x2), Seattle, Toronto</p>

</Tab>

<Tab title="S. America" id="satab1">

![South America CDN Map](../../images/guides/front-end-performance/CDN-map-SA.png)
<p class="pop-desc">São Paulo, Rio de Janeiro</p>

</Tab>

<Tab title="Africa" id="aftab1">

![Africa CDN Map](../../images/guides/front-end-performance/CDN-map-AF.png)
<p class="pop-desc">Cape Town, Johannesburg</p>

</Tab>

<Tab title="Europe" id="eutab1">

![Europe CDN Map](../../images/guides/front-end-performance/CDN-map-EU.png)
<p class="pop-desc">Amsterdam, Frankfurt (x2), London (x2), Madrid, Paris, Stockholm</p>

</Tab>

<Tab title="Asia" id="asiatab1">

![Asia CDN Map](../../images/guides/front-end-performance/CDN-map-Asia.png)
<p class="pop-desc">Dubai, Hong Kong, Osaka, Singapore, Tokyo (x2)</p>

</Tab>

<Tab title="Australia & New Zealand" id="austab1">

![Australia CDN Map](../../images/guides/front-end-performance/CDN-map-AUZ.png)
<p class="pop-desc">Auckland, Brisbane, Melbourne, Perth, Sydney, Wellington</p>

</Tab>

</TabList>

Each POP caches all the resources (e.g., CSS and JavaScript) needed to render the page, including the HTML output. Using the closest physical POP to serve a request means the visitor doesn't have to wait as long to see the first meaningful paint (TTFP).

### Full Page Caching

Pantheon is designed to store cached copies of the full HTML pages coming out of Drupal and WordPress core by default. If non-logged in visitors to your site are not getting a near-instant delivery of HTML from the cache in our Global CDN, something is wrong. Full page cache depends on the HTTP Headers coming out of your site.

### Review Response Caching
The following describes the expected cache behavior for sites running the Pantheon Advanced Page Cache [WordPress plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/) or [Drupal module](https://www.drupal.org/project/pantheon_advanced_page_cache). If you find that your page is not served from cache with similar headers and values, examine the response using Google's Developer tools and consult the next section for common cache busters and potential culprits.

<dt>age</dt>
<dd >The number of seconds cache has been available to serve the request. Any number greater than zero indicates that this response was served to the browser from cache.</dd>
<br />
<dt>cache-control</dt>
<dd >This header should include a `max-age` that is the maximum number of seconds that the cache can be kept.</dd>
<br />
<dt>surrogate-key-raw</dt>
<dd>Metadata including the the content IDs for what was displayed on this page. This metadata instructs this page to be cleared from cache when any of those posts are saved again. This header is only present when you specifically add a debugging header (`Pantheon-Debug:1`) to your request. You can use a browser extension to add the debugging header (here are some extensions for [Chrome](https://chrome.google.com/webstore/search/modify%20header) and [Firefox](https://addons.mozilla.org/en-US/firefox/search/?q=modify+header)).</dd>
<br />
<dt>x-served-by</dt>
<dd>This header indicates which POP your response came from. Our primary infrastructure is in the Midwest of the United States so the first item you will probably see on this list will include "ORD" for the O'Hare airport in Chicago. If you're physically located in Austin you will also see DFW, indicating the response went from the primary datacenter to a cached copy in Chicago to a cached copy in Dallas.</dd>

![Chrome network headers](../../images/guides/front-end-performance/chrome-network-headers.png)

<Accordion title="Google's Developer Tools" id="dev-tools" icon="lightbulb">

Examine the HTTP headers for the response using Chrome's Developer tools:

![Check headers in chrome](../../images/guides/front-end-performance/inspect-network.gif)

1. Right click somewhere on the page.
2. Select **Inspect**.
3. Open the **Network** tab, then refresh the page. This allows you to review all of the HTTP requests necessary to display your page.
4. Select the first row, which is a request for the initial HTML file.
5. Look for the **Age** header. Any number greater than zero indicates that this response was served to the browser from cache.

</Accordion>

## Troubleshoot Caching Issues

### Cookies
Cookies are included in the response headers we examined previously. They can include sessions for authenticated traffic to logged in users, which can invalidate cache. For WordPress, it's common for plugins to add their own cookies in such a way that breaks full-page caching.

For reference, here are all the cookie patterns configured to bust cache across Pantheon's Global CDN:

```
NO_CACHE
S+ESS[a-z0-9]+
fbs[a-z0-9_]+
SimpleSAML[A-Za-z]+
PHPSESSID
wordpress[A-Za-z0-9_]*
wp-[A-Za-z0-9_]+
comment_author_[a-z0-9_]+
duo_wordpress_auth_cookie
duo_secure_wordpress_auth_cookie
bp_completed_create_steps # BuddyPress cookie used when creating groups
bp_new_group_id # BuddyPress cookie used when creating groups
wp-resetpass-[A-Za-z0-9_]+
(wp_)?woocommerce[A-Za-z0-9_-]+
```

You can see the cookies used on your site under the **Application** tab in Chrome's Developer Tools.

### Unintentional Cache Invalidation
Try to walk yourself through the content rendering tree, considering any custom or contrib code that may be affecting the directives set in the HTTP headers of a response.

<TabList>

<Tab title="WordPress" id="wordpress-max-age" active={true}>

There could be an existing snippet assumed to disable caching for a single entity when in reality it's disabling caching for the entire page:

```php
/**
* This is an example of accidentally bypassing cache when rendering a response.
* Don't use this without proper conditionals wrapped around the header function.
**/
add_action( 'send_headers', 'add_header_maxage' );
function add_header_maxage() {
  // some logic that accidentally invalidates full-page cache
    header('Cache Control: max-age=0');
}
```

See the [WordPress documentation](https://codex.wordpress.org/Plugin_API/Action_Reference/send_headers) for more details.

</Tab>

<Tab title="Drupal" id="drupal-max-age">

There could be an existing snippet assumed to disable caching for a single block when in reality it's disabling caching for the entire page:

```php
/**
* This is an example of accidentally bypassing cache when rendering a response.
* Don't use this without proper conditionals wrapped around it.
**/
// some logic that accidentally invalidates full-page cache
$form['#cache'] = ['max-age' => 0];
```
See the [Drupal documentation](https://www.drupal.org/docs/8/api/render-api/cacheability-of-render-arrays) for more details. You can search your custom code for `#cache` to find places where you've interacted with the Cache API.

</Tab>

</TabList>

### Incorrect Configuration
Working across many environments presents opportunities for configuration changes to get lost or for configurations to never be set correctly in the first place. Using tools like [WP-CFM](https://wordpress.org/plugins/wp-cfm/) and Drupal 8's [Configuration Management System](https://www.drupal.org/docs/8/configuration-management/managing-your-sites-configuration) to track configuration alongside code will mitigate these issues, but mistakes do happen. Double-check your site's default caching configurations:


<TabList>

<Tab title="WordPress" id="wp-config-get" active={true}>

The Pantheon Page Cache plugin is already included by our upstream as a Must-Use plugin. Check the plugin settings to make sure you're setting the desired TTL:

1. From the WordPress dashboard, click **Settings** > **Pantheon Page Cache**.
2. Review the Time to Live, which translates to `max-age`.
3. We recommend setting **Default Time to Live (TTL)** to a higher value, like 86400 seconds (one day):

![Pantheon Cache Plugin](../../images/guides/front-end-performance/pantheon-page-cache.png)

</Tab>

<Tab title="Drupal" id="drupal-config-get">

In Drupal it is very easy to turn off page caching and forget to turn it back on.

1. Navigate to **Configuration** > **Development** > **Performance** within Drupal's Admin Interface.
2. Review **Page cache maximum age**:

![Drupal Performance settings](../../images/guides/front-end-performance/d8-cache.png)

The Drupal 8 default setting is 10 minutes. You can set much higher cache max ages when using the Pantheon Advanced Page Cache Module to clear specific pages when your underlying data is updated.

</Tab>

</TabList>

## Optimize Non-Cached Responses
Improve performance on longer trips to and from the browser for instances you _want_ to bypass cache and go straight to the application:

### Upgrade to PHP7
If you haven't done so already, [make the switch to PHP7](/php-versions). Upgrading your site's PHP version will improve the security, performance, and supportability of your site.

See our blog post for an example of [62% performance gains after upgrading](https://pantheon.io/blog/php-7-now-available-all-sites-pantheon).

### Enable Redis Object Caching
Sites loading a lot of content can benefit from an object cache like Redis. For details, see [Installing Redis on Drupal or WordPress](/redis).
