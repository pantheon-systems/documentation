---
title: Autopilot for Custom Upstreams
subtitle: Use Custom Upstream and Autopilot on WordPress 
description: Set up your WordPress site to use Custom Upstream and Autopilot.
categories: [develop]
tags: [autopilot, upstreams]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/autopilot-custom-upstream/wp-autopilot-custom-upstream
anchorid: wp-autopilot-custom-upstream
---

This section provides information and steps to for setting up your WordPress site to run Autopilot and perform VRT on each individual site while ensuring that your Custom Upstream codebase remains authoritative and up-to-date.

This setup runs Autopilot on the Custom Upstream site and on each child site. You must set the scope of the upstream to ensure that you do not create conflicts by running Autopilot at both levels. This setup also allows Autopilot to run your Custom Upstream deployments.


## Create a Custom Upstream WordPress Site that uses Autopilot

The simplest way to start your Custom Upstream journey is to create a new, vanilla WordPress site. The new site’s repository will be the starting point for your Custom Upstream codebase, and will be the only place Autopilot actually affects our yCustom Upstream code. 

1. Name the site in a way that identifies it as the Custom Upstream, for example “Green Sites Upstream”.

1. Install WordPress and generate two or three pages of content.

1. [Activate Autopilot](/guides/autopilot/enable-autopilot/#enable-autopilot) and select all three scopes – upstream, plugins, themes under **What Should Autopilot Update?** 

    - Selecting the Upstream scope ensures Autopilot keeps WordPress core up-to-date.

1. Test the Custom Upstream Autopilot setup by selecting the content pages you created for VRT.  

    - These are not public-facing pages, but serve as a generic test case for Autopilot at the Custom Upstream level.



## Configure the Custom Upstream

The site you created in the steps above will be your Custom Upstream code. You must store code in your your preferred Git host (for example, GitHub, Bitbucket or Gitlab).  

1. Follow the steps to [Create and Host the Repository Remotely](/guides/autopilot-custom-upstream/create-custom-upstream##create and host the repository remotely).

1. Clone the Pantheon repository locally.

1. Add the Git host as a remote to your local repository.

1. Push to the Git host.

1. Create your Custom Upstream on Pantheon from the Git repository you just created.


## Using Autopilot with Your Upstream Representative Site

Autopilot will merge code into master on your Pantheon repository when it runs. However, you still need this code to end up in your external repository. This is one area where you probably have some specific workflow requirements, but there are a couple of simple ways to handle this scenario.

1. Use the [sync_code Quicksilver hook](/quicksilver#hooks) to push updates back to your remote repository.

This workflow ensures all developer work on your Custom Upstream remote repository is reflected in real time on the Pantheon site because Autopilot is always branching off an up-to-date master branch. Code is pushed back to your Custom Upstream remote repository whenever Autopilot runs and merges code into the master.

Any new sites you create from our Custom Upstream will have fresh, up-to-date code as the starting point. It also means any site you create from this Custom Upstream can use Autopilot to apply our Upstream updates on a regular basis.

1. Manually pull in code from the Pantheon repository and push to your remote repository.

This option works in much the same way as the option above, but relies on you to remember to pull code from your Pantheon repository and push it to your remote repository every time you make a change.

## More Resources

- [Getting Started with Git](/git)

- [Undo Git Commits](/undo-commits)

- [Git FAQs](/git-faq)