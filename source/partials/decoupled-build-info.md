---
contenttype: [partial]
categories: [decoupled]
cms: [--]
product: [decoupled]
integration: [--]
tags: [--]
reviewed: ""
---

This section provides information on how to view Build details, how to trigger a new build manually in the Overview page, how to trigger a build with GitHub merges, Multidev branch builds, and pull request builds.

## Build Details

You can view build details and get information on your Front-End Site development and specifications. Build information is provided in the Overview page in three sections:

- Live Build
- Multidev Branches
- Pull Requests

Build details include:

- **Status:** The build’s latest status. Possible status values are:
    - `In Progress`
    - `Success`
    - `Failed`
    - `Queued`

- **Build:** The build number and reference ID.
- **Branch:** The name of the latest GitHub branch.
- **Deployment:** The URL to the environment that the build was deployed to.
- **Last Updated:** The date the site content was last modified.
- **Triggered by:** The name of the user who deployed the site build.

### View Build Details

1. Log in to your **Site Dashboard** and select the **Sites** page.

1. Click the **Front-End Sites** tab and select the site you want to view the build details for.

![build details](../images/decoupled-build-details.png)

## Trigger a Manual Build

You can save time by quickly triggering a build from your Overview page.

1. Log in to your Front-End Site workspace and select the **Sites** page.

1. Click the **Front-End Sites** tab and select the site you want to trigger a build for.

1. Click the **Trigger Build** button in the top left corner.

## Trigger a Build with GitHub Merges

A build and deploy process is automatically triggered when you
you push code to the default branch of your repository or merge a pull
request to that branch.

You can follow the steps below to observe the build and deployment process in real time. Note that the steps below assume that you have already cloned your Front-End Site repository from GitHub to your local.

1. Check out the `main` branch of your repository. You can use `git checkout main` to do this.

1. Make a change to a file in your repository.

1. Add and commit the change to the `main` branch using `git add .` and `git commit -m <message>`

1. Push the new commit to GitHub with `git push`

1. Open your site dashboard and navigate to the **Live Build** section on the **Overview** page to observe the new build in progress.

## Multidev Branch Builds

You can build specific branches by naming the branch to begin with the prefix `multi-`. Refer to [Front-End Sites Multidev Development Workflow](/guides/decoupled/overview/considerations#front-end-sites-multidev-development-workflow) for a detailed outline of the development workflow for Multidev sites.

You can follow the steps below to observe the build and deployment process for a Multidev branch in real time. Note that the steps below assume that you have already cloned your Front-End Site repository from GitHub to your local.

1. Check out the `main` branch of your repository. You can use `git checkout main` to do this.

1. Create a new branch using the `multi-` prefix, for example:  `git checkout -b multi-example-update`

1. Make a change to a file in your repository.

1. Add and commit the change to the `main` branch using `git add .` and `git commit -m <message>`

1. Push the branch to GitHub using `git push origin your-branch-name`

1. Open your site dashboard and navigate to the **Multidev Branches** section on the **Overview** page. You should see that branch begin to build after approximately a minute.

1. Use the **Actions** drop-down menu to visit the Multidev version of the site, view the logs, or get more information about the build.

Any commits pushed on this branch will now be built and deployed to the Multidev. This allows you and your team to review the branch as work progresses. Pull requests opened against this branch will also trigger a build.