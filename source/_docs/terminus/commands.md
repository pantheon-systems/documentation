---
title: Terminus Manual: Command Reference
terminuspage: true
contributors: ari
type: terminuspage
tags: [terminus]
categories: [managing]
---

<div class="container" ng-app="terminusCommandsApp" ng-controller="mainController">

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
        <td>{[{ subcommand.subcommands }]}</td>
      </tr>
    </tbody>

  </table>
</div>
