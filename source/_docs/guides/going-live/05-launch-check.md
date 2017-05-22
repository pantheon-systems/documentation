---
title: Going Live
subtitle: Final Launch Checks
golive: true
anchorid: launch-check
generator: pagination
layout: guide
pagination:
    provider: data.goinglivepages
use:
    - goinglivepages
permalink: docs/guides/going-live/launch-check/
previousurl: guides/going-live/redirects/
previouspage: Redirect to a Primary Domain
nexturl: guides/going-live/next-steps/
nextpage: Next Steps
editpath: going-live/05-launch-check.md
---
## Enable and Schedule Weekly Backups
1. Click **<span class="glyphicons glyphicons-cloud-upload" aria-hidden="true"></span> Backups** on the <span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> **Dev** tab of your Site Dashboard then click **Backup Schedule**.
2. Toggle to **Enable** if needed, then pick the day you want to create weekly backups on and click **Update Weekly Backup Schedule**.
3. Repeat these steps for the **<span class="glyphicons glyphicons-equalizer"></span> Test** and **<span class="glyphicons glyphicons-cardio"></span> Live** environments.

For more information on this feature, see [Backups Tool](/docs/backups/).

## Review Status Reports
Launch with confidence by taking advantage of Pantheon's static site analysis service for Drupal and WordPress. Status reports are found in the Site Dashboard within the **<span class="glyphicons glyphicons-info-sign"></span> Status** tab.

This automated report checks for exploited patterns in code, shows database stats, reveals PHP errors, and much more. You'll even find best practice recommendations to configure cache for improved performance.

**Shoot for all green, but at the very least be sure and fix all errors and review every notice.**

![Launch check error example](/source/docs/assets/images/dashboard/launch-check-cache-warnings.png)

![Launch check warning example](/source/docs/assets/images/dashboard/launch-check-security-error.png)

<div class="panel panel-video panel-guide" id="accordion">
  <div class="panel-heading panel-video-heading">
    <a class="accordion-toggle panel-video-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#host-specific1"><h3 class="panel-title panel-video-title" style="cursor:pointer;"><i class="fa fa-graduation-cap" style="line-height:.9"></i> Level Up: Maximize Performance by Configuring Cache (Optional)</h3></a>
  </div>
  <div id="host-specific1" class="collapse" style="padding:10px;">
    <div markdown="1">
## Ready to launch like the pros?
Since you're in fixin' mode, take some time to optimize performance using Redis and Pantheon's global CDN.

### [Enable Redis](/docs/redis/#enable-redis)
Redis provides an alternative caching backend, taking that work off the database, which is vital for scaling to a larger number of logged-in users. It also provides a number of other nice features for developers looking to use it to manage queues, or do custom caching of their own.

### [Configure Caching](/docs/guides/cache/hit/)
Maximize performance on Pantheon by configuring your site's performance settings.

Serving anonymous traffic from virtual memory allows a cached response to be returned to the browser without needing to access the application server, which in turns frees up resources to build more dynamic requests.

### [Test Cache](/docs/guides/cache/test/)
Learn how to test whether or not a page is being served from Pantheon's global CDN by examining the HTTP headers from a response using curl.
    </div>
  </div>
</div>
