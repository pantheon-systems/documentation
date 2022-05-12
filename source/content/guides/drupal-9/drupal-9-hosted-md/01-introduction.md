---
title: Migrate a Site with Multidev to Drupal 9
subtitle: Introduction
description: Learn how to migrate a site to Drupal 9 using Multidev
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-md
anchorid: drupal-9-v8
editpath: drupal-9/drupal-9-hosted-md/01-introduction.md
---

This guide will show you how to migrate an existing non-Pantheon hosted Drupal 9 site to Pantheon's platform. 

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
<td>Multidev</td>
</tr>
</tbody>
</table>

<Partial file="drupal-9/see-landing.md" />

<Partial file="drupal-9/commit-history.md" />

## Requirements

<Alert title="Multidev Required" type="danger">

To maintain best practices and to avoid difficult, time-consuming repairs to the site, this doc is written for users with access to Pantheon's [Multidev](/multidev) feature.

Pantheon support is not available to users who avoid the Multidev steps.

</Alert>

<Partial file="drupal-9/upgrade-site-requirements-new.md" />

## See Also

- [Composer Fundamentals and Workflows](/guides/composer)
