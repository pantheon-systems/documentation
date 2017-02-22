---
title: Terminus Manual
subtitle: Command Reference
terminuspage: true
type: terminuspage
layout: terminuspage
permalink: docs/terminus/:basename/
---
<!--Note: The contents of the command reference table cannot be edited in the docs project. This table is automatically generated using Terminus (terminus list --format=json). Submit feedback and report issues related to the contents of this table on the Terminus repo: https://github.com/pantheon-systems/terminus/issues -->

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
        <th>Command</th>
        <th>Usage</th>
      </tr>
    </thead>

    <tbody>
      <tr ng-repeat="command in terminus.commands | filter:searchCommand">
        <td><strong md-highlight-text="searchCommand">{[{ command.name }]}</strong><br><small md-highlight-text="searchCommand">{[{ command.description }]}</small></td>
        <td>
            <li class="terminus-usage">
            <span style="white-space:pre-line;"><small md-highlight-text="searchCommand">{[{ command.usage[0] }]}</small></span>
            </li>
        </td>
      </tr>
    </tbody>

  </table>
</div>

<div class="terminus-pager col-md-12">
  <hr>
      <a style="float:left;" href="/docs/terminus/examples"><span class="terminus-pager-lsaquo">&lsaquo;</span>Example Usage</a>
      <a style="float:right;" href="/docs/terminus/plugins"><span class="terminus-pager-rsaquo">&rsaquo;</span>Manage Plugins</a>
</div>
