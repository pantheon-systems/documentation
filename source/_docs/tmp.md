---
title: Temporary File Management
description: Understand Pantheon's default temporary path and learn how to debug .tmp file errors.
tags: [debugcode, infrastructure]
categories: []
---

<div class="alert alert-export" role="alert">
<h4 class="info">Exports</h4>
<p markdown="1">This doc uses [Terminus](/docs/terminus/) commands. Before we begin, set the variables `$site` and `$env` in your terminal session to match your site name and the correct environment:
<pre>
<code class="bash">export site=yoursitename
export env=dev
</code></pre>
</p>
</div>

## Default Temporary Path
Pantheon configures an appropriate temporary path for [WordPress](https://github.com/pantheon-systems/WordPress/blob/4.9.6/wp-config.php#L83-L86){.external} and [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/8.5.3/sites/default/settings.pantheon.php#L146-L154){.external}. Drupal 7 sites can achieve the same configuration by adding the following to `settings.php`:

```php
/**
 * Drupal 7
 * Define appropriate location for tmp directory
 */
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  $conf['file_temporary_path'] = $_SERVER['HOME'] .'/tmp';
}
```
## Fix Unsupported Temporary Path
Errors caused by an unsupported temporary path typically surface as permission errors for `.tmp` files and can be replicated on any environment.

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="wp-id" role="presentation" class="active"><a href="#wp-anchor" aria-controls="wp-anchor" role="tab" data-toggle="tab">WordPress</a></li>
  <!-- 2nd Tab Nav -->
  <li id="d7-id" role="presentation"><a href="#d7-anchor" aria-controls="d7-anchor" role="tab" data-toggle="tab">Drupal 7</a></li>
  <!-- 3rd Tab Nav -->
  <li id="d8-id" role="presentation"><a href="#d8-anchor" aria-controls="d8-anchor" role="tab" data-toggle="tab">Drupal 8</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="wp-anchor" markdown="1">
  Correct an unsupported temporary path set by a plugin or theme in `wp-config.php`. Replace `SOME_TMP_SETTING` with the conflicting plugin or theme option:

  ```php
  /**
  * WordPress
  * Fix unsupported temporary path
  * Replace SOME_TMP_SETTING
  */
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    define('SOME_TMP_SETTING', $_SERVER['HOME'] . '/tmp');
  }
  ```
  Verify the setting by using [Terminus](/docs/terminus/) to run `wp config get`:

  ```command
  terminus wp $site.$env -- config get SOME_TMP_SETTING
  ```

  Output of this command should look something like the following Contact Form 7 example:

  ![config get wpcf7 uploads tmp dir default](/source/docs/assets/images/wp-config-get-tmp-default.png)
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="d7-anchor" markdown="1">
  Correct an unsupported temporary path set by a module or theme using `$conf` override in `settings.php`. Replace `some_tmp_setting` with the conflicting module or theme setting:

  ```php
  /**
  * Drupal 7
  * Fix unsupported temporary path
  * Replace some_tmp_setting
  */
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    $conf['some_tmp_setting'] = $_SERVER['HOME'] . '/tmp';
  }
  ```
  Verify the setting by using [Terminus](/docs/terminus/) to run `drush variable-get`:

  ```command
  terminus drush $site.$env -- variable-get some_tmp_setting
  ```

  Output of this command should look something like the following Plupload example:

  ![cget plupload settings temporary_uri filesystem](/source/docs/assets/images/d7-vget-tmp-default.png)
  </div>
  <!-- 3rd pane content -->
  <div role="tabpanel" class="tab-pane" id="d8-anchor" markdown="1">
  Correct an unsupported temporary path set by a module or theme using `$config` override in `settings.php`. Replace `some_module` and `some_tmp_setting` with the conflicting module or theme setting:

  ```php
  /**
  * Drupal 8
  * Fix unsupported temporary path
  * Replace some_module and some_tmp_setting
  */
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    $config['some_module.settings']['some_tmp_setting']= $_SERVER['HOME'] . '/tmp';
  }
  ```

  Verify the setting by using [Terminus](/docs/terminus/) to run `drush config-get` with `--include-overridden`:

  ```command
  terminus drush $site.$env -- config-get some_module.settings some_tmp_setting --include-overridden
  ```

  Output of this command should look something like the following Plupload example:

  ![cget plupload settings temporary_uri filesystem](/source/docs/assets/images/d8-cget-tmp-default.png)
  </div>
</div>


## Multiple Application Containers
Errors caused by this scenario occur on production environments (Test or Live) and typically reference some `.tmp` file as not found and could not be copied. These errors cannot be replicated on development environments (Dev or Multidev) since those environments use a single application container.

Sites on the Performance Medium plan and above have multiple [application containers](/docs/application-containers). To help sites perform at scale, the platform routes requests across available application containers based on their load.

The default temporary path (`$_SERVER['HOME'] . '/tmp'`) is not synchronized across application containers, so operations that expect this path to persist will fail.

### Considerations
It's not common for a plugin, module, or theme to use the temporary path in a way that results in such errors. We suggest reporting the issue to the author and replacing the conflicting plugin, module, or theme whenever possible until a fix is released.

Be aware that temporary files are not cleaned up automatically in the following configuration, which can result in [highly populated directories](/docs/platform-considerations/#highly-populated-directories).

### Persistent Temporary Path Workaround
<div class="alert alert-danger" role="alert"><h4 class="info">Warning</h4>
<p markdown="1">
In general, there's no need for temporary files to persist across application containers. Using a different plugin or module is preferred to taking the performance hit caused by the workaround below.
</p></div>

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="wp-id" role="presentation" class="active"><a href="#wp-2anchor" aria-controls="wp-2anchor" role="tab" data-toggle="tab">WordPress</a></li>
  <!-- 2nd Tab Nav -->
  <li id="d7-2id" role="presentation"><a href="#d7-2anchor" aria-controls="d7-2anchor" role="tab" data-toggle="tab">Drupal 7</a></li>
  <!-- 3rd Tab Nav -->
  <li id="d8-2id" role="presentation"><a href="#d8-2anchor" aria-controls="d8-2anchor" role="tab" data-toggle="tab">Drupal 8</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="wp-2anchor" markdown="1">
  Configure a temporary path that uses a private subdirectory of Pantheon's networked filesystem in `wp-config.php`. Replace `SOME_TMP_SETTING` with the conflicting plugin or theme option:

  ```php
  /**
  * WordPress
  * Persistent tmp across app containers
  * Replace SOME_TMP_SETTING
  */
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    define('SOME_TMP_SETTING', 'wp-content/uploads/private/tmp');
  }
  ```
  The `private` and `tmp` directories do not exist by default; you must create the folders via SFTP if you have not done so already. We do not recommend using a public path since core treats the temporary path as non-web-accessible by default.

  Verify the setting by using [Terminus](/docs/terminus/) to run `wp config get`:

  ```command
  terminus wp $site.$env -- config get SOME_TMP_SETTING
  ```

  Output of this command should look something like the following Contact Form 7 example:

  ![config get wpcf7 uploads tmp dir filesystem](/source/docs/assets/images/wp-config-get-tmp-filesystem.png)
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="d7-2anchor" markdown="1">
  Configure a temporary path that uses a private subdirectory of Pantheon's networked filesystem using `$conf` override in `settings.php`. Replace `some_tmp_setting` with the conflicting module or theme setting:

  ```php
  /**
  * Drupal 7
  * Persistent tmp across app containers
  * Replace some_tmp_setting
  */
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    $conf['some_tmp_setting'] = 'sites/default/files/private/tmp';
  }
  ```
  The `private` and `tmp` directories do not exist by default; you must create the folders via SFTP if you have not done so already. We do not recommend using a public path since core treats the temporary path as non-web-accessible by default.

  Verify the setting by using [Terminus](/docs/terminus/) to run `drush variable-get`:

  ```command
  terminus drush $site.$env -- variable-get some_tmp_setting
  ```

  Output of this command should look something like the following Plupload example:

  ![cget plupload settings temporary_uri filesystem](/source/docs/assets/images/d7-vget-tmp-filesystem.png)
  </div>
  <!-- 3rd pane content -->
  <div role="tabpanel" class="tab-pane" id="d8-2anchor" markdown="1">
  Configure a temporary path that uses a private subdirectory of Pantheon's networked filesystem using `$config` override in `settings.php`. Replace `some_module` and `some_tmp_setting` with the conflicting module or theme setting:

  ```php
  /**
  * Drupal 8
  * Persistent tmp across app containers
  * Replace some_module and some_tmp_setting
  */
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    $config['some_module.settings']['some_tmp_setting']= 'sites/default/files/private/tmp';
  }
  ```
  The `private` and `tmp` directories do not exist by default; you must create the folders via SFTP if you have not done so already. We do not recommend using a public path since core treats the temporary path as non-web-accessible by default.

  Verify the setting by using [Terminus](/docs/terminus/) to run `drush config-get` with `--include-overridden`:

  ```command
  terminus drush $site.$env -- config-get some_module.settings some_tmp_setting --include-overridden
  ```

  Output of this command should look something like the following Plupload example:

  ![cget plupload settings temporary_uri filesystem](/source/docs/assets/images/d8-cget-tmp-filesystem.png)
  </div>
</div>
