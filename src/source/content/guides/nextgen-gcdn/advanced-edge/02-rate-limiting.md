---
title: Next-generation Global CDN
subtitle: "Rate Limiting"
navtitle: Rate Limiting
description: Limit how many requests a single client can make to a site environment using the rate_limit setting in pantheon-edge.yml.
tags: [cache, cdn, security]
contributors: [conorbauer, jazzsequence]
showtoc: true
reviewed: "2026-10-12"
permalink: docs/guides/nextgen-gcdn/advanced-edge/rate-limiting
contenttype: [guide]
innav: [false]
categories: [cache, optimize]
cms: [drupal, wordpress]
audience: [development]
product: [cdn]
integration: [--]
---

Rate Limiting limits how many requests a single client can make to a site environment in a set time window. Clients that go over the limit receive an HTTP 429 (Too Many Requests) response at the edge, so the extra requests never reach your site. Use Rate Limiting to protect your site from scrapers, aggressive bots, and traffic spikes from a single source.

## Where to configure it

Add a `rate_limit` section to `pantheon-edge.yml`. Your workspace's plan must include Rate Limiting. For how the file works and how changes go live, see [Configure features with pantheon-edge.yml](/guides/nextgen-gcdn/advanced-edge#configure-features-with-pantheon-edgeyml).

## Settings

| Setting | Required | Values | What it does |
| --- | --- | --- | --- |
| `criteria` | ✓ | `ip`, `ja4` | How clients are counted. `ip` counts each client IP address separately. `ja4` counts each JA4 fingerprint separately. See [Choosing between IP and JA4](#choosing-between-ip-and-ja4). |
| `tier` | ✓ | `relaxed`, `standard`, `strict`, `extreme`, `noop` | Which limit applies. `noop` means no limit. |
| `penalty_seconds` | ❌ | Whole seconds | How long a client stays blocked after going over the limit. If you leave it out, the default is 120 seconds (60 seconds for `extreme`). Set it to `0` for no lockout: the client is only refused while it is over the limit. |
| `fingerprint_missing_policy` | ❌ | `skip`, `fallback_ip`, `block` | Only for `criteria: ja4`. What to do with a request that has no JA4 fingerprint. `skip` (default) doesn't rate limit it, `fallback_ip` counts it by IP address instead, and `block` refuses it. |

## Tiers

| Tier | Limit | Average rate | Default penalty |
| --- | --- | --- | --- |
| `relaxed` | 2,500 requests per 60 seconds | About 42 requests per second | 120 seconds |
| `standard` | 500 requests per 10 seconds | 50 requests per second | 120 seconds |
| `strict` | 1,000 requests per 10 seconds | 100 requests per second | 120 seconds |
| `extreme` | 300 requests per 10 seconds | 30 requests per second | 60 seconds |
| `noop` | No limit | None | None |

## Examples

Limit each IP address to the `standard` tier:

```yaml:title=pantheon-edge.yml
rate_limit:
  criteria: ip
  tier: standard
```

Limit by JA4 fingerprint, count requests without a fingerprint by IP, and lock out offenders for 5 minutes:

```yaml:title=pantheon-edge.yml
rate_limit:
  criteria: ja4
  tier: strict
  fingerprint_missing_policy: fallback_ip
  penalty_seconds: 300
```

Refuse requests only while a client is over the limit, with no lockout:

```yaml:title=pantheon-edge.yml
rate_limit:
  criteria: ip
  tier: relaxed
  penalty_seconds: 0
```

Keep the section in the file but turn rate limiting off:

```yaml:title=pantheon-edge.yml
rate_limit:
  criteria: ip
  tier: noop
```

## What a rate-limited client sees

A request over the limit receives an HTTP 429 response with the plain-text body "Too Many Requests". The response includes a `Retry-After` header with the number of seconds until the client can try again, and it is never cached.

```http
HTTP/2 429
retry-after: 118
cache-control: no-store

Too Many Requests
```

## How counting works

- All of an environment's hostnames share one limit for each client. For example, requests from one IP address to `www.example.com` and `example.com` count toward the same limit if both hostnames point to the same environment.
- Requests are counted separately at each edge location, not across the whole network.
- The penalty is fixed. It starts when the client first goes over the limit and ends on time, even if the client keeps sending requests. If you change the tier while a client is blocked, its current penalty still runs to the end.
- If rate limiting can't be checked for a request, the request is allowed through to your site. Rate Limiting never causes a 5xx error.

## Choosing between IP and JA4

- **IP** (`criteria: ip`) counts each IP address separately. It is the simplest option, but a client that spreads requests across many IP addresses can stay under the limit. Many visitors behind the same IP address, such as an office, school, or mobile network, share one limit.
- **JA4** (`criteria: ja4`) counts each JA4 fingerprint separately. JA4 identifies the client software making the request, based on how it sets up its secure (TLS) connection. A bot that switches IP addresses but keeps the same software keeps the same fingerprint. Real visitors using the same browser and version often share a fingerprint too, so on a busy site they count toward the same limit. Choose a tier that leaves room for your peak traffic.

## Limits

- One `rate_limit` rule per site environment.
- Only the pre-defined tiers are available. Custom request counts and custom time windows aren't supported.
- `penalty_seconds` must be `0` or longer than the tier's window: more than 60 for `relaxed`, and more than 10 for `standard`, `strict`, and `extreme`.
- `fingerprint_missing_policy` can only be used with `criteria: ja4`.
- Rate limiting by user agent, path, or ASN isn't available.

## Scope

Applies to one site environment, across all of that environment's hostnames. Each environment uses the `pantheon-edge.yml` in its own code.
