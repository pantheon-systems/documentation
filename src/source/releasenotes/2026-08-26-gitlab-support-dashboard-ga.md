---
title: "GitLab support for external repositories now available in the Dashboard"
published_date: "2026-08-26"
published_at: "2026-08-26T18:22:38Z"
categories: [new-feature, tools-apis, user-interface]
description: "Connecting a GitLab repository to a Pantheon site is now available for everyone directly from the Pantheon Dashboard."
---

Pantheon's [GitLab support for external repositories](/release-notes/2026/06/evcs-gitlab-support) is now generally available to everyone directly from the Pantheon Dashboard, alongside GitHub and Pantheon-hosted Git.

## What's new

- **Dashboard support** — When creating a new site, choose **GitLab** as your code host right alongside GitHub and Pantheon's integrated Git repository — no Terminus required.
- **Self-hosted GitLab** — Connect to GitLab.com or your own self-hosted GitLab instance.
- **Token-based authentication** — Authenticate using a personal access token or group access token with `api` and `write_repository` scopes.

## Where to find it

During site creation, select **GitLab** on the **Where will your code be hosted?** screen to connect your repository.

![Where will your code be hosted screen showing GitHub, GitLab, and Pantheon options](../../../../images/dashboard/gitlab-repo-hosting-dashboard.png)

For full setup instructions, see the [related documentation](/guides/external-repositories/gitlab).
