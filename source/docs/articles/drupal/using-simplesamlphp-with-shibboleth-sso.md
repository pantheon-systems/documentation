---
title: Using SimpleSAMLphp with Shibboleth SSO
description: Configure a single-sign on system for your Drupal site.
category:
  - drupal
  - developing
---

## Overview

**Note** This is only for advanced users working on integrating a Shibboleth single-sign on system with their Drupal sites on Pantheon using the [simplesaml\_php auth module](http://drupal.org/project/simplesamlphp_auth) from drupal.org.

These instructions assume you are able to follow SimpleSAMLphp's [service provider quickstart instructions](http://simplesamlphp.org/docs/1.9/simplesamlphp-sp). This documentation contains only the necessary extra steps to get it working on Pantheon.

When you're done following the quickstart instructions above and have completed all the directions below, you'll have something like http://dev-simplesaml.gotpantheon.com. Note the "Federated Log In" link. See the [pantheon-simplesaml-example](https://github.com/ari-gold/pantheon-simplesaml-example) repo to see how it was implemented. If you click each commit message of the most recent commits, you'll see what was added in each commit.

- Download [SimpleSAMLphp version 1.11.x](http://simplesamlphp.org/) and add it to your Git repository as `/private/simplesaml-1.11.x`
- Add a symlink to your repository from `/simplesaml` to `/private/simplesaml-1.11.x/www` like so:
```
ln -s ./private/simplesaml-1.11.x/www ./simplesaml
git add simplesame
git commit -am "Adding SimpleSAML symlink"
```
- [Generate or install certs](http://simplesamlphp.org/docs/1.9/simplesamlphp-sp#section_1_1) as needed and add them to Git in `/private/simplesaml-1.11.x/cert`
- Set up your config.php as follows.

First, enable local sessions to ensure that SimpleSaml can keep a session when used in standalone mode:

```
if (!ini_get('session.save_handler')) {
  ini_set('session.save_handler', 'file');
}
```

Load necessary environmental data

```
$ps = json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE);
$host = $_SERVER['HTTP_HOST'];
$drop_id = $ps['conf']['pantheon_binding'];
$db = $ps['databases']['default']['default'];
```

Set up base config

```
$config = array (
  'baseurlpath' => 'http://'. $host .'/simplesaml/',
  'certdir' => 'cert/',
  'loggingdir' => 'log/',
  'datadir' => 'data/',
  'tempdir' => '/srv/bindings/'. $drop_id .'/tmp/simplesaml',
  Your $config array continues for a while...
  until we get to the "store.type" value, where we put in DB config...
  'store.type' => 'sql',
  'store.sql.dsn' => 'mysql:host='. $db['host'] .';port='. $db['port'] .';dbname='. $db['database'],
  'store.sql.username' => $db['username'],
  'store.sql.password' => $db['password'],
```

And that's all the config you should need to change!

You should now be able to visit your site/simplesaml and complete your metadata configuration.

## Drupal Configuration

You will need to add the following lines to your `settings.php` so that the Drupal module can locate SimpleSAMLphp:

```
# Decode Pantheon Settings
$ps = json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE);
# Provide universal absolute path to the installation.
$conf['simplesamlphp_auth_installdir'] = '/srv/bindings/'. $ps['conf']['pantheon_binding'] .'/code/private/simplesamlphp-1.11.0';
```

You should now be able to enable and configure the module. Be aware that if SAML authentication fails because of a configuration error, you will want to look at the watchdog log to see why.

## Varnish Not Working/Cookie Being Set for Anonymous Users

The current version of the simplesamlphp\_auth module attempts to load a session on every page, as reported in [https://drupal.org/node/2020009](https://drupal.org/node/2020009) in the official issue queue. There are two patches; at this time, [https://drupal.org/node/2020009#comment-7845537](https://drupal.org/node/2020009#comment-7845537)looks to be the best solution until the fix is accepted into an official project release.
