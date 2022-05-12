---
title: Migrate a Site That Was Created Before November 2021 to Drupal 9
subtitle: Introduction
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-hosted-pre112021
anchorid: drupal-9-hosted-pre112021
editpath: drupal-9/drupal-9-hosted-pre112021/01-introduction.md
---

This guide will show you how to migrate a site that meets the following criteria to Drupal 9:

<table>
<thead>
<tr>
<th style="text-align: center;vertical-align:top;"><i class="fa fa-cloud"></i><br/>Current Host</th>
<th style="text-align: center;vertical-align:top;"><i class="fa fa-wrench"></i><br/>How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> </th>
<th style="text-align: center;vertical-align:top;"><i class="glyphicon glyphicon-exclamation-sign"></i><br/>Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> </th>
</tr>
</thead>
<tbody>
<tr>
<td>Pantheon</td>
<td>Dashboard</td>
<td>Created before 11/2021</td>
</tr>
</tbody>
</table>

<Partial file="drupal-9/commit-history.md" />

Drupal 9 sites created on the platform prior to November 30, 2021 use the [Drupal 9](https://github.com/pantheon-upstreams/drupal-project) upstream. Based on community needs, we have released a new upstream. [Drupal with Composer](https://github.com/pantheon-upstreams/drupal-recommended) is now the default Drupal 9 upstream on the platform and users are encouraged to switch to it for improved structure and updates.

## See Also

- [Composer Fundamentals and Workflows](/guides/composer)
