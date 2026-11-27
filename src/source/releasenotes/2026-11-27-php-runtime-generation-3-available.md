---
title: "PHP Runtime Generation 3 (Debian 13) available; new sites from January 2027, existing sites in March 2027"
published_date: "2026-11-27"
categories: [infrastructure, action-required]
description: "PHP Runtime Generation 3 runs PHP on Debian 13 and is available to opt into now. New sites use it from January 2027, and existing sites will be upgraded in March 2027."
---

[PHP Runtime Generation 3](/php-runtime-generation-3) runs your site's PHP on Debian 13. Debian 12, which Generation 2 runs on, stopped receiving regular security updates on July 11, 2026 and now has only limited Long Term Support (LTS) until June 30, 2028. Generation 3 is available to opt into now. New sites will use it from January 2027, and existing sites will be upgraded in March 2027.

## What's New

- Debian 13, which receives regular security updates until August 2028 and LTS until June 30, 2030
- OpenSSL 3.5, curl 8.14 and ICU 76
- The same PHP versions (5.6 to 8.5) and PHP extension versions as Generation 2

### What's Changing?

- The oauth extension is not available for PHP 5.6 and 7.0
- Sorting text with PHP's `Collator` may return a different order (ICU 76)
- SFTP and Git connections using DSA keys are rejected (OpenSSH 10)

Review the [full list of changes](/php-runtime-generation-3#known-changes-and-requirements).

## Action Recommended

Test your site on Generation 3 before the rollout reaches it. Add the following to `pantheon.yml` on Dev or a Multidev environment:

```yaml:title=pantheon.yml
php_runtime_generation: 3
```

Once your site works, deploy to Test and Live. Sites cannot opt out of the March 2027 rollout, so test before then and [contact support](/guides/support/contact-support) if you find an issue.

## Rollout Timeline

| Phase | Date | Details |
|-------|------|---------|
| **Opt-in** | Available now | Environments can be opted in. All other environments remain on Generation 2. |
| **New Sites** | January 2027 | New sites created on the platform use Generation 3. |
| **Rollout** | March 2027 | Existing sites are gradually upgraded to Generation 3, completing by March 31, 2027. There is no opt-out. |
