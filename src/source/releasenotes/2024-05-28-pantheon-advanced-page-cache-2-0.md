---
title: Pantheon Advanced Page Cache 2.0 update
published_date: "2024-05-28"
categories: [wordpress, plugins]
---

The new [2.0.0 release](https://github.com/pantheon-systems/pantheon-advanced-page-cache/releases/tag/2.0.0) is now available for the Pantheon Advanced Page Cache WordPress plugin. This update makes significant changes to the UI of the Pantheon Page Cache admin settings page when installed on a Pantheon environment with the latest version of the Pantheon MU Plugin (1.4.3 or later).

### Highlights

* **UI improvements:** The Pantheon Page Cache admin settings page simplifies the Cache Max Age setting, providing a dropdown with values for 1 week, 1 month and 1 year. If a different value was saved in the database, it will be displayed as "Custom" in the dropdown with a humanized representation of the time. This is an improvement over the base input in the Pantheon MU plugin which requires a value in seconds. These changes will be available when the [1.4.3](https://docs.pantheon.io/release-notes/2024/05/pantheon-mu-plugin-1-4-3-update) release of the Pantheon MU plugin is deployed alongside WordPress 6.5.4.
* **Site Health integration:** Pantheon Advanced Page Cache now integrates into the Site Health page in your WordPress admin. Tests are run and reported for your cache max age value and recommendations are made.
* **Minimum WordPress version bumped to 6.4:** This update requires WordPress 6.4 or later for integration with the Site Health page and usage of the new `wp_admin_notice` function. If you are running an older version of WordPress,  the plugin will still function, but a warning will be given on the Plugins page and you will not benefit from the updated notices and Site Health checks.
* **Max age updated if previously saved at 10 minutes:** The previous cache max age default value was 600 seconds. We currently recommend a minimum of 1 week for best performance, especially when using Pantheon Advanced Page Cache (which will automatically flush the cache when content is updated). If you had previously saved the default value of 10 minutes, it will automatically be updated to 1 week when you update to this version and log into the WordPress admin. 
* **Integration with the `pantheon_cache_default_max_age` filter:** Pantheon Advanced Page Cache supports the `pantheon_cache_default_max_age` filter added in the Pantheon MU Plugin 1.4.0. If you have set a default max age with the filter for your site, Pantheon Advanced Page Cache will respect that value and display it in the UI as a custom value.

Download the 2.0.0 update today from your WordPress admin or [from the WordPress plugin repository](https://wordpress.org/plugins/pantheon-advanced-page-cache/). Composer-based WordPress sites can get the update by checking the version parameters in your `composer.json` (ensuring that the version string is set to `"*"` or `"^2.0"`) and running `composer update`.