---
title: Managing WordPress Site Networks
description: Learn how to use the Pantheon Workflow on Sites Networks
---
WordPress Site Networks require additional care when deploying code and cloning databases between dev, test, and live environments. Refer to this document for procedures that will help you manage the environments effectively.

## Using the Pantheon Workflow with Site Networks

The Pantheon workflow enables you to easily create Dev and Test environments from live data. With Site Networks, you can still sync the database and all static files between environments, but performing a search and replace operation on the database must be done via the command line with Terminus and WP-CLI.

### Basic Search and Replace on a Site Network

Say, for instance, you’ve just set up a WordPress Site Network in your Dev environment. You want to push your changes to Test, so you deploy your `wp-config.php` changes, and clone your database and files from Dev to Test. The last step is to perform a search and replace on the database.

Because you just started, you only have one site on your Network. The search and replace can be done in one operation:

```bash
terminus wp --site=<pantheon-site> --env=test search-replace dev-<pantheon-site>.pantheon.io test-<pantheon-site>.pantheon.io --url=dev-<pantheon-site>.pantheon.io --network
```

**Pro Tip**: Include the `--dry-run` flag to get a preview of the changes without destructively transforming the database and use `--verbose` to receive additional details in the output (optional).

Before you run the command, let’s review each argument:

`terminus wp` tells Terminus to perform a WP-CLI command
`--site=<pantheon-site> --env=test` are associative arguments interpreted by Terminus to know which site and which environment to run the WP-CLI command on
`search-replace dev-<pantheon-site>.pantheon.io test-<pantheon-site>.pantheon.io` are three positional arguments interpreted by WP-CLI. WP-CLI interprets them as “run the search and replace command; use `dev-<pantheon-site>.pantheon.io` as the string to search for; use `test-<pantheon-site>.pantheon.io` as the value to replace it with.
`--url=dev-<pantheon-site>.pantheon.io` is an associative argument to set the context with which to load WordPress. Because the database still has the Dev URL stored, WordPress thinks it should be the Dev domain until the search and replace has been performed
`--network` is a flag to perform the search and replace across the entire network


Ready to move forward? Run the command! When you do, you’ll see output similar to this:

```
Running wp search-replace dev-pantheonboarding.pantheon.io test-pantheonboarding.pantheon.io --url='dev-pantheonboarding.pantheon.io' --network='1'  on pantheonboarding-test
    cmd: 'search-replace dev-pantheonboarding.pantheon.io test-pantheonboarding.pantheon.io'
    flags: '--url='dev-pantheonboarding.pantheon.io' --network='1' '
    site: 'pantheonboarding'
    env: 'test'
tput: No value for $TERM and no -T specified
+---------------------+-----------------------+--------------+------+
| Table               | Column                | Replacements | Type |
+---------------------+-----------------------+--------------+------+
| wp_blog_versions    | db_version            | 0            | SQL  |
| wp_blogs            | domain                | 1            | SQL  |
| wp_blogs            | path                  | 0            | SQL  |
| wp_commentmeta      | meta_key              | 0            | SQL  |
| wp_commentmeta      | meta_value            | 0            | SQL  |
| wp_comments         | comment_author        | 0            | SQL  |
| wp_comments         | comment_author_email  | 0            | SQL  |
| wp_comments         | comment_author_url    | 0            | SQL  |
| wp_comments         | comment_author_IP     | 0            | SQL  |
| wp_comments         | comment_content       | 0            | SQL  |
| wp_comments         | comment_approved      | 0            | SQL  |
| wp_comments         | comment_agent         | 0            | SQL  |
| wp_comments         | comment_type          | 0            | SQL  |
| wp_links            | link_url              | 0            | SQL  |
| wp_links            | link_name             | 0            | SQL  |
| wp_links            | link_image            | 0            | SQL  |
| wp_links            | link_target           | 0            | SQL  |
| wp_links            | link_description      | 0            | SQL  |
| wp_links            | link_visible          | 0            | SQL  |
| wp_links            | link_rel              | 0            | SQL  |
| wp_links            | link_notes            | 0            | SQL  |
| wp_links            | link_rss              | 0            | SQL  |
| wp_options          | option_name           | 0            | SQL  |
| wp_options          | option_value          | 2            | PHP  |
| wp_options          | autoload              | 0            | SQL  |
| wp_postmeta         | meta_key              | 0            | SQL  |
| wp_postmeta         | meta_value            | 0            | SQL  |
| wp_posts            | post_content          | 1            | SQL  |
| wp_posts            | post_title            | 0            | SQL  |
| wp_posts            | post_excerpt          | 0            | SQL  |
| wp_posts            | post_status           | 0            | SQL  |
| wp_posts            | comment_status        | 0            | SQL  |
| wp_posts            | ping_status           | 0            | SQL  |
| wp_posts            | post_password         | 0            | SQL  |
| wp_posts            | post_name             | 0            | SQL  |
| wp_posts            | to_ping               | 0            | SQL  |
| wp_posts            | pinged                | 0            | SQL  |
| wp_posts            | post_content_filtered | 0            | SQL  |
| wp_posts            | guid                  | 3            | SQL  |
| wp_posts            | post_type             | 0            | SQL  |
| wp_posts            | post_mime_type        | 0            | SQL  |
| wp_registration_log | email                 | 0            | SQL  |
| wp_registration_log | IP                    | 0            | SQL  |
| wp_signups          | domain                | 0            | SQL  |
| wp_signups          | path                  | 0            | SQL  |
| wp_signups          | title                 | 0            | SQL  |
| wp_signups          | user_login            | 0            | SQL  |
| wp_signups          | user_email            | 0            | SQL  |
| wp_signups          | activation_key        | 0            | SQL  |
| wp_signups          | meta                  | 0            | SQL  |
| wp_site             | domain                | 1            | SQL  |
| wp_site             | path                  | 0            | SQL  |
| wp_sitemeta         | meta_key              | 0            | SQL  |
| wp_sitemeta         | meta_value            | 1            | PHP  |
| wp_term_taxonomy    | taxonomy              | 0            | SQL  |
| wp_term_taxonomy    | description           | 0            | SQL  |
| wp_terms            | name                  | 0            | SQL  |
| wp_terms            | slug                  | 0            | SQL  |
| wp_usermeta         | meta_key              | 0            | SQL  |
| wp_usermeta         | meta_value            | 1            | PHP  |
| wp_users            | user_login            | 0            | SQL  |
| wp_users            | user_nicename         | 0            | SQL  |
| wp_users            | user_email            | 0            | SQL  |
| wp_users            | user_url              | 0            | SQL  |
| wp_users            | user_activation_key   | 0            | SQL  |
| wp_users            | display_name          | 0            | SQL  |
+---------------------+-----------------------+--------------+------+
Success: Made 10 replacements.
```

Now that you’ve performed the search and replace on your database, WordPress will load in your Test environment.

### Advanced Search and Replace on Networks with Multiple Sites

Once your WordPress Site Network environment is established, you’ll likely start adding sites to it. That's the point, after all, but with multiple sites performing the search and replace when copying the database between environments becomes a bit more involved.

As an example, consider a WordPress Network environment in Live that you’d like to copy to Test. This site, running at `example.com` Network has three sites, two of which have custom mapped domains. The Pantheon site machine name is `example-network`, making the test environment URL `test-example-network.pantheon.io`

In Live, the primary domain for WordPress is `example.com`. This first site’s dashboard lives at `example.com/wp-admin/`. The second and third sites on the network have the slugs `second-site` and `third-site`. This means their WordPress admin dashboards live at `second-site.example.com/wp-admin/` and `third-site.example.com/wp-admin/`. However, each site has a mapped domain for the front end — the second site is served at `second-site.com` and the third site is exposed at `third-site.com`.

These domains can be used in almost every table in the database. When we clone the database to the Test environment, we need to perform a mapping:

- example.com -> test-example-network.pantheon.io
- second-site.example.com -> second-site.test-example-network.pantheon.io
- third-site.pantheon.io -> third-site.test-example-network.pantheon.io
- second-site.com -> second-site.test-example-network.pantheon.io
- third-site.com -> third-site.test-example-network.pantheon.io

or if you've added the custom domain `test.example.com` to the test environment,

- example.com -> test.example.com
- second-site.example.com -> second-site.test.example.com
- third-site.example.com -> third-site.test.example.com
- second-site.com -> second-site.test.example.com
- third-site.com -> third-site.test.example.com


Although WP-CLI supports regex search and replace, it’s likely that running the operation for each search and replace pair will be much faster for your use case.

You can handle the mapping above in three operations. There are two very important things to know about the following example:

Make sure to order your operations such that subsequent replacements don’t clobber early replacements. After you run the replacement for the main site on the network, you’ll need to change the --url parameter to the main site’s new URL.

```bash
terminus wp search-replace example.com test-<pantheon-site>.pantheon.io --url=example.com --network --site=<pantheon-site> --env=test
```
```bash
terminus wp search-replace second-site.com  test-<pantheon-site>.pantheon.io --url=second-site.test-<pantheon-site>.pantheon.io --network --site=<pantheon-site> --env=test
```
```bash
terminus wp search-replace third-site.com test-<pantheon-site>.pantheon.io --url=test-<pantheon-site>pantheon.io --network --site=<pantheon-site> --env=test
```

### Flushing Cache Globally After Search and Replace

Do you use Redis as a persistent storage backend for your object cache? Each time you complete a set of search and replace operations, you’ll need to flush your cache to ensure it doesn’t serve stale values.

With Terminus and WP-CLI, you can flush cache globally with one operation:

```bash
terminus wp cache flush --site=<pantheon-site> --env=test
```

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Because the WordPress object cache stores its data as key=>value pairs and WordPress Multisite simply adds the blog ID to the key, flushing cache is a global operation for those using persistent storage backends. </div>

## Helpful Plugins With Multisite Features

- [Co-Authors Plus](https://github.com/automattic/co-authors-plus): Co-Authors Plus makes it possible to assign multiple bylines to Posts, Pages, and Custom Post Types. Its Guest Authors feature permits assigning bylines without creating WordPress user accounts.

On WordPress Networks, Co-Authors Plus’ Guest Authors feature permits site-specific user profiles.

- [Mercator](https://github.com/humanmade/Mercator): Mercator makes it possible to map custom domains to the sites on your Multisite Network.

When setting up a Multisite install, the network is configured to create sites either as subdomains of the root site (e.g. subsite.network.com) or subfolders (e.g. network.com/subsite).

Domain Mapping is the process of mapping a fully qualified domain (called an alias) to a particular site in the network. If an alias of arbitrarydomain.com is set for the site network.com/subsite, the site and wp-admin interface can be accessed over either the alias or the original URL.

- [Unconfirmed](https://github.com/boonebgorges/unconfirmed): WordPress’s default behavior is to create new user accounts through an invite and activation process. When a WordPress administrator creates a new user account, WordPress sends a confirmation email to the user. The account isn’t created until the user accepts the invitation.

Unconfirmed makes it possible for super admins to manage unactivated users by activating them manually, deleting their pending registrations, or resending the activation email.

- [More Privacy Options](https://wordpress.org/plugins/more-privacy-options/): This adds three more levels of privacy(visibility) to the Settings --> Reading page.

Site visible to any logged in community member - "Network Users Only".

Site visible only to registered users of blog - "Site Members Only".

Site visible only to administrators - "Site Admins Only".

- [WordPress MU Sitewide Tags](https://wordpress.org/plugins/wordpress-mu-sitewide-tags/)

A central area where all the posts on a WordPress Network can be collected. A simple way to share content from the blogs in a network, without suffering SEO penalties from duplicate content.

- [Multisite Enhancements](https://wordpress.org/plugins/multisite-enhancements/): Enhance Multisite for Network Admins.

- [Proper Network Activation](https://wordpress.org/plugins/proper-network-activation/): This plugin can fix network activation issues with plugins not coded correctly for network activation.

- [WP-CFM](https://wordpress.org/plugins/wp-cfm/): Configuration Management plugin for WordPress. You can "push" and "pull" database changes to and from your codebase for versioning. Multisite settings stored in the `wp_sitemeta` table are tracked by default, in addition to the `wp_options` table. Pull and push operations can be executed for all network sites by adding the `--network` flag to the WP-CLI command (e.g. `terminus wp config pull all --network --site=<site> --env=<env>`).

## Network Tips and Tricks with WP-CLI

WordPress sometimes includes database schema changes in major releases. When you update WordPress to the latest version, you might see a notification in the WordPress dashboard to update the database. [`wp core update-db`](http://wp-cli.org/commands/core/update-db/) includes a `--network` flag for upgrading the database across all sites on a network.

[`wp site *`](http://wp-cli.org/commands/site/) is an entire set of commands for managing sites on a WordPress Multisite Network. Use [`wp site create`](http://wp-cli.org/commands/site/create/) to create a new site on the network, [`wp site list`](http://wp-cli.org/commands/site/list/) to see all available sites on the network, or [`wp site empty`](http://wp-cli.org/commands/site/empty/) to clear a site of its posts and comments (while retaining options, users, and other configuration details).

The super admin is a user role unique to WordPress Networks. Like the name indicates, super admins are “super administrators”, and have unrestricted access on every site on the network. Need to add or remove a super admin from your Multisite Network? [`wp super-admin add`](http://wp-cli.org/commands/super-admin/add/) and [`remove`](http://wp-cli.org/commands/super-admin/remove/) have you covered.
