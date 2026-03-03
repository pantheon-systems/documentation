---
title: GitHub Application (Private Beta)
subtitle: Introduction
description: Pantheon's GitHub Application handles moving code from individual GitHub repositories to individual Pantheon sites.
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
permalink: docs/guides/github-application
---

Pantheon's GitHub Application directly integrates a GitHub repository with a Pantheon site.
This allows you to use GitHub as your code repository while still using Pantheon to run your site.

The GitHub Application is currently in private Beta. [Request access for your Pantheon workspace here](https://docs.google.com/forms/d/e/1FAIpQLSf0vYrRbPQBxR-hT8kGJ4bEdYPtpkTtfDvPM89xD2dNZeqLqA/viewform).

Once enabled, this application accommodates a pull request workflow where a Multidev environment is created for each pull request. This allows you to test the code in the pull request before merging it.

![Diagram of the GitHub application process of deploying a PR to a Pantheon Multidev](../images/github-app/diagram--deploying-pr.png)

Merging pull requests, or pushing code to the `main` branch of the GitHub repository, will automatically deploy the code to the Pantheon development environment.

![Diagram of the GitHub application process of deploying main to Pantheon](../images/github-app/diagram--deploying-main.png)

## How This Differs from Build Tools

The GitHub integration is distinct from [Build Tools](/guides/build-tools). Build Tools uses a CI service (such as CircleCI or GitHub Actions) as an intermediary to build and deploy your site. The GitHub integration connects your repository directly to Pantheon without requiring a separate CI pipeline.

## More Resources

- [Multidev](/guides/multidev) - Learn about Pantheon's Multidev environments created for each pull request
- [Next.js Documentation](https://nextjs.org/docs) - Official Next.js documentation
- [Terminus Repository Plugin](https://github.com/pantheon-systems/terminus-repository-plugin) - GitHub repository for the Terminus Repository Plugin
