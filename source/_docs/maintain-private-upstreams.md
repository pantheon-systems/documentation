---
title: Best Practices for Maintaining Private Upstreams
description: Detailed information on how to merge updates to core, extensions, and themes running on Pantheon.
tags: [tools, workflow]
categories: []
---
Maintainer(s) of Private Upstreams bear the responsibility of pulling in core updates from Pantheon. Failure to run the most up-to-date version of core based on upstreams maintained by Pantheon ([WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 7](https://github.com/pantheon-systems/drops-7), and [Drupal 8](https://github.com/pantheon-systems/drops-8)) may cause incompatibilities with the platform (e.g. clear cache button, launch checks, cron, etc.).

## Automatically Test and Distribute Updates
TODO: How should users automate updates for a private upstream? The following can be set up on individual sites, but what's our happy path for achieving this on custom upstreams? The org would need a test site - maybe one for WordPress and one for Drupal - and the result of the script needs to push a commit to the remote repository, not Pantheon.

[Pantheon WordPress Auto Update](https://github.com/ataylorme/wordpress-at-scale-auto-update)

[Pantheon Drupal Auto Update](https://github.com/populist/drupal-auto-update)


## Manually Distribute Updates
1. Add Pantheon's Upstream as a [remote](https://git-scm.com/docs/git-remote) within a local clone of your Private Upstream repository if you haven't done so already:

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

2. Pull down changes from the appropriate upstream:

     <!-- Nav tabs -->
     <ul class="nav nav-tabs" role="tablist">
     <li role="presentation" class="active"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
     <li role="presentation"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
     <li role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
     </ul>

     <!-- Tab panes -->
     <div class="tab-content">
     <div role="tabpanel" class="tab-pane active" id="wp">
     <pre><code class="bash hljs">git fetch pantheon-wordpress
    git rebase pantheon-wordpress/master</code></pre>
     </div>
     <div role="tabpanel" class="tab-pane" id="d8">
     <pre><code class="bash hljs">git fetch pantheon-drops-8
    git rebase pantheon-drops-8/master</code></pre>
     </div>
     <div role="tabpanel" class="tab-pane" id="d7">
     <pre><code class="bash hljs">git fetch pantheon-drops-7
    git rebase pantheon-drops-7/master</code></pre>
     </div>
     </div>

3. Push to the Private Upstream's remote repository:

  ```nohighlight
  git push origin master
  ```

Updates will become available within an hour of being pushed to the remote repository on sites running the Private Upstream within your Organization. You can apply the updates on each site individually within the Site Dashboard or you can apply updates in bulk using [Terminus](/docs/terminus) and the [Mass Update](/docs/terminus/examples/#mass-update) plugin.
