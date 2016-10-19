---
title: Terminus Manual: Example Usage
terminuspage: true
terminustoc: true
type: terminuspage
tags: [terminus]
categories: [managing]
---
## Applying Updates

### Upstream Updates (Core)
List all upstream updates:
<div>
<button class="btn btn-default btn-clippy" data-clipboard-target="#updates-list"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure><pre id="updates-list"><code class="bash" data-lang="bash">terminus upstream:updates:list my-site</code></pre></figure>
</div>

In order to apply upstream updates, the Dev environment's connection mode must be set to Git. If the Dev environment has uncommitted SFTP changes, commit them with the following command:
<div>
<button class="btn btn-default btn-clippy" data-clipboard-target="#commit-sftp"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure><pre id="commit-sftp"><code class="bash" data-lang="bash">terminus env:commit my-site.dev --message="My code changes"</code></pre></figure>
</div>
Then toggle the environment's connection mode to Git:
<div class="alert alert-danger">
<h4>Warning</h4>
The following command will permanently delete all uncommitted SFTP changes. If you wish to keep SFTP changes, commit your work before proceeding.
</div>
<div>
<button class="btn btn-default btn-clippy" data-clipboard-target="#toggle-git"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure><pre id="toggle-git"><code class="nohighlight" data-lang="bash">terminus connection:set my-site.dev git</code></pre></figure>
</div>


Apply all available updates to WordPress or Drupal core:
<div>
<button class="btn btn-default btn-clippy" data-clipboard-target="#updates-apply"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure><pre id="updates-apply"><code class="bash" data-lang="bash">terminus upstream:updates:apply my-site</code></pre></figure>
</div>

### Theme, Module, and Plugin Updates
<ul class="nav nav-tabs" role="tablist">
  <li id="wptab" role="presentation" class="active"><a href="#drupal" aria-controls="drupal" role="tab" data-toggle="tab">Drupal</a></li>
  <li id="drupaltab" role="presentation"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
</ul>
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="drupal">
    <!-- Drupal Content -->
    <p>First, set the Dev environment's connection mode to SFTP:</p>
    <div>
    <button class="btn btn-default btn-clippy" data-clipboard-target="#drupal-toggle-sftp"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
    <figure><pre id="drupal-toggle-sftp"><code class="nohighlight" data-lang="bash">terminus connection:set my-site.dev sftp</code></pre></figure>
    </div>
    <p>Apply updates to all contrib projects:</p>
    <div>
    <button class="btn btn-default btn-clippy" data-clipboard-target="#drupal-update-contrib"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
    <figure><pre id="drupal-update-contrib"><code class="bash" data-lang="bash">terminus drush my-site.dev 'pm-updatecode --no-core'</code></pre></figure>
    </div>
    <p>Commit contrib updates to the Dev environment:</p>
    <div>
    <button class="btn btn-default btn-clippy" data-clipboard-target="#drupal-updates-commit-sftp"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
    <figure><pre id="drupal-updates-commit-sftp"><code class="bash" data-lang="bash">terminus env:commit my-site.dev --message="Update all contrib projects"</code></pre></figure>
    </div>
  </div>
  <div role="tabpanel" class="tab-pane" id="wp">
    <!-- WordPress Content -->
    <p>First, set the Dev environment's connection mode to SFTP:</p>
    <div>
    <button class="btn btn-default btn-clippy" data-clipboard-target="#wp-toggle-sftp"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
    <figure><pre id="wp-toggle-sftp"><code class="nohighlight" data-lang="bash">terminus connection:set my-site.dev sftp</code></pre></figure>
    </div>
    <p>Apply updates to all plugins:</p>
    <div>
    <button class="btn btn-default btn-clippy" data-clipboard-target="#wp-update-plugins"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
    <figure><pre id="wp-update-plugins"><code class="bash" data-lang="bash">terminus wp my-site.dev 'plugin update --all'</code></pre></figure>
    </div>
    <p>Apply updates to all themes:</p>
    <div>
    <button class="btn btn-default btn-clippy" data-clipboard-target="#wp-update-themes"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
    <figure><pre id="wp-update-themes"><code class="bash" data-lang="bash">terminus wp my-site.dev 'theme update --all'</code></pre></figure>
    </div>
    <p>Commit plugin and theme updates to the Dev environment:</p>
    <div>
    <button class="btn btn-default btn-clippy" data-clipboard-target="#wp-updates-commit-sftp"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
    <figure><pre id="wp-updates-commit-sftp"><code class="bash" data-lang="bash">terminus env:commit my-site.dev --message="Update all plugins and themes"</code></pre></figure>
    </div>
  </div>
</div>
## Deploying Changes
Deploy changes from Dev to Test, sync content from Live into Test, and clear caches on Test:
<div>
<button class="btn btn-default btn-clippy" data-clipboard-target="#deploy-test"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure><pre id="deploy-test"><code class="bash" data-lang="bash">terminus env:deploy my-site.test --sync-content --note="Deploy core and contrib updates" --cc</code></pre></figure>
</div>


<div class="terminus-pager col-md-12">
  <hr>
      <a style="float:left;" href="/docs/terminus/install"><span class="terminus-pager-lsaquo">&lsaquo;</span>Installation</a>
      <a style="float:right;" href="/docs/terminus/commands"><span class="terminus-pager-rsaquo">&rsaquo;</span>Commands</a>
</div>
