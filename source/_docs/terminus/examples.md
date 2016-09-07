---
title: Terminus Manual: Example Usage
terminuspage: true
terminustoc: true
type: terminuspage
contributors: ari
tags: [terminus]
categories: [managing]
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


<div class="terminus-pager">
  <hr>
      <a style="float:left;" href="/docs/terminus/commands"><span class="terminus-pager-lsaquo">&lsaquo;</span>Commands</a>
</div>
