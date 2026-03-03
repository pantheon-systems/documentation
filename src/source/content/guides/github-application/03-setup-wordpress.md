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