---
title: Next.js Security Release now available
published_date: "2026-11-03"
published_at: "2026-11-03T7:07:00Z"
categories:
  - nextjs
  - action-required
  - security
description: Security updates address one high-severity and six medium-severity vulnerabilities affecting Next.js applications, with fixes in Next.js 16.4.5 and 15.5.29.
---

The latest security update for Next.js addresses seven vulnerabilities: one high-severity and six medium-severity. Most of them affect applications that use specific features, such as Cache Components, Edge runtime routes, or image optimization.

## Action required

Because this is a security update, we recommend that customers update affected Next.js applications as soon as possible. Customers are responsible for updating their application dependencies and redeploying; Pantheon does not update Next.js sites on customers' behalf.

The published Next.js advisories list **16.4.5** (Active LTS) and **15.5.29** (Maintenance LTS) as patched versions.

## Highlights

This update addresses the following upstream security vulnerabilities. Severity labels are from the [Next.js security release announcement](https://nextjs.org/blog/november-2026-security-release).

* **High — Cross-tenant cache disclosure with `unstable_cache` and `use cache`:** In applications with Cache Components enabled, a public `use cache` function that reads a root parameter, such as a tenant identifier, and is called both directly and from inside `unstable_cache` can return another request's result during a cold cache fill. See [GHSA-mfr8-8qww-v76h](https://github.com/vercel/next.js/security/advisories/GHSA-mfr8-8qww-v76h).
* **Medium — Cross-root-parameter disclosure in nested `use cache` functions:** With Cache Components, an outer cache entry can be stored before an inner function's root-parameter dependencies are recorded, which can disclose tenant-, site-, or locale-specific content. See [GHSA-vc7v-qv4w-wrv8](https://github.com/vercel/next.js/security/advisories/GHSA-vc7v-qv4w-wrv8).
* **Medium — Shared shell cache poisoning in self-hosted applications:** Self-hosted applications running `next start` with Cache Components enabled and Partial Prefetching disabled or unset can have request-specific values stored in a shared fallback shell through a crafted URL. See [GHSA-vvgp-ww4w-46vf](https://github.com/vercel/next.js/security/advisories/GHSA-vvgp-ww4w-46vf).
* **Medium — Cross-user cache disclosure through binary `use cache` arguments:** Distinct binary arguments can produce the same cache identity, so applications that pass security-significant binary arguments through `use cache` and share entries across callers are affected. See [GHSA-rhh4-g77r-r9qj](https://github.com/vercel/next.js/security/advisories/GHSA-rhh4-g77r-r9qj).
* **Medium — Cross-client response injection in self-hosted applications:** Applications that return an attacker-controlled fetched `Response` unchanged can mismatch compressed-response framing, which can be exploited behind an HTTP/1.1 reverse proxy that queues pipelined requests on a shared backend connection. See [GHSA-pc58-hwjq-p385](https://github.com/vercel/next.js/security/advisories/GHSA-pc58-hwjq-p385).
* **Medium — Cookie exposure through an internal header on Edge routes:** App Router Edge Route Handlers and Pages Router Edge API routes that set cookies with `NextResponse.cookies.set()` expose the serialized cookie, including `HttpOnly` cookies, in the internal `x-middleware-set-cookie` response header. Exploitation requires attacker-controlled JavaScript on the same origin. See [GHSA-f3mh-rxg3-f5g2](https://github.com/vercel/next.js/security/advisories/GHSA-f3mh-rxg3-f5g2).
* **Medium — SVG rejection bypass in image optimization:** An attacker-controlled image from a permitted source can be misclassified as AVIF, bypassing `images.dangerouslyAllowSVG: false` when a native image backend that can decode SVG is in use. See [GHSA-7qx7-33qx-rqx2](https://github.com/vercel/next.js/security/advisories/GHSA-7qx7-33qx-rqx2).

Next.js 15.5.29 includes fixes for the cross-client response injection, Edge cookie exposure, and SVG rejection bypass issues. Next.js 16.4.5 includes fixes for all seven.

For full technical details and affected configurations, review the linked security advisories and the [Next.js security release announcement](https://nextjs.org/blog/november-2026-security-release).
