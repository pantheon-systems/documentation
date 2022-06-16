This section describes the causes of, and solution to the error messages that are displayed on the Site Dashboard if the migration fails to complete.

If your code, database, and files have completed migrating, but your site is not working as you'd expect, please review [Pantheon Platform Considerations](/platform-considerations). For example, if your site uses [PHP short tags](/platform-considerations/#php-short-tags), you'll need to convert them to standard PHP tags.

Next, check [log files](/logs) to help identify and fix errors. The core is upgraded as part of migration, so you may have additional work to complete the upgrade.


### Could not import code, the import file does not appear to contain a valid code directory.

**Cause:** The migration tool could not find the core files. This prevents the migration from completing because the site modules, plugins, and/or themes cannot be imported. This error also occurs when multiple `settings.php` files are present.

**Solution:** Check that the archive includes a valid code root with all core files. If multiple `settings.php` files are present, delete them from the archive.

<TabList>

<Tab title="Drupal 7" id="d7" active={true}>

<Partial file="troubleshooting-importcode-drupal.md" />

</Tab>

<Tab title="WordPress" id="wp">

<Partial file="troubleshooting-importcode-wordpress.md" />

</Tab>

</TabList>

### Could not import database, unable to locate a database dump

**Cause:** The migration tool could not locate a MySQL database dump within the archive.

**Solution:** Ensure that the archive contains a valid MySQL database dump.

### Multiple file directories found within the import archive

**Cause:** The migration tool found more than one potential location for files within the archive. This error also occurs if Drupal's private files directory is not placed within the public directory (`sites/default/files/private`.

<Partial file="troubleshooting-multiple.md" />

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
