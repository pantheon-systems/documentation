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

<div class="container col-md-12" ng-app="terminusReleaseApp" ng-controller="terminusReleaseCtrl" markdown="1">
  <h2>Update to the Current Release {[{releases[0].name}]}</h2>
  <p class="instruction">Navigate to the directory where Terminus was originally installed, then run:</p>
  <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-update">Copy</button>
    <figure><pre id="terminus-update"><code class="command bash" data-lang="bash">curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar update</code></pre></figure>
  <div class="alert alert-info" role="alert" markdown="1">
  #### Note {.info}
  Terminus uses [Semantic versioning](https://semver.org/){.external}. Be sure to fully test compatibility with existing configurations before upgrading to new major releases.
  </div>
  </div>
  <h2>Troubleshooting</h2>
  <h3>Nothing to install or update</h3>
  <p class="instruction">If the update command above returns output indicating that no updates were found, delete the existing Terminus version (e.g. <code>$HOME/terminus</code>) and re-run the install command:</p>
  <div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-update-fail">Copy</button>
    <figure><pre id="terminus-update-fail"><code class="command bash" data-lang="bash">rm -rf $HOME/terminus
mkdir $HOME/terminus
cd $HOME/terminus
curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install</code></pre></figure>
  </div>

## EOL Timeline

Each major and minor version of Terminus is fully supported for one year from the release of the subsequent version. During the supported period, serious bugs and security issues that have been reported are fixed in patch releases. See [Semantic Versioning](https://semver.org/){.external} for more information on versioning.

After this period, the version will reach End Of Life (**EOL**), and will no longer be supported. We strongly encourage you to update Terminus well ahead of the EOL schedule, so that regressions in new versions can be reported and patched in time.

| Version          | EOL Date  |
| ---------------- | --------- |
| 2.0.0            | TBD       |
| 1.9.0            | 2/20/2020 |
| 1.8.1            | 9/11/2019 |
| 1.8.0 or earlier | 8/26/2019 |

  <h2>Changelog</h2>
  <div ng-repeat="release in releases| filter: greaterThan('id', 5224487)">
    <h3>{[{release.name}]}</h3>
    <md ng-model="release.body"></md>
    <hr>
  </div>
</div>
