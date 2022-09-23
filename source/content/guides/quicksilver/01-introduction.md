---
title: Automate and Integrate your WebOps Workflow with Quicksilver
subtitle: Introduction
description: Learn how to use Quicksilver to automate your WebOps workflow.
categories: [automate]
tags: [quicksilver, webops, workflow]
layout: guide
showtoc: true
permalink: docs/guides/quicksilver
anchorid: quicksilver
---

Quicksilver hooks into platform workflows to automate your Pantheon WebOps workflow. This allows the platform to run selected scripts automatically every hour, or when a team member triggers the corresponding workflow. There is a [growing set of example scripts](https://github.com/pantheon-systems/quicksilver-examples/) that you can contribute to. You can also find examples to enable functionality like chat-ops, database sanitization, deployment logging, and automated testing operations with a CI server.

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