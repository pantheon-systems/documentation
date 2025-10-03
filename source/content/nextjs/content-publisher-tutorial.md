---
title: Content Publisher Tutorial for Next.js
description: Integrate Content Publisher with a Next.js site on Pantheon
reviewed: "2025-10-01"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/content-publisher-tutorial

---

<Partial file="nextjs-pre-ga.md" />

Pantheon's Content Publisher shines as a way to send content straight from Google Docs to a Next.js site hosted on Pantheon.
This tutorial will walk you through the steps needed to make a simple site combining the two.

In this tutorial, we will:

* Make a new Next.js codebase using the [Next.js Content Publisher Starter](https://docs.content.pantheon.io/nextjs-tutorial).
* Create a new GitHub repository to hold that codebase.
* Create a new Pantheon site that will build and run the code from that repository.
* Create a Content Publisher collection that will send content to the Next.js site.
* Configure environment variables on Pantheon to connect the Next.js site to the Content Publisher collection.


<Alert title="Access prerequisites" type="info" >

tktktk

</Alert>

## Command Line Tool Prerequisites

This tutorial requires few command line tools that are best to install before starting.

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) - to manage the codebase and push it to GitHub.
* Terminus - to create and manage the Pantheon site.
  If you don't have Terminus installed, [start by installing it](https://docs.pantheon.io/terminus/install).
* log plugin
* repo plugin
* pcc

## Create a local Next.js codebase

The all of the prerequisites tools in place we will now make a local codebase for our Next.js site.

Run this command (replacing `my-site-name` with a unique name for your site):

```bash{promptUser: user}
 pcc init my-site-name --eslint --ts --appRouter
```

You can answer the interactive prompts that follow with "no" since we have not yet made a Content Publisher collection or token to go with this site.

When the command completes, you will have a with a simple Next.js codebase on your local machine in a directory named `my-site-name`.

### Create a GitHub repository

Next, we will create a new repository on GitHub to hold the codebase we just made.

You can do this via GitHub's web interface or via the command line.

[screenshot of GitHub new repo page]

Leave the repository empty for now and do not add a README, .gitignore, or license.

Since this repository is meant to be a tutorial, you may want to make it private.

### Push the codebase to GitHub

Now, we will push the codebase we made with `pcc init` to the new repository on GitHub.

First, change into the directory holding the codebase:

```bash{promptUser: user}
cd my-site-name
```
Next, initialize a new Git repository:

```bash{promptUser: user}
git init
```
Next, add the files in the directory to the new Git repository:

```bash{promptUser: user}
git add .
```
Next, commit the files to the new Git repository:

```bash{promptUser: user}
git commit -m "Initial commit"
```
Finally, add the GitHub repository as a remote and push the code to it (replacing `myname` and `my-site-name` with your GitHub username or organization and the name of the repository you created):

```bash{promptUser: user}
git remote add origin git@github.com:myname/my-site-name.git
git push -u origin main
```

<Alert title="TEMPORARY WORKAROUND" type="info" >

Until [this fix](https://github.com/pantheon-systems/content-publisher-sdk/pull/410) in the Next.js Content Publisher Starter is released, you will need to make a small modification to the codebase.

In `package.json`, ensure that the `build` and `start` scripts look like this:

```json
    "build": "next build",
    "start": "next start",
```

Commit and push these changes to GitHub.

</Alert>

## Create a new Pantheon site

With a GitHub repository holding our Next.js codebase, we can now create a new Pantheon site that will build and run that code.

```bash{promptUser: user}
terminus site:create office-artifacts5 office-artifacts5 nextjs15 \
--org="Pantheon Cooking" \
--vcs-provider=github \
--vcs-org=stevector \
--repository-name=office-artifacts5 \
--no-create-repo
```

<Alert title="BUG WORKAROUND" type="info" >

If you want the GitHub App to have access to only a limited set of repositories, you may need to uninstall and reinstall the Pantheon GitHub App.

This issue is being tracked here: LINK NEEDED/TODO

https://pantheon.slack.com/archives/C04LF93UJ0Y/p1759528831066449

</Alert>

This command will take a few minutes to complete as Pantheon will create the new site, connect it to the GitHub repository, and start the first build and deployment.

The build process will return an error because we have not yet configured the environment variables needed to connect to Content Publisher.
You can see this progression of build statuses using Terminus:

```bash{promptUser: user}
terminus node:logs:build:list my-site.dev
```
To make the build and deployment succeed, will will need a Content Publisher collection and token.

## Create a Content Publisher collection

Now let's make a Content Publisher collection that will send content to our new Next.js site.

You _can_ reuse an existing Content Publisher collection if you have one, but for this tutorial we will make a new one.

Go to the [Content Publisher dashboard](https://content.pantheon.io) and log in.

Next create a new collection by clicking the **"New collection"** button.

Enter something simple for **Collection name** like "Next.js tutorial content".

For the **URL** field, enter the URL of your new Pantheon site's Dev environment, like `https://dev-my-site-name.pantheonsite.io`.

<Alert title="Tutorial vs. production usage" type="info" >

When using this combination of Content Publisher and Next.js in production, you would likely use the URL of your live environment here. For more information on deploying to Test and Live environments, see [Deploying to Test and Live](/docs/nextjs/test-and-live-env).

</Alert>

Once the Collection is created, [create a new Google Doc](https://docs.new/) and add it to your collection.

__describe in more detail????__


## Configure environment variables to connect the Next.js site to the Content Publisher collection

Now that we have a Content Publisher collection, we can configure the environment variables needed to connect our Next.js site to that collection.

Grab the collection ID and token from the Content Publisher dashboard.

__describe in more detail????__

### Set the environment variables on Pantheon

Now, we will set the environment variables on Pantheon using Terminus.

```bash{promptUser: user}
terminus secret:site:set office-artifacts5  PCC_TOKEN your-token-here --type=env --scope=web,ic --no-interaction
terminus secret:site:set office-artifacts5  PCC_SITE_ID your-collection-id-here --type=env --scope=web,ic --no-interaction
```

### Trigger another build

To see the changes take effect make another commit to the GitHub repository to trigger a new build and deployment.
