---
title:  Automated testing and deployment with Branch
description: Learn how to use Branch to automatically build, test and deploy to Pantheon from a third party Git provider, like GitHub, GitLab or Bitbucket.
categories: [automate]
tags: [ci, git, workflow]
contributors: [petersuhm]
---

[Branch](https://www.branchci.com/) is an automated deployment tool, designed to help you automate the building, testing and deployment of your WordPress projects whenever you push to Git.

Branch makes it easy to deploy your code to Pantheon from GitHub, Bitbucket or Gitlab. Simply connect Branch to your Pantheon account with a machine token and use the built-in Pantheon recipes for Git Push, rsync or MultiDev deployments.

## Before You Begin
- If you don't already have a Branch account, [create one now](https://www.branchci.com/).
- Manage and store your site's code repository on a third party hosting service, such as [GitHub](/guides/collaborative-development).

## Deploy GitHub to Pantheon with Branch

### Connect Your GitHub Repository
1. If this is the first time you log into Branch, you will see a list of all your Git repositories. If you are an existing user, click **Add new** in the sidebar to see the same list.
2. Select the desired repository from the list and click **Next**.

This will set up the connection between GitHub and your Branch project, so that Branch knows whenever your code is updated.

### Connect To Pantheon
Branch has a native integration with Pantheon, which means that by providing a Pantheon machine token, Branch can automatically provision the integration with Pantheon. Branch will automatically add your project SSH key to your Pantheon account and set up a few handy environment variables that you can use in your build steps.

1. Head to [the Pantheon dashboard](https://dashboard.pantheon.io/users/#account/tokens/) to generate a new machine token
2. In Branch, navigate to the **Integrations** tab for your project and click the Pantheon **Connect** button
3. Paste in the machine token and click **Connect**
4. From the list, pick the site on Pantheon you want to connect to your Branch project

Once you’ve picked a site, Branch will exchange SSH keys with Pantheon and set up a few environment variables for your project. These variables are used by the Pantheon recipes in Branch. By connecting to Pantheon the following environment variables are created for you:

- `PANTHEON_GIT_URL` – The Git repository URL to push to Pantheon
- `PANTHEON_SITE_ID` – Site UUID for the connected Pantheon site
- `TERMINUS_SITE` – The name of the Pantheon site, used by the Terminus CLI
- `TERMINUS_TOKEN` – The machine token, used by the Terminus CLI

Your Branch project is now connected to your site on Pantheon and you are ready to configure your first deployment.

### Deploy to Pantheon
Before you trigger your first deployment, you need to define your deployment pipeline.

1. In Branch, navigate to the project **Pipeline**.
2. If you have any build steps (like running Composer or npm), click the **Build** button in the _Add a step_ menu and add the necessary recipes.
3. Click the **Deploy** button in the _Add a step_ menu to add a Pantheon deployment recipe.
   Branch offers 3 different ways to deploy to Pantheon:
     - rsync
     - Git push
     - Terminus MultiDev

   Pick the one that suits your Pantheon workflow best. If you are unsure about this, the rsync or Git push recipes are simplest to use. Using the Terminus MultiDev recipe require that you have MultiDev enabled for your Pantheon account. It will automatically create new MultiDev environments on Pantheon whenever you open a pull request on GitHub.

   **Important:** If you only want to deploy when committing to a specific branch (like `main`), make sure to specify the Git branch name in the **Environment** section of the recipe.
4. Once you have added a deploy step, you can consider adding a test or Q/A step as well. Branch has recipes for checking PHP syntax errors, running Lighthouse page speed, accesibility and SEO checks and so on.
5. Trigger your first deployment by pushing the **Run deployment** button.
6. Going forward, every time your push to your Git repository, Branch will run a deployment for you.

Hopefully, this guide has helped you get set up with an automated deployment workflow. I encourage you to browse around the recipes that Branch offers to discover other tools you can utilize in your automated deployment pipeline.
