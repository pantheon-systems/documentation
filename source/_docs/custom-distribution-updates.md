---
title: Updating Core for Sites with Outdated Versions on Custom Distributions
description: Learn to pull core updates when repository maintainers of alternate distributions are too slow.
keywords: upstream, core, core update, core updates, upstream updates, manually pull updates, manually update, manually update upstream, pull upstream updates, pull core updates
---
If your site reports a new version update is available and you don't see a [one-click update](/docs/upstream-updates) in your site's Dashboard, take a look at the upstream URL (**Settings** > **About Site**). If the recent commits are less than an hour or two old, wait and then access your Site Dashboard again to see if the one-click upstream update is available. If it's been more than an hour or two and you do see a recent commit in the upstream, open a support ticket. Otherwise, pull the updates into your site manually.


## Prerequisites
Core updates for [distributions](https://www.drupal.org/documentation/build/distributions) (Open Atrium, Commerce Kickstart, etc.) are serviced by the maintainer, but for the times in which those updates have not been pushed you can pull them into your site manually. To start, you'll need a local copy of your site's codebase:

1. Access the site's Dashboard and change the [connection mode](/docs/getting-started/#interact-with-your-code) to Git.
2. Copy the clone command.
 ![Git clone](/source/docs/assets/images/git_string.png)
3. In a local terminal, paste the command. Git will unpackage the code in a directory created using your site name.
4. Use `cd your-site-name` to navigate to the new folder.


## Pull Core Updates Manually
Navigate to the directory of your site's code repository on your local machine, then run the following commands to pull core version updates for the CMS version in use. The `Xtheirs` flag will attempt to automatically resolve conflicts with a preference for upstream changes and is safe to run if you don't have your own changes in any of the conflicting files (e.g. problems with .gitignore).

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li role="presentation"><a href="#d6" aria-controls="d6" role="tab" data-toggle="tab">Drupal 6</a></li>
  <li role="presentation"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="d8">
  <pre><code class="bash hljs">
  git pull -Xtheirs git://github.com/pantheon-systems/drops-8.git master
  # resolve conflicts
  git push origin master
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="d7">
  <pre><code class="bash hljs">
  git pull -Xtheirs git://github.com/pantheon-systems/drops-7.git master
  # resolve conflicts
  git push origin master
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="d6">
  <pre><code class="bash hljs">
  git pull -Xtheirs git://github.com/pantheon-systems/drops-6.git master
  # resolve conflicts
  git push origin master
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="wp">
  <pre><code class="bash hljs">
  git pull -Xtheirs git://github.com/pantheon-systems/WordPress.git master
  # resolve conflicts
  git push origin master  
  </code></pre>
  </div>
</div>

After testing to ensure everything looks good, deploy the updates to Test and Live. The same method can be applied to update [modules](https://www.drupal.org/node/1974964).

## Communicate
It's important to relay the need for updating core to distribution maintainers, even if you plan on manually pulling in core version updates. First, file an issue in the queue of your distribution and reach out to a maintainer. Even better - submit a pull request for the update.

## See Also
- [Managing Upstreams](/docs/manage-custom-upstream/)
- [Applying Upstream Updates](/docs/upstream-updates)
- [Undo Git Commits](/docs/upstream-updates)
