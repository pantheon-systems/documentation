---
title: Bypassing Cache with HTTP Headers
description: Learn how to set HTTP headers to disable caching along Pantheon's edge layer, Varnish.
categories: [developing]
tags: [varnish, code]
keywords: cache, caching, varnish, cookies, wordpress, drupal
---
## Exclude Specific Pages from Caching
You can use regular expressions to determine if the current request (`$_SERVER['REQUEST_URI']`) should be excluded from cache. If the request matches, set the `Cache-Control` HTTP header to prevent caching.

<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li role="presentation"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="d8">
  <br>
  <p>Set <code>Cache-Control: max-age=0</code> using Drupal 8's <a href="https://www.drupal.org/node/1928898">Configuration Override System</a> (<code>$config</code>):</p>
  <pre><code class="php hljs">
  //Set or replace $regex_path_match accordingly
  if ((preg_match($regex_path_match, $_SERVER['REQUEST_URI'])) {
    $config['system.performance']['cache']['page']['max_age'] = 0;
  }
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="d7">
  <br>
  <p>Use the <code>$conf</code> global variable to set <code>Cache-Control: max-age=0</code>:</p>
  <pre><code class="php hljs">
  //Set or replace $regex_path_match accordingly
  if ((preg_match($regex_path_match, $_SERVER['REQUEST_URI'])) {
    $conf['page_cache_maximum_age'] = 0;
  }
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="wp">
  <br>
  <p>Set <code>Cache-Control: max-age=0</code> by hooking into <a href="https://codex.wordpress.org/Plugin_API/Action_Reference/send_headers"><code>send_headers</code></a>. This will override <code>max-age</code> configured within the <a href="/docs/wordpress-cache-plugin">Pantheon Cache</a> plugin for all matching requests: </p>
  <pre><code class="php hljs">
  //Set or replace $regex_path_match accordingly
  if (preg_match($regex_path_match, $_SERVER['REQUEST_URI'])) {
  	add_action( 'send_headers', 'add_header_nocache' );
  }
  function add_header_nocache() {
  	header( 'Cache-Control: no-cache, must-revalidate, max-age=0' );
  }
  </code></pre>
  </div>
</div>

As an alternative to using HTTP headers to control downstream caching, you can set a `NO_CACHE` cookie. For details, see [Working with Cookies on Pantheon](/docs/cookies).

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
Pantheon does not support manually editing and updating the VCL. We use a standard VCL for all sites on the platform. Requests are accepted, but we do not guarantee change requests will be implemented.</div>

## Test Pages Excluded from Cache
To test whether or not a page is being served from Pantheon's edge caching layer, examine the headers output (`Age`, `Cache-Control`, `Set-Cookie`) via the following curl command:
<pre><code class="http hljs">$ curl -I dev.mysite.com
HTTP/1.1 200 OK
X-Pantheon-Styx-Hostname: styx1a
server: nginx/1.0.15
content-type: text/html; charset=utf-8
x-drupal-cache: MISS
set-cookie: SESSf60876d132c0913e5fc728eec7f71e38=M1Sr0bxLbbgYmbg1EW7N8sGF4anrKP1np25EkYta-ZU; expires=Wed, 19-Dec-2012 22:04:58 GMT; path=/; domain=.dev.mysite.com; HttpOnly
<b>Cache-Control: no-cache, must-revalidate, max-age=0</b>
last-modified: Mon, 26 Nov 2012 18:31:30 +0000
expires: Sun, 19 Nov 1978 05:00:00 GMT
x-pantheon-endpoint: c18646dd-aa2b-4faa-a4e3-d71ec3a5ce43
Date: Mon, 26 Nov 2012 18:31:38 GMT
X-Varnish: 486741958
<b>Age: 0</b>
Via: 1.1 varnish
Connection: keep-alive
X-Pantheon-Edge-Server: 108.166.58.245
Vary: Accept-Encoding, Cookie
</code></pre>

The `Cache-Control` header in this example instructs Pantheon's edge caching layer (Varnish) not to cache the response for this request. If you run the command again, you should continue to see `Age: 0` for excluded pages. For more details, see [Testing Varnish](/docs/test-varnish).

## See Also
* [Clearing Caches for Drupal and WordPress](/docs/clear-caches/)
* [Working with Cookies on Pantheon](/docs/cookies)
* [Testing Varnish](/docs/test-varnish/)
* [Caching: Advanced Topics](/docs/caching-advanced-topics/)
