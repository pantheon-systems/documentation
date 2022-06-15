This section describes the causes of, and solution to the error messages that are displayed on the Site Dashboard if the migration fails to complete.

If your code, database, and files have completed migrating, but your site is not working as you'd expect, please review [Pantheon Platform Considerations](/platform-considerations). For example, if your site uses [PHP short tags](/platform-considerations/#php-short-tags), you'll need to convert them to standard PHP tags.

Next, check [log files](/logs) to help identify and fix errors. Drupal or WordPress core is upgraded as part of migration, so you may have additional work to complete the upgrade.

### Migrate from Acquia

1. Choose to either move the contents of Aquia's nested directory `docroot` up and remove the folder, or rename the folder to `web` and set `web_docroot: true` in your `pantheon.yml` file.

 For more information on nested docroots, see [Serving Sites from the Web Subdirectory](/nested-docroot).

1. In your Acquia dashboard, navigate to **Manage > Extend**. Click on the **Uninstall** tab to uninstall Acquia-specific modules.

1. For compatibility with Pantheon's platform, adjust any special Acquia configurations related to `env`.

1. If you plan on using [Pantheon Search](https://pantheon.io/docs/solr), uninstall any Acquia Search modules and the default Drupal core Search module (if still enabled for your site) by navigating to `admin/modules/uninstall`.

<Alert title="Note" type="info">

If `query cache` is turned on within the MySQL service (an obsolete setting), you may notice a severe performance drop on Pantheon during the User Acceptance Testing stage of an active migration from Acquia. We recommend that you move to a modern service to avoid this issue.

If you would like to confirm that your performance drop is caused by the obsolete `query cache` MySQL service setting, connect to the MySQL service in Acquia’s production environment and run the following:

```sql{promptUser: sql}
SHOW VARIABLES LIKE 'query_cache_%';
```

High values for the `query_cache_limit` and `query_cache_size` variables will confirm that performance degradation is related to the MySQL `query cache` service setting.

</Alert>

### Could not import code, the import file does not appear to contain a valid code directory.

**Cause:** The migration tool could not find Drupal or WordPress core files. This prevents the migration from completing because the site modules, plugins, and/or themes cannot be imported. This error also occurs when multiple `settings.php` files are present.

**Solution:** Check that the archive includes a valid code root with all core files. If multiple `settings.php` files are present, delete them from the archive.

<TabList>

<Tab title="Drupal 7" id="d7" active={true}>

Archives for Drupal 7 sites should include `index.php` at the code root level, along with the following directories:

```none
├── includes
├── index.php
├── misc
├── modules
├── profiles
├── scripts
├── sites
    └── all
        ├── modules
        └── themes
    └── default
        └── settings.php
└── themes
```

</Tab>

<Tab title="WordPress" id="wp">

Archives for WordPress sites should include `index.php` at the code root level, along with the following directories:

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

</Tab>

</TabList>

### Could not import database, unable to locate a database dump

**Cause:** The migration tool could not locate a MySQL database dump within the archive.

**Solution:** Ensure that the archive contains a valid MySQL database dump.

### Multiple file directories found within the import archive

**Cause:** The migration tool found more than one potential location for files within the archive. This error also occurs if Drupal's private files directory is not placed within the public directory (`sites/default/files/private`).

**Solution:** All files must be moved into the standard location for your site's CMS (`/sites/default/files` for Drupal, and `/wp-content/uploads` for WordPress). For more details, see [Files](/files) and [Symlinks and Assumed Write Access](/symlinks-assumed-write-access).

### Multiple site directories found within the import archive

**Cause:** The migration tool found a multisite installation, which is not supported on the platform.

**Solution:** Refer to [Extracting Sites from a Drupal Multisite](/unwind-drupal-multisite).

### Multiple database dumps found within the import archive

**Cause:** The migration tool detected multiple MySQL database dumps within the archive.

**Solution:** Ensure that a single MySQL dump is included within the archive.

### Multiple code roots found within the import archive

**Cause:**  The migration tool detected more than one potential location for the code root in the archive.

**Solution:** Ensure that a single code root is included within the archive.

### Cannot Login Using a Google Account

Attempts to login with Google will fail if your organization uses Single Sign-On, resulting in the following error:

![Migration Authentication Error](../images/dashboard/migration-authentication-error.png)

Click your browser's back button to re-authenticate by entering your email address and sign in with your SAML Identity Provider. For details, see [Single Sign-On for Pantheon Organizations](/sso-organizations).

### Destination Site Not Found Error

If you are logged in with one identity and re-authenticate a different account, the site created will be associated with one account and the machine token with another, resulting in the following error:

![Destination site not found](../images/bv-destination-not-found-error.png)

Click your browser's back button from the Pantheon Dashboard and re-authenticate the user account for your current session.

### Import Failed in WordPress Migration

#### CDN Blocking POST requests

This error can occur on sites using a content delivery network (CDN) service that is not configured to allow the POST HTTP method. Resolve this issue by [temporarily setting POST as an allowed HTTP method within the CDN's configuration](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesAllowedHTTPMethods) and restarting the migration process. Once the site has been successfully migrated, the POST HTTP method can be disabled.

#### Very Large Site Footprints

Imports can also fail for very large sites, which may time out while importing. In these cases, initiate the migration again from the source site, and the transfer should pick up where it left off.

### Drush archive missing code or files

If you have an existing archive (tgz) file in `sites/default/files` the `drush ard` command may generate an archive without all expected components. Delete all archives and try running `drush ard` again.

### HTTP 404 error: Unable to download the archive

Go the to files directory of your existing site and check if the site archive was generated successfully. If you're hosting the archive on a third party like Dropbox or Google Drive, confirm that it was uploaded successfully. Visiting the archive link with a browser should download the files automatically. You may need to run the `drush ard` command again if you can't find the site archive.

### Maximum Index Size

From the [MySQL reference manual](https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-conversion.html):

> InnoDB has a maximum index length of 767 bytes for tables that use COMPACT or REDUNDANT row format, so for utf8mb3 or utf8mb4 columns, you can index a maximum of 255 or 191 characters, respectively. If you currently have utf8mb3 columns with indexes longer than 191 characters, you must index a smaller number of characters.

Sites migrated from hosts using `utf8mb3` are upgraded to `utf8mb4`. If those sites have indexes larger than 191 characters MySQL will return the following error on import:

```none
Index column size too large. The maximum column size is 767 bytes
```

These tables will need to be updated. One method to update index length uses the `ALTER TABLE` command:

```sql
ALTER TABLE tableName DROP INDEX meta_key, ADD INDEX meta_key(meta_key(191));
```

This command can be used as part of a script to find and update large indexes.
