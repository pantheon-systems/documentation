---
title: Launch Essentials
subtitle: Connect a Domain Name
description: Learn how to connect your domain to your Pantheon-hosted site.
layout: guide
showtoc: true
categories: [go-live]
tags: [dns, https, launch, webops]
permalink: docs/guides/launch/domains/
anchorid: domains
---

This section provides information on how to connect a bare domain and `www` domain to Pantheon's Live environment.

<Alert title="Note" type="info">

Pantheon is not a domain registrar, and we do not offer DNS management as a service. To connect a custom domain to Pantheon, you need to register the domain with a third-party provider.

</Alert>

The steps below will guide you through the process of migrating a site onto Pantheon for the first time. If you are migrating a site already on Pantheon, follow the steps for [relaunching an existing Pantheon site](/relaunch).

## Connect Domain

1. Access the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.

1. Navigate to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.

1. Enter the `www` domain (for example, `www.example.com`), then click **Connect Domain**. You'll enter the bare domain (without the `www`) in a later step.

1. Verify ownership by adding a new DNS TXT value or by uploading a file to a specific URL. Select the method you prefer, and follow the instructions. Note that the values are randomized for security. 

1. Click **Verify Ownership** to confirm, or to skip HTTPS provisioning for now, click **Skip without HTTPS**.

  It can take 30 minutes or more for DNS records to propagate, depending on your DNS host and your domain's TTL values. If you encounter issues after 30 minutes, check the following:

    - Ensure that there's no "parking page" or redirect configured in your DNS.

    - The TXT record's Host value doesn't have a trailing `.`

    - That the [DNS value has propagated](https://www.whatsmydns.net/#TXT/).

1. Open a new tab or browser window, and copy the **Required Values** to your [DNS](/dns) provider. If you see:

  > Waiting for HTTPS, DNS records will be provided when HTTPS provisioning completes.

  Wait one minute, then refresh the page.

1. Click **<span class="glyphicons glyphicons-arrow-left"></span> Back to Domains/HTTPS**.

1. Select **Connect Domain** and enter the bare domain (for example, `example.com`, and then click **Connect Domain**.

## Existing Sites

### Avoid HTTPS Interruption

Sites can pre-provision certificates and avoid HTTPS service interruption by verifying ownership of the domain.

To pre-provision HTTPS, Certification Authority Authorization (CAA) records must either:

- Not exist for the domain and its parent domains, **OR**
- Authorize Let's Encrypt

<Alert title="Warning" type="danger">

Skipping this step will result in service interruption for existing sites that require or expect HTTPS. If you skip this step, HTTPS will be available within an hour after DNS routes to Pantheon.

After you begin this process, you have:

- 7 days to complete the challenge response. After that, you must create a new challenge.
- 30 days to adjust DNS values.

</Alert>

1. Navigate to the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.

1. Select the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.

1. Select **Details** next to the bare domain.

1. Click **<span class="glyphicons glyphicons-download-alt"></span> Download File**.

1. Serve the file from your existing live site. Drupal 7 users can use the [Let's Encrypt Challenge](https://www.drupal.org/project/letsencrypt_challenge) module to easily serve the contents of the challenge file.

    <Alert title="Note" type="info">

    The validation file to pre-provision HTTPS must be accessible over HTTP, not just HTTPS. A redirect from HTTP to HTTPS will work, but if a request over HTTP returns a 404, for example, the validation will fail.
    
   A misconfiguration of the validation file invalidates these records. You will receive an error message if the DNS validation fails.
    
   </Alert>

1. Return to the Pantheon Site Dashboard and refresh the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.

Your domain's HTTPS certificate(s) will begin to generate automatically after your verify domain ownership. The certificate will automatically deploy to Pantheon’s Global CDN within an hour.

You can switch DNS destinations from your existing site to your new Pantheon site without HTTPS interruption when your certificate is ready.

### Maintenance Window

You will not be able to pre-provision HTTPS to prevent service interruption if you can't prove domain ownership (for example, WP Engine blocks serving the required challenge file). We recommend completing the next section ([Configure DNS](/guides/launch/configure-dns)) during a planned maintenance window lasting up to one hour. HTTPS will be available for the domain within an hour of pointing DNS to Pantheon.

## More Resources

- [Platform and Custom Domains](/guides/domains)

- [Test a Domain Not Resolved to Pantheon](/guides/launch/advanced-curls/#test-a-domain-not-resolved-to-pantheon)

- [Provision HTTPS](/guides/launch/configure-dns/#provision-https)