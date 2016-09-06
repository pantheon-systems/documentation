---
title: Examples
terminustoc: true
permalink: /docs/terminus/examples/
---
## Steps to Deploy to Live
### Create a Backup
A backup contains three separate archives: a database backup, a files backup, and a code backup.
<div class="zero-clipboard">
  <span class="btn-clipboard" id="scenario1button_create-backup" data-clipboard-target="scenario1_create-backup">Copy</span>
  <figure class="highlight"><pre id="scenario1_create-backup"><code class="bash" data-lang="bash">terminus site backup create --env=dev</code></pre></figure>
</div>
### Deploy from Dev to Test
Take your code from Dev, your content from Live, and combine them in Test to be absolutely certain that your deployment to Live will go as planned.
<div class="zero-clipboard">
  <span class="btn-clipboard" id="scenario1button_deploydev" data-clipboard-target="scenario1_deploydev">Copy</span>
    <figure class="highlight"><pre id="scenario1_deploydev"><code class="bash" data-lang="bash">terminus site deploy --env=test --sync-content --cc</code></pre></figure>
</div>
### Deploy from Test to Live
After testing your changes you can take them live. Deploying code from Test to Live will immediately update your live website.
<div class="zero-clipboard">
  <span class="btn-clipboard" id="scenario1button_deploytest" data-clipboard-target="scenario1_deploytest">Copy</span>
  <figure class="highlight"><pre id="scenario1_deploytest"><code class="bash" data-lang="bash">terminus site deploy --env=live --cc</code></pre></figure>
</div>

## Debug and Troubleshoot Site Issues
### Clear Caches
Clear all site caches.
<div class="zero-clipboard">
  <span class="btn-clipboard" id="scenario2button_clear-cache" data-clipboard-target="scenario2_clear-cache">Copy</span>
  <figure class="highlight"><pre id="scenario2_clear-cache"><code class="bash" data-lang="bash">terminus site clear-cache</code></pre></figure>
</div>

## Scenario 3
### Scenario 3
Scenario 3.
<div class="zero-clipboard">
  <span class="btn-clipboard" id="scenario3button_scenario3" data-clipboard-target="scenario3_scenario3">Copy</span>
  <figure class="highlight"><pre id="scenario3_scenario3"><code class="bash" data-lang="bash">terminus site scenario-3</code></pre></figure>
</div>
