---
title: Going Live
subtitle: Redirect to a Primary Domain
golive: true
anchorid: redirects
generator: pagination
layout: guide
pagination:
    provider: data.goinglivepages
use:
    - goinglivepages
permalink: docs/guides/going-live/redirects/
nexturl: guides/going-live/launch-check/
nextpage: Final Launch Check
previousurl: guides/going-live/redirects/
previouspage: Enable HTTPS
editpath: going-live/04-redirects.md
---
Once you have DNS configured and HTTPS provisioned, you're ready to redirect incoming requests to a primary domain name (e.g.`www.example.com` or `example.com`). Standardizing on a single URL prevents content duplication across domains for improved SEO.

**Watch the video:**

<div class="panel panel-drop panel-guide">
<script src="//fast.wistia.com/embed/medias/fof9qie645.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_fof9qie645 videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
</div>

## Redirect to HTTPS with WWW
Replace `example.com` in the following snippet, then add it to the bottom of your site's `settings.php` or `wp-config.php` file:

```
// Require https with www
if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
  ($_SERVER['PANTHEON_ENVIRONMENT'] === 'live') &&
  // Check if Drupal or WordPress is running via command line
  (php_sapi_name() != "cli")) {
  if ($_SERVER['HTTP_HOST'] != 'www.example.com' ||
      !isset($_SERVER['HTTP_X_SSL']) ||
      $_SERVER['HTTP_X_SSL'] != 'ON' ) {
    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://www.example.com'. $_SERVER['REQUEST_URI']);
    exit();
  }
}
```

## Redirect to HTTPS without WWW
Replace `example.com` in the following snippet, then add it to the bottom of your site's `settings.php` or `wp-config.php` file:

```php
// Require https without www
if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
  ($_SERVER['PANTHEON_ENVIRONMENT'] === 'live') &&
  // Check if Drupal or WordPress is running via command line
  (php_sapi_name() != "cli")) {
  if ($_SERVER['HTTP_HOST'] == 'www.example.com' ||
      !isset($_SERVER['HTTP_X_SSL']) ||
      $_SERVER['HTTP_X_SSL'] != 'ON' ) {
    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://example.com'. $_SERVER['REQUEST_URI']);
    exit();
  }
}
```

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#host-specific1"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><i class="fa fa-graduation-cap" style="line-height:.9"></i> Level Up: Configure Site Monitoring Services  (Optional)</h3></a>
  </div>
  <div id="host-specific1" class="collapse" style="padding:10px;">
    <div markdown="1">
## Ready to launch like the pros?
Now that you're redirecting requests to a single, primary domain, it's the perfect time to setup a availability monitoring service to watch over it like an automated hawk.

### [Setup Availability Monitoring](/docs/new-relic/#configure-ping-monitors-for-availability)
New Relic provides a free availability monitoring service that sends a request to designated URLs from configured locations at given intervals and alerts you via email when a response fails.
    </div>
  </div>
</div>
