---
title: Cache Control Manual
subtitle: Exclude Pages for Cache
guidepage: true
anchorid: miss
generator: pagination
layout: guide
pagination:
    provider: data.cachecontrolpages
use:
    - cachecontrolpages
permalink: docs/cache/miss/
nexturl: cache/test/
nextpage: Test Cache Configurations
previousurl: cache/hit/
previouspage: Cache a Page
editpath: 03-miss.md
---
## Cache Control: private
Set the the Cache Control header to private in the response if you don't want a certain resource cached. This is the most reliable way to ensure the page is excluded using HTTP headers:

```php
header( 'Cache Control: private');
```

## NO_CACHE Cookie
As an alternative to setting the Cache Control header to `private`, you can bypass cache by setting a `NO_CACHE` cookie in the response:
```
setcookie('NO_CACHE', '1', time()+0, '/path-to-page', $_SERVER['HTTP_HOST']);
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
