---
title: Next-generation Global CDN
subtitle: Frequently Asked Questions
navtitle: FAQs
description: Get answers to your Next-generation Global CDN questions.
tags: [cache, cdn, security]
contributors: [conorbauer, jazzsequence]
showtoc: true
reviewed: "2026-11-16"
permalink: docs/guides/nextgen-gcdn/faq
contenttype: [guide]
innav: [false]
categories: [cache, optimize]
cms: [drupal, wordpress]
audience: [development]
product: [cdn]
integration: [--]
---

## Next Generation GCDN (Cloudflare-based)

This section provides answers to frequently asked questions about our Next Generation GCDN powered by Cloudflare.

### How do I know if my site is eligible?

Eligible sites will see a next-generation GCDN banner on the site dashboard. If you don't see the banner, your site may use Front-End Sites (FES), which isn't eligible. [Advanced Global CDN (AGCDN)](/guides/agcdn) sites also won't show the upgrade button until you've spoken with Pantheon. See [I use AGCDN. What should I do?](#i-use-agcdn-what-should-i-do). If you aren't sure about your eligibility, please reach out to Pantheon Support.

### How do I upgrade to the next-generation GCDN?

Start the upgrade from the site dashboard or with the [GCDN Terminus plugin](https://github.com/pantheon-systems/terminus-gcdn-plugin), then update your DNS records. See [Upgrade to next-generation GCDN](/guides/nextgen-gcdn/setup) for the full steps. If your site uses AGCDN, Pantheon coordinates the upgrade with you instead. See [I use AGCDN. What should I do?](#i-use-agcdn-what-should-i-do).

### Are new sites created on the next-generation GCDN by default?

Yes, as of September 10, 2026. New sites created on Pantheon are provisioned on the next-generation GCDN by default. Sites created before this date are not affected and remain eligible for migration through the normal [migration path](/guides/nextgen-gcdn/setup). [Advanced Global CDN (AGCDN)](/guides/agcdn) customers are not affected by this change. If you have questions, [contact Pantheon Support](/guides/support/contact-support/).

### I have a Custom Certificate. Can I migrate?

Yes. Sites using [customer-provided TLS certificates](/custom-certificates) are supported on GCDN. Migration for these sites is owned by our Professional Services team and coordinated through support — [open a support ticket](/guides/support/contact-support/) to get started.

### I use AGCDN. What should I do?

Pantheon coordinates the upgrade for AGCDN sites. You can't start it on your own. The upgrade button doesn't appear on the site dashboard until you've spoken with Pantheon, and you shouldn't run `terminus gcdn:upgrade` either, because Pantheon needs to upload your AGCDN configuration first.

Pantheon Support will open a support ticket and email you by December 15, 2026 to schedule the upgrade. You can also [contact Pantheon Support](/guides/support/contact-support/) or your Account Team at any time to get started sooner.

Your current AGCDN configuration continues to work in the meantime.

If you've already started the upgrade on an AGCDN site, do not change your DNS records. [Contact Pantheon Support](/guides/support/contact-support/) for next steps.

### What is the timeline for AGCDN to be supported?

Pantheon Support will contact AGCDN customers by December 15, 2026 with a support ticket and an email to coordinate the upgrade. You don't need to wait for that message to ask about your site. [Contact Pantheon Support](/guides/support/contact-support/) or your Account Team.

### What changes when I migrate?

Your site's CDN infrastructure is upgraded to the next-generation GCDN. You get bot protection automatically. Caching behavior remains the same, including Pantheon Advanced Page Cache support. You will need to update your DNS records.

### Do I need to change my application code?

No. The migration is transparent to your Drupal or WordPress application. No code changes are required.

### Will my site have downtime during migration?

No. The migration process is designed to avoid downtime. During DNS propagation, traffic may temporarily alternate between the old and new CDN, but your site remains accessible throughout.

### Does the Pantheon Advanced Page Cache module/plugin still work?

Yes. The Drupal module and WordPress plugin for Pantheon Advanced Page Cache work the same way on the new infrastructure. Surrogate-key-based cache clearing is fully supported.

### What is Content Converter?

Content Converter (Markdown for Agents) is a feature enabled on all next-generation GCDN zones. When a request includes the `Accept: text/markdown` header, the CDN converts HTML responses to Markdown in real time. This makes your site's content easier for LLMs and AI agents to consume. Standard browser traffic is not affected.

### My automated integration stopped working after migration. What do I do?

Check whether the service is receiving a managed challenge from bot protection (look for 403 responses or HTML challenge pages in its error logs). If so, generate a bot bypass token for your site with `terminus gcdn:bot-bypass <site>` and configure the service to send it in the `x-pantheon-bot-bypass` request header — see [Bot Bypass Tokens](/guides/nextgen-gcdn#bot-bypass-tokens) for setup steps. If the token doesn't cover your situation, contact Pantheon support to request an exception.

### I have Cloudflare in front of my site. Is that supported?

Yes. The new Pantheon GCDN supports Orange-to-Orange (O2O) configurations, allowing you to keep your own Cloudflare zone in front of Pantheon. O2O setup requires the [GCDN Terminus plugin](https://github.com/pantheon-systems/terminus-gcdn-plugin) and a specific DNS record sequence in your Cloudflare zone — see [Migrate a Cloudflare-Proxied Domain (O2O)](/guides/nextgen-gcdn/o2o) for the full steps.

For more information on how O2O works, refer to the [SaaS customer documentation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

### I use a platform vanity domain. Can I migrate?

Yes. Organization-owned [vanity hostnames](/guides/domains/vanity-domains) (e.g., `live-mysite.example-agency.com`) are fully supported. Migration for these sites is owned by our Professional Services team and coordinated through support — [open a support ticket](/guides/support/contact-support/) to get started.

### How are SSL/TLS certificates issued?

Cloudflare issues and renews a certificate for each custom domain once it has validated the domain. Domain ownership is a separate TXT record (`_cf-custom-hostname`), required once with every method. For the certificate:

- **DCV delegation CNAME (recommended):** `terminus gcdn:dns` from the [GCDN Terminus plugin](https://github.com/pantheon-systems/terminus-gcdn-plugin) shows an `_acme-challenge` CNAME. Add it once and keep it: Cloudflare uses it to issue the certificate before you update DNS, and to renew it.
- **TXT record:** the dashboard currently shows a TXT record for the certificate, and `terminus gcdn:verify <site>.live <domain> --cert-txt` shows it too. Its value can change with each verification attempt, so check the current value before you add or update the record. At renewal, Cloudflare attempts to fall back to HTTP validation, but we recommend keeping the DCV delegation CNAME in place so renewals don't depend on that fallback.
- **HTTP-01:** run `terminus gcdn:verify <site>.live <domain> --method=http`. The certificate is issued over HTTP once DNS points to Pantheon, so it can't be issued in advance and there may be brief downtime during cutover. It's likely to fail while the domain is proxied through Cloudflare. If HTTP-01 is your best option, disable proxying (DNS only) while the challenge completes.

### My domain hasn't verified yet. What can I do?

The platform re-checks DNS on an automatic backoff schedule: seconds apart at first, then a few minutes apart, then up to an hour apart. If your records have just propagated, or you stepped away and the next scheduled check is up to an hour out, run `terminus gcdn:verify <site>.live <domain>`, or open the domain on the **Domains** page and use **Force Recheck** in the troubleshooting message. See [Re-running Domain Verification](/guides/nextgen-gcdn/setup) in Setup for details and pre-flight tips.

### How do I report issues or give feedback?

Join the Pantheon Community Slack to share feedback, report issues, or ask questions. You can also contact Pantheon support through the normal channels.
