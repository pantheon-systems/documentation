---
title: WordPress (composer managed) upstream 1.32.3 update now available
published_date: "2024-09-10"
categories: [wordpress, action-required]
---

The 1.32.3 update is now available for the [WordPress (composer managed)](/guides/wordpress-composer/wordpress-composer-managed) upstream. This release changes the `COOKIEPATH` and `SITECOOKIEPATH` constants in the `application.pantheon.php` file to resolve an issue that led to failed nonce authentication checks in some admin pages.

For more details, refer to the [WordPress (Composer Managed) changelog](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/CHANGELOG.md).

## Action required

To benefit from these updates and ensure your site is using the most current version, apply the update to your WordPress (composer managed) site or custom upstream.

### Applying updates

This update should not affect files that would have been edited in site codebases. The only file changed by this update is the Pantheon-maintained `filters.php` file in the `app/mu-plugins` directory. However, if any conflicts occur, it is recommended to manually resolve them by running the following command:

```bash{promptUser: user}
git pull -Xtheirs https://github.com/pantheon-upstreams/wordpress-composer-managed.git main
git push origin master
```

For assistance with managing merge conflicts, refer to our documentation on [auto-resolving via the dashboard](/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts) or [manually resolving via the command line](/guides/git/resolve-merge-conflicts).

### Troubleshooting Tips

* If you find you are still seeing errors in the browser console or you cannot create posts or pages, it is recommended that you clear your cookies and log back into your WordPress site. This will ensure that the new `COOKIEPATH` and `SITECOOKIEPATH` constants are set correctly in your browser.
* If you find that your `composer.json` was overwritten when applying upstream updates, refer to [this troubleshooting guide](/guides/wordpress-composer/wordpress-composer-managed#troubleshooting) to resolve the issue.
