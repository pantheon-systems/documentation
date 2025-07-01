---
title: WordPress (composer managed) upstream 1.33.0 update now available
published_date: "2025-07-01"
categories: [wordpress, action-required]
---

The 1.33.0 update is now available for the [WordPress (composer managed)](/guides/wordpress-composer/wordpress-composer-managed) upstream. This update fixes two bugs and alters the way REST API permalinks are handled on newly-created sites.

## Bug fixes
- Fixes a bug where a script was added to the `composer.json` file that did not exist due to a typo in the script name. This caused a failure when running `composer install` or `composer update`. (For more information see [#183](https://github.com/pantheon-systems/wordpress-composer-managed/pull/183).)
- Fixes an issue where REST API URLs were broken before ["pretty permalinks"](https://wordpress.org/documentation/article/customize-permalinks/#pretty-permalinks) were enabled. This was due to URL rewriting fixes for the Bedrock-based WordPress architecture (using the `/wp/` directory). The fix ensures that "pretty permalinks" are natively supported even before explicitly enabled, while also still supporting "plain" REST API URLs. (For more information see [#186](https://github.com/pantheon-systems/wordpress-composer-managed/pull/186).)

For more details, refer to the [WordPress (Composer Managed) changelog](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/CHANGELOG.md).

## Action required

To benefit from these updates and ensure your site is using the most current version, apply the update to your WordPress (composer managed) site or custom upstream.

## Troubleshooting

If you notice an error when running `composer install` or `composer update`, please check your `composer.json` file for the `maybe-add-symlinks` script and rename it to `maybe-create-symlinks`.
