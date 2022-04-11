---
title: Automate and Integrate your WebOps Workflow with Quicksilver
description: Learn how to use Quicksilver to automate your WebOps workflow.
categories: [automate]
tags: [quicksilver, webops, workflow]
reviewed: "2022-03-21"
---

Hook into platform workflows to automate your Pantheon WebOps workflow. Tell Pantheon which script you want to run, and the platform will run it automatically every time you or another team member triggers the corresponding workflow. View (and contribute) to a [growing set of example scripts](https://github.com/pantheon-systems/quicksilver-examples/). Find examples to enable functionality like chat-ops, database sanitization, deployment logging, and automated testing operations with a CI server.

<Enablement title="Quicksilver Cloud Hooks Training" link="https://pantheon.io/learn-pantheon?docs">

Set up existing scripts and write your own with help from our experts. Pantheon delivers on-demand training to help development teams master our platform and improve their internal WebOps.

</Enablement>

For example, committing a [pantheon.yml](/pantheon-yml) file with the following contents to the root of your site's code repository with the script adapted from [slack_notification](https://github.com/pantheon-systems/quicksilver-examples/tree/master/slack_notification) will post to Slack every time you deploy:

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

Quicksilver currently supports `webphp` scripting, which runs a PHP script through the same runtime environment as the website. PHP scripts are subject to the same limits as any code on the platform, such as [timeouts](/timeouts). PHP scripts cannot be batched, and run continuously and sequentially. Each command executes after the previous command has finished or timed out.

We recommend setting the `web_docroot` to `true` to create a dedicated directory in the docroot (for example, `private/scripts`). This tracks files by instructing Quicksilver to look for the files inside the `web` folder. If your site uses this [nested docroot](/nested-docroot) setting, the scripts directory must be located in the `web` subdirectory of your site's code repository (for example, `web/private/scripts`). 

<Alert type="info" title="Note">

If your site uses a [nested docroot](/nested-docroot), the script paths in your `pantheon.yml` file should not include the `web/` path prefix. Scripts in your `pantheon.yml` file should match the following path examples: `private/scripts/new_relic_deploy.php` or `private/scripts/slack_deploy_notification.php`

</Alert>

## Composer Script Installs

You can use Terminus to install Quicksilver Composer scripts if you have a Composer-managed site. The sections below provide links to Pantheon-maintained repositories with install scripts.

### Clear Cloudflare Cache

Use the [Pantheon Cloudflare Cache repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/cloudflare_cache) to clear your Cloudflare cache. 

<Alert title="Note"  type="info" >

Always clear your CDN cache using the `after` timing option to avoid requests re-caching stale content. Caches should generally be cleared "bottom up".

</Alert>

### Debugging with Quicksilver

Use the [Pantheon Quicksilver Debugging repository](https://github.com/pantheon-quicksilver/debugging-example) to explore Quicksilver as a workflow improvement tool.

### Drush CMI

The [Pantheon Drush CMI repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/drush_config_import) provides steps on how to integrate Drush commands into your Quicksilver operations. This allows you to import configuration changes from `.yml` files. 

### Drush Revert Features

The [Pantheon Drush Revert Features repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/drush_revert_features) provides information on using Drush to commands to revert specific features.

### Enable Development Modules

The [Pantheon Enable Development Module repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/enable_dev_modules) provides steps on how to use Drush within a Quicksilver script.

### Generate Development Content

Use the [Pantheon Generate Development Content repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/generate_dev_content) to integrate Drush devel generate commands into your Quicksilver operations. This allows you to generate development content on each database clone operation.

### Import WP-CFM Configuration Settings into a Cloned Database

Use the [Pantheon WP-CFM Import repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/wp_cfm_import) to automatically import WP-CFM configuration settings into a cloned database. This is useful for development environments that have slightly different settings than the production environment.

<Alert title="Note" type="info">

WP-CFM should only be used to write changes to code in Dev and Multidev environments, where the code base is writable. Cloning databases between environments before saving WP-CFM bundles can result in loss of data.

</Alert>

### New Relic Custom Apdex T Values Multidev Environments

Use the [Pantheon New Relic Apdex T Values repository](https://github.com/pantheon-quicksilver/new-relic-apdex-t) to set custom T values for Multidev environments. Each environment will use the default values of 0.5 and 7 for your server and browser, respectively, if you don't set a custom value. 

### New Relic Deploy Markers

Use the [Pantheon New Relic Deploy Markers repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/new_relic_deploy) to automatically log changes to your site into New Relic's Deployments page. This can be useful for keeping track of performance improvements.

### Search and Replace URLs on WordPress Sites

Use the [Pantheon Search and Replace URLs on WordPress Sites repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/wp_search_replace) to automatically find and replace URLs in the database of a WordPress website. This is helpful for sites that have multiple domains in an environment.

### Slack Integration

Use the [Pantheon Slack Integration repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/slack_notification) to integrate Slack notifications from your Pantheon project using Quicksilver. This integration overview also provides information on how to manage API keys outside of your site repository.

### URL Checker

Use the [Pantheon URL Checker repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/url_checker) to check specific URLs after a live deployment. This script also notifies you of failures by email.

### Webhooks

Use the [Pantheon Quicksilver Webhooks repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/webhook) to post workflow data to an external URL for a generic Webhook implementation.

## Hooks

You can hook into the following workflows:

| Workflow                               | Description                                                         | Location of webphp runtime | Notes                                       |
|:-------------------------------------- |:------------------------------------------------------------------- |:-------------------------- |:------------------------------------------- |
| `autopilot_vrt`                          | Autopilot Visual Regression test                                             | "Autopilot" Multidev                            | `after` stage valid, `before` stage invalid                                           |
| `clear_cache`                       | Clear CMS and Edge Cache                                 |             |                                             |
| `clone_database`                               | Clone database between environments                                         | target (to_env)                    |                                             |
| `create_cloud_development_environment`                       | Create Multidev environment                                             | Multidev               | `after` stage valid, `before` stage invalid
| `deploy`                            | Deploy code to Test or Live | target            |                                             |
| `deploy_product` | Create site                                         | Dev                   | `after` stage valid, `before` stage invalid |
| `sync_code`                        | Use the command `git push` command to change the code; commit via the Pantheon Dashboard, upstream update, Multidev merge, or automated workflows                                    | Dev or Multidev      |   |
 

<Alert type="info" title="Note">

For sites using [Integrated Composer](/guides/integrated-composer), the `sync_code` hook runs after the build finishes and the artifacts have been completely deployed to the application server.

</Alert>

## Variables

 Variables are made available through the `$_POST` global variable, and the `$_ENV` and `$_SERVER` objects. These variables include the following:


|Variable Name|Description|Hooks Available|Notes|
|--|--|--|--|
|`trace_id`|The unique ID of the workflow|All| |
|`site_id`|UUID of the site instance|All| |
|`environment`|Environment name that the workflow is running on|All|Matches the `PANTHEON_ENVIRONMENT` environment variable
|`stage`|`before` or `after` indicator for when the workflow is running|All|| |
|`qs_description`|Description of the workflow as defined in `pantheon.yml`|All| |
|`wf_type`|ID of the workflow hook that is running|All| |
|`wf_description`|Label of the workflow hook that is running|All| |
|`user_id`|UUID of the user account that initiated the task|All|If the task is initiated by Pantheon, `user_id` is `None`|
|`user_firstname`|First name of the user account that initiated the task|All|If the task is initiated by Pantheon, `user_firstname` is `Pantheon`|
|`user_lastname`|Last name of the user account that initiated the task|All|If the task is initiated by Pantheon, `user_lastname` is `Pantheon`|
|`user_fullname`|UUID of the user account that initiated the task|All|If the task is initiated by Pantheon, `user_fullname` is `Pantheon`|
|`user_email`|Email of the user account that initiated the task|All|If the task is initiated by Pantheon, `user_email` is `root@getpantheon.com`|
|`user_role`|UUID of the user that initiated the task|All| |
|`to_environment`|Target environment where the database is being cloned to|`clone_database`| |
|`from_environment`|Source environment where the database is being cloned from|`clone_database`| |
|`deploy_message`|Deploy message provided as part of a test of live deployment|`deploy`|This is only available if a deploy message is provided|
|`vrt_status`|Result of the visual regression test|`autopilot_vrt`| |
|`vrt_result_url`|Page URL associated with an Autopilot VRT result|`autopilot_vrt`|[Autopilot](/guides/autopilot) is only available in the new Pantheon Dashboard|
|`updates_info`|List of the plugins/modules/themes that were updated prior to the VRT|`autopilot_vrt`|Returns JSON data structure|

For examples on how to use these variables, see the [Quicksilver Examples](https://github.com/pantheon-systems/quicksilver-examples) repository.


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

### Autopilot VRT Hook Does Not Run When Expected

For some [Autopilot](/guides/autopilot) users, Quicksilver hooks are not detected due to timing issues with Multidev creation. If your Quicksilver `autopilot_vrt` scripts are not running, first make sure that your scripts are defined in the Dev environment, and then try deleting your `Autopilot` Multidev from the dashboard. Be sure to also delete the `Autopilot` branch, and then create the `Autopilot` Multidev again in the Dashboard. Once you do this, your scripts should start running after the visual regression tests complete.


## See Also

- [The pantheon.yml Configuration File](/pantheon-yml)
- [Quicksilver Examples Repository](https://github.com/pantheon-systems/quicksilver-examples/)
