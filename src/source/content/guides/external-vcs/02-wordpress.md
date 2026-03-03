---
title: External VCS Repository Setup
subtitle: WordPress Repository Specification
description: Configure a WordPress GitHub repository for Pantheon's GitHub integration with the required file structure and platform settings.
tags: [git, github, workflow, wordpress]
showtoc: true
permalink: docs/guides/external-vcs/wordpress
contenttype: [guide]
innav: [true]
categories: [git]
cms: [wordpress]
audience: [development]
product: [--]
integration: [git]
reviewed: "2025-03-02"
---

This page describes how a WordPress repository configured for Pantheon differs from a standard WordPress installation. Use it as a reference when preparing your GitHub-hosted WordPress repository.

## Summary of Differences

A Pantheon WordPress repository is a complete WordPress installation with six categories of changes from a vanilla WordPress download:

| Item | Vanilla WordPress | Pantheon WordPress |
|---|---|---|
| `wp-config.php` | Single-environment config with hardcoded credentials | Multi-environment config with conditional includes |
| `wp-config-pantheon.php` | Does not exist | Required — reads credentials from Pantheon environment variables |
| `wp-config-local-sample.php` | Does not exist | Optional — template for local development |
| `pantheon.upstream.yml` | Does not exist | Required — platform infrastructure config |
| `.gitignore` | Not included | Required — excludes uploads, local config, and runtime files |
| `wp-content/mu-plugins/` | Empty or does not exist | Required — Pantheon must-use plugin and loader |

All other WordPress core files (`wp-admin/`, `wp-includes/`, root PHP files, default themes, default plugins) are identical to a standard WordPress installation and should be committed to your repository unmodified.

## Directory Structure

Items marked **(Pantheon)** are additions or modifications. Everything else is standard WordPress core.

```
/                                        # Document root
├── .gitignore                           # (Pantheon) Custom gitignore
├── index.php                            # Standard WP
├── pantheon.upstream.yml                # (Pantheon) Platform config
├── wp-config.php                        # (Pantheon) Modified — multi-environment
├── wp-config-pantheon.php               # (Pantheon) New — platform settings
├── wp-config-local-sample.php           # (Pantheon) New — local dev template
├── wp-admin/                            # Standard WP (unmodified)
├── wp-content/
│   ├── mu-plugins/                      # (Pantheon) Must-use plugins
│   │   ├── loader.php                   # MU-plugin loader
│   │   └── pantheon-mu-plugin/          # Pantheon integration plugin
│   │       └── pantheon.php
│   ├── plugins/                         # Standard WP plugins
│   └── themes/                          # Standard WP themes
├── wp-includes/                         # Standard WP (unmodified)
└── [other standard WP root files]
```

## Modified Files

### wp-config.php

The Pantheon version replaces hardcoded database credentials with a three-way conditional that selects the appropriate configuration source at runtime.

**How it works:**

1. If `$_ENV['PANTHEON_ENVIRONMENT']` is set and `wp-config-pantheon.php` exists, load Pantheon settings.
2. Otherwise, if `wp-config-local.php` exists, load local development settings.
3. Otherwise, fall back to placeholder values.

```php
<?php
/**
 * Pantheon platform settings. Everything you need should already be set.
 */
if (file_exists(dirname(__FILE__) . '/wp-config-pantheon.php') && isset($_ENV['PANTHEON_ENVIRONMENT'])) {
	require_once(dirname(__FILE__) . '/wp-config-pantheon.php');

/**
 * Local configuration information.
 *
 * If you are working in a local/desktop development environment and want to
 * keep your config separate, we recommend using a 'wp-config-local.php' file,
 * which you should also make sure you .gitignore.
 */
} elseif (file_exists(dirname(__FILE__) . '/wp-config-local.php') && !isset($_ENV['PANTHEON_ENVIRONMENT'])){
	# IMPORTANT: ensure your local config does not include wp-settings.php
	require_once(dirname(__FILE__) . '/wp-config-local.php');

/**
 * This block will be executed if you are NOT running on Pantheon and have NO
 * wp-config-local.php. Insert alternate config here if necessary.
 */
} else {
	define('DB_NAME',          'database_name');
	define('DB_USER',          'database_username');
	define('DB_PASSWORD',      'database_password');
	define('DB_HOST',          'database_host');
	define('DB_CHARSET',       'utf8');
	define('DB_COLLATE',       '');
	define('AUTH_KEY',         'put your unique phrase here');
	define('SECURE_AUTH_KEY',  'put your unique phrase here');
	define('LOGGED_IN_KEY',    'put your unique phrase here');
	define('NONCE_KEY',        'put your unique phrase here');
	define('AUTH_SALT',        'put your unique phrase here');
	define('SECURE_AUTH_SALT', 'put your unique phrase here');
	define('LOGGED_IN_SALT',   'put your unique phrase here');
	define('NONCE_SALT',       'put your unique phrase here');
}

/** Standard wp-config.php stuff from here on down. **/

$table_prefix = 'wp_';

if ( ! defined( 'WP_DEBUG' ) ) {
	define('WP_DEBUG', false);
}

/* That's all, stop editing! Happy Pressing. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
```

### wp-config-pantheon.php

This file is the core Pantheon platform integration. It is loaded by `wp-config.php` when the `PANTHEON_ENVIRONMENT` environment variable is set.

<Alert title="Do Not Modify" type="danger">

Do not modify this file. It is maintained by Pantheon and may change in future releases. Site-specific modifications belong in `wp-config.php`.

</Alert>

**What it does:**

- **Database credentials** — reads `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, and `DB_PORT` from Pantheon-injected `$_ENV` variables.
- **Authentication keys and salts** — reads all 8 keys/salts from `$_ENV`.
- **HTTPS detection** — checks the `HTTP_USER_AGENT_HTTPS` header (set by Pantheon's edge layer) and dynamically defines `WP_HOME` and `WP_SITEURL`.
- **Temp directory** — sets `WP_TEMP_DIR` to `sys_get_temp_dir()`.
- **File modification lockdown** — sets `DISALLOW_FILE_MODS = true` on Test and Live environments.
- **Environment type mapping** — maps Pantheon environments to WordPress's `WP_ENVIRONMENT_TYPE` (`live` → `production`, `test` → `staging`, everything else → `development`).
- **Cron** — disables `WP_CRON` because Pantheon runs cron externally via `wp-cli`.

```php
<?php
/**
 * Pantheon platform settings.
 *
 * IMPORTANT NOTE:
 * Do not modify this file. This file is maintained by Pantheon.
 */

// ** MySQL settings - included in the Pantheon Environment ** //
define('DB_NAME', $_ENV['DB_NAME']);
define('DB_USER', $_ENV['DB_USER']);
define('DB_PASSWORD', $_ENV['DB_PASSWORD']);
define('DB_HOST', $_ENV['DB_HOST'] . ':' . $_ENV['DB_PORT']);
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Pantheon sets these values for you. If you want to shuffle them you could
 * use terminus env:rotate-random-seed command:
 * https://docs.pantheon.io/terminus/commands/env-rotate-random-seed
 */
define('AUTH_KEY', $_ENV['AUTH_KEY']);
define('SECURE_AUTH_KEY', $_ENV['SECURE_AUTH_KEY']);
define('LOGGED_IN_KEY', $_ENV['LOGGED_IN_KEY']);
define('NONCE_KEY', $_ENV['NONCE_KEY']);
define('AUTH_SALT', $_ENV['AUTH_SALT']);
define('SECURE_AUTH_SALT', $_ENV['SECURE_AUTH_SALT']);
define('LOGGED_IN_SALT', $_ENV['LOGGED_IN_SALT']);
define('NONCE_SALT', $_ENV['NONCE_SALT']);
/**#@-*/

/** A couple extra tweaks to help things run well on Pantheon. **/
if (isset($_SERVER['HTTP_HOST'])) {
    $scheme = 'http';
    if (isset($_SERVER['HTTP_USER_AGENT_HTTPS']) && $_SERVER['HTTP_USER_AGENT_HTTPS'] == 'ON') {
        $scheme = 'https';
        $_SERVER['HTTPS'] = 'on';
    }
    define('WP_HOME', $scheme . '://' . $_SERVER['HTTP_HOST']);
    define('WP_SITEURL', $scheme . '://' . $_SERVER['HTTP_HOST']);
}
// Don't show deprecations; useful under PHP 5.5
error_reporting(E_ALL ^ E_DEPRECATED);
/** Define appropriate location for default tmp directory on Pantheon */
define('WP_TEMP_DIR', sys_get_temp_dir());

// FS writes aren't permitted in test or live, so we should let WordPress
// know to disable relevant UI
if (in_array($_ENV['PANTHEON_ENVIRONMENT'], array( 'test', 'live' )) && ! defined('DISALLOW_FILE_MODS')) {
    define('DISALLOW_FILE_MODS', true);
}

/**
 * Set WP_ENVIRONMENT_TYPE according to the Pantheon Environment
 */
if (getenv('WP_ENVIRONMENT_TYPE') === false) {
    switch ($_ENV['PANTHEON_ENVIRONMENT']) {
        case 'live':
            putenv('WP_ENVIRONMENT_TYPE=production');
            break;
        case 'test':
            putenv('WP_ENVIRONMENT_TYPE=staging');
            break;
        default:
            putenv('WP_ENVIRONMENT_TYPE=development');
            break;
    }
}

if ( ! defined('PANTHEON_HOSTNAME' ) ) {
    $site_name = $_ENV['PANTHEON_SITE_NAME'];
    $hostname = isset( $_SERVER['HTTP_HOST'] ) ? $_SERVER['HTTP_HOST'] : $_ENV['PANTHEON_ENVIRONMENT'] . "-{$site_name}.pantheonsite.io" ;
    $hostname = isset( $_ENV['LANDO'] ) ? "{$site_name}.lndo.site" : $hostname;
    define( 'PANTHEON_HOSTNAME', $hostname );
}

/** Disable wp-cron.php from running on every page load and rely on
 *  Pantheon to run cron via wp-cli */
$network = isset($_ENV["FRAMEWORK"]) && $_ENV["FRAMEWORK"] === "wordpress_network";
if ( ! defined( 'DISABLE_WP_CRON' ) && $network === false) {
	define( 'DISABLE_WP_CRON', true );
}
```

### pantheon.upstream.yml

This file configures the Pantheon platform infrastructure. For a GitHub-connected site, you may alternatively use `pantheon.yml` (same format).

```yaml
api_version: 1
php_version: 8.2
database:
  version: 10.4
enforce_https: transitional
protected_web_paths:
  - /private/
  - /wp-content/uploads/private/
  - /xmlrpc.php
```

| Setting | Purpose |
|---|---|
| `api_version` | Pantheon config API version (always `1`) |
| `php_version` | PHP runtime version |
| `database.version` | MariaDB version |
| `enforce_https` | HTTPS enforcement mode (`transitional` or `full`) |
| `protected_web_paths` | Paths blocked from public web access |

### .gitignore

WordPress on Pantheon commits the entire codebase to Git. The `.gitignore` excludes user uploads, local configuration, and runtime-generated files.

```gitignore
# WordPress #
wp-config-local.php
wp-cli.local.yml
wp-content/uploads
wp-content/blogs.dir/
wp-content/upgrade/
wp-content/backup-db/
wp-content/updraft/
wp-content/backupwordpress-*/
wp-content/managewp/backups/
wp-content/advanced-cache.php
wp-content/wp-cache-config.php
sitemap.xml
sitemap.xml.gz

wp-content/cache/
wp-content/backups/

# Avoid accidental modification of pantheon.upstream.yml in sites
# created from this upstream
pantheon.upstream.yml

# Packages #
*.7z
*.dmg
*.gz
*.bz2
*.iso
*.jar
*.rar
*.tar
*.zip
*.tgz
!wp-includes/**/*.gz

# Logs and databases #
*.log
*.sql

# OS generated files #
.DS_Store*
ehthumbs.db
Thumbs.db
._*

# Vim generated files #
*.un~

# SASS #
.sass-cache
```

**Key rules:**

- `wp-config-local.php` — local dev config must never be committed
- `wp-content/uploads` — user uploads are managed by Pantheon's filesystem, not Git
- `!wp-includes/**/*.gz` — exception to allow gzipped assets in WordPress core

### wp-config-local-sample.php (Optional)

A template that developers copy to `wp-config-local.php` (which is gitignored) for local development. This file must NOT include `wp-settings.php` — that is handled by `wp-config.php` after loading the local config.

```php
<?php
define( 'DB_NAME', 'database_name' );
define( 'DB_USER', 'database_username' );
define( 'DB_PASSWORD', 'database_password' );
define( 'DB_HOST', 'database_host' );
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

define( 'AUTH_KEY', 'put your unique phrase here' );
define( 'SECURE_AUTH_KEY', 'put your unique phrase here' );
define( 'LOGGED_IN_KEY', 'put your unique phrase here' );
define( 'NONCE_KEY', 'put your unique phrase here' );
define( 'AUTH_SALT', 'put your unique phrase here' );
define( 'SECURE_AUTH_SALT', 'put your unique phrase here' );
define( 'LOGGED_IN_SALT', 'put your unique phrase here' );
define( 'NONCE_SALT', 'put your unique phrase here' );

define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', true );

define( 'WP_HOME', '<YOUR LOCAL DOMAIN>' );
define( 'WP_SITEURL', '<YOUR LOCAL DOMAIN>' );

define( 'WP_AUTO_UPDATE_CORE', false );
```

## Must-Use Plugins

WordPress on Pantheon requires a `wp-content/mu-plugins/` directory containing the Pantheon MU-plugin. This provides:

- **Page cache integration** with Pantheon's Varnish/edge cache layer
- **Site health checks** specific to Pantheon
- **Update notices** customized for the Pantheon workflow
- **Login form modifications** (adds a "Return to Pantheon" button)
- **WP-CLI integration** for Pantheon-specific CLI commands
- **Multisite support**
- **Filesystem method** set to `direct`
- **Plugin compatibility layer** with automatic fixes for 15+ popular plugins

The `loader.php` file is the entry point that loads the `pantheon-mu-plugin/pantheon.php` plugin from its subdirectory.

<Alert title="Note" type="info">

The MU-plugin only activates its features when `$_ENV['PANTHEON_ENVIRONMENT']` is set.

</Alert>

## Checklist

Use this checklist to verify your WordPress repository is ready for Pantheon's GitHub integration:

- [ ] `wp-config.php` uses the three-way conditional pattern (Pantheon → local → fallback)
- [ ] `wp-config-pantheon.php` exists at the repository root with environment-variable-based configuration
- [ ] `pantheon.upstream.yml` (or `pantheon.yml`) exists with `api_version`, `php_version`, and `database.version`
- [ ] `wp-content/mu-plugins/loader.php` exists and loads the Pantheon MU-plugin
- [ ] `wp-content/mu-plugins/pantheon-mu-plugin/` directory is present with the full plugin
- [ ] `.gitignore` excludes `wp-config-local.php`, `wp-content/uploads`, and runtime paths
- [ ] WordPress core files (`wp-admin/`, `wp-includes/`, root PHP files) are committed and unmodified
- [ ] `wp-content/uploads/` is NOT committed
