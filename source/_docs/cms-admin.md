---
title: Working in the WordPress Dashboard and Drupal Admin Interface
description: Learn how to build sites using the WordPress and Drupal admin interfaces in SFTP mode on Pantheon.
tags: [admin]
searchboost: 150
categories: []
---
Pantheon's Site Dashboard provides two connection modes to support various development workflows, such as pushing commits from your local with [Git](/docs/git/) or working in the WordPress or Drupal admin interface in [SFTP](/docs/sftp/) mode. Admin tools and command-line interfaces require write access to the codebase, which is only provided to development environments (Dev or [Multidev](/docs/multidev/)) in **SFTP** mode.

<div class="alert alert-export" role="alert">
<h4 class="info">Exports</h4>
<p markdown="1">This doc offers [Terminus](/docs/terminus/) commands, using the variables `$site` and `$env`. Export these variables in your terminal session to match your site name and the correct environment:
<pre>
<code class="bash">export site=yoursitename
export env=dev
</code></pre>
</p>
</div>

## SFTP Mode
1. Navigate to the **<span class="glyphicons glyphicons-wrench"></span> Dev** or **<span class="glyphicons glyphicons-cloud"></span> Multidev** tab of your Pantheon Site Dashboard.
2. Next to Connection Mode, click **SFTP**:

  ![SFTP Mode](/source/docs/assets/images/dashboard/connection-mode-sftp.png)


Operations that require write access to the codebase must be executed while the site is in SFTP mode, such as:

 - Activating a new theme in the site admin,
 - Uploading a new module or plugin using an SFTP client,
 - Remote Drush commands, like `terminus remote:drush $site.$env -- pm-enable hsts --yes` <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="Run Drush commands with <a href='/docs/terminus/'>Terminus</a>. For details, see <a href='/docs/drush/'>Drupal Drush Command-Line Utility</a>."><em class="fa fa-info-circle"></em></a>
 - Remote WP-CLI commands, like `terminus remote:wp $site.$env -- plugin install lh-hsts --activate` <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="Run WP-CLI commands with <a href='/docs/terminus/'>Terminus</a>. For details, see <a href='/docs/wp-cli/'>Using WP-CLI On The Pantheon Platform</a>."><em class="fa fa-info-circle"></em></a>

## WordPress Dashboard
WordPress' admin interface has built in tools to manage plugins and themes, allowing you to install and manage popular themes and plugins from the main WordPress.org repository.

<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p markdown="1">Do not update core using the WordPress Dashboard or WP-CLI. Apply one-click updates within the Site Dashboard on Pantheon or via [Terminus](/docs/terminus/). For additional details, see [Scope of Support](/docs/support/#scope-of-support) and [WordPress and Drupal Core Updates](/docs/core-updates).</p>
</div>

### Manage Plugins and Themes
1. From the **<span class="glyphicons glyphicons-wrench"></span> Dev** or **<span class="glyphicons glyphicons-cloud"></span> Multidev** tab of your Pantheon Site Dashboard, click **<span class="glyphicons glyphicons-new-window-alt"></span> Site Admin**, then login if you have not done so already.

2. WordPress will let you know when there are plugin updates available:

    ![WordPress Plugin Updates Alert](/source/docs/assets/images/wp-updates-ready.png)

3. From the **Plugins** menu, click **Add New** to search and install plugins directly:

    ![Install a new WordPress plugin](/source/docs/assets/images/wp-new-plugin.png)

4. Themes can be installed directly through the admin panel as well:

    ![Install a new WordPress theme](/source/docs/assets/images/wp-new-theme.png)


You still need to turn these changes into commits in your Pantheon Site Dashboard. Committing code will submit your changes to version control so you can deploy up to Test and Live.

### Connection Information Prompt
Prompts asking for connection information will occur in the WordPress Dashboard when the site is set to the wrong connection mode:

![WordPress Credential Prompt](/source/docs/assets/images/wp-ftp-prompt.png)

You should *never* have to enter credentials into the WordPress Dashboard. Visit the Site Dashboard and set the environment's connection mode to **SFTP**, then try again.

## Drupal Admin Interface
Drupal also allows you to install modules or themes [using its administrative interface](https://drupal.org/documentation/install/modules-themes/modules-7#using-drupal-interface).

<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p markdown="1">Do not update core using the Drupal Admin interface or Drush. Apply one-click updates within the Site Dashboard on Pantheon or via [Terminus](/docs/terminus/). For additional details, see [Scope of Support](/docs/support/#scope-of-support) and [WordPress and Drupal Core Updates](/docs/core-updates).</p>
</div>

### Install a New Module
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


You still need to turn these changes into commits in your Pantheon Site Dashboard. Committing code will submit your changes to version control so you can deploy up to Test and Live.

### Connection Information Prompt
Prompts asking for connection information will occur in the Drupal Admin interface when the site is set to the wrong connection mode:

![Drupal Credential Prompt](/source/docs/assets/images/drupal-ftp-prompt.png)

You should *never* have to enter credentials into the Drupal Admin interface. Visit the Site Dashboard and set the environment's connection mode to **SFTP**, then try again.


## Command Line Tools
Perhaps the most powerful way to leverage the capabilities of on-server development is to use command line tools such as WP-CLI and Drush, which can be executed on Pantheon via [Terminus](/docs/terminus/).

### Install & Authenticate Terminus
In order to run WP-CLI or Drush commands on Pantheon's development environments, you'll need use our very own command line tool, Terminus:

1. Install [Terminus](/docs/terminus):

        curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install
2. [Generate a Machine Token](https://dashboard.pantheon.io/machine-token/create) from **User Dashboard** > **Account** > **Machine Tokens**, then authenticate Terminus:

        terminus auth:login --machine-token=‹machine-token›
### Download Contrib Modules with Drush
SFTP mode supports [Drush](https://github.com/drush-ops/drush/), the command-line interface for Drupal. For example, you can download multiple contrib modules and a theme to the Dev environment:

```nohighlight
$ terminus drush $site.$env -- dl pathauto devel admin_menu zen search_api search_api_solr
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
You still need to turn these changes into commits in your Pantheon Site Dashboard. Committing code will submit your changes to version control so you can deploy up to Test and Live:

```
terminus env:commit $site.$env --message="Download pathauto devel admin_menu zen search_api search_api_solr"
```

### Install WordPress Plugins with WP-CLI
SFTP mode supports [WP-CLI](https://make.wordpress.org/cli/handbook/), the official command line tool for interfacing with WordPress sites. For example, you can install multiple plugins on the Dev environment:
```nohighlight
$ terminus remote:wp bensons-big-demo.dev -- plugin install akismet wordpress-seo jetpack google-sitemap-generator
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
You still need to turn these changes into commits in your Pantheon Site Dashboard. Committing code will submit your changes to version control so you can deploy up to Test and Live:

```
terminus env:commit $site.$env --message="Install akismet wordpress-seo jetpack google-sitemap-generator"
```

## Commit SFTP Changes
While in SFTP Mode, changes made to the codebase are "staged", as visible on in the <span style="line-height:.9" class="glyphicons glyphicons-wrench"></span> **Dev** tab:

![Pending changes in SFTP mode](/source/docs/assets/images/dashboard/dev-code-pendingchanges-commit.png)

Changing your site's connection mode from SFTP to Git will discard all uncommitted file changes. If you want to keep work in progress, commit before toggling the connection mode.

## Troubleshooting

### I can't write to my codebase on Test or Live.

This is by design. Please read [this section](/docs/pantheon-workflow#understanding-write-permissions-in-test-and-live) of our Pantheon Workflow article to understand why.

### Unable to Install Plugins on Migrated Sites

On some WordPress sites migrated from other hosting platforms, when installing or updating plugins you may see an error like this:

![Failed Plugin Installation](/source/docs/assets/images/wp-plugin-failed.png)

This is usually caused by the following lines in `wp-config.php`, added by your former host:

```
define('FS_CHMOD_DIR', 755);
define('FS_CHMOD_FILE', 644);
```

Remove these lines to resolve.

A `wp-content/upgrade` folder with read-only access can also cause this error. You can remove this folder or change the file permission to `755` to make it writable. WordPress stores temporary files to the `wp-content/upgrade` folder when updating plugins or themes.
