---
title: WordPress Plugins and Themes with Known Issues
subtitle: W Plugins
description: A list of WordPress plugins beginning with W that are not supported and/or require workarounds.
cms: "WordPress"
tags: [plugins, themes, code]
contributors: [aleksandrkorolyov, jocastaneda, carl-alberto]
categories: [help]
newcms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-03-24"
contenttype: [guide]
layout: guide
showtoc: true
permalink: docs/guides/wp-plugins-themes-known-issues/directory/w-plugins
anchorid: w-plugins
---

## WebP Express

<ReviewDate date="2022-04-07" />

**Issue 1:** [WebP Express](https://wordpress.org/plugins/webp-express/) assumes write access to paths in the codebase that are write-only in non-development environments. The plugin uses `is_dir` to check for the path and a symlink to `files/` does not resolve the issue.

**Solution:** Create a symlink for `wp-content/webp-express` in the wp-content directory and then run the following line of code:

```
 ln -s ./uploads/webp-express ./webp-express
```

Refer to the documentation on [Using Extensions That Assume Write Access](/symlinks-assumed-write-access) for more information.

**Issue 2:** Broken WebP images are served from the wrong directory.

**Solution 1:** Set the WebP Express settings for `Destination Structure` to `Image Roots` in `/wp-admin/options-general.php?page=webp_express_settings_page` and then clear the cache.

**Solution 2:** Use the [Advanced Global CDN Image Optimization](/guides/professional-services/advanced-global-cdn#additional-features-from-wafio) feature. This add-on has WebP auto-conversion at the edge, and is more performant than a plugin relying on PHP or WordPress.

___

## Weather Station

**Issue:** The [Weather Station](https://wordpress.org/plugins/live-weather-station/) plugin uses [`php-intl`]( https://secure.php.net/manual/en/intro.intl.php), which is not currently supported by Pantheon.

___

## WooCommerce

<ReviewDate date="2018-01-10" />

**Issue:** For the [WooCommerce](https://wordpress.org/plugins/woocommerce/) plugin, the "batch upload" process can fail during large uploads. The platform has a 120 second timeout limit for scripts, and large upload processes can hit this limit.

**Solution 1:** The suggested workaround is to clone the site locally, import the items, then sync the database back up to the platform.

**Solution 2:** If you don't have a local copy, SFTP into any environment's `wp-content/uploads` folder and upload the CSV file that you wish to import. Under the advanced settings of the WooCommerce import, specify the exact path where you uploaded the CSV file and import from there:

![Enter the path to the CSV on the Import products from a CSV file page](../images/woocommerce/woocommerce-path-csv.png)

There is a feature request on [WooCommerce's GitHub page](https://github.com/woocommerce/woocommerce/issues/21624) for a WP-CLI import command which would be less prone to timeouts. To express your interest to the developers, click the thumbs up on the feature request.

___

**Issue 2:** A change introduced in WooCommerce 3.6.0 breaks template loading in environments with [multiple application containers](/application-containers#multiple-application-containers).

**Solution:** The issue and a few workarounds possible are described in this [WooCommerce Issue](https://github.com/woocommerce/woocommerce/issues/23751) We hope this issue will result in future code changes to WooCommerce so mitigations are not needed.

___

## WooZone

**Issue 1:** The [WooZone](https://codecanyon.net/item/woocommerce-amazon-affiliates-wordpress-plugin/3057503) plugin checks `WP_MEMORY_LIMIT`, which defaults to 40MB, instead of `ini_get('memory_limit')`, creating this notice:

![WooZone WP_MEMORY_LIMIT Error](../images/woocommerce/woozone-error.png)

**Solution:** Add the following line to `wp-config.php`:

```php:title=wp-config.php
  define('WP_MEMORY_LIMIT', '256M');
```

___

## Wordfence

<ReviewDate date="2020-07-15" />

**Issue:** [Wordfence](https://wordpress.org/plugins/wordfence/) assumes write access to several files in the codebase to store configuation and log files.

**Solution:** Prepare your environment before installing Wordfence with the proper symlinks and configuration files:

<Alert title="Exports" type="export">

This process uses [Terminus](/terminus) commands. Before we begin, set the variables `$site` and `$env` in your terminal session to match your site name and the Dev (or [Multidev](/guides/multidev)) environment:

```bash{promptUser: user}
export SITE=yoursitename
export ENV=dev
```

</Alert>

1. Set your Dev (or [Multidev](/guides/multidev)) environment to [Git connection mode](/guides/quickstart/connection-modes):

  ```bash{promptUser: user}
  terminus connection:set $SITE.$ENV git
  ```

1. If you haven't already, clone your site's codebase locally. You can get the path to your codebase from the [Site Dashboard](/guides/git/git-config#clone-your-site-codebase):

  ```bash{promptUser: user}
  git clone ssh://codeserver.dev.xxx@codeserver.dev.xxx.drush.in:2222/~/repository.git my-site
  ```

1. Change to the `my-site` directory:

   ```bash{promptUser: user}
   cd /my-site
   ```

1. Create the following symlinks:

  <Alert title="Note"  type="info" >

  You must remove the `/wp-content/wflogs` directory, if it already exists, before you create the symlinks listed below.

  </Alert>

  ```bash{promptUser: user}

  ln -s ../../files/private/wflogs ./wp-content/wflogs
  ln -s ../files/private/wordfence-waf.php ./wordfence-waf.php
  ln -s ../files/private/.user.ini ./.user.ini
  ```

1. Open `pantheon.yml` and add a [protected web path](/guides/secure-development/private-paths) for `.user.ini`:

  ```yml:title=pantheon.yml
  protected_web_paths:
    - /.user.ini
  ```

1. [Set the `FS_METHOD` to `direct` in `wp-config.php`](#define-fs_method).

1. Commit and push the changes to the platform:

  ```bash{promptUser: user}
  git add .
  git commit -m "Prepare environment for Wordfence"
  git push origin master #Or Multidev branch name
  ```

1. Create the empty files `wordfence-waf.php` and `.user.ini` to push to the site. In this example, we're using [`touch`](https://man7.org/linux/man-pages/man1/touch.1.html) to create them in the `/tmp` directory:

  ```bash{promptUser: user}
  touch /tmp/wordfence-waf.php /tmp/.user.ini
  ```

1. Connect to your environment over SFTP, create the required directories, and push the new files. You don't need to switch the environment back to SFTP mode, since you're not changing anything in the [codebase](/pantheon-workflow#code). You can get the SFTP path from the Site Dashboard under **Connection Info**.
Complete this step in Dev, Test, and Live Environments.

  ```bash{promptUser: user}
  sftp -o Port=2222 env.UUID@appserver.env.UUID.drush.in
  ```

  ```bash{promptUser: sftp}{outputLines: 4-5,7-8}
  mkdir files/private
  mkdir files/private/wflogs
  put /tmp/wordfence-waf.php /files/private
  Uploading /tmp/wordfence-waf.php to /files/private/wordfence-waf.php
  /tmp/wordfence-waf.php                           100%    0     0.0KB/s   00:00
  put /tmp/.user.ini /files/private/
  Uploading /tmp/.user.ini to /files/private/.user.ini
  /tmp/.user.ini                                   100%    0     0.0KB/s   00:00
  exit
  ```

1. Set the environment connection mode to SFTP, then install and activate Wordfence. You can do both with Terminus:

  ```bash{outputLines: 2,4-25}
  terminus connection:set $SITE.$ENV sftp
  [notice] Enabled on-server development via SFTP for "env"
  terminus wp $SITE.$ENV -- plugin install --activate wordfence
  Installing Wordfence Security – Firewall & Malware Scan (7.4.9)
  Warning: Failed to create directory '/.wp-cli/cache/': mkdir(): Read-only file system.
  Downloading installation package from https://downloads.wordpress.org/plugin/wordfence.7.4.9.zip...
  Unpacking the package...
  Installing the plugin...
  Plugin installed successfully.
  Activating 'wordfence'...
  Warning: fopen(/code/wp-content/wflogs/rules.php): failed to open stream: No such file or directory in /code/wp-content/plugins/wordfence/vendor/wordfence/wf-waf/src/lib/waf.php on line 325
  Warning: flock() expects parameter 1 to be resource, bool given in /code/wp-content/plugins/wordfence/vendor/wordfence/wf-waf/src/lib/waf.php on line 326
  Warning: include(/code/wp-content/wflogs/rules.php): failed to open stream: No such file or directory in /code/wp-content/plugins/wordfence/vendor/wordfence/wf-waf/src/lib/waf.php on line 328
  Warning: include(): Failed opening '/code/wp-content/wflogs/rules.php' for inclusion (include_path='.:/usr/share/pear:/usr/share/php') in /code/wp-content/plugins/wordfence/vendor/wordfence/wf-waf/src/lib/waf.php on line 328
  Warning: flock() expects parameter 1 to be resource, bool given in /code/wp-content/plugins/wordfence/vendor/wordfence/wf-waf/src/lib/waf.php on line 329
  Warning: fclose() expects parameter 1 to be resource, bool given in /code/wp-content/plugins/wordfence/vendor/wordfence/wf-waf/src/lib/waf.php on line 330
  Plugin 'wordfence' activated.
  Success: Installed 1 of 1 plugins.
  [notice] Command: wordpress-docs-testbed.waf5 -- wp plugin install [Exit: 0]
  ```

  You can safely ignore the warning messages.

1. Navigate to the **Wordfence** plugin in the site's WordPress Admin and **Resume Installation** if prompted, or click **CLICK HERE TO CONFIGURE**. The plugin requires that you download `.user.ini` to continue. As this file is blank at this point, you can delete it after downloading.

**Issue:** Occassionally, when configuring the Web Application Firewall (WAF), it can result in an "Error connecting to the database" message, in which the Wordfence plugin generates a bad `wordfence-waf.php` file. This results in two problems:

* __DIR__ is not providing the proper path for Wordfence
* Wordfence cannot find your database credentials

**Solution:** To address the first problem you can modify Wordfence to use relative paths. Change the following code within `wordfence-waf.php` over SFTP
from:

```
if (file_exists(__DIR__.'/wp-content/plugins/wordfence/waf/bootstrap.php')) {
    define("WFWAF_LOG_PATH", __DIR__.'/wp-content/wflogs/');
    include_once __DIR__.'/wp-content/plugins/wordfence/waf/bootstrap.php';
}
```
to:

```
if (file_exists('../../code/wp-content/plugins/wordfence/waf/bootstrap.php')) {
 define("WFWAF_LOG_PATH", '../../code/wp-content/wflogs/');
 include_once '../../code/wp-content/plugins/wordfence/waf/bootstrap.php';
}
```

Next, add [Wordfence constants](https://www.wordfence.com/help/advanced/constants/) in between conditions in the `wordfence-waf.php` file. The file should resemble the following when complete:

```
// Before removing this file, please verify the PHP ini setting `auto_prepend_file` does not point to this.
// This file was the current value of auto_prepend_file during the Wordfence WAF installation

if (file_exists('/includes/prepend.php')) {
	include_once '/includes/prepend.php';
}

	define('WFWAF_DB_NAME', $_ENV['DB_NAME']);
	define('WFWAF_DB_USER', $_ENV['DB_USER']);
	define('WFWAF_DB_PASSWORD', $_ENV['DB_PASSWORD']);
	define('WFWAF_DB_HOST', $_ENV['DB_HOST'] . ':' . $_ENV['DB_PORT']);
	define('WFWAF_DB_CHARSET', 'utf8mb4');
	define('WFWAF_DB_COLLATE', '');
  // Note the table prefix should reflect your WordPress application's table prefix. Update accordingly.
	define('WFWAF_TABLE_PREFIX', 'wp_');

if (file_exists('../../code/wp-content/plugins/wordfence/waf/bootstrap.php')) {
	define("WFWAF_LOG_PATH", '../../code/wp-content/wflogs/');
	include_once '../../code/wp-content/plugins/wordfence/waf/bootstrap.php';
}
```

#### Further Considerations with Wordfence: Utilizing data storage over files

If you experience degraded performance with Wordfence active, using [Wordfence's data storage option](https://www.wordfence.com/help/firewall/mysqli-storage-engine/) might be appropriate. Modify `wordfence-waf.php` to include the MySQLi storage engine constant. Combined with the constants previously mentioned, the plugin will write to your database instead of your file system. If you do this, we recommend wrapping the constants in a condition that checks `wp-config.php` for a conflicting constant. The end result of your modified `wordfence-waf.php` should resemble the following:

```
<?php
// Before removing this file, please verify the PHP ini setting `auto_prepend_file` does not point to this.
// This file was the current value of auto_prepend_file during the Wordfence WAF installation (Sun, 21 Nov 2021 23:40:56 +0000)

if (file_exists('/includes/prepend.php')) {
	include_once '/includes/prepend.php';
}

if(! defined('WFWAF_STORAGE_ENGINE')) {
	// define WF constants if not set in wp-config.php
	define('WFWAF_STORAGE_ENGINE', 'mysqli');
	define('WFWAF_DB_NAME', $_ENV['DB_NAME']);
	define('WFWAF_DB_USER', $_ENV['DB_USER']);
	define('WFWAF_DB_PASSWORD', $_ENV['DB_PASSWORD']);
	define('WFWAF_DB_HOST', $_ENV['DB_HOST'] . ':' . $_ENV['DB_PORT']);
	define('WFWAF_DB_CHARSET', 'utf8mb4');
	define('WFWAF_DB_COLLATE', '');
  // Note this table prefix should reflect your WordPress application's table prefix. Update accordingly.
	define('WFWAF_TABLE_PREFIX', 'wp_');
}

if (file_exists('../../code/wp-content/plugins/wordfence/waf/bootstrap.php')) {
	define("WFWAF_LOG_PATH", '../../code/wp-content/wflogs/');;
	include_once '../../code/wp-content/plugins/wordfence/waf/bootstrap.php';
```

**Advantages:** Customers have reported improved file system performance, while not having to compromise on Wordfence's features.

**Disadvantages:** Due to the nature of the plugin, binary logs and insertion queries will increase. Performance gains in one area may be sacrificed in another.

#### How do I confirm I am using data storage with Wordfence?

You can confirm usage by navigating to the Wordfence menu within your WordPress dashboard. Select **Tools**, on the the Tools page click the **Diagnostic** tab. In the **Diagnostic** tab, below the **Wordfence Firewal** section, search for the "Active Storage Engine". This query will display either "File System" or "MySQLi". For this instance, choose "MySQLi". An additional table will be added called `wp_wfwafconfig` (assuming your table prefix is wp_) and queries will increase based on blocked traffic.

___

## WordPress Download Manager

**Issue 1:** The [WordPress Download Manager](https://www.wpdownloadmanager.com/) plugin `wpdm-cache` directory may grow excessively large with generated files.

**Solution:** We recommend that you research an alternative download manager plugin that fits your needs.

___

## WordPress Social Login

**Issue 1:** The [WordPress Social Login](https://wordpress.org/plugins/wordpress-social-login/) plugin attempts to access PHP native sessions [before WordPress has been bootstrapped](https://wordpress.org/support/topic/plugin-starts-before-wordpress/), which prevents the Pantheon PHP native sessions plugin from being called. This leads to a 500 error when authenticating with external services.

**Solution:** While *not recommended*, you can add the following lines to `wp-config.php` before the first call to `session_start`:

```php:title=wp-config.php
if (defined( "PANTHEON_BINDING" )) {
  include_once( "/srv/bindings/". PANTHEON_BINDING ."/code/wp-blog-header.php" );
}
```

You will need to make this change every time the plugin is updated.

**Issue 2:** This plugin creates a session on every page, which can prevent [page level caching](https://wordpress.org/support/topic/cannot-cache-pages-due-to-sessions-on-every-page-with-wsl-plugin/).

___

## WP Reset

<ReviewDate date="2021-11-04" />

**Issue 1:** Some features of the [WP Reset](https://wordpress.org/plugins/wp-reset/) plugin can not be used on the Pantheon platform. Features such a file reset and restore do not work because staging and production environments are immutable, and backups help with restore and data rollbacks.

**Solution:** Use an alternate plugin that resets the WordPress database to the default installation.

___

## WP Rocket

<ReviewDate date="2022-10-25" />

**Issue 1:** As with other caching plugins, [WP Rocket](https://wp-rocket.me/)'s HTML caching feature conflicts with [Pantheon's page caching](https://pantheon.io/docs/guides/frontend-performance/caching#page-caching). The caching feature can be disabled to allow other features, like file optimization, media, etc. to be used side-by-side.

**Solution 1:**

1. Set your development mode to SFTP.

1. Install the WP Rocket plugin to the Dev environment by uploading via SFTP or from the WP dashboard.

1. Install the helper plugin [WP Rocket | Disable Page Caching](https://docs.wp-rocket.me/article/61-disable-page-caching) to the Dev environment by uploading via SFTP or from the WP dashboard.

1. Activate both plugins from the dashboard.

  WP Rocket will automatically make two changes as long as your environment is in SFTP mode. 

1. Commit both changes to your site's codebase. If your environment is in GIT mode, you'll need to make these changes yourself.

    - The following definition will be added in `wp-config.php`. This enables advanced caching capabilities.

        ```php:title=wp-config.php
        define('WP_CACHE', true); // Added by WP Rocket
        ```

    - The `wp-content/advanced-cache.php` drop-in file will be created.



**Issue 2:** WP Rocket [assumes write access](/symlinks-assumed-write-access) to read-only file paths in Pantheon.

**Solution 2a:** If you are running version 3.5 and higher, you can set a [custom cache folder and config path](https://docs.wp-rocket.me/article/1118-specify-a-custom-cache-folder):

```php:title=wp-config.php
define( 'WP_ROCKET_CONFIG_PATH', $_SERVER['DOCUMENT_ROOT'] . '/wp-content/uploads/wp-rocket/config/' );
define( 'WP_ROCKET_CACHE_ROOT_PATH', $_SERVER['DOCUMENT_ROOT'] . '/wp-content/uploads/wp-rocket/cache/' );
define( 'WP_ROCKET_CACHE_ROOT_URL', WP_SITEURL . '/wp-content/uploads/wp-rocket/cache/' ); // Assumes you have WP_SITEURL defined earlier in the file.
```

**Solution 2b:** If you are runnning a version between 3.2 and 3.4, you can only set the cache path through constants.

1. [Create symlinks](#assumed-write-access) for the other paths.

1. Make sure to manually create the folders below in _ALL_ environments.

  ```none
  files/cache/wp-rocket
  files/cache/busting
  ```

  or

  ```none
  code/wp-content/uploads/cache/wp-rocket
  code/wp-content/uploads/cache/busting
  ```

**Solution 2c:** If you are running a version below 3.2, your only option is to upgrade the plugin to a newer version.

___

## WPBakery: Page Builder

<ReviewDate date="2018-09-14" />

**Issue:** The Custom CSS and Design Options pages of the [WPBakery: Page Builder](https://wpbakery.com/) plugin (`?page=vc-custom_css`, `?page=vc-color`) try to create new files when saved. Due to problems related to incorrect `FS_METHOD`, files are not created or saved in the expected folder, `wp-content/uploads/js_composer`.

**Solution:** [Define `FS_METHOD`](#define-fs_method).

___

## WPFront Notification Bar

<ReviewDate date="2020-10-20" />

**Issue:** [WPFront Notification Bar](https://wordpress.org/plugins/wpfront-notification-bar/) sends a `set-cookie` header in each response, which breaks caching on Pantheon's Global CDN. For example:

```bash{outputLines: 2-23}
curl -I https://www.example.com
HTTP/2 200
cache-control: public, max-age=600
content-type: text/html; charset=UTF-8
link: <https://www.example.com/wp-json/>; rel="https://api.w.org/"
link: <https://www.example.com/wp-json/wp/v2/pages/47>; rel="alternate"; type="application/json"
link: <https://www.example.com/>; rel=shortlink
server: nginx
//highlight-start
set-cookie: wpfront-notification-bar-landingpage=1
//highlight-end
strict-transport-security: max-age=300
x-pantheon-styx-hostname: styx-fe1-a-789d66bff9-tztp6
x-styx-req-id: 7f93c166-53fe-11ea-803e-b26d7703e33f
date: Tue, 20 Oct 2020 21:16:09 GMT
x-served-by: cache-mdw17356-MDW
x-cache: MISS
x-cache-hits: 0
x-timer: S1603228567.134579,VS0,VE2847
vary: Accept-Encoding, Cookie
age: 0
accept-ranges: bytes
via: 1.1 varnish
```

**Solution:** You can apply [this patch](https://gist.github.com/rachelwhitton/ef0bb148e3942145fae759032bbed77e) to disable landing page tracking and fix caching.

___

## WP All Import / Export

<ReviewDate date="2020-06-15" />

**Issue 1:** With [WP All Import / Export](http://www.wpallimport.com/),large batch processes can fail if they take longer than the platform will allow. See [Timeouts on Pantheon](/timeouts) for more information.

**Solution:** To avoid hitting a timeout, you can try:

- Clean up temporary files
- Lower the chunk size to fewer than 100 records:

  ![A screenshot showing the Chunk Size setting under Advanced Settings for WP Import All](../images/plugins-known-issues/wp-import-chunk-size.png)

- Cron Processing Time Limit should be set not more than 50 seconds to be safe with the 59 second platform PHP timeout.

- Set the plugin to only process 1 record at a time:

  ![A screenshot of the Iterative, Piece-by-Piece processing option under Advanced Settings for WP Import All](../images/plugins-known-issues/wp-import-iterative.png)

The optimal number of records to process at one time depends on how many post_metas and custom functions are associated with each post imported.

- Instead of importing one large file, it is best to set it up as recurring cron import as outlined in WP All Import's [documentation](https://www.wpallimport.com/documentation/recurring/cron/).

- If this will be a recurring import, increasing this number may help speed the completion of the task.

- For busy sites while doing recurring cron, you can add cron sleep of at least 10 seconds to free up some php workers on recurring cron imports.

**Issue 2:** Getting invalid file paths when importing / exporting on environments with multiple appservers like test and live.

**Solution:** Upload the import file directly to the plugin's designated writable path `wp-content/uploads/wpallimport/files/`. When creating a new import using `existing file`, the file uploaded should appear there as an option.

**Issue 3:** Upload count does not match the import file.

**Solution:** Under WP All Import Settings:

- Check the Enable Stream Reader
- Cron Processing Time Limit should be set not more than 50 seconds
- Clean up temporary files
- Lower the chunk size to less than 100

___

## WP-Ban

<ReviewDate date="2021-02-23" />

**Issue:**  [WP-Ban](https://wordpress.org/plugins/wp-ban/) returns a [200-level](/guides/legacy-dashboard/metrics#available-metrics) response code to banned IPs. These responses are cached and count towards Site Visits. In addition, the Pantheon [Global CDN](/guides/global-cdn) may cache the result as successful, leading future visitors to think they've also been banned.

**Solution:** See the doc on how to [Investigate and Remedy Traffic Events](/guides/account-mgmt/traffic/remedy) for alternative methods.

___

## WP Migrate DB

<ReviewDate date="2018-10-17" />

**Issue:** When using the [WP Migrate DB](https://wordpress.org/plugins/wp-migrate-db/) plugin on Test and Live environments, the **Compatibility** settings cannot be configured because this feature requires write access to `wp-content/mu-plugins`. This issue prevents plugins from being included in DB exports and search-and-replace tasks.

**Solution:** The normal search-and-replace and DB export functions of this plugin work, but will leave all plugins disabled while in operation. If a specific plugin is required to remain active during the DB export and search-and-replace operations, add a filter for it as described in the [plugin's debugging page](https://deliciousbrains.com/wp-migrate-db-pro/doc/compatibility-mode/).

___

## WPML - The WordPress Multilingual Plugin

<ReviewDate date="2019-10-22" />

**Issue 1:** Locking an environment prevents the [WPML - The WordPress Multilingual Plugin](https://wpml.org/) plugin from operating and returns the following error:  `It looks like languages per directories will not function`.

**Solution:** Make the environment public within the Site Dashboard. For details, see [Security on the Pantheon Dashboard](/guides/secure-development/security-tool).

___

**Issue 2:** When registering the plugin, accessing `/wp-admin/plugin-install.php?tab=commercial` returns "Sorry, you are not allowed to access this page".

**Solution:** Activate the plugin individually for each environment you want to use the plugin with, as it requires a separate key for each domain. Instead of clicking on **Purchase a subscription or enter an existing site key**, use the **Configure WMPL** button:

![The Configure WMPL Button](../images/wpml-configure.png)

You can also add the registration keys to `wp-config.php`:

```php:title=wp-config.php
define( 'OTGS_INSTALLER_SITE_KEY_WPML', 'your-site-key' );
```

Learn more in the [WPML Guide](https://wpml.org/faq/install-wpml/#registration-using-php).

___

**Issue 3:** Upon activating WPML String Translation plugin, you may see this error:

>WPML String Translation is attempting to write .mo files with translations to folder:
>
>/srv/bindings/*******/code/wp-content/languages
>
>This folder appears to be not writable. This is blocking translation for strings from appearing on the site.
>To resolve this, please contact your hosting company and request that they make that folder writable.
>For more details, see WPML's documentation on troubleshooting .mo files generation.

**Solution 1:**

1. In `wp-config.php`, add the following above the line `/* That's all, stop editing! Happy Pressing. */`:

  ```php:title=wp-config.php
  define('WP_LANG_DIR', $_SERVER['HOME'] .'/files/languages');
  ```

1. Create the `languages` directory inside `/files` for each environment.

1. Define the [FS_METHOD in the wp-config](#define-fs_method).

**Solution 2:**

1. Create a symlink for `wp-content/languages` pointing to `wp-content/uploads/languages`. See [Using Extensions That Assume Write Access](/symlinks-assumed-write-access) for more information.

1. Define the [FS_METHOD in the wp-config](#define-fs_method).
___