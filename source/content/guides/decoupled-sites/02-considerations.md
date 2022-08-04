---
title: Pantheon Decoupled
subtitle: Considerations
description: Will add content.
categories: [platform]
tags: [webops, workflow, decoupled]
contributors: [joa-pan]
type: guide
layout: guide
showtoc: true
anchorid: considerations
permalink: docs/guides/decoupled-sites/considerations/
editpath: decoupled-sites/02-considerations.md
reviewed: "2022-07-31"
---

You need to ensure you system has the correct components to use Pantheon Decoupled. 

## Components for Pantheon Decoupled

The following components are needed to run Pantheon Decoupled: 

* NodeJS: Installing NVM using Homebrew is recommeded for Mac users.

* Lando: Install the latest release of Lando. Lando ships with a recommended version of Docker Desktop if you do not already have it installed.

* The followig are recommended when using Pantheon Decoupled:

  * VS Code - Other IDEs can be used, but our projects ship with suggested plugins and example settings for VSCode.

* Optionally, the following tools are included in the Lando VM, but can be useful to have installed for use without Lando:

  * PHP - Install using Homebrew on Mac to not conflict with the PHP version that comes with your operating system.

  * Composer - Install composer globally.

  * Terminus - Terminus is needed to update build tools for Pantheon Decoupled.


### Before You Begin

To create a new project using a Pantheon Decoupled starter kit the following components are needed:

* Composer is required for the CMS backends
  * [Install Globally](https://getcomposer.org/download/)

* [Install Terminus](https://pantheon.io/docs/terminus/install) version 3.0.0 or higher
  * You can also install the following plugins:
    * `terminus self:plugin:install terminus-build-tools-plugin`
    * `terminus self:plugin:install terminus-power-tools`
    * `terminus self:plugin:install terminus-secrets-plugin`
    * Reload the terminus plugins: `terminus self:plugin:reload`
    * Clear cache for composer: `composer clear-cache`
    * Validate that the required plugins are installed: `terminus self:plugin:list`

* Machine Token:[Generate machine token](https://pantheon.io/docs/machine-tokens#create-a-machine-token) and [Authenticate into Terminus](https://pantheon.io/docs/machine-tokens#authenticate-into-terminus)

* Create [Github Personal access tokens](https://github.com/settings/tokens)

* Create [CircleCI Personal API Tokens](https://app.circleci.com/settings/user/tokens)
