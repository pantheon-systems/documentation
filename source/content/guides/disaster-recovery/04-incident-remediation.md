---
title: Pantheon Disaster Recovery Playbook
subtitle: Incident Remediation
description: Bring a site back from downtime and implement post-recovery actions
generator: pagination
layout: guide
categories: [platform]
tags: [dashboard, webops, workflow]
contributors: [joshlieb, joa-pan]
reviewed: "2021-07-26"
type: guide
permalink: docs/guides/disaster-recovery/incident-remediation
anchorid: disaster-recovery
editpath: disaster-recovery/04-incident-remediation.md
---

Bringing a site back from downtime and remediating the cause of downtime to ensure that the site stays up post-recovery is a multistep process. Once you have engaged with support and determined the cause of the issue, the recovery process may include the steps below, although the precise playbook will depend on the nature of the issues and the configuration of the site. 

## External threats

The Signal Sciences and Advanced GCDN layers are primarily managed by Pantheon’s Professional Services team, with some updates and support tasks performed by the Customer Success Engineering team, which also performs intake on the initial request. This ensures that responses can meet the contracted SLA, and Pantheon aims to escalate/reassign to Professional Services on an as needed basis.

In the event of an attack, exploit, or other issue related to the global edge, file a ticket via the normal support channels, with an on-call emergency ticket filed in cases where downtime or serious service degradation occurs, and notify the Pantheon account team via Slack.

## Edge Failover

Recovery of a site that has gone down may take a matter of minutes, but time to recovery can be uncertain, so additional features have been implemented at the Global CDN level to provide a more immediate solution. Ideally, these features will minimize downtime while the specific issues are remediated.

### Persistent Cache

The Global CDN will natively provide a layer of protection via the full-page cache. Persistent cache ensures that these requests are fulfilled using stale cache, sending back pages that have technically expired. This will only apply, however, to requests that normally would be cacheable - sites with a low cache hit rate will not be as protected.

### Synthetic Responses

A set of static pages can be hosted directly and when certain failure conditions are detected, traffic can be redirected to a placeholder. The placeholder will provide a minimally acceptable user experience rather than error messages and a completely unreachable site.

## Infrastructure Failover

In cases where the Google Cloud Platform infrastructure becomes compromised, Pantheon support can trigger a Multizone failover to redirect traffic at the load-balancing layer to a backup cluster of appservers on an alternate zone. Refer to the [Multizone Failover](/multizone-failover) documentation for more information. 

Multizone failover is not designed to protect against issues on the Global CDN, on the load balancing layer, or at the application level. The automated monitoring that triggers a failover condition is entirely focused on infrastructure issues. Because the zonal redundancy has an identical codebase, a continually replicated database, and uses a common filesystem, application issues would cause the same failure conditions regardless of zone.

Failover has an impact on the Redis object cache service - the cache will be automatically rebuilt in the new zone on failover, but this is transactionally heavy, and the site should be tested to determine the performance impact of a mass cache rebuild. This test can be scheduled by filing a support ticket.

Sites using Pantheon’s Solr search indexing service require Support intervention as well as reindexing on the application side, and is not a supported integration.

Customer playbook should include:

- _If using Redis_: Test application for ability to handle a mass Redis cache rebuild.
- _If using Solr_: Consult with your Pantheon CSM to determine an appropriate monitoring and recovery strategy.

## Remediating Application Issues

In cases where the site code, database, or assets have become corrupted or compromised, determine which aspects of the site require restoration, as recovery processes will differ, and recovery time is dependent on enacting the correct playbook.

### Code Issues

#### Managed Updates deployment issue

As part of the Managed Updates deployment process, a Multidev will be cloned from the Live environment. It will be used primarily for testing, but also as a backup. If the Live deployment fails, results in a regression, or compromises the site, this Multidev will be used as the source to restore Live to a pre-deploy state.

#### Codebase is unrecoverable

The codebase can be restored from a selected backup via Terminus - the Dashboard **Restore** tools restore all aspects of the site, and cannot be used to restore selectively. Refer to the [Backup Restore](/terminus/commands/backup-restore) documentation for more information. 

#### Reverting a bad commit to Pantheon

If a bad commit has been deployed to your Pantheon site, you can roll back the commit using Git. The process depends on the nature of the change and whether it involves core updates or upstream updates, etc. Refer to the [Undo Commits](/guides/git/undo-commits) documentation for more information. 

#### Database/filesystem issues

The **Database/files** tools on the Site Dashboard can be used to clone either the files or database from a different environment (Test to Live, for example). Refer to the [Database Workflow](/guides/mariadb-mysql/database-workflow-tool) documentation for more information. 

#### Restoring a database from a backup

The database can be restored from a selected backup via Terminus. The Dashboard **Restore** tools restore all aspects of the site, and cannot be used to restore selectively. Refer to the [Backup Restore](/terminus/commands/backup-restore) documentation for more information. 
 
#### Restoring a database from an external dump

The database can be restored from an external dump using the **Database/files** tools on the Site Dashboard. An archive file can be uploaded, or a MySQL archive accessed on a remote location. Refer to the [Database Workflow](/guides/mariadb-mysql/database-workflow-tool) documentation for more information. 