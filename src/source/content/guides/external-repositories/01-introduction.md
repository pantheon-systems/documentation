---
title: External Repositories
subtitle: Introduction
description: Pantheon's external repository integration connects a GitHub or GitLab repository directly to a Pantheon site.
tags: [continuous-integration, workflow]
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
permalink: docs/guides/external-repositories
---

Pantheon's external repository integration connects a GitHub or GitLab repository directly to a Pantheon site.
This allows you to use your preferred VCS provider as your code repository while still using Pantheon to run your site.

Once enabled, this integration accommodates a pull request (GitHub) or merge request (GitLab) workflow where a Multidev environment is created for each open PR or MR. This allows you to test the code before merging it.

![Diagram of the external repositories process of deploying a PR to a Pantheon Multidev](../images/github-app/diagram--deploying-pr.png)

Merging a pull or merge request, or pushing code directly to the `main` branch, automatically deploys the code to the Pantheon Dev environment.

![Diagram of the external repositories process of deploying main to Pantheon](../images/github-app/diagram--deploying-main.png)

## How This Differs from Build Tools

The external repository integration is distinct from [Build Tools](/guides/build-tools). Build Tools uses a CI service (such as CircleCI or GitHub Actions) as an intermediary to build and deploy your site. The external repository integration connects your repository directly to Pantheon without requiring a separate CI pipeline.

## More Resources

- [Multidev](/guides/multidev) - Learn about Pantheon's Multidev environments created for each pull request or merge request
- [Next.js Documentation](https://nextjs.org/docs) - Official Next.js documentation
