---
title: Drupal core security releases fix a critical remote code execution issue
published_date: "2026-11-18"
published_at: "2026-11-18T19:45:00Z"
categories: [drupal, action-required, security]
description: "Drupal 10.6.22, 11.3.22, and 11.4.13 fix two security issues in Drupal core, including a critical remote code execution issue. Pantheon also provides Drupal 7.109, which removes install.php."
---

The Drupal Security Team released Drupal 10.6.22, 11.3.22, and 11.4.13 on November 18, 2026. These releases fix two security issues in Drupal core: [SA-CORE-2026-017](https://www.drupal.org/sa-core-2026-017) and [SA-CORE-2026-018](https://www.drupal.org/sa-core-2026-018). Pantheon also provides Drupal 7.109 for Drupal 7 sites through our LTS support with Tag1 Consulting.

## Action required

Update your site to a fixed release as soon as possible:

* Drupal 7: update to 7.109.
* Drupal 10.x: update to 10.6.22.
* Drupal 11.3.x: update to 11.3.22.
* Drupal 11.4.x: update to 11.4.13.

Drupal 10 and 11 sites update core through Composer. To apply the update, use [one-click core updates in the Pantheon dashboard](/core-updates#apply-upstream-updates-via-the-site-dashboard).

Drupal 8, Drupal 9, Drupal 10.5.x and earlier, and Drupal 11.2.x and earlier have reached End of Life (EoL) and are not patched.

Pantheon deployed protections to all environments in advance as part of [Drupal Steward](https://new.drupal.org/steward), which mitigates SA-CORE-2026-017 (see below). We still advise you to update your sites as soon as possible.

## Issues fixed

### SA-CORE-2026-017: remote code execution

Drupal rates this issue critical (18/25), and it affects Drupal 10.x before 10.6.22, Drupal 11.0.0 and later before 11.3.22, and Drupal 11.4.0 and later before 11.4.13. Drupal tracks it as CVE-2026-132165.

Under specific conditions, an attacker can use the Drupal installer (`install.php`) to attempt to reinstall Drupal. This can lead to site takeover or remote code execution.

Pantheon's runtime now blocks the installer once the site is installed, in all environments.

### SA-CORE-2026-018: gadget chain

Drupal rates this issue moderately critical (14/25), and it affects the same versions. Drupal tracks it as CVE-2026-132166.

Drupal core contains a chain of methods that could be exploitable if another vulnerability allows a site to deserialize untrusted data. The advisory states, "This issue is not directly exploitable."

## Drupal 7

Pantheon now provides Drupal 7.109 through our LTS support for Drupal 7 with Tag1 Consulting. This core update removes `install.php` entirely. `drush si` continues to work. You need to apply the update to your site.

Apply the update from your Pantheon dashboard or with Terminus. See [related documentation for how to apply core updates](/core-updates#apply-upstream-updates-via-the-site-dashboard).
