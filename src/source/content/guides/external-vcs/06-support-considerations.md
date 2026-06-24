---
title: External Version Control
subtitle: Support & Considerations
description: Additional notes about Pantheon's External Version Control integration, including assumptions, limitations, and support information.
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
reviewed: "2026-06-24"
permalink: docs/guides/external-vcs/support-considerations
---

This page outlines important assumptions, current limitations, and support information for Pantheon's External Version Control (eVCS) integration. Review these considerations before implementing it for your projects.

## Assumptions

### Multidev is available to customers with Gold or higher plans

The eVCS integration is designed to work with Multidev environments. Multidev is available to customers on [Gold or higher plans](/guides/multidev). If you are on a lower plan, you can still use the eVCS integration, but you will not be able to use the Multidev features.

### Build processes happen on Pantheon

Our separate [GitHub Action](/github-actions) is designed for more customized workflows that might involve building code elsewhere and deploying to Pantheon. The eVCS integration is designed for teams that want to use Pantheon as their build server.

Currently, Pantheon executes a `composer install` command through our [Integrated Composer](/guides/integrated-composer) feature.
If you need compilation of front-end assets in your WordPress or Drupal theme through something like `npm run build` you should use [our GitHub Action](https://github.com/pantheon-systems/push-to-pantheon) now and [follow this item on our roadmap for eventual inclusion of such functionality within a Pantheon-prodived build step](https://roadmap.pantheon.io/c/115-github-gitlab-and-bitbucket-integration).

### Security and Permissions

The main purpose of Pantheon's External Version Control integration is to create a mapping between a repository on GitHub or GitLab and a website on Pantheon. Configuring the integration requires granting Pantheon access to one or more repositories. This access is tracked at the [Pantheon Workspace](/guides/account-mgmt/workspace-sites-teams/workspaces) level.

People who are members of a Pantheon Workspace and have the Developer role or higher can see all sites in the Workspace. This means they can see sites on Pantheon even if their corresponding VCS account does not have permission to view the site's repository.

#### GitHub

When configuring the GitHub Application you will have the choice between granting access to individually selected repositories or "all" repositories within your GitHub organization. Selecting "all repositories" can be more convenient because it allows for faster creation of new repositories and sites. However, by granting Pantheon the "all repositories" permission you also grant that permission to every member of the Pantheon Workspace who has a Developer role or higher. Depending on the size and nature of your company, you may not want your Pantheon Workspace members to have this permission, especially if they are not members of your GitHub organization.

#### GitLab

GitLab supports two token types for this integration, each with different access scope:

- **Personal Access Token** — The `api` scope on a personal access token grants complete read and write access to all groups and projects the token owner belongs to. This cannot be restricted to specific groups or repositories. Use this token type with caution if the token owner has broad access to GitLab resources.
- **Group Access Token** — Scoped to a specific group and its subprojects only. This is the recommended option when you want to limit Pantheon's access to a single GitLab group. Group Access Tokens require a GitLab Premium or Ultimate subscription on GitLab.com; they are available on any tier for self-managed GitLab instances.

## Limitations

### No On Server Development  (SFTP Mode)

New sites using Pantheon's External Version Control integration do not support "[SFTP Mode](/guides/sftp)" which allows version controlled files to be altered via SFTP or simply by the CMS changing files, as is common with operations like `drush config-export`. We know this limitation will stop some teams from using this integration and [we are seeking feedback on how important it is to support this style of working when using 3rd party repositories](https://roadmap.pantheon.io/c/115-github-gitlab-and-bitbucket-integration).

## Support

For questions and feedback about the External Version Control integration, please use [Pantheon Support](/guides/support/contact-support/).

## More Resources

- [Pantheon Support](/guides/support) - Learn about Pantheon's support offerings
- [Multidev](/guides/multidev) - Common questions about Multidev environments
- [Next.js Documentation](https://nextjs.org/docs) - Official Next.js documentation