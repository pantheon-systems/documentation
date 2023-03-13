---
title: Decoupled WordPress Backend Starter for Front-End Sites
subtitle: Configure an Existing Project
description: Learn how to configure an existing project to use a frontend starter kit.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-backend-starters/configure-existing
anchorid: configure-existing
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

While we offer a back-end starter project for use with our front-end starter
kits, you may instead prefer to use an existing WordPress project. Follow the
steps below to configure an existing WordPress project to work with one of our front-end starter kits.

## Before You begin

These instructions assume that you have already installed WordPress using your preferred method.

## Install and Activate Plugins

- Install and activate the
  [WPGraphQL Plugin](https://wordpress.org/plugins/wp-graphql/).
- If you are planning on using the Gatsby WordPress front-end starter kit,
  install and activate the
  [WPGatsby Plugin](https://wordpress.org/plugins/wp-gatsby/). This plugin is
  not required for the Next.js and WordPress starter kit.

## Create Supporting Content

Our starter kits assume that there is at least one published post and page in
your WordPress back-end. A default WordPress install will have a sample of each, but if your site does not have any page or post content, you should create some before proceeding.

The footer in our starter kit sources menu data from a classic WordPress menu
with the name 'Example Menu'. If a menu with this name does not exist, the
footer menu will not display. The footer component in the starter kit can be
customized to source data from a different menu.

## Set the Necessary Front-End Environment Variables

At this point, your WordPress site should be configured to work with one of our front-end starter kits. Within your front-end project you will also need to set the necessary environment variables to source data from your WordPress back-end.

- [Instructions for the Next.js and WordPress starter kit](../../Frontend%20Starters/Next.js/Next.js%20%2B%20WordPress/setting-environment-variables.md)
- [Instructions for the Gatsby WordPress starter kit](../../Frontend%20Starters/Gatsby/Gatsby%20%2B%20WordPress/setting-environment-variables.md)

## Optional Configuration

### Enable Edge Caching

For sites running on Pantheon, a small amount of configuration can be updated in order to enable edge caching and purging across the entire decoupled stack.