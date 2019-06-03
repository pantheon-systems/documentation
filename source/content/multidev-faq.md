---
title: Multidev FAQ
description: A quick reference to answer some of the most frequently asked questions about Multidev.
tags: [tools, workflow]
categories: []
---
For information about what Multidev is and how to use it, see our full guide on [Multidev](/docs/multidev/).

## Who has access to Multidev?

Multidev is available to:

 - Enterprise organizations.
 - EDU organizations with [Gold support](/docs/support/#support-features-and-response-times) and above.
 - Pantheon Partner Program agencies (at the level of Pantheon Partner and above).
 - Direct Online customers with [Gold support](/docs/support/#support-features-and-response-times) and above.

Organizations with Multidev can assign unprivileged users who can access Multidev environments. See [Change Management](/docs/change-management/) for more information about roles and permissions.

Visit the [Partner Program Page](https://pantheon.io/agencies/partner-program){.external} to learn more about the benefits of becoming a Pantheon Partner Agency, or [contact us](https://pantheon.io/contact-us){.external}.

### Should I have access to Multidev?

Multidev is available if you:

 - Have been assigned a role as a member of an Organization that has the Multidev Feature (like a [Pantheon Preferred Partner](https://pantheon.io/agencies/partner-program){.external}).
 - Are a Direct Online customer with Gold support or above.

If you fully meet either of these conditions and still don't have access to Multidev, please [contact support](https://dashboard.pantheon.io/#support){.external}.

## How many Multidev environments do I get?

Each site has a limit of 10 Multidev environments.

## Can I buy additional Multidev environments?

Elite sites can request additional Multidev environments [from support](/docs/support/) as needed.

## If I use SFTP mode on a branch environment, do all environments have to be in SFTP mode?

No; each branch environment can be independently set to use either SFTP or Git mode for code changes.

## What access controls or permissions are available?

At this time, there are no permissions or access controls for managing the deployment and development workflow beyond the existing team functionality. This is a known feature request and is scheduled for a future release.

## What are the naming conventions for branches?

Branch names can contain any ASCII letter and number (a through z, 0 through 9) and hyphen (dash). The branch name must start with a letter or number. Currently, the maximum length is 11 characters and environments cannot be created with the following reserved names: `master`, `settings`, `team`, `support`, `debug`, `multidev`, `files`, `tags`  and `billing`.

## Can I fork my code without using Multidev?

Yes, you can; your Git repository is not restricted. If you do not use Multidev, then the interface will not show the branches, allow creation of an environment for a branch, and so forth.

## Can I create a new environment for my local branch?
Yes. Push a new branch from your local (e.g., `git push origin example-br`) then navigate to **Multidev** > **Git Branches** from your Site Dashboard and select **Create Environment** next to the branch name.

## Is there a limit on the number of branches or environments?
There is no limit on the number of branches you can have in your Git repository. The limit on forked environments is 10 per site.

## Can I associate a domain with a branch environment?

Yes, you can assign custom domains to each Multidev environment.

## What Git clients are supported?

You can use any Git client with Multidev. Use of the command-line Git client is recommended for compatibility with Dashboard instructions.

## Does Multidev support remote repositories, such as GitHub?

At this time, Multidev on Pantheon will only work with the Pantheon hosted code repository. You can use remote repositories with your workflow, but Multidev on Pantheon will only recognize changes pushed to Pantheon.

## Is there a public API available for post-commit hooks or other integrations with external project management systems?

No, but developers can use [Quicksilver hooks](/docs/quicksilver/#hooks) to integrate Multidev creation and other workflows with external services.

## Can I backup and restore a branch environment?

Yes, you can backup and restore a branch environment. However, if you restore an old version of code in Dev, you may damage forked environments.

## Will I lose access to Multidevs if the organization downgrades the plan?

If the organization changes to a plan that doesn't feature Multidev, you will still be able to access existing Multidev environments, but will not be able to create new ones.
