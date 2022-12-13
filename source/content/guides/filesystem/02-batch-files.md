---
title: Pantheon Filesystem
subtitle: Batch Files
description: Detailed information on how to access and optimize the Pantheon filesystem.
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

The [max execution time](/timeouts/#user-configurable-timeouts) for PHP scripts on the platform is 120 seconds. Batch uploads, like one might see importing products with [WooCommerce](https://wordpress.org/plugins/woocommerce), can encounter this limit.

In this or similar instances, consider performing larger operations locally, then importing the code, files, and database to the Pantheon platform.

## Batched Data Export to File

It is difficult to batch export data to a file in Test and Live environments on plans with multiple application containers. Many contrib plugins and modules are not designed to support multiple application containers. It might be possible to get data export working, but that may require additional effort and custom code.

Modules and plugins often do this type of batch export by continuously appending data to the same file in each request in the batch process. With multiple application containers, the result is that several containers will attempt to add data to the same file at once, while simultaneously syncing their own version of the updated file to other appservers and receiving updates from other application containers. The exported data will likely be incomplete.

A non-batched export of a dataset small enough to complete within the set timeout for web requests will likely work.

### Potential Workarounds

1. Have each request in the data export write to its own `tmp` file, then concatenate these at the end. This solution requires that the [Persistent Temporary Path Workaround](/guides/filesystem/tmp/#persistent-temporary-path-workaround) is in place.

1. Do small batches and add enough time between each request in the batch process to allow the updated file to be synced between all application containers.

### Alternative Approaches

You can run the export from the command line using tools like [Terminus](/terminus), [Drush](/guides/drush), [WP-CLI](/guides/wp-cli) and cron, which will produce a better result. Larger data sets can be exported, as command line processes have longer timeouts than HTTP requests. Refer to [Timeouts on Pantheon](/timeouts) for more information. You won't need to batch your export, which allows it to run to completion on a single application container.

The best solution is often to implement data exports as a web service, incrementally exchanging the data with the target system.
