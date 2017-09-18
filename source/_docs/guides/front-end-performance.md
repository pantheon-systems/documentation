---
title: Front End Performance
description: Learn how to ace an online speed test with Pantheon's Global CDN.
tags: [siteintegrations, moreguides]
categories: []
type: guide
image: CDN-speedTest-docs-guide
permalink: docs/guides/:basename/
contributors:
  - tessak22
  - stevector
  - ataylorme
  - rachelwhitton
  - dwayne
---
Nobody likes a slow site.  Think about how many sites you have abandoned within the first 5 seconds because it does not load fast enough.  Think of how many times have you abandoned a shopping cart thanks to very slow response times giving you enough time to talk yourself out of it.  Visitors to any site expect it to load immediately and any interaction to be instantaneous.  

In this guide we’ll explore how to speed up front end performance to ensure that visitors to your site stay engaged and have the best experience.  

There are a lot of ways we could measure page speed and overall performance. We will be tuning for the metrics set forth from the [Think With Google](https://www.thinkwithgoogle.com/){.external} team. These include:

- Reducing server response time
- How to Compress Images
- Minify Resources such as HTML, CSS, and JavaScript
- Leverage Browser Caching
- Eliminate render-blocking JavaScript and CSS in above-the-fold content
- Avoid landing page redirects


## Reduce server response time for initial HTML
In this lesson we will be exploring ways to better leverage caching on Pantheon to reduce the time it takes for a browser to get an initial response from your site.  
### Full-page caching on a CDN
To get a high score from a website speed grader you will need a cached copy of the HTML physically close to the machine doing the testing. Waiting for a response to come from across the ocean is a nonstarter. This is why the Pantheon uses a Global CDN with points of presence on every continent (ok, nearly every continent. It'll be a while before we get one on Antarctica).

![Global CDN Map](/source/docs/assets/images/guides/front-end-performance/cdn-map-mobile.png)

#### Checking if full page caching is working on your site
Let’s first see if your website is getting the benefit of full page caching is by looking at the HTTP headers. One easy way to look at the response headers your site is sending is by opening up Chrome Developer Tools.

![Check headers in chrome](/source/docs/assets/images/guides/front-end-performance/ChromeHeaders.gif)

To open Developers Tools you can select "inspect" from the right-click menu. Or you can select View > Developer > Developer Tools from the application menu.

With Developer Tools open, click on the Network tab and refresh the page. In this network tab you will see all of the HTTP requests necessary to display your webpage. The first in the list will be the initial HTML response. Click on that row for more information. There you will see information about that request including the HTTP request and response headers.

We are looking for the "Age" header. A number greater than zero indicates that this response was cached. The number indicates how many seconds that cache has been there.

Other important headers include:

- cache-control: This header should include a max-age that is the maximum number of seconds that the cache can be kept.
- surrogate-key-raw: If you have the Pantheon Advance Page Cache module or plugin installed you should see metadata including the the content ids for what was displayed on this page. By including this metadata this page can be cleared from cache when those posts are saved again.
- x-served-by: This header indicates where your response came from. Our primary infrastructure is in the Midwest of the United States so the first item you will probably see on this list will include "ORD" for the O'Hare airport in Chicago. If you physically located in Los Angeles you will also see LAX. So this response went from the primary datacenter to a cached copy in Chicago to a cached copy in Los Angeles.

![Chrome network headers](/source/docs/assets/images/guides/front-end-performance/chrome-network-headers.png)

#### Checking for Common Cache Busters
Not every from Drupal or WordPress response will be cacheable. Here are some of the reasons you may find your pages aren't caching.

- Cookies! Especially in WordPress it is common for plugins to add their own cookies in such a way that breaks full page caching. <a href="/docs/caching-advanced-topics/#pantheons-varnish-cookie-handling" data-proofer-ignore>Check that any cookies used by your site will play well with Varnish.</a> The cookies your site sends are included in the response headers we looked at above.
- Authenticated traffic. The session cookie of a logged in user causes bypassing of the full page cache.
- Mistakes in custom code. Developers new to the Drupal 8 caching API sometimes reach a point of frustration and just do something like this: `$form['#cache'] = ['max-age' => 0];` A developer might add a snippet of code like that to disable caching for one block and not realized they've disabled caching for the whole page. See the [Drupal documentation](https://www.drupal.org/docs/8/api/render-api/cacheability-of-render-arrays){.external} for more details. You can search your custom code for "#cache" to find places where you've interacted with the Cache API.
- Forgetting.
  - In Drupal it is very easy to turn off page caching and forget to turn it back on. Check that you have full page caching turned on at /admin/config/development/performance
      - Drupal - how do we quickly double check this is turned on?  Can we add terminus/drush command example here?
  - In WordPress the Pantheon Page Cache plugin is already included as a Must Use plugin. By going to Pantheon Page Cache in the Settings menu you can alter the Time to Live which translates to that "max-age" option we saw above. You can set the number of seconds to keep pages in cache.
      - Explain getting to the screen and what a good TTL should be.

![Pantheon Cache Plugin](/source/docs/assets/images/guides/front-end-performance/pantheon-page-cache.png)

### Speeding up Drupal and WordPress
When you are bypassing the Global CDN and talking straight you Drupal and WordPress there are a number of tools available to make sure your responses are fast.

- PHP7: Drupal and WordPress run significantly faster on PHP7 compared to PHP5. [Switching version on Pantheon is easy.](/docs/php-versions/)
- Sites loading a lot of content can benefit from an object cache like Redis. Adding Redis is easy with both [Drupal](/docs/drupal-redis/) and [WordPress](/docs/wordpress-redis/).
- [New Relic](/docs/new-relic/) a tool for monitoring performance and finding slow spots is included on every Pantheon site. Use it when your site is not sending uncached pages fast enough.
- There are toolbars for both [Drupal](https://www.drupal.org/project/devel){.external} and [WordPress](https://wordpress.org/plugins/debug-bar/){.external} that provide stats like the number of queries, amount of memory, and response time. These can be helpful for real time debugging.
- For debugging deep and complex server-side performance problems you might need to run your site locally with profiler like [Blackfire](https://blackfire.io/){.external}.

## Compress Images
To ensure image downloading does not unnecessarily block page load try the following...
### Send text instead
Many design elements on a page are best loaded as SVGs (Scalable Vector Graphics) rather than JPGs or GIFs. SVGs have the benefit of often looking better than JPGs or GIFs (because they are scale to any screensize) Also, because they are simply text, you have the option of including them inline with HTML. Inlining an SVG like your website's logo reduces the number of total requests needed to serve the page.

Ask the designers on your team if any of the elements intended to be loaded as images were created in Adobe Illustrator or another program that can easily export SVGs. Social sharing links are often good candidates here and there are freely available packs of SVG icons on the web like:

- [Ridiculously Responsive Social Sharing Buttons](https://www.rrssb.ml/){.external}
  - [Drupal module](https://www.drupal.org/project/rrssb){.external}
  - [WordPress plugin](https://wordpress.org/plugins/rrssb/){.external}
- [Flat Icon.](https://www.flaticon.com/){.external}
- More?

### Load images only when they will be visible in the browser (lazy loading)
Lazy loading images is a method, implemented via JavaScript, that saves both server bandwidth and lowers load times of your site by delaying the loading of images in the browser until they appear in the viewport.

[In Drupal 8 the bLazy module is a popular choice.](https://www.drupal.org/project/blazy){.external}

![Lady load images](/source/docs/assets/images/guides/front-end-performance/lazy-load.png)

[https://plugins.jquery.com/lazyload/](https://plugins.jquery.com/lazyload/){.external}
[https://appelsiini.net/projects/lazyload/](https://appelsiini.net/projects/lazyload/){.external}

### Send only as many pixels as are needed
Your content editors might upload a wallpaper-sized image that will only be ever seen at thumbnail size by your site visitors. To avoid sending a 4000x4000 pixel image to an element that will never be bigger than 200x200 pixels, make sure to configure Drupal Core's image styles.

Especially with sites built with Responsive Design, there are often images where the size will grow and shrink by a large amount depending on the device and browser size. One of the newer HTML elements, picture, addresses this scenario in ways that the older img tag did not.

Explanation of picture tag

Support for the picture tag is built into Drupal 8 Core as "Responsive Image" module. A backport of that module is available for Drupal 7. WordPress added support as of 4.4.

### Send only as many bytes as needed
Resizing an image so that you only send 200x200 pixels instead of 4000x4000 is a good start. The next step is ensuring that the file containing those 200 pixels is as small as it could possibly be without reducing the image quality. This task is commonly called "smushing" and unfortunately there is not a great option here available natively in PHP.

Your main options for smushing are:

- Smush locally: For images that are a part of your theme or module/plugin, you can smush them before committing them to git with
- Smuch elsewhere in the cloud: Use a plugin or module for sending images for your size to a 3rd party smusher and bringing them back.
- Smushing at the CDN level: The Pantheon Global CDN does not yet offer this service but if you have stacked your own CDN configuration in front of the Pantheon CDN, you might have this service available to you.

## Avoid Landing Page Redirects
A redirect will add at least one extra HTTP request-response cycle. As a result, eliminating extraneous redirects can make your website more snappy. Despite your best efforts it still may be necessary to include the occasional [redirect to a primary domain](/docs/guides/launch/redirects/) using HTTPS with or without the WWW.

Other considerations:

- Avoid mobile-specific subdomains and use responsive web design techniques.
- A DNS service provider such as [Cloudflare](https://support.cloudflare.com/hc/en-us/articles/200170536-How-do-I-redirect-all-visitors-to-HTTPS-SSL-){.external} may allow speedier redirects in some circumstances, but it’s still faster not to redirect at all.
- Avoid several chained redirects that make small changes such as redirecting to HTTPS, adding or removing WWW, or adding a trailing slash. Instead, [redirect to a primary domain](/docs/guides/launch/redirects/) that has all of these standardized.
- Pantheon doesn’t read changes to the .htaccess file or support NGINX customization, so redirections via those methods will not work.

## Minify Resources (HTML, CSS and JS)
Minifying resources reduces their size, making your site load faster for visitors as their browsers need to download less data. There are multiple ways to achieve this but let's look at the most common methods.

### Minification in the CMS
Drupal Core has the ability to "aggregate" CSS and JavaScript. When turned on, Drupal will combine individual CSS and Javascript files in a smaller number of bigger files. This easy optimization can be done at "admin/config/development/performance"

![Drupal performance admin interface](/source/docs/assets/images/guides/front-end-performance/drops-performance.png)

Checking these boxes will take a normal Drupal site from having dozens of small CSS/JS files to just a few. As you browse around the site the aggregated files loaded will be different as different modules add different source files to the page. For more details, see the [Drupal.org documentation on CSS organization](https://www.drupal.org/docs/develop/standards/css/css-file-organization-for-drupal-8){.external}.

If you want to make the number of files as low as possible, try [Advanced Aggregation module](https://www.drupal.org/project/advagg){.external}. [It can help take fine grain control over how files are combined.](http://www.mediacurrent.com/blog/better-css-js-aggregation-advanced-aggregation){.external}

WordPress doesn't minimize HTML, CSS or JavaScript out of the box but there are plugins available to handle the minification for you. Check out the [minify tag on WordPress.org](https://wordpress.org/plugins/tags/minify/){.external} for options.

You'll also want to explore minimizing HTML output from Drupal and WordPress.

### Local Minification
Many of us have a build step, for tasks like compiling Sass, as part of our development workflow. Adding a minification step when generating resources is easy. For CSS use [CSSNano](https://github.com/ben-eb/cssnano){.external} and for JavaScript use [UglifyJS](https://github.com/mishoo/UglifyJS2){.external} or [Closure Compiler](https://developers.google.com/closure/compiler/){.external}.

These can be used with common build tools, such as [Grunt](https://gruntjs.com/){.external} or [gulp](https://gulpjs.com/){.external}, or a GUI tool like [CodeKit](https://codekitapp.com/){.external}. No matter how you do it you should be minifying your resources (HTML, CSS and JavaScript) for every site.
