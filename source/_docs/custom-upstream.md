---
title: Introduction to Custom Upstreams
description: Learn how to use Custom Upstreams to free up developer time.
tags: [tools, workflow]
categories: []
---
Agency and EDU organizations can create and update sites from a common codebase using a Custom Upstream, which can be selected by members of an organization during site creation. If you don’t have a [Pantheon for Agencies](https://pantheon.io/agencies/pantheon-for-agencies) or [EDU](https://pantheon.io/edu) account you can create one for free.

## Benefits

### Standardize Design and Functionality Across Many Sites
Custom Upstreams act as a scaffold for new sites, allowing developers and site owners of any skill level to kickoff projects at warp speed.

Instead of repeating the same technical work on each individual site, you can build and maintain a common user interface with unified branding and functionality once, in a single source.

> Learn how the web team at Weill Cornell Medical College used Custom Upstreams to rescue 100+ websites from design anarchy in [this case study](https://pantheon.io/resources/weill-cornell-drupal-distribution-case-study).

### Efficient Update Strategy
Not only does this workflow free up developer time, it establishes a sustainable and scalable process for handling updates across massive site portfolios.

New features and functionality can be continuously developed in the Custom Upstream repository, then distributed to each site, where they can be applied with a single click by site owners.

> See how Forum One uses this process to build, launch, and manage nearly 200 satellite sites for Fairfax County Public Schools in [this case study](https://pantheon.io/resources/forum-one-pantheon-fairfax-county-public-schools-drupal-case-study).

### Scale Client Services
Spend less time doing non-core activities and reclaim lost billable hours where it counts most. Custom Upstreams help improve support efficiency by empowering non-technical clients and junior developers to handle lower-level support issues, such as creating a new site or applying updates. This gives advanced developers more time to focus on higher-level support work and new features.

> Hear from Kalamuna how this process liberates developers and empowers newbies to provide ridiculously awesome support in [this case study](https://pantheon.io/resources/kalamuna-pantheon-drupal-agency-case-study).


## Terminology
Here are definitions for commonly used terms:

* **Upstream**: A repository that acts as a parent for another repository, like [Pantheon's WordPress Upstream](https://github.com/pantheon-systems/wordpress). The next two definitions are specific types of Upstreams.
* **Custom Upstream**: A repository restricted to members of an organization, containing a common codebase for new sites. This type of repository is a child repository to Pantheon's core upstreams ([WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 8](https://github.com/pantheon-systems/drops-8), [Drupal 7](https://github.com/pantheon-systems/drops-7)) and acts as a parent for site level repositories.
* **Public Upstream**: A repository that is open to all Pantheon users which contains a common codebase for new sites, like [Panopoly](https://github.com/populist/panopoly-drops-7).
* **Repository**: A collection of files packaged in a single directory, usually version controlled.
* **Remote Repository**: A collection of files that are stored in a remote and central location.
* **Upstream Updates**: Code changes that are made once in a parent (upstream) repository, then applied "downstream" to child repositories. This is how Pantheon's one-click updates work.
* **Site Repository**: Child repository where upstream updates are applied and site specific customizations are tracked, like your site's codebase on Pantheon.

## Workflow Overview
There are three levels of repositories in play here, and updates flow "downstream" from one level to another.

### Level One: Pantheon's Core Upstream
The top level repository will be one of Pantheon's core upstreams (either [WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 8](https://github.com/pantheon-systems/drops-8), or [Drupal 7](https://github.com/pantheon-systems/drops-7)). Core upstream updates are distributed by Pantheon and must be applied downstream.

### Level Two: Your Custom Upstream
The second level repository is a Custom Upstream, where core updates from Pantheon are pulled in and modifications to your common codebase are distributed (e.g. parent theme and plugin/module version updates).

The Custom Upstream repository is hosted outside of Pantheon using a provider like [GitHub](https://github.com/), [BitBucket](https://bitbucket.org/) or [GitLab](https://about.gitlab.com/). It's connected to Pantheon and associated with your organization, allowing fellow team members the option to select this repository as a starting point when creating new sites:

![Create custom upstream](/source/docs/assets/images/empty-state-diagram.svg)

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">We do not recommend Custom Upstreams for Drupal 8 sites managed by Composer at this time. For an alternative workflow, checkout [Using GitHub Pull Requests with Composer and Drupal 8](/docs/guides/github-pull-requests/).</p>
</div>

### Level Three: Site Repository
Finally, core updates and changes to the common codebase make their way down to the site repository for each site that uses the Custom Upstream.

The site repository allows separation between common code across all sites, tracked in the Custom Upstream, and site specific customizations, tracked in each individual site and facilitates rolling out updates quickly and easily:

![Site Updates Available](/source/docs/assets/images/dashboard/updates-available-2.png)


## Next Steps

Once you've grasped the concepts discussed above, you're ready to create your own Custom Upstream.

- [Create a Custom Upstream](/docs/create-custom-upstream)
