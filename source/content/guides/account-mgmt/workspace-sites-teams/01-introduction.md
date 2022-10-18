---
title: Workspaces, Sites and Teams
subtitle: Introduction
description: Learn how Workspaces, Sites and Teams work together to help you manage your sites.
categories: [account-mgmt]
tags: [workspaces, sites, teams]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/account-mgmt/workspace-sites-teams
anchorid: workspace-sites-teams
editpath: docs/guides/account-mgmt/workspace-sites-teams/01-introduction.md
reviewed: "2022-09-19"
---

Workspaces, Teams, and Sites work together to help you organize and manage your sites.  To understand how these three tools work together, lets look at a sample setup.

Our company, Writing Widgets, decides to set up three workspaces:

+--------+--------+--------+--------+--------+--------+
| Writing Sites   | Widget Sites    | Random Sites    |
+========+========+========+========+========+========+
+-----------------+-----------------+-----------------+

Within each workspace, they build their team.

+-----------------+-----------------+-----------------+
| Writing Sites   | Widget Sites    | Random Sites    |
+========+========+========+========+========+========+
| Jane Doe        | John Smith      | Jane Doe        |
|                 |                 |                 |
| John Smith      | Andy White      | Dolores Orange  |
|                 |                 |                 |
| Joe Intern      |                 |                 |
+--------+--------+--------+--------+--------+--------+

... and create a bunch of sites...

+--------+--------+--------+--------+--------+--------+
| Writing Sites   | Widget Sites    | Random Sites    |
+========+========+========+========+========+========+
| Jane Doe        | John Smith      | Jane Doe        |
|                 |                 |                 |
| John Smith      | Andy White      | Dolores Orange  |
|                 |                 |                 |
| Joe Intern      |                 |                 |
+--------+--------+--------+--------+--------+--------+
| Site 1 | Site 2 | Site A | Site B | Site Z | Site Y |
+--------+--------+        |        +--------+--------+
| Site 3 | Site 4 |        |        | Site X          |
+--------+--------+--------+--------+--------+--------+

Finally, because sites in the Random workspace are so, well, random, they've also added a team member specifically to work on Site X.

+--------+--------+--------+--------+--------+--------+
| Writing Sites   | Widget Sites    | Random Sites    |
+========+========+========+========+========+========+
| Jane Doe        | John Smith      | Jane Doe        |
|                 |                 |                 |
| John Smith      | Andy White      | Dolores Orange  |
|                 |                 |                 |
| Joe Intern      |                 |                 |
+--------+--------+--------+--------+--------+--------+
| Site 1 | Site 2 | Site A | Site B | Site Z | Site Y |
+--------+--------+        |        +--------+--------+
| Site 3 | Site 4 |        |        | Site X          |
|        |        |        |        |                 |
|        |        |        |        | Ed Kay          |
+--------+--------+--------+--------+--------+--------+

<<<<<<< HEAD
So now, when the individual team members log on, they will see the sites and workspaces made available to them.  In our example, this is what they would see:

| Team Member | Workspaces | Sites |
|---|---|---|
| Jane Doe |Writing Sites, Random Sites|Site 1, Site 2, Site 3, Site 4, Site Z, Site Y, Site X|
| John Smith |Writing Sites, Widget Sites|Site 1, Site 2, Site 3, Site 4, Site A, Site B|
| Joe Intern |Writing Sites|Site 1, Site 2, Site 3, Site 4|
| Dolores Orange |Random Sites|Site Z, Site Y, Site X|
| Ed Kay |None|Site X|
=======
So now, when the individual team members log on, they will see the workspaces made available to them.  In our example, this is what they would see:

| Team Member | Workspaces |
|---|---|
| Jane Doe |Writing Sites, Random Sites|
| John Smith |Writing Sites, Widget Sites|
| Joe Intern |Writing Sites|
| Dolores Orange |Random Sites|
| Ed Kay |Random Sites|

Once they select a workspace, they will then see the sites they have access to in that workspace, as well as any sites they have created.
>>>>>>> 59932ef6499548bef1d203b3498cd4f595289dc7

Read on to better understand the specifics of setting up your workspaces, teams, and sites.
