---
title: WordPress on Pantheon Quick Start Guide
subtitle: Pantheon Performance and Optimization Features
description: Optimization and Performance for WorPress on Pantheon
categories: [wordpress]
tags: [wordpress, webops]
contributors: [whitneymeredith]
reviewed: "2022-05-04"
layout: guide
showtoc: true
permalink: docs/guides/wordpress-pantheon/wp-optimization
anchorid: wordpress-pantheon/wp-optimization
---

Pantheon provides support for performance and optimization features to help keep your site running quickly.

## New Relic

Using [New Relic](/guides/new-relic) makes it easy for you to monitor your site's performance and speeds up the support process by helping the Pantheon support team visualize corresponding performance and symptoms.

## Quicksilver

[Quicksilver](/quicksilver) hooks into platform workflows to automate your Pantheon WebOps workflow. This allows the platform to run selected scripts automatically every hour, or when a team member triggers the corresponding workflow.

## Optimization Tips

This section provides optional steps to improve your site's speed.

1. Optimize your [wp_options table](/optimize-wp-options-table-autoloaded-data)

    - Minimize your Autoloaded data in WordPress to reduce your cache size.

1. Update your PHP version

    - Keep your [PHP version](/guides/php/php-versions#all-php-versions) up-to-date to reduce CPU load.

1. Use persistent Object Cache

    - Reduce the load on your database and CPU overhead with [Object Cache](/guides/object-cache) (included in all [Pantheon accounts](/guides/account-mgmt/plans/resources) above Basic).

1. Implement reverse proxy page cache

    - WordPress can serve cached pages, but other subsystems can do it up to 200x faster. A reverse proxy like [Varnish](/cache-control) not only helps with performance, but also can help your site be more stable during a traffic spike.

1. Use the InnoDB Engine

    - Use the InnoDB Storage Engine to avoid table-level locking. InnoDB also helps preserve your data if you have a crash.

1. Create a dedicated search index

    - An external dedicated index provides more features and responsiveness than the WordPress default Search function. Refer to [Enabling Solr for WordPress](/wordpress-solr) for more details.
