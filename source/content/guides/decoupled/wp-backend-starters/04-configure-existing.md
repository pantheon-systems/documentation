---
title: Decoupled WordPress Backend Starter for Front-End Sites
subtitle: Configure an Existing Project
description: Learn how to configure an existing project to use a Front-End starter kit.
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

Pantheon offers a [back-end starter project](/guides/decoupled/wp-backend-starters/create) to simplify the process of configuring a WordPress site for use with our Front-End starter kits. However, you can configure an existing backend project to use one of Pantheon's Front-End starter kits.

Follow the steps below to configure an existing WordPress backend project to work with one of our Front-End starter kits.

## Before You begin

These instructions assume that you have already installed WordPress using your preferred method.

## Install and Activate Plugins

Install and activate the [WPGraphQL Plugin](https://wordpress.org/plugins/wp-graphql/).

### Gatsby WordPress Front-End Starter Kit

Install and activate the [WPGatsby Plugin](https://wordpress.org/plugins/wp-gatsby/).

### Next.js WordPress Front-End Starter Kit

No additional plugin is required.

## Create Supporting Content

Our starter kits assume that there is at least one published post and page in
your WordPress backend. A default WordPress install will have a sample of each, but if your site does not have any page or post content, you should create some before proceeding.

The footer in our starter kit sources menu data from a classic WordPress menu
with the name 'Example Menu'. If a menu with this name does not exist, the
footer menu will not display. The footer component in the starter kit can be
customized to source data from a different menu.

## Set the Necessary Front-End Environment Variables

Your WordPress site should be configured to work with one of our Front-End starter kits. You must configure your Front-End project by setting the necessary environment variables to source data from your WordPress back-end.

- [Instructions for the Next.js and WordPress starter kit](/guides/decoupled/wp-nextjs-frontend-starters)
- [Instructions for the Gatsby WordPress starter kit](/guides/decoupled/wp-gatsby-frontend-starters)

## Optional Configuration

### Enable Edge Caching

For sites running on Pantheon, a small amount of configuration can be updated in order to enable edge caching and purging across the entire decoupled stack.

Configuration recommendations can be found within the [Caching Considerations](guides/decoupled/wp-backend-starters/cache#enable-edge-caching).