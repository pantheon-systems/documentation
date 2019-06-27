---
title: Launch Essentials
subtitle: Redirect for SEO and Security
description: Part five of our Launch Essentials guide covers redirecting users to the proper domains and paths.
launch: true
anchorid: redirects
generator: pagination
layout: guide
type: guide
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
In this lesson, we'll redirect all traffic to a primary domain via HTTPS, which is a best practice for security and SEO. This means if you choose `www.example.com` as your primary domain, then if a visitor types in `example.com` into their browser (or any other domain you have connected to your site), they will end up on `https://www.example.com`.

<div class="alert alert-info" markdown="1">
<h4 class="info">Note</h4>
Make sure HTTPS has been successfully provisioned *before* adding any code (like the sample below) that will redirect traffic to HTTPS.
</div>

1. Navigate to **<span class="glyphicons glyphicons-embed-close"></span> Code** in the **<span class="glyphicons glyphicons-wrench"></span> Dev** tab of your Site Dashboard. Confirm your Connection Mode is set to **SFTP**.
2. Click **<span class="glyphicons glyphicons-info-sign"></span> SFTP Connection Info** to access the credentials for connecting to your preferred SFTP client.
3. Click **Open in your default SFTP client**, and enter your User Dashboard password when prompted.

  If you run into issues, please refer to [this documentation](/docs/sftp/#sftp-connection-information).

4. Now open the `code` folder in your SFTP client, and download your site's `settings.php` (Drupal) or `wp-config.php` (WordPress) file.
5. Edit your configuration file by adding the following snippet for the desired redirect (replace `example.com`):

  {% include("redirects.twig")%}

6. Upload the configuration file to Pantheon using your SFTP client.

7. Return to the **<span class="glyphicons glyphicons-wrench"></span> Dev** tab of your Pantheon Site Dashboard. The files you just changed will be highlighted in yellow.


8. Add a commit message, then click **Commit** to add these files to your Dev environment.

9. Deploy your changes to the **<span class="glyphicons glyphicons-equalizer"></span> Test** environment and then up to the **<span class="glyphicons glyphicons-cardio"></span> Live** environment.

10. Navigate to the **<span class="glyphicons glyphicons-cardio"></span> Live** environment and click **<span class="glyphicons glyphicons-new-window-alt"></span> Visit Live Site** to test the redirect logic.

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#host-specific1"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><i class="fa fa-graduation-cap" style="line-height:.9"></i> Level Up: Configure Site Monitoring Services  (Optional)</h3></a>
  </div>
  <div id="host-specific1" class="collapse" style="padding:10px;">
    <div markdown="1">
## Ready to launch like the pros?
Now that you're redirecting requests to a single, primary domain, it's the perfect time to setup a availability monitoring service to watch over it like an automated hawk.

### [Send an HSTS Header for Increased Security](/docs/hsts/)
Install a plugin or module to prevent cookie hijacking and get an A+ rating from SSL Labs.

### [Setup Availability Monitoring](/docs/new-relic/#configure-ping-monitors-for-availability)
New Relic provides a free availability monitoring service that sends a request to designated URLs from configured locations at given intervals and alerts you via email when a response fails.
    </div>
  </div>
</div>
