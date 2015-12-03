---
title: Managing WordPress Site Networks
description: Learn how to use the Pantheon Workflow on Sites Networks
---
## Using the Pantheon Workflow with Multisite

The Pantheon workflow enables you to easily create Dev and Test environments from live data. When using WordPress Multisite on Pantheon, you can still sync the database and all static files between environments. However, for greatest precision, performing a search and replace operation on the database is best done at the command line with Terminus and WP-CLI.

### Basic Search and Replace on WordPress Multisite with a Single Site

Say, for instance, you’ve just converted a WordPress environment in Dev to Multisite. You want to reuse this environment in Test, so you deploy your `wp-config.php` changes, and clone your database and files from Dev to Test. The last step is to perform a search and replace on the database.

Because you just have one site on your Multisite Network, you can perform the search and replace in one operation:

```bash
terminus wp --site=handbuilt-site-network --env=test search-replace dev-handbuilt-site-network.pantheon.io test-handbuilt-site-network.pantheon.io --url=dev-handbuilt-site-network.pantheon.io --network
```

**Pro Tip**: Include the --dry-run flag to get a preview of the changes without destructively transforming the database.

Before you run the command, let’s review each argument:

`terminus wp` tells Terminus to perform a WP-CLI command
`--site=handbuilt-site-network --env=test` are associative arguments interpreted by Terminus to know which site and which environment to run the WP-CLI command on
`search-replace dev-handbuilt-site-network.pantheon.io test-handbuilt-site-network.pantheon.io` are three positional arguments interpreted by WP-CLI. WP-CLI interprets them as “run the search and replace command; use `dev-handbuilt-site-network.pantheon.io` as the string to search for; use `test-handbuilt-site-network.pantheon.io` as the value to replace it with.
`--url=dev-handbuilt-site-network.pantheon.io` is an associative argument to set the context with which to load WordPress. Because the database still has the Dev URL stored, WordPress thinks it should be the Dev domain until the search and replace has been performed
`--network` is a flag to perform the search and replace across the entire network

Ready to commit? Run the command! When you do, you’ll see output similar to this:

[tk sample output from search-replace execution]

Now that you’ve performed the search and replace on your database, WordPress will load in your Test environment.

### Advanced Search and Replace on WordPress Multisite with Multiple Sites

Once your WordPress Multisite environment is established, you’ll likely add multiple sites to it. When you add multiple sites to your WordPress Multisite environment, performing the search and replace when copying the database between environments becomes a bit more involved.

As an example, consider a WordPress Multisite environment in Live that you’d like to copy to Test. This Multisite environment has three sites, two of which have custom mapped domains.

In Live, the primary domain for WordPress is pantheon.io. This first site’s dashboard lives at pantheon.io/wp-admin/. The second and third sites on the network have the slugs `second-site` and `third-site`. This means their dashboards live at `second-site.pantheon.io/wp-admin/` and `third-site.pantheon.io/wp-admin/`. However, each site has a mapped domain for the frontend — the second site is served at `second-site.com` and the third site is exposed at `third-site.com`.

These domains can be used in almost every table in the database. When we clone the database to the Test environment, we need to perform a mapping:

pantheon.io -> test.pantheon.io
second-site.pantheon.io -> second-site.test.pantheon.io
third-site.pantheon.io - > third-site.test.pantheon.io
second-site.com -> second-site.test.pantheon.io
third-site.com -> third-site.test.pantheon.io

Although WP-CLI supports regex search and replace, it’s likely that running the operation for each search and replace pair will be much faster for your use case.

You can handle the mapping above in three operations. There are two very important things to know about the following example:

Make sure to order your operations such that subsequent replacements don’t clobber early replacements.
After you run the replacement for the main site on the network, you’ll need to change the --url parameter to the main site’s new URL.

```bash
terminus wp search-replace pantheon.io test.pantheon.io --url=pantheon.io --network --site=handbuilt-site-network --env=test
terminus wp search-replace second-site.com --url=test.pantheon.io --network --site=handbuilt-site-network --env=test
terminus wp search-replace third-site.com --url=test.pantheon.io --network --site=handbuilt-site-network --env=test
```

[tk flesh out this example]

### Flushing Cache Globally After Search and Replace

DO you use Redis, Memcached, or another persistent storage backend with your object cache? Each time you run search and replace, you’ll need to flush your cache to ensure it doesn’t serve stale values.

With Terminus and WP-CLI, you can flush cache globally with one operation:

```bash
terminus wp cache flush --site=handbuilt-site-network --env=test
```

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Because the WordPress object cache stores its data as key=>value pairs and WordPress Multisite simply adds the blog ID to the key, flushing cache is a global operation for those using persistent storage backends. </div>

## Helpful Plugins With Multisite Features

- [Co-Authors Plus](https://github.com/automattic/co-authors-plus): Co-Authors Plus makes it possible to assign multiple bylines to Posts, Pages, and Custom Post Types. Its Guest Authors feature permits assigning bylines without creating WordPress user accounts.

On WordPress Multisite, Co-Authors Plus’ Guest Authors feature permits site-specific user profiles.

- [Mercator](https://github.com/humanmade/Mercator): Mercator makes it possible to map custom domains to the sites on your Multisite Network.

When setting up a Multisite install, the network is configured to create sites either as subdomains of the root site (e.g. subsite.network.com) or subfolders (e.g. network.com/subsite).

Domain Mapping is the process of mapping any arbitrary domain (called an alias) to load a site. If an alias of arbitrarydomain.com is set for the site network.com/subsite, the site and wp-admin interface can be accessed over either the alias or the original URL.

- [Unconfirmed](https://github.com/boonebgorges/unconfirmed): WordPress Multisite’s default behavior is to create new user accounts through an invite and activation process. When a WordPress administrator creates a new user account, WordPress sends a confirmation email to the user. The account isn’t created until the user accepts the invitation.

Unconfirmed makes it possible for super admins to manage unactivated users by activating them manually, deleting their pending registrations, or resending the activation email.

- [More Privacy Options](https://wordpress.org/plugins/more-privacy-options/): This adds three more levels of privacy(visibility) to the Settings --> Reading page.

Site visible to any logged in community member - "Network Users Only".

Site visible only to registered users of blog - "Site Members Only".

Site visible only to administrators - "Site Admins Only".

- [WP MU Sitewide Tags](https://wordpress.org/plugins/wordpress-mu-sitewide-tags/): A central area where all the posts on a WordPress MU or WordPress MS site can be collected.

- [Multisite Enhancements](https://wordpress.org/plugins/multisite-enhancements/): Enhance Multisite for Network Admins with different topics.

- [Proper Network Activation](https://wordpress.org/plugins/proper-network-activation/): This plugin can fix network activation issues with plugins not coded correctly for network activation.

## Network Tips and Tricks with WP-CLI

WordPress sometimes includes database schema changes in major releases. When you update WordPress to the latest version, you might see a notification in the WordPress dashboard to update the database. `wp core update-db` includes a `--network` flag for upgrading the database across all sites on a network.

`wp site *` is an entire set of commands for managing sites on a WordPress Multisite Network. Use `wp site create` to create a new site on the network, `wp site list` to see all available sites on the network, or `wp site empty` to clear a site of its posts and comments (while retaining options, users, and other configuration details).

The super admin is a user role unique to WordPress Multisite. Like the name indicates, super admins are “super administrators”, and have unrestricted access on every site on the network. Need to add or remove a super admin from your Multisite Network? `wp super-admin add` and `remove` have you covered.

[tk xargs example for commands that don’t have --network flag]
