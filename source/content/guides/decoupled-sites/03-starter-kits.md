---
title: Pantheon Decoupled
subtitle: Starter Kits
description: Use a Pantheon starter kit to configure a decoupled site backend.
categories: [platform]
tags: [webops, workflow, decoupled]
contributors: [joa-pan]
type: guide
layout: guide
showtoc: true
anchorid: starter-kits
permalink: docs/guides/decoupled-sites/starter-kits/
editpath: decoupled-sites/03-starter-kits.md
reviewed: "2022-07-31"
---

## Creating a New CMS Backend for a Decoupled Frontend

You can create a decoupled site using a Pantheon starter kit. Choose from either a WordPress or Drupal CMS. You can also create a site without any CMS. 


## Installation

<TabList>

<Tab title="Drupal Backend Installation" id="drupal-install" active={true}>

- Run the `terminus build:project:create` as follows:

  ```
  terminus build:project:create \
    --team='My Team Name}' \
    --template-repository="git@github.com:pantheon-systems/decoupled-drupal-recommended.git" pantheon-systems/decoupled-drupal-recommended \
    --ci-template='git@github.com:pantheon-systems/advanced-ci-templates' \
    --visibility private {PROJECT_NAME} \
    --stability=dev \
    --profile="pantheon_decoupled_profile"
  ```

  * Replace `<{PROJECT_NAME}>` with your project name, for example `decoupled-drupal`.

  * Replace `<'{My Team Name}'>` with your team name, for example `My Agency`. This can also be omitted.

**Note:** This will result in a GitHub repository created for this new codebase under the authenticated user's namespace (unless the `--org` option is used), a site created on Pantheon and a CircleCI project created for automated deployments.

</Tab>

<Tab title="WordPress Backend Installation" id="wordpress-install">

- Run the `terminus build:project:create` as follows:

  ```
  terminus build:project:create \
    --team='{My Team Name}' \
    --template-repository="git@github.com:pantheon-systems/decoupled-wordpress-recommended.git" \
    pantheon-systems/decoupled-wordpress-recommended \
    --ci-template='git@github.com:pantheon-systems/advanced-ci-templates' \
    --visibility private {PROJECT_NAME} \
    --stability=dev
  ```

  * Replace `{PROJECT_NAME}` with a Project name for example `decoupled-wordpress`.

  * Replace `{My Team Name}` with your team name - for example `My Agency`. This can also be omitted.

**Note:** This will result in a GitHub repository created for this new codebase, a site created on Pantheon and a CircleCI project created for automated deployments.

</Tab>
</TabList>


### Additional Options

#### Installing with Umami Demo Data

This is can only be used on Drupal backend sites.

The installation command above will create a backend with limited example content. To create a site with Drupal's Umami demo data set instead, change the profile flag in your `terminus build:project:create` command to:

`--profile="pantheon_decoupled_umami_demo"`

#### Using Other Git Hosts or CI Services

Terminus build tools supports a number of other combinations of Git hosts and CI services.

For example, to use GitHub actions as your CI service, you could add the following additional flag to your `terminus build:project:create` command:

`--ci=githubactions`

Other possible values are `circleci`, `gitlab-pipelines` and `bitbucket-pipelines`.

Note: if using Github Actions, your token should have the "workflow" scope.

For more information, consult the [available services section of the build tools documentation](https://github.com/pantheon-systems/terminus-build-tools-plugin#available-services).

#### Using a GitHub Organization

If you would like the repo created to be under a GitHub organization instead of the authenticated user's namespace, you can use the `--org` option:

`--org="{My Organization Name}"`

For information on additional options, consult the [command options section of the build tools documentation](https://github.com/pantheon-systems/terminus-build-tools-plugin#command-options).
