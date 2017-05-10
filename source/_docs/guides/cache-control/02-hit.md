---
title: Cache Control Manual
subtitle: Cache a Page
layout: guide
anchorid: hit
guidepage: true
guidetoc: true
generator: pagination
pagination:
    provider: data.cachecontrolpages
use:
    - cachecontrolpages
permalink: docs/guides/cache/hit/
nexturl: guides/cache/miss/
nextpage: Cache a Page
previousurl: guides/cache/
previouspage: Pantheon's Global CDN
editpath: 02-hit.md
---
Serving anonymous traffic from virtual memory allows a cached response to be returned to the browser without needing to access the application server, which in turns frees up resources to build more dynamic requests.

You can enable caching for anonymous users via your sites' admin interface or by setting HTTP headers in PHP.

## Using the Admin Interface
The easiest way to configure anonymous page caching on Pantheon is via the WordPress Dashboard or Drupal Admin interface:

<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
  <li role="presentation"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>
<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="wp" markdown="1">

  Anonymous page caching is enabled automatically within Pantheon's [optimized version of WordPress](https://github.com/pantheon-systems/WordPress). By default, cached pages will expire after 10 minutes (600 seconds).

  You can increase the default value to improve the chances that a visitor will request a cached page, which will reduce page load times:

  1. Visit the plugin admin page (`/wp-admin/options-general.php?page=pantheon-cache`).
  2. Adjust the **Default Cache Time** as desired.
  3. Click **Save Changes**.


 </div>
 <div role="tabpanel" class="tab-pane" id="d8" markdown="1">
In Drupal 8, anonymous page caching is enabled by default. There is no option to turn it on or off.


 1. Visit the admin page for Drupal's performance settings (`/admin/config/development/performance`).
 2. Adjust the **Page cache maximum age** as desired.

    In Drupal 8, there is no option to turn anonymous page caching on or off. To disable caching for development purposes, set **Page cache maximum age** to **<no caching>**.

 3. Enable **Aggregate and compress CSS files** and **Aggregate and compress JavaScript files**.

   This is critical for page render times by reducing the number of HTTP requests and the amount of data transferred. There is no longer a **compress cached pages** setting in Drupal 8.

 4. Click **Save configuration**.

 #### Configure Views Caching
 Views has a very granular caching system, down to the individual View display. There's no single control that will just turn on views caching, and the caching is off by default. There are three different kinds of user-configurable caching within Views:

 <dl>
 	<dt>Query Results Caching</dt>
 	<dd>Raw Query Results, which should be cached for at least 1 minute. As the subject matter expert, you're in the best position to know how often your content should change.</dd>
 	<dt>Rendered Output Caching</dt>
 	<dd>Generated markup, which should be cached for as long as possible (if the query changes, the output will be refreshed).</dd>
 	<dt>Block Caching</dt>
 	<dd>If you're generating a block, this will expose the block to Drupal's built-in block caching.</dd>
 </dl>

 1. Go to `/admin/structure/views/`
 2. Edit the View in question.
 3. Select the display and click **Advanced**.
 4. Click the option next to Caching.
 5. Choose **Time-Based Caching** and click **Apply**.  
   Rendered output: (something other than Never Cache)  
   Query results: (something other than Never Cache)

 #### Configure Views Block Caching

 1. Go to `/admin/structure/views/`
 2. Edit the View in question.
 3. Select the block display and click **Advanced**.
 4. Click the option next to Block Caching.
 5. Block Caching Type: Choose an option for Drupal's built-in block caching method.

 #### Views Caching Plugins

 You can also force caching for all your views using a module like [Views cache bully](https://drupal.org/project/views_cache_bully).

 Views cache can also be aware of when the content itself changes with [Views content cache](https://drupal.org/project/views_content_cache).



  </div>
  <div role="tabpanel" class="tab-pane" id="d7" markdown="1">

  1. Visit the admin page for Drupal's performance settings (`/admin/config/development/performance`).
  2. Enable **Cache pages for anonymous users**. If possible, enable **Cache blocks** as well to increase performance for logged-in users.
  3. Set **Minimum cache lifetime** as desired.

    This forces cached content to continue to exist before it can be flushed. If all caches are cleared, any content under the minimum cache lifetime will not be expunged. High traffic sites may want to set this to a non-zero value; when in doubt, set it to none.

  4. Set **Expiration of cached pages** as desired to set `max-age`, which is used to determine how long cache is retained.
  5. Enable **Aggregate and compress CSS files** and **Aggregate and compress JavaScript files**.

    This is critical for page render times by reducing the number of HTTP requests and the amount of data transferred.

  6. Click **Save configuration**.
  #### Configure Views Caching
  Views has a very granular caching system, down to the individual View display. There's no single control that will just turn on views caching, and the caching is off by default. There are three different kinds of user-configurable caching within Views:

  <dl>
  	<dt>Query Results Caching</dt>
  	<dd>Raw Query Results, which should be cached for at least 1 minute. As the subject matter expert, you're in the best position to know how often your content should change.</dd>
  	<dt>Rendered Output Caching</dt>
  	<dd>Generated markup, which should be cached for as long as possible (if the query changes, the output will be refreshed).</dd>
  	<dt>Block Caching</dt>
  	<dd>If you're generating a block, this will expose the block to Drupal's built-in block caching.</dd>
  </dl>

  1. Go to `/admin/structure/views/`
  2. Edit the View in question.
  3. Select the display and click **Advanced**.
  4. Click the option next to Caching.
  5. Choose **Time-Based Caching** and click **Apply**.  
    Rendered output: (something other than Never Cache)  
    Query results: (something other than Never Cache)

  #### Configure Views Block Caching

  1. Go to `/admin/structure/views/`
  2. Edit the View in question.
  3. Select the block display and click **Advanced**.
  4. Click the option next to Block Caching.
  5. Block Caching Type: Choose an option for Drupal's built-in block caching method.

  #### Views Caching Plugins

  You can also force caching for all your views using a module like [Views cache bully](https://drupal.org/project/views_cache_bully).

  Views cache can also be aware of when the content itself changes with [Views content cache](https://drupal.org/project/views_content_cache).
  </div>
</div>

## Using HTTP Headers in PHP
Pantheon's Global CDN is configured to respect certain HTTP headers served by your site. If you set pages to expire in 5 minutes, the CDN will expire the content as requested. If your site sends headers that forbid caching, the CDN won't cache your content.

Here are the supported methods of controlling cache with PHP via HTTP headers:

### Surrogate Control: max-age
Use this header to control maximum time a cached page will be served from the CDN and if you would like the header to be stripped from the response, making the header visible only to the CDN. Browsers will not respect this value.

<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#wpmax-age" aria-controls="wpmax-age" role="tab" data-toggle="tab">WordPress</a></li>
  <li role="presentation"><a href="#d8max-age" aria-controls="d8max-age" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li role="presentation"><a href="#d7max-age" aria-controls="d7max-age" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>
<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="wpmax-age" markdown="1">
  Use the [`send_headers` action hook](https://codex.wordpress.org/Plugin_API/Action_Reference/send_headers) to add additional headers to the outgoing HTTP response:
  ```php
  <?php
  // hook into WordPress setting headers
  add_action( 'send_headers', 'my_template_cache_header' );

  function my_template_cache_header() {
      // check page template (or other logic)
      if( is_page_teplate( 'my-template' ) ){
          // set header
          header('Surrogate Control: max-age=3600');
      }
  }
  ```
  </div>
  <div role="tabpanel" class="tab-pane" id="d8max-age" markdown="1">
  ```php
  <?php
  header( 'Surrogate Control: max-age=3600');
  ```
  </div>
  <div role="tabpanel" class="tab-pane" id="d7max-age" markdown="1">
  ```php
  <?php
  header( 'Surrogate Control: max-age=3600');
  ```
  </div>
</div>

### Cache Control: s-maxage  
Use this header to control maximum time a cached page will be served from the CDN. This header is the same as Surrogate Control aside from the fact that it is not stripped from the response. Browsers will not respect this value.

<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#wps-maxage" aria-controls="wps-maxage" role="tab" data-toggle="tab">WordPress</a></li>
  <li role="presentation"><a href="#d8s-maxage" aria-controls="d8s-maxage" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li role="presentation"><a href="#d7s-maxage" aria-controls="d7s-maxage" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>
<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="wps-maxage" markdown="1">
  Use the [`send_headers` action hook](https://codex.wordpress.org/Plugin_API/Action_Reference/send_headers) to add additional headers to the outgoing HTTP response:
  ```php
  <?php
  // hook into WordPress setting headers
  add_action( 'send_headers', 'my_template_cache_header' );

  function my_template_cache_header() {
      // check page template (or other logic)
      if( is_page_teplate( 'my-template' ) ){
          // set header
          header('Cache-Control: s-maxage=3600');
      }
  }
  ```
  </div>
  <div role="tabpanel" class="tab-pane" id="d8s-maxage" markdown="1">
  ```php
  <?php
  header('Cache-Control: s-maxage=3600');
  ```
  </div>
  <div role="tabpanel" class="tab-pane" id="d7s-maxage" markdown="1">
  ```php
  <?php
  header('Cache-Control: s-maxage=3600');
  ```
  </div>
</div>

### Cache Control: max-age
Use this header to control maximum time a cached page will be served from the CDN and from the browser.

<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#wpcachecontrol-maxage" aria-controls="wpcachecontrol-maxage" role="tab" data-toggle="tab">WordPress</a></li>
  <li role="presentation"><a href="#d8cachecontrol-maxage" aria-controls="d8cachecontrol-maxage" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li role="presentation"><a href="#d7cachecontrol-maxage" aria-controls="d7cachecontrol-maxage" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>
<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="wpcachecontrol-maxage" markdown="1">
  Use the [`send_headers` action hook](https://codex.wordpress.org/Plugin_API/Action_Reference/send_headers) to add additional headers to the outgoing HTTP response:
  ```php
  <?php
  // hook into WordPress setting headers
  add_action( 'send_headers', 'my_template_cache_header' );

  function my_template_cache_header() {
      // check page template (or other logic)
      if( is_page_teplate( 'my-template' ) ){
          // set header
          header('Cache Control: max-age=3600');
      }
  }
  ```
  </div>
  <div role="tabpanel" class="tab-pane" id="d8cachecontrol-maxage" markdown="1">
  ```php
  <?php
  header('Cache Control: max-age=3600');
  ```
  </div>
  <div role="tabpanel" class="tab-pane" id="d7cachecontrol-maxage" markdown="1">
  ```php
  <?php
  header('Cache Control: max-age=3600');
  ```
  </div>
</div>

### Expires
Use this header to set a specific time and date for the page to be removed from cache and no longer served from the CDN or from the browser.

<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#wp-expires" aria-controls="wpcachecontrol-maxage" role="tab" data-toggle="tab">WordPress</a></li>
  <li role="presentation"><a href="#d8-expires" aria-controls="d8-expires" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li role="presentation"><a href="#d7-expires" aria-controls="d7-expires" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>
<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="wp-expires" markdown="1">
  Use the [`send_headers` action hook](https://codex.wordpress.org/Plugin_API/Action_Reference/send_headers) to add additional headers to the outgoing HTTP response:
  ```php
  <?php
  // hook into WordPress setting headers
  add_action( 'send_headers', 'my_template_cache_header' );

  function my_template_cache_header() {
      // check page template (or other logic)
      if( is_page_teplate( 'my-template' ) ){
          // set header
          header('Expires: 'gmdate(DATE_RFC1123, time()+3600));
      }
  }
  ```
  </div>
  <div role="tabpanel" class="tab-pane" id="d8-expires" markdown="1">
  ```php
  <?php
  header('Expires: 'gmdate(DATE_RFC1123, time()+3600));
  ```
  </div>
  <div role="tabpanel" class="tab-pane" id="d7-expires" markdown="1">
  ```php
  <?php
  header('Expires: 'gmdate(DATE_RFC1123, time()+3600));
  ```
  </div>
</div>
