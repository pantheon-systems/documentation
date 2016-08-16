---
title: Using Lockr To Secure and Manage API and Encryption Keys With WordPress and Drupal
type: guide
permalink: docs/guides/:basename/
description: Detailed information on how to setup and use Lockr in your WordPress and Drupal site.
categories: [sites]
tags: [code]
contributors:
  - cteitzel
date: 8/11/2016
---
## What is Lockr

[Lockr](https://lockr.io) is a simple-to-use plugin for WordPress or Drupal to manage your site’s API and Encryption keys in a secure offsite hosted environment. Lockr removes the key from your site code and database and stores it in a secure and certified key manager. When your site needs the key to be used in an encryption/decryption or API request, Lockr will use the Pantheon server’s certificate to authenticate on your behalf and release the key. 

Lockr allows site administrators the ability to take control of how and where their sensitive keys are stored, thus improving the overall security of the site and allows it to meet specific regulatory and compliance requirements around key management. Lockr also separately stores development and production specific keys to create an additional layer of security between environments.

## Why Lockr?

By combining a simple to use developer interface with a managed scalable cloud key management system, Lockr allows applications of all sizes to meet industry standards for key management. Unlike other key managers, Lockr offers a "white glove service" that provides additional layers of security and system monitoring, no ongoing maintenance and continuous development for integrations with your favorite modules and plugins. Offsite API & encryption key management delivers best-practice security to help sites comply with HIPAA, FERPA, and FISMA among others. Development use of Lockr in the Dev, Test and Multi-Dev environments is always free.  

## WordPress Installation

Lockr is automatically configured to secure API keys for numerous 3rd party plugins for seamless integration and securing of your keys. 
Visit our [Github page](https://github.com/lockr/lockr-patches/tree/wp) for a list of plugins that can be automatically patched.

### Install through the Administration Interface

The official [Lockr Plugin](https://wordpress.org/plugins/lockr) makes it a breeze to get started and quickly secure your keys. Install and activate the latest release through the WordPress dashboard or place it it in /wp-content/plugins directory and activate via the dashboard.

1. Install through the WordPress plugin screen directly or upload the Lockr package to `/wp-content/plugins/` directory. 
2. Activate Lockr through the “Plugins” section in your WordPress backend  (ex. `http://my-site.pantheonsite.io/wp-admin/plugins.php` )
3. Visit the Lockr Configuration page  (ex. `http://my-site.pantheonsite.io/wp-admin/admin.php?page=lockr-site-config`)

![WP Lockr Configuration example](/source/docs/assets/images/lockr_wpconfig.png)​

4. Enter your email address and Lockr will take care of the rest! (note: For first time users, you will be receiving an email with instruction, if an existing Lockr users should use the email address they used to create their Lockr account. After submitting the request to register the site, you will be prompted for your Lockr password to confirm adding the site to your account.)

![WP Lockr all keys page example](/source/docs/assets/images/lockr_wpallkeys.png)​

Now you’re set! Your WordPress application is now set up to start entering your keys through the Lockr config. Once you have successfully installed the plugin, you can see a list of keys (and edit/update) by going to **All Keys** under the Lockr Menu. Be sure to visit the [Lockr patch library](https://github.com/lockr/lockr-patches/tree/wp) for the latest patches to your favorite plugins.


### WP-CLI Commands

The Lockr plugin contains a number of WP-CLI commands to make registering the site, and setting/getting a key simple through the command line.

```nohighlight
lockr register-site --email=[<Lockr email address>] --password=[<Lockr account password>]
```
This command will register the site with Lockr to the email address provided. The password is only necessary for email addresses already with a Lockr account. This is useful for automated deployment from a custom upstream using Quicksilver.


```nohighlight
lockr lockdown
```
Run this command and Lockr will go to a [patch library](https://github.com/lockr/lockr-patches/tree/wp) and automatically patch your existing plugins that do not currently integrate natively with Lockr.


```nohighlight
lockr get-key [key name]
```
This command will get the key from Lockr and decrypt it. This is a useful command to program in automated functionality in Quicksilver


```nohighlight
lockr set-key --name=[key name] --label=[key label] --value=[key value]
```
This command will encrypt a key and send it to Lockr. This is useful during site migrations or automated deployments of new sites through Quicksilver.



## Drupal Installation

Lockr provides a simple-to-use [plugin](https://www.drupal.org/project/lockr) for Drupal’s [Key Module](https://www.drupal.org/project/key) to manage your site’s keys and secrets. By pairing together Lockr, [Encrypt](https://www.drupal.org/project/encrypt) and the Key module Drupal can finally take advantage of best security practices of separating the keys away from the data they protect. Lockr is currently available for Drupal 7 and Drupal 8. Visit our [Github page](https://github.com/lockr/lockr-patches/tree/drupal7) for a list of plugins that can be automatically patched.

### Installing through the administration page

1. Lockr has a dependency on the Key module download the corresponding versions for your installation of Drupal and place them in the modules folder (Drupal 7: `/sites/all/modules/contrib` Drupal 8: `/modules/contrib`). 
2. Once uploaded to the server, go to the modules page to enable the modules, and their dependencies (ex. `http://my-site.pantheonsite.io/admin/modules`). 
3. After the modules are successfully installed, go to the Lockr configuration page to register your site (ex. `http://my-site.pantheonsite.io/admin/config/system/lockr`).

![Drupal Lockr Configuration example](/source/docs/assets/images/lockr_drupalconfig.png)​

4. Enter your email address and Lockr will take care of the rest! (note: For first time users, you will be receiving an email with instruction, if an existing Lockr users should use the email address they used to create their Lockr account. After submitting the request to register the site, you will be prompted for your Lockr password to confirm adding the site to your account.)

### Drush Commands

Using the Drush interface, you can download and install Lockr in a few simple commands. Using Drush will  download and install all dependencies and will go to the patch library and patch any modules found in the site. A password is required and for users already with a Lockr account.

```nohighlight
terminus drush dl lockr
```
```nohighlight
terminus drush en lockr
```
```nohighlight
terminus drush lockr-register --email=[<Lockr account email >] --password=[<Lockr account password>]
```
This command will register the site with Lockr to the email address provided. The password is only necessary for email addresses already with a Lockr account. This is useful for automated deployment from a custom upstream using Quicksilver.

```nohighlight
terminus drush lockr-lockdown
```
Run this command and Lockr will go to a [patch library](https://github.com/lockr/lockr-patches/tree/drupal7) and automatically patch your existing plugins that do not currently integrate natively with Lockr.

##Install Lockr with Terminus for Drupal and Wordpress
Lockr has a plugin for [Terminus](https://pantheon.io/docs/terminus/) which allows for simple install through a single command. To enable the terminus plugin follow these simple steps from your local environment:

1. Clone the Terminus plugin into the ~/terminus/plugins directory on your local environment
2. Login with Terminus 
```nohighlight
terminus auth login [<email>] [--password=<value>] [--machine-token=<value>]
```
3. Lastly, run the following command
```nohighlight
terminus lockdown [<Lockr account email>] --password=[<Lockr account password>]
```
After this, Terminus will prompt for which site you would like to install on. Next it will detect the CMS, download and install all necessary components, register the site, and patch all relevant plugins in your site. It's that simple! One command and your site is setup. 

## Checking Status of Lockr with your site
After successfully installing and registering Lockr, you will see a prompt on the configuration page, where you previously entered your email address, telling you the site is registered. You should also now be able to set keys through the admin interface. Lockr will not allow you to set a key if the site is not properly registered.

### Congratulations!
You have now successfully integrated a best-in-class, simple to use, key management service for your website. If you have any questions at all, contact [Lockr Support Team](https://lockr.io). 

## More questions?  

Visit the FAQ below or visit https://lockr.io or get realtime support on Lockr's [Slack channel](http://slack.lockr.io).

## FAQ

### Who is Lockr for?
Easy to use for the novice site owner and advanced enough for the expert developer, Lockr secures web transactions and data at rest no matter the environment. Accessed by a simple REST interface, available through plugins available for Drupal and WordPress, Lockr is capable of handling sites of all sizes. Non-CMS applications can easily integrate with Lockr as well, provided they have credentials set up through [Lockr Support](https://lockr.io).

### Examples of the kinds of Keys managed by Lockr:
- API keys for connecting to external services such as: Payment gateways and web commerce solutions: PayPal, Stripe, WooCommerce, Authorize.net and many others.
- Email services providers: MailChimp, SendGrid, SMTP mail servers, etc.
- Other various external services like Amazon Web Services.
- A key used for encrypting data on your website
- LDAP and SSO authentication credentials


### How is Lockr different from other key management systems?
Lockr encrypts the keys prior to leaving the site or application, a process called key wrapping.  This prevents keys stored in Lockr from being viewed or compromised adding yet another  layer of security to the process. Backed by Townsend Security’s FIPS 140-2 compliant key manager, keys are secured to the highest of industry standards.

### Is Lockr Safe? 
Short answer is *Yes!* Lockr can be used to secure any API key, application secret, and other types of credentials. Once enabled in the CMS, keys entered are sent over an encrypted connection to the Lockr system. The credentials used to access Lockr are provided by the site host or application platform to prevent hijacking and tampering.  This credentialed methodology enables the separation of development and production environments. Using key wrapping, keys are rendered useless from being used outside the website or application environment. Lockr is unable to see the values of your key. 

Lockr also manages keys on a “per environment" basis which helps eliminate the potential of keys being shared from production to development environments. No longer will you have to worry about sending a test notification from development to production users, or having production data decrypted in development environments.

Leveraging proven enterprise-grade key management technology from Townsend Security, Lockr’s offsite key management delivers best-practice security to protect against critical vulnerabilities within your CMS solution. Harnessing Townsend’s commitment to driving innovation in the rapidly evolving fields of data encryption and management, it has allowed Lockr to create a product *accessible* to meet the ever changing needs of its customers. 

Notable standards for your organization:

- NIST Certified key manager at the core, allows Lockr to help meet encryption and key management requirements in HIPAA, FERPA, FISMA and HITECH.
- Numerous certification and authentication checks within Lockr’s makes handoff of keys from your site to secure storage and back, seamless.

### Will Developers Be Able To Access My Keys?
If you are encrypting sensitive information in your production environment, that data should not be decrypted anywhere but in production. Yet if your key follows your code or database, every time you clone from production into a development environment, the ability to get to the sensitive data comes along with it. Using Lockr, data is encrypted in production using a production key that is not retrievable outside that environment. When a database is cloned to development the keys that Drupal has access to cannot decrypt the data. All the while development into using the encryption modules and methods remains untouched, just with a non-production key. Now you’re able to not only keep your keys safe, but your data even more protected.

Most developers know of a time when they mistakenly triggered an email to go out to a production account, or crossed development data into a production environment. It happens to the best of us. Using Lockr virtually eliminates the possibility of these potentially costly mistakes from occurring. Developers can test workflows without the concern of using a production key and business owners can rest assured they won’t have to deal with the potential blowback of any mistakes in development.