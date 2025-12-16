---
title: WordPress (composer managed) upstream 1.32.1 update now available
published_date: "2024-08-16"
categories: [wordpress, action-required]
---

The 1.32.1 update is now available for the [WordPress (composer managed)](/guides/wordpress-composer/wordpress-composer-managed) upstream. This release fixes a bug that was causing some WordPress core resources (CSS and JS files, as well as the default favicon image) to return a 404 error due to improper URL construction on single sites.

For more details, refer to the [WordPress (Composer Managed) changelog](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/CHANGELOG.md).

## Action required

To benefit from these updates and ensure your site is using the most current version, apply the update to your WordPress (composer managed) site or upstream.

### Applying updates

This update should not affect files that would have been edited in site codebases. The only file changed by this update is the Pantheon-maintained `filters.php` file in the `app/mu-plugins` directory. However, if any conflicts occur, it is recommended to manually resolve them by running the following command:

```bash{promptUser: user}
git pull -Xtheirs https://github.com/pantheon-upstreams/wordpress-composer-managed.git main
git push origin master
```

For assistance with managing merge conflicts, refer to our documentation on [auto-resolving via the dashboard](/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts) or [manually resolving via the command line](/guides/git/resolve-merge-conflicts).
