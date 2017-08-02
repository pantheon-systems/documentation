---
title: Launch Essentials
subtitle: Redirect for SEO and Security
launch: true
anchorid: redirects
generator: pagination
layout: guide
pagination:
    provider: data.launchpages
use:
    - launchpages
permalink: docs/guides/launch/redirects/
nexturl: guides/launch/launch-check/
nextpage: Final Launch Check
previousurl: guides/launch/configure-dns/
previouspage: Configure DNS and HTTPS
editpath: launch/05-redirects.md
image: getting-started-Largethumb
---
In this lesson, we'll redirect incoming requests to a primary domain name (e.g., `www.example.com` or `example.com`). Standardizing on a single URL prevents content duplication across domains for improved SEO.

**Watch the video:**

<div class="panel panel-drop panel-guide">
<script src="//fast.wistia.com/embed/medias/un4yaehi81.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_un4yaehi81 videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
</div>

**Try it:**

1. Navigate to **<span class="glyphicons glyphicons-embed-close" aria-hidden="true"></span> Code** in the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev** tab of your Site Dashboard. Confirm your Connection Mode is set to **SFTP**.

2. Click **<span class="glyphicons glyphicons-info-sign" aria-hidden="true"></span>  SFTP Connection Info** to access the credentials for connecting to your preferred SFTP client.

3. Click **Open in your default SFTP client**, and enter your User Dashboard password when prompted.

  If you run into issues, please refer to [this documentation](/docs/sftp/#sftp-connection-information).

4. Open the `code` folder in your SFTP client, and download your site's `settings.php` (Drupal) or `wp-config.php` (WordPress) file.
5. Edit your configuration file as described for your site's framework:

  {% include("redirects.twig")%}

6. Upload the configuration file to Pantheon using your SFTP client.

7. Return to the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev** tab of your Pantheon Site Dashboard. The files you just changed will be highlighted in yellow.


8. Add a commit message, then click **Commit** to add these files to your Dev environment.

9. Deploy your changes to the **<span class="glyphicons glyphicons-equalizer" aria-hidden="true"></span> Test** environment and then up to the **<span class="glyphicons glyphicons-cardio" aria-hidden="true"></span> Live** environment.

10. Navigate to the **<span class="glyphicons glyphicons-cardio"></span> Live** environment and click **<span class="glyphicons glyphicons-new-window-alt"></span> Visit Live Site** to test the redirect logic.

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
