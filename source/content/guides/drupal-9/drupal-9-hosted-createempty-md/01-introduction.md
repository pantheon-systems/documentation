---
title: Migrate a Site That Was Created With an Empty Upstream to Drupal 9
subtitle: Introduction
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-hosted-createempty-md
anchorid: drupal-9-hosted-createempty-md
editpath: drupal-9/drupal-9-hosted-createempty-md/01-introduction.md
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
<td>Empty Upstream</td>
<td>Multidev</td>
</tr>
</tbody>
</table>

<Partial file="drupal-9/see-landing.md" />

<Partial file="drupal-9/commit-history.md" />

## Requirements

Confirm that your site meets the following requirements before you continue:

- Ensure your site has the [Pantheon empty repository](https://github.com/pantheon-systems/empty) in its upstream.

  ### Use Terminus to Confirm the Empty Upstream

  Run the command `terminus site:info $SITE` to display the site's basic information and properties.
 
 The following values indicate that a site is using an `empty` upstream: 
  * The `Framework` is `drupal8`
  * The `Upstream` includes `https://github.com/pantheon-systems/empty.git`
  
  The following is an abridged example of the output for the `terminus site:info $SITE` command, if the site upstream is set to `empty`:

  ```bash{outputLines:2-18}
  terminus site:info $SITE
  ------------------ -------------------------------------------------------------------------------------
  ID                 abdc3ea1-fe0b-1234-9c9f-3cxeAA123f88
  Name               anita-drupal
  Label              AnitaDrupal
  Created            2019-12-02 18:28:14
  Framework          drupal8
  ...
  Upstream           4c7176de-e079-eed1-154d-44d5a9945b65: https://github.com/pantheon-systems/empty.git
  ...
  ------------------ -------------------------------------------------------------------------------------
  ```

- The site does not use another package and library manager, such as [Ludwig](https://www.drupal.org/project/ludwig).

- You have not set up Continous Integration or you no longer need it. 

- The trusted host setting is up-to-date. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.