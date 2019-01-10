---
title: How to Implement SimpleSAMLphp as idP for Drupal 8 on Pantheon 
description: Setting up an identity provider on Drupal 8 using SimpleSAMLphp.
draft: true
tags: [code, drupal-8]
categories: [drupal, developing]
contributors: Javi-er
---

There are a number of articles detailing how to implement the SAML 2.0 protocol, but if you want to host your site on Pantheon and use Drupal 8 as your identity provider, there are a few details to take in account.
<div class="alert alert-info">
<h4 class="info">Note</h4><p markdown="1">The following tutorial assumes that you are on a linux based computer or a Mac. Also that your project is running on Apache.
</p>
</div>

## Before You Begin

Before starting with this guide, make sure you have the following:

 - Have a working Drupal 8 site.
 - Download the latest version of [SimpleSAMLphp](https://simplesamlphp.org/download).
 - Download the Drupal module [saml_idp](https://github.com/Javi-er/saml_idp) (you’ll notice that this repo is a fork of [this one](https://github.com/bradjones1/saml_idp) this is because there were some changes necessary to make it work which are [described here](https://www.drupal.org/project/saml_idp/issues/3013357).)
 
## Getting started

Your project structure and configuration needs to be tweaked so it's recognized by Pantheon when deployed to the server.

### Setting up SAML Idp module
By now you should have SAML Idp module on your Drupal 8 site, go to the admin interface and enable it now.

After this create the subdirectory ``/simplesamlphp/drupalauth`` and create an empty file with the name `default_enable` in that directory in order to enable the Drupal 8 integration. You can also do this with Drush executing

``` bash
drush ev 'Drupal\saml_idp\Install::postInstall()'
```

### Setting up SimpleSAMLphp

1.  Place your Drupal 8 projected inside a ``web`` [nested docroot](https://pantheon.io/docs/nested-docroot).

2.  Place SimpleSAMLphp a folder called ``/private`` 

3.  Create a symlink on your project root from ``/simplesaml`` to ``/private/simplesamlphp/www``
    ``` bash
    $ ln -s ./private/simplesamlphp/www ./simplesaml
    ```
    
    Your project structure should be as follow:
    
    ``` markdown
    project
    ├── pantheon.yml   
    ├── ...
    └─── private
    │   │
    │   └─── simplesamlphp
    │       └─── ...
    └─── simplesamlphp -> ./private/simplesamlphp/www  
    |
    └───web
        ├── index.php
        └── ...
    ```
    
4.  Add a virtual host for your project
    Edit your Apache virtual host confiuguration and add the following:
    You can see your current virtual host configuration with 
    ``` bash 
    $ /usr/sbin/httpd -S
    ```
    
    Replace `local.myproject.com` with your desired domain name and `/var/www/project` with your project location.
    You'll probably want to edit the log directory as well if it's different on your installation.
    Take in account that you’ll need `mod_rewrite` to be enabled.

    ``` apache
    <VirtualHost *:80>
     ServerName local.myproject.com
     DocumentRoot "/var/www/project"
     SetEnv SIMPLESAMLPHP_CONFIG_DIR /var/www/project/simplesamlphp/config
     Alias /simplesaml /var/www/project/simplesamlphp/www
     ErrorLog "/log/project_log"
     CustomLog "/log/apache2/project-access_log" common
     <Directory /var/www/project/simplesamlphp/www>
      <IfModule !mod_authz_core.c>
       # For Apache 2.2:
       Order allow,deny
       Allow from all
      </IfModule>
      <IfModule mod_authz_core.c>
       # For Apache 2.4:
       Require all granted
      </IfModule>
     </Directory>
    </VirtualHost>
    ```

5. Set up the SimpleSAMLphp config files making a copy of `config_templates` folder.
    
    ``` bash 
    $ cp SimpleSAMLphp/config-templates SimpleSAMLphp/config 
    ```

6. <a name="pookie"></a>Ensure SimpleSAMLphp can keep sessions on Pantheon.
   
   Edit `simplesamlphp/config/config.php` and add the following at the bottom:
   
   ``` php
   if (defined('PANTHEON_ENVIRONMENT')) {
     $ps = json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE);
     $host = $_SERVER['HTTP_HOST'];
     $db = $ps['databases']['default']['default'];
     $config['baseurlpath'] = 'https://' . $host . 
     ':443/simplesaml/'; // SAML should always connect via 443
     $config['certdir'] = 'cert/';
     $config['loggingdir'] = $_ENV['HOME'] . '/files/private/log/';
     $config['datadir'] = 'data/';
     $config['tempdir'] = $_ENV['HOME'] . '/tmp/simplesaml';
     $config['store.type'] = 'sql';
     $config['store.sql.dsn'] = 'mysql:host=' . $db['host'] 
     . ';port=' . $db['port'] . ';dbname=' . $db['database'];
     $config['store.sql.username'] = $db['username'];
     $config['store.sql.password'] = $db['password'];
   };
   ```
   
7. Change the following values on `config.php`
   1. `technicalcontact_name` and `technicalcontact_email` to a valid contact name and email.
   2. change `secretsalt` value. This should be a random string, SimpleSAMLphp will give an error if this isn't changed.
      You can generate a random hash with the following command on some systems:
      
      ``` bash
      $ openssl rand -base64 32
      ```
   3. If you want the simpleSAMLphp administration page to be password protected, put the password you want to use on `auth.adminpassword` and change the values of `admin.protectindexpage` and `admin.protectmetadata` to true.
   4. Put all the domains where this will be used on `trusted.url.domains` for instance:
      
      ``` php
      array('local.myproject.com', 'dev.myproject.com', 'www.myproject.com')
      ```
   5. Change the value of `enable.saml20-idp` to `true`.
   6. Change the value of `store.type` to `'sql'`.
   7. Set your database connection string on `store.sql.dsn`, for instance: `'mysql:host=localhost;dbname=my_drupal_db'`.
   8. Change `store.sql.username` and `store.sql.password` to your database credentials. This is just for your local machine, when this is running on Pantheon, these settings will be overwritten by the [point 6 above](#6).

8. Edit `SimpleSAMLphp/config/authsources.php` and add the following:
   1.  Below `default-sp` block add this: 
   
      ``` php
      'drupal-userpass' => array(
      'drupalauth:External',

      // The filesystem path of the Drupal directory.
      'drupalroot' => '/var/www/project/web',

      // Whether to turn on debug
      'debug' => true,
      // the URL of the Drupal logout page
      'drupal_logout_url' => $_SERVER['HTTP_HOST'].'/user/logout',

      // the URL of the Drupal login page
      'drupal_login_url' => $_SERVER['HTTP_HOST'].'/user',
      ),
      ```
      Replace `'/var/www/project/web'` with your project location.
   2. And at the end of the same file:
   
      ``` php
      // Pantheon settings
      if (defined('PANTHEON_ENVIRONMENT')) {
          $ps = json_decode($_SERVER['PRESSFLOW_SETTINGS']);
          $config['drupal-userpass']['drupalroot'] = '/srv/bindings/' . $ps->conf->pantheon_binding . '/code/web';
      }
      ```

9. Set up the IdP and SP metadata configuration
   First copy the files `/simplesamlphp/metadata-templates/saml20-idp-hosted.php` and `/simplesamlphp/metadata-templates/saml20-sp-remote.php`  to `/simplesamlphp/metadata`.
   
   `saml20-sp-remote.php` contains  your service provider settings, this is the site that will authenticate against this IdP, this metadata should be generated from the SP itself and will look something like this:
   
   ``` php
   $metadata['http://local.spexample.org/simplesaml/module.php/saml/sp/metadata.php/default-sp'] = array(
       'AssertionConsumerService' => 'http://local.spexample.org/simplesaml/module.php/saml/sp/saml2-acs.php/default-sp',
       'SingleLogoutService' => 'http://local.spexample.org/simplesaml/module.php/saml/sp/saml2-logout.php/default-sp',
       'NameIDFormat' => 'urn:oasis:names:tc:SAML:1.1:nameid-format:persistent',
       'simplesaml.nameidattribute' => 'nameidentifier',
       'simplesaml.attributes' => TRUE,
   );
   ```

10. Edit `saml20-idp-hosted.php` and change:
    1. `'auth'` to `'drupal-userpass'` 
    2. Below that put the following block:
   
      ``` php
      'attributes.NameFormat' => 'urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified',
      'authproc' => array(
          // Convert LDAP names to oids.
          100 => array(
            'class' => 'core:AttributeMap',
            'name2claimextend'
          ),
          2 => array(
            'class' => 'saml:AttributeNameID',
            'attribute' => 'uniqueIdentifier',
            'Format' => 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri'
          ),
      ),
      'userid.attribute' => 'uniqueIdentifier'
      
      ```

      `'Format'`  will depend on your SP settings, in this case is using `'uri'` which is the most common, but it could also be set as `'unspecified'` or any other supported format, for instance: `'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified'`.

11. Now you need to create a certificate that will be used for communication between the SP and the Idp.
    First create the directory `/simplesamlphp/cert`  and then open the console, go to that directory and execute:
    
    ``` bash
    $ openssl req -newkey rsa:2048 -new -x509 -days 3652 -nodes -out server.crt -keyout server.pem
    ```

12. In order for SimpleSAMLphp to connect with the Drupal module without issues, I had to edit `/simplesamlphp/composer.json` and add the saml_idp source folder to the autoload list:
Inside the `‘autoload’` section add

  ``` json
  "classmap": [
      "../../web/modules/contrib/saml_idp/src/Auth/Source"
  ] 
  ```
  
  Once this is done refresh the autoload files from the console executing composer dump-autoload in the same directory:
  
  ``` bash
  $ ./simplesamlphp composer dump-autoload
  ```

13. Edit your Drupal `settings.php` so the Drupal module can locate SimpleSAMLphp:

  ``` php
  // Provide universal absolute path to the installation.
  $settings['simplesamlphp_dir'] = $_ENV['HOME'] .'/code/private/simplesamlphp';

  ```

### Wrapping up

This is it, if all went well you should see the SimpleSAMLphp admin screen on your browser now by visiting `http://local.myproject.com/simplesamlphp`

![SimpleSAMLphp admin screen.](https://i.imgur.com/CJkxcOG.png "SimpleSAMLphp admin screen.")


You can test your IdP directly from there going to ‘authentication’ > ‘Test configured authentication sources’.

![SimpleSAMLphp admin screen.](https://i.imgur.com/ngj5NG2.png "SimpleSAMLphp admin screen.")


## See Also

This guide is based on the following articles, you can find more info and troubleshooting in these links.

 - [Security Assertion Markup Language Definition](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language)  
 - [Using SimpleSAMLphp with Shibboleth SSO](https://pantheon.io/docs/shibboleth-sso/)
 - [SimpleSAMLphp Identity Provider QuickStart](https://simplesamlphp.org/docs/stable/simplesamlphp-idp)
 - [Turn Drupal 8 into an Identity Provider with SimpleSAMLphp](http://blog.doprogramsdream.nl/blog/turn-drupal-8-identity-provider-simplesamlphp)
