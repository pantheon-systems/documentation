---
title: Using SimpleSAMLphp with Shibboleth SSO
description: Using SimpleSAMLphp to configure a single sign-on system for your Drupal or WordPress site.
tags: [siteintegrations, security]
categories: [automate]
---
Start by following the SimpleSAMLphp's [service provider quickstart instructions](https://simplesamlphp.org/docs/1.16/simplesamlphp-sp){.external}. This documentation contains only the necessary extra steps to get it working on Pantheon with Drupal or WordPress.

<div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p markdown="1">This is only for advanced users working on integrating a Shibboleth single sign-on system with their Drupal site using the [SimpleSAMLphp Authentication](https://www.drupal.org/project/simplesamlphp_auth){.external} module from Drupal.org, or with their WordPress site using the [WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/){.external} plugin from WordPress.org.</p>
</div>

## Install SimpleSAMLphp

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">[PHP mcrypt](http://php.net/manual/en/book.mcrypt.php){.external} is still used in SimpleSAMLphp 1.14.x, but removed as a dependency in SimpleSAML 1.15.x. PHP mcrypt has been deprecated in PHP 7.1, and removed from core PHP 7.2. Consider using the appropriate lower versions if you encounter issues.
</p></div>


<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">Download Method</a></li>

  <!-- 2nd Tab Nav -->
  <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Composer Method</a></li>

</ul>

<!-- Tab panes -->
<div class="tab-content">
<!-- Active pane content -->
<div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">

<div class="alert alert-export" role="alert">
<h4 class="info">Version Number</h4>
<p markdown="1">In the code examples below, replace `16.x` with the downloaded version of SimpleSAMLphp.
</p>
</div>

1. Download [SimpleSAMLphp version 1.16.x](https://simplesamlphp.org/){.external} and add it to your git repository as `/private/simplesamlphp-1.16.x`.

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

3. [Generate or install certs](https://simplesamlphp.org/docs/1.9/simplesamlphp-sp#section_1_1){.external} as needed, and add them to the repository in `private/simplesamlphp-1.16.x/cert`.
</div>

<!-- 2nd pane content -->
<div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
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

8. [Generate or install certs](https://simplesamlphp.org/docs/1.9/simplesamlphp-sp#section_1_1){.external} as needed, and add them to the project in `vendor/simplesamlphp/simplesamlphp/cert`.
</div>
</div>

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

    <div class="alert alert-info" role="alert" markdown="1">
    #### Note {.info}
    Some SSO providers will fail to connect when the port number (`443`) is specified in `baseurlpath`. Remove `:443` from this line as a troubleshooting step.
    </div>

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

## WordPress Configuration

To use SimpleSAMLphp with WordPress, first install and activate the [WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/){.external} plugin.

Then, to configure the WP SAML Auth plugin to work with SimpleSAMLphp, add the following filter to your theme's `functions.php` file:

```php
add_filter( 'wp_saml_auth_option', function( $value, $option ){
  if ( 'simplesamlphp_autoload' === $option ) {
    // Note: Your path may differ, if you've installed a later SimpleSAMLphp version
    $value = ABSPATH . '/private/simplesamlphp-1.15.x/lib/_autoload.php';
  }
  return $value;
}, 10, 2 );
```

For more details, including additional plugin configuration options, [please see the README](https://github.com/pantheon-systems/wp-saml-auth/blob/master/README.md){.external}.

## Troubleshooting
### Varnish Not Working/Cookie Being Set for Anonymous Users

The current version of the SimpleSAMLphp Authentication module attempts to load a session on every page, as reported in [https://drupal.org/node/2020009](https://drupal.org/node/2020009){.external} in the official issue queue. There are two patches; at this time, [https://drupal.org/node/2020009#comment-7845537](https://drupal.org/node/2020009#comment-7845537){.external} looks to be the best solution until the fix is accepted into an official project release.

### WordPress Site Networks (multisite)
SimpleSAMLphp does not work with WordPress multisite networks because the simpleSAMLphp redirects get intercepted and rerouted to 404s by the CMS. Site Network users can utilize the OneLogin SAML PHP library that comes bundled with Pantheon's [WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/){.external} plugin.
