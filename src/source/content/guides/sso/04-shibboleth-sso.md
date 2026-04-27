---
title: Single Sign-on with Pantheon
subtitle: Use SimpleSAMLphp with Shibboleth SSO
description: Configure a single sign-on system for your Drupal or WordPress site with SimpleSAMLphp.
tags: [security, sso, users]
contributors: [kyletaylored]
contenttype: [guide]
innav: [true]
showtoc: true
categories: [security]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [SimpleSAMLphp]
permalink: docs/guides/sso/shibboleth-sso
---
<!--Todo: Relocate this to a single page doc so it can be added to Integrations submenu -->
This section provides information on how to install and configure [SimpleSAMLphp](https://simplesamlphp.org/) for Pantheon sites. Refer to the [Other SSO Options](#other-sso-options) section if you are searching for an SSO service provider solution with minimal configuration requirements.

## Before You Begin

- Complete SimpleSAMLphp's [service provider quickstart instructions](https://simplesamlphp.org/docs/stable/simplesamlphp-sp.html). This documentation contains necessary steps to get SimpleSAMLphp working on Pantheon with Drupal or WordPress.

<Alert title="Note" type="info">

The instructions below are only for advanced users working on integrating a Shibboleth single sign-on system with their Drupal site using the [SimpleSAMLphp Authentication](https://www.drupal.org/project/simplesamlphp_auth) module from Drupal.org. For WordPress sites, use the [WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/) plugin from WordPress.org with the bundled OneLogin SAML PHP library. WordPress Multisite users require [additional configuration](#wordpress-multisite-issues).

</Alert>

## Install SimpleSAMLphp

[PHP mcrypt](http://php.net/manual/en/book.mcrypt.php) is still used in SimpleSAMLphp 1.14.x, but was removed as a dependency in SimpleSAML 1.15.x. PHP mcrypt has been deprecated in PHP 7.1, and removed from core PHP 7.2. Consider using the appropriate lower versions if you encounter issues.

<TabList>

<Tab title="Download Method" id="tab-1-id" active={true}>

1. Download [SimpleSAMLphp](https://simplesamlphp.org/) and add it to your Git repository as `private/simplesamlphp`

  ```bash{promptUser: user}
  wget https://simplesamlphp.org/download?latest -O simplesamlphp-latest.tar.gz
  mkdir -p private/simplesamlphp
  tar -zxf simplesamlphp-latest.tar.gz -C private/simplesamlphp --strip-components 1
  git add private
  git commit -am "Adding SimpleSAML"
  ```

1. Add a symlink to your repository from `/simplesaml` to `/private/simplesamlphp/public`:

  ```bash{promptUser: user}
  ln -s private/simplesamlphp/public simplesaml
  git add simplesaml
  git commit -am "Adding SimpleSAML symlink"
  ```

1. [Generate or install certs](https://simplesamlphp.org/docs/stable/simplesamlphp-sp) as needed, and add them to the repository in `private/simplesamlphp/cert`.

</Tab>

<Tab title="Composer Method" id="tab-2-id">

When using Composer to manage the SimpleSAMLphp library, you must store your config files outside of the vendor directory to prevent the files from being overwritten when you apply updates. You can use a symlink to allow SimpleSAMLphp to utilize the config files stored in the non-standard location.

The commands below require a [nested docroot](/nested-docroot) structure and must all be run from the site root (not the nested docroot `web` directory).

1. Add the SimpleSAMLphp library:

 ```bash{promptUser: user}
 composer require simplesamlphp/simplesamlphp
 ```

1. Add a symlink from `web/simplesaml` to `vendor/simplesamlphp/simplesamlphp/public`:

 ```bash{promptUser: user}
 ln -s ../vendor/simplesamlphp/simplesamlphp/public web/simplesaml
 ```

1. Create your site-specific config file:

 ```bash{promptUser: user}
 mkdir -p private/simplesamlphp
 mv vendor/simplesamlphp/simplesamlphp/config private/simplesamlphp/config
 cp private/simplesamlphp/config/config.php.dist private/simplesamlphp/config/config.php
 cp private/simplesamlphp/config/authsources.php.dist private/simplesamlphp/config/authsources.php
 ```

1. Follow the directions in the next section to [set up your config file](#configure-simplesamlphp) (`private/simplesamlphp/config/config.php`).

1. Add this symlink as a post-update script to `composer.json`. This allows the symlink to be recreated if you update or re-install SimpleSAMLphp using Composer:

 ```json:title=composer.json
"scripts": {
    "post-update-cmd": [
        "rm -rf vendor/simplesamlphp/simplesamlphp/config && ln -sf ../../../private/simplesamlphp/config vendor/simplesamlphp/simplesamlphp/config"
    ],
    "post-install-cmd": [
        "rm -rf vendor/simplesamlphp/simplesamlphp/config && ln -sf ../../../private/simplesamlphp/config vendor/simplesamlphp/simplesamlphp/config"
    ]
},
 ```

1. Repeat the steps for the metadata folder (depending on your requirements).

1. Commit and push these changes back to your Pantheon Dev or Multidev environment, where you should now be able to access the SimpleSAMLphp installation page at `dev-yoursite.pantheonsite.io/simplesaml`.

1. [Generate or install certificates](https://simplesamlphp.org/docs/stable/simplesamlphp-sp) as needed, and add them to the project in `vendor/simplesamlphp/simplesamlphp/cert`.

You should now have a docroot structure similar to the output below:

```bash
.
├── private
│   └── simplesamlphp
|       ├── config
│       │   ├── authsources.php
|       |   └── config.php
|       └── metadata (optional)
│           ├── saml20-idp-remote.php
|           └── saml20-sp-remote.php
├── vendor
│   └── simplesamlphp
│       └── simplesamlphp
│           └── config -> ../../../private/simplesamlphp/config
└── web
    └── simplesaml -> ../vendor/simplesamlphp/simplesamlphp/public
```

</Tab>

</TabList>

## Configure SimpleSAMLphp

Set up your SimpleSAMLphp `config.php` as follows:

1. Enable local sessions to ensure that SimpleSAMLphp can keep a session when used in standalone mode:

  ```php:title=config.php
  if (!ini_get('session.save_handler')) {
      ini_set('session.save_handler', 'file');
  }
  ```

1. Load necessary environmental data.

  ```php:title=config.php
  $host = $_SERVER['HTTP_HOST'];
  $db = array(
      'host'      => $_ENV['DB_HOST'],
      'database'  => $_ENV['DB_NAME'],
      'username'  => $_ENV['DB_USER'],
      'password'  => $_ENV['DB_PASSWORD'],
      'port'      => $_ENV['DB_PORT'],
  );
  ```

1. Set up the base config with the basic variables defined:

  ```php:title=config.php
  $config = [
       'baseurlpath' => 'https://'. $host .':443/simplesaml/', // SAML should always connect via 443
       'certdir' => 'cert/',
       'logging.handler' => 'errorlog',
       'datadir' => 'data/',
       'tempdir' => $_ENV['HOME'] . '/tmp/simplesaml',

       // Your $config array continues for a while...
       // until we get to the "store.type" value, where we put in DB config...
       'store.type' => 'sql',
       'store.sql.dsn' => 'mysql:host='. $db['host'] .';port='. $db['port'] .';dbname='. $db['database'],
       'store.sql.username' => $db['username'],
       'store.sql.password' => $db['password'],
  ]
  ```

   A custom `SimpleSAML/Logger/LoggingHandlerInterface` implementation is required for persistent and centralized logging.

  <Alert title="Note" type="info">

  Some SSO providers will fail to connect when the port number (`443`) is specified in `baseurlpath`. To solve this error, remove `:443` from the line.

  </Alert>

1. Commit the changes to your SimpleSAMLphp files:

  ```bash
  git add private/simplesamlphp
  git commit -am "Adding SimpleSaml config files."
  ```

1. Visit the subdirectory `/simplesaml` on your development site and complete your metadata configuration.

## Drupal Configuration

If you are using the [simpleSAMLphp Authentication](https://www.drupal.org/project/simplesamlphp_auth) module, follow the instructions listed in the [README](https://git.drupalcode.org/project/simplesamlphp_auth) file. These instructions cover both Composer and non-Composer implementations for Drupal sites.

### Composer settings.php File

Configuration of the `setting.php` file is not needed if you are using Composer.

### Non-Composer settings.php File

Non-Composer implementations must add the following lines to the `settings.php` file to allow the Drupal module to locate SimpleSAMLphp:

**Drupal 7 Example**

```php:title=settings.php
# Provide universal absolute path to the installation.
$conf['simplesamlphp_auth_installdir'] = $_ENV['HOME'] .'/code/private/simplesamlphp';
```

### Drupal (Latest)

Drupal 10 includes Symfony 6. The SimpleSAMLphp library is not currently compatible with Symfony 6 unless you use the dev-master branch. There is a new `simplesamlphp_auth branch (4.x)` that you can use if you require a compatibility workaround. Note that this workaround requires you to use dev versions at your own risk.

You must require the Drupal module like this:

```bash{promptUser: user}
composer require drupal/simplesamlphp_auth:"^4"
```

## WordPress Multisite Issues

WordPress Multisite users have reported a possible solution to enable SSO on their site. To use this solution, modify `inc/class-wp-saml-auth.php` to include:

```php:title=class-wp-saml-auth.php
//$redirect_to = filter_input( INPUT_GET, 'redirect_to', FILTER_SANITIZE_URL );
//$redirect_to = $redirect_to ? : $_SERVER['REQUEST_URI'];
// added to resolve multisite SSO issues
$redirect_to = get_admin_url();
$this->provider->login( $redirect_to );
```

## Troubleshooting

### Varnish Not Working/Cookie Being Set for Anonymous Users

There is a known issue with the Drupal 7 version of the SimpleSAMLphp Authentication module. The module attempts to load a session on every page, as reported in [https://drupal.org/node/2020009](https://drupal.org/node/2020009) in the official issue queue. Although there are two patches you can try in an effort to improve site performance; at this time, [https://drupal.org/node/2020009#comment-7845537](https://drupal.org/node/2020009#comment-7845537) is the recommended solution until the fix is accepted into an official project release.

### SimpleSAMLphp Error: can't find metadata

Generate the required identity provider connections files through the modules, or follow the steps in SimpleSAMLphp for [Adding IdPs to the SP](https://simplesamlphp.org/docs/stable/simplesamlphp-sp).

The files must be added under the `/private/simplesamlphp/metadata` directory and symlinked into the vendor directory, if you are using Composer. This is similar to the config setup for Composer.

## Other SSO Options

Other plugins and modules provide SSO provider services with less configuration.

<Alert title="Warning" type="danger" >

Pantheon does not officially endorse or provide support for any third-party plugins or modules.

</Alert>


### SAML SP 2.0 Single Sign On (SSO) - SAML Service Provider

**Drupal:** The module [SAML SP 2.0 Single Sign On (SSO) - SAML Service Provider](https://www.drupal.org/project/miniorange_saml) provides a simple drop-in alternative way to configure SAML with a variety of IdPs.

The Support team has tested this module on Pantheon using Okta.

**WordPress:** The WordPress version of [SAML SP Single Sign On – SSO login](https://wordpress.org/plugins/miniorange-saml-20-single-sign-on/) works in exactly the same way as the Drupal module, but has not been tested by Pantheon Support.

### OAuth

[OAuth](https://oauth.net/) is an open authorization standard that Pantheon customers have reported success using. Refer to [SSO and Identity Federation on Pantheon](/guides/sso/sso#oauth) for more information.

### WP SAML Auth with Google Apps

[WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/) lets your users sign into WordPress using their Google Account if your organization uses Google's G Suite. Refer to our [Using WP SAML Auth with Google Apps](/guides/wordpress-google-sso/) guide for more information.

### WordPress SSO Plugins

You can consult this [list of WordPress SSO plugins](https://wordpress.org/plugins/tags/single-sign-on/) for more options.

### Drupal SSO Modules

You can consult this [list of Drupal SSO modules](https://groups.drupal.org/node/182004) for more options.

## More Resources

- [Secure Your Site with Two-Factor Authentication](/guides/secure-development/two-factor-authentication)
- [Quicksilver Secrets Script](/guides/quicksilver/install-script#secrets)
