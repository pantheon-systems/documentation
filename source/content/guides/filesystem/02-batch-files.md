---
title: Pantheon Filesystem
subtitle: Batch Files
description: Learn how to upload and export batch files.
contenttype: [guide]
contributors: [whitneymeredith]
layout: guide
showtoc: true
categories: [--]
newcms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [code, files]
reviewed: "2021-07-14"
permalink: docs/guides/filesystem/batch-files
anchorid: batch-files
---

This section provides information on how to upload and export batch files.

## Batch Uploads

The [max execution time](/timeouts/#user-configurable-timeouts) for PHP scripts on the platform is 120 seconds. You may encounter this limit during product batch uploads with [WooCommerce](https://wordpress.org/plugins/woocommerce) or a similar application. To workaround this limit:

1. Perform large operations locally.

1. Import your code, files, and database to the Pantheon platform after the operations complete.

## Batched Data Export to File

Batched data exports to a file in Test and Live environments are difficult if you have a plan with multiple application containers. Many contrib plugins and modules are not designed to support multiple application containers. It might be possible to get data export working, but that may require additional effort and custom code.

Modules and plugins process this type of batch export by continuously appending data to the same file in each request. Multiple containers will attempt to add data to the same file at once. The application containers also simultaneously sync their own version of the updated file to other appservers and receive updates from other application containers. The exported data will likely be incomplete as a result.

A non-batched export of a dataset small enough to complete within the set timeout for web requests will likely work.

### Potential Workarounds

1. Configure each request in the data export to write to its own `tmp` file, then concatenate these at the end. This solution requires that the [Persistent Temporary Path Workaround](/guides/filesystem/tmp/#persistent-temporary-path-workaround) is in place.

1. Add enough time between each request in the batch process to allow the updated file sync between all application containers.

1. Export small batches.

### Alternative Approaches

We recommend that you implement data exports as a web service, incrementally exchanging the data with the target system.

You can also run the export from the command line for a better result with tools such as:

- [Terminus](/terminus)
- [Drush](/guides/drush)
- [WP-CLI](/guides/wp-cli)
- cron

This allows you to export larger data sets because the command line processes have longer timeouts than HTTP requests. Refer to [Timeouts on Pantheon](/timeouts) for more information. You can also run your export without batches, which allows it to run to completion on a single application container.

## More Resources

- [All About Application Containers](/application-containers)
- [Cron for WordPress](/guides/wordpress-developer/wordpress-cron)
- [Cron for Drupal](/drupal-cron)