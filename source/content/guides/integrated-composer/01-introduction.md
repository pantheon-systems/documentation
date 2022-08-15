---
title: Integrated Composer
subtitle: Introduction
description: Learn how to use Integrated Composer.
tags: [composer, workflow]
categories: [get-started]
contributors: [ari, edwardangert]
reviewed: "2022-04-28"
layout: guide
showtoc: true
permalink: docs/guides/integrated-composer
anchorid: integrated-composer
---

Integrated Composer is a Pantheon platform feature that extends Composer <Popover content="A widely-used PHP dependency and package manager that provides an alternative, more modern way to manage the external (non-core) code used by a WordPress or Drupal site." /> functionality to WordPress and Drupal's core files, and treats them as a managed dependency. Integrated Composer enables one-click updates from the Dashboard for upstream updates and Composer dependencies on your Composer-managed Pantheon site.

## Get Started With Integrated Composer

### Drupal 9 with Integrated Composer

- Follow the [Drupal 9](/drupal-9) doc to create a new Drupal 9 site with Integrated Composer built in.

- To upgrade or migrate an existing site to Drupal 9 with Integrated Composer, visit the [Migrate to Drupal 9](/drupal-9-migration) guide.

- To convert an existing Drupal 8 site to a Composer-managed site with Integrated Composer, visit the [Composer Convert](/guides/composer-convert) doc.

<Alert title="Note"  type="info" >

  
`drupal-composer-managed` is the recommended Composer-based Drupal 9 upstream. The Composer-based Drupal 9 upstreams below have been deprecated.

- `drupal-project`
- `drupal-recommended`

You can use the [Terminus Conversion Tools Plugin](https://github.com/pantheon-systems/terminus-conversion-tools-plugin) if you want to convert your site from one of the deprecated upstreams to the supported `drupal-composer-managed` upstream.

</Alert>

### WordPress with Integrated Composer

1. [Fork the Pantheon-maintained repository](/guides/custom-upstream/create-custom-upstream#create-and-host-the-repository-remotely) from [https://github.com/pantheon-upstreams/wordpress-project](https://github.com/pantheon-upstreams/wordpress-project).

1. [Add a new Custom Upstream](/guides/custom-upstream/create-custom-upstream#connect-repository-to-pantheon) on the Pantheon Dashboard.

1. Create a new WordPress site from the Upstream. Do not customize the upstream as yet.

1. In the Dev environment, click **Visit Development Site** and follow the prompts to complete the CMS installation.

1. [Clone the site locally](/local-development#get-the-code) and run `composer install`.











