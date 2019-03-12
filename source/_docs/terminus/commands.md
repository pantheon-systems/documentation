---
title: Terminus Manual
subtitle: Command Reference
description: Look up Terminus commands.
terminuspage: true
type: terminuspage
layout: terminuspage
nexturl: terminus/scripting/
previousurl: terminus/examples/
permalink: docs/terminus/:basename/
image: terminus-thumbLarge
searchboost: 100
---
<div class="alert alert-info" markdown="1">
#### Note {.info}
If you would like additional information for a given command (e.g., available `--format` options) run the command with the `--help` flag in your terminal.
</div>

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
            <span style="white-space:pre-line;"><small md-highlight-text="searchCommand">{[{ command.usage[0] }]}</small><br><small>{[{ command.definition.options.fields.description | formatFields }]}</small></span>
            </li>
        </td>
      </tr>
    </tbody>

  </table>
</div>
