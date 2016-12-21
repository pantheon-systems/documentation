---
title: Legacy Terminus Versions
tags: [automate, develop]
categories: [automate]
terminuslegacy: true
layout: taxon
permalink: docs/terminus/commands/:basename/
---
<p class="instruction">Install [legacy version 0.13.6](https://github.com/pantheon-systems/terminus/releases/tag/0.13.6) of Terminus using the following command:</p>
<div class="copy-snippet">
  <button class="btn btn-default btn-clippy" data-clipboard-target="#terminus-installer"><img class="clippy" src="/source/docs/assets/images/clippy.svg" width="17" alt="Copy to clipboard"></button>
  <figure><pre id="terminus-installer"><code class="bash" data-lang="bash">curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar --install-version=0.13.6</code></pre></figure>
</div>

## Compare Legacy Commands with Terminus 1.0




<div class="col-md-12" ng-app="terminusCompareApp" ng-controller="mainController">


  <form>
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon"><i class="fa fa-search"></i></div>
        <input type="text" class="form-control" placeholder="Search Terminus Commands" ng-model="searchCommand">
        <div style="background:#fff;cursor:pointer;" ng-click="clearFilters()" class="input-group-addon">
        <span class="fa fa-times"></span>
        </div>
      </div>      
    </div>
  </form>
  <table class="table table-responsive table-bordered table-striped">

    <thead>
      <tr>
        <th>0.x Command Structure</th>
        <th>1.x Command Structure</th>
      </tr>
    </thead>

    <tbody>
      <tr ng-repeat="command in terminus.commands | filter:searchCommand">
        <td md-highlight-text="searchCommand">
          {[{ command.zerox }]}
        </td>
        <td md-highlight-text="searchCommand">
          {[{ command.onex }]}
        </td>
      </tr>
    </tbody>

  </table>
</div>
