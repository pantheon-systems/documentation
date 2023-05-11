---
title: Pantheon Front-End Sites
subtitle: Requirements and Considerations
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

## General Requirements

- You have the Front-End Sites tab enabled in your dashboard.
- You are using [Visual Studio Code (VS Code)](https://code.visualstudio.com/)
  - Other IDEs can be used, but our project ships with suggested plugins and example settings for VSCode.

<Alert title="Not what you're looking for?" type="success" icon="leaf">

Check out the [Front-End Sites landing page](/guides/decoupled/) to access all documentation for Front-End Sites.

</Alert>

## Backend Requirements

The following components are required for your backend, especially if using the starter kits for Pantheon Front-End Sites:

- Lando: An open source, cross-platform, local development environment, and DevOps tool built on Docker container technology.
     - Install the latest release of Lando. Lando ships with a recommended version of Docker Desktop if you do not already have it installed.

- The following tools are included in the [Lando VM](https://docs.lando.dev/getting-started/installation.html), but can be useful to have installed for use without Lando:
     - [PHP](https://www.php.net/) - An open-source, server-side programming language that can be used to create websites, applications, and more. It is a widely-used language that can be embedded in HTML. Install using Homebrew on Mac to not conflict with the PHP version that comes with your operating system.
     - [Composer](https://getcomposer.org/) - Composer is a tool for dependency management in PHP. It allows you to declare libraries for your project and manages them for you.
     - [Terminus](/terminus) - The command-line interface which provides advanced interaction with Pantheon. Terminus is needed to update build tools for a Front-End Site.

## Frontend Requirements

The following components are required for your frontend project to use Pantheon's Front-End Sites:

- [Node.js](https://nodejs.org/en/)
  - Supported Node.js versions: 14, 16, 18.
  - Installing [nvm](https://heynode.com/tutorial/install-nodejs-locally-nvm/) using Homebrew is recommended for Mac users.

## Frontend Frameworks

Pantheon Front-End Sites Early Access (EA) program currently supports Gatsby and Next.js as frontend frameworks. Additional frameworks will be added to our official support list over the coming months.

You can use frontend frameworks other than Gatsby and Next.js, however the process requires manual configuration. Refer to [Use a Non-official Framework](/guides/decoupled/no-starter-kit/any-framework) for specific instructions.

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

Pantheon Front-End Sites are not compatible with the following Pantheon products:

- [Autopilot](https://pantheon.io/autopilot)

The following features are currently not supported with Pantheon Front-End Sites:

- New Relic
- Object Cache
- Pantheon Search (Solr)
- Automated, one-click core updates
- Role-based access (RBAC)
- Automated backup and retention
- Anti-malware
- Deployed patches and updates
- SOC-2 Type 2 Audit
- Network security/intrusion prevention
- Self-service domain management
- Active purging
- Supporting organizations
- Multizone failover
- Multiregion failover
- Log forwarding

## Stable URLs

You can establish FQDN domains in Front-End Site environments using stable URLs.

An environment relates to every code change made against the Git repository that triggers a build. This build generates an internet-ready site.

Code change events that trigger a build include:

- Push to branches
- Opened pull requests

<Alert title="Note" type="info">

Pull requests from a Multidev branch that are made against the upstream will trigger double builds.

</Alert>

### Types of Environments

- **Production environment**
    - The production environment is the default branch of the repository
    - This environment corresponds to the following stable URL pattern: `live-[site-name].appa.pantheon.site`

- **Multidev environment (based on integration branches)**
    - Multidev environments are based on branches belonging to the upstream repository. This branch will have the prefix `multi-` in the branch name.
    - This environment has the following stable URL pattern: `[branch-name]-[site-name].appa.pantheon.site`

- **Multidev environment (based on pull requests)**
    - This Multidev environment is built from all opened pull requests against the upstream repository.
    - This environment has the following stable URL pattern: `pr-[pr-number]-[site-name].appa.pantheon.site`


### Stable URLs Template

| Environment                       | Name            |  FQDN      |
| -----------                       | -----------     | ---------- |
| Production                        | `live `         | `live-[site-name].appa.pantheon.site`|
| Multidev (based on branches)      | `branch-name`   | `[branch-name]-[site-name].appa.pantheon.site`|
| Multidev (based on pull requests) | `pr-*`          | `pr-[pr-number]-[site-name].appa.pantheon.site`|


## Front-End Sites Multidev Development Workflow

The Front-End Sites Multidev workflow is outlined below:

- **Code Push:** The external Git provider controls code posts and deployments. Code pushed to the main branch is built and deployed in your Live environment. Code pushed to any other branch generates a new Multidev environment. Updates to existing branches result in the corresponding environment being updated.

- **Pull Request:** The Multidev environment is stood up and the preview and backend URL are displayed in GitHub on the PR, on a GitHub deployment, and also in the Front-End Sites Overview section of the dashboard. The build details for a PR are also be linked to GitHub.

## Static Site Indexing

We recommend that you use proxy search requests to [Solr](/solr) instances on their backends. We also recommend that you use statically compiled search engines.

## More Resources

- [Multidev](/guides/multidev)
- [Use a Non-official Front-End Sites Framework](/guides/decoupled/no-starter-kit/any-framework)