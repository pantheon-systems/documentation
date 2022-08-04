---
title: Launch Essentials
subtitle: Configure DNS and Provision HTTPS
description: Configure your DNS records and provision HTTPS.
anchorid: dns
categories: [go-live]
tags: [dns, https, launch, webops]
type: guide
permalink: docs/guides/launch/configure-dns/
editpath: launch/04-configure-dns.md
image: getting-started-Largethumb
---

This section provides information on how to configure DNS and provision [free, automated HTTPS](/guides/global-cdn/https) on Pantheon.

<Alert title="Note" type="info">

If your site is already live and serving HTTPS traffic, and will require HTTPS on Pantheon, return to [Connect a Domain Name](/guides/launch/domains) and complete the steps to pre-provision HTTPS before updating DNS to avoid downtime.

</Alert>

## Test Locally Before Updating DNS (Optional)
 
You can validate that HTTPS configuration for the domain is ready on Pantheon by testing locally before you update your DNS. 

1. Access the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.

1. Navigate to the **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS** page.

1. Select **Details** next to the bare domain.

1. Copy the A record value provided in the Pantheon Site Dashboard.

1. Add a line to your [local hosts](https://en.wikipedia.org/wiki/Hosts_(file)) file with the IP address from the previous step followed by the domain name, for example:

          `192.123.456.789 example.com`

    This will tell your computer to look for ‘example.com’ at the new Pantheon address.

1. Make sure your site works with HTTPS by entering your domain with HTTPS in the browser (for example, `https://www.example.com/`).

1. Remove the edits made to your hosts file when you finish testing.

## Configure DNS

These instructions cover the common `example.com` and `www.example.com` domain configuration. Refer to [Platform and Custom Domains](/domains/#custom-domains) for other domain configurations.

<Partial file="configure-dns.md" />

Click below for more detailed instructions pertaining to your specific DNS host. 

<Accordion title=" DNS Host-Specific Instructions" id="host-specific2" icon="info-sign">

<DNSProviderDocs />

You can run diagnostics at [Let's Debug](https://letsdebug.net/) if you are having difficulties issuing a [Let's Encrypt](https://letsencrypt.org/) certificate. This tool can identify an array of issues specifically for [Let's Encrypt](https://letsencrypt.org/) certificates, including problems with DNS, nameservers, networking issues, common website misconfigurations, and CA policy issues.
  
</Accordion>

Click [here](/dns/#frequently-asked-questions) to learn more about DNS settings.

<Partial file="enable-https.md" />

<Partial file="https-requirements.md" />

## More Resources

- [Pantheon YAML Configuration Files](/pantheon-yml)

- [Platform and Custom Domains](/domains)

