---
title: Best Practices for Maintaining Private Upstreams
description: Detailed information on how to merge updates to core, extensions, and themes running on Pantheon.
tags: [tools, workflow]
categories: []
---
Maintainer(s) of Private Upstreams bear the responsibility of pulling in core updates from Pantheon. Failure to run the most up-to-date version of core based on upstreams maintained by Pantheon ([WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 7](https://github.com/pantheon-systems/drops-7), and [Drupal 8](https://github.com/pantheon-systems/drops-8)) may cause incompatibilities with the platform (e.g. clear cache button, launch checks, cron, etc.).


## Designated Test Site

1.

## Distribute Core Updates Downstream
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

You can now apply updates to sites running the Private Upstream within your Organization using the Site Dashboard. Or you can apply the updates in bulk using [Terminus](/docs/terminus) and the [Mass Update](/docs/terminus/examples/#mass-update) plugin.

## Automatically Test and Deploy Core Updates

[Pantheon WordPress Auto Update](https://github.com/ataylorme/wordpress-at-scale-auto-update)

1. Create a [CircleCI](https://circleci.com/) project
2. Add [environment variables to CircleCI](https://circleci.com/docs/environment-variables/) for the following:
  - `SITE_UUID`: [The Pantheon site UUID](/docs/sites/#site-uuid)
  - `TERMINUS_MACHINE_TOKEN`: [A Pantheon Terminus machine token with access to the site](/docs/machine-tokens)
  - `SLACK_HOOK_URL`: The [Slack incoming webhook](https://api.slack.com/incoming-webhooks) URL
  - `SLACK_CHANNEL`: The Slack channel to post notifications to
  - `SLACK_USERNAME`: The username to post to Slack with
3. Add an [SSH key](/docs/ssh-keys) to Pantheon and [to the CircleCI project](https://circleci.com/docs/permissions-and-access-during-deployment/).
4. Update the site UUID in the `.env` file
5. Update scenarios in `backstop.js` with URLs for pages you wish to check with visual regression
  - `url` refers to the live URL and `referenceUrl` refers to the same page on the Pantheon Multidev environment
6. Ping the [CircleCI API](https://circleci.com/docs/api/) at the desired frequency, e.g. daily, to run the script
