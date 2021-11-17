---
title: Launch Essentials
subtitle: Configure DNS and Provision HTTPS
description: Part four of our Launch Essentials guide covers DNS records and HTTPS provisioning.
anchorid: dns
categories: [go-live]
tags: [dns, https, launch, webops]
type: guide
permalink: docs/guides/launch/configure-dns/
editpath: launch/04-configure-dns.md
image: getting-started-Largethumb
---

In this lesson we'll configure DNS and provision [free, automated HTTPS](/https) on Pantheon.

<Alert title="Note" type="info">

If your site is already live and serving HTTPS traffic, and will require HTTPS on Pantheon, return to [Connect a Domain Name](/guides/launch/domains) and complete the steps to pre-provision HTTPS before updating DNS to avoid downtime.

</Alert>

These instructions cover the common `example.com` and `www.example.com` domain configuration. For other domain configurations, see [Platform and Custom Domains](/domains/#custom-domains).

<Partial file="configure-dns.md" />

For more detailed instructions pertaining to your specific DNS host, click below:

<Accordion title=" DNS Host-Specific Instructions" id="host-specific2" icon="info-sign">

<DNSProviderDocs />

If you are having difficulties issuing a [Let's Encrypt](https://letsencrypt.org/) certificate you can run diagnostics at [Let's Debug](https://letsdebug.net/). This tool can identify an array of issues specifically for [Let's Encrypt](https://letsencrypt.org/) certificates including problems with DNS, nameservers, networking issues, common website misconfigurations, and CA policy issues.
  
</Accordion>

Click [here](/dns/#frequently-asked-questions) to learn more about DNS settings.

<Partial file="enable-https.md" />

<Partial file="https-requirements.md" />
