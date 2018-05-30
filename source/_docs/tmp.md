---
title: Temporary File Management
description: Learn about the default path for temporary files and debug .tmp file errors.
tags: [debugcode, infrastructure]
categories: []
---
## Default Temporary Path  
Pantheon configures an appropriate temporary path for [WordPress](https://github.com/pantheon-systems/WordPress/blob/master/wp-config.php#L83-L86){.external} and [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/settings.pantheon.php#L146-L154){.external}. Drupal 7 sites can achieve the same configuration by adding the following to `settings.php`:

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
  Correct unsupported temporary path set by a plugin or theme in `wp-config.php`. Replace `SOME_TMP_SETTING` with the conflicting plugin or theme option:

  ```php
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    define('SOME_TMP_SETTING', $_SERVER['HOME'] . '/tmp');
  }
  ```
  Verify the setting using [Terminus](/docs/terminus/) to run `wp config get`:

  ```command
  terminus wp <site>.<env> -- config get SOME_TMP_SETTING
  ```
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="d7-anchor" markdown="1">
  Correct unsupported temporary path set by a module or theme using `$conf` override in `settings.php`. Replace `some_tmp_setting` with the conflicting module or theme setting:

  ```php
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    $conf['some_tmp_setting'] = $_SERVER['HOME'] . '/tmp';
  }
  ```
  Verify the setting using [Terminus](/docs/terminus/) to run `drush variable-get`:

  ```command
  terminus drush <site>.<env> -- variable-get some_tmp_setting
  ```
  </div>
  <!-- 3rd pane content -->
  <div role="tabpanel" class="tab-pane" id="d8-anchor" markdown="1">
  Correct unsupported temporary path set by a module or theme using `$config` override in `settings.php`. Replace `some_module` and `some_tmp_setting` with the conflicting module or theme setting:

  ```php
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    $config['some_module.settings']['some_tmp_setting']= $_SERVER['HOME'] . '/tmp';
  }
  ```

  Verify the setting using [Terminus](/docs/terminus/) to run `drush config-get` with `--include-overridden`:

  ```command
  terminus drush <site>.<env> -- config-get some_module.settings some_tmp_setting --include-overridden
  ```
  </div>
</div>


## Multiple Application Containers
Errors caused by this scenario occur on either the Test or Live environment and typically reference some `.tmp` file as not found and could not be copied. These errors cannot be replicated on development environments (Dev or Multidev) since those environments use a single application container.

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
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    define('SOME_TMP_SETTING', 'wp-content/uploads/private/tmp');
  }
  ```
  The `private` and `tmp` directories do not exist by default; you must be create the folders via SFTP if you have not done so already. We do not recommend using a public path since core treats the temporary path as non-web-accessible by default.

  Verify the setting using [Terminus](/docs/terminus/) to run `wp config get`:

  ```command
  terminus wp <site>.<env> -- config get SOME_TMP_SETTING
  ```
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="d7-2anchor" markdown="1">
  Configure a temporary path that uses a private subdirectory of Pantheon's networked filesystem using `$conf` override in `settings.php`. Replace `some_tmp_setting` with the conflicting module or theme setting:

  ```php
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    $conf['some_tmp_setting'] = 'sites/default/files/private/tmp';
  }
  ```
  The `private` and `tmp` directories do not exist by default; you must be create the folders via SFTP if you have not done so already. We do not recommend using a public path since core treats the temporary path as non-web-accessible by default.

  Verify the setting using [Terminus](/docs/terminus/) to run `drush variable-get`:

  ```command
  terminus drush <site>.<env> -- variable-get some_tmp_setting
  ```
  </div>
  <!-- 3rd pane content -->
  <div role="tabpanel" class="tab-pane" id="d8-2anchor" markdown="1">
  Configure a temporary path that uses a private subdirectory of Pantheon's networked filesystem using `$config` override in `settings.php`. Replace `some_module` and `some_tmp_setting` with the conflicting module or theme setting:

  ```php
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    $config['some_module.settings']['some_tmp_setting']= 'sites/default/files/private/tmp';
  }
  ```
  The `private` and `tmp` directories do not exist by default; you must be create the folders via SFTP if you have not done so already. We do not recommend using a public path since core treats the temporary path as non-web-accessible by default.

  Verify the setting using [Terminus](/docs/terminus/) to run `drush config-get` with `--include-overridden`:

  ```command
  terminus drush <site>.<env> -- config-get some_module.settings some_tmp_setting --include-overridden
  ```
  </div>
</div>
