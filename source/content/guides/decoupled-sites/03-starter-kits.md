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
reviewed: "2022-08-11"
---

## Create the CMS Backend

You can create a decoupled site using a Pantheon starter kit. Choose from either a WordPress or Drupal CMS and connect it to the frontend application to create a site. The following configurations exist for the starter kit templates:

* [Drupal and Next.js](https://github.com/pantheon-systems/decoupled-drupal-recommended) - This configuration supports server-side rendering. 
* [WordPress and Gatsby](https://github.com/pantheon-systems/decoupled-wordpress-recommended) - This configuration supports static site generation. 


## Backend Installation and Configuration

<TabList>

<Tab title="Drupal Backend" id="drupal-install" active={true}>

- Run `terminus build:project:create`:

  ```
  terminus build:project:create \
    --team='{My Team Name}' \
    --template-repository="git@github.com:pantheon-systems/decoupled-drupal-recommended.git" pantheon-systems/decoupled-drupal-recommended \
    --ci-template='git@github.com:pantheon-systems/advanced-ci-templates' \
    --visibility private {PROJECT_NAME} \
    --stability=dev \
    --profile="pantheon_decoupled_profile"
  ```

  * Replace `{PROJECT_NAME}` with your project name, for example `decoupled-drupal`.

  * Replace `'{My Team Name}'` with your team name, for example `My Agency`. This can also be omitted.

      > This action will result in a GitHub repository created for this new codebase under the authenticated user's namespace (unless the `--org` option is used), a site created on Pantheon and a CircleCI project created for automated deployments.
   </Alert>

 </Tab>

<Tab title="WordPress Backend " id="wordpress-install">

- Run `terminus build:project:create`:

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

      > This will result in a GitHub repository created for this new codebase, a site created on Pantheon and a CircleCI project created for automated deployments.

</Tab>
</TabList>


### Additional Configuration Options

#### Installing with Umami Demo Data

 <Alert title="Note"  type="info" >
 The following configuration can only be used on Drupal backend sites.
 </Alert>

The installation command in the section above will create a backend with limited example content. If you would like to run the Umami Demo site, you will need to add the site configuration. 

To create a site with Drupal's Umami demo data, change the profile flag in the `terminus build:project:create` command to the following:

```
--profile="pantheon_decoupled_umami_demo"
```

#### Using Other Git Hosts or CI Services

Terminus build tools supports a number of other combinations of Git hosts and CI services.

For example, to use GitHub actions as your CI service, you could add the following additional flag to your `terminus build:project:create` command:

```
--ci=githubactions
```

Other possible values include:

* `circleci`
* `gitlab-pipelines`
* `bitbucket-pipelines`

If you are using GitHub Actions, your token should have the "workflow" scope.

For more information, refer to the [Available Services](https://github.com/pantheon-systems/terminus-build-tools-plugin#available-services) section or the BuiThank has ld Tools [documentation](https://pantheon.io/docs/guides/build-tools/). 

#### Using a GitHub Organization

If you would like the repo created to be under a GitHub organization instead of the authenticated user's namespace, you can use the `--org` option:

```
--org="{My Organization Name}"
```

For information on additional options, consult the [command options section of the build tools documentation](https://github.com/pantheon-systems/terminus-build-tools-plugin#command-options).

For information on additional options, refer to the [Command Options](https://github.com/pantheon-systems/terminus-build-tools-plugin#command-options) section or see our Build Tools [documentation](https://pantheon.io/docs/guides/build-tools/).
