---
title: Next.js Hello World Tutorial
description: Get up and running with a simple Next.js application on Pantheon
reviewed: "2025-10-01"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/hello-world-tutorial

---

<Partial file="nextjs-pre-ga.md" />


This Tutorial will guide you from having never used Pantheon before to seeing a "Hello World" level Next.js site deployed to a Pantheon live environment with a custom domain name connected.

In this tutorial we will:

* Make **a new repository on GitHub** that will correspond to **a newly created site on Pantheon**.
The repository will hold the code of a very simple Next.js site and Pantheon will serve build and run code from the main branch of the repository.
* Make a minor code change in a different branch and then create **a pull request on GitHub**. We'll then observe that the changed codebase be **built and deployed to a separate environment on Pantheon** with its own resources and subdomain.
* **Merge the pull request on GitHub to the main branch** and observe the change be **built and deployed to Pantheon's Dev environment**.
* Create **Test and Live environments** and deploy to them via direct **Git tag creation and GitHub's Releases** interface.
* Optionally **connect a custom domain** to the live environment.

#### Note: Access Prerequisites

In order to complete the steps in this documentation your organization will need to have been granted access to the Private Alpha program for evaluating our support for Next.js.
Without access to this program, you will not be able to create a new site on Pantheon that provides the infrastructure necessary to run Next.js.

Additionally, creating a Next.js site on Pantheon requires the permission to connect Pantheon's GitHub Application to your GitHub Account.

## Command Line Tool Prerequisites

This tutorial presumes that you already have access to clone Git repositories ([presumably over SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh)) from your GitHub organization or account.

Creating and viewing the logs of Next.js sites requires plugins for our command line tool, Terminus. If you don't have Terminus installed, [start by installing it](https://docs.pantheon.io/terminus/install).

The [Terminus Repository Plugin](https://github.com/pantheon-systems/terminus-repository-plugin) is needed to connect an external repository (GitHub) to a Pantheon site.

You can install it with

```
terminus self:plugin:install terminus-repository-plugin
```

Next the [Terminus Node Logs Plugin](https://github.com/pantheon-systems/terminus-node-logs-plugin) adds commands for viewing build and runtime logs for applications running Node.js.

You can install it with

```
terminus self:plugin:install terminus-node-logs-plugin
```

With these two plugins you can complete the rest of this tutorial.

## Site creation

With the [Terminus Repository Plugin](https://github.com/pantheon-systems/terminus-repository-plugin) added to your machine, there are now extra parameters available to the terminus site:create command to specify details like the GitHub organization in which the Git Repository will be created.

### Site creation command

While `terminus site:create` can interactively prompt you for information, you might be more comfortable specifying all the details in one command like this:

```
terminus site:create my-site-name my-site-label nextjs15 \
--org="My Pantheon Org name" \
--vcs-provider=github \
--vcs-org=my-github-org-name \
--repository-name=name-of-to-be-created-github-repo
```

See `terminus site:create --help` for detailed explanations of each of these parameters.
Of particular note:

* While you *can* provide different values for the site's machine name on Pantheon, the site's label on Pantheon, and the name of the repository on GitHub, it is often preferable to use exactly the same value for all three (Something like "`my-next-js-site`")
* "`nextjs15`" as the upstream_id value will give us a [simple example Next.js codebase](https://github.com/pantheon-upstreams/nextjs). In practice for real sites, you can overwrite these files as you wish.
* Currently Next.js sites can only run on Pantheon if the code comes from a GitHub repository (the `--vcs-provider` option). Eventually we will expand that capability to BitBucket and GitLab.
* If you want to connect a Pantheon site to an existing repository, you would enter the name of the repository in `--repository-name` and also set the `--no-create-repo` option.

### Site creation results

This site creation process will take a few minutes to complete. Once it completes you will see:

* A repository in your GitHub account with the name you specified. It will contain a copy of the sample Next.js codebase:

  [screenshot]

* You will see your newly created site listed in the Pantheon dashboard under your organization:

  [screenshot]

* Within that site, you will be able to click on the "Dev site" link and see the minimal site:

  [two screenshots or gif]

* Finally, check your local machine for a clone of your Next.js repository.
Open it in your preferred code editor so that you can make a change to be pushed to GitHub.

  [screenshot]

## Pull Request Workflow

In this section we will make a change to Next.js code and then see that change in a non-live Pantheon environment specific to the pull request.

### Making a code change

With your local clone of the Next.js codebase open in your preferred code editor, make a small change to `app/page.tsx`.

For instance you can change the text "Welcome to Pantheon Platform" to "Hello World!"

Now make a separate Git branch, commit, and push to GitHub. On the command line, those commands are:

```
git checkout -b hello-world-change
```

Verify that the differences you are about to commit are what you expect:

```
git diff
```

This command will show you the alteration you made to `app/page.tsx`.

Next, commit this change:

```
git commit -am 'Changing home page to say "Hello World"'
```

Push your new branch to GitHub before making a Pull Request.

```
git push origin hello-world-change
```

### Seeing a build and deployment for a Pull Request

With a new branch pushed to GitHub, open a pull request against the main branch.

[Screenshot of pull request creation]

The creation of the Pull Request will prompt Pantheon to start a build and deployment process.

To view the status of that process, run this command (which presumes we are listing the logs that correspond to the first Pull Request, or `pr-1`)

```
terminus node:logs:build:list my-site-machine-name.pr-1
```

Over the course of a few minutes, you will see the statuses update as the files necessary to run Next.js are built and deployed.
See this [section for more details on the build and deployment process](/nextjs/build-and-deploy).

For as small of a change as we made in this pull request, some "Hello World" text, we should soon see DEPLOYMENT_SUCCESS as the status.
Once that status is reached, you should be able to see your change in your browser by opening a Multidev environment from your dashboard.

[screenshot of Multidev list in dashboard]

[screenshot of Hello World]

Having seen this change to the Next.js site deployed on a non-live environment we can merge it with more confidence.
If you chose to merge this change you can watch the same progression of build and deployment statuses through `terminus node:logs:build:list my-site-machine-name.dev`.

### Conclusion

Having reached a "Hello World" state with Next.js on Pantheon, you might want to proceed to one or more other Tutorials or guides.

* [How-To Guide: Migrating from Front-End Sites walk through moving a site away from Pantheon's prior offering for hosting Next.js](/nextjs/migrating-from-front-end-sites).
* [Learn to Troubleshoot errors and set environment variables](/nextjs/logs-and-environment-variables-tutorial).
* [Deploy to Test and Live environments and connect a custom domain name](/nextjs/test-and-live-env).
* [Connect Next.js to Content Publisher](/nextjs/content-publisher-tutorial).
