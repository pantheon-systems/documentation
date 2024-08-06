---
title: WordPress (composer managed) upstream 1.32.0 update now available
published_date: "2024-08-06"
categories: [wordpress, action-required]
---

The 1.32.0 update is now available for the [WordPress (composer managed)](/guides/wordpress-composer/wordpress-composer-managed) upstream. This release is a maintenance update to resolve some inconsistencies with the upstream distribution of WordPress (composer managed). Most notably, this update includes a removal of decoupled packages that were erroneously being added to the non-decoupled upstream as well as other minor updates.

For more details, refer to the [WordPress (Composer Managed) changelog](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/CHANGELOG.md).

#### Applying updates

While this update makes every attempt to fix issues that might lead to merge conflicts, conflicts are always possible, especially as we are still making changes in EA. If you run into merge conflicts with this update, you can manually resolve by running the following command:

```bash
git pull -Xtheirs https://github.com/pantheon-upstreams/wordpress-composer-managed.git main
git push origin master
```

For assistance with managing merge conflicts, refer to our documentation on [auto-resolving via the dashboard](https://docs.pantheon.io/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts) or [manually resolving via the command line](https://docs.pantheon.io/guides/git/resolve-merge-conflicts).
