---
title: MariaDB and MySQL on Pantheon
subtitle: Introduction
description: Learn how to use MariaDB and MySQL on Pantheon.
contenttype: [guide]
innav: [true]
categories: [database]
cms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [database]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/mariadb-mysql
---

Pantheon provides direct access to your databases through our platform for debugging and importing large databases. Pantheon is standardized on MariaDB, but we also support MySQL database connections.

Each site environment (Dev, Test, and Live) has a separate database that requires unique credentials. Credentials are automatically included in your site configuration.

## About MariaDB and MySQL

MariaDB originated as a fork of MySQL that included enhanced features and performance improvements. MariaDB and MySQL both use the MySQL protocol. However, MariaDB and MySQL have evolved into separate databases.

MariaDB provides a full database solution, including:

- Temporal tables

- Distributed SQL

- Columnar storage

### Default MariaDB versions for new environments

The default database version for new sites is MariaDB `10.4`.

The latest version of Drupal requires MariaDB `10.3` or later. If you have a site that you plan to upgrade, confirm that the database has been upgraded to MariaDB `10.3` or `10.4` in all environments before you begin the upgrade.

You can confirm your MariaDB verison with `ddev mariadb --version`:

```bash
$ ddev mariadb --version
mariadb  Ver 15.1 Distrib 10.11.14-MariaDB ...
```

If your site has any older contrib modules that are not compatible with MariaDB `10.4`, set the MariaDB version of the new site to `10.3` in your `pantheon.yml` file. 

Remember to rebuild your Docker containers locally to test them before deploying - for DDEV users, this is done by running `ddev rebuild`.

## More Resources

- [Database Workflow Tool](/guides/mariadb-mysql/database-workflow-tool)

- [Database Connection Errors](/guides/mariadb-mysql/database-connection-errors)

- [Upgrading your MariaDB version](/guides/drupal-hosted-createbt/upgrade)
