---
title: Pantheon Front-End Sites
subtitle: Considerations
description: Components needed to get started with a Front-End Site.
categories: [platform]
tags: [webops, workflow, decoupled]
contributors: [joa-pan, joa-pan, backlineint, cobypear, hckia]
type: guide
layout: guide
showtoc: true
anchorid: considerations
permalink: docs/guides/decoupled-sites/considerations/
editpath: decoupled-sites/02-considerations.md
reviewed: "2022-08-11"
---

Ensure your system has the correct components to deploy a Pantheon Front-End Site.

## Components for Pantheon Front-End Sites

### General Requirements

* You have the decoupled offering enabled in your dashboard.
* You are using [Visual Studio Code (VS Code)](https://code.visualstudio.com/)
  * Other IDEs can be used, but our project ships with suggested plugins and example settings for VSCode.

### Backend Requirements

The following components are needed to configure your backend, especially if using the starter kits for Pantheon Front-End Sites:

* Lando: An open source, cross-platform, local development environment and DevOps tool built on Docker container technology.
     * Install the latest release of Lando. Lando ships with a recommended version of Docker Desktop if you do not already have it installed.

* The following tools are included in the [Lando VM](https://docs.lando.dev/getting-started/installation.html), but can be useful to have installed for use without Lando:
     * [PHP](https://www.php.net/) - An open-source, server-side programming language that can be used to create websites, applications, and more. It is a widely-used language that can be embedded in HTML. Install using Homebrew on Mac to not conflict with the PHP version that comes with your operating system.
     * [Composer](https://getcomposer.org/) - Composer is a tool for dependency management in PHP. It allows you to declare libraries for your project and manages them for you.
     * [Terminus](/terminus) - The command-line interface which provides advanced interaction with Pantheon. Terminus is needed to update build tools for a Front-End Site.

### Frontend Requirements

The following components are needed to configure your frontend for the decoupled offering:

* [Node.js](https://nodejs.org/en/)
  * Installing [nvm](https://heynode.com/tutorial/install-nodejs-locally-nvm/) using Homebrew is recommended for Mac users.

## Before You Use the Decoupled Starter Kit

To create and configure a new decoupled project using a Front-End Site starter kit, the following components are required:

* Install [Composer](https://getcomposer.org/download/) globally.
  * Composer is required for the CMS backends.

* Install [Terminus](/terminus/install) version 3.0.0 or higher.
    * You can also install the following plugins to improve your experience:
       * `terminus self:plugin:install terminus-build-tools-plugin`
       * `terminus self:plugin:install terminus-power-tools`
       * `terminus self:plugin:install terminus-secrets-plugin`
       * Reload the terminus plugins: `terminus self:plugin:reload`
       * Clear cache for composer: `composer clear-cache`
       * Validate that the required plugins are installed: `terminus self:plugin:list`

* Create a Machine Token
    * [Generate a machine token](/machine-tokens#create-a-machine-token).
    * [Authenticate the token into Terminus](/machine-tokens#authenticate-into-terminus).

* Create [GitHub Personal Access Tokens](https://github.com/settings/tokens).

* Create [CircleCI Personal API Tokens](https://app.circleci.com/settings/user/tokens).


## Pantheon Product and Features Considerations

Front-End Sites will not work with all products and feautures on our platform.  

Pantheon Front-End Sites are not compatible with the following Pantheon products:

* [Autopilot](https://pantheon.io/autopilot)
* [AGCDN](https://pantheon.io/product/advanced-global-cdn)

The following features are currently not supported with Pantheon Front-End Sites:

* Self-service domain management
* Active Purging
* Role Based Access Control (RBAC)
* Supporting Orgs
* Multizone Failover
* New Relic 
* Log forwarding
* Object Cache (Redis)
