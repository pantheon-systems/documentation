---
title: Pantheon Global CDN
subtitle: GCDN Beta with Bot Protection
description: The GCDN Beta introduces built-in bot protection. Learn what's included, how to migrate, and what to expect.
tags: [cache, cdn, security]
contributors: [conorbauer, jazzsequence]
showtoc: true
permalink: docs/guides/global-cdn/global-cdn-beta
contenttype: [guide]
innav: [false]
categories: [cache, optimize]
cms: [drupal, wordpress]
audience: [development]
product: [cdn]
integration: [--]
---

The new GCDN provides the same caching and content delivery you rely on today, plus new security features built into the CDN layer.

## What's Included

### Bot Protection

Bot protection is enabled by default on all migrated sites. There is no additional configuration or cost required.

- **Automated bot detection and scoring** — Incoming traffic is automatically evaluated and scored. Requests identified as malicious receive managed challenges.
- **Verified bot identification** — Legitimate bots (such as Googlebot, Bingbot, and other search engine crawlers) are recognized and allowed through automatically. Unverified malicious bots are challenged.

### Bot Exclusions

If your site relies on a custom bot or automated service that is not on the verified bot list, it may be challenged or blocked. Contact Pantheon support to request an exclusion for your bot's user agent.

After migrating to the GCDN Beta, monitor your automated integrations (CI/CD tools, feed importers, monitoring services, API clients) to ensure they are not being blocked. If a service stops working, check whether its user agent is being challenged and contact support to add an exclusion.

### Client Challenges

When the GCDN identifies a request as potentially automated or malicious, it may present a challenge to the visitor. This is a non-intrusive verification that confirms the visitor is human before allowing access to your site.

### Content Converter

Content Converter (Markdown for Agents) is enabled on all new GCDN zones. When a client sends a request with the `Accept: text/markdown` header, the CDN automatically converts the HTML response to Markdown in real time. This makes it easier for LLMs, AI agents, and other programmatic consumers to process your site's content without needing to parse raw HTML.

To request Markdown from a GCDN Beta site:

```bash{promptUser: user}
curl -H "Accept: text/markdown" https://example.com
```

- This is enabled automatically on all GCDN Beta zones — no action is required.
- Standard browser requests (without the `Accept: text/markdown` header) are not affected and receive normal HTML responses.
- The response includes an `x-markdown-tokens` header indicating the estimated token count of the Markdown document.

### Caching

Caching behavior is the same as the current GCDN. Your existing caching configuration carries over without changes.

- The Pantheon Advanced Page Cache module (Drupal) and plugin (WordPress) work the same way. Granular, surrogate-key-based cache clearing is fully supported.
- `Cache-Control` headers set by your application are respected.
- Static assets are cached at the edge automatically.
- Tracking parameters (`utm_*`, `__*`) are stripped from cache keys, consistent with current GCDN behavior (`PANTHEON_STRIPPED` logic).
- Analytics cookies (Google Analytics, HubSpot, etc.) are excluded from cache key generation so they don't fragment your cache.

### Eligibility

The Beta is open to most GCDN customers running Drupal or WordPress sites. The following configurations are not eligible at this time:

| Configuration | Reason |
| --- | --- |
| Advanced Global CDN (AGCDN) | Separate migration initiative |
| Custom Certificates | Special certificate management not yet supported |
| Multi-Zone Failover | Feature not available in Beta |
| Next.js / Front-End Sites (FES) | Not yet supported |

## Setup

### Activation

Eligible sites will see a GCDN Beta banner on the site dashboard in Pantheon.

1. Look for the banner on your site dashboard in Pantheon.
1. Click the banner and follow the guided activation steps.
1. Update your DNS records to point to the new GCDN infrastructure (see below).

You can also activate via the Terminus CLI (see [Terminus CLI](#terminus-cli) below).

### Domains and DNS

After activating the GCDN Beta, you will need to update your DNS records to point to the new infrastructure. The process is:

1. Verify domain ownership:

   ```bash{promptUser: user}
   terminus domain:verify <site>.live example.com
   ```

   This will show TXT records. Add them to your DNS provider.

   ```bash{promptUser: user}
   terminus domain:verify <site>.live www.example.com
   ```

1. Review the recommended DNS settings:

   ```bash{promptUser: user}
   terminus domain:dns <site>.live
   ```

1. Update your DNS records with the values from step 2 at your DNS provider.

- You will receive new CNAME targets pointing to Pantheon's new GCDN infrastructure.
- Set your TTL as low as possible before making changes to minimize propagation delay.
- TLS certificates are automatically provisioned once domain verification completes.

<Alert title="Note" type="info">

DNS changes may take time to propagate depending on your current TTL settings. During propagation, traffic may alternate between the old and new CDN. This is normal and resolves once propagation completes.

</Alert>

### Terminus CLI

A Terminus plugin is available to upgrade your site to GCDN with bot protection.

#### Install the plugin

```bash{promptUser: user}
terminus self:plugin:install pantheon-systems/terminus-gcdn-plugin
```

#### Upgrade a site

```bash{promptUser: user}
terminus gcdn:upgrade <site>
```

This activates the GCDN upgrade for the specified site, enabling the migration to the new GCDN infrastructure.

#### Post-upgrade steps

After running `gcdn:upgrade`, follow the [Domains and DNS](#domains-and-dns) steps above to re-add, verify, and point your custom domains to the new infrastructure.

#### Full workflow example

```bash{promptUser: user}
terminus gcdn:upgrade my-site
terminus domain:verify my-site.live example.com
terminus domain:verify my-site.live www.example.com
terminus domain:dns my-site.live
```

Add the TXT and DNS records to your DNS provider with the output from the commands above.

## FAQ

### What is the timeline for GCDN GA and new AGCDN?

GCDN GA is late Q2/Early Q3. AGCDN features will be moved to a new self managed AGCDN service beginning late Q2. As feature parity is reached, you will be contacted.

### What changes when I migrate?

Your site's CDN infrastructure is upgraded to the next-generation GCDN. You get bot protection automatically. Caching behavior remains the same, including Pantheon Advanced Page Cache support. You will need to update your DNS records.

### Will my site have downtime during migration?

No. The migration process is designed to avoid downtime. During DNS propagation, traffic may temporarily alternate between the old and new CDN, but your site remains accessible throughout.

### Do I need to change my application code?

No. The migration is transparent to your Drupal or WordPress application. No code changes are required.

### Does the Pantheon Advanced Page Cache module/plugin still work?

Yes. The Drupal module and WordPress plugin for Pantheon Advanced Page Cache work the same way on the new infrastructure. Surrogate-key-based cache clearing is fully supported.

### I use AGCDN. What should I do?

No action is required. AGCDN has its own migration initiative and timeline. Your current AGCDN configuration continues to work. AGCDN customers are excluded from the Beta.

### I have a Custom Certificate. Can I migrate?

Not yet. Custom certificate management is not supported in the Beta. This will be addressed before General Availability.

### What is Content Converter?

Content Converter (Markdown for Agents) is a feature enabled on all GCDN Beta zones. When a request includes the `Accept: text/markdown` header, the CDN converts HTML responses to Markdown in real time. This makes your site's content easier for LLMs and AI agents to consume. Standard browser traffic is not affected.

### My automated integration stopped working after migration. What do I do?

Your bot or automated service may be receiving a managed challenge from bot protection. Check whether the service's user agent is being challenged by reviewing its error logs (look for 403 responses or HTML challenge pages). Contact Pantheon support to request a bot exclusion for your user agent.

### How do I report issues or give feedback?

Join `#beta-gcdn` in the Pantheon Community Slack to share feedback, report issues, or ask questions. You can also contact Pantheon support through the normal channels.

### How do I know if my site is eligible?

Eligible sites will see a GCDN Beta banner on the site dashboard. If you don't see the banner, your site may fall into one of the excluded categories (AGCDN, Custom Certificates, Multi-Zone Failover, or FES). If you aren't sure about your eligibility, please reach out to Pantheon Support.
