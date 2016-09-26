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
        <th>Command</th>
        <th>Subcommands</th>
      </tr>
    </thead>

    <tbody>
      <tr ng-repeat="subcommand in commands.subcommands | filter:searchCommand">
        <td><strong>{[{ subcommand.name }]}</strong><br><small>{[{ subcommand.description }]}</small></td>
        <td><li class="terminus-subcommand-list" ng-repeat="subcommand in subcommand.subcommands | search:searchCommand | orderBy: 'points': true"><strong>{[{ subcommand.name }]}</strong><br><small>{[{ subcommand.description }]}</small><br><small>{[{ subcommand.synopsis}]}<hr></li></td>
      </tr>
    </tbody>

  </table>
</div>

<div class="terminus-pager col-md-12">
  <hr>
      <a style="float:left;" href="/docs/terminus/install"><span class="terminus-pager-lsaquo">&lsaquo;</span>Installation</a>
      <a style="float:right;" href="/docs/terminus/examples"><span class="terminus-pager-rsaquo">&rsaquo;</span>Example Usage</a>
</div>
