---
title: DNS
description: Learn the basics of DNS.
tags: [dns]
categories: []
contributors: alexfornuto
---

**DNS** stands for Domain Name Service, and it's the protocol by which domain names are pointed to the servers that host content. While Pantheon does not offer DNS management services, we can help you to understand how DNS works, and configure your domain to point to your Pantheon site.

## DNS Terminology

<dl markdown="1">
  <dt>TLD</dt>
    <dd>Stands for **Top Level Domain**. This is the last piece of your website URL (`.com`, `.net`, `.org`, etc)</dd>
  <dt>Registrar</dt>
    <dd>The service through which you purchase a domain name. Most registrars also offer DNS management services.</dd>
  <dt>Domain</dt>
    <dd>The last section of your website name before the TLD, the domain is what you purchase from the Registrar.</dd>
  <dt>Subdomain</dt>
    <dd>Separate by periods (`.`), subdomains preceed the domain name. `www` is the most commonly seen subdomain. Subdomains can also stack (example: `www.something.example.com`).</dd>
  <dt> Authoritative Name Server </dt>
    <dd> The service that publishes your domain's DNS records<dd>
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

## DNS propagation

Every DNS record has a **Time To Live** (**TTL**) value, which specifies how long any DNS server should hold that record, before dropping it and asking for a new version from its upstream DNS provider. TTLs are usually set in seconds with a few common ones being `86400` (24 hours),  `43200` (12 hours), `3600` (1 hour), and `500` (5 minutes).

**DNS Propagation** is the time it takes for changes made to DNS records to be reflected across DNS servers globally. A lower TTL value means faster propagation, but it's important to note that it is not a 1:1 ratio. Between your <a href=#where-are-my-dns-records-hosted data-proofer-ignore>authoritative name server</a> and the DNS servers of any particular ISP could be any number of intermediate DNS servers. Each server in that chain will wait for the records it holds to expire before requesting new ones. Because of this, it can take *several times longer* than your record's TTL value to see changes reflected for everyone.

### DNS Migration Prep

When you're planning a site migration, follow these simple steps to help minimize DNS-related downtime:

1. Lower the TTL values as low as allowed (usually `500`) several days in advance at your DNS service manager. That way when the values are changed, new records are propagated faster.

2. Use `dig` to confirm the new TTL values have propagated to your ISP's DNS servers:

    ```command
    dig +nocmd +noall +answer pantheon.io
    pantheon.io.            60      IN      A       23.185.0.2
    ```

    In the example above, the TTL of the A record for`pantheon.io` is 60 seconds.

3. Once the migration is complete, raise the TTL values back to `3600` (24 hours) to impove stability in case of a DNS service outage.

## Frequently Asked Questions

### Where are my DNS records hosted?

DNS Records are hosted by an **authoritative name server**. This may or may not also be the **registrar** who you purchased the domain name from. You can use the commandline tool **dig** to look up the `NS` record for a domain to find the name server:

```bash
$ dig +short ns pantheon.io
ns-1096.awsdns-09.org.
ns-148.awsdns-18.com.
ns-1857.awsdns-40.co.uk.
ns-924.awsdns-51.net.
```

The example above shows that the records for `pantheon.io` are hosted by AWS.

To find the registrar where your domain is registed, use the commandline tool **whois**:

```bash
$ whois pantheon.io | grep Registrar:
Registrar: Gandi SAS
```

The example above uses `| grep Registrar:` to filter the results to what we're looking for specifically. Remove it to see the full output of the `whois` command. Our example shows that the domain `pantheon.io` is registered with Gandi

<div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p markdown="1"> Your registrar may appear to have DNS records for your domain and still nto be the authoritative name server. use `dig` as described above to confirm the name server in use.</p>
</div>

### Can I buy my domain or manage DNS with Pantheon?

No, Pantheon is neither a domain registrar nor a DNS manager.

### Why does the `www` subdomain redirect to the bare domain?

Some DNS providers provide a default `CNAME` record for `www` pointing to `@` (the bare domain). Remove these records and replace them with the records suggested by the Pantheon Site Dashboard.

### What are `AAAA` records, and do I need them?

**AAAA** or "quad-A" records are used to assign [IPv6](https://en.wikipedia.org/wiki/IPv6){.external} addresses to domain names. While most of the internet still uses IPv4, the address pool has been exhausted and IPv6 became the standard as of July 14th, 2017.

Pantheon provides IPv6 addresses for you to assign `AAAA` records to. If your DNS service does not support `AAAA` you can simply omit this records for now, but consider asking your provider to add functionality, as the need for IPv6 will only increase in the future.


### What about my `MX` records for email?

Pantheon does not provide email services. Make sure your DNS records include an `MX` reacord that points to a subdomain (like `mail`), which in turn has an `A` or `CNAME` record pointing it to your email provider.

### What is the difference between an `A` and `CNAME` record?

An `A` record points a domain name to an IPv4 address. A `CNAME` record points a domain name to *another* domain, but *does not* redirect to it.

Pantheon will provide both `A` and `CNAME` values, depending on the domains provided:

![DNS Values provided by the Pantheon Site Dashboard](/source/docs/assets/images/dashboard/dns-values.png)

If your DNS provider doesn't allow `CNAME` records, you can use `nslookup` to determine the IP address for the domain value, and then supply that as an `A` record:

```bash
$ nslookup live-anita-drupal.pantheonsite.io
Server:         192.168.1.1
Address:        192.168.1.1#53

Non-authoritative answer:
live-anita-drupal.pantheonsite.io       canonical name = fe1.edge.pantheon.io.
Name:   fe1.edge.pantheon.io
Address: 23.185.0.1
Name:   fe1.edge.pantheon.io
Address: 2620:12a:8001::1
Name:   fe1.edge.pantheon.io
Address: 2620:12a:8000::1
```

In the example above, we can create an `A` record for `www` set to `23.185.0.1` to substitute the `CNAME` record.
