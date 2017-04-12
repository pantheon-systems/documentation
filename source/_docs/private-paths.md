---
title: Private Paths for Files and Code
description: Learn how to incorporate non-web-accessible data on Pantheon's platform.
tags: [infrastructure, security]
categories: []
---
The Pantheon platform recognizes two distinct private directories for storing non-web accessible data.

Determining which path to use depends on whether or not the data should be tracked with Git as part of your site's codebase. For example, secret tokens or credentials for third party services should not be version controlled alongside your site's code.

**Private Path for Files (Not Version Controlled)**  
Drupal: `sites/default/files/private`   
WordPress: `wp-content/uploads/private`

**Private Path for Code (Version Controlled)**  
Drupal and WordPress: `/private`   

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>If you have not already created these directories, you will need to do that first. Creating the folders can be done via SFTP or Git in Dev, and pushed to your Test and Live environments.</p>
</div>

## Private Path for Code
Store data that should be version controlled, such as [Quicksilver](/docs/quicksilver/) scripts, within the `/private` directory at the root level of your site's codebase (same level as `index.php`). If you're connecting via SFTP, navigate into the `code` directory and upload files to `/private`. If you're connecting via Git, use the `/private` directory at the root level of your cloned repository. The private path for code is the same for both Drupal and WordPress sites.

## Private Path for Files
When it comes to keeping production keys secure, the best solution is to use a key management service like [Lockr](https://lockr.io/) to automatically encrypt and secure keys on distributed platforms such as Pantheon. For details on integrating this service on Drupal, see the [related blog post](https://pantheon.io/blog/key-drupal-security). You can use the [Lockr](https://github.com/CellarDoorMedia/Lockr-Partners/tree/master/pantheon/wordpress/lockr-pantheon) plugin to integrate service on WordPress sites.

Alternatively, you can store sensitive data in a JSON or ini-style text file within the `wp-content/uploads/private` (WordPress) or `sites/default/files/private` (Drupal) directories. These directories are symbolically linked to Valhalla and can also be accessed from the `/files` directory when connecting via SFTP. This allows secure data to be distributed to other environments, while keeping it out of version control. You can then read the data from `settings.php` or `wp-config.php`, like so:
```
if (isset($_ENV['PANTHEON_ENVIRONMENT']) && $_ENV['PANTHEON_ENVIRONMENT'] == 'live') {
  $json_text = file_get_contents('sites/default/files/private/stripe_live.json');
  $stripe_data = json_decode($json_text, TRUE);
  $conf['stripe_key'] = $stripe_data['key'];
}
else {
  // We aren't in prod, load a fallback or null key.
  $conf['stripe_key'] = 'foo';
}
```
This Drupal example reads the key from the private file `stripe_live.json` only when the request is made from the Live environment on Pantheon.

### Additional Drupal Configuration

These files will be web-accessible based on the access control rules that you set for your site and will use the following directory: `sites/default/files/private`

To configure, go to **Administration** > **Configuration** > **Media** > **File System**, select **Private local files served by Drupal** as the default download method, and click **Save Configuration**.


## Troubleshooting

### Resolving Warning: file_put_contents(private:///.htaccess)

If you receive the above error, you may need to visit and resubmit the file systems settings page in your Drupal Admin interface.

### Selectively Exposing Code

If you have a private code library that needs to have a specific sub-directory exposed (e.g. using SimpleSamlPHP), you can do this with symlinks:

    # from within a git checkout
    ln -s private/simplesamlphp/www ./simplesaml
    git add simplesaml
    git commit simplesaml -m "adding simplesaml symlink"
    git push origin master

The result will be a web-accessible URL at http://dev.yoursite.pantheonsite.io/simplesaml which will point to the code in `/private/simplesamlphp/www`.

### Commerce Kickstart or Ubercart Key Path Between Environments

This depends on the workflow and that you are planning to implement. If you set the encryption key path in Dev, the system variable for `uc_credit_encryption_path` needs to be set to `private/` when you move between environments. If you sync your databases, this variable will be moved between your other environments.

If you do not sync the databases, you may get some errors as there is a system check in Drupal to verify that directory is writable before that variable is set. However, because you have already pushed that up in code, setting that variable in Test or Live will do the trick.

This can be done via [Terminus](/docs/terminus/):

```nohighlight
# Set this to Test/Live
$: terminus drush <site>.<env> -- vset uc_credit_encryption_path 'private'
# verify the path is set on Test/Live
$: terminus drush <site>.<env> -- vget uc_credit_encryption_path
uc_credit_encryption_path: 'private'
```

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>We do not encourage developers to save credit card information on the platform, but we do realize that for development this may be useful if you need a test payment method.
</p></div>
