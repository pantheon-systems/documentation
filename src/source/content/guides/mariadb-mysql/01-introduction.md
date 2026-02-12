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

## CMS Compatibility 

<Partial file="cms-mariadb-compat-chart.md" />

#### Considerations - Drupal

<Partial file="drupal/drupal-mariadb-considerations.md" />

Confirm that the database upgrade completed successfully using the steps at the beginning of [Specify a Version of MariaDB](/pantheon-yml#specify-a-version-of-mariadb).

## More Resources

- [Database Workflow Tool](/guides/mariadb-mysql/database-workflow-tool)

- [Database Connection Errors](/guides/mariadb-mysql/database-connection-errors)

- [Upgrading your MariaDB version](/guides/drupal-hosted-createbt/upgrade)
