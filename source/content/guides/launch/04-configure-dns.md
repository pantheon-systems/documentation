---
title: Launch Essentials
subtitle: Configure DNS and Provision HTTPS
description: Part four of our Launch Essentials guide covers DNS records and HTTPS provisioning.
launch: true
anchorid: dns
generator: pagination
layout: guide
type: guide
pagination:
    provider: data.launchpages
use:
    - launchpages
    - docs_tags
permalink: docs/guides/launch/configure-dns/
nexturl: guides/launch/redirects/
nextpage: Redirect to a Primary Domain
previousurl: guides/launch/domains/
previouspage: Connect a Domain to Live
editpath: launch/04-configure-dns.md
image: getting-started-Largethumb
---

In this lesson we'll configure DNS and provision [free, automated HTTPS](/docs/https/) on Pantheon.

<Alert title="Note" type="info">

If your site is already live and serving HTTPS traffic, and will require HTTPS on Pantheon, return to [Connect a Domain Name](/docs/guides/launch/domains/) and complete the steps to pre-provision HTTPS before updating DNS to avoid downtime.

</Alert>

These instructions cover the common `example.com` and `www.example.com` domain configuration. For other domain configurations, see [Platform and Custom Domains](/docs/domains/#custom-domains).

`markdown:configure-dns.md`

For more detailed instructions pertaining to your specific DNS host, click below:

<Accordion title=" DNS Host-Specific Instructions" id="host-specific2" icon="info-sign">

 - [1&1 Domain Configuration](/docs/1-and-1/)
 - [Cloudflare Domain Configuration](/docs/cloudflare/)
 - [DNS Made Easy Domain Configurationi](/docs/dns-made-easy/)
 - [DreamHost Domain Configuration](/docs/dreamhost/)
 - [Dyn Domain Configuration](/docs/dyn/)
 - [eNom Domain Configuration](/docs/enom/)
 - [Gandi Domain Configuration](/docs/gandi/)
 - [GoDaddy Domain Configuration](/docs/godaddy/)
 - [Google Domain Configuration](/docs/google/)
 - [Namecheap Domain Configuration](/docs/namecheap/)
 - [Network Solutions Domain Configuration](/docs/network-solutions/)
 - [Amazon Route 53 Domain Configuration](/docs/route53/)

</Accordion>

`markdown:enable-https.md`


`markdown:https-requirements.md`
