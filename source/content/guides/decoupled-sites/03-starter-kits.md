---
title: Pantheon Front-End Sites
subtitle: Starter Kits
description: Use a Pantheon starter kit to configure a decoupled site backend.
categories: [platform]
tags: [webops, workflow, decoupled]
contributors: [joa-pan, joa-pan, backlineint, cobypear, hckia]
type: guide
layout: guide
showtoc: true
anchorid: starter-kits
permalink: docs/guides/decoupled-sites/starter-kits/
editpath: decoupled-sites/03-starter-kits.md
reviewed: "2022-09-19"
---

## Create the CMS Backend

You can create a Front-End Site by using a Pantheon starter kit. Choose either a WordPress or Drupal CMS and connect it to the frontend application to create a site. The following configurations exist for the starter kit templates:

* Drupal and Next.js
* WordPress and Next.js
* WordPress and Gatsby


## Backend Installation and Configuration

Choose from the following approaches to configure your backend:

* Dashboard Upstream: 
  *  Use this option if you prefer a more streamlined configuration; this is the Pantheon recommended option.
  
* Build Tools:
  * Use this option if testing is important to your team's workflow. You will not have to manually push changes to your Pantheon code repository.


<TabList>

<Tab title="Drupal Backend" id="drupal-install" active={true}>

#### Dashboard Upstream Install

Install the Drupal backend by using the Dashboard upstream.

Navigate to the Pantheon Dashboard to create a site from the [Decoupled Drupal Composer Managed upstream](https://dashboard.pantheon.io/sites/create?upstream_id=c76c0e51-ad85-41d7-b095-a98a75869760) 

Alternatively, you can use Terminus. Enter the following command to create a site with the Decoupled Drupal Composer Managed upstream.

```
  terminus site:create my-new-site "Describe Site" --org='My Team Name' c76c0e51-ad85-41d7-b095-a98a75869760
```
  * Replace `{My Team Name}` with your team name, for example `My Agency`. This can also be omitted.
  * Note that `c76c0e51-ad85-41d7-b095-a98a75869760` is the `upstream_id` for Decoupled Drupal Composer Managed.


#### Installing Using Build Tools

- Run `terminus build:project:create`:

  ```
  terminus build:project:create \
  --team='{My Team Name}' \
  --template-repository="git@github.com:pantheon-upstreams/decoupled-drupal-composer-managed.git" pantheon-upstreams/decoupled-drupal-composer-managed \
  --visibility private {PROJECT_NAME} \
  --profile="pantheon_decoupled_profile" \
  --stability=dev
  ```

  * Replace `{PROJECT_NAME}` with your project name, for example `decoupled-drupal`.

  * Replace `'{My Team Name}'` with your team name, for example `My Agency`. This can also be omitted.

This action will result in a GitHub repository created for this new codebase under the authenticated user's namespace (unless the `--org` option is used), a site created on Pantheon, and a CircleCI project created for automated deployments.

</Tab>

<Tab title="WordPress Backend" id="wordpress-install">
 
Create a [Decoupled WordPress Composer Managed](https://dashboard.pantheon.io/sites/create?upstream_id=c9f5e5c0-248f-4205-b63a-d2729572dd1f) upstream using the Pantheon Dashboard.
 
Alternatively, you can run `terminus build:project:create`:

  ```
    terminus site:create my-new-site "Describe Site" --org='My Team Name' c9f5e5c0-248f-4205-b63a-d2729572dd1f
  ```

  * Replace `{PROJECT_NAME}` with a Project name for example `decoupled-wordpress`.

  * Replace `{My Team Name}` with your team name - for example `My Agency`. This can also be omitted.

  * The `upstream_id` for Decoupled WordPress Composer Managed is`c9f5e5c0-248f-4205-b63a-d2729572dd1f`.

This will result in a GitHub repository created for this new codebase, a site created on Pantheon and a CircleCI project created for automated deployments.

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

For more information, refer to the [Available Services](https://github.com/pantheon-systems/terminus-build-tools-plugin#available-services) section or the Build Tools [documentation](/guides/build-tools/). For a list of all available Build Tools command options, see the [Build Tools Project README](https://github.com/pantheon-systems/terminus-build-tools-plugin/blob/3.x/README.md#buildprojectcreate).

#### Using a GitHub Organization

If you would like the repo created to be under a GitHub organization instead of the authenticated user's namespace, you can use the `--org` option:

```
--org="{My Organization Name}"
```

For information on additional options, refer to the [Command Options](https://github.com/pantheon-systems/terminus-build-tools-plugin#command-options) section of the build tools documentation.

For information on additional options, refer to the [Command Options](https://github.com/pantheon-systems/terminus-build-tools-plugin#command-options) section or see our Build Tools [documentation](/guides/build-tools/).
