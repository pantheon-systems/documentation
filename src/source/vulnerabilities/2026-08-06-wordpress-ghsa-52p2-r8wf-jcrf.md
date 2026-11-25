---
title: "CVE-2026-64638: WordPress 7.0.3 security fixes, including a pre-authentication reflected XSS (GHSA-52p2-r8wf-jcrf)"
published_date: "2026-08-06"
status: action-required
cves: [CVE-2026-64638]
advisories: [GHSA-52p2-r8wf-jcrf]
affects: WordPress core before 7.0.3, and older branches without a backport
customer_action: Update core
description: "WordPress 7.0.3 fixes a pre-authentication reflected XSS that can lead to remote code execution, plus several authenticated XSS issues. Pantheon added mitigations and published backports for older branches."
---

## What is the vulnerability?

[WordPress 7.0.3](https://wordpress.org/news/2026/08/wordpress-7-0-3-release/) resolves a number of security vulnerabilities and is associated with CVE-2026-64638. It includes:

- A [pre-authentication reflected XSS attack](https://github.com/WordPress/wordpress-develop/security/advisories/GHSA-52p2-r8wf-jcrf) that can lead to remote code execution. It is present in all versions of WordPress back to 4.7. Unlike wp2shell, it requires specific targeting of a user to be effective.
- Several other XSS issues that require an authenticated user.

## Are sites on Pantheon affected?

Yes. WordPress sites running a version before 7.0.3 are affected until you update.

## What Pantheon has done

- Pantheon pre-deployed platform-wide mitigations (virtual patching through the routing network) against external abuse of the vulnerability, and monitors those rules. The mitigations don't replace the update.
- Pantheon published backport patches for older WordPress branches to the [Pantheon WordPress upstream](https://github.com/pantheon-systems/WordPress/releases).

## What you need to do

Update to WordPress 7.0.3 as soon as possible from your Pantheon dashboard or Terminus. See [how to apply core updates](/core-updates#apply-upstream-updates-via-the-site-dashboard).

If you're on an older branch, update to the patched release for your branch: 6.9.6, 6.8.7, 6.7.6, 6.6.6, 6.5.9, 6.4.9, 6.3.9, 6.2.10, 6.1.11, 6.0.13, 5.9.15, 5.8.14, 5.7.16, 5.6.18, 5.5.19, 5.4.20, 5.3.22, 5.2.25, 5.1.23, or 5.0.26. Find these in the [Pantheon WordPress upstream releases](https://github.com/pantheon-systems/WordPress/releases).

## References

- [Pantheon release note](/release-notes/2026/08/wordpress-7-0-3)
- [WordPress 7.0.3 release announcement](https://wordpress.org/news/2026/08/wordpress-7-0-3-release/)
- [WordPress 7.0.3 documentation](https://wordpress.org/documentation/wordpress-version/version-7-0-3/)
