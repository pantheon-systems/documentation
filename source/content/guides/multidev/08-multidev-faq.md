---
title: Multidev
subtitle: Multidev FAQ
description: A quick reference to answer some of the most frequently asked questions about Multidev.
categories: [develop]
tags: [collaborate, workflow, webops, multidev]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/multidev/multidev-faq
anchorid: multidev-faq
---

This section provides answers to frequently asked Multidev questions.

## Is Multidev available for all accounts?

Multidev is available to all organizations and users with [Gold Accounts](/guides/support/#support-features-and-response-times) and above, as well as their supporting partners and agencies.

### Who can access Multidev?

Multidev environments that are already created on a Pantheon site are available to all users with access to the site.

You can create a new Multidev if you:

- Belong to a Gold Account or above

- Support a site that is owned by a Gold Account customer or above

<Alert title="Note"  type="info" >

Site admins of an organization with Multidev can invite independent contractors or set an agency as a supporting organization. The Pantheon system will automatically choose the highest account tier among the group. This logic makes Multidev features, including the ability to create Multidev environments, available to the supporting organization or the site team members on the associated sites.   

</Alert>

Visit the [Partner Program](https://pantheon.io/plans/partner-program?docs) page to learn more about the benefits of becoming a Pantheon Partner Agency, or [contact us](https://pantheon.io/contact-us?docs).

If you meet the conditions and still don't have access to an existing Multidev or the ability to create a new Multidev, please [contact Support](https://dashboard.pantheon.io/#support).

## How many Multidev environments do I get?

Each site has a limit of 10 Multidev environments.

[Autopilot](/guides/autopilot/) creates and uses a Multidev environment that does not count towards the total limit.

## Can I buy additional Multidev environments?

Elite sites can request additional Multidev environments [from support](/guides/support/contact-support/) as needed.

## If I use SFTP mode on a branch environment, do all environments have to be in SFTP mode?

No. Each branch environment can be independently set to use either SFTP or Git mode for code changes.

## What access controls or permissions are available?

At this time, there are no permissions or access controls for managing the deployment and development workflow beyond the existing team functionality. This is a known feature request and is scheduled for a future release.

## What are the naming conventions for branches?

Branch names can contain any ASCII letter and number (a through z, 0 through 9) and hyphen (dash). The branch name must start with a letter or number. Currently, the maximum length is 11 characters and environments cannot be created with the following reserved names: `master`, `settings`, `team`, `support`, `debug`, `multidev`, `files`, `tags`, and `billing`.

## Can I fork my code without using Multidev?

Yes. Your Git repository is not restricted. If you do not use Multidev, then the interface will not show the branches, allow creation of an environment for a branch, and so forth.

## Can I create a new environment for my local branch?

Yes. Push a new branch from your local (for example, `git push origin example-br`) then navigate to **Multidev** then **Git Branches** from your Site Dashboard and select **Create Environment** next to the branch name.

## Is there a limit on the number of branches or environments?

There is no limit on the number of branches you can have in your Git repository. The limit on Multidev environments is 10 per site.

## Can I associate a domain with a branch environment?

Yes, you can assign custom domains to each Multidev environment.

## What Git clients are supported?

You can use any Git client with Multidev. Use of the command-line Git client is recommended for compatibility with Dashboard instructions.

## Does Multidev support remote repositories, such as GitHub?

At this time, Multidev on Pantheon will only work with the Pantheon hosted code repository. You can use remote repositories with your workflow, but Multidev on Pantheon will only recognize changes pushed to Pantheon.

## Is there a public API available for post-commit hooks or other integrations with external project management systems?

No, but developers can use [Quicksilver hooks](/quicksilver#hooks) to integrate Multidev creation and other workflows with external services.

## Can I backup and restore a branch environment?

Yes, you can backup and restore a branch environment. However, if you restore an old version of code in Dev, you may damage Multidev environments.

## Will I lose access to Multidev environments if the organization downgrades the plan?

If the organization changes to a plan that doesn't feature Multidev, you will still be able to access existing Multidev environments, but will not be able to create new ones.

## How long will the Multidev stay active?

Multidev environments spin down after approximately 60 minutes of idle time. Refer to the [Idle Containers](https://pantheon.io/docs/application-containers#idle-containers) documentation for more information.

## Creating a Multidev Failed - Specified Key Was Too Long

Users encounter this error with sites that use the MyISAM engine with a varchar index that exceeds 767 bytes. To resolve, [convert MyISAM tables to InnoDB](/guides/mariadb-mysql/myisam-to-innodb).

## More Resources

- [Multidev Guide](/guides/multidev)

- [Developing on Pantheon Directly with SFTP Mode](/sftp)

- [Git on Pantheon](/guides/git)