### WordPress Issues

#### CDN Blocking POST requests

**Cause:** This error can occur on sites using a content delivery network (CDN) service that is not configured to allow the POST HTTP method.

**Solution:**  [Temporarily setting POST as an allowed HTTP method within the CDN's configuration](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesAllowedHTTPMethods) and restarting the migration process. Once the site has been successfully migrated, the POST HTTP method can be disabled.

#### Very Large Site Footprints

**Cause:** Imports can also fail for very large sites, which may time out while importing.

**Solution:** Initiate the migration again from the source site, and the transfer should pick up where it left off.

#### Could not import code, the import file does not appear to contain a valid code directory.

**Cause:** The migration tool could not find the core files. This prevents the migration from completing because the site modules, plugins, and/or themes cannot be imported. This error also occurs when multiple `settings.php` files are present.

**Solution:** Check that the archive includes a valid code root with all core files. If multiple `settings.php` files are present, delete them from the archive. Archives for WordPress sites should include `index.php` at the code root level, along with the following directories:

```none
├── index.php
├── wp-activate.php
├── wp-config.php
├── wp-comments-post.php
├── wp-blog-header.php
├── wp-admin
├── wp-cron.php
├── wp-load.php
├── wp-links-opml.php
├── wp-includes
├── xmlrpc.php
├── wp-trackback.php
├── wp-signup.php
├── wp-settings.php
├── wp-mail.php
├── wp-login.php
├── wp-content
    ├── index.php
    ├── mu-plugins
    ├── themes
    ├── plugins

```

#### Multiple file directories found within the import archive

**Cause:** The migration tool found more than one potential location for files within the archive. This error also occurs if Drupal's private files directory is not placed within the public directory (`sites/default/files/private`.

**Solution:** All files must be moved into `/wp-content/uploads`. For more details, see [Files](/files) and [Symlinks and Assumed Write Access](/symlinks-assumed-write-access).

