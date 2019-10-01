---
title: Launch Essentials
subtitle: Choose a Primary Domain for SEO
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
editpath: launch/05-redirects.md
image: getting-started-Largethumb
---

In this lesson, we'll redirect all traffic to a primary domain, which is a best practice for SEO. This means if you choose `www.example.com` as your primary domain, then if a visitor navigates to `example.com` (or any other domain you have connected to your site), they will end up on `https://www.example.com`.

Choose one of the following two options to configure the primary domain.

## Set Primary Domain with Terminus

<Partial file="primary-domain.md" />

## Set Primary Domain with PHP Snippet
If your site configuration prevents you from setting the primary domain from the platform level, you can use PHP redirects:

<Accordion title="PHP Redirection" >

1. Navigate to **<span class="glyphicons glyphicons-embed-close"></span> Code** in the **<span class="glyphicons glyphicons-wrench"></span> Dev** tab of your Site Dashboard. Confirm your Connection Mode is set to **SFTP**.

1. Click **<span class="glyphicons glyphicons-info-sign"></span> SFTP Connection Info** to access the credentials for connecting to your preferred SFTP client.

1. Click **Open in your default SFTP client**, and enter your user's Dashboard password when prompted.

  If you run into issues, please refer to the [SFTP Connection](/sftp/#sftp-connection-information) doc.

1. Open the `code` folder in your SFTP client.

1. As part of best security practices, we suggest you [Require HTTPS with the HSTS Header](/pantheon-yml/#enforce-https--hsts). Download your site's `pantheon.yml` file and follow the recommendations for enforcing HTTPS on your site.

1. Now download your site's `settings.php` (Drupal) or `wp-config.php` (WordPress) file.

1. Edit your configuration file by adding the following snippet for the desired redirect (replace `example.com`):

  <Partial file="_redirects.md" />

1. Upload the configuration file to Pantheon using your SFTP client.

1. Return to the **<span class="glyphicons glyphicons-wrench"></span> Dev** tab of your Pantheon Site Dashboard. The files you just changed will be highlighted in yellow.

1. Add a commit message, then click **Commit** to add these files to your Dev environment.

1. Deploy your changes to the **<span class="glyphicons glyphicons-equalizer"></span> Test** environment and then up to the **<span class="glyphicons glyphicons-cardio"></span> Live** environment.

1. Navigate to the **<span class="glyphicons glyphicons-cardio"></span> Live** environment and click **<span class="glyphicons glyphicons-new-window-alt"></span> Visit Live Site** to test the redirect logic.

</Accordion>

## Ready to launch like the pros?
Now that you're redirecting requests to a single, primary domain, it's the perfect time to configure a long-duration HSTS header, or set up an availability monitoring service to watch over your site like an automated hawk.

### [Send a Long-Duration HSTS Header for Increased Security](/pantheon-yml/#enforce-https--hsts)
Prevent cookie hijacking and get an A+ rating from SSL Labs.

### [Setup Availability Monitoring](/new-relic/#configure-ping-monitors-for-availability) (Optional)
New Relic provides a free availability monitoring service that sends a request to designated URLs from configured locations at given intervals and alerts you via email if a response fails.

