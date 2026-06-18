---
title: New Relic Performance Monitoring on Pantheon
subtitle: New Relic Labeling with Quicksilver
description: Automatically Label Code Changes in New Relic Performance Monitoring using Quicksilver Hooks.
contenttype: [guide]
innav: [false]
categories: [track]
cms: [--]
audience: [development, sysadmin]
product: [newrelic]
integration: [--]
tags: [code, newrelic, quicksilver, workflow]
contributors: [scottmassey]
showtoc: true
permalink: docs/guides/new-relic/new-relic-quicksilver
---

New Relic&reg; Performance Monitoring is a powerful tool for monitoring the performance of a WordPress or Drupal site. It provides insight into how efficiently a website is using resources, and where improvements can be made in the application. Pantheon offers New Relic&reg; Pro within the Site Dashboard on all sites (excluding Basic) for free.

This integration becomes more useful when code changes (signified by deployments) are labeled in New Relic&reg; to track performance changes over time.
Such tracking can be done using [Quicksilver hooks](/guides/quicksilver/hooks) and [Terminus](/terminus). This creates a traceable connection between performance changes and code deployments, allowing developers to determine whether a code change positively or negatively impacted performance.

To add these labels automatically on code pushes or deployments, follow the steps outlined in the [script documentation](https://github.com/pantheon-systems/quicksilver-examples/blob/main/new_relic_deploy).

## More Quicksilver Examples

The [Quicksilver Examples](https://github.com/pantheon-systems/quicksilver-examples) repository provides many more ways to automate process.
Take advantage of them and extend them to fit your workflow.

## More Resources

- [Automate and Integrate your WebOps Workflow with Quicksilver](/guides/quicksilver)

- [Quicksilver Examples Repository](https://github.com/pantheon-systems/quicksilver-examples)

- [Pantheon YAML Configuration Files](/pantheon-yml)
