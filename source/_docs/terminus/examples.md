---
title: Terminus Manual
subtitle: Example Usage
description: Review examples of Terminus commands most frequently used by power users.
terminusexample: true
terminuspage: true
terminustoc: true
type: terminuspage
layout: terminuspage
nexturl: terminus/commands/
previousurl: terminus/install/
permalink: docs/terminus/:basename/
image: terminus-thumbLarge
searchboost: 100
---

## &lt;site&gt;.&lt;env&gt;
Terminus command structure typically includes `<site>.<env>` in order to determine the target site and environment to execute against. Note that the `<>` symbols are part of the example, not to be included in your commands. For example, running the `env:clear-cache` command for the Live environment of a site labeled "Your Awesome Site":

![terminus env:clear-cache your-awesome-site.live](/source/docs/assets/images/terminus-example-cc.png)

<div class="panel panel-drop panel-guide" id="accordion">
<div class="panel-heading panel-drop-heading">
<a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#identify-site"><h3 class="panel-title panel-drop-title info" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Learn More</h3></a>
</div>
<div id="identify-site" class="collapse">
<div class="panel-inner" markdown="1">
<dl>
  <dt>Site Label</dt>
    <dd>Human readable, such as "Your Awesome Site", entered during site creation and displayed in the Site Dashboard.</dd>
  <dt>Site Name: &lt;site&gt;</dt>
    <dd markdown="1">Machine readable, such as "your-awesome-site", either derived automatically by the platform from the site label or uniquely defined during site creation via Terminus. This value is used to construct [platform domains](/docs/domains/#platform-domains). </dd>
  <dt>Environment Name: &lt;env&gt;</dt>
    <dd>Machine readable, such as "dev", "test", "live", or "bug123", which refers to the target site environment on Pantheon.</dd>
</dl>


You can also find your site's machine name using the Terminus command `site:info`, and the [site UUID](/docs/sites/#site-uuid). For example:

![terminus site:info e9ad4349-621e-4be6-9f94-f9646069d9e7 --field name](/source/docs/assets/images/terminus-examples-field-name.png)
</div>
</div>
</div>

## Applying Updates
Quickly install updates to core, contributed modules, themes, and plugins from the command line with Terminus.

### Upstream Updates (Core)
Pantheon maintains upstream updates for [WordPress](https://github.com/pantheon-systems/WordPress), [Drupal 8](https://github.com/pantheon-systems/drops-8), and [Drupal 7](https://github.com/pantheon-systems/drops-7). Updates can be applied once they have been merged into the upstream and become available for a site.

<div class="alert alert-info"><h4 class="note">Note</h4><p markdown="1">For instructions on how to resolve merge conflicts, see [Upstream Updates](/docs/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts)</p></div>

<p class="instruction">List available upstream updates:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#updates-list">Copy</button>
<figure><pre id="updates-list"><code class="command bash" data-lang="bash">terminus upstream:updates:list my-site</code></pre></figure>
</div>

<p class="instruction">If the environment's connection mode is currently set to SFTP with uncommitted work you want to keep, commit now before proceeding:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#commit-sftp">Copy</button>
<figure><pre id="commit-sftp"><code class="command bash" data-lang="bash">terminus env:commit my-site.dev --message="My code changes"</code></pre></figure>
</div>
<div class="alert alert-danger">
<h4 class="info">Warning</h4>
The following command will permanently delete all uncommitted SFTP changes. If you wish to keep SFTP changes, commit your work before proceeding.
</div>
<p class="instruction">Set the environment's connection mode to Git so updates can be pulled into the site from Pantheon's upstream:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#toggle-git">Copy</button>
<figure><pre id="toggle-git"><code class="command nohighlight" data-lang="bash">terminus connection:set my-site.dev git</code></pre></figure>
</div>


<p class="instruction">Apply available upstream updates for WordPress and Drupal core from the command line with Terminus:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#updates-apply">Copy</button>
<figure><pre id="updates-apply"><code class="command bash" data-lang="bash">terminus upstream:updates:apply my-site</code></pre></figure>
</div>

### Module, Theme, and Plugin Updates
Apply updates to all contributed modules, themes, and plugins via Terminus by setting the environment's connection mode to SFTP and invoking [Drush](/docs/drush) (Drupal) or [WP-CLI](/docs/wp-cli) (WordPress) update commands. You can then use Terminus to commit updates to a development environment on Pantheon.

<ul class="nav nav-tabs" role="tablist">
  <li id="wptab" role="presentation" class="active"><a href="#drupal" aria-controls="drupal" role="tab" data-toggle="tab">Drupal</a></li>
  <li id="drupaltab" role="presentation"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
</ul>
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="drupal">
    <!-- Drupal Content -->
    <p class="instruction">First, set the Dev environment's connection mode to SFTP:</p>
    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#drupal-toggle-sftp">Copy</button>
    <figure><pre id="drupal-toggle-sftp"><code class="command nohighlight" data-lang="bash">terminus connection:set my-site.dev sftp</code></pre></figure>
    </div>
    <p class="instruction">Apply updates to all contrib projects:</p>
    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#drupal-update-contrib">Copy</button>
    <figure><pre id="drupal-update-contrib"><code class="command bash" data-lang="bash">terminus drush my-site.dev -- pm-updatecode --no-core</code></pre></figure>
    </div>
    <p class="instruction">Commit contrib updates to the Dev environment:</p>
    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#drupal-updates-commit-sftp">Copy</button>
    <figure><pre id="drupal-updates-commit-sftp"><code class="command bash" data-lang="bash">terminus env:commit my-site.dev --message="Update all contrib projects"</code></pre></figure>
    </div>
  </div>
  <div role="tabpanel" class="tab-pane" id="wp">
    <!-- WordPress Content -->
    <p class="instruction">First, set the Dev environment's connection mode to SFTP:</p>
    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#wp-toggle-sftp">Copy</button>
    <figure><pre id="wp-toggle-sftp"><code class="command nohighlight" data-lang="bash">terminus connection:set my-site.dev sftp</code></pre></figure>
    </div>
    <p class="instruction">Apply updates to all plugins:</p>
    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#wp-update-plugins">Copy</button>
    <figure><pre id="wp-update-plugins"><code class="command bash" data-lang="bash">terminus wp my-site.dev -- plugin update --all</code></pre></figure>
    </div>
    <p class="instruction">Apply updates to all themes:</p>
    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#wp-update-themes">Copy</button>
    <figure><pre id="wp-update-themes"><code class="command bash" data-lang="bash">terminus wp my-site.dev -- theme update --all</code></pre></figure>
    </div>
    <p class="instruction">Commit plugin and theme updates to the Dev environment:</p>
    <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#wp-updates-commit-sftp">Copy</button>
    <figure><pre id="wp-updates-commit-sftp"><code class="command bash" data-lang="bash">terminus env:commit my-site.dev --message="Update all plugins and themes"</code></pre></figure>
    </div>
  </div>
</div>

### Mass Update
Terminus supports third-party plugins that extend it's functionality by adding new commands. The following example demonstrates usage of the [Mass Update](https://github.com/pantheon-systems/terminus-mass-update) plugin to easily apply upstream updates (core updates) in bulk. For instructions on how to install Terminus plugins, see [Extend with Plugins](/docs/terminus/plugins).

<p markdown="1" class="instruction">Install the [Mass Update](https://github.com/pantheon-systems/terminus-mass-update) plugin, then use the `--dry-run` option to review available upstream updates without applying them:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#dry-run">Copy</button>
<figure><pre id="dry-run"><code class="command bash" data-lang="bash">terminus site:list --format=list | terminus site:mass-update:apply --accept-upstream --updatedb --dry-run</code></pre></figure>
</div>

<p markdown="1" class="instruction">The output should be similar to this:</p>
```
 [notice] Found 3 sites.
 [notice] Fetching the list of available updates for each site...
 [notice] 3 sites need updates.
 [warning] Cannot apply updates to novasoft-drupal because the dev environment is not in git mode.
 [DRY RUN] Applying 2 updates to jessiem-drupal7
 [DRY RUN] Applying 10 updates to superb-central
```
<p markdown="1" class="instruction">Resolve warning messages shown in the `--dry-run` output by setting the connection mode to Git for each applicable site:</p>
<div class="alert alert-danger">
<h4 class="info">Warning</h4>
The following command will permanently delete all uncommitted SFTP changes. If you wish to keep SFTP changes, commit your work before proceeding.
</div>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#mass-update-git">Copy</button>
<figure><pre id="mass-update-git"><code class="command bash" data-lang="bash">terminus connection:set my-site.dev git</code></pre></figure>
</div>

<p markdown="1" class="instruction">Review output then apply the mass update by removing the `--dry-run` option:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#mass-update-apply">Copy</button>
<figure><pre id="mass-update-apply"><code class="command bash" data-lang="bash">terminus site:list --format=list | terminus site:mass-update:apply --accept-upstream --updatedb</code></pre></figure>
</div>

## Deploying Code
<p class="instruction">When you're ready to test a new set of changes, use Terminus to deploy code from development environments up to the Test environment while pulling the database and files down from Live:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#deploy-test">Copy</button>
<figure><pre id="deploy-test"><code class="command bash" data-lang="bash">terminus env:deploy my-site.test --sync-content --note="Deploy core and contrib updates" --cc</code></pre></figure>
</div>
<p class="instruction">After testing changes, use Terminus to deploy code from Test up to Live:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#deploy-live">Copy</button>
<figure><pre id="deploy-live"><code class="command bash" data-lang="bash">terminus env:deploy my-site.live --note="Deploy core and contrib updates" --cc</code></pre></figure>
</div>

## Reset Dev Environment to Live

There are a few scenarios where it may be useful to reset your Dev environment (codebase, files, and database) to the state of Live:

* Development work that is not ready to go live has been committed directly to the Dev environment, blocking the deployment pipeline for other work ready to be deployed. After preserving work in progress on a local branch or on a [Multidev](/docs/multidev) environment you can unblock deploys by resetting the Dev environment to reflect the state of Live.

* Code changes have been force-pushed or incorrectly merged into the Dev environment creating a large or complex Git history that you wish to undo.

* The state of the Dev environment is stale or otherwise massively out of date with the Live environment with many unneeded changes you wish to abandon.

* The Dev environment has been seriously corrupted and you would like to cleanly reset it to Live.

<p class="instruction">Start by cloning the site's codebase to your local machine if you have not done so already (replace <code>awesome-site</code> with your site name):</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#git-clone">Copy</button>
<figure><pre id="git-clone"><code class="command bash" data-lang="bash">`terminus connection:info awesome-site.dev --fields='Git Command' --format=string`</code></pre></figure>
</div>


<p class="instruction">Then automate the procedure for resetting Dev to Live by downloading the following bash script:</p>
<div class="script-file-header">
reset-dev-to-live.sh
<a id="downloadLink"><button class="btn btn-default btn-download"><i class="fa fa-download" aria-hidden="true"></i>   Download Script
</button></a>
</div>
<pre><code id="reset-dev-to-live">#!/bin/bash

#Authenticate Terminus
terminus auth:login

#Provide the target site name (e.g. your-awesome-site)
echo 'Provide the site name (e.g. your-awesome-site), then press [ENTER] to reset the Dev environment to Live:';
read SITE;

#Set the Dev environment's connection mode to Git
echo "Making sure the environment's connection mode is set to Git...";
terminus connection:set $SITE.dev git

#Identify the most recent commit deployed to Live and overwrite history on Dev's codebase to reflect Live
echo "Rewriting history on the Dev environment's codebase...";
git reset --hard `terminus env:code-log $SITE.live --format=string | grep -m1 'live' | cut -f 4`

#Force push to Pantheon to rewrite history on Dev and reset codebase to Live
git push origin master -f

#Clone database and files from Live into Dev
echo "Importing database and files from Live into Dev...";
terminus env:clone-content $SITE.live dev

#Open the Dev environment on the Site Dashboard
terminus dashboard:view $SITE.dev</code></pre>

<p class="instruction">Execute the script from the command line within the root directory of your site's codebase to reset Dev to Live:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#run-reset-script">Copy</button>
<figure><pre id="run-reset-script"><code class="command bash" data-lang="bash">sh /PATH/TO/SCRIPT/reset-dev-to-live.sh</code></pre></figure>
</div>

The Site Dashboard will open once the reset procedure has completed.

## Switch Upstreams
Every site has an upstream assigned in order to deliver [one-click updates](/docs/core-updates/) in the Pantheon Site Dashboard. Terminus can be used to manage this site level configuration. There are a few scenarios where it may be useful to change a site's upstream:

* Convert existing sites from a default framework to a [Custom Upstream](/docs/custom-upstream/).
* Convert existing sites from one Custom Upstream to another, for reasons like:
  * Repository has been migrated from Bitbucket to Github, or vice versa.
  * Code has been refactored and moved to a new repository.
* Set an empty upstream to disable one-click updates for sites managed by Composer.

To see all available upstreams, run:

  <div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#upstream-list">Copy</button>
  <figure><pre id="upstream-list"><code class="command bash" data-lang="bash">terminus upstream:list</code></pre></figure></div>

If your organization has a <a href="/docs/custom-upstream/">Custom Upstream</a>, you can use Terminus to switch existing sites over to the common codebase:

  <div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#upstream-set">Copy</button>
  <figure><pre id="upstream-set"><code class="command bash" data-lang="bash">terminus site:upstream:set my-site "My Custom Upstream"</code></pre></figure>
  </div>
  
You can use any valid identifier (upstream name, upstream machine name, upstream UUID) returned in `terminus upstream:list` to set a new upstream. For example, the upstream name "My Custom Upstream" is used above. 

As a safeguard, Terminus will prevent a framework switch such as moving from Drupal to WordPress or vice versa.

  <div class="alert alert-info"><h4 class="note">Note</h4><p markdown="1">To set an empty upstream for Composer managed sites, see [Serving Sites from the Web Subdirectory](/docs/nested-docroot/).</p></div>

After setting the upstream, you must bring in the new codebase by applying updates to the site. For details on how to apply updates, see the [example usage above](#applying-updates).
