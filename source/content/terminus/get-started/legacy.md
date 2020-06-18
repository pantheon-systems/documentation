---
title: Terminus Manual
subtitle: Legacy Terminus Versions
description: Pantheon strongly encourages Terminus users to keep their local installations updated to the current version. This document covers issues with legacy versions of Terminus.
terminuslegacy: true
terminuspage: true
type: terminuspage
layout: terminuspage
categories: [develop]
tags: [cli, local, terminus, workflow]
permalink: docs/terminus/get-started/:basename/
image: terminus-thumbLarge
searchboost: 50
---

The legacy version of Terminus is no longer supported. We strongly recommend that you use the <a href="/docs/terminus/install/">current version</a>. If your use case temporarily requires you to use this unsupported version, you may install <a href="https://github.com/pantheon-systems/terminus/releases/tag/0.13.6">legacy version 0.13.6</a> of Terminus using the following command:

```bash
curl -O
https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar
&& php installer.phar install --install-version=0.13.6
```

## Compare Legacy Commands with Terminus 1.0

<!-- <div class="col-md-12" ng-app="terminusCompareApp" ng-controller="mainController">


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
</div> -->
