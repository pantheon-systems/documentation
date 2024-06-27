---
title: WordPress (Composer Managed) Upstream 1.31.0 Update
published_date: "2024-06-27"
categories: [wordpress, action-required]
---

An update is now available for the [WordPress (Composer Managed)](/guides/wordpress-composer/wordpress-composer-managed) upstream. This release provides a number of bugfixes and stability enhancements intended for all sites using the upstream.

### Highlights
* Various updates and enhancements to the `helpers.sh` script handling the Sage theme install script.
* Applies a filter for WordPress core resource URLs (for JavaScript and CSS files provided by core) for subdirectory subsites. This resolves an issue where those links were broken on subdirectory subsites.
* Applies a filter to drop a `/wp` path appended to WordPress-generated home URLs on single sites and main sites of multisites. Both of these filters are added at priority `9` so they can be easily overridden, if required, in your Composer-managed sites.
* Un-ignores managed WordPress core files in the WordPress root directory. (Props [@araphiel](https://github.com/araphiel) for the PR.)
* Bumps the default PHP version to 8.2 and the default database version to 10.6.
* Updates the `application.php` and `composer.json` files to bring the upstream in line with [`roots/bedrock`](https://github.com/roots/bedrock) v1.24.x.

For more details, refer to the [WordPress (Composer Managed) changelog](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/CHANGELOG.md).

#### Applying updates

If you run into merge conflicts with this update, you can manually resolve by running the following command:

```bash
git pull -Xtheirs https://github.com/pantheon-upstreams/wordpress-composer-managed.git main
git push origin master
```

For more help or assistance about managing potential merge conflicts, refer to our documentation on [auto-resolving via the dashboard](https://docs.pantheon.io/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts) or [manually resolving via the command line](https://docs.pantheon.io/guides/git/resolve-merge-conflicts).

#### Other notes
This release of WordPress (Composer Managed) is indicated by an actual [release](https://github.com/pantheon-systems/wordpress-composer-managed/releases) in GitHub. The changelog has been updated to include version numbers for each version. This change, while superficial, makes it easier to refer to iterations made to the upstream now and into the future.
