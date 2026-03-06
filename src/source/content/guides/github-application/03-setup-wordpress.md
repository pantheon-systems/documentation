---
title: GitHub Application (Private Beta)
subtitle: Setup WordPress
description: Configure a WordPress GitHub repository for Pantheon's GitHub integration with the required file structure and platform settings.
tags: [continuous-integration, workflow, wordpress]
contributors: [duncanschouten,jazzs3quence]
contenttype: [guide]
showtoc: true
innav: [true]
categories: [automate, workflows]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
reviewed: "2026-03-03"
permalink: docs/guides/github-application/setup-wordpress
---

This page describes how a WordPress repository configured for Pantheon differs from a standard WordPress installation. Use it as a reference when preparing your GitHub-hosted WordPress repository.

## Requirements

Before you begin, make sure you have:

- A Pantheon account with GitHub integration access enabled
- A GitHub repository
- Familiarity with Git and your CMS's configuration

## Summary of Differences

A Pantheon WordPress repository is a complete WordPress installation with six categories of changes from a vanilla WordPress download:

<TabList>

<Tab title="WordPress">

| Component | Standard WordPress | Pantheon WordPress |
|---|---|---|
| `wp-config.php` | Single-environment config with hardcoded credentials | Multi-environment config with conditional includes |
| `wp-config-pantheon.php` | Does not exist | Required — reads credentials from Pantheon environment variables |
| `wp-config-local-sample.php` | Does not exist | Optional — template for local development |
| `pantheon.upstream.yml` | Does not exist | Required — platform infrastructure config |
| `.gitignore` | Not included | Required — excludes uploads, local config, and runtime files |
| `wp-content/mu-plugins/` | Empty or does not exist | Required — Pantheon must-use plugin and loader |

All other WordPress core files (`wp-admin/`, `wp-includes/`, root PHP files, default themes, default plugins) are identical to a standard WordPress installation and should be committed to your repository unmodified.

</Tab>

<Tab title="WordPress (Composer Managed)">

Pantheon's Composer-based WordPress upstream is based on [Roots Bedrock](https://roots.io/bedrock/). If you are using this upstream, your repository will differ more significantly from a standard WordPress installation.

| Standard WordPress | Pantheon WordPress (Composer Managed) | Description |
|---|---|---|
| `wp-config.php` | `config/application.php` | Multi-environment config with conditional includes |
| `wp-config-pantheon.php` | `config/application.pantheon.php` | Required — reads credentials from Pantheon environment variables |
| Does not exist | `pantheon.upstream.yml` | Required — platform infrastructure config |
| Not included | `.gitignore` | Required — excludes uploads, local config, and runtime files |
| `wp-content/mu-plugins/` | `web/app/mu-plugins/` | Required — Must-use plugins, including [Pantheon MU Plugin](https://github.com/pantheon-systems/pantheon-mu-plugin) |

All WordPress core files are located in `web/wp/` and are not committed to the repository (managed by Composer). Application files (plugins, themes, mu-plugins) are located in `web/app/` and are committed to the repository unless they are also managed by Composer. We recommend ignoring third-party plugins and themes that are managed by Composer. 

For more information about WordPress (Composer Managed), see the [WordPress (Composer Managed) documentation](/guides/integrated-composer/create#wordpress-with-integrated-composer-and-bedrock).

</Tab>

</TabList>

# Directory Structure

Items marked **(Pantheon)** are additions or modifications. Everything else is standard WordPress core.

<TabList>

<Tab title="WordPress">

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

</Tab>

<Tab title="WordPress (Composer Managed)">

```
/                                        # Repository root (not document root)
├── .gitignore                           # (Pantheon) Custom gitignore
├── composer.json                        # (Pantheon) Composer config
├── composer.lock                        # (Pantheon) Composer lock file
├── config/
│   ├── application.php                   # (Pantheon) Modified — multi-environment
│   └── application.pantheon.php          # (Pantheon) New — platform settings
├── pantheon.upstream.yml                # (Pantheon) Platform config
├── web/
│   ├── app/
│   │   ├── mu-plugins/                  # (Pantheon) Must-use plugins
│   │   │   └── pantheon-mu-plugin/      # Pantheon integration plugin
│   │   │       └── pantheon.php
│   │   ├── plugins/                     # Custom and/or Composer-managed plugins
│   │   └── themes/                      # Custom and/or Composer-managed themes
│   ├── wp/                              # WordPress core (not committed)
│   ├── index.php                        # Standard WP
│   └── [other standard WP root files]
```

</Tab>

</TabList>

## Modified Files

<TabList>

<Tab title="WordPress">

### `wp-config.php`

The Pantheon version replaces hardcoded database credentials with a three-way conditional that selects the appropriate configuration source at runtime.

**How it works:**
	
1. If `$_ENV['PANTHEON_ENVIRONMENT']` is set and `wp-config-pantheon.php` exists, load Pantheon settings.
2. Otherwise, if `wp-config-local.php` exists, load local development settings.
3. Otherwise, fall back to placeholder values.

Source: [wp-config.php](https://github.com/pantheon-systems/WordPress/blob/default/wp-config.php)

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

Source: [wp-config-pantheon.php](https://github.com/pantheon-systems/WordPress/blob/default/wp-config-pantheon.php)

### `.gitignore`

WordPress on Pantheon commits the entire codebase to Git. The `.gitignore` excludes user uploads, local configuration, and runtime-generated files.

**Key rules:**

- `wp-config-local.php` — local dev config must never be committed
- `wp-content/uploads` — user uploads are managed by Pantheon's filesystem, not Git
- `!wp-includes/**/*.gz` — exception to allow gzipped assets in WordPress core

Source: [example `.gitignore`](https://github.com/pantheon-systems/WordPress/blob/default/.gitignore)

### `wp-config-local-sample.php` (Optional)

A template that developers copy to `wp-config-local.php` (which is gitignored) for local development. This file must NOT include `wp-settings.php` — that is handled by `wp-config.php` after loading the local config.

Source: [wp-config-local-sample.php](https://github.com/pantheon-systems/WordPress/blob/default/wp-config-local-sample.php)

</Tab>

<Tab title="WordPress (Composer Managed)">

## `.env.pantheon`

 Uses Dotenv to set required environment variables and load .env file in root. Used in `config/application.php` to load Pantheon environment variables.
 
Source: [`.env.pantheon`](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/.env.pantheon)

## `composer.json`

The `composer.json` file defines the project as a Composer-managed WordPress installation based on the Bedrock structure. It includes Pantheon-specific configuration such as the `installer-paths` for plugins and themes, and the `pantheon-systems/pantheon-mu-plugin`.

It is expected that you will update this file from the original and Pantheon does not maintain it for you.

Source: [`composer.json`](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/composer.json)

## `web/wp-config.php`

The base `wp-config.php` file for the site. All configuration is handled through the `config/application.php` and `config/application.pantheon.php` files, which are loaded by `wp-config.php`.

Do not modify this file.

Source: [web/wp-config.php](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/web/wp-config.php)

## `web/index.php`

The main `index.php` file for WordPress. Loads WordPress core from `/web/wp/`. Required by WordPress. Do not modify this file.

Source: [web/index.php](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/web/index.php)

## `config/application.php`

The main configuration file for the site. This file is responsible for loading your WordPress configuration based on the environment. It loads `application.pantheon.php`.

Source: [config/application.php](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/config/application.php)

## `config/application.pantheon.php`

This file is the core Pantheon platform integration,  loaded by `application.php`. Defines `WP_HOME`, `WP_ENVIRONMENT_TYPE`, `PANTHEON_HOSTNAME` and cookie-related constants based on Pantheon environment variables.

Source: [config/application.pantheon.php](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/config/application.pantheon.php)

</Tab>

</TabList>

### `pantheon.upstream.yml`

This file configures the Pantheon platform infrastructure. For a GitHub-connected site, you may alternatively use `pantheon.yml` (same format).

| Setting | Purpose |
|---|---|
| `api_version` | Pantheon config API version (always `1`) |
| `php_version` | PHP runtime version |
| `database.version` | MariaDB version |
| `enforce_https` | HTTPS enforcement mode (`transitional` or `full`) |
| `protected_web_paths` | Paths blocked from public web access |

Source: [`pantheon.upstream.yml`](https://github.com/pantheon-systems/WordPress/blob/default/pantheon.upstream.yml)

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

Source: [Pantheon MU Plugin](https://github.com/pantheon-systems/pantheon-mu-plugin)
`loader.php` source: [loader.php](https://github.com/pantheon-systems/WordPress/blob/default/wp-content/mu-plugins/loader.php)

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