---
title: Build Tools
subtitle: Introduction
description: Describes the Build Tools project, its purpose, and workflow
tags: [build-tools, automate, composer]
contributors: [greg-1-anderson, stevector, ataylorme, rachelwhitton]
type: guide
anchorid: build-tools
permalink: docs/guides/build-tools/
editpath: build-tools/01-introduction.md
image: buildToolsGuide-thumb
---

## What Is Build Tools?

Build Tools is a project encompassing multiple Pantheon maintained repositories that work together to connect the tools and automation necessary for an advanced [WebOps workflow](https://pantheon.io/webops) to Pantheon. The main goals of the Build Tools project are:

- **Ease the creation of new projects making use of an external Git provider, a Continuous Integration service, and Pantheon.**
This is primarily done through the [`build:project:create` commands](#buildprojectcreate), which scaffolds new projects from a [template repository](#template-repositories) and performs one-time setup, such as configuring SSH keys and environment variables, needed to connect an external Git provider and Continuous Integration service with Pantheon. To use your own template repository see [Customization](#customization).

- **Add additional commands to Terminus to make tasks common in an automated workflow easier.**
See [Commands](#commands) and [Build Tools Command Examples](#build-tools-command-examples) for details.

### Pantheon Build Tools Repositories
The repositories that are a part of the Build Tools project are:

- [**Terminus Build Tools Plugin**](https://github.com/pantheon-systems/terminus-build-tools-plugin) - a package extending the Pantheon's Terminus command-line interface that contains a collection of commands useful for projects making use of an external Git provider and Continuous Integration (CI) along with Pantheon.
- **Template Repositories** -  repositories for [WordPress](https://github.com/pantheon-systems/example-wordpress-composer) and [Drupal 8](https://github.com/pantheon-systems/example-drops-8-composer) that include an opinionated set of workflows and deployment scripts. These are templates/examples, not framework. They are meant to be a one-time starting point for new projects and customized as needed.
  - By default, when creating a new Build Tools project one of these example repositories is used as a starting point. Custom starters are also supported.
- [**Build Tools CI Dockerfile**](https://github.com/pantheon-systems/docker-build-tools-ci/) - A [`Dockerfile`, which is deployed to quay.io](https://quay.io/repository/pantheon-public/build-tools-ci?tab=tags), for use in Continuous Integration environments. It contains common Pantheon tools, such as Terminus and the Terminus Build Tools plugin.

These tools work together to help you create and manage your own projects that follow the Build Tools workflow.

### A Build Tools Project's Components
There are 3 main components to a project created with Build Tools:

1. Install [Composer](https://getcomposer.org).
2. Install the most recent release of [Terminus](/terminus):

The supported Git provider and Continuous Integration service combinations are:
- [<CustomIcon icon="github" /> GitHub](https://github.com) and [<CustomIcon icon="circleci" /> CircleCI](https://circleci.com/)
- [<CustomIcon icon="gitlab" /> GitLab](https://about.gitlab.com) with [<CustomIcon icon="gitlab ci/cd" /> GitLabCI](https://about.gitlab.com/product/continuous-integration/)
- [<CustomIcon icon="bitbucket" /> BitBucket](https://bitbucket.org/product/) with [<CustomIcon icon="bitbucket pipelines" /> BitBucket Pipelines](https://bitbucket.org/product/features/pipelines)

3. [Add an SSH key](/ssh-keys) within your User Dashboard to enable passwordless access and avoid authentication prompts. Otherwise, provide your Pantheon Dashboard credentials when prompted.

<Enablement title="Automation Training" link="https://pantheon.io/agencies/learn-pantheon?docs">

Master Composer, automated testing, and other advanced workflow concepts with help from our experts. Pantheon delivers custom workshops to help teams master our platform and improve their [WebOps](https://pantheon.io/webops) workflow.

</Enablement>

## Build Tools Workflow
Build Tools projects extend the [Pantheon workflow](https://pantheon.io/docs/pantheon-workflow) by adding an external Git provider and a Continuous Integration (CI) service.

In this workflow, only files unique to the project are tracked as part of the external Git repository. The CI service then builds a production artifact, deploys the fully-built site to Pantheon, and runs a suite of automated tests.

This is quite different than working with the Pantheon-hosted Git repository for each site, where all code must be comitted.

<BuildToolsStackSelectToolbar />

<BuildToolsWorkflowDiagram />

## Is Build Tools The Right Tool?
It is easy to create a Build Tools project but you must also understand what all of the components are doing and how they work together. This is not a "set it and forget it workflow", but rather an entry point for projects requiring automated workflows.

Build Tools project have many benefits. However, there is also added complexity and maintenance. You, and your team, must decide when the benefits outweight the additional complexity and maintenance.

In general, Build Tools is a good fit for a project if the project needs are complex enough to require a more complex workflow and you/your team are comfortable with command-line tools and bash scripts and wish to use Continuous Integration to automate the build, deploy and test of the project workflow.

<Alert title="Note" type="info">

Pantheon's [support team](/support) cannot troubleshoot issues with third-party services like GitHub or CircleCI.

If you need help configuring external systems, consider joining the [Community Forum](https://discuss.pantheon.io/) or posting in our [Pantheon Community Slack Instance](https://slackin.pantheon.io/) in the `#composer-workflow` channel.

</Alert>

### Ready To Create a Build Tools Project?

### Access Tokens (Optional)

The Build Tools plugin will prompt you to create access tokens for both [GitHub](https://github.com/settings/tokens) and [CircleCI](https://circleci.com/account/api), which are stored as environment variables. The GitHub token needs the **repo** (required) and **delete-repo** (optional) scopes. You may optionally generate these tokens ahead of time and manually export them to the local variables `GITHUB_TOKEN` and `CIRCLE_TOKEN`, respectively:

```bash
export GITHUB_TOKEN=yourGitHubToken
export CIRCLE_TOKEN=yourCircleCIToken
```

If you need to replace a token, navigate to your [project settings page in CircleCI](https://circleci.com/docs/2.0/env-vars/#adding-environment-variables-in-the-app).

<Accordion title="Build Tools Changelog" id="changelog" icon="newspaper">

<BuildToolsChangelog />

</Accordion>
