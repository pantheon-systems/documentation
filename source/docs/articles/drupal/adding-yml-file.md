---
title: Adding a services.yml File
description: Learn how to add a services.yml file for Drupal 8.
category:
  - developing
  - drupal
keywords: drupal, services.yml, yml file
---
Drupal 8 includes the `sites/default/default.services.yml` configuration file to define services used, eliminating the need to hack core to swap functionality. To create and/or modify this file, you'll need to tweak some permissions, otherwise you will receive a **Permission denied** error.

<div class="alert alert-danger">
<h4>Warning</h4>
Due to permission handling issues observed when using Git, we recommend creating the <code>services.yml</code> file via SFTP. For instructions, see <a href="/docs/articles/sites/code/developing-directly-with-sftp-mode">Developing on Pantheon Directly with SFTP Mode</a>.
</div>

## Create `services.yml`
Using your preferred SFTP client, copy `sites/default/default.services.yml` into a new file named `sites/default/services.yml`. Do not simply rename the original file. The install script requires both files to present at the time of installation.

## Change Permissions for `sites/default`
Depending on your client, use 'get info' or 'file attribute' to change permissions of the `sites/default` directory to 666 (Read and Write).

You can now upload the file and run the installation script as normal. These permissions will be set back to default after the script has finished.

For more information, see the following [drupal.org](https://drupal.org) resources:
- [Step 3: Create settings.php, services.yml and the files directory](https://www.drupal.org/documentation/install/settings-file)
- [Services and dependency injection in Drupal 8](https://www.drupal.org/node/2133171)
