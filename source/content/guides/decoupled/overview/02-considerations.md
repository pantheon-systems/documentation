---
title: Pantheon Front-End Sites
subtitle: Considerations
description: Components needed to get started with a Front-End Site.
tags: [webops, workflow, decoupled]
contributors: [joa-pan, joa-pan, backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/overview/considerations
reviewed: "2023-03-23"
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


## Frontend Frameworks

Pantheon Decoupled Early Access (EA) program currently supports Gatsby and Next.js as frontend frameworks. Additional frameworks will be added to our official support list over the coming months.

You can use frontend frameworks other Gatsby and Next.js, however the process requires manual configuration. Refer to [Use a Non-official Framework](/guides/decoupled/no-starter-kit/any-framework) for specific instructions.

## Known Issues and Limitations

- Forks are not currently supported
- A repo cannot be empty or site creation will fail
- A repo cannot be connected to more than one Front-End Site
- There are known issues around disconnecting and reconnecting a repo
- There are known issues around the GitHub app and org level permissions
- The repository must have a `package.json` file
- The repository can have only one `lock` file

    <Alert title="Note" type="info">

    You cannot have a `package-lock.json` and `yarn.lock` file. You will receive an error message if you try to import a repository with both files.

    </Alert>

Refer to the [Known Issues and Troubleshooting](/guides/decoupled/overview/troubleshooting) section for more information.

## Environment Variable Naming Restrictions

<Partial file="decoupled-site-environment-variables.md" />

## Site Naming Restrictions

Site names *cannot* include:

- Periods
- Underscores

## Pantheon Product and Features Considerations

Front-End Sites will not work with all products and features on our platform.

Pantheon Front-End Sites are not compatible with the following Pantheon products:

* [Autopilot](https://pantheon.io/autopilot)

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

## Front-End Sites Multidev Development Workflow

Front-End Sites are compatible with Multidev. The Front-End Sites Multidev workflow is outlined below:

- The external Git provider controls code posts and deployments. Code pushed to the main branch is built and deployed in your Live environment. Code pushed to any other branch will generate a new MultiDev environment. Updates to existing branches will result in the corresponding environment being updated.

- On a pull request, the Multidev environment is stood up and the preview and backend URL are displayed in GitHub on the PR, on a GitHub deployment, and also in the Front-End Sites Overview section of the dashboard. The build details for a PR will also be linked to GitHub.

Refer to [Types of Environments](/guides/decoupled/overview/site#types-of-environments) for more information.

## Static Site Indexing

We recommend that you use proxy search requests to [Solr](/solr) instances on their backends. We also recommend that you use statically compiled search engines.