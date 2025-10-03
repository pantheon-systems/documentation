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

<Alert title="Needed code modifications" type="info" >

</Alert>


## Create a new Pantheon site








## Create a new Pantheon site connected to the GitHub repository

tktktk


## Create a Content Publisher collection

tktktk


## Configure environment variables to connect the Next.js site to the Content Publisher collection

tktktk
