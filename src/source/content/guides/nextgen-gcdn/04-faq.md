---
title: Next-generation Global CDN
subtitle: Frequently Asked Questions
navtitle: FAQs
description: Get answers to your Next-generation Global CDN questions.
tags: [cache, cdn, security]
contributors: [conorbauer, jazzsequence]
showtoc: true
reviewed: "2026-09-29"
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

Eligible sites will see a next-generation GCDN banner on the site dashboard. If you don't see the banner, your site may fall into one of the excluded categories (AGCDN or FES). If you aren't sure about your eligibility, please reach out to Pantheon Support.

### Are new sites created on the next-generation GCDN by default?

Yes, as of September 10, 2026. New sites created on Pantheon are provisioned on the next-generation GCDN by default. Sites created before this date are not affected and remain eligible for migration through the normal [migration path](/guides/nextgen-gcdn/setup). [Advanced Global CDN (AGCDN)](/guides/agcdn) customers are not affected by this change. If you have questions, [contact Pantheon Support](/guides/support/contact-support/).

### I have a Custom Certificate. Can I migrate?

Yes. Sites using [customer-provided TLS certificates](/custom-certificates) are supported on GCDN. Migration for these sites is owned by our Professional Services team and coordinated through support — [open a support ticket](/guides/support/contact-support/) to get started.

### I use AGCDN. What should I do?

Do not upgrade your site to the next-generation GCDN yet. AGCDN compatibility is being rolled out in waves, so don't start this work on your own. Wait to hear from Pantheon Support or your Account Team, and we'll reach out when your site is ready.

Your current AGCDN configuration continues to work in the meantime.

If you've already started the upgrade on an AGCDN site, do not change your DNS records. [Contact Pantheon Support](/guides/support/contact-support/) for next steps.

### What is the timeline for AGCDN to be supported?

AGCDN compatibility is rolling out in waves. Pantheon Support or your Account Team will contact you when your site is ready to upgrade.

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

Yes. The new Pantheon GCDN supports Orange-to-Orange (O2O) configurations, allowing you to keep your own Cloudflare zone in front of Pantheon. O2O setup requires the [GCDN Terminus plugin](https://github.com/pantheon-systems/terminus-gcdn-plugin) and a specific DNS record sequence in your Cloudflare zone — see [Using Cloudflare in Front of Pantheon (Orange-to-Orange)](#using-cloudflare-in-front-of-pantheon-orange-to-orange) for the full steps.

For more information on how O2O works, refer to the [SaaS customer documentation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

### I use a platform vanity domain. Can I migrate?

Yes. Organization-owned [vanity hostnames](/guides/domains/vanity-domains) (e.g., `live-mysite.example-agency.com`) are fully supported. Migration for these sites is owned by our Professional Services team and coordinated through support — [open a support ticket](/guides/support/contact-support/) to get started.

### How are SSL/TLS certificates issued?

SSL/TLS certificates are issued through DNS TXT record validation by default, which lets your certificate be issued before you update DNS. Add the TXT records provided by the dashboard or the `terminus gcdn:dns` command to your DNS provider. Once the TXT records are verified, your certificate is automatically provisioned. If you'd rather not add a second TXT record for the certificate, HTTP-01 validation is also available as an alternative setup through the [GCDN Terminus plugin](https://github.com/pantheon-systems/terminus-gcdn-plugin): once your one domain-ownership TXT record verifies, run `terminus gcdn:verify <site>.live <domain> --method=http` to point DNS and issue the certificate over HTTP. With HTTP-01, the certificate can't be pre-provisioned, so there may be brief downtime during cutover.

### My domain hasn't verified yet. What can I do?

The platform re-checks DNS on an automatic backoff schedule that starts at ~60-second intervals and grows to a 4-hour cap. If your TXT records have just propagated, or you stepped away and the next scheduled check is hours out, open the domain on the **Domains** page and use **Force Recheck** in the troubleshooting message. This resets the backoff and triggers an immediate validation attempt. See [Re-running Domain Verification](/guides/nextgen-gcdn/setup) in Setup for details and pre-flight tips.

### How do I report issues or give feedback?

Join the Pantheon Community Slack to share feedback, report issues, or ask questions. You can also contact Pantheon support through the normal channels.
