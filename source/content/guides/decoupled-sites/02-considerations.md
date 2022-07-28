---
title: Pantheon Decoupled
subtitle: 
description: 
categories: [platform]
tags: [webops, workflow, decoupled]
contributors: [joa-pan]
reviewed: "2022-07-31"
layout: guide
showtoc: true
permalink: docs/guides/decoupled-sites/considerations
anchorid: considerations
---
The following components are needed for Pantheon Decoupled: 

* NodeJS
    We recommend installing NVM using Homebrew if you are using a Mac

* Lando

Install the latest release of Lando. Lando ships with a recommended version of Docker Desktop if you do not already have it installed.

Recommended:

VS Code - Other IDEs can be used, but our projects ship with suggested plugins an example settings for VSCode.

Optional - These tools are all included in the Lando VM, but can be useful to have installed for use without Lando.

PHP - we recommend installing via homebrew on Mac to not conflict with the OS PHP version.

Composer - follow instructions to install composer globally.

Terminus- 

# Creating a New Project

## Prerequisites

- Composer (required for CMS backends): [Install Globally](https://getcomposer.org/download/)
- [Generate machine token](https://pantheon.io/docs/machine-tokens#create-a-machine-token) & [Authenticate into Terminus](https://pantheon.io/docs/machine-tokens#authenticate-into-terminus)
- [Install Terminus](https://pantheon.io/docs/terminus/install) (3.0.0 above required)
- Also install the following plugins:
  - `terminus self:plugin:install terminus-build-tools-plugin`
  - `terminus self:plugin:install terminus-power-tools`
  - `terminus self:plugin:install terminus-secrets-plugin`
  - Reload the terminus plugins: `terminus self:plugin:reload`
  - Clear cache for composer: `composer clear-cache`
  - Validate that the required plugins are installed: `terminus self:plugin:list`
- Create [Github Personal access tokens](https://github.com/settings/tokens)
- Create [CircleCI Personal API Tokens](https://app.circleci.com/settings/user/tokens)

## Best Practices

