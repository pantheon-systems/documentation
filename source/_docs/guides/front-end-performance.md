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
  - dgorton
  - dts
---
Nobody likes a slow site. In this guide we’ll explore how to speed up front end performance to ensure that visitors to your site stay engaged and have the best experience.  

There are many different ways to measure page speed and performance. This guide will be tuning for the metrics set forth from the [Think With Google](https://www.thinkwithgoogle.com/){.external} team. These include:

- Reducing server response time
- How to Compress Images
- Minify Resources such as HTML, CSS, and JavaScript
- Eliminate render-blocking JavaScript and CSS in above-the-fold content
- Avoid landing page redirects
- Leverage Browser Caching


## Reduce server response time for initial HTML
Leverage caching on Pantheon to reduce the time it takes for a browser to get an initial response from your site.  
### Full-page caching on a CDN
To get a high score from a website speed grader you will need a cached copy of the HTML physically close to the machine doing the testing. Waiting for a response to come from across the ocean is a nonstarter. Pantheon uses a Global CDN with points of presence on every continent (well, except Antarctica... for now).

![Global CDN Map](/source/docs/assets/images/guides/front-end-performance/cdn-map-mobile.png)

#### Checking if full page caching is working on your site
Let’s first see if your website is getting the benefit of full page caching is by looking at the HTTP headers. One easy way to look at the response headers your site is sending is by opening up Chrome Developer Tools.

![Check headers in chrome](/source/docs/assets/images/guides/front-end-performance/ChromeHeaders.gif)

To open Developers Tools you can select "inspect" from the right-click menu. Or you can select View > Developer > Developer Tools from the application menu.

With Developer Tools open, click on the Network tab and refresh the page. In the Network tab you will see all of the HTTP requests necessary to display your page.

The first listed is the initial HTML file. Click on that row for more information, including the HTTP request and response headers. Look for the "Age" header. Any number greater than zero indicates that this response was cached. Great! The number indicates how many seconds that cache has been there.

Other important headers include:

- cache-control: This header should include a max-age that is the maximum number of seconds that the cache can be kept.
- surrogate-key-raw: If you have the Pantheon Advance Page Cache [plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/){.external} or [module](https://www.drupal.org/project/pantheon_advanced_page_cache){.external} installed you should see metadata including the the content ids for what was displayed on this page. This metadata instructs this page to be cleared from cache when any of those posts are saved again.
- x-served-by: This header indicates where your response came from. Our primary infrastructure is in the Midwest of the United States so the first item you will probably see on this list will include "ORD" for the O'Hare airport in Chicago. If you physically located in Los Angeles you will also see LAX, indicating the response went from the primary datacenter to a cached copy in Chicago to a cached copy in Los Angeles.

![Chrome network headers](/source/docs/assets/images/guides/front-end-performance/chrome-network-headers.png)

#### Checking for Common Cache Busters
Not every response from Drupal or WordPress may be cached. Common reasons pages aren't caching include:

- Cookies! Especially in WordPress it is common for plugins to add their own cookies in such a way that breaks full page caching. <a href="/docs/caching-advanced-topics/#pantheons-varnish-cookie-handling" data-proofer-ignore>Check that any cookies used by your site will play well with Varnish.</a> The cookies your site sends are included in the response headers we examined above.
- Authenticated traffic. The session cookie of a logged in user causes bypassing of the full page cache.
- Mistakes in custom code. Developers new to the Drupal 8 caching API sometimes reach a point of frustration and just do something like this: `$form['#cache'] = ['max-age' => 0];` A developer might add a snippet of code like that to disable caching for one block and not realized they've disabled caching for the whole page. See the [Drupal documentation](https://www.drupal.org/docs/8/api/render-api/cacheability-of-render-arrays){.external} for more details. You can search your custom code for "#cache" to find places where you've interacted with the Cache API.
      - WordPress - can we add an example?
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

## Efficient JavaScript and CSS delivery
Drupal and WordPress Core both allow for themes and modules/plugins to add individual CSS and JavaScript files to any given page (or every single page). To handle this norm in a way that ensures stable functionality, both systems default to serving each one of those .css and .js files separately, usually  in HTML <head> tag.

Loading everything separately and early in the page rendering process ensures that the effect of each file is taken on the first page rendering. It also nearly guarantees a slower than necessary page load. Fully optimizing all of the JavaScript and CSS on an already-built site is usually more work than can be done in one sitting. Though there are some easy wins that you should make sure you are getting.

### Load only what you need
Many sites load CSS and JavaScript files not used on the given page and not used on any page. Look at your theme and ask if there are any custom scripts or styles not being used anywhere.

To load custom scripts and styles only on relevant pages, use the appropriate APIs of Drupal and WordPress

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">WordPress</a></li>

  <!-- 2nd Tab Nav -->
  <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">
WordPress has twin functions `wp_enqueue_style()` and `wp_enqueue_script()` for adding CSS and JavaScript. You can call them from within your theme or custom plugins to add styles and scripts to page. If the file you are adding is not relevant for all pages on your site, be sure to wrap the function in some kind of logic so that it is only loaded when needed. [See the WordPress developer documentation for more details.](https://developer.wordpress.org/themes/basics/including-css-javascript/){.external}
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
In Drupal 7 it was possible to use the functions drupal_add_css() and drupal_add_js() to add assets. Often these functions were misused to add assets to every single page on the site. In Drupal 8, you should use the #attached property on Render arrays:

```php
// From core/modules/contextual/contextual.module.
function contextual_page_attachments(array &$page) {
  if (!\Drupal::currentUser()->hasPermission('access contextual links')) {
    return;
  }

  $page['#attached']['library'][] = 'contextual/drupal.contextual-links';
}
```

[See the Drupal core documentation where this example was taken from for more details.](https://www.drupal.org/docs/8/creating-custom-modules/adding-stylesheets-css-and-javascript-js-to-a-drupal-8-module){.external}

  </div>
</div>

### Use as few requests as possible
Once you have eliminated code that is not needed. Make sure the code being loaded comes in as few requests as possible. Drupal Core has the ability to "aggregate" CSS and JavaScript. When turned on, Drupal will combine individual CSS and Javascript files in a smaller number of bigger files. This easy optimization can be done at "admin/config/development/performance"

![Drupal performance admin interface](/source/docs/assets/images/guides/front-end-performance/drops-performance.png)

Checking these boxes will take a normal Drupal site from having dozens (or hundreds) of small CSS/JS files to just a few. As you browse around the site the aggregated files loaded will be different as different modules add different source files to the page. [For more details, see the Drupal.org documentation on CSS organization.](https://www.drupal.org/docs/develop/standards/css/css-file-organization-for-drupal-8){.external}


<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor2" aria-controls="tab-1-anchor2" role="tab" data-toggle="tab">WordPress</a></li>

  <!-- 2nd Tab Nav -->
  <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor2" aria-controls="tab-2-anchor2" role="tab" data-toggle="tab">Drupal</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="tab-1-anchor2" markdown="1">
Use the [Autoptimize](https://wordpress.org/plugins/autoptimize/){.external} plugin and the following configuration in your site's `wp-config.php` file:


```php
define('AUTOPTIMIZE_CACHE_CHILD_DIR','/uploads/autoptimize/');
```

The following blog post walks through how to use results from the [Critical Path CSS Generator](https://jonassebastianohlsson.com/criticalpathcssgenerator/){.external} with the Autoptimize plugin so that you have inline critical styles with a deferred stylesheet: [How to Use the Autoptimize “Inline and Defer CSS” Option](https://www.wpfaster.org/blog/how-to-use-autoptimize-inline-and-defer-css-option){.external}
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="tab-2-anchor2" markdown="1">
If you want to make the number of files as low as possible, try [Advanced Aggregation](https://www.drupal.org/project/advagg){.external} module. [It can help take fine grain control over how files are combined](http://www.mediacurrent.com/blog/better-css-js-aggregation-advanced-aggregation){.external}. In the past there have been bugs when using Advanced Aggregation on Pantheon. To our knowledge, those are all resolved.
  </div>
</div>

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#unique-anchor">
      <h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-wrench"></span> HTTP2</h3>
    </a>
  </div>
  <div id="unique-anchor" class="collapse" markdown="1" style="padding:10px;">
  The Pantheon Global CDN includes HTTP2. One of the benefits of HTTP2 is that it allows multiple files to be downloaded simultaneously. The Drupal community has long speculated that with the rise of ubiquitous HTTP2, the recommendation for aggregating CSS files will go away. In theory, lots of little files, each individually cacheable, and downloaded en masse over one HTTP2 connection would be more performant than aggregated files. In our testing, the behavior is not so clean. If you have a site that performs better with aggregation off, please send us your waterfall graph and we will consider updating this guidance.

  We also expect that this recommendation could change if our underlying Global CDN architecture adds Brotli and QUIC (or equivalent enhancements).
  </div>
</div>

### Make your assets as small as possible
In addition to making as few requests as possible to load styling and scripts, the loaded files should be as small as possible. Both Drupal's Advanced Aggregation and WordPress' Autoptimize have options for further minifying or "uglifying" your CSS and Javascript.

#### Local Minification
Many of us have a build step, for tasks like compiling Sass, as part of our development workflow. Adding a minification step when generating resources is easy. For CSS use [CSSNano](https://github.com/ben-eb/cssnano){.external} and for JavaScript use [UglifyJS](https://github.com/mishoo/UglifyJS2){.external} or [Closure Compiler](https://developers.google.com/closure/compiler/){.external}.

These can be used with common build tools, such as [Grunt](https://gruntjs.com/){.external} or [gulp](https://gulpjs.com/){.external}, or a GUI tool like [CodeKit](https://codekitapp.com/){.external}. No matter how you do it you should be minifying your resources (HTML, CSS and JavaScript) for every site.

### Load your assets after the browser renders the page
Performance graders will call out CSS and Javascript that blocks the rendering of the page. Usually these styles and scripts are in the <head> tag of your webpage. Many can be moved from the top of the HTML to the bottom so that the browser is able to first render the page without processing them.

WordPress and Drupal option have core API's for declaring whether an asset should be in the header or footer. For instance, WordPress' [wp_enqueue_script()](https://developer.wordpress.org/reference/functions/wp_enqueue_script/){.external} function can be given an argument to say that a script should go in the footer. [Similarly Drupal has the concept of "scope" for header and footer. For a detailed look at how Drupal works under the hood, see the Lullabot blog.](https://www.lullabot.com/articles/javascript-aggregation-in-drupal-7){.external}

While you can use those core APIs directly to move load files as late as possible, Drupal's Advanced Aggregation and WordPress' Autoptimize make it easy to do this task without custom code.

### Load the critical pieces as early as possible
For some CSS styles it is not sensible to load them after the first HTML rendering. Without some styling your site may look bad. Inlining critical CSS means finding the CSS rules that will be used by the top of your webpage and including those rules in the same HTML response that first comes back from the server (rather than in a separate style sheet). This means the browser doesn't have to wait for an additional request to start applying styles.

You can identify critical styles for your above-the-fold content using a tool like [Critical Path CSS Generator](https://jonassebastianohlsson.com/criticalpathcssgenerator/){.external} and then again use Drupal's Advanced Aggregation and WordPress' Autoptimize to load the critical styles within the HTML.

Be careful with this technique because you are making a tradeoff. By making every single HTML response include inline styles you make that initial response be a larger amount of data to load. This slight slowdown in initial loading is totally acceptable as long as it is slight. Having the bulk of your CSS in separate files means those files can be cached by the browser. If all of the CSS rules moved from separate files to inline then none of your CSS would be cached by the browser and performance would suffer.

## Avoid Landing Page Redirects
A redirect will add at least one extra HTTP request-response cycle. As a result, eliminating extraneous redirects can make your website more snappy. Despite your best efforts it still may be necessary to include the occasional [redirect to a primary domain](/docs/guides/launch/redirects/) using HTTPS with or without the WWW.

Other considerations:

- Avoid mobile-specific subdomains and use responsive web design techniques.
- A DNS service provider such as [Cloudflare](https://support.cloudflare.com/hc/en-us/articles/200170536-How-do-I-redirect-all-visitors-to-HTTPS-SSL-){.external} may allow speedier redirects in some circumstances, but it’s still faster not to redirect at all.
- Avoid several chained redirects that make small changes such as redirecting to HTTPS, adding or removing WWW, or adding a trailing slash. Instead, [redirect to a primary domain](/docs/guides/launch/redirects/) that has all of these standardized.
- Pantheon doesn’t read changes to the .htaccess file or support NGINX customization, so redirections via those methods will not work.

## Leverage Browser Caching
While a CDN can bring resources closer to the browser, there's no faster cache than the one in the browser itself. But, unlike a CDN, it's not possible to directly invalidate browser caches, so we use some techniques that get the same effect.

Here are some ways to maximize use of browser caching:

- Use externally hosted Javascript libraries and fonts. While some speed tests will show this as taking
  extra time, a real-world browser is likely to have major libraries and fonts already cached.
- Deliver static files with long cache lifetimes (via Cache-Control headers). Pantheon automatically uses a one-year lifetime.
- Include static files with [cache-busting query strings](https://stackoverflow.com/a/9692722).
  This prevents the long Cache-Control lifetime for static files from breaking pages when the CSS and Javascript change.
  [Drupal automatically does this for CSS and Javascript](https://www.drupal.org/docs/8/creating-custom-modules/adding-stylesheets-css-and-javascript-js-to-a-drupal-8-module),
  and [WordPress provides a parameter for a version when enqueuing CSS and Javascript](https://wordimpress.com/wordpress-css-and-js-cache-busting/).
- For files included in pages without cache-busting query strings (like images), it's better to upload a new file (and delete the old one) instead of replacing the existing file.
  The new filename will cause clients to get the new file, even if they have a cached version of the older one
  (which is likely given the one-year cache lifetimes for static files on Pantheon).
