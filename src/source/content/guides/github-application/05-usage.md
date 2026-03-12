---
title: GitHub Application (Private Beta)
subtitle: Usage
description: Instructions for using the GitHub Application, including managing pull requests and deploying code.
tags: [continuous-integration, workflow, D8, D9, D10]
contributors: [stevector,jazzs3quence]
contenttype: [guide]
showtoc: true
innav: [true]
categories: [automate, workflows]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
reviewed: "2026-03-02"
permalink: docs/guides/github-application/usage
---

This page covers common usage scenarios for the GitHub Application, including linking GitHub connections across Pantheon organizations and working with the pull request workflow.

<Alert title="Note" type="warning">

The Pantheon GitHub Application must be installed by a user who is both:

- A **GitHub organization admin**
- A **member** of the corresponding Pantheon workspace

Other workspace members cannot install the app themselves. The GitHub organization admin must complete the installation first, and then any workspace member can create Next.js sites using repositories the app has access to.

The GitHub Application **cannot** be used with GitHub Enterprise Server.

</Alert>

## Create a new VCS connection to a Pantheon organization without creating a site

The GitHub organization admin does not need to create a site in order to install the GitHub Application. If you want to use the GitHub Application in a Pantheon organization that does not yet have a GitHub connection, you can create a new connection without creating a site using `terminus vcs:connection:add`. This is useful if you want to set up the connection before creating a site or if you want to link an existing GitHub connection to a new Pantheon organization.

```bash{promptUser: user}
terminus vcs:connection:add <organization-id>
```

In the above example, `<organization-id>` represents the Pantheon organization you want to add a GitHub connection to. 

## Linking an existing VCS connection with a new Pantheon organization

If you have already installed the GitHub application on your account or organization, you will likely have already linked it with a Pantheon organization. If you then want to use the GitHub Application for PHP or Next.js sites on a different organization, you need to create a new link with this organization. Currently this can only be done using the Terminus command `vcs:connection:link`.

## Using `terminus vcs:connection` commands

You can display all the current connections between GitHub and a Pantheon organization with the `vcs:connection:list` command. Using `terminus vcs:connection:list <org ID>`  will produce output like this:

```bash{promptUser: user}
 terminus vcs:connection:list <org-id>
 ----------------- -------------- -------------- -------------------------------------- 
  Installation ID   VCS Provider   Type           Login name                            
 ----------------- -------------- -------------- -------------------------------------- 
  97683202          github         Organization   Demo-Org                           
  112960071         github         Organization   another-example-org                         
 ----------------- -------------- -------------- --------------------------------------
 ```

In this example, the Pantheon organization identified by `<org ID>` has three unique GitHub application connections. This corresponds to the options that will display in the dropdown when creating a Next.js site. It also means that the `terminus site:create` command can create sites in those organizations with the GitHub Application.

To link an existing connection in a Pantheon organization to a different Pantheon organization, use `terminus vcs:connection:link <destination org>` where `<destination org>` represents the Pantheon organization you would like to add a connection to. 

```bash{promptUser: user}
terminus vcs:connection:link <destination org>
Please select the source Pantheon organization:
  [0] Documentation (00000000-aaaa-bbbb-1111-cccccccccccc)
  [1] Education Projects (55555555-8888-4444-cccc-dddddddddddd)
```

Running the command without explicitly specifying an Installation ID or a source organization ID will prompt you to choose a Pantheon organization from a list. Enter the option number for the Pantheon organization that already has the GitHub Application installation configured. This will allow Pantheon to copy that configuration to your new organization. You will see output like this, confirming your choice:

```bash
2026-02-27 20:48:28 UTC[+0000] [notice] Linking VCS organization:
2026-02-27 20:48:28 UTC[+0000] [notice]   VCS Organization: myuser (github)
2026-02-27 20:48:28 UTC[+0000] [notice]   Source Pantheon Org: Education Projects
2026-02-27 20:48:28 UTC[+0000] [notice]   Destination Pantheon Org: Employees

 Do you want to proceed with linking this VCS organization? (yes/no) [no]:
```

Type `yes` to proceed. Once completed, you should see your GitHub user or organization in the list when you run `terminus vcs:connection:list` again.

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

To get comfortable using the workflow, you might want to do a few practice pull requests.

First, after the site is created, install the CMS (WordPress or Drupal) within the Dev environment.
Then create the Test and Live environments.

### Make a pull request

Make a local clone of the GitHub repository and make a change to the code.
For example, you could add your favorite plugin or module.

```bash
git clone git[@github](https://github.com/github).com:<your_organization_name>/<your_site_id>.git
```

Make a new branch and then push to GitHub to open a pull request.

```bash
git checkout -b <branch_name>
git push --set-upstream origin <branch_name>
```

Once the pull request is open, the GitHub Application will automatically create a new Multidev environment on Pantheon.

When the Multidev environment is created, you will be able to see it in the Pantheon dashboard.
Verify that your change is working by visiting the Multidev environment URL.

### Merge the pull request

Once you are happy with the change, you can merge the pull request and the GitHub Application will automatically deploy the code to the Pantheon Dev environment.

## More Resources

- [Multidev](/guides/multidev) - Learn how to work with Multidev environments
- [Terminus Commands](/terminus/commands) - Documentation for Terminus commands
- [Next.js Documentation](https://nextjs.org/docs) - Official Next.js documentation
- [Limitations and considerations for Next.js Beta](/nextjs/considerations)
