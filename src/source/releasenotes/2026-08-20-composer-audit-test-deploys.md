---
title: Composer security advisories can block deploys to Test
published_date: "2026-08-20"
categories: [infrastructure, security, action-required]
---

Integrated Composer runs [`composer audit`](https://getcomposer.org/doc/03-cli.md#audit) on every build to check your dependencies against known security advisories.

- **Dev and Multidev:** Builds always succeed, even if advisories are found.
- **Test:** Deploying to Test fails if the latest Dev build has open advisories you haven't explicitly acknowledged.
- **Live:** Not audited directly, but blocked transitively, since Live only receives code by deploying from Test.

### Action required

If a deploy to Test fails because of a security advisory, update the affected package where possible. When you can't update right away, you can tell Composer to stop flagging specific advisories using the `config.policy` block in `composer.json`, while keeping a version-controlled record of what you've accepted and why.

See [Handling security advisories](/guides/integrated-composer/security-advisories) for how the check works and how to manage your own list of exclusions.
