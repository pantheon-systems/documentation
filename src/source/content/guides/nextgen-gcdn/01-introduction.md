---
title: Next-generation Global CDN
subtitle: Next-generation GCDN with bot protection
navtitle: Introduction
description: Pantheon's next-generation GCDN introduces built-in bot protection. Learn what's included, how to migrate, and what to expect.
tags: [cache, cdn, security]
contributors: [conorbauer, jazzsequence]
showtoc: true
reviewed: "2026-09-29"
permalink: docs/guides/nextgen-gcdn
contenttype: [guide]
innav: [false]
categories: [cache, optimize]
cms: [drupal, wordpress]
audience: [development]
product: [cdn]
integration: [--]
---

Pantheon's next-generation GCDN provides the same caching and content delivery you rely on today, plus new security features built into the CDN layer.

<Alert title="Advanced Global CDN (AGCDN) Sites: Do Not Upgrade Yet" type="danger">

If your site uses [Advanced Global CDN (AGCDN)](/guides/agcdn), do not upgrade to the next-generation GCDN yet. AGCDN compatibility with the next-generation GCDN is rolling out in waves. Don't start any upgrade work until you hear from Pantheon Support or your Account Team confirming your site is compatible. We'll reach out directly once your site is ready.

</Alert>

## What's Included

### Bot Protection

Bot protection is enabled by default on all migrated sites. There is no additional configuration or cost required.

- **Automated bot detection and scoring** — Incoming traffic is automatically evaluated and scored. Requests identified as malicious receive managed challenges.
- **Verified bot identification** — Legitimate bots (such as Googlebot, Bingbot, and other search engine crawlers) are recognized and allowed through automatically. Unverified malicious bots are challenged.

### Bot Bypass Tokens

If your site relies on automation that is not on the verified bot list, such as uptime monitors, CI/CD tools, feed importers, or custom API clients, bot protection may challenge or block it. You can exempt your own automation by generating a bot bypass token and sending it with your requests.

**1. Install the plugin and generate your site's token:**

```
terminus self:plugin:install pantheon-systems/terminus-gcdn-plugin
terminus gcdn:bot-bypass <site>
```

Use `--format=json` if you're wiring this into CI or a monitoring config. The command prints two tokens for your site — a current token and a next token — each with its Valid From date, Expires date, and the header name to use. You must have access to the site in Pantheon to generate its tokens. The site argument accepts a name or UUID; one token pair covers every environment (dev, test, live, and multidevs).

**2. Add the current token to your automation** as an HTTP request header:

```
x-pantheon-bot-bypass: <token>
```

For example, configure your uptime monitor or CI job to send this custom header on every request to your site.

Requests that carry a valid token skip the standard challenge applied to automated traffic. Targeted protections, rate limiting, the managed WAF, and other platform-level security rules still apply to every request, with or without a token.

Keep in mind:

- **Tokens are valid for 6 months, and new tokens are issued every month.** Each run of the command returns the current token plus a next token that starts 3 months later; both are accepted during that overlap. If you run the command again in a later month, you'll see different values. That is expected: tokens you already deployed keep working until their Expires date and don't need replacing. Switch your automation to the next token on or after its Valid From date, and re-run the command before the token you're using expires.
- **Treat the token like a credential.** Send it only from servers and services you control. Never expose it in client-side code, public repositories, or logs. If a token is leaked, contact Pantheon support to revoke it; a replacement token becomes available at the start of the following month.
- **A missing token gets normal bot evaluation** — no penalty. **An incorrect token is rejected with a 403** on every request, so if your automation starts failing, check the header value first.
- Verified bots (such as Googlebot and Bingbot) are allowed through automatically and do not need a token.

After migrating to the next-generation GCDN, monitor your automated integrations (CI/CD tools, feed importers, monitoring services, API clients) to ensure they are not being blocked. If a service stops working, generate a bot bypass token and add it to that service's requests as described above. If the bypass token doesn't cover your situation, contact Pantheon support to request an exception.

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

Next-gen GCDN is available to all sites on the platform except those currently using [Advanced Global CDN (AGCDN)](/guides/agcdn). AGCDN sites are being made compatible in waves. Until Pantheon confirms your site is ready, do not start the upgrade on an AGCDN site from the dashboard or with Terminus. We'll contact you as soon as your site is ready to upgrade.

## Known Limitations

### Azure Front Door is not supported in front of the next-generation GCDN

Azure Front Door always sets the outbound TLS SNI to the configured origin hostname and does not provide a way to override SNI independently of the origin `Host` header. Because of this, requests from Azure Front Door cannot satisfy the [SNI and `Host` header match requirement](#using-a-third-party-cdn-in-front-of-pantheon) and receive `403` responses from the GCDN edge. Disabling certificate subject name validation in Azure Front Door does not change the SNI it sends and does not work around this.

### Terminus commands experience syntax errors

Next-generation GCDN sites must use Terminus [version 4.1.9](https://github.com/pantheon-systems/terminus/releases/tag/4.1.9) or higher when interacting with sites that have the next-generation GCDN enabled. Using older versions of Terminus may result in errors such as `[debug] json_decode exception: Syntax error` or `[error]  Pantheon headers missing, which is not quite right.`. 

### CNAMEs to Platform Hostnames Not Supported

Custom domains that use a CNAME in their DNS configuration pointing to a Pantheon platform hostname (for example, `live-yoursite.pantheonsite.io`) are not supported. Custom domains must resolve via A/AAAA records, or — after migration — via the CNAME values for the GCDN edge provided by the dashboard. Sites with a CNAME to a platform hostname will experience interruptions when migrated. See [Custom Domains](/guides/domains/custom-domains) and contact Pantheon Support before migration if affected.
