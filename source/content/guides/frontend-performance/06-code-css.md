---
title: Frontend Performance 
subtitle: Code and CSS
description: Optimizing code and CSS.
anchorid: code
categories: [performance]
tags: [measure, traffic]
type: guide
permalink: docs/guides/frontend-performance/code-css
editpath: frontend-performance/06-code-css.md
image: CDN-speedTest-docs-guide
reviewed: "2020-10-10"
---

Optimizing code and CSS

## Reduce Code Size

Tools and techniques to reduce code size.


## GZIP Compression

By default, gzip compression is already enabled server-side. The response headers include `content-encoding: gzip` which will serve the site's HTML, stylesheets and JavaScipt files in a reduced size before sending it to the browser, resulting to a faster Time To First Byte (**TTFB**). Users don't need to modify any Nginx/.htaccess configuration, nor install any 3rd party plugins/modules for gzip compression.

If there are any assets that are not being gzipped, most likely they are assets loaded from outside Pantheon.


## Deliver Efficient CSS and JavaScript

Drupal and WordPress Core both allow for themes and modules/plugins to add individual CSS and JavaScript files to any given page (or every single page). To handle this norm in a way that ensures stable functionality, both systems default to serving each one of those `.css` and `.js` files separately, usually  in HTML `<head>` tag.

Loading everything separately and early in the page rendering process ensures that the effect of each file is taken on the first page rendering. It also nearly guarantees a slower than necessary page load because both types of resources block rendering.

Fully optimizing all of the JavaScript and CSS on an already-built site is usually more work than can be done in one sitting. Though there are some easy wins that you should make sure you are getting.

### Load Only What is Needed
Many sites load CSS and JavaScript files not used on the given page and not used on any page. Look at your theme and remove unused scripts or styles.

To load custom scripts and styles only on relevant pages, use the appropriate APIs of Drupal and WordPress:

<TabList>

<Tab title="WordPress" id="wp-css" active={true}>

WordPress has twin functions `wp_enqueue_style()` and `wp_enqueue_script()` for adding CSS and JavaScript. You can call them from within your theme or custom plugins to add styles and scripts to page.

If the file you are adding is not relevant for all pages on your site, be sure to wrap the function in some kind of logic so that it is only loaded when needed. See the WordPress [developer documentation](https://developer.wordpress.org/themes/basics/including-css-javascript/) for more details.

</Tab>

<Tab title="Drupal" id="drupal-css">

In Drupal 7 it was possible to use the functions `drupal_add_css()` and `drupal_add_js()` to add assets. Often these functions were misused to add assets to every single page on the site. Those functions were removed from Drupal 8. Now the `#attached` property on Render arrays (which is also available in Drupal 7) is the technique to use:

```php
// From core/modules/contextual/contextual.module.
function contextual_page_attachments(array &$page) {
  if (!\Drupal::currentUser()->hasPermission('access contextual links')) {
    return;
  }

  $page['#attached']['library'][] = 'contextual/drupal.contextual-links';
}
```

[See the Drupal core documentation where this example was taken from for more details.](https://www.drupal.org/docs/8/creating-custom-modules/adding-stylesheets-css-and-javascript-js-to-a-drupal-8-module)

</Tab>

</TabList>

### Use as Few Requests as Possible
Once you have eliminated code that is not needed, make sure the code being loaded comes in as few requests as possible.

<TabList>

<Tab title="WordPress" id="wp-requests" active={true}>

Use the [Autoptimize](https://wordpress.org/plugins/autoptimize/) plugin and the following configuration in your site's `wp-config.php` file:


```php
// Configure directory & filename of cached autoptimize files
define('AUTOPTIMIZE_CACHE_CHILD_DIR','/uploads/autoptimize/');
define('AUTOPTIMIZE_CACHEFILE_PREFIX','aggregated_');
```

The following blog post walks through how to use results from the [Critical Path CSS Generator](https://jonassebastianohlsson.com/criticalpathcssgenerator/) with the Autoptimize plugin so that you have inline critical styles with a deferred stylesheet: [How to Use the Autoptimize “Inline and Defer CSS” Option](https://www.wpfaster.org/blog/how-to-use-autoptimize-inline-and-defer-css-option)

</Tab>
<Tab title="Drupal" id="drupal-requests">

Drupal Core has the ability to "aggregate" CSS and JavaScript. When turned on, Drupal will combine individual CSS and Javascript files in a smaller number of bigger files. This easy optimization can be done at `admin/config/development/performance`:

![Drupal performance admin interface](../../images/guides/front-end-performance/drops-performance.png)

Checking these boxes will take a normal Drupal site from having dozens (or hundreds) of small CSS/JS files to just a few. As you browse around the site the aggregated files loaded will be different as different modules add different source files to the page. [For more details, see the Drupal.org documentation on CSS organization.](https://www.drupal.org/docs/develop/standards/css/css-file-organization-for-drupal-8)

If you want to make the number of files as low as possible, try [Advanced Aggregation](https://www.drupal.org/project/advagg) module. [It can help take fine grain control over how files are combined](http://www.mediacurrent.com/blog/better-css-js-aggregation-advanced-aggregation). In the past there have been bugs when using Advanced Aggregation on Pantheon. To our knowledge, those are all resolved.

</Tab>

</TabList>

<Alert title="Note" type="info">

The Pantheon Global CDN includes HTTP/2. One of the benefits of HTTP/2 is that it allows multiple files to be downloaded simultaneously.<br/><br/>
The web community has long speculated whether HTTP/2 will make CSS and JavaScript aggregation irrelevant. (In theory, lots of little files, each individually cacheable, and downloaded en masse over one HTTP/2 connection would be more performant than one big inline CSS statement that's been aggregated.)<br/><br/>
In our testing, HTTP/2 makes disaggregated files much faster than they were before, but still not as fast as aggregated files. As HTTP/2 and related technologies mature, we will revisit this recommendation.<br/><br/>

</Alert>

### Make Assets as Small as Possible
In addition to making as few requests as possible to load styling and scripts, the loaded files should be as small as possible. Both Drupal's [Advanced Aggregation](https://www.drupal.org/project/advagg) and WordPress' [Autoptimize](https://wordpress.org/plugins/autoptimize/) have options for further minifying or "uglifying" your CSS and Javascript.

#### Local Minification
Many of us have a build step, for tasks like compiling Sass, as part of our development workflow. Adding a minification step when generating resources is easy. For CSS use [CSSNano](https://github.com/ben-eb/cssnano) and for JavaScript use [UglifyJS](https://github.com/mishoo/UglifyJS2) or [Closure Compiler](https://developers.google.com/closure/compiler/).

These can be used with common build tools, such as [Grunt](https://gruntjs.com/) or [gulp](https://gulpjs.com/), or a GUI tool like [CodeKit](https://codekitapp.com/). No matter how you do it you should be minifying your resources (HTML, CSS and JavaScript) for every site.

### Load Assets after the Browser Renders the Page
Performance graders will call out CSS and Javascript that blocks the rendering of the page. Usually these styles and scripts are in the `<head>` tag of your webpage. Many can be moved from the top of the HTML to the bottom so that the browser is able to first render the page without processing them.

WordPress and Drupal option have core API's for declaring whether an asset should be in the header or footer. For instance, WordPress' [wp_enqueue_script()](https://developer.wordpress.org/reference/functions/wp_enqueue_script/) function can be given an argument to say that a script should go in the footer.

Similarly Drupal has the concept of `scope` for header and footer. For a detailed look at how Drupal works under the hood, take a look at this [blog post from Lullabot](https://www.lullabot.com/articles/javascript-aggregation-in-drupal-7).

While you can use those core APIs directly to move load files as late as possible, Drupal's [Advanced Aggregation](https://www.drupal.org/project/advagg) and WordPress' [Autoptimize](https://wordpress.org/plugins/autoptimize/) make it easy to do this task without custom code.

#### Defer and Async Script Attributes
For JavaScript, we suggest deferring as much as possible until after the `onload` DOM event has completed so rendering isn't blocked. Whatever script cannot be deferred should be loaded asynchronously so the page rendering continues without interruption.

For more details on the `<script async>` and `<script defer>` attributes, see [this article by Daniel Imms](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html).

### Load the Critical Pieces as Early as Possible
For some CSS styles it is not sensible to load them after the first HTML rendering. Without some styling your site may look bad. Inlining critical CSS means finding the CSS rules that will be used by the top of your webpage and including those rules in the same HTML response that first comes back from the server (rather than in a separate style sheet). This means the browser doesn't have to wait for an additional request to start applying styles.

You can identify critical styles for your above-the-fold content using a tool like [Critical Path CSS Generator](https://jonassebastianohlsson.com/criticalpathcssgenerator/) and then again use Drupal's [Advanced Aggregation](https://www.drupal.org/project/advagg) module and WordPress' [Autoptimize](https://wordpress.org/plugins/autoptimize/) plugin to load the critical styles within the HTML.

Be careful with this technique because you are making a tradeoff. By making every single HTML response include inline styles you make that initial response be a larger amount of data to load. This slight slowdown in initial loading is acceptable as long as it is slight. Having the bulk of your CSS in separate files means those files can be cached by the browser. If all of the CSS rules moved from separate files to inline then none of the CSS would be cached by the browser and performance would suffer.

### Load Resources Once
While a CDN can bring resources closer to the browser, there's no faster cache than the one in the browser itself. However unlike a CDN, it's not possible to directly invalidate browser caches. We recommend the following techniques to achieve maximum browser caching:

#### Common Libraries and Fonts
Use externally hosted Javascript libraries and fonts. While some speed tests will show this as taking extra time, a real-world browser is likely to have major libraries and fonts already cached.

#### Set Long Cache Lifetimes
Deliver static files with long cache lifetimes (via `Cache-Control` headers). Pantheon automatically uses a one-year lifetime for static files.


