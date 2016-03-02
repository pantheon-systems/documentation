---
title: Private Files
description: Learn how to incorporate non-web-accessible data on Pantheon's platform.
category:
    - development
    - drupal
keywords: drupal, wordpress, private files, files, private keys, private
---
Pantheon provides two spaces for non-web-accessible data:   
Drupal sites: `sites/default/files/private`   
WordPress sites: `~/files/private`=`wp-content/uploads/private`

Take some time to understand the best method for you if you are looking for more refined permissions for your files and code.
<div class="alert alert-info" role="alert">
<h4>Note</h4>
If you have not already created these directories, you will need to do that first. Creating the folders can be done via SFTP or Git in Dev, and pushed to your Test and Live environments.</div>

## Private Files and Uploads
### Drupal

These files will be web-accessible based on the access control rules that you set for your site and will use the following directory: `sites/default/files/private`

To configure, go to **Administration** > **Configuration** > **Media** > **File System**, select **Private local files served by Drupal** as the default download method, and click **Save Configuration**.

### WordPress
These files will be web-accessible based on the access control rules that you set for your site and will use the following directory: `~/files/private`=`wp-content/uploads/private`

## Storing Private Keys and Certs

This method covers private code, Commerce Kickstart or Ubercart encryption keys, certificates, or other data you want to manage with version-control, but do not want to make web-accessible.

If you opt for this technique, the `private/` directory within your site's root is explicitly blocked from being web-accessible. In this instance you can create and use: `code/private`

This folder needs to be on the same level as index.php, within the `code/` folder if you are using SFTP. You should create this manually if it does not exist.

## Troubleshooting

### Resolving Warning: file_put_contents(private:///.htaccess)

If you receive the above error, you may need to visit and resubmit the file systems settings page in your Drupal Admin interface.

### Selectively Exposing Code

In the case where you have a private code library which needs to have a specific sub-directory exposed (e.g. using SimpleSamlPHP), you can do this with symlinks:

    # from within a git checkout
    ln -s private/simplesamlphp/www ./simplesaml
    git add simplesaml
    git commit simplesaml -m "adding simplesaml symlink"
    git push origin master

The result will be a web-accessible URL at http://dev.yoursite.pantheonsite.io/simplesaml which will point to the code in `/private/simplesamlphp/www`.

### Commerce Kickstart or Ubercart Key Path Between Environments

This depends on the workflow and that you are planning to implement. If you set the encryption key path in Dev, the system variable for `uc_credit_encryption_path` needs to be set to `private/` when you move between environments. If you sync your databases, this variable will be moved between your other environments.

If you do not sync the databases, you may get some errors as there is a system check in Drupal to verify that directory is writable before that variable is set. However, because you have already pushed that up in code, setting that variable in Test or Live will do the trick.

This can be done via [Terminus](/docs/articles/local/cli/):

```nohighlight
# Set this to Test/Live
$: terminus drush "vset uc_credit_encryption_path 'private'"
# verify the path is set on Test/Live
$: terminus drush "vget uc_credit_encryption_path
uc_credit_encryption_path: 'private'"
```

<div class="alert alert-info" role="alert">
<h4>Note</h4>
We do not encourage developers save credit card info on the platform, but we do realize that for development this may be useful if you need a test payment method.
</div>
