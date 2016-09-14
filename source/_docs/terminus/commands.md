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
      </div>      
    </div>
  </form>

  <table class="table table-responsive table-bordered table-striped">

    <thead>
      <tr>
        <th>Command</th>
        <th>Description</th>
        <th>Subcommands</th>
      </tr>
    </thead>

    <tbody>
      <tr ng-repeat="subcommand in commands.subcommands | filter:searchCommand">
        <td>{[{ subcommand.name }]}</td>
        <td>{[{ subcommand.description }]}</td>
        <td><li class="terminus-subcommand-list" ng-repeat="subcommand in subcommand.subcommands">{[{ subcommand.name }]}</li></td>
      </tr>
    </tbody>

  </table>
</div>

<div class="terminus-pager">
  <hr>
      <a style="float:left;" href="/docs/terminus/install"><span class="terminus-pager-lsaquo">&lsaquo;</span>Installation</a>
      <a style="float:right;" href="/docs/terminus/examples"><span class="terminus-pager-rsaquo">&rsaquo;</span>Example Usage</a>
</div>
