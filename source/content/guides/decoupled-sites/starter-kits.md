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
permalink: docs/guides/decoupled-sites/starter-kits
editpath: decoupled-sites/starter-kits.md
anchorid: starter-kits
---

# Creating a New CMS Backend for a Decoupled Frontend

You can create a decoupled site using a Pantheon starter kit. Choose from either a WordPress or Drupal CMS. 

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

## Installation

## Drupal installation 

<TabList>

<Tab title="Drupal Backend Installation" id="drupal-install" active={true}>

- Run the `terminus build:project:create` as follows:

  ```
  terminus build:project:create \
    --team='{My Team Name}' \
    --template-repository="git@github.com:pantheon-systems/decoupled-drupal-recommended.git" pantheon-systems/decoupled-drupal-recommended \
    --ci-template='git@github.com:pantheon-systems/advanced-ci-templates' \
    --visibility private {PROJECT_NAME} \
    --stability=dev \
    --profile="pantheon_decoupled_profile"
  ```

  Replace `{PROJECT_NAME}` with your project name - for example `decoupled-drupal`.

  Replace `'{My Team Name}'` with your team name - for example `My Agency`. This can also be omitted.

**Note:** This will result in a Github repository being created for this new codebase under the authenticated user's namespace (unless the `--org` option is used), a site being created on Pantheon and a CircleCI project being created for automated deployments.


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

  Replace `{PROJECT_NAME}` with a Project name for example `decoupled-wordpress`.

  Replace `{My Team Name}` with your team name - for example `My Agency`. This can also be omitted.

**Note:** This will result in a Github repository being created for this new codebase, a site being created on Pantheon and a CircleCI project being created for automated deployments.

</Tab>
</TabList>


## Additional Options

#### Installing with Umami Demo Data

This is can aonly be used on Drupal backend sites.

The installation command above will create a backend with limited example content. To instead create a site with Drupal's Umami demo data set, change the profile flag to:

`--profile="pantheon_decoupled_umami_demo"`

In your `terminus build:project:create` command.

#### Using Other Git Hosts or CI Services

Terminus build tools supports a number of other combinations of git hosts and CI services.

For example, to use GitHub actions as your CI service, you could add the following additional flag to your `terminus build:project:create` command:

`--ci=githubactions`

Other possible values are `circleci`, `gitlab-pipelines` and `bitbucket-pipelines`.

Note: if using Github Actions, your token should have the "workflow" scope.

For more information, consult the [available services section of the build tools documentation](https://github.com/pantheon-systems/terminus-build-tools-plugin#available-services).

#### Using a GitHub Organization

`--org="{My Organization Name}"`

If you would like the repo created to be under a GitHub organization instead of the authenticated user's namespace, you can use the `--org` option.

For information on additional options, consult the [command options section of the build tools documentation](https://github.com/pantheon-systems/terminus-build-tools-plugin#command-options).


# 

To start you will need to specify the GitHub account associated with your decoupled site. After you select the decoupled site option that best suits your needs, you will be prompted to connect your Git provider. 

Select the GitHub option and click Connect. A window for GitHub.com is displayed, and you are prompted “Where do you want to install Pantheon”. 

Select the repository that you will use to develop your decoupled site. A new page is displayed that confirms where Pantheon should be installed. 

3. Specify the permission configurations and click Install. Your GitHub repository is now connected and you can continue with decoupled site creation on the Pantheon dashboard. 

