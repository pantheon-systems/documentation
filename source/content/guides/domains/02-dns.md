---
title: Domains on Pantheon
subtitle: Domain Name System
description: Learn what DNS is, and how to utilize it to configure your domain name to Pantheon's servers.
use: [docs_tags]
tags: [dns]
contributors: [alexfornuto]
layout: guide
showtoc: true
permalink: docs/guides/domains/dns
anchorid: dns
contenttype: guide
categories: [domains]
newcms: []
audience: [development, sysadmin]
product: [dashboard]
integration: []
---

Pantheon does not offer DNS management services. However, we can help you to understand how DNS works, and configure your domain to point to your Pantheon site.

## DNS Provider Instructions

<Accordion title="DNS Host-Specific Instructions" id="host-specific2" icon="info-sign">

<DNSProviderDocs />

</Accordion>

## DNS Terminology

<dl>

<dt>TLD</dt>

<dd>

Stands for **Top Level Domain**. This is the last piece of your website URL (`.com`, `.net`, `.org`, etc)

</dd>

<dt>Registrar</dt>

<dd>

The service through which you purchase a domain name. Most registrars also offer DNS management services.

</dd>

<dt>Domain</dt>

<dd>

The last section of your website name before the TLD, the domain is what you purchase from the Registrar.

</dd>

<dt>Subdomain</dt>

<dd>

Separate by periods (`.`), subdomains precede the domain name. `www` is the most commonly seen subdomain. Subdomains can also stack (example: `www.something.example.com`).

</dd>

<dt>Authoritative Name Server</dt>

<dd>

The service that publishes your domain's DNS records

</dd>

</dl>

## DNS Record Types

| Name     | Description                                      |
|:-------- |:------------------------------------------------ |
| `A`      | Points a domain or subdomain to an IPv4 address. |
| `AAAA`   | Points a domain or subdomain to an IPv6 address. |
| `CNAME`  | Points a domain or subdomain
| `MX`     | Used to specify email servers. Note that Pantheon does not offer email services, so your MX records shouldn't be pointed at Pantheon. |
| `TXT`    | These are generic records, used by many services for different things. |
| `NS`     | Specifies where the authoritative name servers for this domain are. |

## DNS Propagation

Every DNS record has a **Time To Live** (**TTL**) value, which specifies how long any DNS server should hold that record, before dropping it and asking for a new version from its upstream DNS provider. TTLs are usually set in seconds with a few common ones being `86400` (24 hours),  `43200` (12 hours), `3600` (1 hour), and `500` (5 minutes).

**DNS Propagation** is the time it takes for changes made to DNS records to be reflected across DNS servers globally. A lower TTL value means faster propagation, but it's important to note that it is not a 1:1 ratio. Between your [authoritative name server](#where-are-my-dns-records-hosted) and the DNS servers of any particular ISP could be any number of intermediate DNS servers. Each server in that chain will wait for the records it holds to expire before requesting new ones. Because of this, it can take *several times longer* than your record's TTL value to see changes reflected for everyone.

### DNS Migration Preparation

Follow these simple steps to help minimize DNS-related downtime when you're planning a site migration:

1. Lower the TTL values as low as allowed (usually `500`) several days in advance at your DNS service manager. That way when the values are changed, new records are propagated faster.

1. Use `dig` to confirm the new TTL values have propagated to your ISP's DNS servers:

    ```bash{outputLines:2}
    dig +nocmd +noall +answer pantheon.io
    pantheon.io.            60      IN      A       23.185.0.2
    ```

    In the example above, the TTL of the A record for`pantheon.io` is 60 seconds.

1. Raise the TTL values back to `3600` (24 hours) after the migration is complete to improve stability in case of a DNS service outage.

## More Resources

- [Launch Essentials](/guides/launch)
- [Platform and Custom Domains](/guides/domains)
- [Configure Redirects](/guides/redirect)