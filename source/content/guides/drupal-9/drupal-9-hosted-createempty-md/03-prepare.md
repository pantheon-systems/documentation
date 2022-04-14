---
title: Migrate a Site That Was Created with an Empty Upstream to Drupal 9
subtitle: Prepare
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-pre112021/prepare
anchorid: prepare
editpath: drupal-9/drupal-9-hosted-pre112021/03-prepare.md
---


<Partial file="drupal-9/upgrade-site-requirements-from-empty.md" />

- You have not set up Continous Integration or you no longer need it. 

## Before You Begin

- This guide requires [User in Charge](/change-management#site-level-roles-and-permissions) permissions to set the Upstream.

- This guide is written for users with access to Pantheon's [Multidev](/multidev) feature. Pantheon support is not available to users who avoid the Multidev steps.

- The site owner should ensure the trusted host setting is up-to-date. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

- Source site may or may not be using a [nested docroot](https://pantheon.io/docs/nested-docroot). If using it, **you should prepend the paths in this document with "web" as needed**.

<Alert title="Note" type="info">

  The steps in this process migrate a site and its content, but not the commit history. The new site will not maintain the site's existing commit history.

</Alert>


## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment-no-clone.md" />
