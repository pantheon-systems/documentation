---
title: Automating and Integrating your Pantheon Workflow with Quicksilver Platform Hooks
tags: [pantheonyml, infrastructure]
categories: []
---

Hook into platform workflows to automate your Pantheon workflow. Tell us which script you want to run, and we'll run it automatically every time you or another team member triggers the corresponding workflow. View (and contribute) to a [growing set of example scripts](https://github.com/pantheon-systems/quicksilver-examples/). Find examples to enable functionality like chat-ops, database sanitization, deployment logging, and automated testing operations with a CI server.

For example, committing a `pantheon.yml` file with the following contents to the root of your site's code repository with the script adapted from [slack_notification](https://github.com/pantheon-systems/quicksilver-examples/tree/master/slack_notification) will post to Slack every time you deploy:

```yaml
api_version: 1

workflows:
  deploy:
    after:
      - type: webphp
        description: Post deployment notification to Slack
        script: private/scripts/slack_deploy_notification.php
```

If you add the following after the previous snippet, we'll also run that script to automatically log the deployment to New Relic:

```yaml
      - type: webphp
        description: Log to New Relic
        script: private/scripts/new_relic_deploy.php
```

## Workflow and Stage

Specify the workflows you want to hook into (e.g. `deploy` or `sync_code`), the workflow stage (`before` or `after`) and the location of the script relative to root of your site's docroot.

## Type of Scripts

`webphp`: Runs a PHP script via the same runtime environment as the website itself. PHP scripts are subject to the same limits as any code on the platform, like [timeouts](/docs/timeouts/), and cannot be batched.

In the future we may add additional types.

## Hooks

You can hook into the following workflows:

<table class="table  table-bordered table-responsive">
    <thead>
      <tr>
        <th>Workflow</th>
        <th>Description</th>
        <th>Location of webphp script runtime</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td><code>clear_cache</code></td>
      <td>Clear CMS and Edge Cache</td>
      <td></td>
      <td></td>
      </tr>
      <tr>
      <td><code>clone_database</code></td>
      <td>Clone database between environments</td>
      <td>target (to_env)</td>
      <td></td>
      </tr>
      <tr>
      <td><code>deploy</code></td>
      <td>Deploy code to Test or Live</td>
      <td>target</td>
      <td></td>
      </tr>
      <tr>
      <td><code>deploy_product</code></td>
      <td>Create site</td>
      <td>Dev</td>
      <td><code>after</code> stage valid, <code>before</code> stage invalid</td>
      </tr>
      <tr>
      <td><code>sync_code</code></td>
      <td>Push code via Git or commit OSD/SFTP changes via Pantheon Dashboard
      <td>Dev or Multidev </td>
      <td></td>
      </tr>
      <tr>
      <td><code>create_cloud_development_environment</code>
      <td>Create Multidev environment</td>
      <td>Multidev</td>
      <td><code>after</code> stage valid, <code>before</code> stage invalid</td>
      </tr>
    </tbody>
  </table>


## Debugging via Terminus

Use the following [Terminus](/docs/terminus) for debugging Quicksilver.

### Stream New Workflows to the Console

Follow the workflow activity of your site with `terminus workflow:watch <site>`.

### Explore Previous Workflows

List and show previous workflows and their corresponding Quicksilver operations with the following commands:

* `terminus workflow:list <site>`
* `terminus workflow:info:logs <site> --id=<workflow>`
* `terminus workflow:info:operations <site> --id=<workflow>`
* `terminus workflow:info:status <site> --id=<workflow>`


## Troubleshooting

If you want to hook into deploy workflows, you'll need to deploy your `pantheon.yml` into an environment first. Likewise, if you are adding new operations or changing the script an operation will target, the deploy containing those adjustments to `pantheon.yml` will not self-referentially exhibit the new behavior. Only subsequent deploys will be affected.
### MultiDev Creation Hook Does Not Run When Expected
Quicksilver hooks for the `create_cloud_development_environment` workflow will not be detected when creating a Multidev environment if the `pantheon.yml` file **does not** exist on the Dev environment. As a workaround, commit the `pantheon.yml` file on Dev before creating a Multidev environment.

### Deploying Configuration Changes or Quicksilver Hooks to Multidev
If a `pantheon.yml` file **does not** exist on the Dev environment, configuration changes will not be detected when creating a Multidev environment. As a workaround, make some modification the `pantheon.yml` file and re-commit to the Multidev environment. You will then receive a notice indicating configuration changes have been detected and applied to the Multidev environment:

```nohighlight
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

- [The Pantheon.yml Configuration File](/docs/pantheon-yml)
- [Quicksilver Examples](https://github.com/pantheon-systems/quicksilver-examples/)
