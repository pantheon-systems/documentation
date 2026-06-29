---
title: External Repositories
subtitle: Usage
description: Instructions for using Pantheon's external repository integration, including managing pull requests, merge requests, and deploying code.
tags: [continuous-integration, workflow, D8, D9, D10]
contributors: [stevector,jazzsequence]
contenttype: [guide]
showtoc: true
innav: [true]
categories: [automate, workflows]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
reviewed: "2026-06-24"
permalink: docs/guides/external-repositories/usage
---

This page covers common usage scenarios for Pantheon's external repository integration, including linking VCS connections across Pantheon organizations and working with the pull request and merge request workflow.

<Alert title="Note" type="warning">

**GitHub:** The Pantheon GitHub Application must be installed by a user who is both a **GitHub organization admin** and a **member** of the corresponding Pantheon workspace. Other workspace members cannot install the app themselves. The GitHub organization admin must complete the installation first, and then any workspace member can create sites using repositories the app has access to.

The GitHub Application **cannot** be used with GitHub Enterprise Server.

**GitLab:** The external repository integration requires a Pantheon workspace member with a GitLab legacy personal access token or group access token with `api` and `write_repository` scopes. Group access tokens also require a **Maintainer** role or higher in the group. Self-hosted GitLab instances are supported via the `--vcs-host` flag. See [Setup](/guides/external-repositories/setup) for details.

</Alert>

## Create a new VCS connection to a Pantheon organization without creating a site

You do not need to create a site in order to establish a VCS connection. If you want to use the integration in a Pantheon organization that does not yet have a VCS connection, you can create a new connection without creating a site using `terminus vcs:connection:add`. This is useful if you want to set up the connection before creating a site or if you want to link an existing connection to a new Pantheon organization.

```bash{promptUser: user}
terminus vcs:connection:add <organization-id>
```

In the above example, `<organization-id>` represents the Pantheon organization you want to add a VCS connection to. The command defaults to GitHub. For GitLab, pass `--vcs-provider=gitlab`, which will prompt you for your token and group name.

## Linking an existing VCS connection with a new Pantheon organization

If you have already set up the integration for an account or organization, you will likely have already linked it with a Pantheon organization. If you then want to use the external repository integration for PHP or Next.js sites on a different Pantheon organization, you need to create a new link with this organization. Currently this can only be done using the Terminus command `vcs:connection:link`.

## Using `terminus vcs:connection` commands

You can display all the current VCS connections for a Pantheon organization with the `vcs:connection:list` command. Using `terminus vcs:connection:list <org ID>` will produce output like this:

```bash{promptUser: user}
 terminus vcs:connection:list <org-id>
 ----------------- -------------- -------------- -------------------------------------- 
  Installation ID   VCS Provider   Type           Login name                            
 ----------------- -------------- -------------- -------------------------------------- 
  97683202          github         Organization   Demo-Org                           
  112960071         github         Organization   another-example-org                         
 ----------------- -------------- -------------- --------------------------------------
 ```

In this example, the Pantheon organization identified by `<org ID>` has two VCS connections. This corresponds to the options that will display in the dropdown when creating a site. It also means that the `terminus site:create` command can create sites using repositories in those organizations.

To link an existing connection in a Pantheon organization to a different Pantheon organization, use `terminus vcs:connection:link <destination org>` where `<destination org>` represents the Pantheon organization you would like to add a connection to. 

```bash{promptUser: user}
terminus vcs:connection:link <destination org>
Please select the source Pantheon organization:
  [0] Documentation (00000000-aaaa-bbbb-1111-cccccccccccc)
  [1] Education Projects (55555555-8888-4444-cccc-dddddddddddd)
```

Running the command without explicitly specifying an Installation ID or a source organization ID will prompt you to choose a Pantheon organization from a list. Enter the option number for the Pantheon organization that already has the VCS connection configured. This will allow Pantheon to copy that configuration to your new organization. You will see output like this, confirming your choice:

```bash
2026-02-27 20:48:28 UTC[+0000] [notice] Linking VCS organization:
2026-02-27 20:48:28 UTC[+0000] [notice]   VCS Organization: myuser (github)
2026-02-27 20:48:28 UTC[+0000] [notice]   Source Pantheon Org: Education Projects
2026-02-27 20:48:28 UTC[+0000] [notice]   Destination Pantheon Org: Employees

 Do you want to proceed with linking this VCS organization? (yes/no) [no]:
```

Type `yes` to proceed. Once completed, you should see the linked organization in the list when you run `terminus vcs:connection:list` again.

```bash{promptUser: user}
terminus vcs:connection:list <org-id>
 ----------------- -------------- -------------- -------------------------------------- 
  Installation ID   VCS Provider   Type           Login name                            
 ----------------- -------------- -------------- -------------------------------------- 
  97683202          github         Organization   Demo-Org                           
  112960071         github         Organization   another-example-org  
  64613183          github         User           myuser                          
 ----------------- -------------- -------------- --------------------------------------
```

## Try the pull request workflow

To get comfortable using the workflow, you might want to do a few practice pull requests (GitHub) or merge requests (GitLab).

First, after the site is created, install the CMS (WordPress or Drupal) within the Dev environment.
Then create the Test and Live environments.

### Make a pull request or merge request

Make a local clone of your repository and make a change to the code.
For example, you could add your favorite plugin or module.

**GitHub:**
```bash
git clone git@github.com:<your_organization_name>/<your_site_id>.git
```

**GitLab:**
```bash
git clone git@gitlab.com:<your_group_name>/<your_repository_name>.git
```

Make a new branch and then push to open a pull request (GitHub) or merge request (GitLab).

```bash
git checkout -b <branch_name>
git push --set-upstream origin <branch_name>
```

Once the pull or merge request is open, Pantheon will automatically create a new Multidev environment.

When the Multidev environment is created, you will be able to see it in the Pantheon dashboard.
Verify that your change is working by visiting the Multidev environment URL.

### Merge the pull request or merge request

Once you are happy with the change, merge the pull or merge request and Pantheon will automatically deploy the code to the Dev environment.

## More Resources

- [Multidev](/guides/multidev) - Learn how to work with Multidev environments
- [Terminus Commands](/terminus/commands) - Documentation for Terminus commands
- [Next.js Documentation](https://nextjs.org/docs) - Official Next.js documentation
- [Limitations and considerations for Next.js](/nextjs/considerations)
