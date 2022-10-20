---
title: Quicksilver on Pantheon
subtitle: Quicksilver Hooks
description: Learn how to use Quicksilver hooks to improve your workflow.
categories: [automate]
tags: [quicksilver, webops, workflow]
layout: guide
permalink: docs/guides/quicksilver/hooks
anchorid: hooks
---

This section provides information on Quicksilver Hooks workflows.

## Quicksilver and the Deploy Hook

Deploy your `pantheon.yml` file into an environment before using a Quicksilver hook for a deploy workflow.

Quicksilver [scripts](/guides/quicksilver/install-script) that trigger on the deploy hook operate on the state of the code at the time of the deploy, not the state of the code after the deploy. This means that new or updated code is not available until the deployment finishes even though the deploy hook is triggered at the start of the deploy.

## Hooks

You can hook into the following workflows:

| Workflow         | Description                         | Location of webphp runtime | Notes                                       |
|:-----------------|:------------------------------------|:---------------------------|:--------------------------------------------|
| `autopilot_vrt`  | Autopilot Visual Regression test    | "Autopilot" Multidev       | `after` stage valid, `before` stage invalid |
| `clear_cache`    | Clear CMS and Edge Cache            |                            |                                             |
| `clone_database` | Clone database between environments | target (to_env)            |                                             |
| `create_cloud_development_environment`                       | Create Multidev environment                                             | Multidev               | `after` stage valid, `before` stage invalid
| `deploy`                            | Deploy code to Test or Live | target            |                                             |
| `deploy_product` | Create site                                         | Dev                   | `after` stage valid, `before` stage invalid |
| `sync_code`                        | Use the command `git push` command to change the code; commit via the Pantheon Dashboard, upstream update, Multidev merge, or automated workflows                                    | Dev or Multidev      |   |

<Alert type="info" title="Note">

Note that the `sync_code` hook runs after the build finishes and the artifacts have been completely deployed to the application server for sites using [Integrated Composer](/guides/integrated-composer).

</Alert>

## More Resources

- [Integrated Composer](/guides/integrated-composer)
- [Database Clone](/guides/mariadb-mysql/database-workflow-tool#cloning-the-database)
- [Pantheon YAML Configuration Files](/pantheon-yml)
