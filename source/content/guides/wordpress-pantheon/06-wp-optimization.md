---
title: WordPress on Pantheon Guide
subtitle: Pantheon WordPress Optimization
description: Optimization tips for WordPress on Pantheon.
categories: [wordpress]
tags: [wordpress, webops]
contributors: [whitneymeredith]
reviewed: "2022-05-04"
layout: guide
permalink: docs/guides/wordpress-pantheon/wp-optimization
anchorid: wordpress-pantheon/wp-optimization
---

This section provides optional steps to improve your site's speed.

1. Update PHP with Opcode Cache

    - Keep your PHP up-to-date and use the built-in Opcache to reduce CPU load.

2. Persistent Object Cache

    - Reduce the load on your database and CPU overhead with Redis (included in Pantheon accounts).

3. Reverse Proxy Page Cache

    - WordPress can serve cached pages, but other subsystems can do it up to 200x faster. A reverse proxy like Varnish not only helps with performance, but also can help your site be more stable during a traffic spike.

1. The InnoDB Engine

    - Use the InnoDB Storage Engine to avoid table-level locking. InnoDB also helps preserve your data if you have a crash.

1. Dedicated Search Index

    - An external dedicated index provides more features and responsiveness than the WordPress default Search function. Refer to [Enabling Solr for WordPress](/wordpress-solr) for more details.

## Pantheon Performance and Optimization Features

### New Relic

Using [New Relic](/new-relic) makes it easy for you to monitor your site's performance and speeds up the support process by helping our support team visualize corresponding performance and symptoms.

### Quicksilver

[Quicksilver](/quicksilver) allows developers and other users to work on the Pantheon dashboard in SFTP mode and commit their code to their upstream repository. This is especially useful in scenarios where you want to export configuration (WP-CFM).

