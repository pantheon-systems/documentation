---
title: Terminus Version Comparison
tags: [automate, cli]
categories: [automate, cli]
layout: taxon
permalink: docs/terminus/commands/:basename/
---

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
