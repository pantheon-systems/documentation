---
title: Automate and Integrate your WebOps Workflow with Quicksilver
description: Learn how to use Quicksilver to automate your WebOps workflow.
categories: [automate]
tags: [quicksilver, webops, workflow]
reviewed: "2020-03-10"
---

Hook into platform workflows to automate your Pantheon WebOps workflow. Tell Pantheon which script you want to run, and the platform will run it automatically every time you or another team member triggers the corresponding workflow. View (and contribute) to a [growing set of example scripts](https://github.com/pantheon-systems/quicksilver-examples/). Find examples to enable functionality like chat-ops, database sanitization, deployment logging, and automated testing operations with a CI server.

<Enablement title="Quicksilver Cloud Hooks Training" link="https://pantheon.io/agencies/learn-pantheon?docs">

Set up existing scripts and write your own with help from our experts. Pantheon delivers custom workshops to help development teams master our platform and improve their internal WebOps.

</Enablement>

For example, committing a `pantheon.yml` file with the following contents to the root of your site's code repository with the script adapted from [slack_notification](https://github.com/pantheon-systems/quicksilver-examples/tree/master/slack_notification) will post to Slack every time you deploy:

```yaml:title=pantheon.yml
api_version: 1

workflows:
  deploy:
    after:
      - type: webphp
        description: Post deployment notification to Slack
        script: private/scripts/slack_deploy_notification.php
```

Add the following after the previous snippet to have it automatically log the deployment to New Relic:

```yaml:title=pantheon.yml
      - type: webphp
        description: Log to New Relic
        script: private/scripts/new_relic_deploy.php
```

## WebOps Workflow and Stage

Specify the workflows you want to [hook](#hooks) into (e.g., `deploy` or `sync_code`) the workflow stage (`before` or `after`) and the location of the script relative to the root of your site's docroot.

### Quicksilver and the Deploy Hook

Before using a Quicksilver hook for a deploy workflow, deploy your `pantheon.yml` file into an environment.

Quicksilver scripts that trigger on the deploy hook operate on the state of the code at the time of the deploy, not the state of the code after the deploy. This means that new or updated code is not available until the deployment finishes even though the deploy hook is triggered at the start of the deploy.

## Script Type and Location

Quicksilver currently supports `webphp` scripting, which runs a PHP script via the same runtime environment as the website itself. PHP scripts are subject to the same limits as any code on the platform, like [timeouts](/timeouts), and cannot be batched. In the future we may add additional types.

We recommend setting up a dedicated directory in the docroot (e.g., `private/scripts`) for tracking these files. If your site uses a [nested docroot](/nested-docroot), the scripts directory needs to be located in the `web` subdirectory of your site's code repository (e.g., `web/private/scripts`).

## Hooks

You can hook into the following workflows:

| Workflow                               | Description                                                         | Location of webphp runtime | Notes                                       |
|:-------------------------------------- |:------------------------------------------------------------------- |:-------------------------- |:------------------------------------------- |
| `clear_cache`                          | Clear CMS and Edge Cache                                            |                            |                                             |
| `clone_database`                       | Clone database between environments                                 | target (to_env)            |                                             |
| `deploy`                               | Deploy code to Test or Live                                         | target                     |                                             |
| `deploy_product`                       | Create site                                                         | Dev                        | `after` stage valid, `before` stage invalid |
| `sync_code`                            | Push code via Git or commit OSD/SFTP changes via Pantheon Dashboard | Dev or Multidev            |                                             |
| `create_cloud_development_environment` | Create Multidev environment                                         | Multidev                   | `after` stage valid, `before` stage invalid |

## Secrets

Your script may require tokens, passwords, or other information that should be protected. These values should be stored securely. You can do this with a third-party key management service like [Lockr](/guides/lockr), or with a storage solution in your site's [private files path](/private-paths#private-path-for-files).

For the latter, the [Terminus Secrets Plugin](https://github.com/pantheon-systems/terminus-secrets-plugin) provides a convenient way to manage secret data in JSON files in your site's private files path.

<Alert type="info" title="Note">

When storing keys for Quicksilver scripts in the private files path, be aware that the Site Dashboard function to copy files from one environment to another will also overwrite the private files path.

</Alert>

## Debugging via Terminus

Use the following [Terminus](/terminus) commands for debugging Quicksilver.

### Stream New Workflows to the Console

Follow the WebOps activity of your site with `terminus workflow:watch <site>`.

### Explore Previous Workflows

List and show previous workflows and their corresponding Quicksilver operations with the following commands:

- `terminus workflow:list <site>`
- `terminus workflow:info:logs <site> --id=<workflow>`
- `terminus workflow:info:operations <site> --id=<workflow>`
- `terminus workflow:info:status <site> --id=<workflow>`

## Troubleshooting

### MultiDev Creation Hook Does Not Run When Expected

Quicksilver hooks for the `create_cloud_development_environment` workflow will not be detected when creating a Multidev environment if the `pantheon.yml` file **does not** exist on the Dev environment. As a workaround, commit the `pantheon.yml` file on Dev before creating a Multidev environment.

### Deploying Configuration Changes or Quicksilver Hooks to Multidev

If a `pantheon.yml` file **does not** exist on the Dev environment, configuration changes will not be detected when creating a Multidev environment. As a workaround, make some modification the `pantheon.yml` file and re-commit to the Multidev environment. You will then receive a notice indicating configuration changes have been detected and applied to the Multidev environment:

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

## See Also

- [The Pantheon.yml Configuration File](/pantheon-yml)
- [Quicksilver Examples](https://github.com/pantheon-systems/quicksilver-examples/)
