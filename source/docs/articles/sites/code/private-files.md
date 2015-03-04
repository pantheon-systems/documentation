---
title: Private Files
description: Learn how to incorporate non-web-accessible data on Pantheon's platform.
category:
    - development
    - drupal


---

## Overview
Pantheon provides two spaces for non-web-accessible data. Take some time to understand the best method for you if you are looking for more refined permissions for your files and code.

**Note**: If you have not already created these directories you will need to do that first. Creating the folders can be done via SFTP or git in Dev and pushed to your Test and Live environments.

## Private Files and Uploads In Drupal

This can be done by setting your file-system settings to private. These files will be we accessible based on the access control rules that you set for your site and will use the following directory: `sites/default/files/private`

## Storing Private Keys and Certs

This method covers private code, Commerce Kickstart or Ubercart encryption keys, certificates, or other data you want to manage with version-control, but do not want to make web-accessible.

If you opt for this technique, the `private/` directory within your Drupal root is explicitly blocked from being web-accessible. In this instance you can create and use: `code/private`

This folder will need to be on the same level as index.php, within the `code/` folder if you are using SFTP. You should create this manually if it does not exist.

## Troubleshooting

### Resolving Warning: file_put_contents(private:///.htaccess)

If you receive the above error, you may need to visit and re-submit the file systems settings page in your Drupal admin interface.

### Selectively Exposing Code

In the case where you have a private code library which needs to have a specific sub-directory exposed (e.g. using SimpleSamlPHP), you can do this with symlinks:

    # from within a git checkout
    ln -s private/simplesamlphp/www ./simplesaml
    git add simplesaml
    git commit simplesaml -m "adding simplesaml symlink"
    git push origin master

The result will be a web-accessible URL at http://dev.yoursite.pantheon.io/simplesaml which will point to the code in `/private/simplesamlphp/www`.

### Commerce Kickstart or Ubercart Key Path Between Environments

This depends on the workflow and that you are planning to implement. If you set the encryption key path in Dev the system variable for `uc_credit_encryption_path` needs to be set to `private/` when you move between environments. If you sync your databases this variable will be moved between your other environments.

In the event you do not sync the databases you may get some errors as there is a system check in Drupal to verify that directory is writable before that variable is set which can cause errors. However, because you have already pushed that up in code, setting that variable in Test or Live will do the trick.

This can be done via Drush:

    # Set this to Test/Live
    $: drush @pantheon.example.test vset uc_credit_encryption_path 'private'
    # verify the path is set on Test/Live
    $: drush @pantheon.example.test vget uc_credit_encryption_path
    uc_credit_encryption_path: "private"

**Note**: We do not encourage developers save credit card info on the platform but we do realize that for development this may be useful if you need a test payment method.
