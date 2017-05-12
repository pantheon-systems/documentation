---
title: Cache Control Manual
subtitle: Don't Cache a Page
cache: true
guidetoc: true
anchorid: miss
generator: pagination
layout: guide
pagination:
    provider: data.cachecontrolpages
use:
    - cachecontrolpages
permalink: docs/guides/cache/miss/
nexturl: guides/cache/test/
nextpage: Test Cache Configurations
previousurl: guides/cache/hit/
previouspage: Cache a Page
editpath: cache/03-miss.md
---
There are a few ways to exclude a page from being cached and render content dynamically. By default, Drupal and WordPress set cache busting cookies that bypass cache to render content dynamically for authenticated users. If a user is logged in, they won't see cached content by default.

For finer control, you can programmatically exclude a page from being cached via PHP. The easiest way to do this is by setting the `Cache Control` HTTP header to `private`.

## Using HTTP Headers in PHP (Recommended)
Set the the `Cache Control` header to `private` if you don't want a certain page cached. This is the most reliable way to ensure the page is excluded:

<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#wpprivate" aria-controls="wpmax-age" role="tab" data-toggle="tab">WordPress</a></li>
  <li role="presentation"><a href="#d8private" aria-controls="d8private" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li role="presentation"><a href="#d7private" aria-controls="d7private" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>
<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="wpprivate" markdown="1">
  Use the [`send_headers` action hook](https://codex.wordpress.org/Plugin_API/Action_Reference/send_headers) to add additional headers to the outgoing HTTP response:
  ```php
  <?php
  // hook into WordPress setting headers
  add_action( 'send_headers', 'my_template_cache_header' );

  function my_template_cache_header() {
      // check page template (or other logic)
      if( is_page_teplate( 'my-template' ) ){
          // set header
          header('Cache Control: private');
      }
  }
  ```
  </div>
  <div role="tabpanel" class="tab-pane" id="d8private" markdown="1">
  ```php
  <?php
  header('Cache Control: private');
  ```
  </div>
  <div role="tabpanel" class="tab-pane" id="d7private" markdown="1">
  ```php
  <?php
  header('Cache Control: private');
  ```
  </div>
</div>

## Using Cookies in PHP
Cookies can be used as an alternative to HTTP headers to control cache. You can use regular expression(s) to determine if the current request (`$_SERVER['REQUEST_URI']`) should be excluded from cache. If the request matches, bypass cache by setting the `NO_CACHE` cookie in the response:

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">
Setting cookies on the `pantheonsite.io` bare domain is not supported, as this would force all sites on the platform to read cookies from all other sites. However, you can set cookies on platform domains (e.g. `dev-site-name.pantheonsite.io`) and custom domains (e.g. `example.com`, `xyz.example.com`).
</p>
</div>

```php
<?php
//Set or replace $regex_path_match accordingly
if ((preg_match($regex_path_match, $_SERVER['REQUEST_URI'])) {
  $domain =  $_SERVER['HTTP_HOST'];
  setcookie('NO_CACHE', '1', time()+0, $_SERVER['REQUEST_URI'], $domain);
}
```
<div class="panel panel-default">
  <div class="panel-heading">
  <a data-proofer-ignore data-toggle="collapse" data-target="#cache-busting-cookies"><h3 class="panel-title" style="cursor:pointer;">Cache-Busting Cookie Patterns (Advanced) <span class="caret"></h3></a>
  </div>
  <div id="cache-busting-cookies" class="collapse" style="padding:10px;">
  <p>Pantheon's Global Edge will not cache cookies with patterns that match the following:</p>
  <pre><code>​NO_CACHE
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
</code></pre>
  </div>
</div>

### Cookie Size Limit
The Pantheon Edge size limit for Cookies is 10K. Any larger cookies are dropped, and the request will be processed as if there was no cookie sent. The header `X-Cookies-Dropped: 1` will be added to the request and response, indicating that they have been truncated.

Knowing this, you can choose to configure your code to listen for this header and respond, with a custom error page for example.
