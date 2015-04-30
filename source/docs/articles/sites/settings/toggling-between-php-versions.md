---
title: Toggling Between PHP Versions
description: Learn how to change between various PHP versions.
category:
  - developing
keywords: php, php version, php versions, how to change php version, toggle php version, change php version, update php version, downgrade php version, switch php version
---
Having environments run different versions of PHP is risky. This should be a very short-lived situation while you sort out any compatibility issues. If you are not working on PHP version compatibility specifically, you should restore all environments to the default value.

## Upgrade Your PHP Version

1. In your Site Dashboard, click the **Settings** menu and select the **PHP version** tab.
2. Start by setting your development (or multi-dev) environment to the new version of PHP you would like to work with. That environment will now allow you to test the new version.
3. Once you have resolved any PHP version compatibility issues or warnings, you can enable the new version in the test environment and deploy there for a final check.
4. When you are ready to go live with the new PHP version, set the "Site Default" to the new version and deploy your compatibility changes (if any). Restore all environments to “Site Default” to insure they remain the same and you’re ready for the next update.


 ![](/source/docs/assets/images/desk_images/356186.png)
