---
title: WordPress Site Networks
subtitle: Workflows
description: Overview of WordPress multisite support on the Pantheon Platform.
multisite: true
anchorid: media
generator: pagination
layout: guide
type: guide
cms: "WordPress"
categories: [develop]
tags: [multisite, workflow]
pagination:
    provider: data.multisitepages
use:
    - multisitepages
permalink: docs/guides/multisite/workflows/
nexturl: guides/multisite/debug/
previousurl: guides/multisite/workflows/
editpath: multisite/05-workflows.md
image: multisite
---
Now that you're up and running with a WordPress Site Network on Pantheon, there are some important fundamentals to know.

## Create Test and Live Environments from Dev
After you've configured a WordPress Site Network in the Dev environment, you'll quickly want to promote it to Test and then Live. Before you use these environments, you'll need to initialize them.

1. Navigate to your Site Dashboard and click the **<span class="glyphicons glyphicons-equalizer" aria-hidden="true"></span> Test** tab.
2. Click **Create Test Environment**.

  This takes a few moments.

3. Now click **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Visit Test Site**. This will open your Test site in a new browser tab with the URL `test-YOURSITE.pantheonsite.io`. At this point, it will show a database connection error.

4. From the command line, perform a `wp search-replace` on the Test environment's database via Terminus:

    ```bash
    terminus remote:wp <site>.test -- search-replace <dev-domain> <test-domain> --url=<dev-domain> --network
    ```

    Ensure the database connection error is resolved on the Test environment's URL.

5. Repeat this process for the Live environment.

To better understand what's going on, let's dive into `wp search-replace` with greater detail.

## Deploy Across Environments
For better or for worse, WordPress stores full URLs in the database. These URLs can be links within the post content, as well as configuration values. This implementation detail means you need to perform a search and replace procedure when moving a database between environments.

WP-CLI's `search-replace` command is a good tool for this job, in large part because it also gracefully handles URL references inside of PHP serialized data. The general pattern you'll want to follow is:

```bash
terminus remote:wp <site>.<env> -- search-replace <old-domain> <new-domain> --network --url=<old-domain>
```

In this example:

- `<old-domain>` is the domain currently stored in the database.
- `<new-domain>` is the new domain you'd like to replace the old domain with.
- `--network` tells WP-CLI to perform the procedure on all Site Network tables. Its default behavior is to limit search and replace to the current site.
- `--url=<old-domain>` sets the request context, which is how WordPress knows which site to load. Without this, you'll likely see “Error: Site not found.”

See the [full documentation](https://developer.wordpress.org/cli/commands/search-replace/) for all supported features.

Using WP-CLI with Terminus is simply a matter of calling Terminus with the correct `<site>` and `<env>` arguments:

```bash
terminus remote:wp <site>.<env> -- search-replace --network
```

Now that you've performed the search and replace on your database, WordPress has the correct stored configuration.

##  Flush Cache Globally after Search-Replace
If you use Redis as a persistent storage backend for your object cache, you'll need to flush your cache each time you complete a set of search and replace operations to ensure it doesn't serve stale values.

With Terminus and WP-CLI, you can flush cache globally with one operation:

```bash
terminus remote:wp <site>.<env> -- cache flush
```

The Terminus command to clear all caches for an environment is:

```bash
terminus env:clear-cache <site>.<env>
```

Running into “Error: Site Not Found”? See [Troubleshoot](/guides/multisite/debug) for the cause and resolution.


<Alert title="Note" type="info">
Because the WordPress object cache stores its data as key => value pairs and WordPress Multisite simply adds the blog ID to the key, flushing cache is a global operation for those using persistent storage backends.
</Alert>

## Refresh data from Live
Once you have a production environment, refreshing data in Test or Dev from Live is simply a matter of reversing the steps you took to initially create the Live environment.

First, clone the content from Live into Dev:

```bash
terminus env:clone-content <site>.live dev
```

Once the clone process is complete, you'll need to run `wp search-replace` to update all domain configuration references:

```bash
terminus remote:wp <site>.<env> -- search-replace <live-domain> <dev-domain> --network --url=<live-domain>
```

Lastly, flush the cache for the entire Dev environment:

```bash
terminus env:cc <site>.dev
```

Behold: you can now develop against production data.

## Work with Large Databases
If you have a really large database (gigabytes and gigabytes) or dozens upon dozens of tables, you may notice that `wp search-replace` can take a really long time — or even time out.

To better understand what's going on, it's helpful to have some background knowledge.

First, `wp search-replace` is necessary when moving a database between environments for two reasons:

1. WordPress stores full URLs in the database, for better or for worse. When you move a database between environments, you may want to update all of those URL references.
2. WordPress can store URLs in PHP serialized data. Because URL string length can vary, MySQL search and replace can break PHP serialized data. `wp search-replace` detects and properly handles PHP serialized data.

Second, `wp search-replace` is *probably* spending a lot of time processing data in the `post`  and `postmeta` tables. If you don't care about updating URL references within post data, then it may be iterating a bunch of data unnecessarily.

In a stock WordPress install (e.g. no custom plugins), there are a few key places URL configuration data is stored:


- `wp_blogs` table, `domain` column.
- `wp_site` table, `domain` column.
- `wp_options` table (for each site on the network), `home` and `site_url` option name.

Try running `wp search-replace` against this limited subset of data:

```bash
terminus remote:wp <site>.<env> -- search-replace <old-domain> <new-domain> wp_blogs wp_site $(terminus remote:wp <site>.<env> -- db tables "wp_*options" --network | paste -s -d ' ' -) --url=<old-domain>
```

In this example:

1. we use `wp db tables` ([full documentation](https://developer.wordpress.org/cli/commands/db/tables/)) to list all database tables matching “wp_*options”.
2. `wp_blogs` and `wp_site` are appended to the list of tables we want to transform.
3. `wp search-replace` is limited to the table list specified, instead of the full database.

If the WordPress Site Network works as expected after you run `wp search-replace`, then you're good to go. If it doesn't quite work as expected, there may be some plugins storing URL data in other locations that you'll need to debug and further assess.

Ultimately, the key idea is to only perform a search and replace where you absolutely need it, instead of globally against the entire database.

## Go for Launch
In reading through this guide and participating along the way, you're now fully up to speed on managing a WordPress Site Network on Pantheon. Check out the [Launch Essentials Guide](/guides/launch) when you're ready to push your site live — launching a WordPress Site Network isn't much different than launching a standard WordPress site.

Continue to the next page for some tips on how to manage networks and debug common issues.
