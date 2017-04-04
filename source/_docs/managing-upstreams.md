---
title: Managing Upstreams
description: Detailed information on how to merge updates to core, extensions, and themes running on Pantheon.
tags: [manage]
categories: [manage]
---
Upstream maintainers bear the responsibility of updating Drupal and WordPress core for their users each time the project releases a new version. Upstreams that are not kept up-to-date with core security updates of either framework are removed from the platform.

## Merging Core Releases
1. Create an update branch:

```bash
git checkout -b update
```
2. Pull down changes from the applicable core:

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
 git pull git://github.com/pantheon-systems/drops-8.git master
 </code></pre>
 </div>
 <div role="tabpanel" class="tab-pane" id="d7">
 <pre><code class="bash hljs">
 git pull git://github.com/pantheon-systems/drops-7.git master
 </code></pre>
 </div>
 <div role="tabpanel" class="tab-pane" id="d6">
 <pre><code class="bash hljs">
 git pull git://github.com/pantheon-systems/drops-6.git master
 </code></pre>
 </div>
 <div role="tabpanel" class="tab-pane" id="wp">
 <pre><code class="bash hljs">
 git pull git://github.com/pantheon-systems/WordPress.git master
 </code></pre>
 </div>
 </div>

3. Commit and push:

```nohighlight
git commit -m “Update to Drupal 7.33. http://link-to-release-notes”
git push origin update
```

## Adding or Updating Custom Code

Follow your organization’s process for managing Git repositories. Do not merge into the branch Pantheon is programmed to pull updates from, without testing first.

## Testing Your Updates

Using the testing site created when you submitted your distribution, test your updates for new installs and upgrades.

## Update Release Branching Strategy

We encourage you to use a continuous integration server, like Jenkins, Travis-CI, or Circle-CI, to automate this process.

For example:

1. Push updates into an `update` branch (not master) of your upstream repo.
2. Fetch remote repo into a local clone of your testing site.
3. Checkout the `update` branch.
4. Push the `update` branch to Pantheon.
5. Create a Multidev environment for the `update` branch.
6. Wipe the `update` Multidev environment.
7. Run acceptance tests for a new site installation use case.
8. Clone database and files from Live to your Multidev environment.
9. Test update process (run update.php) for an existing site update use case.
10. Merge to Dev and deploy code to Test and Live.
11. Test your updates against Live, ensuring that everything works in an environment with more than one application container (Business plans and above have two containers in Test).

## Deploy Updates to Downstream Sites

1. Prepare release notes.
2. Merge your pull request into the branch, providing a descriptive commit message. The message can follow the pattern: “Upstream release version, release notes http://link-to-release-notes”.

After you have merged an update, all sites that use the distribution can apply updates on the Site Dashboard at Dev > Code. It typically takes up to an hour before the update is detected. Use your browser’s hard refresh if the updates do not appear after the first hour (`cmd+shift+R` on OS X, `shift+f5` on Windows).
