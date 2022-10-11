This section provides information on causes and solutions to error messages that display in the Site Dashboard if a migration fails to complete.

First troubleshooting steps:

1. Review [Pantheon Platform Considerations](/guides/platform-considerations) if your code, database, and files have completed migrating, but your site is not working as you'd expect. For example, if your site uses [PHP short tags](/guides/platform-considerations/php-platform#php-short-tags), you'll need to convert them to standard PHP tags.

1. Check the [log files](/guides/logs-pantheon) to help identify and fix errors. The core is upgraded as part of the migration, so you may have additional work to complete the upgrade.

## General Issues

### Could not import database, unable to locate a database dump

**Cause:** The migration tool could not locate a MySQL database dump within the archive.

**Solution:** Ensure that the archive contains a valid MySQL database dump.

### Multiple database dumps found within the import archive

**Cause:** The migration tool detected multiple MySQL database dumps within the archive.

**Solution:** Ensure that a single MySQL dump is included within the archive.

### Multiple code roots found within the import archive

**Cause:**  The migration tool detected more than one potential location for the code root in the archive.

**Solution:** Ensure that a single code root is included within the archive.

### Destination Site Not Found Error

**Cause**: This error occurs when you are logged in with one identity and re-authenticate with a different account or use Single Sign-On with Google. The site created will be associated with one account and the machine token with another.

**Solution**: Click your browser's back button from the Pantheon Dashboard and re-authenticate the user account for your current session.

### Maximum Index Size

**Cause**: The [MySQL reference manual](https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-conversion.html) explains this error as:

> InnoDB has a maximum index length of 767 bytes for tables that use COMPACT or REDUNDANT row format, so for utf8mb3 or utf8mb4 columns, you can index a maximum of 255 or 191 characters, respectively. If you currently have utf8mb3 columns with indexes longer than 191 characters, you must index a smaller number of characters.

Sites migrated from hosts using `utf8mb3` are upgraded to `utf8mb4`. If those sites have indexes larger than 191 characters MySQL will return the following error on import:

```none
Index column size too large. The maximum column size is 767 bytes
```

**Solution**: These tables will need to be updated. One method to update index length uses the `ALTER TABLE` command:

```sql
ALTER TABLE tableName DROP INDEX meta_key, ADD INDEX meta_key(meta_key(191));
```

This command can be used as part of a script to find and update large indexes.
