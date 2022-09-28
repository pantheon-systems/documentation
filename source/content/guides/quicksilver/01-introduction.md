---
title: Quicksilver on Pantheon
subtitle: Introduction
description: Learn how to automate and integrate your WebOps workflow with Quicksilver.
categories: [automate]
tags: [quicksilver, webops, workflow]
layout: guide
showtoc: true
permalink: docs/guides/quicksilver
anchorid: quicksilver
---

Quicksilver hooks into platform workflows to automate your Pantheon WebOps workflow. This allows the platform to run selected scripts automatically every hour, or when a team member triggers the corresponding workflow. There is a [growing set of example scripts](https://github.com/pantheon-systems/quicksilver-examples/) that you can contribute to. You can also find examples to enable additional functionality, including:

- Chat-ops
- Database sanitization
- Deployment logging
- Automated testing operations with a CI server

<Enablement title="Quicksilver Cloud Hooks Training" link="https://pantheon.io/learn-pantheon?docs">

Set up existing scripts and write your own with help from our experts. Pantheon delivers on-demand training to help development teams master our platform and improve their internal WebOps.

</Enablement>

## WebOps Workflow and Stage

You can specify the workflows you want to [hook](/guides/quicksilver/hooks) into, for example, `deploy` or `sync_code`. You can also specify the workflow stage (`before` or `after`) and the location of the script relative to the root of your site's docroot.

The adapted [slack_notification](https://github.com/pantheon-systems/quicksilver-examples/tree/master/slack_notification) example below provides steps to post to Slack every time you deploy.

1. Commit a [pantheon.yml](/pantheon-yml) file with the following content: 

  ```yaml:title=pantheon.yml
  api_version: 1

  workflows:
    deploy:
      after:
        - type: webphp
          description: Post deployment notification to Slack
          script: private/scripts/slack_deploy_notification.php
  ```

1. Add the code below if you want the script to automatically log the deployment to New Relic:

  ```yaml:title=pantheon.yml
        - type: webphp
          description: Log to New Relic
          script: private/scripts/new_relic_deploy.php
  ```

## More Resources

- [Quicksilver Platform Integration Hooks](/pantheon-yml#quicksilver-platform-integration-hooks)
- [Pantheon YAML Configuration Files](/pantheon-yml)
- [New Relic on Pantheon](/guides/new-relic)