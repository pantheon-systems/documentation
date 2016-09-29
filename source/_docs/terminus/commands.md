---
title: Terminus Manual: Command Reference
terminuspage: true
contributors: ari
type: terminuspage
tags: [terminus]
categories: [managing]
---

<div class="container col-md-12" ng-app="terminusCommandsApp" ng-controller="mainController">

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
        <th>Commands</th>
        <th>Usage</th>
      </tr>
    </thead>

    <tbody>
      <tr ng-repeat="command in terminus.commands | filter:searchCommand">
        <td><strong md-highlight-text="searchCommand">{[{ command.name }]}</strong><br><small md-highlight-text="searchCommand">{[{ command.description }]}</small></td>
        <td>
            <li class="terminus-usage" ng-repeat="use in command.usage">
              <small md-highlight-text="searchCommand">{[{ use }]}</small>
            </li>
        </td>
        </td>
      </tr>
    </tbody>

  </table>
</div>

<div class="terminus-pager col-md-12">
  <hr>
      <a style="float:left;" href="/docs/terminus/examples"><span class="terminus-pager-lsaquo">&lsaquo;</span>Example Usage</a>
</div>
