---
title: Decoupled Drupal Backend Starter for Front-End Sites
subtitle: Local Development
description: Learn how to set up your local development environment.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
permalink: docs/guides/decoupled/drupal-backend-starters/local-dev
anchorid: local-dev
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to set up local development for your project.

## Before You Begin

The example local environment configurations outlined below are based on
[Lando](https://lando.dev/).

- [Lando installation instructions](https://docs.lando.dev/getting-started/installation.html).

- Depending on your role, you may only need a local backend environment, or you may prefer a local environment that can run both the backend and
frontend. The following sections outline the steps to set up a local
environment for each of these use cases.

## Backend Only Setup

You can use the default Pantheon recipe provided by Lando if you are creating a local environment for your Drupal backend only. Refer to the [Getting Started section of the Lando Pantheon Plugin documentation](https://docs.lando.dev/pantheon/getting-started.html) for more information.

## Combined Frontend and Backend Setup

1. Create a `.lando.yml` file in the root of the project.

1. Copy the following config into `.lando.yml`. Note: Replace `%SITE-NAME%`, `%PANTHEON_SITE_ID%`, and `%PORT-NUMBER%`, with the site name, site id, and required port number for the Front-End Site.

        ```
        name: %SITE_NAME%
        recipe: pantheon
        config:
          framework: drupal9
          site: %SITE_NAME%
          id: %PANTHEON_SITE_ID%

        proxy:
          frontend:
            - %SITE_NAME%-fe.lndo.site:%PORT-NUMBER%

        excludes:
          - frontend/node_modules
          - node_modules

        services:
          frontend:
            type: node:16
            globals:
              npm: latest
            build:
              - "npm install --prefix ./frontend"
            port: %PORT-NUMBER%
            ssl: true
            scanner: false

        tooling:
          node:
            service: frontend
          npm:
            service: frontend
            cmd:
              - "npm --prefix ./frontend"
          yarn:
            service: frontend
            cmd:
              - "yarn --cwd=/app/frontend"
        ```

1. Clone the Front-End Site code base into the `./frontend` directory. You will most likely want to add this directory to your `.gitignore` file for the
  project.
  ```
  cd frontend
  git clone git@github.com:pantheon-systems/example-fe-site.git .
  ```
1. Consult `.env.example` to create the required environment variables files for your Front-End Site.

1. Run `lando start` to start the containers.

1. Install the Drupal site and select profiles, such as:
  `pantheon_decoupled_umami_demo` and `pantheon_decoupled_profile`.

1. Run `lando npm run develop` to start your Front-End site. It will now be
  available at the URL specified in the `proxy` section of the `.lando.yml`
  file.