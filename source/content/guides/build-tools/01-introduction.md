---
title: Build Tools
subtitle: Introduction
description: Describe the Build Tools project, it's purpose, and workflow
tags: [automate, composer]
contributors: [greg-1-anderson, stevector, ataylorme, rachelwhitton]
layout: guide
type: guide
anchorid: build-tools
buildtools: true
generator: pagination
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/
nexturl: guides/build-tools/create-project/
editpath: build-tools/01-introduction.md
image: buildToolsGuide-thumb
multidev: true
---

<Alert type="export" title="Notice">
Build Tools version <code class="language-sh">1.x</code> is only compatible with Terminus <code class="language-sh">1.x</code>, both of which are beyond end of life and no longer supported. If you are using Terminus Build Tools <code class="language-sh">1.x</code>, you should upgrade to version 2.
</Alert>

Build Tools is a package encompassing multiple Pantheon maintained repositories that work together to connect the tools and automation necessary for an advanced [WebOps workflow](https://pantheon.io/webops) to Pantheon. The main purposes of the Build Tools are to:

- **Ease the creation of new projects making use of an external Git provider, a Continuous Integration service, and Pantheon.**
This is primarily done through the [`build:project:create` commands](#buildprojectcreate), which scaffolds new projects from a [template repository](#template-repositories) and performs one-time setup, such as configuring SSH keys and environment variables, needed to connect an external Git provider and Continuous Integration service with Pantheon. To use your own template repository see [Customization](#customization).

- **Add additional commands to Terminus to make tasks common in an automated workflow easier.**
See [Commands](#commands) and [Build Tools Command Examples](#build-tools-command-examples) for details.


### A Build Tools Project's Components
There are 3 main components to a project created with Build Tools

<BuildTools />

<Enablement title="Automation Training" link="https://pantheon.io/agencies/learn-pantheon?docs">

Master Composer, automated testing, and other advanced workflow concepts with help from our experts. Pantheon delivers custom workshops to help development teams master the platform and improve internal WebOps.

</Enablement>

## Artifact Deployment
Only files unique to the project are tracked as part of the project's main "source" repository outside on Pantheon, which requires an abstraction layer to compile dependencies and deploy an entire "artifact" to the site repository on Pantheon. The abstraction layer is facilitated by the CI service. Are examples don't cover every possible service but the principles are the same for most continuous integration service providers.

Composer is used to fetch dependencies declared by the project as part of a CI build step. This ensures that the final composed build results are installed on Pantheon. Below is a diagram visualizing this workflow with GitHub and CircleCI:

![Artifact Deployment](../../../images/artifact-deployment.png)

<Accordion title="Pull Requests" id="understand-pr" icon="lightbulb">

One advantage of managing code this way is that it keeps the change sets (differences) for pull requests as small as possible. If a pull request upgrades several dependencies, only the dependency metadata file will change; the actual code changes in the upgraded dependencies themselves are not shown.

Pull requests (PRs) are a formalized way of reviewing and merging a proposed set of changes to the source repository. When one member of a team makes changes to a project, all of the files modified to produce the feature are committed to a separate Git branch, and that branch becomes the basis for the pull request. Git providers allow other team members to review all of the differences between the new files and their original versions, before merging the PR to accept changes.

</Accordion>

## Before You Begin

1. Install [Composer](https://getcomposer.org).
2. Install the most recent release of [Terminus](/terminus/):

    ```bash
    curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install
    ```

3. [Add an SSH key](/ssh-keys/) within your User Dashboard to enable passwordless access and avoid authentication prompts. Otherwise, provide your Pantheon Dashboard credentials when prompted.

4. [Generate a Pantheon machine token](https://dashboard.pantheon.io/machine-token/create), then authenticate Terminus:

      ```bash
      terminus auth:login --machine-token=<machine-token>
      ```

5. Create the `$HOME/.terminus/plugins` directory if it does not already exist:

      ```bash
      mkdir -p $HOME/.terminus/plugins
      ```

6. Install the [Terminus Composer Plugin](https://github.com/pantheon-systems/terminus-composer-plugin):

    ```bash
    composer create-project -n --no-dev -d $HOME/.terminus/plugins pantheon-systems/terminus-composer-plugin:~1
    ```

7. Install the [Terminus Drupal Console Plugin](https://github.com/pantheon-systems/terminus-drupal-console-plugin):

    ```bash
    composer create-project -n --no-dev -d $HOME/.terminus/plugins pantheon-systems/terminus-drupal-console-plugin:~1
    ```

8. Install the [Terminus Build Tools Plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin):

    ```bash
    composer create-project --no-dev -d $HOME/.terminus/plugins pantheon-systems/terminus-build-tools-plugin:^2
    ```

9. Optionally, [authorize CircleCI on GitHub](https://github.com/login/oauth/authorize?client_id=78a2ba87f071c28e65bb) if you plan to use those services.

    If you are redirected to the CircleCI homepage, you have already authorized the service for your GitHub account. Nice! Way to be ahead of the game.

<Alert title="Note" type="info">

Pantheon's [support team](/support/) cannot troubleshoot issues with third-party services like GitHub or CircleCI.

If you need help configuring external systems, consider joining the [Community Forum](https://discuss.pantheon.io/) or posting in our [Pantheon Community Slack Instance](https://slackin.pantheon.io/) in the `#composer-workflow` channel.

</Alert>