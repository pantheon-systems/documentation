---
title: GitHub Application (Private Beta)
description: Pantheon's GitHub Application handles moving code from individual GitHub repositories to individual Pantheon sites.
tags: [continuous-integration, workflow, D8, D9, D10]
contributors: [stevector]
contenttype: [doc]
innav: [true]
categories: [automate, workflows]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
reviewed: "2025-04-15"

---

Pantheon's GitHub application directly integrates a GitHub repository with a Pantheon site.
This allows you to use GitHub as your code repository while still using Pantheon to run your site.

The GitHub application is currently in private Beta. [Request access for your Pantheon workspace here](https://docs.google.com/forms/d/e/1FAIpQLSf0vYrRbPQBxR-hT8kGJ4bEdYPtpkTtfDvPM89xD2dNZeqLqA/viewform).

Once turned, on this application accommodates a pull request workflow where a Multidev environment is created for each pull request. This allows you to test the code in the pull request before merging it.

![Deploying a PR to a Pantheon Multidev](../images/github-app/diagram--deploying-pr.png)

Merging pull requests, or pushing code to the main branch of the GitHub repository, will automatically deploy the code to the Pantheon development environment.

![Deploying main to Pantheon](../images/github-app/diagram--deploying-main.png)


## Creating a new site

The GitHub application works with newly created Pantheon sites and GitHub repositories.
Before the application is made generally available, it will not work with existing Pantheon sites or GitHub repositories.

To create a new site to correspond to a new GitHub repository, you will need to use [Terminus](https://pantheon.io/docs/terminus) to create the site and the GitHub repository.
If you already have Terminus installed, double check to ensure that you are running version 3.X.X or higher. (TODO, confirm version number before publishing)
You can check your version by running the command `terminus --version`.

Run `terminus site:create` with the `--????` flag to create a new site and GitHub repository.
The first time you run this command, you will be prompted to authorize the GitHub application to access your GitHub account.

## Try the pull request workflow

To get comfortable using the workflow, you might want to do a few practice pull requests.

First, after the site is created, install the CMS (WordPress or Drupal) within the Dev environment.
Then create the Test and Live environments.

### Make a pull request

Make a local clone of the GitHub repository and make a change to the code.
For example, you could add your favorite plugin or module.

Make a new branch and then push to GitHub to open a pull request.

Once the pull request is open, the GitHub application will automatically create a new Multidev environment on Pantheon.

When the Multidev environment is created, you will be able to see it in the Pantheon dashboard.
Verify that your change is working by visiting the Multidev environment URL.

### Merge the pull request

Once you are happy with the change, you can merge the pull request and the GitHub application will automatically deploy the code to the Pantheon Dev environment.

## Asumptions of GitHub application

### Multidev is available at to customers with Gold or higher plans

This GitHub application is designed to work with Multidev environments. Multidev is available to customers on [Gold or higher plans](/guides/multidev). If you are on a lower plan, you can still use the GitHub application, but you will not be able to use the Multidev features.

### Build processes happen on Pantheon

Our separate [GitHub Action](/github-actions) is designed for more customized workflows that might involve building code elsewhere and deploying to Pantheon. The GitHub application is designed for teams that want to use Pantheon as their build server.

Currently, Pantheon can execute "composer install" through our [Integrated Composer](/guides/integrated-composer) feature.
If you need compilation of front-end assets in your WordPress or Drupal theme through something like `npm run build` you should use [our GitHub Action](https://github.com/pantheon-systems/push-to-pantheon) now and [follow this item on our roadmap for eventual inclusion of such functionaity within a Pantheon-prodived build step](https://pantheon.productboard.com/detail/30103699).

## Limitations prior to General Availability

The GitHub application is currently in private Beta.

We will address these limitaitons before the application is made generally available.

### Limited to new projects created by the Terminus

Activating the GitHub Application presently runs through Terminus that creates a new site on Pantheon and a new GitHub repository. The GitHub application does not yet support retrofitting existing GitHub repositories or Pantheon sites yet.
Follow [this issue](https://github.com/pantheon-systems/terminus/issues/2683) in the queue to find out when this limitation is removed.

### No On Server Development  (SFTP Mode)

New sites made with the GitHub Application do not support "[SFTP Mode](/guides/sftp)" which allows version controlled files to be altered via SFTP or simply by the CMS changing files, as is common with operations like "drush config-export." We know this limitation will stop some teams from using this application and [we are seeking feedback on how important it is to support this style of working when using 3rd party repositories](https://roadmap.pantheon.io/c/115-github-gitlab-and-bitbucket-integration).

### No dashboard representation of Git commit log

_Todo: explain this. Maybe add a screenshot_


