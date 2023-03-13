---
title: Drupal Frontend Starters for Front-End Sites
subtitle: Next.js + Drupal Starter
description: Understand the differences between SSG, ISR, and SSR.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-frontend-starters/create
anchorid: create
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to use the Next.js + Drupal starter kit.

## Before You Begin

The Pantheon `next-drupal-starter` uses Next.js and has been tested using [nodejs v16 with npm v8](https://nodejs.org/en/download/).

## Create A New Project With The Starter Template

There are two methods to creating a new project based on the `next-drupal-starter`:

- Clone the starter repo directly
- Use `create-next-app`

### Clone the GitHub Repo

1. Go to the [GitHub repo](https://github.com/pantheon-systems/next-drupal-starter).
1. Click the **Code** button to open the clone drop-down and select your preferred method to clone the project.

### Use the `create-next-app`

1. Open your terminal and run:

    ```bash{promptUser: user}
    npx create-next-app -e https://github.com/pantheon-systems/next-drupal-starter --use-npm
    ```

1. Omit the `--use-npm` flag to use yarn, or keep the flag to use npm. Note that the `create-next-app` uses the yarn package manager by default.


