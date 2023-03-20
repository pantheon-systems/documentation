---
title: Pantheon Front-End Sites
subtitle: Considerations
description: Components needed to get started with a Front-End Site.
tags: [webops, workflow, decoupled]
contributors: [joa-pan, joa-pan, backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/overview/considerations
anchorid: considerations
reviewed: "2022-08-11"
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

Review this section carefully to ensure your system has the correct components to deploy a Pantheon Front-End Site.

## Components for Pantheon Front-End Sites

### General Requirements

* You have the decoupled offering enabled in your dashboard.
* You are using [Visual Studio Code (VS Code)](https://code.visualstudio.com/)
  * Other IDEs can be used, but our project ships with suggested plugins and example settings for VSCode.

### Backend Requirements

The following components are needed to configure your backend, especially if using the starter kits for Pantheon Front-End Sites:

* Lando: An open source, cross-platform, local development environment, and DevOps tool built on Docker container technology.
     * Install the latest release of Lando. Lando ships with a recommended version of Docker Desktop if you do not already have it installed.

* The following tools are included in the [Lando VM](https://docs.lando.dev/getting-started/installation.html), but can be useful to have installed for use without Lando:
     * [PHP](https://www.php.net/) - An open-source, server-side programming language that can be used to create websites, applications, and more. It is a widely-used language that can be embedded in HTML. Install using Homebrew on Mac to not conflict with the PHP version that comes with your operating system.
     * [Composer](https://getcomposer.org/) - Composer is a tool for dependency management in PHP. It allows you to declare libraries for your project and manages them for you.
     * [Terminus](/terminus) - The command-line interface which provides advanced interaction with Pantheon. Terminus is needed to update build tools for a Front-End Site.

### Front-End Site Requirements

The following components are needed to configure your frontend project to use Pantheon's Front-End Sites:

* [Node.js](https://nodejs.org/en/)
  * Installing [nvm](https://heynode.com/tutorial/install-nodejs-locally-nvm/) using Homebrew is recommended for Mac users.

## Before You Use Pantheon Starter Kits

The following components are required to create and configure a new decoupled project using a Front-End Site starter kit:

* Install [Composer](https://getcomposer.org/download/) globally.
  * Composer is required for the CMS backends.

* Install [Terminus](/terminus/install) version 3.0.0 or higher.
    * You can also install the following plugins to improve your experience:
       * `terminus self:plugin:install terminus-build-tools-plugin`
       * `terminus self:plugin:install terminus-secrets-plugin`
       * Reload the terminus plugins: `terminus self:plugin:reload`
       * Clear cache for composer: `composer clear-cache`
       * Validate that the required plugins are installed: `terminus self:plugin:list`

* Create a Machine Token
    * [Generate a machine token](/machine-tokens#create-a-machine-token).
    * [Authenticate the token into Terminus](/machine-tokens#authenticate-into-terminus).

* Create [GitHub Personal Access Tokens](https://github.com/settings/tokens).

* Create [CircleCI Personal API Tokens](https://app.circleci.com/settings/user/tokens).


## Environment Variable Naming Restrictions

Variable names *can* include:

- Uppercase letters
- Numbers
- Underscores

Variable names *cannot* include:

- Special characters (other than underscores)
- Lowercase letters
- Commas
- Reserved words. Reserved words include:

    - PORT
    - K_SERVICE
    - K_REVISION
    - K_CONFIGURATION
    - CLOUD_RUN_JOB
    - CLOUD_RUN_EXECUTION
    - CLOUD_RUN_TASK_INDEX
    - CLOUD_RUN_TASK_ATTEMPT
    - CLOUD_RUN_TASK_COUNT
    - PANTHEON_*

## Site Naming Restrictions

Site names *cannot* include:

- Periods
- Underscores

## Pantheon Product and Features Considerations

Front-End Sites will not work with all products and features on our platform.

Pantheon Front-End Sites are not compatible with the following Pantheon products:

* [Autopilot](https://pantheon.io/autopilot)
* [AGCDN](https://pantheon.io/product/advanced-global-cdn)

The following features are currently not supported with Pantheon Front-End Sites:

* New Relic
* Object Cache
* Pantheon Search (Solr)
* Automated, one-click core updates
* Role-based access (RBAC)
* Automated backup and retention
* Anti-malware
* Deployed patches and updates
* SOC-2 Type 2 Audit
* Network security/intrusion prevention
* Self-service domain management
* Active purging
* Supporting organizations
* Multizone failover
* Multiregion failover
* Log forwarding
