---
title: WordPress (composer managed) upstream 1.31.0 update now available
published_date: "2024-07-10"
categories: [wordpress, action-required]
---

The update is now available for the [WordPress (composer managed)](/guides/wordpress-composer/wordpress-composer-managed) upstream. This release includes several bug fixes and stability enhancements aimed at improving performance across all sites using this upstream.

### Highlights
* Various updates and enhancements to the `helpers.sh` script handling the Sage theme installation script.
* Filter for WordPress core resource URLs (for JavaScript and CSS files provided by core) to resolve broken links on subdirectory subsites.
* Filter to drop a `/wp` path appended to WordPress-generated home URLs on single sites and main sites of multisites, both set at priority `9` for easy override in composer-managed sites.
* Un-ignored managed WordPress core files in the WordPress root directory. (Props [@araphiel](https://github.com/araphiel) for the PR.)
* Updated default PHP version to 8.2 and default database version to 10.6. 
* Updated `application.php` and `composer.json` files to align with [`roots/bedrock`](https://github.com/roots/bedrock) v1.24.x.
* Deprecates `wp-config-pantheon.php` in favor of `config/application.pantheon.php`. 

For more details, refer to the [WordPress (Composer Managed) changelog](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/CHANGELOG.md).

#### Applying updates

If you run into merge conflicts with this update, you can manually resolve by running the following command:

```bash
git pull -Xtheirs https://github.com/pantheon-upstreams/wordpress-composer-managed.git main
git push origin master
```

For assistance with managing merge conflicts, refer to our documentation on [auto-resolving via the dashboard](https://docs.pantheon.io/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts) or [manually resolving via the command line](https://docs.pantheon.io/guides/git/resolve-merge-conflicts).

#### Additional notes
This release of WordPress (composer managed) is indicated by an [official release on GitHub](https://github.com/pantheon-systems/wordpress-composer-managed/releases). The changelog has been updated to include version numbers for better tracking of upstream iterations.
