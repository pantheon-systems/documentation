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
<<<<<<< HEAD
|                 |                 |                 |
| John Smith      | Andy White      | Dolores Orange  |
|                 |                 |                 |
=======
| John Smith      | Andy White      | Dolores Orange  |
>>>>>>> c5902dd75dfa0a6370f2f58142dd9c8240433f72
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
| John Smith      | Andy White      | Dolores Orange  |
| Joe Intern      |                 |                 |
+--------+--------+--------+--------+--------+--------+
| Site 1 | Site 2 | Site A | Site B | Site Z | Site Y |
+--------+--------+        |        +--------+--------+
| Site 3 | Site 4 |        |        | Site X          |
|        |        |        |        |                 |
|        |        |        |        | Ed Kay          |
+--------+--------+--------+--------+--------+--------+

So now, when the individual team members log on, they will see the sites and workspaces made available to them.  In our example, this is what they would see:

| Team Member | Workspaces | Sites |
|---|---|---|
| Jane Doe |Writing Sites, Random Sites|Site 1, Site 2, Site 3, Site 4, Site Z, Site Y, Site X, Site W|
| John Smith |Writing Sites, Widget Sites|Site 1, Site 2, Site 3, Site 4, Site A, Site B|
| Joe Intern |Writing Sites|Site 1, Site 2, Site 3, Site 4|
| Dolores Orange |Random Sites|Site Z, Site Y, Site X, Site W|
| Ed Kay |None|Site X|

Read on to better understand the specifics of setting up your workspaces, teams, and sites.
