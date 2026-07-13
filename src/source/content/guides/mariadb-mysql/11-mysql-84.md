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
reviewed: "2026-07-13"
---

Pantheon supports MySQL 8.4 LTS as a database engine alongside MariaDB. MySQL 8.4 offers long-term support from Oracle through 2032.

## Before You Begin
### Considerations
Before enabling MySQL 8.4, consider the following limitations:

- **No self-service rollback.** Reverting from MySQL 8.4 to MariaDB requires Pantheon support. Always test on a [Multidev](/guides/multidev) first.
- **Backups are engine-specific.** A backup taken on MySQL 8.4 cannot be restored to a MariaDB environment, and vice versa.
- **MariaDB 10.6 required.** Your site must be on MariaDB 10.6 before migrating to MySQL 8.4. Sites on older MariaDB versions will be upgraded to 10.6 first automatically.

### CMS Version Compatibility
Before enabling MySQL 8.4, verify the following:

| CMS | Minimum Version | Notes |
|-----|----------------|-------|
| WordPress 6.x | All versions | Fully compatible |
| WordPress 5.x | 5.9+ | Older versions may hit reserved word or sql_mode issues |
| Drupal 10 | 10.2+ | Earlier versions may need patches for the `GROUPS` reserved word |
| Drupal 9 | 9.5+ | Community support ended |
| Drupal 7 | 7.x | Works with caveats. See [ONLY_FULL_GROUP_BY](#only_full_group_by-errors) below |

### Reserved Word Conflicts

MySQL 8.4 added several reserved words. If your database uses any of these as table or column names, queries will fail unless the names are quoted with backticks:

- `GROUPS` (common in Drupal sites using the Groups module)
- `RANK`, `DENSE_RANK`, `ROW_NUMBER`
- `JSON_TABLE`, `LATERAL`, `RECURSIVE`

```sql
-- This breaks on MySQL 8.4 if "groups" is a table name
SELECT * FROM groups;

-- This works on both MariaDB and MySQL 8.4
SELECT * FROM `groups`;
```

## What To Expect
### Migration Timing

| Database Size | Estimated Total Time |
|--------------|---------------------|
| Under 500 MB | 3-5 minutes |
| 500 MB - 2 GB | 5-10 minutes |
| 2 - 10 GB | 10-20 minutes |
| 10 - 30 GB | 20-60 minutes |
| 30 - 100 GB | 1-3 hours |

### During Migration

1. A new MySQL 8.4 database is provisioned for your environment.
2. Your existing MariaDB data is exported and imported into the new MySQL 8.4 database.
3. The platform verifies the data transferred correctly.
4. The new MySQL 8.4 database is promoted as your active database.

Your site's database is **read-only during the export** and **briefly unavailable during the switchover**.

### What Changes after migration

- `SELECT VERSION()` returns `8.4.x` instead of a MariaDB version string.
- The default collation for new tables is `utf8mb4_0900_ai_ci`. Migrated tables keep their original collation (`utf8mb4_general_ci`).
- Stricter SQL mode enforcement is enabled by default.

### What Stays the Same after migration

- Connection credentials (host, port, username, password).
- Database name (`pantheon`).
- All your data, tables, and indexes.
- Backup and restore workflows (within the same engine).


## How to Enable MySQL 8.4

Add the following to your site's `pantheon.yml` file:

```yaml:title=pantheon.yml
database:
  version: 8.4
```

Commit and push this change. On the next deployment, your environment's database will be migrated from MariaDB to MySQL 8.4.

<Alert title="Warning" type="danger">

Test on a [Multidev](/guides/multidev) environment before applying to Dev, Test, or Live. Reverting from MySQL 8.4 to MariaDB requires Pantheon support intervention.

</Alert>


## Troubleshooting

### ONLY_FULL_GROUP_BY Errors

MySQL 8.4 enables `ONLY_FULL_GROUP_BY` in sql_mode by default. Queries that SELECT columns not listed in the GROUP BY clause will fail:

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

For Drupal sites, you can override the sql_mode in `settings.php`:

```php
$databases['default']['default']['init_commands'] = [
  'sql_mode' => "SET sql_mode = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'",
];
```

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
