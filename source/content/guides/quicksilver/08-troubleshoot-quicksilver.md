---
title: Quicksilver on Pantheon
subtitle: Troubleshoot
description: Review solutions to common Quicksilver troubleshooting scenarios.
categories: [automate]
tags: [quicksilver, webops, workflow]
layout: guide
showtoc: true
permalink: docs/guides/quicksilver/troubleshoot-quicksilver
anchorid: troubleshoot-quicksilver
---

This section provides solutions to common Quicksilver debugging and troubleshooting scenarios.

## Debugging via Terminus

Use the [Terminus](/terminus) commands in the sections below to debug Quicksilver.

### Stream New Workflows to the Console

Run `terminus workflow:watch <site>` to follow your site's WebOps activity.

### Explore Previous Workflows

List and show previous workflows and their corresponding Quicksilver operations with the following commands:

- `terminus workflow:list <site>`
- `terminus workflow:info:logs <site> --id=<workflow>`
- `terminus workflow:info:operations <site> --id=<workflow>`
- `terminus workflow:info:status <site> --id=<workflow>`

## Troubleshooting

### MultiDev Creation Hook Does Not Run When Expected

Quicksilver hooks for the `create_cloud_development_environment` workflow will not be detected when creating a Multidev environment if the `pantheon.yml` file **does not** exist on the Dev environment. As a workaround:

1. Commit the `pantheon.yml` file on Dev.

1. Create your Multidev environment after the commit is pushed.

### Deploying Configuration Changes or Quicksilver Hooks to Multidev

Configuration changes are not be detected when creating a Multidev environment if a `pantheon.yml` file **does not** exist on the Dev environment. As a workaround:

1. Make some modification the `pantheon.yml` file.

1. Re-commit to the Multidev environment. You will then receive a notice indicating configuration changes have been detected and applied to the Multidev environment:

   ```none
   remote:
   remote: PANTHEON NOTICE:
   remote:
   remote: Changes to `pantheon.yml` detected.
   remote:
   remote: Successfully applied `pantheon.yml` to the 'new-feature' environment.
   remote:
   remote:
   ```

### Autopilot VRT Hook Does Not Run When Expected

Quicksilver hooks are not detected due to timing issues with Multidev creation for some [Autopilot](/guides/autopilot) users. If your Quicksilver `autopilot_vrt` scripts are not running:

1. Verify that your scripts are defined in the Dev environment.

1. Delete your `Autopilot` Multidev from the Dashboard.

1. Delete the `Autopilot` branch of the Multidev.

1. Create the `Autopilot` Multidev again in the Dashboard. Your scripts should start running after the visual regression tests complete.

## More Resources

- [The pantheon.yml Configuration File](/pantheon-yml)
- [Quicksilver Examples Repository](https://github.com/pantheon-systems/quicksilver-examples/)
- [Autopilot](/guides/autopilot)
- [Multidev](/guides/multidev)
