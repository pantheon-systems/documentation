---
title: Pantheon Global CDN
subtitle: Next-generation GCDN with Bot Protection
description: Pantheon's next-generation GCDN introduces built-in bot protection. Learn what's included, how to migrate, and what to expect.
tags: [cache, cdn, security]
contributors: [conorbauer, jazzsequence]
showtoc: true
reviewed: "2026-07-07"
permalink: docs/guides/global-cdn/next-gen-global-cdn
contenttype: [guide]
innav: [false]
categories: [cache, optimize]
cms: [drupal, wordpress]
audience: [development]
product: [cdn]
integration: [--]
---

Pantheon's next-generation GCDN provides the same caching and content delivery you rely on today, plus new security features built into the CDN layer.

## What's Included

### Bot Protection

Bot protection is enabled by default on all migrated sites. There is no additional configuration or cost required.

- **Automated bot detection and scoring** — Incoming traffic is automatically evaluated and scored. Requests identified as malicious receive managed challenges.
- **Verified bot identification** — Legitimate bots (such as Googlebot, Bingbot, and other search engine crawlers) are recognized and allowed through automatically. Unverified malicious bots are challenged.

### Bot Exclusions

If your site relies on a custom bot or automated service that is not on the verified bot list, it may be challenged or blocked. Contact Pantheon support to request an exclusion for your bot's user agent.

After migrating to the next-generation GCDN, monitor your automated integrations (CI/CD tools, feed importers, monitoring services, API clients) to ensure they are not being blocked. If a service stops working, check whether its user agent is being challenged and contact support to add an exclusion.

### Custom Certificates

Sites using [customer-provided TLS certificates](/custom-certificates) are now supported on GCDN. Migration for these sites is owned by our Professional Services team and coordinated through support — [open a support ticket](/guides/support/contact-support/) to get started.

### Platform vanity domains

Organization-owned [vanity hostnames](/guides/domains/vanity-domains) (e.g., `live-mysite.example-agency.com`) are fully supported. Migration for these sites is owned by our Professional Services team and coordinated through support — [open a support ticket](/guides/support/contact-support/) to get started.

### Client Challenges

When the next-generation GCDN identifies a request as potentially automated or malicious, it may present a challenge to the visitor. This is a non-intrusive verification that confirms the visitor is human before allowing access to your site.

### Content Converter

Content Converter (Markdown for Agents) is enabled on all new GCDN zones. When a client sends a request with the `Accept: text/markdown` header, the CDN automatically converts the HTML response to Markdown in real time. This makes it easier for LLMs, AI agents, and other programmatic consumers to process your site's content without needing to parse raw HTML.

To request Markdown from a next-generation GCDN site:

```bash{promptUser: user}
curl -H "Accept: text/markdown" https://example.com
```

- This is enabled automatically on all next-generation GCDN zones — no action is required.
- Standard browser requests (without the `Accept: text/markdown` header) are not affected and receive normal HTML responses.
- The response includes an `x-markdown-tokens` header indicating the estimated token count of the Markdown document.

### Caching

Caching behavior is the same as the legacy GCDN. Your existing caching configuration carries over without changes.

- The Pantheon Advanced Page Cache module (Drupal) and plugin (WordPress) work the same way. Granular, surrogate-key-based cache clearing is fully supported.
- `Cache-Control` headers set by your application are respected.
- Static assets are cached at the edge automatically.
- Tracking parameters (`utm_*`, `__*`) are stripped from cache keys, consistent with legacy GCDN behavior (`PANTHEON_STRIPPED` logic).
- Analytics cookies (Google Analytics, HubSpot, etc.) are excluded from cache key generation so they don't fragment your cache.

### Eligibility

GCDN is available to all sites on the platform except those currently using [Advanced Global CDN (AGCDN)](/guides/agcdn). AGCDN customers will be migrated in a future phase — no action is required from them at this time.

## Setup

<Alert title="Important" type="danger">

For the best experience, be prepared to update your DNS records as soon as possible after starting the migration. Delaying DNS migration can result in inconsistent behavior, as your site will remain on the old CDN infrastructure until DNS is pointed to the new GCDN.

</Alert>

<Alert title="Custom Domains Must Not Use CNAMEs to Platform Hostnames" type="danger">

Custom domains that use a CNAME record in their DNS settings that point to a Pantheon platform hostname (for example, `live-yoursite.pantheonsite.io`) are not supported by the next-generation GCDN and will not be supported going forward. Sites configured this way will experience interruptions when migrated.

Before activating the next-generation GCDN, check your custom domain's DNS configuration. It must resolve via A/AAAA records as shown on the site's **Domains** page, not via a CNAME pointed at a `*.pantheonsite.io` hostname. If the **Domains** page shows `Remove this detected record` next to a CNAME, remove it from your DNS provider. See [Custom Domains](/guides/domains/custom-domains) for details.

If your custom domain currently points at a platform hostname via CNAME, contact Pantheon Support before requesting migration.

</Alert>

<TabList>

<Tab title="Pantheon Dashboard" id="dashboard-setup" active={true}>

### Activation

Eligible sites will see a next-generation GCDN banner on the site dashboard in Pantheon.

1. Look for the banner on your site dashboard in Pantheon.
1. Click the banner and follow the guided activation steps.
1. Update your DNS records to point to the new GCDN infrastructure (instructions will be provided in the dashboard).

![gcdn banner in pantheon dashboard](../../../images/guides/gcdn-beta-banner.png)

### Platform Hostnames

After you click upgrade, your platform hostnames (`*.pantheonsite.io`) are automatically migrated to the new GCDN infrastructure. You do not need to take any action for these domains. It is normal to see a few minutes of downtime on platform hostnames while the migration completes.

### Domains and DNS
<Alert title="SSL/TLS Certificate Issuance — TXT Records Required" type="danger">

**TXT record validation is the only supported method for issuing SSL/TLS certificates**. You must add DNS TXT records to verify domain ownership before a certificate can be provisioned. HTTP validation and other methods are not available at this time. If you cannot add TXT records at your DNS provider, you will not be able to complete the migration.

</Alert>

After activating the next-generation GCDN through the dashboard, you will need to update your DNS records to point to the new infrastructure.

1. The dashboard will provide TXT records for domain verification. Add these TXT records to your DNS provider. **TXT record validation is the only supported method for issuing SSL/TLS certificates during the Beta.** HTTP validation and other methods are not available.

1. Once domain verification completes and your SSL/TLS certificate has been issued, the dashboard will display the recommended DNS settings (CNAME targets).

1. Update your DNS records with the provided CNAME values at your DNS provider.

- You will receive new CNAME targets pointing to Pantheon's new GCDN infrastructure.
- Set your TTL as low as possible before making changes to minimize propagation delay.
- TLS certificates are automatically provisioned once domain verification completes.

<Alert title="Note" type="info">

DNS changes may take time to propagate depending on your current TTL settings. During propagation, traffic may alternate between the old and new CDN. This is normal and resolves once propagation completes.

</Alert>

### Re-running Domain Verification

If you've added the TXT records and a domain is still pending verification, you can manually trigger a recheck from the dashboard. Open the domain on the **Domains** page; once verification has been attempted, a troubleshooting message appears with a **Force Recheck** action.

The platform retries DNS validation automatically on a backoff schedule:

- The first 10 attempts run roughly every 60 seconds (about 20 minutes total).
- Attempts 10 through 39 stretch from about 4 minutes apart up to 4 hours apart.
- Attempt 40 and beyond stay capped at 4 hours between checks.

**Force Recheck** resets that schedule and triggers an immediate validation attempt. It's useful when you added your TXT records and propagation took a while, or you stepped away during the process and the platform is now deep into the slower part of the backoff — instead of waiting hours for the next scheduled attempt, you can kick off a new check right away.

Before you click:

- Confirm your TXT records have propagated using a DNS lookup tool (for example, `dig TXT _acme-challenge.example.com`).
- ACME TXT challenges are valid for 7–14 days depending on the certificate authority. If yours have expired, regenerate them from the dashboard before forcing a recheck.

</Tab>

<Tab title="Terminus CLI" id="terminus-setup">

<Alert title="Note" type="info">

Before proceeding with Terminus commands, you must first install the GCDN Terminus plugin.

</Alert>

<Alert title="Note" type="info">

During the Beta, DNS-01 TXT record validation is the only supported method for domain verification. You will need to add TXT records to your DNS provider to verify domain ownership.

</Alert>

### Install the plugin

```bash{promptUser: user}
terminus self:plugin:install pantheon-systems/terminus-gcdn-plugin
```

If you have existing custom domains on your site, follow all of the steps below to upgrade and migrate your DNS.

### 1. Upgrade your site to next-generation GCDN

```bash{promptUser: user}
terminus gcdn:upgrade <site>
```

This migrates the site from Fastly to Cloudflare GCDN across all environments. Your platform hostnames (`*.pantheonsite.io`) are automatically migrated as part of this step. It is normal to see a few minutes of downtime on platform hostnames while the migration completes.

### 2. Get your DNS records and TXT verification challenges

```bash{promptUser: user}
terminus gcdn:dns <site>.live
```

This will show the TXT records needed for domain ownership and certificate validation.

### 3. Add TXT records to your DNS provider

Add the TXT records from step 2 to your DNS provider.

### 4. Verify your domains

Wait a few minutes for DNS propagation, then verify each domain. Verification typically takes a few minutes to complete:

```bash{promptUser: user}
terminus gcdn:verify <site>.live example.com
terminus gcdn:verify <site>.live www.example.com
```

### 5. Update your DNS records

Once verification passes, add the CNAME or A/AAAA records shown in the `gcdn:dns` output to point your domains to the new GCDN edge.

- Set your TTL as low as possible before making changes to minimize propagation delay.
- TLS certificates are automatically provisioned once domain verification completes.

<Alert title="Note" type="info">

DNS changes may take time to propagate depending on your current TTL settings. During propagation, traffic may alternate between the old and new CDN. This is normal and resolves once propagation completes.

</Alert>

### Full workflow example

```bash{promptUser: user}
terminus gcdn:upgrade my-site
terminus gcdn:dns my-site.live
# Add TXT records to your DNS provider, wait a few minutes, then verify:
terminus gcdn:verify my-site.live example.com
terminus gcdn:verify my-site.live www.example.com
# Once verified, add the CNAME or A/AAAA records from gcdn:dns output
```

</Tab>

</TabList>

## Known Limitations

### Terminus commands experience syntax errors

Next-generation GCDN sites must use Terminus [version 4.1.9](https://github.com/pantheon-systems/terminus/releases/tag/4.1.9) or higher when interacting with sites that have the next-generation GCDN enabled. Using older versions of Terminus may result in errors such as `[debug] json_decode exception: Syntax error` or `[error]  Pantheon headers missing, which is not quite right.`. 

### CNAMEs to Platform Hostnames Not Supported

Custom domains that use a CNAME in their DNS configuration pointing to a Pantheon platform hostname (for example, `live-yoursite.pantheonsite.io`) are not supported. Custom domains must resolve via A/AAAA records, or — after migration — via the CNAME values for the GCDN edge provided by the dashboard. Sites with a CNAME to a platform hostname will experience interruptions when migrated. See [Custom Domains](/guides/domains/custom-domains) and contact Pantheon Support before migration if affected.

## FAQ

### How do I know if my site is eligible?

Eligible sites will see a next-generation GCDN banner on the site dashboard. If you don't see the banner, your site may fall into one of the excluded categories (AGCDN, Custom Certificates, or FES). If you aren't sure about your eligibility, please reach out to Pantheon Support.

### I have a Custom Certificate. Can I migrate?

Yes. Sites using [customer-provided TLS certificates](/custom-certificates) are supported on GCDN. Migration for these sites is owned by our Professional Services team and coordinated through support — [open a support ticket](/guides/support/contact-support/) to get started.

### I use AGCDN. What should I do?

No action is required. AGCDN has its own migration initiative and timeline. Your current AGCDN configuration continues to work. AGCDN customers are excluded from the Beta.

### What is the timeline for AGCDN to be supported?

AGCDN features will be moved to a new self managed AGCDN service beginning late Q2. As feature parity is reached, you will be contacted.

### What changes when I migrate?

Your site's CDN infrastructure is upgraded to the next-generation GCDN. You get bot protection automatically. Caching behavior remains the same, including Pantheon Advanced Page Cache support. You will need to update your DNS records.

### Do I need to change my application code?

No. The migration is transparent to your Drupal or WordPress application. No code changes are required.

### Will my site have downtime during migration?

No. The migration process is designed to avoid downtime. During DNS propagation, traffic may temporarily alternate between the old and new CDN, but your site remains accessible throughout.

### Does the Pantheon Advanced Page Cache module/plugin still work?

Yes. The Drupal module and WordPress plugin for Pantheon Advanced Page Cache work the same way on the new infrastructure. Surrogate-key-based cache clearing is fully supported.

### What is Content Converter?

Content Converter (Markdown for Agents) is a feature enabled on all GCDN Beta zones. When a request includes the `Accept: text/markdown` header, the CDN converts HTML responses to Markdown in real time. This makes your site's content easier for LLMs and AI agents to consume. Standard browser traffic is not affected.

### My automated integration stopped working after migration. What do I do?

Your bot or automated service may be receiving a managed challenge from bot protection. Check whether the service's user agent is being challenged by reviewing its error logs (look for 403 responses or HTML challenge pages). Contact Pantheon support to request a bot exclusion for your user agent.

### I have another CDN or WAF in front of my site. Is that supported?

The new Pantheon GCDN supports Orange-to-Orange (O2O) configurations, allowing you to keep your existing CDN or WAF in front of Pantheon. Your site's DNS entries must use CNAME records pointing to the Pantheon GCDN zone entries (e.g., `fe1.cfp-us-central1-ch-1.edge.pantheon.io`).

O2O requires CNAME records. Using A/AAAA records is not compatible with O2O and may result in site downtime or inaccessibility.

For more information on how O2O works, refer to the [SaaS customer documentation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

We are actively testing this configuration during the Beta and welcome customer feedback in the Pantheon Community Slack.

### I use a platform vanity domain. Can I migrate?

Yes. Organization-owned [vanity hostnames](/guides/domains/vanity-domains) (e.g., `live-mysite.example-agency.com`) are fully supported. Migration for these sites is owned by our Professional Services team and coordinated through support — [open a support ticket](/guides/support/contact-support/) to get started.

### How are SSL/TLS certificates issued?

SSL/TLS certificates are issued exclusively through DNS TXT record validation. You must add the TXT records provided by the dashboard or the `terminus gcdn:dns` command to your DNS provider. Once the TXT records are verified, your certificate is automatically provisioned. HTTP validation and other certificate issuance methods are not supported at this time.

### My domain hasn't verified yet. What can I do?

The platform re-checks DNS on an automatic backoff schedule that starts at ~60-second intervals and grows to a 4-hour cap. If your TXT records have just propagated, or you stepped away and the next scheduled check is hours out, open the domain on the **Domains** page and use **Force Recheck** in the troubleshooting message. This resets the backoff and triggers an immediate validation attempt. See [Re-running Domain Verification](#re-running-domain-verification) in Setup for details and pre-flight tips.

### How do I report issues or give feedback?

Join the Pantheon Community Slack to share feedback, report issues, or ask questions. You can also contact Pantheon support through the normal channels.
