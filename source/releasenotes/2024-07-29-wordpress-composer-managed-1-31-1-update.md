---
title: WordPress (composer managed) upstream 1.31.1 update now available
published_date: "2024-07-29"
categories: [wordpress, action-required]
---

The update is now available for the [WordPress (composer managed)](/guides/wordpress-composer/wordpress-composer-managed) upstream. Previously, the 1.31.0 update was released and then quickly rolled back. This release fixes issues with subdirectory multisite that were discovered following that earlier release, as well as implements the filter added to the [Pantheon MU Plugin in version 1.4.5](/2024/07/pantheon-mu-plugin-1-4-5).

### Highlights
* Removes code that for handling wp-admin URLs. This code was not working as intended and testing revealed it to be unnecessary.
* Adds a filter to disable the subdirectory multisite custom wp-content directory warning. 

For more details, refer to the [WordPress (Composer Managed) changelog](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/CHANGELOG.md).

#### Applying updates

If you run into merge conflicts with this update, you can manually resolve by running the following command:

```bash
git pull -Xtheirs https://github.com/pantheon-upstreams/wordpress-composer-managed.git main
git push origin master
```

For assistance with managing merge conflicts, refer to our documentation on [auto-resolving via the dashboard](https://docs.pantheon.io/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts) or [manually resolving via the command line](https://docs.pantheon.io/guides/git/resolve-merge-conflicts).

#### Additional notes
This release should show up on your dashboard as an available update. It is advised to apply updates manually using the documentation above if there are conflicts, whether you previously applied the 1.31.0 update or not. 