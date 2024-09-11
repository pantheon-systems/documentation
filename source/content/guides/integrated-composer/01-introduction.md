---
title: Integrated Composer
subtitle: Introduction
description: Learn how to use Integrated Composer.
tags: [composer, workflow]
contributors: [ari, edwardangert]
reviewed: "2022-12-13"
showtoc: true
permalink: docs/guides/integrated-composer
contenttype: [guide]
innav: [true]
categories: [dependencies]
cms: [drupal, wordpress]
audience: [development]
product: [composer]
integration: [--]
---

Integrated Composer is a Pantheon platform feature that extends Composer <Popover content="A widely-used PHP dependency and package manager that provides an alternative, more modern way to manage the external (non-core) code used by a WordPress or Drupal site." /> functionality to WordPress and Drupal's core files, and treats them as a managed dependency. Integrated Composer enables one-click updates from the Dashboard for upstream updates and Composer dependencies on your Composer-managed Pantheon site.

## Get Started With Integrated Composer

### Drupal with Integrated Composer

- Follow the [Drupal on Pantheon](/drupal) doc to create a new Drupal site with Integrated Composer built in.

- To upgrade or migrate an existing site to Drupal with Integrated Composer, visit the [Migrate to Drupal](/drupal-migration) guide.

- To convert an existing Drupal site to a Composer-managed site with Integrated Composer, visit the [Composer Convert](/guides/composer-convert) doc.


<Alert title="Note"  type="info" >

`drupal-composer-managed` is the recommended Composer-based Drupal upstream. The Composer-based Drupal upstreams below have been deprecated.

- `drupal-project`
- `drupal-recommended`

You can use the [Terminus Conversion Tools Plugin](https://github.com/pantheon-systems/terminus-conversion-tools-plugin) if you want to convert your site from one of the deprecated upstreams to the supported `drupal-composer-managed` upstream.

</Alert>

### WordPress with Integrated Composer

<Alert title="Note" type="info">

Pantheon has a [WordPress (Composer Managed)](/guides/wordpress-composer/wordpress-composer-managed) upstream. You can use this upstream to create an Integrated Composer WordPress site with **Bedrock**.

</Alert>

1. [Fork the Pantheon-maintained repository](/guides/custom-upstream/create-custom-upstream#create-and-host-the-repository-remotely) from [https://github.com/pantheon-upstreams/wordpress-project](https://github.com/pantheon-upstreams/wordpress-project).

1. [Add a new Custom Upstream](/guides/custom-upstream/create-custom-upstream#connect-repository-to-pantheon) on the Pantheon Dashboard.

1. Create a new WordPress site from the Upstream. Do not customize the upstream as yet.

1. Navigate to the Dev environment, then click **Visit Development Site** and follow the prompts to complete the CMS installation.

1. [Clone the site locally](/guides/local-development/configuration) and run `composer install`.

<Partial file="build-deploy-terminology.md" />

## More Resources

- [WordPress on Pantheon Quick Start Guide](/guides/wordpress-pantheon/)
- [Supported Drupal Versions](/supported-drupal)
- [Drupal](/drupal)
