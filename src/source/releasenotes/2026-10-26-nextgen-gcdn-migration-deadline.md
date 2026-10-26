---
title: "Upgrade to next-generation Global CDN by March 31, 2027"
published_date: "2026-10-26"
published_at: "2026-10-26T00:00:00Z"
categories: [infrastructure, action-required]
description: "Upgrade your sites to the next-generation Global CDN, powered by Cloudflare, by March 31, 2027. Pantheon will migrate sites that haven't upgraded by then, beginning in April 2027."
---

Pantheon will move all sites to the next-generation Global CDN, powered by Cloudflare. Upgrade your sites by March 31, 2027. Pantheon will migrate sites that you haven't self-upgraded by then, beginning in April 2027. Pantheon shares this early to give you time for this migration alongside other platform updates.

## What you get

The next-generation Global CDN includes [bot protection](https://pantheon.io/blog/democratizing-pantheon-global-cdn), on by default at no additional cost. Bot protection scores incoming traffic, challenges suspicious requests, and lets verified bots, such as search engine crawlers, through. The next-generation Global CDN also supports Multizone Failover, custom certificates, and platform vanity domains.

## Action required

Upgrade each site by March 31, 2027. Find the GCDN banner on the Site Dashboard and follow the [migration instructions](/guides/nextgen-gcdn/setup).

If your site uses a custom SSL certificate or a vanity domain, [contact Support](/guides/support/contact-support/) for assistance:

- For custom SSL certificates, Pantheon re-uploads your certificate to the new CDN before your domains move over.
- For vanity domains, Pantheon works with you to update your vanity domain's DNS during the migration.

## Exceptions

This applies to every Pantheon site, with two exceptions:

1. Sites already on the next-generation Global CDN, including all [sites created on or after September 10, 2026](/release-notes/2026/09/new-sites-next-gen-gcdn-default). Sites that still need to migrate show a GCDN banner on the Site Dashboard.
1. Sites that use Advanced Global CDN (AGCDN). Don't upgrade these yourself. Pantheon will contact you by December 15, 2026 to coordinate the migration. Wait for Pantheon's guidance before you take action. See the [latest AGCDN migration release note](/release-notes/2026/10/nextgen-agcdn-migrations) for details.

## If you don't take action

Pantheon will automatically migrate sandbox sites to the next-generation Global CDN by the end of 2026.

After the March 31, 2027 deadline, Pantheon will migrate any remaining sites. Pantheon will notify you at least 60 days before the scheduled migration. Upgrading yourself lets you choose when the change happens.

## Need help?

- Review the [next-generation Global CDN setup guide](/guides/nextgen-gcdn/setup).
- Contact your Pantheon Customer Success Manager or account team.
- Open a [support ticket](/guides/support/contact-support/) from the Site Dashboard.
