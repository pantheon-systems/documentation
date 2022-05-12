---
title: Migrate a Site That Was Created with Build Tools to Drupal 9
subtitle: Introduction
description: Learn how to migrate a Drupal 8 Site to Drupal 9
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-createbt
anchorid: drupal-9-hosted-createbt
editpath: drupal-9/drupal-9-hosted-createbt/01-introduction.md
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
<td>Build Tools</td>
<td>--</td>
</tr>
</tbody>
</table>

<Partial file="drupal-9/see-landing.md" />

Build Tools connects Pantheon with your CI service and external Git provider. See the [Build Tools Guide](/guides/build-tools#a-build-tools-projects-components) for details on supported Git and CI services combinations.


<Partial file="drupal-9/commit-history.md" />

## Requirements

Before you continue, confirm that your site meets the following criteria:

1. Code is managed using an external repository outside of Pantheon (GitHub, GitLab, Bitbucket, etc.).

1. The site is built through a service like Circle CI.

1. Build artifacts are pushed to your Pantheon repository.

## See Also

- [Integrated Composer Overview](/guides/integrated-composer)
- [Composer Fundamentals and WebOps Workflows](/guides/composer)
- [Pantheon YAML Configuration Files](/pantheon-yml)