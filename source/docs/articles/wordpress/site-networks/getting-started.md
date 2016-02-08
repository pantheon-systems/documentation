---
title: Getting Started with WordPress Site Networks
description: Learn about the Pantheon WordPress Site Network support, start developing, or import existing networks.
---

You will receive an email from the platform informing you that your account has been added to the site. Once you have access to the site, you can import an existing network or start from scratch and begin developing your project on the platform.

## Migrating Site Networks to Pantheon

If your network already exists, see [Migrate to Pantheon: WordPress Site Networks](/docs/articles/sites/migrate/wordpress-site-networks/). The instructions below pertain only to new WordPress Site Networks.

## Create the Network

Before you begin, set the [connection mode to SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode#sftp-mode) for the Development environment. This is required when making necessary modifications to `wp-config.php` through the WordPress Dashboard or via WP-CLI.

### Create a Network Using Terminus and WP-CLI (Recommended)

**Before you begin, make sure that [Terminus](/docs/articles/local/cli) is configured locally and you’re authenticated with Pantheon.**

Install WordPress and enable the Multisite feature with the [`wp core multisite-install`](http://wp-cli.org/commands/core/multisite-install/) command.

This command installs and enables multisite by default with the subdirectory configuration. To create your network with the subdomain configuration, add the `--subdomains` option.
```bash
terminus wp 'core multisite-install --title=<site-title> --admin_user=<username> --admin_password=<password> --admin_email=<email> --url=<url>' --site=<example-network> --env=dev
```
If you've already installed WordPress, you can convert it to a network with: [`wp core multisite-convert`](http://wp-cli.org/commands/core/multisite-convert).

## Add Custom Hostnames to Dev, Test, and Live

<div class="alert alert-info" role="alert">
<h4>Subdomains Note</h4>
<p>Subdomain-configured site networks require unique hostnames for each site in the network added to each environment, in addition to requisite DNS settings at your DNS host, in order for the sites to be accessible in each environment. Custom hostnames cannot be added to Multidev environments.</p>
<p>You cannot add custom hostnames to an environment's automatically configured env-example-network.panthoen.io hostname, such as example-site.dev.example-network.pantheon.io. Therefore, you should add a custom primary domain for each environment at this point.
</p>
<h4>Subdirectory Note</h4>
Custom primary hostnames are not necessary for plain subdirectory-configured networks.</div>

If you will run a subdomain-style site network with the primary site that will exist using the `www.` subdomain (recommended), you must add custom hostnames with the `www.` subdomain to all environments. Likewise, if you will run the site network with the primary site at the bare domain, `example-network.com`, Dev and Test environment primary hostnames must not have the `www.` subdomain. For the site, `www.example-network.com`, use the following Terminus commands to add the hostnames:
### Add www. Hostnames
```bash
terminus site hostnames add www.dev.example-network.com --site=example-network --env=dev
terminus site hostnames add www.test.example-network.com --site=example-network --env=test
```
Until you actually go live, you'll likely want to use a subdomain like beta.example-network.com. Run:
```bash
terminus site hostnames add beta.example-network.com --site=example-network --env=live
```
For launch, run:
```bash
terminus site hostnames add www.example-network.com --site=example-network --env=live
terminus site hostnames add example-network.com --site=example-network --env=live
```
### Add Bare Domain Hostnames
For live sites at a bare domain, `example-network.com`, use:
```bash
terminus site hostnames add dev.example-network.com --site=example-network --env=dev
terminus site hostnames add test.example-network.com --site=example-network --env=test
```
Until you actually go live, you'll likely want to use a different hostname like `beta-example-network.com`, for the live environment. This should be a bare domain. If using `beta.example-network.com` instead, you will need to perform a regex search and replace when going live.  Run:
```bash
terminus site hostnames add beta-example-network.com --site=example-network --env=live
```
For launch, run:
```bash
terminus site hostnames add www.example-network.com --site=example-network --env=live
terminus site hostnames add example-network.com --site=example-network --env=live
```
Bare domains on live require a [redirect to remove `www.`](/docs/articles/sites/code/redirect-incoming-requests/#redirect-to-a-common-domain) added to `wp-config.php`, and [special DNS configuration](/docs/articles/sites/domains/#serving-sites-from-bare-domains-with-http).

Add the above subdomains to your domain name host for the domain, using the recommended settings from the Site Dashboard's domain panel for each environment (except for the case linked directly above).

For subdomain-style networks, it is also useful to add the following wildcard DNS entries at your DNS host.

- `*.dev` CNAME to `dev-example-network.pantheon.io`,
- `*.test` CNAME to `test-example-network.pantheon.io`, and
- `*.` CNAME to `live-example-network.pantheon.io`.

### Modify DOMAIN_CURRENT_SITE

For compatibility with Pantheon, you’ll need to update `DOMAIN_CURRENT_SITE` to be set conditionally based on environment. Use the hostnames added above for each environment's network's primary site. Here is an example:

<script src="//gist-it.appspot.com/https://github.com/pantheon-systems/pantheon-settings-examples/blob/master/wordpress/switch-domain_current_site.wp-config.php?footer=minimal"></script>

### Caveats for Creating a Network through WordPress Dashboard

WordPress Site Networks can also be created from the WordPress Dashboard by following the [instructions at the codex](http://codex.wordpress.org/Create_A_Network).

Once you’ve created the network, you’ll be taken to a new page:

![WordPress Network Admin Setup](/source/docs/assets/images/wp-network-setup.png)

Copy the first block and add the constants to your site’s `wp-config.php` file, right below where you added the `WP_ALLOW_MULTISITE` constant.

As in the WP-CLI installation method example, instead of defining `DOMAIN_CURRENT_SITE` explicitly, you’ll want to define it conditionally based on environment. Here is an example:

<script src="//gist-it.appspot.com/https://github.com/pantheon-systems/pantheon-settings-examples/blob/master/wordpress/switch-domain_current_site.wp-config.php"></script>

Ignore the second block of code. Pantheon containers use Nginx + PHP-FPM, not Apache, and `.htaccess` files have no effect.

Once you log back in to WordPress, pat yourself on the back — you’ve completed the Multisite installation process.

## Develop the Site Network

Congratulations on setting up your first WordPress Multisite environment. You are on your way to glory!

When logged in to the WordPress Dashboard, you'll see a new “My Sites” menu item in the toolbar.

![WordPress Site Network Dashboard](/source/docs/assets/images/wp-network-admin-sites.png)

You will have one site. To add another, use [`wp site create`](http://wp-cli.org/commands/site/create/).
```bash
# Create the site on dev.
terminus wp 'site create --slug=$SLUG' --env=dev
```
For subdomain networks, add hostnames to Dev, Test, and Live.
```bash
terminus site hostnames add --hostname=$SLUG.$DEVDOMAIN --env=dev
terminus site hostnames add --hostname=$SLUG.$TESTDOMAIN --env=test
terminus site hostnames add --hostname=$SLUG.$DOMAIN --env=live
# Open the site.
open http://$SLUG.$DEVDOMAIN
```
Spend a little time exploring the WordPress Network Dashboard to become familiar with the variety of additional settings you now have. Take a look at what options are available for each site you create, how to manage users across WordPress Multisite, and the grab bag of network settings.

## Helpful Plugins With Network Features

* [Mercator](https://github.com/humanmade/Mercator): Mercator makes it possible to map custom domains to the sites on your Multisite Network.

When setting up a Multisite install, the network is configured to create sites either as subdomains of the root site (e.g. subsite.network.com) or subfolders (e.g. network.com/subsite).

Domain mapping is the process of mapping a fully qualified domain (called an alias) to a particular site in the network. If an alias of arbitrarydomain.com is set for the site network.com/subsite, the site and wp-admin interface can be accessed over either the alias or the original URL.

The use of domain mapping necessitates additional `wp search-replace` commands to the workflow.

* [Co-Authors Plus](https://github.com/automattic/co-authors-plus): Co-Authors Plus makes it possible to assign multiple bylines to posts, pages, and custom post types. Its guest authors feature permits assigning bylines without creating WordPress user accounts.

On WordPress Networks, Co-Authors Plus’ guest authors feature permits site-specific user profiles.

* [Unconfirmed](https://github.com/boonebgorges/unconfirmed): WordPress’s default behavior is to create new user accounts through an invite and activation process. When a WordPress administrator creates a new user account, WordPress sends a confirmation email to the user. The account isn’t created until the user accepts the invitation. Unconfirmed makes it possible for super admins to manage unactivated users by activating them manually, deleting their pending registrations, or resending the activation email.

* [More Privacy Options](https://wordpress.org/plugins/more-privacy-options/): This adds three more levels of privacy(visibility) to the Settings --> Reading page.

  Site visible to any logged in community member - "Network Users Only".

  Site visible only to registered users of blog - "Site Members Only".

  Site visible only to administrators - "Site Admins Only".

* [WordPress MU Sitewide Tags](https://wordpress.org/plugins/wordpress-mu-sitewide-tags/): A central area where all the posts on a WordPress Network can be collected. A simple way to share content from the blogs in a network, without suffering SEO penalties from duplicate content.

- [Multisite Enhancements](https://wordpress.org/plugins/multisite-enhancements/): Enhance multisite for network admins.

- [Proper Network Activation](https://wordpress.org/plugins/proper-network-activation/): This plugin can fix network activation issues with plugins not coded correctly for network activation.

- [WP-CFM](https://wordpress.org/plugins/wp-cfm/): Configuration Management plugin for WordPress. You can "push" and "pull" database changes to and from your codebase for versioning. Multisite settings stored in the `wp_sitemeta` table are tracked by default, in addition to the `wp_options` table. Pull and push operations can be executed for all network sites by adding the `--network` flag to the WP-CLI command (e.g. `terminus wp 'config pull all --network' --site=<site> --env=<env>`).

## Wipe the Development Environment to Start Over

If you find you need to start over and reinstall WordPress, you can:

1. Wipe the Development environment’s database and files. This operation leaves the codebase in tact. Visit the Pantheon Site Dashboard’s Development environment, and select the Workflow tool's “Wipe” function. From the command line: `terminus site wipe --env=dev`

2. Remove the Multisite constant definitions block you added from `wp-config.php`.

3. [Reinstall WordPress](#create-the-network).

## Initialize the Test Environment

When your site network is ready to deploy to the Test environment, you will either navigate to Test in the Site Dashboard and click **Create Test Environment**, or use Terminus. This operation will deploy the code, the database, and files to the Test environment.

```bash
terminus site init-env --site=example-network --env=test
```
If you visit the Test environment at this point, it will show a database connection error. From the command line, perform a `wp search-replace` on the database.

```bash
## NOTE: the www. is necessary if the Dev, Test, and Live environments use it.
terminus wp 'search-replace $DEVDOMAIN $TESTDOMAIN --url=www.$DEVDOMAIN --network'  --site=<example-network> --env=test
```
### `wp search-replace` Fundamentals
**Pro Tip**: Include the `--dry-run` flag to get a preview of the changes without destructively transforming the database and use `--verbose` to receive additional details in the output (optional).

Before you run the command, let’s review each argument:

`terminus wp` tells Terminus to perform a WP-CLI command.

`search-replace $DEVDOMAIN $TESTDOMAIN` are three positional arguments interpreted by WP-CLI.

WP-CLI interprets them as:

- run the search and replace command;
- search for `$DEVDOMAIN` - the primary hostname for the Development environment;
- replace it with `$TESTDOMAIN` - the primary hostname for the Test environment.

`--url=www.$DEVDOMAIN` is an associative argument to set the context with which to load WordPress. Because the database still has the Dev URL stored, WordPress thinks it should be the Dev domain until the search and replace has been performed.

`--network` is a flag to perform the search and replace across the entire network.

`--site=<example-network> --env=test` are associative arguments interpreted by Terminus to know which site and which environment to run the WP-CLI command on. The `--site` and `--env` arguments can be provided automatically if you execute terminus commands from a directory containing a [`.env`](https://github.com/pantheon-systems/cli/blob/master/.env.example) file.

Ready to move forward? Run the command! When you do, you’ll see output similar to this:

```
Running wp search-replace dev-example-network.pantheon.io test-example-network.pantheon.io --url='dev-example-network.pantheon.io' --network='1'  on example-network-test
    cmd: 'search-replace dev-example-network.pantheon.io test-example-network.pantheon.io'
    flags: '--url='dev-example-network.pantheon.io' --network='1' '
    site: 'example-network'
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

## Initialize the Live Environment

```bash
terminus site init-env --env=live --yes
# NOTE: delete "www." if using the bare domain.
terminus wp 'search-replace $TESTDOMAIN $DOMAIN --url=www.$TESTDOMAIN --network'
```
Once you feel comfortable with the WordPress Network Dashboard, you’ll be ready to learn how to use the [Pantheon Workflow with WordPress Multisite](/docs/articles/wordpress/site-networks/managing/), and pick up a few additional [tips and tricks](/docs/articles/wordpress/site-networks/managing#network-tips-and-tricks-with-wp-cli).
