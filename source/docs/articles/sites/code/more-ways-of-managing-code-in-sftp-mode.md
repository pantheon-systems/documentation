---
title: More Ways of Managing Code in SFTP Mode
description: Understand alternative code management options when using SFTP Mode, such as WP-cli, Drupal Drush, and other command line tools.
category:
  - managing
keywords: sftp, sftp mode, wp-admin, apps.module, administrator, admin, connection info, connection information, sftp connection info, sftp connection information, authenticate sftp, access denied sftp, forbidden, authentication, commit sftp changes, commit changes, develop using sftp, make changes using sftp, wp-cli, drush, terminus, command line tools, cli, comand line tool
---
When using Pantheon's SFTP mode to develop directly on your Dev environment, you have several options in addition to using a SFTP client to manage your code. In this mode, the website has access to write to itself, meaning built-in admin tools are open to function, as are some novel command-line capabilities.

- Use the wp-admin web interface to manage your WordPress code.
- Install and update modules and themes with Drupal's update manager.
- Command line tools for managing code.

##  Manage Plugins and Themes with wp-admin

WordPress's admin interface has built in tools to manage plugins and themes, allowing you to search and install popular code from the main WordPress.org repository on your site.

When your Pantheon Dev environment is in SFTP mode, you can use these capabilities to manage the code in your Dev environment. It works for plugins:
 ![Installing WP Plugins](/source/docs/assets/images/desk_images/278882.png)<br />
And for themes:<br />
 ![Installing WP Themes](/source/docs/assets/images/desk_images/278883.png)<br />
You still need to turn these changes into commits in your Pantheon Site Dashboard. Committing code will keep it saved and allow you to deploy it out to the Test and Live environments.

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
You should never have to enter SFTP credentials to WordPress's admin area itself. If you're prompted for a login and password, it's a sign that your Pantheon Dev environment is not in SFTP mode.</div>

## Install Modules and Themes with Drupal's Update Manager

Drupal also allows you to install modules or themes [using its administrative interface](https://drupal.org/documentation/install/modules-themes/modules-7#using-drupal-interface). When in SFTP mode this will work seamlessly on Pantheon.

Get the URL to the code you want installed from Drupal.org:
 ![Drupal.org views module](/source/docs/assets/images/desk_images/278879.png)<br />
Paste the URL into Drupal's update manager. You can also upload a tarball or zip file from your desktop:
 ![Installing via update manager](/source/docs/assets/images/desk_images/278880.png)<br />
You still need to turn these changes into commits in your Pantheon Site Dashboard. Committing code will keep it saved, and allow you to deploy it out to the Test and Live environments.

<div class="alert alert-danger" role="alert">
<h4>Note</h4>
You should never have to enter SFTP credentials to Drupal's admin area itself. If you're prompted for a login and password, it's a sign that your Pantheon Dev environment is not in SFTP mode.</div>

## Install Code with Terminus: the Pantheon CLI

Perhaps the most powerful way to leverage the capabilities of on-server development with Pantheon is through the use of [Terminus, our command-line interface](/docs/articles/local/cli/). This section is for developers who are CLI savvy.

Assuming you've already set up and authenticated with [Terminus](/docs/articles/local/cli/), and your Pantheon Dev environment is in SFTP mode, you can use `drush` or `wp-cli` to install code very quickly.

```nohighlight
joshk@steppinrazor ~$ terminus sites show
+-----------------------+-----------+---------------+---------------------------+
| Site | Framework | Service Level | UUID |
+-----------------------+-----------+---------------+---------------------------+
| bensons-big-demo | wordpress | free | f8277b1a-ed45-4390-a257-8dda0b50ff21 |
| community-plumbing-20 | drupal | free | 17cff28f-e6ec-4a9e-97ce-cee418070490 |
+-----------------------+-----------+---------------+---------------------------+
```
### Drush Example

```nohighlight
joshk@steppinrazor ~$ terminus --site=community-plumbing-20 --env=dev drush dl pathauto devel admin_menu zen search_api search_api_solr
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
```
That just downloaded five modules and a theme in under a minute. Pretty cool.

### WP-CLI Example

WordPress has a similar capability:

```nohighlight
joshk@steppinrazor ~$ terminus --site=bensons-big-demo --env=dev wp plugin install akismet wordpress-seo jetpack google-sitemap-generator
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
```


## Troubleshooting

### I can't write to my codebase on Test or Live.

This is by design. Please read [this section](/docs/articles/sites/code/using-the-pantheon-workflow#understanding-write-permissions-in-test-and-live) of our Pantheon Workflow article to understand why.
