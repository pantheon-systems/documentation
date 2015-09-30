---
title: Foo Bar
description: This is a test - disregard.
category:
  - developing
  - drupal
keywords: drupal, services.yml, yml file
---
Drupal 8 enables developers to define services used by core within the `sites/default/services.yml` configuration file, eliminating the need for hacks to swap functionality. Creating or modifying this file is not required when installing a new Drupal 8 site.

Define core services in `sites/default/services.yml` and module specific services in a separate `.yml` file, located in the root directory of the respective module (e.g. `sites/all/modules/module_name/module_name.services.yml`).

## Create and Modify services.yml via Git
From within an up-to-date Git clone on your local environment, create the `services.yml` file inside the `sites/default` directory. Once edits are complete, commit and push the new file to the remote repository following standard Git workflows. For more instructions, see [Starting with Git](/docs/articles/local/starting-with-git/).

## Create and Modify services.yml via SFTP
<div class="alert alert-danger">
<h4>Warning</h4>
For security reasons, we recommend creating and modifying <code>sites/default/services.yml</code> via Git as SFTP requires tweaking file permissions.
</div>
Depending on your SFTP client, use 'get info' or 'file attribute' to change permissions of the `sites/default` directory to 777 (read + write + execute). Writable files, such as `services.yml`, should be changed to 666 (read + write).

You will need to set the permissions back to default (555 for directories, 444 for files) once edits are complete. This file should remain non-writable for security concerns.

## See Also

View the following [Drupal.org](https://drupal.org) resources for more information:
- [Create settings.php, services.yml and the files directory](https://www.drupal.org/documentation/install/settings-file)
- [Services and dependency injection in Drupal 8](https://www.drupal.org/node/2133171)
- [Service Tags](https://www.drupal.org/node/2239393)
- [Structure of a service file](https://www.drupal.org/node/2194463)
