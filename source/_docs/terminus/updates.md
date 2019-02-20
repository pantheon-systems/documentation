---
title: Terminus Manual
subtitle: Version Updates
description: Stay up to date on the latest Terminus version.
terminuspage: true
terminustoc: true
type: terminuspage
layout: terminuspage
permalink: docs/terminus/:basename/
previousurl: terminus/configuration/
image: terminus-thumbLarge
searchboost: 100
---

<div class="alert alert-danger" role="alert" markdown="1">
#### Warning {.info}
The latest release of Terminus is a major version upgrade, which may not be backwards-compatible with scripts written for Terminus `1.x`. For more information, see [Terminus 2.0](/docs/terminus-2-0/). 
</div>

<div class="container col-md-12" ng-app="terminusReleaseApp" ng-controller="terminusReleaseCtrl">
  <h2>Update to the Current Release {[{releases[0].name}]}</h2>
  <p class="instruction">Navigate to the directory where Terminus was originally installed, then run:</p>
  <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-update">Copy</button>
    <figure><pre id="terminus-update"><code class="command bash" data-lang="bash">curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar update</code></pre></figure>
  </div>
  <h2>Troubleshooting</h2>
  <h3>Nothing to install or update</h2>
  <p class="instruction">If the update command above returns output indicating that no updates were found, delete the existing Terminus version (e.g. <code>$HOME/terminus</code>) and re-run the install command:</p>
  <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-update-fail">Copy</button>
    <figure><pre id="terminus-update-fail"><code class="command bash" data-lang="bash">rm -rf $HOME/terminus
mkdir $HOME/terminus
cd $HOME/terminus
curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install</code></pre></figure>
  </div>
  <h2>Changelog</h2>
  <div ng-repeat="release in releases| filter: greaterThan('id', 5224487)">
    <h3>{[{release.name}]}</h3>
    <md ng-model="release.body"></md>
    <hr>
  </div>
</div>
