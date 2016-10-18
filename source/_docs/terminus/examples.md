---
title: Terminus Manual: Example Usage
terminuspage: true
terminustoc: true
type: terminuspage
tags: [terminus]
categories: [managing]
---
## Applying Updates

### Updating Core
List all upstream updates:
<div>
<button class="btn btn-default btn-clippy" data-clipboard-target="#updates-list"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure class="highlight"><pre id="updates-list"><code class="bash" data-lang="bash">terminus upstream:updates:list &lsaquo;site&rsaquo;</code></pre></figure>
</div>
Apply upstream updates:
<div>
<button class="btn btn-default btn-clippy" data-clipboard-target="#updates-apply"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
<figure class="highlight"><pre id="updates-apply"><code class="bash" data-lang="bash">terminus upstream:updates:apply &lsaquo;site&rsaquo;</code></pre></figure>
</div>



### Updating Themes, Modules, and Plugins
<ul class="nav nav-tabs" role="tablist">
  <li id="wptab" role="presentation" class="active"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
  <li id="drupaltab" role="presentation"><a href="#drupal" aria-controls="drupal" role="tab" data-toggle="tab">Drupal</a></li>
</ul>
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="wp">
    <!-- WordPress Content -->
    <p>Update all themes:</p>
    <div>
    <button class="btn btn-default btn-clippy" data-clipboard-target="#wp-update-themes"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
    <figure class="highlight"><pre id="wp-update-themes"><code class="bash" data-lang="bash">terminus wp &lsaquo;site&rsaquo;.&lsaquo;env&rsaquo; 'theme update --all'</code></pre></figure>
    </div>
    <p>Update all plugins:</p>
    <div>
    <button class="btn btn-default btn-clippy" data-clipboard-target="#wp-update-plugins"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
    <figure class="highlight"><pre id="wp-update-plugins"><code class="bash" data-lang="bash">terminus wp &lsaquo;site&rsaquo;.&lsaquo;env&rsaquo; 'plugin update --all'</code></pre></figure>
    </div>
  </div>
  <div role="tabpanel" class="tab-pane" id="drupal">
    <!-- Drupal Content -->
    <p>Update all contrib projects:</p>
    <div>
    <button class="btn btn-default btn-clippy" data-clipboard-target="#drupal-update-contrib"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
    <figure class="highlight"><pre id="drupal-update-contrib"><code class="bash" data-lang="bash">terminus drush &lsaquo;site&rsaquo;.&lsaquo;env&rsaquo; 'pm-updatecode --no-core'</code></pre></figure>
    </div>
    </div>
  </div>



<div class="terminus-pager col-md-12">
  <hr>
      <a style="float:left;" href="/docs/terminus/install"><span class="terminus-pager-lsaquo">&lsaquo;</span>Installation</a>
      <a style="float:right;" href="/docs/terminus/commands"><span class="terminus-pager-rsaquo">&rsaquo;</span>Commands</a>
</div>
