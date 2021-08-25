---
title: Private Paths for Files and Code
description: Learn how to incorporate non-web-accessible data on Pantheon's platform.
tags: [infrastructure, security]
categories: [platform,develop]
reviewed: "2020-08-17"
---
The Pantheon platform recognizes two distinct private directories for storing non-web accessible data.

Determining which path to use depends on whether or not the data should be tracked with Git as part of your site's codebase. For example, secret tokens or credentials for third party services should not be version controlled alongside your site's code.

#### Private Path for Files (Not Version Controlled)

Drupal: `sites/default/files/private`
WordPress: `wp-content/uploads/private`

#### Private Path for Code (Version Controlled)

Drupal and WordPress: `private`

<Alert title="Note" type="info">

If you have not already created these directories, you will need to do that first. Create the folders in Dev via SFTP or Git, and push the changes to your Test and Live environments.

</Alert>

## Private Path for Code

Store data that should be version controlled, such as [Quicksilver](/quicksilver) scripts, within the `private` directory at the root level of your site's codebase (same level as `index.php`). If you're connecting via SFTP, navigate into the `code` directory and upload files to `private`. If you're connecting via Git, use the `private` directory at the root level of your cloned repository. The private path for code is the same for both Drupal and WordPress sites.

## Private Path for Files

When it comes to keeping production keys secure, the best solution is to use a key management service like [Lockr](https://lockr.io/) to automatically encrypt and secure keys on distributed platforms such as Pantheon. You can integrate this service using the [Lockr plugin](https://wordpress.org/plugins/lockr/) for WordPress and the [Lockr module](https://www.drupal.org/project/lockr) for Drupal. For more details, see this [related blog post](https://pantheon.io/blog/key-drupal-security).

Alternatively, you can store sensitive data in a JSON or ini-style text file within the following directories:

- `wp-content/uploads/private` (WordPress)
- `/wp-content/uploads/private/sites/<blog_id>/` (WordPress Multisite)
- `sites/default/files/private` (Drupal)

These directories are symbolically linked to Valhalla and can also be accessed from the `files` directory when connecting via SFTP. This allows secure data to be distributed to other environments, while keeping it out of version control. You can then read the data from `settings.php` or `wp-config.php`, like so:

```php:title=settings.php%20or%20wp-config.php
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

### Plugins That Manage Private Paths

WordPress does not have a core feature to configure a private path folder for file uploads. There are several plugins on WordPress.org and projects on Drupal.org that will help protect direct access to files in the files area. However, these plugins commonly require an Apache HTTP server *.htaccess* (`mod_rewrite`) rule. Our NGINX servers [do not support *.htaccess* rules](/platform-considerations/#htaccess).

Site developers could author their own custom solution to provide authentication, access checks, and ultimately use PHP's [readfile()](http://php.net/readfile/) or [fpassthru()](http://php.net/fpassthru/) functions to read files from the `wp-content/uploads/private` (WordPress) or `sites/default/files/private` (Drupal) areas, respectively, and then output them to the authenticated web user's browser.

### Known Limitations of File Names and Permissions

Please see [Pantheon Filesystem](/files#known-limitations-of-file-names-and-permissions) for more information.

### Additional Drupal Configuration

These files will be web-accessible based on the access control rules that you set for your site and will use the following directory: `sites/default/files/private`

To configure, go to **Administration** > **Configuration** > **Media** > **File System**, select **Private local files served by Drupal** as the default download method, and click **Save Configuration**.

## Protected Web Paths

Another way to protect files and directories is to define a protected web path in your `pantheon.yml` file. See [Protected Web Paths](/pantheon-yml#protected-web-paths) for more information.

## Troubleshooting

### Resolving Warning: file_put_contents(private:///.htaccess)

If you receive the error above, make sure that the private path for code or files exists in your repository. If you are configuring a private path for code, you'll need to start from your Dev environment and create the private directory, then commit via Git, or create via SFTP and commit via Pantheon Dashboard. Once the directory has been created and committed, you can deploy to Test and Live to deploy the new directory. Once the directory exists you can resubmit your changes via the file systems settings page in your Drupal Admin interface for each environment.

### Selectively Exposing Code

If you have a private code library that needs to have a specific sub-directory exposed (e.g. using SimpleSamlPHP), you can do this with symlinks:

  ```bash
  # from within a git checkout
  ln -s private/simplesamlphp/www ./simplesaml
  git add simplesaml
  git commit simplesaml -m "adding simplesaml symlink"
  git push origin master
  ```

The result will be a web-accessible URL at `https://dev.yoursite.pantheonsite.io/simplesaml` which will point to the code in `/private/simplesamlphp/www`.

### Setting Commerce Kickstart or Ubercart Key Path

Make sure to set a relative path. This ensures the key path will work on all appservers across the site's environments.


1. Set the encryption key path
You can either set the path in the Drupal admin interface, or with Terminus and Drush as below:

   ```bash
   terminus drush <site>.<env> -- vset uc_credit_encryption_path <my_private_path>
   ```

   `<my_private_path>` can be set to either of these non-web accessible private directories:

   - `'sites/default/files/private'` (preferred)
   - `'private'` (version controlled)

2. Create the private directory you have chosen and upload the key.

   - Optionally, verify that `uc_credit_encryption_path` is set correctly:

     ```bash
     terminus drush <site>.<env> -- vget uc_credit_encryption_path
     ```

<Alert title="Note" type="info">

We do not encourage developers to save credit card information on the platform, but we do realize that for development this may be useful if you need a test payment method.

</Alert>
