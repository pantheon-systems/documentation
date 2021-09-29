---
title: Launch Essentials
subtitle: Connect a Domain Name
description: Part three of our Launch Essentials guide covers connecting your domain to your Pantheon-hosted site.
launch: true
anchorid: domains
generator: pagination
layout: guide
categories: [go-live]
tags: [dns, https, launch, webops]
type: guide
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
reviewed: "2020-08-03"
---

In this lesson we'll connect a bare domain and `www` domain to Pantheon's Live environment.

The steps below will guide you through the process of migrating a site onto Pantheon for the first time. If you are migrating a site already on Pantheon, follow the steps for [relaunching an existing Pantheon site](/relaunch).

## Connect Domain

1. Access the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.

1. Navigate to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.

1. Enter the `www` domain (e.g., `www.example.com`) then click **Connect Domain**. We'll enter the bare domain (without the `www`) in Step 7.

1. Verify ownership by adding a new DNS TXT value or by uploading a file to a specific URL. Select the method you prefer, and follow the instructions. Note that the values are randomized for security. Click **Verify Ownership** to confirm, or to skip HTTPS provisioning for now, click **Skip without HTTPS**.

  It might take 30 minutes or more for DNS records to propagate, depending on your DNS host and your domain's TTL values. If you encounter issues after 30 minutes, check some of the following:

    - Ensure that there's no "parking page" or redirect configured in your DNS.
    - The TXT record's Host value doesn't have a trailing `.`.
    - That the [DNS value has propagated](https://www.whatsmydns.net/#TXT/).

1. In a new tab or browser window, copy the **Required Values** to your [DNS](/dns) provider. If you see:

  > Waiting for HTTPS, DNS records will be provided when HTTPS provisioning completes.

  Wait a minute, then refresh the page.

1. Click **<span class="glyphicons glyphicons-arrow-left"></span> Back to Domains/HTTPS**.

1. Select **Connect Domain** and enter the bare domain (e.g., `example.com`) then click **Connect Domain**.

## Existing Sites

### Avoid HTTPS Interruption

Sites can pre-provision certificates and avoid HTTPS service interruption by verifying ownership of the domain.

To pre-provision HTTPS, CAA records must either:

- Not exist for the domain and its parent domains, or
- Authorize Let's Encrypt.

<Alert title="Warning" type="danger">

Skipping this step will result in service interruption for existing sites that require or expect HTTPS. If you skip this step, HTTPS will be available within an hour **after** DNS routes to Pantheon.

Once you begin this process, you have:

- 7 days to complete the challenge response. After that, you must create a new challenge.
- 30 days to adjust DNS values.

</Alert>

1. Access the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.

1. Navigate to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.

1. Select **Details** next to the bare domain.

1. Click **<span class="glyphicons glyphicons-download-alt"></span> Download File**.

1. Serve the file from your existing live site. Drupal 7 users can use the [Let's Encrypt Challenge](https://www.drupal.org/project/letsencrypt_challenge) module to easily serve the contents of the challenge file.

   <Alert title="Note" type="info">

   The validation file to pre-provision HTTPS must be accessible over HTTP, not just HTTPS. A redirect from HTTP to HTTPS will work, but if a request over HTTP returns a 404, for example, the validation will fail.

   If you're unable to host the challenge file, consider using the [Terminus ACME Plugin](https://github.com/pantheon-systems/terminus-acme-plugin) to generate DNS TXT records to validate domain ownership.

   </Alert>

1. Return to the Pantheon Site Dashboard and refresh the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.

After verifying domain ownership, your domain's HTTPS certificate(s) will automatically begin generating and be deployed to Pantheon’s Global CDN within an hour.

When a certificate is ready you can switch DNS destinations from your existing site to your new Pantheon site without HTTPS interruption.

<Accordion title=" Test Locally Before Updating DNS (optional)" id="local-test" icon="info-sign">

  Ready to launch like the pros?
  Before updating DNS, you can validate HTTPS configuration for the domain is ready on Pantheon by testing locally:

  1. Access the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.

  1. Navigate to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.

  1. Select **Details** next to the bare domain.

  1. Copy the A record value provided in the Pantheon Site Dashboard.

  1. Add a line to your [local hosts](https://en.wikipedia.org/wiki/Hosts_(file)) file with the IP address from the previous step followed by the domain name, for example:

          192.123.456.789 example.com

    This will tell your computer to look for ‘example.com’ at the new Pantheon address.

  1. Make sure your site works with HTTPS by entering your domain with HTTPS in the browser (e.g., `https://www.example.com/`).

  1. When you finish testing, remove the edits made to your hosts file.

</Accordion>

### Maintenance Window

If you are unable to prove domain ownership (e.g. WP Engine blocks serving the required challenge file) you will not be able to pre-provision HTTPS to prevent service interruption. In these cases, we recommend completing the next section ([Configure DNS](/guides/launch/configure-dns)) during a planned maintenance window lasting up to one hour. HTTPS will be available for the domain within an hour of pointing DNS to Pantheon.
