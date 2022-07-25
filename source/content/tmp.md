---
title: Temporary File Management
description: Understand Pantheon's default temporary path and learn how to debug .tmp file errors.
categories: [platform]
tags: [cli, code, files]
---

<Alert title="Exports" type="export">

This doc uses [Terminus](/terminus) commands. Before we begin, set the variables `$site` and `$env` in your terminal session to match your site name and the correct environment:

```bash
export env=dev
```

</Alert>

## Default Temporary Path

Pantheon configures an appropriate temporary path for [WordPress](https://github.com/pantheon-systems/WordPress/blob/default/wp-config-pantheon.php#L67). Drupal 7 sites can achieve the same configuration by adding the following to `settings.php`:

```php
/**
 * Drupal 7
 * Define appropriate location for tmp directory
 */
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  if (isset($_SERVER['PRESSFLOW_SETTINGS'])) { 
    // It's necessary to unset the injected PRESSFLOW_SETTINGS to override the values.
    $pressflow_settings = json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE); 
    unset($pressflow_settings['conf']['file_temporary_path']); 
    unset($pressflow_settings['conf']['file_directory_temp']); 
    $_SERVER['PRESSFLOW_SETTINGS'] = json_encode($pressflow_settings); 
  } 
  $conf['file_temporary_path'] = $_SERVER['HOME'] .'/tmp';
  $conf['file_directory_temp'] = $_SERVER['HOME'] .'/tmp';
}
```

**Note:** Changing the temporary settings path for Drupal 7 is not recommended. While the changes above would allow temporary files to be shared across application containers, it comes with a heavy performance penalty. 

## Fix Unsupported Temporary Path

Errors caused by an unsupported temporary path typically surface as permission errors for `.tmp` files and can be replicated on any environment.

<TabList>

<Tab title="WordPress" id="wptmppath" active={true}>

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

Verify the setting by using [Terminus](/terminus) to run `wp config get`:

```bash{promptUser: user}
terminus wp $site.$env -- config get SOME_TMP_SETTING
```

Output of this command should look something like the following Contact Form 7 example:

![config get wpcf7 uploads tmp dir default](../images/wp-config-get-tmp-default.png)

</Tab>

<Tab title="Drupal 7" id="d7tmppath">

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

Verify the setting by using [Terminus](/terminus) to run `drush variable-get`:

```bash
terminus drush $site.$env -- variable-get some_tmp_setting
```

Output of this command should look something like the following Plupload example:

![cget plupload settings temporary_uri filesystem](../images/d7-vget-tmp-default.png)

</Tab>

<Tab title="Drupal 9" id="d9tmppath">

Correct an unsupported temporary path set by a module or theme using `$settings` override in `settings.php`. Replace `file_temp_path` with the conflicting module or theme setting:

```php
/**
* Drupal 9
* Fix unsupported temporary path
* Replace file_temp_path
*/
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  $settings['file_temp_path'] = $_SERVER['HOME'] . '/tmp';
}
```
</Tab>

</TabList>

## Multiple Application Containers

Errors caused by this scenario occur on production environments (Test or Live) and typically reference some `.tmp` file as not found and could not be copied. These errors cannot be replicated on development environments (Dev or Multidev) since those environments use a single application container.

Sites on the Performance Medium plan and above have multiple [application containers](/application-containers). To help sites perform at scale, the platform routes requests across available application containers based on their load.

The default temporary path (`$_SERVER['HOME'] . '/tmp'`) is not synchronized across application containers, so operations that expect this path to persist will fail.

### Considerations

It's not common for a plugin, module, or theme to use the temporary path in a way that results in such errors. We suggest reporting the issue to the author and replacing the conflicting plugin, module, or theme whenever possible until a fix is released.

Be aware that temporary files are not cleaned up automatically in the following configuration, which can result in [highly populated directories](/platform-considerations/#highly-populated-directories).

### Persistent Temporary Path Workaround

<Alert title="Warning" type="danger">

In general, there's no need for temporary files to persist across application containers. Using a different plugin or module is preferred to taking the performance hit caused by the workaround below.

</Alert>

<TabList>

<Tab title="WordPress" id="wpworkaround" active={true}>

Configure a temporary path that uses a private subdirectory of Pantheon's networked filesystem in `wp-config.php`. Replace `SOME_TMP_SETTING` with the conflicting plugin or theme option:

```php:title=site-config.php
/**
* WordPress
* Persistent tmp across app containers
* Replace SOME_TMP_SETTING
*/
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  define('SOME_TMP_SETTING', '/wp-content/uploads/private/tmp');
}
```

The `private` and `tmp` directories do not exist by default; you must create the folders via SFTP if you have not done so already. We do not recommend using a public path since core treats the temporary path as non-web-accessible by default.

Verify the setting by using [Terminus](/terminus) to run `wp config get`:

```bash
terminus wp $site.$env -- config get SOME_TMP_SETTING
```

Output of this command should look something like the following Contact Form 7 example:

![config get wpcf7 uploads tmp dir filesystem](../images/wp-config-get-tmp-filesystem.png)

</Tab>

<Tab title="Drupal 7" id="d7workaround">

Configure a temporary path that uses a private subdirectory of Pantheon's networked filesystem using `$conf` override in `settings.php`. Replace `some_tmp_setting` with the conflicting module or theme setting:

```php:title=settings.php
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

Verify the setting by using [Terminus](/terminus) to run `drush variable-get`:

```bash{promptUser: user}
terminus drush $site.$env -- variable-get some_tmp_setting
```

Output of this command should look something like the following Plupload example:

![cget plupload settings temporary_uri filesystem](../images/d7-vget-tmp-filesystem.png)

</Tab>

<Tab title="Drupal 9" id="d9workaround">

Configure a temporary path that uses a private subdirectory of Pantheon's networked filesystem using `$settings` override in `settings.php`. Replace `file_temp_path` with the conflicting module or theme setting:

```php:title=settings.php
/**
* Drupal 9
* Fix unsupported temporary path
* Replace file_temp_path
*/
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  $settings['file_temp_path'] = 'sites/default/files/private/tmp';
}
```

The `private` and `tmp` directories do not exist by default; you must create the folders via SFTP if you have not done so already. We do not recommend using a public path since core treats the temporary path as non-web-accessible by default.
</Tab>

</TabList>
