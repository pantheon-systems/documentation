---
title: Launch Essentials
subtitle: Domains / HTTPS
launch: true
anchorid: domains
generator: pagination
layout: guide
pagination:
    provider: data.launchpages
use:
    - launchpages
    - docs_tags
permalink: docs/guides/launch/domains/
nexturl: guides/launch/configure-dns/
nextpage: Configure DNS and HTTPS
previousurl: guides/launch/plans/
previouspage: Upgrade Site Plan
editpath: launch/03-domains.md
image: getting-started-Largethumb
---
Now that you've upgraded to a paid plan, we're ready to connect a custom domain in the Pantheon Site Dashboard. [Free, automated HTTPS](/docs/https/) is automatically provisioned for each new custom domain added to an environment using Let's Encrypt.

## Connect Domain
1. Access the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.
2. Navigate to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.
3. Select **Connect Domain** and enter the `www` domain (e.g., `www.example.com`) then click **Connect Domain**.
4. Click **<span class="glyphicons glyphicons-arrow-left"></span> Back to Domains/HTTPS**.
5. Select **Connect Domain** and enter the bare domain (e.g., `example.com`) then click **Connect Domain**.

## Existing Sites
### Verify your domain to provision HTTPS (Optional)
If you add a domain to the Pantheon Site Dashboard that is pointing to an existing HTTPS site you will be guided to verify domain ownership and pre-provision certificates in order to avoid an HTTPS service interruption. This is optional and you can skip directly to updating DNS if you are okay waiting up to an hour for HTTPS to be ready.

After verifying domain ownership, your domain's HTTPS certificate(s) will automatically begin generating and be deployed to Pantheon’s Global CDN within an hour. When a certificate is ready you can switch DNS destinations from your existing site to your new Pantheon site without HTTPS interruption.

<div class="alert alert-danger">
<h4 class="info">Warning</h4>
Skipping this step will result in service interruption for existing sites that require or expect HTTPS. If you skip this step, HTTPS will be available within an hour after DNS routes to Pantheon.
</div>

1. Access the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.
2. Navigate to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.
3. Select **Details** next to the bare domain.
4. Click **<span class="glyphicons glyphicons-download-alt"></span> Download File**.
5. Serve the file from your existing live site.
6. Return to the Pantheon Site Dashboard and click the **Check Validation File** button.

Once the certificate(s) has been provisioned, you may safely continue without fear of HTTPS service interruption.

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#local-test"><h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-info-sign"></span> Test Locally Before Updating DNS (optional)</h3></a>
  </div>
  <div id="local-test" class="collapse" markdown="1" style="padding:10px;">
  Before updating DNS, you can validate HTTPS configuration for the domain on Pantheon by testing locally:

  1. Access the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.
  2. Navigate to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.
  3. Select **Details** next to the bare domain.
  4. Copy the A record value provided in the Pantheon Site Dashboard.
  5. Add a line to your [local hosts <span class="glyphicons glyphicons-new-window-alt"></span>](https://en.wikipedia.org/wiki/Hosts_(file)) file with the IP address from the previous step followed by the domain name, for example:

          192.123.456.789 example.com

  6. Test your site locally by entering your domain with HTTPS in the browser (e.g., `https://www.example.com/`).
  7. Once you have finished testing, remove the edits made to your hosts file.
  </div>
</div>
