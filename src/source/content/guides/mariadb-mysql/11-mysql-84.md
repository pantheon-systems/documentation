---
title: MariaDB and MySQL on Pantheon
subtitle: MySQL 8.4
description: Learn how to migrate from MariaDB to MySQL 8.4 on Pantheon.
contenttype: [guide]
innav: [false]
categories: [database]
cms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [database]
showtoc: true
permalink: docs/guides/mariadb-mysql/mysql-84
reviewed: "2026-09-16"
---

Pantheon supports MySQL 8.4 LTS as a database engine alongside MariaDB. MySQL 8.4 offers long-term support from Oracle through 2032.

## Before You Begin
### Considerations
Before enabling MySQL 8.4, consider the following limitations:

- **No self-service rollback.** Reverting from MySQL 8.4 to MariaDB requires Pantheon support. Always test on a [Multidev](/guides/multidev) or Dev environment before switching your Live environment.
- **Backups are not cross-engine.** The platform handles data conversion during migration automatically. However, a manual backup taken on MySQL 8.4 cannot be restored to a MariaDB environment (and vice versa) because the backup/restore workflow does not perform engine conversion.
- **MariaDB 10.6 required.** The migration currently requires MariaDB 10.6 as the source version. Upgrade to 10.6 first if you are on an older release.

### CMS Version Compatibility
Before enabling MySQL 8.4, verify the following:

| CMS | Minimum Version | Notes |
|-----|----------------|-------|
| WordPress 7.x | All versions | Fully compatible |
| WordPress 6.x | All versions | Fully compatible |
| WordPress 5.x | Latest point release | Older versions may hit reserved word or sql_mode issues. Upgrade to the latest 5.x release before migrating. |
| Drupal 11 | All versions | Fully compatible |
| Drupal 10 | Latest point release | Upgrade to the latest 10.x release to pick up reserved word fixes (e.g. the `GROUPS` keyword). |
| Drupal 9 | 9.5 | End of life since November 2023. Upgrade to Drupal 10 or 11. |
| Drupal 7 | 7.76 | End of life since January 2025. Releases before 7.76 cannot connect to MySQL 8 because their default `sql_mode` sets `NO_AUTO_CREATE_USER`, which MySQL 8 removed. |

### Reserved Word Conflicts

MySQL 8.x reserves several words that MariaDB does not. If your database uses any of these as table or column names, queries will fail unless the names are quoted with backticks:

- `GROUPS` (common in Drupal sites using the Groups module)
- `SYSTEM` (the Drupal 7 `system` table; Drupal 7.76 and later quote it)
- `RANK`, `DENSE_RANK`, `ROW_NUMBER`
- `JSON_TABLE`, `LATERAL`, `RECURSIVE`

```sql
-- This breaks on MySQL 8.4 if "groups" is a table name
SELECT * FROM groups;

-- This works on both MariaDB and MySQL 8.4
SELECT * FROM `groups`;
```

## What To Expect
### During Migration

1. The platform provisions a new MySQL 8.4 database for your environment.
2. The platform exports your existing MariaDB data and imports it into the new MySQL 8.4 database.
3. The platform verifies the data transferred correctly.
4. The platform promotes the new MySQL 8.4 database as your active database.

Your site's database is **read-only during the export** and **briefly unavailable during the switchover**.

### Migration Timing

| Database Size | Estimated Total Time |
|--------------|---------------------|
| Under 500 MB | 3-5 minutes |
| 500 MB - 2 GB | 5-10 minutes |
| 2 - 10 GB | 10-20 minutes |
| 10 - 30 GB | 20-60 minutes |
| 30 - 100 GB | 1-3 hours |

### Tracking the Migration

How the migration shows up depends on the environment:

- **Dev and Multidev.** The code deploy finishes first. The migration runs as a separate workflow called **Change database version for `<environment>`** in the Workflows tab. It stays in progress until the new database is promoted. The start and end times show how long the migration took.
- **Test and Live.** The migration runs inside the deploy workflow. The deploy stays in progress until the migration completes.

You can also list the workflow from the command line:

```bash{promptUser: user}
terminus workflow:list <site>
```

To confirm the switchover, check `SELECT VERSION()`. It returns a MariaDB version string until the migration finishes, then `8.4.x`.

```bash{promptUser: user}
# Drupal
terminus drush <site>.<env> -- sqlq 'SELECT VERSION();'

# WordPress
terminus wp <site>.<env> -- db query 'SELECT VERSION();'
```

### What Changes After Migration

- `SELECT VERSION()` returns `8.4.x` instead of a MariaDB version string.
- The default collation for new tables is `utf8mb4_0900_ai_ci`. Migrated tables keep their original collation (`utf8mb4_general_ci`).
- The server default `sql_mode` includes `ONLY_FULL_GROUP_BY` and the strict modes. WordPress and Drupal set their own `sql_mode` when they connect, so this only affects code that opens its own database connection. See [ONLY_FULL_GROUP_BY Errors](#only_full_group_by-errors).

### What Stays the Same After Migration

- Connection credentials (host, port, username, password).
- Database name (`pantheon`).
- All your data, tables, and indexes.
- Backup and restore workflows (within the same engine).


## How to Enable MySQL 8.4

Add the following to your site's `pantheon.yml` file:

```yaml:title=pantheon.yml
database:
  type: mysql
  version: 8.4
```

Commit and push this change. On the next deployment, your environment's database will be migrated from MariaDB to MySQL 8.4.

<Alert title="Note" type="info">

For sites on Pantheon-managed upstreams, the `pantheon.upstream.yml` change will be rolled out by Pantheon on a per-upstream schedule. You do not need to add the database configuration yourself unless you are on a [Custom Upstream](/guides/custom-upstream) or want to opt in ahead of the scheduled rollout. You can opt in early on any environment, including Live. Test on a Multidev first, as the warning below describes.

</Alert>

<Alert title="Warning" type="danger">

Test on a [Multidev](/guides/multidev) environment before applying to Dev, Test, or Live. Reverting from MySQL 8.4 to MariaDB requires Pantheon support intervention.

</Alert>


## Troubleshooting

### ONLY_FULL_GROUP_BY Errors

The MySQL 8.4 server default `sql_mode` includes `ONLY_FULL_GROUP_BY`. WordPress core and Drupal override `sql_mode` on connect, so queries through `$wpdb` or Drupal's database API are not affected. Custom code that opens its own connection with PDO or mysqli gets the server default. On that connection, queries that SELECT columns not listed in the GROUP BY clause fail:

```
ERROR 1055: Expression #1 of SELECT list is not in GROUP BY clause
```

**Fix:** Add the missing columns to your GROUP BY clause, or wrap them in `ANY_VALUE()`:

```sql
-- Before
SELECT name, department, MAX(salary) FROM employees GROUP BY department;

-- After
SELECT ANY_VALUE(name), department, MAX(salary) FROM employees GROUP BY department;
```

Or set `sql_mode` on your own connection after connecting:

```sql
SET SESSION sql_mode = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
```

If your Drupal `settings.php` already overrides `init_commands`, make sure the override does not include `NO_AUTO_CREATE_USER`. MySQL 8 rejects it and the site cannot connect.

### Collation Mismatch Errors

If you create new tables after migration and join them with migrated tables, you may see:

```
ERROR 1267: Illegal mix of collations
```

**Fix:** Set the collation explicitly on new tables to match your existing tables:

```sql
ALTER TABLE new_table CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

For WordPress, add to `wp-config.php`:

```php
define('DB_COLLATE', 'utf8mb4_general_ci');
```

## More Resources

- [MariaDB and MySQL FAQ](/guides/mariadb-mysql/mariadb-mysql-faq)
- [Database Connection Errors](/guides/mariadb-mysql/database-connection-errors)
- [pantheon.yml Configuration](/pantheon-yml)
