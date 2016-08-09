---
title: Automate your Workflow with Quicksilver Platform Integration Hooks
description: Pantheon's Quicksilver Hooks system allows users to encode reactions to specific platform workflows, enabling the functionality professionals expect, including chat-ops, database sanitization, deployment logging, and initiating automated testing operations with a CI server.
categories: [developing]
tags: [platform]
---

Hook into platform workflows to automate your Pantheon workflow. Tell us which script you want to run, and we'll run it automatically every time you or another team member triggers the corresponding workflow. Find (and contribute!) to a [growing set of example scripts](https://github.com/pantheon-systems/quicksilver-examples/). Find examples to enable functionality like chat-ops, database sanitization, deployment logging, and automated testing operations with a CI server.

For example, committing a `pantheon.yml` file with the following contents to the root of your site's code repository, along with the script adapted from [slack_notification](https://github.com/pantheon-systems/quicksilver-examples/tree/master/slack_notification) would post to Slack every time you deploy:

```yaml
api_version: 1

workflows:
  deploy:
    after:
        type: webphp
        description: Post deployment notification to Slack
        script: private/scripts/slack_deploy_notification.php
```

If you added the following after the previous snippet, then we'll also run that script to automatically log the deployment to New Relic:

```yaml
        type: webphp
        description: Log to New Relic
        script: private/scripts/new_relic_deploy.php
```

## Workflow and Stage

Specify the workflows you want to hook into (e.g. `deploy` or `sync_code`), the workflow stage (`before` or `after`) and the location of the script, relative to root of your site's DOCROOT.

## Type

`webphp`: Runs a PHP script via the same runtime environment as the website itself. PHP scripts are subject to the same limits as any code on the platform, like [timeouts](/docs/timeouts/), and cannot be batched.

In the future we may add additional types.

## Hooks

You can hook into the following workflows:

<table class="tg">
  <tr>
    <th><strong>Workflow</strong></th>
    <td><strong>Description</strong></th>
    <th><strong>Location of webphp script runtime</strong></th>
    <th><strong>Note</strong>
  </tr>
  <tr>
    <td><code>clear_cache</code></td>
    <td><strong>Clear CMS and Edge Cache<strong></td>
  </tr>
  <tr>
    <td><code>clone_database</code></td>
    <td><strong>Clone database between environments</strong></td>
    <td>target (to_env)</td>
  </tr>
  <tr>
    <td><code>deploy</code></td>
    <td><strong>Deploy code to Test or Live</strong></td>
    <td>target</td>
  </tr>
  <tr>
    <td><code>deploy_product</code></td>
    <td><strong>Create site</strong></td>
    </td><td>Dev</td>
    <td><code>after</code> stage valid, <code>before</code> stage invalid</td>
  </tr>
  <tr>
    <td><code>sync_code</code></td>
    <td>Push code via Git or commit OSD/SFTP changes via Pantheon Dashboard
    <td>dev or Multidev</td>
  </tr>

  <tr>
    <td><code>create_cloud_development_environment</code></td>
    <td>Create Multidev environment</td>
    <td>Multidev</td>
    <td><code>after</code> stage valid, <code>before</code> stage invalid</td>
  </tr>

</table>


## Debugging via Terminus

Use [Terminus](/docs/terminus) for debugging Quicksilver.

### Stream new workflow to the console

Follow the workflow activity of your site with `terminus workflows watch`

### Explore previous workflows

List and show previous workflows and their corresponding Quicksilver operations with the following commands:

* `terminus workflows list`
* `terminus workflow show`


## Troubleshooting

Note that if you want to hook into deploy workflows, you'll need to deploy your `pantheon.yml` into an environment first. Likewise, if you are adding new operations or changing the script an operation will target, the deploy which contains those adjustments to pantheon.yml will not self-referentially exhibit the new behavior. Only subsequent deploys will be affected.



## See Also

- [The Pantheon.yml configuration file](/docs/pantheon.yml)
- [Quicksilver Examples]((https://github.com/pantheon-systems/quicksilver-examples/))
