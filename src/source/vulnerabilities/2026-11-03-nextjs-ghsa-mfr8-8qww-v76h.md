---
title: "Next.js: GHSA-mfr8-8qww-v76h and six other security advisories"
published_date: "2026-11-03"
status: action-required
cves: []
advisories: [GHSA-mfr8-8qww-v76h, GHSA-vc7v-qv4w-wrv8, GHSA-vvgp-ww4w-46vf, GHSA-rhh4-g77r-r9qj, GHSA-pc58-hwjq-p385, GHSA-f3mh-rxg3-f5g2, GHSA-7qx7-33qx-rqx2]
affects: Next.js applications before 16.4.5 (16.x) or 15.5.29 (15.x)
customer_action: Update your application and redeploy
description: "Next.js 16.4.5 and 15.5.29 fix one high-severity and six medium-severity vulnerabilities. Customers update their own Next.js dependencies and redeploy."
---

## What is the vulnerability?

The [Next.js security release](https://nextjs.org/blog/november-2026-security-release) fixes seven vulnerabilities: one high-severity and six medium-severity. Most affect applications that use specific features, such as Cache Components, Edge runtime routes, or image optimization. Severity labels are from the Next.js announcement.

| Severity | Issue | Advisory |
| --- | --- | --- |
| High | Cross-tenant cache disclosure with `unstable_cache` and `use cache` | [GHSA-mfr8-8qww-v76h](https://github.com/vercel/next.js/security/advisories/GHSA-mfr8-8qww-v76h) |
| Medium | Cross-root-parameter disclosure in nested `use cache` functions | [GHSA-vc7v-qv4w-wrv8](https://github.com/vercel/next.js/security/advisories/GHSA-vc7v-qv4w-wrv8) |
| Medium | Shared shell cache poisoning in self-hosted applications | [GHSA-vvgp-ww4w-46vf](https://github.com/vercel/next.js/security/advisories/GHSA-vvgp-ww4w-46vf) |
| Medium | Cross-user cache disclosure through binary `use cache` arguments | [GHSA-rhh4-g77r-r9qj](https://github.com/vercel/next.js/security/advisories/GHSA-rhh4-g77r-r9qj) |
| Medium | Cross-client response injection in self-hosted applications | [GHSA-pc58-hwjq-p385](https://github.com/vercel/next.js/security/advisories/GHSA-pc58-hwjq-p385) |
| Medium | Cookie exposure through an internal header on Edge routes | [GHSA-f3mh-rxg3-f5g2](https://github.com/vercel/next.js/security/advisories/GHSA-f3mh-rxg3-f5g2) |
| Medium | SVG rejection bypass in image optimization | [GHSA-7qx7-33qx-rqx2](https://github.com/vercel/next.js/security/advisories/GHSA-7qx7-33qx-rqx2) |

## Are sites on Pantheon affected?

Next.js applications are affected if they run an affected version and use the features described in each advisory. Review the linked advisories for affected configurations. The vulnerabilities are in the Next.js framework code in your application, not in the Pantheon platform.

## What Pantheon has done

Pantheon doesn't update Next.js on your behalf, because Next.js is a dependency of your application.

## What you need to do

Update your Next.js application to a patched version and redeploy:

- Next.js 16.x: update to **16.4.5**. This fixes all seven issues.
- Next.js 15.x: update to **15.5.29**. This fixes the cross-client response injection, Edge cookie exposure, and SVG rejection bypass issues.

## References

- [Pantheon release note](/release-notes/2026/11/nextjs-security-release)
- [Next.js security release announcement](https://nextjs.org/blog/november-2026-security-release)
