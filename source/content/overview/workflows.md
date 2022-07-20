---
title: Development Workflow
description: 
categories: [overview]
tags: [infrastructure]
contributors: [wordsmither]
permalink: docs/overview/workflows
---

The goal of the Developer workflow is to protect your live site as much as possible. In this workflow, code moves up and content moves down. Code changes are made in the Dev environment. Next, you’ll pull down the latest content from Live and deploy the code changes to Test. Once you verify that everything works as you expect it, you can deploy to Live.

The main process of the Pantheon Developer workflow is to move code up from Dev to Test to Live and content down from Live to Test to Dev. To facilitate this, we put files into our distributed filesystem, Valhalla, and code into the application containers. When you build or migrate your site to Pantheon, configuring the correct paths initially will avoid complications down the road.

## Components of a Site
One of the core concepts at the heart of the Pantheon WebOps workflow is the distinction between **code** and **content**.

### Code
Code refers to anything version controlled by Git which includes core, custom and contributed modules or plugins, themes, and libraries.

### Content
Content refers to your site's files and the database. In this context, files are static images and assets stored in the standard upload path `wp-content/uploads` for WordPress and `sites/default/files` for Drupal.

## Code Moves Up, Content Moves Down

![Dev Test and Live icon](../../images/code-workflow.png)

The main process of the Pantheon WebOps workflow is to move code up from Dev to Test to Live and content down from Live to Test to Dev. To facilitate this, we put [files](/files) into our distributed filesystem, Valhalla, and [code](/code) on to the application containers. When you build or migrate your site to Pantheon, configuring the correct paths initially will avoid complications down the road.

<Accordion title="Why does Pantheon do this?" id="why-tab" icon="question-sign">

#### Why does Pantheon do this?

Pantheon is an "[opinionated platform](https://stackoverflow.com/questions/802050/what-is-opinionated-software)". Specifically, we're of the opinion that it makes sense to separate the code and content because there is some level of separation between the people changing each. Generally speaking, the team members editing content expect to sign into a live environment, make changes, and immediately see the changes on that public site. Developers and designers changing code often prefer to make their changes on a non-live environment because the risk of breaking the site is too great. Changing code directly on a production environment is a practice we call "[Cowboy Coding](https://pantheon.io/blog/cowboy-coding-nostalgia)" and we greatly discourage it.

</Accordion>

## Workflow Options

Within this workflow, there are several ways you can manage and develop your sites.

- Manage multiple sites with [Custom Upstreams](https://pantheon.io/docs/guides/custom-upstream).
- Create sites by using Pantheon Upstreams, importing existing sites, [plus other methods](/start-state).
- Support large teams using [Multidev](/multidev).
- Migrate your site [from a competitor](/get-started).
- [Use the command line](/terminus) to manage and create sites.
- Develop using either [Git](/guides/git) or [SFTP](/sftp).
- Develop your sites [locally](/local-development).

There are even more tools and options available to you.  See [Develop](/develop) for more information.


## See Also

- [Use the Pantheon WebOps Workflow](/pantheon-workflow)
