---
title: Managing WordPress Site Networks
description: Learn how to use the Pantheon Workflow on WordPress Site Networks.
tags: [devterminus, workflow]
categories: [wordpress]
---
WordPress Site Networks require additional care when deploying code and cloning databases between Dev, Test, and Live environments. Refer to this document for procedures that will help you manage the environments effectively.

## Using the Pantheon Workflow with Site Networks

Code development and deployment will use the same [Pantheon Workflow](/docs/pantheon-workflow) as any other site. Database clones, initiated during a code deployment to test or during the creation of Test and Live environments, require a manual `wp search-replace` to complete. This is easy to do via the command line with Terminus and WP-CLI.

As long as the primary site on Dev, Test, and Live have the same subdomain pattern (`www.` or bare), the only operation necessary to view all sites with hostnames present on the target environment is, where `DOMAIN=example.com` and `TESTDOMAIN=test.example.com`:
```bash
terminus wp <site>.test -- search-replace $DOMAIN $TESTDOMAIN --network
```
## Flushing Cache Globally After Search and Replace

If you use Redis as a persistent storage backend for your object cache, you’ll need to flush your cache each time you complete a set of search and replace operations to ensure it doesn’t serve stale values.

With Terminus and WP-CLI, you can flush cache globally with one operation:

```bash
terminus wp <site>.test -- cache flush
```
The Terminus command to clear all caches for an environment is:
```bash
terminus env:clear-cache <site>.test
```

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Because the WordPress object cache stores its data as key => value pairs and WordPress Multisite simply adds the blog ID to the key, flushing cache is a global operation for those using persistent storage backends. </p></div>


## Deploy Code to Test

Code that has been committed to master and is running on the Dev environment:
```bash
terminus env:deploy <site>.test --sync-content --cc --updatedb --note=<note>
terminus wp <site>.test -- search-replace $DOMAIN $TESTDOMAIN --url=$DOMAIN --network
terminus env:clear-cache <site>.test
```
## Clone Content from Live to Test
Restore the Test database and files to the state of the Live environment.
```bash
env:clone <site>.live test
terminus wp <site>.test -- search-replace $DOMAIN $TESTDOMAIN --url=$DOMAIN --network
terminus env:cc <site>.test
```

## Clone Content from Live to Dev
Catch up Dev to Live before you start development. The first command will overwrite the DB in Dev.
```bash
env:clone <site>.live dev
terminus wp <site>.dev -- search-replace $DOMAIN $DEVDOMAIN --url=$DOMAIN --network
terminus env:cc <site>.dev
```

## Subdomain Networks

Subdomain-style networks require custom hostnames added to all environments for all sub-sites they will be used on. Add hostnames to live for all subdomain sites.

```bash
terminus wp <site>.live -- site create --slug=$SLUG
terminus domain:add <site>.live $SLUG.$DOMAIN
```
Add hostnames to Dev and Test environments for all subdomain sites necessary for development and testing.  
```bash
terminus wp <site>.live -- site create --slug=$SLUG
terminus domain:add <site>.live $SLUG.$DOMAIN
terminus domain:add <site>.test $SLUG.$TESTDOMAIN
terminus domain:add <site>.dev $SLUG.$DEVDOMAIN
```
The next time you clone content from Live to Test or Dev, this sub-site will be accessible in each environment after a simple `wp search-replace`.

```bash
terminus env:clone <site>.live test
terminus wp <site>.test -- search-replace $DOMAIN $TESTDOMAIN --url=www.$DOMAIN --network
terminus env:cc <site>.test
```

## Search and Replace for Domain-Mapped Sites in a Network

1. Map the primary domain to the Test environment domain as normal. All sites and sub-sites should be accessible from the default domains at this point.
2. For each of the aliases you want to access from a domain-mapped URL in Test,
 - Add the custom test.hostname to Test
 - `wp search-replace $DOMAIN2 $TESTDOMAIN2 --url=test.$DOMAIN`

Domain mapping adds an alias URL to sites on a network, so that they can be accessed from the default subdomain or subdirectory of the main URL, or from a different Domain Name. As an example, consider a subdomain-style WordPress Network, with Live running at `www.example-network.com`, Test at `www.test.example-network.com`, and Dev at `www.dev.example-network.com` The Network contains three sites, two of which have custom mapped domains. The second site's slug is `second-site`,  its WordPress admin dashboard is at `second-site.example-network.com/wp-admin/`, and it has an alias domain mapped for the front end, served at `second-site.com`. Likewise,  `third-site` is administered at `third-site.example-network.com/wp-admin/` and is served at `third-site.com`.

These domains can exist in almost every table in the database. When we clone the database from Live to  Test, we need to perform a mapping:

- `www.$DOMAIN` -> `www.$TESTDOMAIN`
- `second-site.$DOMAIN` -> `second-site.$TESTDOMAIN`
- `third-site.$DOMAIN` -> `third-site.$TESTDOMAIN`
- `second-site.com` -> `second-site.$TESTDOMAIN`
- `third-site.com` -> `third-site.TESTDOMAIN`

Although WP-CLI supports regex search and replace, it’s likely that running the operation for each search and replace pair will be much faster for your use case.

You can handle the mapping above in three operations. There are two very important things to know about the following example:

- Order your operations such that subsequent replacements don’t clobber early replacements.
- After you run the replacement for the main site on the network, you’ll need to change the `--url` parameter to the main site’s new URL.

The first operation will map the primary site and all of its subsites:
given `DOMAIN=example-network.com`, `TESTDOMAIN=test.example-network.com`, and `DEVDOMAIN=dev.example-network.com`
```bash
terminus wp <site>.test -- search-replace $DOMAIN $TESTDOMAIN --url=www.$DOMAIN --network
```
- `www.$DOMAIN` -> `www.$TESTDOMAIN`
- `second-site.$DOMAIN` -> `second-site.$TESTDOMAIN`
- `third-site.$DOMAIN` -> `third-site.$TESTDOMAIN`

The site URL will become `www.$TESTDOMAIN`.
Then we can to replace the aliases in the database with their test-environment URLs.
```bash
terminus wp <site>.test -- search-replace second-site.com  second-site.$TESTDOMAIN
terminus wp <site>.test -- search-replace third-site.com third-site.$TESTDOMAIN
```
### Preserve Domain-Mapped URLs

If you want to use unique domain-mapped hostnames, like `www.test.second-site.com` and `www.dev.third-site.com` as aliases for the sites on the Dev and Test environments instead of the default environment URLs, add them to the Test environment and at your DNS host.
```bash
terminus domain:add <site>.test www.dev.$DOMAIN2
terminus domain:add <site>.test www.test.$DOMAIN2
terminus domain:add <site>.test www.dev.$DOMAIN3
terminus domain:add <site>.test www.test.$DOMAIN3
```

After each clone from Live to Test, performing the first search and replace, map the new aliases.
- `second-site.com` -> `test.second-site.com`
- `third-site.com` -> `test.third-site.com`
```bash
terminus wp <site>.test -- search-replace $DOMAIN test.$DOMAIN --url=www.$DOMAIN
terminus wp <site>.test -- search-replace $DOMAIN2 test.$DOMAIN2 --url=www.$TESTDOMAIN
terminus wp  <site>.test -- search-replace $DOMAIN3 test.$DOMAIN3 --url=www.$TESTDOMAIN
```

## Network Tips and Tricks with WP-CLI

WordPress sometimes includes database schema changes in major releases. When you update WordPress to the latest version, you might see a notification in the WordPress dashboard to update the database. [`wp core update-db`](http://wp-cli.org/commands/core/update-db/) includes a `--network` flag for upgrading the database across all sites on a network.

[`wp site *`](http://wp-cli.org/commands/site/) is an entire set of commands for managing sites on a WordPress Multisite Network. Use [`wp site create`](http://wp-cli.org/commands/site/create/) to create a new site on the network, [`wp site list`](http://wp-cli.org/commands/site/list/) to see all available sites on the network, or [`wp site empty`](http://wp-cli.org/commands/site/empty/) to clear a site of its posts and comments (while retaining options, users, and other configuration details).

The super admin is a user role unique to WordPress Networks. Like the name indicates, super admins are “super administrators”, and have unrestricted access on every site on the network. Need to add or remove a super admin from your Multisite Network? [`wp super-admin add`](http://wp-cli.org/commands/super-admin/add/) and [`remove`](http://wp-cli.org/commands/super-admin/remove/) have you covered.
