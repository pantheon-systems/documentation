---
title: Working in the WordPress Dashboard and Drupal Admin Interface
description: Learn how to build sites using the WordPress and Drupal admin interfaces in SFTP mode on Pantheon.
tags: [admin]
categories: []
---

Pantheon supports two development workflows; editing and committing code from the command line using git commits, and using the WordPress or Drupal admin interface to configure your site, and/or uploading file changes using an [SFTP client](/docs/sftp). This document covers the latter.

<table class="table  table-bordered table-responsive">
  <thead>
    <tr>
      <th>Task</th>
      <th>Connection Mode</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Work in the admin interface</td>
      <td>SFTP</td>
      <td>Activate a new theme</td>
    </tr>
    <tr>
      <td>Push commits made locally from the commandline with git</td>
      <td>Git</td>
      <td markdown="1">`git push origin master`</td>
    </tr>
  </tbody>
</table>


## Ensure SFTP Mode

On the Pantheon Site Dashboard, under the <span style="line-height:.9" class="glyphicons glyphicons-wrench"></span> **Dev** tab, is the **Connection Mode** box. The two options are **SFTP** and **Git**. When working with your Drupal or WordPress admin interface, make sure your mode is set to **SFTP**:

![SFTP Mode](/source/docs/assets/images/dashboard/connection-mode-sftp.png)

### SFTP Mode: Advantages & Considerations

When using Pantheon's SFTP mode to develop directly on your Dev environment, you have several options in addition to using a SFTP client to manage your code. In this mode, the website has access to write to its codebase, meaning built-in admin tools are open to function, as are some novel command-line capabilities. You can:

- Use the `wp-admin` web interface to manage your WordPress code.
- Install and update modules and themes with Drupal's update manager.
- Take advantage of command line tools like [WP-CLI](/docs/wp-cli/) or [Drush](/docs/drush/) through [Terminus](/docs/terminus/) for managing code.

While in SFTP Mode, changes made to the codebase are "staged", as visible on in the <span style="line-height:.9" class="glyphicons glyphicons-wrench"></span> **Dev** tab:

![Pending changes in SFTP mode](/source/docs/assets/images/dashboard/dev-code-pendingchanges-commit.png)

Before switching back to Git mode, you must commit these changes.

##  Manage WordPress Plugins and Themes

WordPress' admin interface has built in tools to manage plugins and themes, allowing you to search and install popular code from the main WordPress.org repository on your site. When your Pantheon Dev environment is in SFTP mode, you can use these capabilities to manage the code in your Dev environment. It works for plugins and themes.

1. From the <span style="line-height:.9" class="glyphicons glyphicons-wrench"></span> **Dev** tab of your Pantheon Site Dashboard, click **Visit Development Site**, then navigate to the `wp-admin`  page:

2. WordPress will let you know when there are plugin updates available:

    ![WordPress Plugin Updates Alert](/source/docs/assets/images/wp-updates-ready.png)

3. From the **Plugins** menu, click **Add New** to search and install plugins directly:

    ![Install a new WordPress plugin](/source/docs/assets/images/wp-new-plugin.png)

4. Themes can be installed directly through the admin panel as well:

    ![Install a new WordPress theme](/source/docs/assets/images/wp-new-theme.png)


You still need to turn these changes into commits in your Pantheon Site Dashboard. Committing code will keep it saved and allow you to deploy it out to the Test and Live environments.

### FTP Credentials Pop-up

If, while working with plugins or themes, you're prompted for FTP or SFTP credentials, you're most likely in Git mode. You should *never* have to enter credentials into the WordPress admin:

![WordPress Credential Prompt](/source/docs/assets/images/wp-ftp-prompt.png)

## Install Drupal Modules and Themes

Drupal also allows you to install modules or themes [using its administrative interface](https://drupal.org/documentation/install/modules-themes/modules-7#using-drupal-interface). When in SFTP mode this will work seamlessly on Pantheon.


<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
<!-- Active tab -->
<li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">Drupal 8</a></li>
    <!-- 2nd Tab Nav -->
    <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
<!-- Active pane content -->
<div role="tabpanel" class="tab-pane active" id="tab-1-anchor">
<p markdown="1">
1. Get the URL to the code you want to install from Drupal.org:

    ![Drupal.org views module](/source/docs/assets/images/drupal-copy-module-link.png)


<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">
Make sure the module has a version marked `8.x-*` before installing it on a Drupal 8 site.
</p></div>

</p><p markdown="1">

2. From the <span style="line-height:.9" class="glyphicons glyphicons-wrench"></span> **Dev** tab of your Pantheon Site Dashboard, click **Visit Development Site**. Sign in with your admin credentials.

</p><p markdown="1">

3. Under the **Manage** menu, click on **Extend**, then **+ Install new module**. Paste the URL from Step 1. You can also upload a tarball or zip file from your desktop:

    ![Installing a module on Drupal 8](/source/docs/assets/images/drupal-8-install-module.png)

</p>
</div>
<!-- 2nd pane content -->
<div role="tabpanel" class="tab-pane" id="tab-2-anchor">
<p markdown="1">
1. Get the URL to the code you want to install from Drupal.org:

    ![Drupal.org views module](/source/docs/assets/images/views-module.png)

</p><p markdown="1">

2. From the <span style="line-height:.9" class="glyphicons glyphicons-wrench"></span> **Dev** tab of your Pantheon Site Dashboard, click **Visit Development Site**, then navigate to the administration page.

</p><p markdown="1">

3. Paste the URL into Drupal's update manager. You can also upload a tarball or zip file from your desktop:

    ![Installing via update manager](/source/docs/assets/images/install-via-update-manager.png)

</p>
</div>
</div>


You still need to turn these changes into commits in your Pantheon Site Dashboard. Committing code will keep it saved, and allow you to deploy it out to the Test and Live environments.

### FTP Credentials Pop-up

If, while updating modules or themes, you're prompted to enter FTP credentials, refer back to the Pantheon Site Dashboard to ensure SFTP mode. You should never have to enter FTP or SFTP credentials to Drupal's admin area:

![Drupal Credential Prompt](/source/docs/assets/images/drupal-ftp-prompt.png)


## Install Code with Terminus: the Pantheon CLI

Perhaps the most powerful way to leverage the capabilities of on-server development with Pantheon is through the use of [Terminus, our command-line interface](/docs/terminus/). This section is for developers who are CLI savvy.

Assuming you've already set up and authenticated with [Terminus](/docs/terminus/), and your Pantheon Dev environment is in SFTP mode, you can use `drush` or `wp-cli` to install code very quickly.

```nohighlight
joshk@steppinrazor ~$ terminus site:list
+-----------------------+-----------+---------------+---------------------------+
| Site | Framework | Service Level | UUID |
+-----------------------+-----------+---------------+---------------------------+
| bensons-big-demo | wordpress | free | f8277b1a-ed45-4390-a257-8dda0b50ff21 |
| community-plumbing-20 | drupal | free | 17cff28f-e6ec-4a9e-97ce-cee418070490 |
+-----------------------+-----------+---------------+---------------------------+
```
### Drush Example

```nohighlight
joshk@steppinrazor ~$ terminus drush <site>.<env> -- dl pathauto devel admin_menu zen search_api search_api_solr
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
joshk@steppinrazor ~$ terminus wp <site>.<env> -- plugin install akismet wordpress-seo jetpack google-sitemap-generator
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

This is by design. Please read [this section](/docs/pantheon-workflow#understanding-write-permissions-in-test-and-live) of our Pantheon Workflow article to understand why.

### Unable to Install Plugins on Migrated Sites

On some WordPress sites migrated from other hosting platforms, when installing or updating plugins you may see an error like this:

![Failed Plugin Installation](/source/docs/assets/images/wp-plugin-failed.png)

This is usually caused by the following lines in `wp-config.php`, added by your former host:

```
define('FS_METHOD', 'direct');
define('FS_CHMOD_DIR', 755);
define('FS_CHMOD_FILE', 644);
```

Remove these lines to resolve.
