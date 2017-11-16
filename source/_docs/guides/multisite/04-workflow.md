---
title: WordPress Site Networks
subtitle: Site Networks + Pantheon Workflow
description: Overview of WordPress multisite support on the Pantheon Platform.
multisite: true
anchorid: media
generator: pagination
layout: guide
pagination:
    provider: data.multisitepages
use:
    - multisitepages
permalink: docs/guides/multisite/workflow/
nexturl: guides/multisite/debug/
previousurl: guides/multisite/config/
editpath: multisite/04-workflow.md
image: multisite
---
<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p markdown="1">Setting up a site network on top of a vanilla WordPress installation is not supported. It must be created by a Pantheon employee.</p>
</div>

Now that you’re up and running with a Site Network on Pantheon, there are some important fundamentals to know.

## Creating Test and Live environments from dev

After you’ve configured a WordPress Site Network in the Dev environment, you’ll quickly want to promote it to Test and then Live.

First, navigate to Test in the Site Dashboard and click **Create Test Environment**, or use Terminus. This operation will deploy the code, the database, and files to the Test environment.


    terminus env:deploy <site>.test

If you visit the Test environment at this point, it will show a database connection error. From the command line, perform a `wp search-replace` on the database.


    terminus wp <site>.test -- search-replace $DEVDOMAIN $TESTDOMAIN --url=$DEVDOMAIN --network

To better understand what’s going on, let’s dive into `wp search-replace` with greater detail.

## Using `wp search-replace` when moving a database between environments

For better or for worse, WordPress stores full URLs in the database. These URLs can be links within the post content, as well as configuration values. This implementation detail means you need to perform a search and replace procedure when moving a database between environments.

WP-CLI’s `search-replace` command is a good tool for this job, in large part because it also gracefully handles URL references inside of PHP serialized data. The general pattern you’ll want to follow is:


    wp search-replace <old-domain> <new-domain> --network --url=<old-domain>

In this example:

- `<old-domain>` is the domain currently stored in the database.
- `<new-domain>` is the new domain you’d like to replace the old domain with.
- `--network` tells WP-CLI to perform the procedure on all Site Network tables. Its default behavior is to limit search and replace to the current site.
- `--url=<old-domain>` sets the request context, which is how WordPress knows which site to load. Without this, you’ll likely see “Error: Site not found.”

[See the full documentation](https://developer.wordpress.org/cli/commands/search-replace/) for all supported features.

Using WP-CLI with Terminus is simply a matter of calling Terminus with the correct `<site>` and `<env>` arguments:


    terminus wp <site>.<env> -- search-replace

Now that you’ve performed the search and replace on your database, WordPress will load in your Test environment.

## Refreshing data from Live


## Working with large databases


- Limiting search-replace to specific fields to avoid timeouts
- Only refreshing a subset of your database
