---
title: Autopilot for Custom Upstreams
subtitle: Custom Upstream and Autopilot for WordPress 
description: Set up your WordPress site to use Custom Upstream and Autopilot.
categories: [develop]
tags: [autopilot, upstreams]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/autopilot-custom-upstream/wp-autopilot-custom-upstream
anchorid: wp-autopilot-custom-upstream
---

This section provides information and steps to for setting up your WordPress site to run [Autopilot](/guides/autopilot). This allows you to perform VRT on individual sites while ensuring that your [Custom Upstream](/guides/custom-upstream) codebase remains authoritative and up-to-date.

This setup runs Autopilot on the Custom Upstream site and on each child site. You must set the scope of the upstream to ensure that you do not create conflicts by running Autopilot at both levels. This setup also allows Autopilot to run your Custom Upstream deployments.


## Create a Custom Upstream WordPress Site and Enable Autopilot

The simplest way to start your Custom Upstream journey is to create a new, vanilla WordPress site. The new site’s repository will be the starting point for your Custom Upstream codebase, and will be the only place Autopilot actually affects your Custom Upstream code. 

1. Name the site in a way that identifies it as the Custom Upstream, for example “Sites Upstream”.

1. [Create a new WordPress site](/create-sites#create-a-site) and generate two or three pages of content.

1. [Activate Autopilot](/guides/autopilot/enable-autopilot/#enable-autopilot) and select all three scopes – upstream, plugins, and themes under **What Should Autopilot Update?** 

    - Selecting the Upstream scope ensures Autopilot keeps WordPress core up-to-date.

1. Test the Custom Upstream Autopilot setup by selecting the content pages you created for VRT.  

    - These are not public-facing pages, but serve as a generic test case for Autopilot at the Custom Upstream level.


## Configure the Custom Upstream

The site you created in the steps above will be your Custom Upstream codebase. You must store code in your your preferred Git host (for example, GitHub, Bitbucket or Gitlab).  

1. Follow the steps to [Create and Host the Repository Remotely](/guides/custom-upstream/create-custom-upstream#create-and-host-the-repository-remotely).

1. Clone the Pantheon repository locally.

1. Add the Git host as a remote to your local repository.

1. Push to the Git host.

1. [Create your Custom Upstream](/guides/custom-upstream/create-custom-upstream#connect-repository-to-pantheon) on Pantheon from the Git repository you just created.


## Using Autopilot with Your Upstream Representative Site

Autopilot will merge code into the master branch on your Pantheon repository when it runs. However, you still need this code to end up in your external repository. This is one area where you probably have some specific workflow requirements. There are a couple of simple ways to handle this scenario.

1. Use the [sync_code Quicksilver hook](/quicksilver#hooks) to push updates back to your remote repository.

This workflow ensures all developer work on your Custom Upstream remote repository is reflected in real-time on the Pantheon site because Autopilot is always branching off an up-to-date master branch. Code is pushed back to your Custom Upstream remote repository whenever Autopilot runs and merges code into the master.

Any new sites you create from our Custom Upstream will have fresh, up-to-date code as the starting point. It also means any site you create from this Custom Upstream can use Autopilot to apply your Upstream updates on a regular basis.

1. Manually pull in code from the Pantheon repository and push to your remote repository.

This option works in much the same way as the option above, but relies on you to remember to pull code from your Pantheon repository and push it to your remote repository every time you make a change.

## More Resources

- [Getting Started with Git](/git)

- [Undo Git Commits](/undo-commits)

- [Git FAQs](/git-faq)