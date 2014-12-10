---
title: More Ways of Managing Code in SFTP Mode
description: Understand alternative code management options when using SFTP Mode.
filename: source/_common-tasks/more-ways-of-managing-code-in-sftp-mode.md
---

## Overview
When using Pantheon's SFTP mode to develop directly on your Dev environment, you have several options in addition to using a SFTP client to manage your code. In this mode, the website has access to write to itself, meaning built-in admin tools are open to function, as are some novel command-line capabilities.

- Use the wp-admin web interface to manage your WordPress code.
- Install and update modules and themes with Drupal's update manager.
- Command line tools for managing code.

## Using wp-admin to Manage Plugins and Themes

WordPress's admin interface has built in tools to manage plugins and themes, allowing you to search and install popular code from the main `wordpress.org` repository on your site.

When your Pantheon Dev environment is in SFTP mode, you can use these capabilities to manage the code in your dev environment. It works for plugins:

![Installing WP Plugins](https://pantheon-systems.desk.com/customer/portal/attachments/278882)

And for themes:

![Installing WP Themes](https://pantheon-systems.desk.com/customer/portal/attachments/278883)

Note that you still need to turn these changes into _commits_ in your Pantheon Site Dashboard. Committing code will keep it saved, and allow you to deploy it out to the test and live environments.

**ProTip**: You should never have to enter SFTP credentials to WordPress's admin area itself. If you're prompted for a login and password, it's a sign that your Pantheon Dev environment is not in SFTP mode.

## Installing Modules and Themes with Drupal's Update Manager

Drupal also allows you to install modules or themes [using its administrative interface](https://drupal.org/documentation/install/modules-themes/modules-7#using-drupal-interface). When in SFTP mode this will work seamlessly on Pantheon.

You'll need to grab the url to the code you want installed from Drupal.org:

![Drupal.org views module](https://pantheon-systems.desk.com/customer/portal/attachments/278879)

And then paste it into Drupal's update manager UI. You can also upload a tarball or zip file from your desktop:

![Installing via update manager](https://pantheon-systems.desk.com/customer/portal/attachments/278880)

Note that you still need to turn these changes into _commits_ in your Pantheon site dashboard. Committing code will keep it saved, and allow you to deploy it out to the test and live environments.

**ProTip** : you should never have to enter SFTP credentials to Drupal's admin area itself. If you're prompted for a login and password, it's a sign that your Pantheon Dev environment is not in SFTP mode!

## Installing Code with Terminus: the Pantheon CLI

Perhaps the most powerful way to leverage the capabilities of on-server development with Pantheon is through the use of [Terminus, our command-line interface](https://github.com/pantheon-systems/cli). This section is for developers who are CLI savvy only.

Assuming you've already set up and authenticated with [terminus](https://github.com/pantheon-systems/cli), and your Pantheon Dev environment is in SFTP mode, you can use `drush` or `wp-cli` to install code very quickly.

    joshk@steppinrazor ~$ terminus sites show --nocache
    Fetching site list from Pantheon
    +-----------------------+-----------+---------------+--------------------------------------+
    | Site | Framework | Service Level | UUID |
    +-----------------------+-----------+---------------+--------------------------------------+
    | bensons-big-demo | wordpress | free | f8277b1a-ed45-4390-a257-8dda0b50ff21 |
    | community-plumbing-20 | drupal | free | 17cff28f-e6ec-4a9e-97ce-cee418070490 |
    +-----------------------+-----------+---------------+--------------------------------------+

### Drush Example

    joshk@steppinrazor ~$ terminus --site=community-plumbing-20 drush dl pathauto devel admin_menu zen search_api search_api_solr
    Running drush dl pathauto devel admin_menu zen search_api search_api_solr on community-plumbing-20-dev
    Project pathauto (7.x-1.2) downloaded to [success]
    /srv/bindings/.../code/sites/all/modules/pathauto.
    Project devel (7.x-1.5) downloaded to [success]
    /srv/bindings/.../code/sites/all/modules/devel.
    Project devel contains 3 modules: devel_generate, devel, devel_node_access.
    Project admin_menu (7.x-3.0-rc4) downloaded to [success]
    /srv/bindings/.../code/sites/all/modules/admin_menu.
    Project admin_menu contains 3 modules: admin_devel, admin_menu_toolbar, admin_menu.
    Project zen (7.x-5.5) downloaded to [success]
    /srv/bindings/.../code/sites/all/themes/zen.
    Project search_api (7.x-1.11) downloaded to [success]
    /srv/bindings/.../code/sites/all/modules/search_api.
    Project search_api contains 3 modules: search_api_views, search_api_facetapi, search_api.
    Project search_api_solr (7.x-1.4) downloaded to [success]
    /srv/bindings/.../code/sites/all/modules/search_api_solr.

That just downloaded five modules and a theme in under a minute. Pretty cool.

### WP-CLI Example

WordPress has a similar capability:

    joshk@steppinrazor ~$ terminus --site=bensons-big-demo wp plugin install akismet wordpress-seo jetpack google-sitemap-generator
    Running wp plugin install akismet wordpress-seo jetpack google-sitemap-generator on bensons-big-demo-dev
    dev.f8277b1a-ed45-4390-a257-8d@appserver.dev.f8277b1a-ed45-4390-a257-8dda0b50ff21.drush.in's password:
    Installing Akismet (3.0.0)
    Downloading install package from https://downloads.wordpress.org/plugin/akismet.3.0.0.zip...
    Unpacking the package...
    Installing the plugin...
    Plugin installed successfully.
    Installing WordPress SEO by Yoast (1.5.2.8)
    Downloading install package from https://downloads.wordpress.org/plugin/wordpress-seo.1.5.2.8.zip...
    Unpacking the package...
    Installing the plugin...
    Plugin installed successfully.
    Installing Jetpack by WordPress.com (2.9.3)
    Downloading install package from https://downloads.wordpress.org/plugin/jetpack.2.9.3.zip...
    Unpacking the package...
    Installing the plugin...
    Plugin installed successfully.
    Installing Google XML Sitemaps (4.0.4)
    Downloading install package from https://downloads.wordpress.org/plugin/google-sitemap-generator.4.0.4.zip...
    Unpacking the package...
    Installing the plugin...
    Plugin installed successfully.



## Troubleshooting

### I can't write to my codebase on Test or Live.

This is by design. Please read [this section](/documentation/howto/using-the-pantheon-workflow/-using-the-pantheon-workflow#perms-test-live) of our Pantheon Workflow article to understand why.
