---
title: Early Access: Create a Custom Upstream
description: Connect a remote repository with Pantheon to use as a starting point for new sites.
tags: [tools, workflow]
earlyaccess: true
earlynote: The documentation on this page discusses features and options that are not available across the entire platform.
---
Pantheon is rolling out a new self-serve feature to support creating Custom Upstreams in the Organization Dashboard. Once created, members of the organization will be able to create new sites from the common codebase. For an overview of this feature, see [Introduction to Custom Upstreams](/docs/custom-upstream).

## Eligibility
Access to this feature is currently invite only. If you are not in this group but are eager to try it out, you can request early access and we will consider this on a case-by-case basis. [TODO ADD LINK TO REQUEST INVITE]

## Create and Host the Repository Remotely
Custom Upstream repositories must be hosted outside of Pantheon using a provider like [GitHub](https://github.com/), [BitBucket](https://bitbucket.org/) or [GitLab](https://about.gitlab.com/).

This remote repository serves as the central location for the development and maintenance of your Custom Upstream. Updates are tracked here and distributed downstream to sites within your organization.

You can start by creating an empty repository on your preferred git hosting provider, or you can use an existing repository. Once you have the repository hosted remotely, clone it to your local computer. For help getting started, check out [GitHub's Hello World guide](https://guides.github.com/activities/hello-world/).


## Pull in Core from Pantheon's Upstream
To avoid incompatibilities, you must track Pantheon's corresponding upstream repository within the Custom Upstream.

1. Navigate to the Custom Upstream's root directory using the command line, then add the appropriate Pantheon upstream as a [remote](https://git-scm.com/docs/git-remote):
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li id="wptab1" role="presentation" class="active"><a href="#wp1" aria-controls="wp1" role="tab" data-toggle="tab">WordPress</a></li>
      <li id="d8tab1" role="presentation"><a href="#d81" aria-controls="d81" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li id="d7tab1" role="presentation"><a href="#d71" aria-controls="d71" role="tab" data-toggle="tab">Drupal 7</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="wp1">
    <pre id="git-pull-wp"><code class="command hljs" data-lang="hljs">git remote add pantheon-wordpress git://github.com/pantheon-systems/WordPress.git</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d81">
    <pre id="git-pull-drops-8"><code class="command hljs" data-lang="hljs">git remote add pantheon-drops-8 git://github.com/pantheon-systems/drops-8.git</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d71">
    <pre id="git-pull-drops-7"><code class="command hljs" data-lang="hljs">git remote add pantheon-drops-7 git://github.com/pantheon-systems/drops-7.git</code></pre>
    </div>
    </div><br>

2. Now that the Custom Upstream repository is tracking the corresponding Pantheon core upstream, we can pull in core:
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li id="wptab" role="presentation" class="active"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
      <li id="d8tab" role="presentation"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li id="d7tab" role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="wp">
    <pre id="git-pull-wp"><code class="command hljs" data-lang="hljs">git checkout master
    git fetch pantheon-wordpress
    git merge pantheon-wordpress/master
    git push origin master</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d8">
    <pre id="git-pull-drops-8"><code class="command hljs" data-lang="hljs">git checkout master
    git fetch pantheon-drops-8
    git merge pantheon-drops-8/master
    git push origin master</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d7">
    <pre id="git-pull-drops-7"><code class="command hljs" data-lang="hljs">git checkout master
    git fetch pantheon-drops-7
    git merge pantheon-drops-7/master
    git push origin master</code></pre>
    </div>
    </div>

## Grant Pantheon Access (Privately Hosted Repositories Only)
For privately hosted repositories, create a dedicated user with read-only access to the repository. The password should only contain alphanumeric characters, depending on your host's password limitations.

For private GitLab repositories, please ensure the user has the ["reporter" permissions level](https://docs.gitlab.com/ce/user/permissions.html#permissions).


If your repository is publicly accessible, you can skip this step.

## Connect Repository to Pantheon
1. Access the **<span class="upstreams-regular"></span> Upstreams** page in your Pantheon Organization Dashboard.
2. Click the **<span class="glyphicons glyphicons-plus"></span> Add Custom Upstream** button.
3. Enter the following information about the Custom Upstream:

  * **Name**
  * **Upstream Repository URL**: Must end in `.git` (Example: `user@repovendor.com:sub/file.git`)
  * **Repository Authentication (private repositories only)**: Only required if the repository is hosted privately
    * Refer to the user [created above](/docs/create-custom-upstream/#grant-pantheon-access-privately-hosted-repositories-only), and provide `username:password` or a [token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) if supported by your repository hosting provider.
  * **Framework**: Drupal 6 / Drupal 7, Drupal 8, Drupal 8 Backdrop, WordPress, WordPress Multisite
  * **Description**: (Optional) Less than 200 characters, plain text and markdown supported

4. Click **Create**.
## Edit Custom Upstream Settings
1. From your Organization Dashboard, click the **<span class="upstreams-regular"></span> Upstreams** tab.
2. Click **Edit** next to the existing upstream requiring an update.
3. Make desired updates

## Switch Site Upstreams
[TODO explain and crosslink to [terminus site:upstream:set](/docs/terminus/examples/#switch-upstreams)]
## Next Steps
- [Best Practices for Maintaining Custom Upstreams](/docs/maintain-custom-upstream)
