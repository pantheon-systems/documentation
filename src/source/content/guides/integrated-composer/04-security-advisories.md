---
title: Integrated Composer
subtitle: Handling security advisories
description: Learn how Pantheon audits Composer dependencies for security advisories, and how to manage your own list of exclusions.
tags: [composer, workflow, security]
contributors: []
showtoc: true
permalink: docs/guides/integrated-composer/security-advisories
contenttype: [guide]
innav: [false]
categories: [dependencies, security]
cms: [drupal, wordpress]
audience: [development]
product: [composer]
integration: [--]
---

This section explains how Pantheon checks Composer-managed sites for known security advisories, when that check can block a deploy, and how to manage your own list of accepted advisories when you can't update a package right away.

## How the advisory check works

Every Integrated Composer build runs [`composer audit`](https://getcomposer.org/doc/03-cli.md#audit) against your `composer.json` and `composer.lock` files. This check compares your installed packages against known security advisories and reports any matches.

Pantheon treats **Dev and Multidev** differently from **Test**:

- **Dev and Multidev:** The build always succeeds, even if `composer audit` finds advisories. This gives you room to install, test, and iterate on packages before deciding how to handle a reported vulnerability.
- **Test:** Deploying to Test fails if the latest Dev build has open advisories you haven't explicitly acknowledged. This prevents a known-vulnerable dependency from reaching a customer-facing environment without a deliberate decision.

**Live** isn't audited directly. Live only receives code by deploying from Test, so it's blocked transitively: if Test won't accept the build, Live never gets it either.

If a deploy to Test fails, check the deploy's entry in [Workflow Logs](/workflow-logs) in the Site Dashboard for the `composer audit` output. It lists the specific advisories that blocked the deploy so you know what to update or exclude.

<Alert title="Note" type="info">

An advisory that fails a deploy to Test isn't necessarily exploitable on your site. It means Packagist, Drupal.org, or another advisory source has published a known issue for a version range that matches what you have installed. You (or your security team) are best positioned to judge whether it applies to how you use the package.

</Alert>

## Why this matters when you can't update

Updating the affected package is always the preferred fix, and should be your first move. But sometimes that's not possible right away:

- The fix requires a major version bump that isn't compatible with your other dependencies yet.
- The package is abandoned or the fix hasn't been backported to the version line you're on.
- You've reviewed the advisory and determined it doesn't apply to your site's configuration or usage.

In those cases, you can tell Composer to stop flagging specific advisories so your deploy to Test isn't blocked, while keeping a visible, version-controlled record of what you've accepted and why.

## Manage your own exclusion list

Composer's `config.policy` block in `composer.json` controls how `composer audit` treats advisories. This is the mechanism to use for exclusions — not a build script workaround or a CI flag, since Pantheon runs the same `composer audit` your policy configures during the build itself.

<Alert title="Note" type="warning">

The `config.policy: false` shortcut described in the [Composer config docs](https://getcomposer.org/doc/06-config.md#policy) does not currently suppress advisories from `composer audit` output. Use the explicit [`ignore`](https://getcomposer.org/doc/06-config.md#ignore), [`ignore-id`](https://getcomposer.org/doc/06-config.md#ignore-id), and [`ignore-severity`](https://getcomposer.org/doc/06-config.md#ignore-severity) keys below instead.

</Alert>

### Ignore a specific advisory

Use [`ignore-id`](https://getcomposer.org/doc/06-config.md#ignore-id) to silence one advisory ID (or Common Vulnerabilities and Exposures, or CVE, identifier) and leave everything else in the package audited normally, so a new, unrelated vulnerability in the same package still blocks your deploy. This is the most precise option, and the one we recommend by default.

```json:title=composer.json
"config": {
    "policy": {
        "advisories": {
            "ignore-id": {
                "GHSA-xxxx-xxxx-xxxx": "Reviewed 2026-08-20: not exploitable in our setup because we don't use the affected code path. Tracked in TICKET-123."
            }
        }
    }
}
```

We recommend always including a reason. It's the difference between "we made a deliberate call" and "someone silenced this and forgot," and it's what a teammate — or you, in six months — will read before deciding whether the exclusion still holds.

### Ignore an entire package

Use [`ignore`](https://getcomposer.org/doc/06-config.md#ignore) (keyed by package name, not advisory ID) if a package has multiple advisories you've accepted, or you know you're stuck on an old version line for a while:

```json:title=composer.json
"config": {
    "policy": {
        "advisories": {
            "ignore": {
                "vendor/package-name": "Cannot update until we drop PHP 8.1 support. Tracked in TICKET-456."
            }
        }
    }
}
```

Use this deliberately. It also silences advisories reported *after* you add the entry, so revisit these periodically rather than treating them as permanent.

### Ignore by severity

You can also use [`ignore-severity`](https://getcomposer.org/doc/06-config.md#ignore-severity) to ignore advisories below a severity threshold across your whole project:

```json:title=composer.json
"config": {
    "policy": {
        "advisories": {
            "ignore-severity": ["low", "medium", "high", "critical"]
        }
    }
}
```

<Alert title="Note" type="info">

Some advisory sources (including several Drupal SA feeds) don't report a severity at all. `ignore-severity` can't match those, since it only compares against advisories that carry a severity value. If you need to ignore an unscored advisory, use `ignore-id` or `ignore` instead.

</Alert>

## Recommended approach

1. Try to update the package first. An exclusion is a stopgap, not a fix.
2. When you can't update, prefer ignoring the **specific advisory ID** with `ignore-id` over the whole package or a severity band. It keeps you exposed to new problems in the same dependency.
3. We recommend including a reason for every exclusion, ideally with a link to an internal ticket. Treat `composer.json` as the audit trail.
4. Revisit your exclusion list on a schedule (for example, whenever you do routine dependency maintenance) rather than leaving it in place indefinitely.
5. Confirm your changes locally before pushing:

   ```bash{promptUser: user}
   composer audit --format=json
   ```

   An empty `advisories` result means your deploy to Test won't be blocked by the advisories you've addressed.

## More resources

- [Composer audit command](https://getcomposer.org/doc/03-cli.md#audit)
- [Composer config: policy](https://getcomposer.org/doc/06-config.md#policy)
- [Manage dependencies](/guides/integrated-composer/dependencies)
