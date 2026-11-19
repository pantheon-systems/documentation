---
title: "Next.js: GHSA-2464-fhr4-w9xw, GHSA-xqc2-xf4c-x3h3, and GHSA-h3gv-c5rc-p453"
published_date: "2026-10-14"
status: action-required
cves: []
advisories: [GHSA-2464-fhr4-w9xw, GHSA-xqc2-xf4c-x3h3, GHSA-h3gv-c5rc-p453]
affects: Next.js applications before 16.4.1 (16.x) or 15.5.28 (15.x), and React Server Components packages
customer_action: Update your application and redeploy
description: "Next.js 16.4.1 and 15.5.28 fix two critical remote code execution vulnerabilities and one high-severity denial of service. Customers update their own Next.js dependencies and redeploy."
---

## What is the vulnerability?

This Next.js security update addresses three vulnerabilities in upstream dependencies:

- **Critical, remote code execution in image processing ([GHSA-2464-fhr4-w9xw](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw)):** A vulnerability in the upstream image-processing stack can lead to remote code execution when Next.js processes SVG files on glibc-based Linux systems.
- **Critical, React Flight remote code execution ([GHSA-xqc2-xf4c-x3h3](https://github.com/react/react/security/advisories/GHSA-xqc2-xf4c-x3h3)):** Crafted React Server Component payloads can lead to remote code execution in rare cases involving multiple typed arrays and attacker-controlled values.
- **High, denial of service through Server Functions ([GHSA-h3gv-c5rc-p453](https://github.com/react/react/security/advisories/GHSA-h3gv-c5rc-p453)):** Crafted requests to Server Function endpoints can cause excessive CPU use or out-of-memory exceptions. Applications that don't use server-side React or a framework that supports React Server Components aren't affected.

## Are sites on Pantheon affected?

Next.js applications running an affected version are affected. The vulnerabilities are in the framework and React code in your application, not in the Pantheon platform.

## What Pantheon has done

Pantheon doesn't update Next.js on your behalf, because Next.js is a dependency of your application.

## What you need to do

Update your Next.js application to **16.4.1** or **15.5.28** and redeploy. If your application directly manages React Server Components packages, update them to the patched versions listed in the React advisories: `19.0.9`, `19.1.10`, `19.2.9`, or `19.3.1`, as applicable.

As a workaround for the image-processing issue, use Sharp **0.35.5** or later.

## References

- [Pantheon release note](/release-notes/2026/10/nextjs-security-release)
