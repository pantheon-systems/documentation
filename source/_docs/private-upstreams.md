---
title: Introduction to Private Upstreams
description: Learn upstream terminology and how to use private upstreams to free up developer time.
tags: [tools, workflow]
categories: []
---
Agencies can create and update sites from a common codebase using a Private Upstream, which can be selected by members of an organization during site creation instead of the default [WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 7](https://github.com/pantheon-systems/drops-7), and [Drupal 8](https://github.com/pantheon-systems/drops-8) upstreams. If you don’t have a Pantheon for Agencies account you can [create one for free here](https://dashboard.pantheon.io/organizations/create-agency).

![upstreams](/source/docs/assets/images/upstreams.png)

## Benefits

### Save Developer Time
Private Upstreams act as a scaffold for new sites in your organization so you don't have to start from scratch. Instead of repeating the same technical work over and over, developers of any experience level can kickoff new projects at warp speed using a common start state.

### Long Term Sustainability
This provides your team with a centralized distribution strategy to reuse code between projects which will greatly reduce the burden of support and maintenance over time. Instead of updating sites individually, you can make an update once in the Private Upstream repository then push it out to all your sites.

## Terminology
Let's agree on definitions for some commonly used terms:

* **Repository**: Collection of files that are packaged in a single directory.
* **Remote Repository**: Collection of files that are stored in a remote and central location.
* **Upstream**: An additional repository that acts as a parent for another repository, like [Pantheon's WordPress Upstream](https://github.com/pantheon-systems/wordpress).
* **Upstream Updates**: Code changes that are made once in the parent repository, then applied "downstream" to child repositories. This is how Pantheon's one-click updates work.
* **Private Upstream**: Repository that is restricted to members of an organization which contains a common codebase for new sites. This type of repository is a child repository to Pantheon's core upstreams ([WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 8](https://github.com/pantheon-systems/drops-8), [Drupal 7](https://github.com/pantheon-systems/drops-7)) and acts as a parent for site level repositories.
* **Site Level Repository**: Child repository where upstream updates are applied and site specific customizations are tracked, like your site's codebase on Pantheon.

## Workflow Overview
There are three levels of repositories in play here, and updates flow "downstream" from one level to another. Here's an example workflow for a Private Upstream based on WordPress:

![WordPress Private Upstream Example Flow](/source/docs/assets/images/upstream-flow.png)

### Level One: Pantheon's Core Upstream
The top level repository will be one of Pantheon's core upstreams (either [WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 8](https://github.com/pantheon-systems/drops-8), or [Drupal 7](https://github.com/pantheon-systems/drops-7)). Core upstream updates are distributed by Pantheon and must be applied downstream.

### Level Two: Your Private Upstream
The second level repository is a Private Upstream, where core updates from Pantheon are pulled in and modifications to your common codebase are distributed (e.g. parent theme and plugin/module version updates).

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">Maintainer(s) of Private Upstreams bear the responsibility of pulling in core updates from Pantheon. Failure to run the most up-to-date version of core based on upstreams maintained by Pantheon ([WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 7](https://github.com/pantheon-systems/drops-7), and [Drupal 8](https://github.com/pantheon-systems/drops-8)) may cause incompatibilities with the platform (e.g. clear cache button, launch checks, cron, etc.).</p>
</div>


### Level Three: Site Codebase
Finally, core updates and changes to the common codebase make their way down to the site level repository for each site that uses the Private Upstream. The site level repository allows separation between common code across all sites, tracked in the Private Upstream, and site specific customizations, tracked in each individual site and facilitates rolling out updates quickly and easily:

![Site Updates Available](/source/docs/assets/images/dashboard/updates-available-2.png)

## Connect a Private Upstream with Pantheon
The following steps will help you get a Private Upstream ready for prime time within your organization. Once completed, you'll be able to create new sites from the common codebase.

### Create and Host the Repository Remotely
Private Upstream repositories must be hosted outside of Pantheon using a provider like [GitHub](https://github.com/), [BitBucket](https://bitbucket.org/) or [GitLab](https://about.gitlab.com/).

This remote repository serves as the central location for the development and maintenance of your Private Upstream. Updates are tracked here and distributed downstream to sites within your organization.

<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p markdown="1">Private Upstreams must not contain the tags `pantheon_test_n` or `pantheon_live_n`. Pantheon site level repositories use these tags to deploy code to Test and Live environments.</p>
</div>

Once you have the repository hosted remotely, clone it to your local. For help getting started, check out [GitHub's Hello World guide](https://guides.github.com/activities/hello-world/).


### Grant Pantheon Access (Private Repositories Only)
For privately hosted repositories, create a dedicated user with read-only access to the repository. The password should only contain alphanumeric characters.

For private GitLab repositories, please ensure the user has the ["reporter" permissions level](https://docs.gitlab.com/ce/user/permissions.html#permissions).

### Pull in Core from Pantheon's Upstream
To avoid conflicts and incompatibilities, it's highly recommended that you track Pantheon's corresponding upstream repository within any Private Upstream.

Navigate to the Private Upstream's root directory using the command line, then add the appropriate Pantheon upstream as a [remote](https://git-scm.com/docs/git-remote):
<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <li id="wptab1" role="presentation" class="active"><a href="#wp1" aria-controls="wp1" role="tab" data-toggle="tab">WordPress</a></li>
  <li id="d8tab1" role="presentation"><a href="#d81" aria-controls="d81" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li id="d7tab1" role="presentation"><a href="#d71" aria-controls="d71" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="wp1">
<pre id="git-pull-wp"><code class="command nohighlight" data-lang="bash">git remote add pantheon-wordpress git://github.com/pantheon-systems/WordPress.git</code></pre>
</div>
<div role="tabpanel" class="tab-pane" id="d81">
<pre id="git-pull-drops-8"><code class="command nohighlight" data-lang="bash">git remote add pantheon-drops-8 git://github.com/pantheon-systems/drops-8.git</code></pre>
</div>
<div role="tabpanel" class="tab-pane" id="d71">
<pre id="git-pull-drops-7"><code class="command nohighlight" data-lang="bash">git remote add pantheon-drops-7 git://github.com/pantheon-systems/drops-7.git</code></pre>
</div>
</div><br>

Now that the Private Upstream repository is tracking the corresponding Pantheon core upstream, we can pull in core:
<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <li id="wptab" role="presentation" class="active"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
  <li id="d8tab" role="presentation"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li id="d7tab" role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
<div role="tabpanel" class="tab-pane active" id="wp">
<pre id="git-pull-wp"><code class="command nohighlight" data-lang="bash">git checkout master
git fetch pantheon-wordpress
git merge pantheon-wordpress/master
git push origin master</code></pre>
</div>
<div role="tabpanel" class="tab-pane" id="d8">
<pre id="git-pull-drops-8"><code class="command nohighlight" data-lang="bash">git checkout master
git fetch pantheon-drops-8
git merge pantheon-drops-8/master
git push origin master</code></pre>
</div>
<div role="tabpanel" class="tab-pane" id="d7">
<pre id="git-pull-drops-7"><code class="command nohighlight" data-lang="bash">git checkout master
git fetch pantheon-drops-7
git merge pantheon-drops-7/master
git push origin master</code></pre>
</div>
</div>

### Submit Upstream Information
[Contact support](/docs/getting-support) with the subject: "Product submission for [organization]" and include the following information about the distribution:

- **Upstream Name**
- **Description**: (Optional) Less than 200 characters, plain text
- **URL of Logo**: (Optional) Recommended size is 70x80px
- **URL of Upstream Repository**: Must end in `.git`
- **Repository Authentication**: Only required if the repository is hosted privately
 - Create a dedicated user with read-only access and provide `username:password` or a [token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) if supported by your repository hosting provider. The password should only contain alphanumeric characters.
 - For private GitLab repositories, please ensure the user has the [reporter](https://docs.gitlab.com/ce/user/permissions.html#permissions) permissions level.
- **Repository Branch**: Typically `master`
- **Visibility**: Public (allow this upstream to be used by any Pantheon user) or Private (only allow members of your organization to use this upstream)
- **Initial Connection Mode**: Git or SFTP
- **Framework**: Drupal 6, Drupal 7, Drupal 8, Drupal 8 Backdrop, WordPress, WordPress Multisite


## Next Steps

- [Best Practices for Maintaining Private Upstreams](/docs/maintain-private-upstreams)
