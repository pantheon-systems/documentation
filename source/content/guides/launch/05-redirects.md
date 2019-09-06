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
editpath: launch/05-redirects.md
image: getting-started-Largethumb
---

In this lesson, we'll redirect all traffic to a primary domain via HTTPS, which is a best practice for security and SEO. This means if you choose `www.example.com` as your primary domain, then if a visitor types in `example.com` into their browser (or any other domain you have connected to your site), they will end up on `https://www.example.com`.

<Alert title="Note" type="info">

Make sure HTTPS has been successfully provisioned *before* adding any code (like the sample below) that will redirect traffic to HTTPS.

</Alert>

1. Navigate to **<span class="glyphicons glyphicons-embed-close"></span> Code** in the **<span class="glyphicons glyphicons-wrench"></span> Dev** tab of your Site Dashboard. Confirm your Connection Mode is set to **SFTP**.

2. Click **<span class="glyphicons glyphicons-info-sign"></span> SFTP Connection Info** to access the credentials for connecting to your preferred SFTP client.

3. Click **Open in your default SFTP client**, and enter your User Dashboard password when prompted.

  If you run into issues, please refer to [this documentation](/sftp/#sftp-connection-information).

4. Open the `code` folder in your SFTP client.

4. As part of best security practices, we suggest you [Require HTTPS with the HSTS Header](/pantheon-yml/#enforce-https--hsts). Download your site's `pantheon.yml` file and follow the recommendations for enforcing HTTPS on your site.

4. Now download your site's `settings.php` (Drupal) or `wp-config.php` (WordPress) file.

5. Edit your configuration file by adding the following snippet for the desired redirect (replace `example.com`):

  <Partial file="_redirects.md" />

6. Upload the configuration file to Pantheon using your SFTP client.

7. Return to the **<span class="glyphicons glyphicons-wrench"></span> Dev** tab of your Pantheon Site Dashboard. The files you just changed will be highlighted in yellow.


8. Add a commit message, then click **Commit** to add these files to your Dev environment.

9. Deploy your changes to the **<span class="glyphicons glyphicons-equalizer"></span> Test** environment and then up to the **<span class="glyphicons glyphicons-cardio"></span> Live** environment.

10. Navigate to the **<span class="glyphicons glyphicons-cardio"></span> Live** environment and click **<span class="glyphicons glyphicons-new-window-alt"></span> Visit Live Site** to test the redirect logic.

<Accordion title="Level Up: Configure Site Monitoring Services  (Optional)" id="host-specific1" icon="graduation-cap">

## Ready to launch like the pros?
Now that you're redirecting requests to a single, primary domain, it's the perfect time to setup a availability monitoring service to watch over it like an automated hawk.

### [Send an HSTS Header for Increased Security](/pantheon-yml/#enforce-https-+-hsts)
Install a plugin or module to prevent cookie hijacking and get an A+ rating from SSL Labs.

### [Setup Availability Monitoring](/new-relic/#configure-ping-monitors-for-availability)
New Relic provides a free availability monitoring service that sends a request to designated URLs from configured locations at given intervals and alerts you via email when a response fails.

</Accordion>
