---
title: Autopilot for Custom Upstreams
subtitle: Custom Upstream and Autopilot for WordPress 
description: Set up your WordPress site to use Custom Upstream and Autopilot.
tags: [autopilot, upstreams]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/autopilot-custom-upstream/wp-autopilot-custom-upstream
anchorid: wp-autopilot-custom-upstream
contenttype: guide
categories: [automate]
newcms: []
audience: [development]
product: [autopilot]
integration: []
---

This section provides information and steps to set up your WordPress site to run [Autopilot](/guides/autopilot). This allows you to perform VRT on individual sites while ensuring that your [Custom Upstream](/guides/custom-upstream) codebase remains updated and authoritative.

This setup runs Autopilot on the Custom Upstream site and on each child site. You must set the scope of the upstream to ensure that you do not create conflicts by running Autopilot at both levels. This setup also allows Autopilot to run your Custom Upstream deployments.


## Create a Custom Upstream WordPress Site and Enable Autopilot

The simplest way to start your Custom Upstream journey is to create a new, vanilla WordPress site. The new site’s repository will be the starting point for your Custom Upstream codebase, and will be the only place Autopilot actually affects your Custom Upstream code. 

1. Name the site in a way that identifies it as the Custom Upstream, for example “Sites Upstream”.

1. [Create a new WordPress site](/guides/legacy-dashboard/create-sites#create-a-site) and generate two or three pages of content.

1. [Activate Autopilot](/guides/autopilot/enable-autopilot/#enable-autopilot) and select all three scopes – upstream, plugins, and themes under **What Should Autopilot Update?** 

    - Selecting the Upstream scope ensures Autopilot keeps WordPress core updated.

1. Test the Custom Upstream Autopilot setup by selecting the content pages you created for VRT.  

    - These are not public-facing pages that serve as a generic test case for Autopilot at the Custom Upstream level.


## Configure the Custom Upstream

The WordPress site you created in the steps above will be your Custom Upstream codebase. You must store code in your your preferred Git host (for example, GitHub, Bitbucket, or Gitlab).  

1. Follow the steps to [Create and Host the Repository Remotely](/guides/custom-upstream/create-custom-upstream#create-and-host-the-repository-remotely).

1. Clone the Pantheon repository locally.

1. Add the Git host as a remote to your local repository.

1. Push to the Git host.

1. [Create your Custom Upstream](/guides/custom-upstream/create-custom-upstream#connect-repository-to-pantheon) on Pantheon from the Git repository you just created.


## Using Autopilot with Your Upstream Representative Site

Autopilot will merge code into the master branch on your Pantheon repository when it runs. However, you still need this code to be pushed to your external repository. This is an area where you probably have some specific workflow requirements. There are two simple ways to handle this scenario.

### Push Updates with Quicksilver sync_code

You can use the [sync_code Quicksilver hook](/guides/quicksilver/hooks) to push updates to your remote repository.

This workflow ensures all developer work on your Custom Upstream remote repository is reflected in real-time on the Pantheon site. Autopilot continuously branches off an updated master branch. Code is pushed back to your Custom Upstream remote repository whenever Autopilot runs and merges code into the master.

Any new sites you create from your Custom Upstream will have up-to-date code as the starting point. Additionally, any site you create from this Custom Upstream can use Autopilot to apply your Custom Upstream updates on a regular basis.

### Push Updates Manually

You can manually pull in code from the Pantheon repository and push to your remote repository.

This method works in much the same way as the [sync_code Quicksilver hook](/guides/quicksilver/hooks) option, but relies on you to remember to pull code from your Pantheon repository and push it to your remote repository every time you make a change.

## More Resources

- [Automate and Integrate your WebOps Workflow with Quicksilver](/guides/quicksilver)

- [WordPress and Drupal Core Updates](/core-updates)

- [WordPress on Pantheon Quick Start Guide](/guides/wordpress-pantheon/)