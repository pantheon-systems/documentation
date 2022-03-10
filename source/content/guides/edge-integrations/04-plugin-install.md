---
title: Edge Integrations
subtitle: Install WordPress Plugin
description: Install, configure, and use the Edge Integrations with WordPress.
categories: [develop]
tags: [collaborate, composer, continuous-integrations, webops, workflow]
contributors: [michellecolon-pantheon, jazzsequence, jspellman814]
type: guide
layout: guide
showtoc: true
anchorid: plugin-install
permalink: docs/guides/edge-integrations/plugin-install/
editpath: edge-integrations/04-plugin-install.md
reviewed: "2022-03-09"
---

This doc will help you personalize, and provide custom experiences for visitors to your website, based on Geotargeting(geo) and Interest targeting.

## Before You Begin

You can use Edge Integrations with WordPress via installation into a project with Integrated Composer, or via manual install.

### Install with Integrated Composer

Adding Edge Integrations support to your Integrated Composer project is simple and is the recommended means of adding the Edge Integrations WordPress SDK.

Requiring the Composer package
To get started, all you need to do is to add this repository as a dependency:

composer require pantheon-systems/edge-integrations-wordpress-sdk
That command will add this repository to your /vendor directory, as well as all of the dependencies, which include a global, CMS-agnostic PHP library and a WordPress plugin as well as all of the documentation for the SDK.

Alternately, you can add pantheon-systems/edge-integrations-wordpress-sdk as a dependency to your project's composer.json file and run composer install.

### Install Manually


## Configure Geolocation

Geotargeting is a method that delivers different content to visitors based on their geolocation. This includes country, region, city, and other criteria.

## Test Geolocation



## Geolocation Use Case



## Configure Interests



## Test Interests



## Interests Use Case



## How to build a WordPress Widget that uses the Edge Integrations SDK

## Additional Resources

- [Pantheon Edge Integrations Global Library](https://github.com/pantheon-systems/pantheon-edge-integrations)
- [Pantheon Geolocation Shortcodes](https://github.com/pantheon-systems/pantheon-geolocation-shortcodes)
- [Geo: Function Reference](https://github.com/pantheon-systems/edge-integrations-wordpress-sdk/blob/main/docs/geo.md)
- [Interest: Function Reference](https://github.com/pantheon-systems/edge-integrations-wordpress-sdk/blob/main/docs/interest.md)
