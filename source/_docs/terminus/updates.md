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
  <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-update">Copy</button>
    <figure><pre id="terminus-update"><code class="command bash" data-lang="bash">curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install</code></pre></figure>
  </div>
  <h2>Changelog</h2>
  <div ng-repeat="release in releases| filter: greaterThan('id', 4908925)">
    <h2>{[{release.name}]}</h2>
    <md ng-model="release.body"></md>
    <hr>
  </div>
</div>
<div class="terminus-pager">
  <hr>
  <a style="float:left;" href="/docs/terminus/plugins/create"><span class="terminus-pager-lsaquo">&lsaquo;</span>Create Plugins</a>
</div>
