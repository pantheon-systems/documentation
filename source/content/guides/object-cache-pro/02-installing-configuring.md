---
title: Object Cache Pro
subtitle: Installing and Configuring Object Cache Pro on Pantheon
description: 
tags: []
contributors: [jazzsequence]
type: guide
showtoc: true
anchorid: object-cache-pro
permalink: docs/guides/object-cache-pro/installing-configuring/
editpath: object-cache-pro/02-installing-configuring.md
contenttype: [guide]
innav: [true]
categories: []
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: ""
---
<Alert title="Early Access Software" type="info">
This product is currently in <a href="https://docs.pantheon.io/guides/support/early-access/">Early Access</a>. Information here may be subject to change. Object Cache Pro, however, is a stable product and is being used on production sites. If you have any questions, please refer to the email you received when you signed up for Object Cache Pro Early Access.
</Alert>

To get started, refer to the email you received in response to [signing up for the Early Access program](https://forms.gle/3EpZcELcYqB2VRKC8). The email should contain a download link and a license token. Throughout this process the license token will be displayed as `<LICENSE-TOKEN>`.

### Requirements

Before you can install and activate Object Cache Pro, you must be working on a site with Redis enabled. You can activate this either from the Pantheon dashboard or with Terminus.

#### On the Dashboard

From your site's dashboard, click on the Settings button in the top right. In the modal window that comes up, you will see a box at the bottom that says "Redis". Click the "Enable" button.

![Pantheon Settings Add-Ons](../../../images/guides/object-cache-pro/pantheon-settings-addons.png)

#### With Terminus
To enable Redis via the command line with Terminus, use the following command:

```bash
terminus redis:enable <site>
```

### On regular WordPress Sites

#### 1. Install the Object Cache Pro plugin

Refer to the email you received and the link to the zip file for Object Cache Pro. Download the file, unzip, and add to your WordPress install as you normally would. 

*Note: This link will always point to the latest version of Object Cache Pro. Be sure to store it in a safe place so you never miss out on updates to Object Cache Pro.*

Once you have Object Cache Pro in your codebase, there are some configuration options that you need to add to set it up. All of these options are stored in your `wp-config.php` in the root of your site repoistory.

#### 2. Add the license token
*Note: In the future, the license key will be provided by the platform. In the meantime, you are responsible for adding it to your repository.*

To add configuration values to Object Cache Pro for your site, you will need to add values to the `WP_REDIS_CONFIG` constant. On regular WordPress sites, this means saving these rules inside `wp-config.php`. If you are using a Bedrock-based upstream or WordPress (Composer Managed), you'll want to follow the instructions [below](#using-wordpress-composer-managed).

In `wp-config.php`, somewhere above the `/* That's all, stop editing! Happy Pressing. */` line at the bottom of the file, you'll want to add the following:

```php
/**
 * Object Cache Pro config
 */
define( 'WP_REDIS_CONFIG', [
    'token' => '<LICENSE-TOKEN>',
] );
```

Once this is done, there are additional options that need to be added. [Skip down to the configuration options](#configuring-object-cache-pro) section to finish the setup process.

### Using WordPress (Composer Managed)

*For full configuration instructions, refer to the [official Object Cache Pro documentation](https://objectcache.pro/docs/composer-installation).*

#### 1. Create the authentication token
First, you must add your license token to Composer. You can do this with the following command.

`comoser config --auth http-basic.objectcache.pro token <LICENSE-TOKEN>`

Alternately, you can create an `auth.json` file (created by the above command) manually:

```json
{
	"http-basic": {
		"objectcache.pro": {
			"username": "token",
			"password": "<LICENSE-TOKEN>"
		}
	}
}
```

Once you've done this, commit the `auth.json` to your repository.

`git add auth.json && git commit -m "Add Object Cache Pro auth token."`

#### 2. Add the Object Cache Pro repository to `composer.json`
The next thing that you'll need to do is add a new repository to your Composer file's `repositories` section:

```json
{
	"repositories": [
		{
			"type": "composer",
			"url": "https://objectcache.pro/repo/"
		}
	]
}
```

Your final `repositories` section should look something like this:

```json
"repositories": [
	{
		"type": "composer",
		"url": "https://objectcache.pro/repo/"
	},
	{
		"type": "composer",
		"url": "https://wpackagist.org",
		"only": [
			"wpackagist-plugin/*",
			"wpackagist-theme/*"
		]
	},
	{
		"type": "path",
		"url": "upstream-configuration"
	}
],
```

#### 3. Install Object Cache Pro via Composer
You now have everything you need to install and manage Object Cache Pro via Composer. The next step is actually running `composer require`. There are two ways of handling this, the first is the easiest:

`composer require rhubarbgroup/object-cache-pro --ignore-platform-reqs`

In this case, the `--ignore-platform-reqs` flag is being passed because Object Cache Pro expects that Redis is running on the machine that the plugin is being installed on. This is likely not going to be true on your local machine (but it might be true inside the container or virtual machine you are using for local development, more on that later). So, because we want to install the plugin but want to bypass the platform (local machine) requirements, we need to pass the ignore flag.

Alternately, you can run the command inside your development environment where Redis _does_ exist. If you're using Lando, that means you could do this:

`lando composer require rhubarbgroup/object-cache-pro`

In this case, the Lando machine already has the Redis PHP extension installed and so the command can be run without flags.

*Note: Because of the reasons stated above, using Composer commands locally while requiring Object Cache Pro via Composer will necessitate adding the `--ignore-platform-reqs` flag to all local `composer require`, `composer update` and `composer install` commands.*

Once you've got Object Cache Pro `require`d in your `composer.json` file, you will want to commit those changes to your repository.

`git add composer.* && git commit -m "Require Object Cache Pro"`

#### 4. Add the license token to `config/application.php`

*Note: In the future, the license key will be provided by the platform. In the meantime, you are responsible for adding it to your repository.*

Now you can add configuration values to Object Cache Pro for your site. This is done by manipulating the `WP_REDIS_CONFIG` constant. Since we're using Bedrock, we'll be putting these rules inside `config/application.php` and using Bedrock's `Config` class to define the constant.

In `config/application.php`, somewhere above the `Config::apply()` line at the bottom of the file, you'll want to add the following:

```php
/**
 * Object Cache Pro config
 */
Config::define( 'WP_REDIS_CONFIG', [
    'token' => '<LICENSE-TOKEN>',
] );
```

I like to put this directly under the `WP_DEBUG` rules so it looks like this:

```php
/**
 * Debugging Settings
 */
Config::define('WP_DEBUG_DISPLAY', false);
Config::define('WP_DEBUG_LOG', false);
Config::define('SCRIPT_DEBUG', false);
ini_set('display_errors', '0');

/**
 * Object Cache Pro config
 */ 
Config::define( 'WP_REDIS_CONFIG', [
    'token' => '<LICENSE-TOKEN>',
] );
```

### Configuring Object Cache Pro
There are a few other configuration options that must be added to your configuration file before Object Cache Pro will work. The instructions below provide guidance for both regular WordPress sites on Pantheon, and WordPress (Composer Managed)-based sites. Once the configuration options are added, there are still a couple steps before Object Cache Pro is fully ready-to-go.

#### 1. Add Object Cache Pro configuration options

The full, recommended contents of the `WP_REDIS_CONFIG` constant are as follows:

```php
	'token' => '<LICENSE-TOKEN>',
	'host' => $_SERVER['CACHE_HOST'] ?? '127.0.0.1',
	'port' => $_SERVER['CACHE_PORT'] ?? 6379,
	'database' => $_SERVER['CACHE_DB'] ?? 0,
	'password' => $_SERVER['CACHE_PASSWORD'] ?? null,
	'maxttl' => 86400 * 7,
	'timeout' => 1.0,
	'read_timeout' => 1.0,
	'debug' => false,
	'analytics' => [
		'enabled' => true,
		'persist' => true,
		'retention' => 3600, // 1 hour
		'footnote' => true,
	],
```

This should be added after `Config::define( 'WP_REDIS_CONFIG', [` in `config/application.php` for **WordPress (Composer Managed)**, or  `define( 'WP_REDIS_CONFIG', [` in `wp-config.php` for a **standard WordPress** site.

There are more [configuration options](https://objectcache.pro/docs/configuration-options) that can be added here as well. We recommend using the above settings which are optimized for Pantheon if you don't know specifically what each option does.

#### 2. Activate the plugin and enable Redis in the plugin

Before attempting to activate the plugin, make sure you `git push` your changes up to your repository.

You can activate the Object Cache Pro plugin from the admin, locally with Lando or via Terminus. In the WordPress admin, navigate to the Plugins page and activate Object Cache Pro. Then go to the Object Cache Pro settings(?) page, ensure that you are in an environment with file write permissions (either SFTP mode, if activating on your Pantheon Dev environment or in a local development environment), and click (?) the Enable (?) button. This will create the `object-cache.php` drop-in file. If you did this in your Pantheon Dev environment, be sure to commit the change in SFTP mode. If you did this locally, you'll want to commit the file to your repository.

If you're using Terminus, you'll want to use the following Terminus commands:

```bash
terminus connection:set sftp
terminus wp -- <site>.<env> plugin activate object-cache-pro
terminus wp -- <site>.<env> redis enable
terminus env:commit <site>.<env> --message="Add Object Cache Pro drop-in"
terminus connection:set git
```

If you did not create the file locally, you'll want to follow this up with a `git pull`.

#### That's all folks!
You are all set. At this point, you should be able to navigate to `/wp-admin/options-general.php?page=objectcache` and see the current status of Object Cache Pro on your site as well as live graphs of requests, memory usage and more!