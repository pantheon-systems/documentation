---
title: Introduction to Custom Upstreams
description: Learn upstream terminology and how to use custom upstreams to free up developer time.
tags: [tools, workflow]
categories: []
---
Agency and EDU organizations can create and update sites from a common codebase using a Custom Upstream, which can be selected by members of an organization during site creation. If you don’t have a [Pantheon for Agencies](https://pantheon.io/agencies/pantheon-for-agencies) or [EDU](https://pantheon.io/edu) account you can create one for free.

## Benefits

### Standardize Design and Functionality Across Many Sites
Custom Upstreams act as a scaffold for new sites, allowing developers and site owners of any skill level the ability kickoff projects at warp speed.

Instead of repeating the same technical work on each individual site, you can build and maintain a common user interface with unified branding and functionality once in a single source.

Learn how the web team at Weill Cornell Medical College used Custom Upstreams to rescue 100+ websites from design anarchy in [this case study](https://pantheon.io/resources/weill-cornell-drupal-distribution-case-study).

### Efficient Update Strategy
Not only does this workflow free up developer time, it establishes a sustainable and scalable process for handling updating across massive site portfolios.

New features and functionality can be continuously developed in the Custom Upstream repository overtime then distributed to each individual site where they can be applied with a single click by site owners:

![EDU Upstream Flow](/source/docs/assets/images/edu-upstream-repository.jpg)

See how Forum One uses this process to build, launch, and manage nearly 200 satellite sites for Fairfax County Public Schools in [this case study](https://pantheon.io/resources/forum-one-pantheon-fairfax-county-public-schools-drupal-case-study).

### Scale Client Services
Spend less time doing non-core activities and reclaim lost billable hours where it counts most. Custom Upstreams help improve support efficiency by empowering non-technical clients and junior developers to handle lower-level support issues, such as creating a new site or applying updates. This gives advanced developers more time to focus on higher-level support work and new features.

Hear from Mike Pirog of Kalamuna how this process liberates developers and empowers newbies to provide ridiculously awesome support in [this case study](https://pantheon.io/resources/kalamuna-pantheon-drupal-agency-case-study).


## Terminology
Let's agree on definitions for some commonly used terms:

* **Upstream**: An additional repository that acts as a parent for another repository, like [Pantheon's WordPress Upstream](https://github.com/pantheon-systems/wordpress).
* **Custom Upstream**: Repository that is restricted to members of an organization which contains a common codebase for new sites. This type of repository is a child repository to Pantheon's core upstreams ([WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 8](https://github.com/pantheon-systems/drops-8), [Drupal 7](https://github.com/pantheon-systems/drops-7)) and acts as a parent for site level repositories.
* **Public Upstream**: Repository that is open to all Pantheon users which contains a common codebase for new sites, like [Panopoly](https://github.com/populist/panopoly-drops-7).
* **Repository**: Collection of files that are packaged in a single directory.
* **Remote Repository**: Collection of files that are stored in a remote and central location.
* **Upstream Updates**: Code changes that are made once in the parent repository, then applied "downstream" to child repositories. This is how Pantheon's one-click updates work.
* **Site Level Repository**: Child repository where upstream updates are applied and site specific customizations are tracked, like your site's codebase on Pantheon.

## Workflow Overview
There are three levels of repositories in play here, and updates flow "downstream" from one level to another. Here's an example workflow for a Custom Upstream based on WordPress:

![WordPress Custom Upstream Example Flow](/source/docs/assets/images/upstream-flow.png)

### Level One: Pantheon's Core Upstream
The top level repository will be one of Pantheon's core upstreams (either [WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 8](https://github.com/pantheon-systems/drops-8), or [Drupal 7](https://github.com/pantheon-systems/drops-7)). Core upstream updates are distributed by Pantheon and must be applied downstream.

### Level Two: Your Custom Upstream
The second level repository is a Custom Upstream, where core updates from Pantheon are pulled in and modifications to your common codebase are distributed (e.g. parent theme and plugin/module version updates).

![Create custom upstream](/source/docs/assets/images/empty-state-diagram.svg)

Your Custom Upstream will be hosted remotely, then connected with Pantheon to create new sites fast.

### Level Three: Site Codebase
Finally, core updates and changes to the common codebase make their way down to the site level repository for each site that uses the Custom Upstream.

The site level repository allows separation between common code across all sites, tracked in the Custom Upstream, and site specific customizations, tracked in each individual site and facilitates rolling out updates quickly and easily:

![Site Updates Available](/source/docs/assets/images/dashboard/updates-available-2.png)


## Next Steps

- [Create a Custom Upstream](/docs/create-custom-upstream)
