---
title: Autopilot for Upstreams
subtitle: Upstream and Autopilot for WordPress
description: Set up your WordPress site to use upstream and Autopilot.
tags: [autopilot, upstreams]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/autopilot-upstream/wp-autopilot-upstream
contenttype: [guide]
innav: [false]
categories: [automate]
cms: [--]
audience: [development]
product: [autopilot]
integration: [--]
---

This section provides information and steps to set up your WordPress site to run [Autopilot](/guides/autopilot). This allows you to perform VRT on individual sites while ensuring that your [Upstream](/guides/upstream) codebase remains updated and authoritative.

This setup runs Autopilot on the upstream site and on each child site. You must set the scope of the upstream to ensure that you do not create conflicts by running Autopilot at both levels. This setup also allows Autopilot to run your upstream deployments.


## Create an upstream WordPress site and enable Autopilot

The simplest way to start your upstream journey is to create a new, vanilla WordPress site. The new site’s repository will be the starting point for your upstream codebase, and will be the only place Autopilot actually affects your upstream code.

1. Name the site in a way that identifies it as the upstream, for example “Sites Upstream”.

1. [Create a new WordPress site](/guides/legacy-dashboard/create-sites#create-a-site) and generate two or three pages of content.

1. [Activate Autopilot](/guides/autopilot/enable-autopilot/#enable-autopilot) and select all three scopes – upstream, plugins, and themes under **What Should Autopilot Update?**

    - Selecting the Upstream scope ensures Autopilot keeps WordPress core updated.

1. Test the upstream Autopilot setup by selecting the content pages you created for VRT.

    - These are not public-facing pages that serve as a generic test case for Autopilot at the upstream level.


## Configure the Upstream

The WordPress site you created in the steps above will be your upstream codebase. You must store code in your preferred Git host (for example, GitHub, Bitbucket, or GitLab).

1. Follow the steps to [Create and Host the Repository Remotely](/guides/upstream/create-upstream#create-and-host-the-repository-remotely).

1. Clone the Pantheon repository locally.

1. Add the Git host as a remote to your local repository.

1. Push to the Git host.

1. [Create your Upstream](/guides/upstream/create-upstream#connect-repository-to-pantheon) on Pantheon from the Git repository you just created.


## Using Autopilot with your upstream representative site

Autopilot will merge code into the master branch on your Pantheon repository when it runs. However, you still need this code to be pushed to your external repository. This is an area where you probably have some specific workflow requirements. There are two simple ways to handle this scenario.

### Push updates with Quicksilver sync_code

You can use the [sync_code Quicksilver hook](/guides/quicksilver/hooks) to push updates to your remote repository.

This workflow ensures all developer work on your upstream remote repository is reflected in real-time on the Pantheon site. Autopilot continuously branches off an updated master branch. Code is pushed back to your upstream remote repository whenever Autopilot runs and merges code into the master.

Any new sites you create from your upstream will have up-to-date code as the starting point. Additionally, any site you create from this upstream can use Autopilot to apply your upstream updates on a regular basis.

### Push updates manually

You can manually pull in code from the Pantheon repository and push to your remote repository.

This method works in much the same way as the [sync_code Quicksilver hook](/guides/quicksilver/hooks) option, but relies on you to remember to pull code from your Pantheon repository and push it to your remote repository every time you make a change.

## More resources

- [Automate and Integrate your WebOps Workflow with Quicksilver](/guides/quicksilver)

- [WordPress and Drupal Core Updates](/core-updates)

- [WordPress on Pantheon Quick Start Guide](/guides/wordpress-pantheon/)