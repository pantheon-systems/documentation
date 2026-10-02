---
title: WordPress (composer managed) upstream 1.34.0 update now available
published_date: "2026-10-02"
categories: [wordpress, action-required]
---

The 1.34.0 update is now available for the [WordPress (composer managed)](/guides/wordpress-composer/wordpress-composer-managed) upstream. This update changes the default PHP version to 8.3, syncs the upstream with [Roots Bedrock](https://github.com/roots/bedrock), and fixes a PHP warning. The Bedrock sync changes the Composer repository defaults, which can cause merge conflicts in your `composer.json` file.

## Updates
- Updates the default PHP version to 8.3 and changes the PHP requirement in `composer.json` to `>=8.3`. For more information about the PHP default change, see [New default PHP version 8.3 for WordPress upstreams](/release-notes/2026/10/php-83-default-wordpress-upstreams). (For more information see [#204](https://github.com/pantheon-systems/wordpress-composer-managed/pull/204).)
- Syncs the upstream with Bedrock. (For more information see [#201](https://github.com/pantheon-systems/wordpress-composer-managed/pull/201).) This includes:
  - Changing the Composer repository from WPackagist (`wpackagist.org`) to WP Packages (`repo.wp-packages.org`). Package names for plugins and themes change from `wpackagist-plugin/*` and `wpackagist-theme/*` to `wp-plugin/*` and `wp-theme/*`.
  - Removing the `roots/wp-password-bcrypt` package from `composer.json`.
  - Setting `WP_ENVIRONMENT_TYPE` from `WP_ENV` when it is not already defined, and setting `WP_DEVELOPMENT_MODE` when it is configured.
  - Setting `MYSQL_CLIENT_FLAGS` to use SSL when `DB_SSL` is set.

## Bug fixes
- Resolves a `rtrim()` warning in PHP 8.1 and later environments. (For more information see [#189](https://github.com/pantheon-systems/wordpress-composer-managed/pull/189). Props [@mattmacneil](https://github.com/mattmacneil).)

For more details, refer to the [WordPress (Composer Managed) changelog](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/CHANGELOG.md).

## Action required

To benefit from these updates and ensure your site is using the most current version, apply the update to your WordPress (composer managed) site or custom upstream.

If your `composer.json` file requires plugins or themes using `wpackagist-plugin/*` or `wpackagist-theme/*` package names, or has custom entries in `repositories`, applying this update can cause merge conflicts in that file. When you resolve the conflicts, keep your custom requirements and update the package names to the new `wp-plugin/*` and `wp-theme/*` names, or keep the WPackagist repository entry.

For assistance with managing merge conflicts, refer to our documentation on [auto-resolving via the dashboard](https://docs.pantheon.io/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts) or [manually resolving via the command line](https://docs.pantheon.io/guides/git/resolve-merge-conflicts).
