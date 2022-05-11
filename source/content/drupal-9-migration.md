---
title: Drupal 9 Migration Guides
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
reviewed: "2021-03-31"
---

Drupal 9 includes many of the familiar features and layout introduced in Drupal 8, and removes deprecated code to help improve future Drupal development.

## Choose Your Upgrade Path

To use this table, find the row whose column values best describe your current and desired state, then select the upgrade guide on the right.

For example:
- If your site is currently hosted with Pantheon, and was created using Build Tools, use the guide in the first row, "Migrate a Site That Was Created with Build Tools to Drupal 9".  
- If your site is hosted elsewhere, and is Composer-managed, use the guide in the last row, "Migrate a Composer Managed Drupal 9 Site from Another Platform".

<table>
<thead>
<tr>
<th style="text-align: center;vertical-align:top;"><i class="fa fa-cloud"></i><br/>Current Host</th>
<th style="text-align: center;vertical-align:top;"><i class="fa fa-wrench"></i><br/>How Site Was Created</th>
<th style="text-align: center;vertical-align:top;"><i class="glyphicon glyphicon-exclamation-sign"></i><br/>Additional Requirements</th>
<th style="text-align: center;vertical-align:top;"><i class="fa fa-book"></i><br/>Upgrade Guide</th>
</tr>
</thead>
<tbody>
<td>Pantheon</td>
<td>Build Tools</td>
<td>--</td>
<td><a href="/docs/guides/drupal-9-hosted-createbt">Migrate a Site That Was Created with Build Tools to Drupal 9</a></td>
</tr>
<tr>
<td>Pantheon</td>
<td>Custom Upstream</td>
<td>--</td>
<td><a href="/docs/guides/drupal-9-hosted-createcustom">Migrate a Custom Upstream to Drupal 9</a></td>
</tr>
<tr>
<td>Pantheon</td>
<td>Empty Upstream</td>
<td>Multidev</td>
<td><a href="/docs/guides/drupal-9-hosted-createempty-md">Migrate a Site That Was Created with an Empty Upstream to Drupal 9</a></td>
</tr>
<tr>
<td>Pantheon</td>
<td>Dashboard</td>
<td>--</td>
<td><a href="/docs/guides/drupal-9-hosted">Migrate a Drupal 8 Site to Drupal 9</a></td>
</tr>
<tr>
<td>Pantheon</td>
<td>Dashboard</td>
<td>Multidev</td>
<td><a href="/docs/guides/drupal-9-hosted-md">Migrate a Site with Multidev to Drupal 9</a></td>
</tr>
<tr>
<td>Pantheon</td>
<td>Dashboard</td>
<td>Drupal 8</td>
<td><a href="/docs/guides/drupal-9-hosted-createdashboard-set8">Migrate a Site Created With the Pantheon Dashboard to Drupal 9</a></td>
</tr>
<tr>
<td>Pantheon</td>
<td>Dashboard</td>
<td>Needs Build Tools Workflow</td>
<td><a href="/docs/guides/drupal-9-hosted-btworkflow">Migrate a Site That Needs a Build Tools Workflow to Drupal 9 + Build Tools</a></td>
</tr>
<tr>
<td>Pantheon</td>
<td>Dashboard</td>
<td>Created before 11/2021</td>
<td><a href="/docs/guides/drupal-9-hosted-pre112021">Migrate a Site That Was Created Before November 2011 to Drupal 9</a> </td>
</tr>
<tr>
<td>Elsewhere</td>
<td>n/a</td>
<td>--</td>
<td><a href="/docs/guides/drupal-9-unhosted">Migrate a Drupal 9 Site from Another Platform</a></td>
</tr>
<tr>
<td>Elsewhere</td>
<td>n/a</td>
<td>Composer Managed</td>
<td><a href="/docs/guides/drupal-9-unhosted-composer">Migrate a Composer Managed Drupal 9 Site from Another Platform</a></td>
</tr>
</tbody>
</table>


## Related Documents

- [Composer Fundamentals and Workflows](/guides/composer)
- [Integrated Composer Overview](/guides/integrated-composer)
- [Pantheon YAML Configuration Files](/pantheon-yml)
- [Composer Conversion Guide](/guides/composer-convert)
