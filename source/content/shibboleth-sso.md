---
title: Using SimpleSAMLphp with Shibboleth SSO
description: Using SimpleSAMLphp to configure a single sign-on system for your Drupal or WordPress site.
tags: [siteintegrations, security]
categories: [automate]
---
Start by following the SimpleSAMLphp's [service provider quickstart instructions](https://simplesamlphp.org/docs/1.16/simplesamlphp-sp). This documentation contains only the necessary extra steps to get it working on Pantheon with Drupal or WordPress.

<Alert title="Note" type="info">

This is only for advanced users working on integrating a Shibboleth single sign-on system with their Drupal site using the [SimpleSAMLphp Authentication](https://www.drupal.org/project/simplesamlphp_auth) module from Drupal.org. For WordPress sites, use the [WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/) plugin from WordPress.org with the bundled OneLogin SAML PHP library. WordPress Multisite users require [additional configuration](#wordpress-multisite-issues).

</Alert>

## Install SimpleSAMLphp

<Alert title="Note" type="info">

[PHP mcrypt](http://php.net/manual/en/book.mcrypt.php) is still used in SimpleSAMLphp 1.14.x, but removed as a dependency in SimpleSAML 1.15.x. PHP mcrypt has been deprecated in PHP 7.1, and removed from core PHP 7.2. Consider using the appropriate lower versions if you encounter issues.

</Alert>


<TabList>

<Tab title="Download Method" id="tab-1-id" active={true}>


<Alert title="Version Number" type="export">

In the code examples below, replace `16.x` with the downloaded version of SimpleSAMLphp.

</Alert>

1. Download [SimpleSAMLphp version 1.16.x](https://simplesamlphp.org/) and add it to your git repository as `/private/simplesamlphp-1.16.x`.

  ```bash
  wget https://simplesamlphp.org/download?latest -O simplesamlphp-latest.tar.gz
  mkdir private
  tar -zxvf simplesamlphp-latest.tar.gz -C private
  git add private
  git commit -am "Adding SimpleSAML"
  ```

2. Add a symlink to your repository from `/simplesaml` to `/private/simplesamlphp-1.16.x/www`:

  ```bash
  ln -s ./private/simplesamlphp-1.16.x/www ./simplesaml
  git add simplesaml
  git commit -am "Adding SimpleSAML symlink"
  ```

3. [Generate or install certs](https://simplesamlphp.org/docs/1.9/simplesamlphp-sp#section_1_1) as needed, and add them to the repository in `private/simplesamlphp-1.16.x/cert`.

</Tab>

<Tab title="Composer Method" id="tab-2-id">

When using Composer to manage the SimpleSAMLphp library, you'll need to store your config files outside of the vendor directory in order to prevent those from being overwritten when you apply updates. We can use a symlink to allow SimpleSAMLphp to utilize the config files stored in the non-standard location.

Commands below require a [nested docroot](/docs/nested-docroot/) structure and should all be run from the site root (not the nested docroot `web` directory).

1. Add the SimpleSAMLphp library:

 ```bash
 composer require simplesamlphp/simplesamlphp
 ```

2. Add a symlink from `web/simplesaml` to `vendor/simplesamlphp/simplesamlphp/www`:

 ```bash
 ln -s ../vendor/simplesamlphp/simplesamlphp/www ./web/simplesaml
 ```

3. Create your site-specific config file:

 ```bash
 mkdir private
 cp vendor/simplesamlphp/simplesamlphp/config-templates/config.php private/simplesaml-config.php
 ```

4. Follow the directions above to [set up your config file](#configure-simplesamlphp) (`private/simplesaml-config.php`).

5. Add a symlink from SimpleSAMLphp's default config file over to your customized config, stored outside the vendor directory:

 ```bash
 ln -s ../../../../private/simplesaml-config.php ./vendor/simplesamlphp/simplesamlphp/config/config.php
 ```

6. Add this symlink as a post-update script to `composer.json`. This allows the symlink to be recreated if we update or re-install SimpleSAMLphp using Composer:

 ```json
   "scripts": {
       "post-install-cmd": [
           "ln -s ../../../../private/simplesaml-config.php ./vendor/simplesamlphp/simplesamlphp/config/config.php"
       ]
   },
 ```

7. Commit and push these changes back to your Pantheon dev or multidev environment, where you should now be able to access the SimpleSAMLphp installation page at `dev-yoursite.pantheonsite.io/simplesaml`.

8. [Generate or install certs](https://simplesamlphp.org/docs/1.9/simplesamlphp-sp#section_1_1) as needed, and add them to the project in `vendor/simplesamlphp/simplesamlphp/cert`.

</Tab>

</TabList>

## Configure SimpleSAMLphp

Set up your SimpleSAMLphp `config.php` as follows:

1. Enable local sessions to ensure that SimpleSAMLphp can keep a session when used in standalone mode:

  ```php
  if (!ini_get('session.save_handler')) {
      ini_set('session.save_handler', 'file');
  }
  ```

2. Load necessary environmental data. For a Drupal site, you can access `$_SERVER['PRESSFLOW_SETTINGS']`:

  ```php
  $ps = json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE);
  $host = $_SERVER['HTTP_HOST'];
  $db = $ps['databases']['default']['default'];
  ```

  For a WordPress site, you can access the Pantheon environment variables:

  ```php
  $host = $_SERVER['HTTP_HOST'];
  $db = array(
      'host'      => $_ENV['DB_HOST'],
      'database'  => $_ENV['DB_NAME'],
      'username'  => $_ENV['DB_USER'],
      'password'  => $_ENV['DB_PASSWORD'],
      'port'      => $_ENV['DB_PORT'],
  );
  ```

3. With the basic variables defined, set up base config:

  ```php
  $config = array (
       'baseurlpath' => 'https://'. $host .':443/simplesaml/', // SAML should always connect via 443
       'certdir' => 'cert/',
       'loggingdir' => $_ENV['HOME'] . '/files/private/log/',
       'datadir' => 'data/',
       'tempdir' => $_ENV['HOME'] . '/tmp/simplesaml',
       Your $config array continues for a while...
       until we get to the "store.type" value, where we put in DB config...
       'store.type' => 'sql',
       'store.sql.dsn' => 'mysql:host='. $db['host'] .';port='. $db['port'] .';dbname='. $db['database'],
       'store.sql.username' => $db['username'],
       'store.sql.password' => $db['password'],
  ```

  <Alert title="Note" type="info">

  Some SSO providers will fail to connect when the port number (`443`) is specified in `baseurlpath`. Remove `:443` from this line as a troubleshooting step.

  </Alert>

4. With configuration completed, commit the changes to your SimpleSAMLphp files:

  ```bash
  git add private/simplesamlphp-1.15.x
  git commit -am "Adding SimpleSaml config files."
  ```

You can now visit the subdirectory `/simplesaml` on your development site and complete your metadata configuration.

## Drupal Configuration

Add the following lines to `settings.php` so that the Drupal module can locate SimpleSAMLphp:

For Drupal 7 sites:
```php
# Provide universal absolute path to the installation.
$conf['simplesamlphp_auth_installdir'] = $_ENV['HOME'] .'/code/private/simplesamlphp-1.15.x';
```

For Drupal 8 sites:
```php
# Provide universal absolute path to the installation.
$settings['simplesamlphp_dir'] = $_ENV['HOME'] .'/code/private/simplesamlphp-1.15.x';
```

You can now enable and configure the module. If SAML authentication fails because of a configuration error, look at the watchdog log to see why.

## WordPress Multisite Issues
WordPress Multisite users have reported a possible solution to enable SSO on their site networks; modify `inc/class-wp-saml-auth.php` to include:

```php
//$redirect_to = filter_input( INPUT_GET, 'redirect_to', FILTER_SANITIZE_URL );
//$redirect_to = $redirect_to ? : $_SERVER['REQUEST_URI'];
// added to resolve multisite SSO issues
$redirect_to = get_admin_url();
$this->provider->login( $redirect_to );
```

## Troubleshooting
### Varnish Not Working/Cookie Being Set for Anonymous Users

The current version of the SimpleSAMLphp Authentication module attempts to load a session on every page, as reported in [https://drupal.org/node/2020009](https://drupal.org/node/2020009) in the official issue queue. There are two patches; at this time, [https://drupal.org/node/2020009#comment-7845537](https://drupal.org/node/2020009#comment-7845537) looks to be the best solution until the fix is accepted into an official project release.

