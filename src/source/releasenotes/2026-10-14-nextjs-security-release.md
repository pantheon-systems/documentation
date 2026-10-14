---
title: Next.js Security Release now available
published_date: "2026-10-14"
published_at: "2026-10-14T17:47:59Z"
categories:
  - nextjs
  - action-required
  - security
description: Security updates address two critical and one high-severity vulnerabilities affecting Next.js applications.
---

The latest security update for Next.js addresses three vulnerabilities in upstream dependencies: two critical vulnerabilities and one high-severity vulnerability.

## Action required

Because this is a security update, we recommend that customers update affected Next.js applications as soon as possible. Customers are responsible for updating their application dependencies and redeploying; Pantheon does not update Next.js sites on customers' behalf.

The published Next.js advisory lists **16.4.1** and **15.5.28** as patched versions.

If your application directly manages React Server Components packages, update them to the patched versions listed in the React advisories: `19.0.9`, `19.1.10`, `19.2.9`, or `19.3.1`, as applicable.

## Highlights

This update addresses three upstream security vulnerabilities:

* **Critical — Remote code execution in image processing:** A vulnerability in the upstream image-processing stack can lead to remote code execution when Next.js processes SVG files on glibc-based Linux systems. The advisory identifies Next.js **15.5.28** and **16.4.1** as patched versions. As a workaround, use Sharp **0.35.5** or later. See [GHSA-2464-fhr4-w9xw](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw).
* **Critical — React Flight remote code execution:** Crafted React Server Component payloads can lead to remote code execution in rare cases involving multiple typed arrays and attacker-controlled values. See [GHSA-xqc2-xf4c-x3h3](https://github.com/react/react/security/advisories/GHSA-xqc2-xf4c-x3h3).
* **High — Denial of service through Server Functions:** Crafted requests to Server Function endpoints can cause excessive CPU use or out-of-memory exceptions. Applications that do not use server-side React or a framework that supports React Server Components are not affected. See [GHSA-h3gv-c5rc-p453](https://github.com/react/react/security/advisories/GHSA-h3gv-c5rc-p453).

For full technical details and affected package versions, review the linked security advisories.

