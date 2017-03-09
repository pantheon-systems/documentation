---
title: Terminus Manual
subtitle: Version Updates
terminuspage: true
type: terminuspage
layout: terminuspage
permalink: docs/terminus/:basename/
---
<div class="container col-md-12" ng-app="terminusReleaseApp" ng-controller="terminusReleaseCtrl">
  <h2> Update to the Current Release: {[{releases[0].name}]}</h2>
  <p class="instruction">Navigate to the directory where Terminus was originally installed, then run:</p>
  <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-update">Copy</button>
    <figure><pre id="terminus-update"><code class="command bash" data-lang="bash">curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar update</code></pre></figure>
  </div>
  <h2>Troubleshooting</h2>
  <h3>Nothing to install or update</h3>
  <p class="instruction">If the update command above returns output indicating that no updates were found, delete the existing Terminus installation and re-run the install command:</p>
  <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-update-fail">Copy</button>
    <figure><pre id="terminus-update-fail"><code class="command bash" data-lang="bash">rm -rf ~/terminus
  mkdir ~/terminus
  cd ~/terminus
  curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install</code></pre></figure>
  </div>
  <h2>Changelog</h2>
  <div ng-repeat="release in releases| filter: greaterThan('id', 5224487)">
    <h2>{[{release.name}]}</h2>
    <md ng-model="release.body"></md>
    <hr>
  </div>
</div>
<div class="terminus-pager">
  <hr>
  <a style="float:left;" href="/docs/terminus/plugins/create"><span class="terminus-pager-lsaquo">&lsaquo;</span>Create Plugins</a>
</div>
