---
title: Automatically Label Code Changes in New Relic®; Performance Monitoring using Quicksilver Hooks
description: A guide to integrating Pantheon and New Relic®; Performance Monitoring for deployment labeling.
categories: [automate]
tags: [code, newrelic, quicksilver, workflow]
type: guide
permalink: docs/guides/:basename
reviewed: "2020-08-18"
contributors: [scottmassey]
---

New Relic&reg; Performance Monitoring is a powerful tool for monitoring the performance of a WordPress or Drupal site. It provides insight into how efficiently a website is using resources, and where improvements can be made in the application. Pantheon offers New Relic&reg; Pro within the Site Dashboard on all sites for free.

In this guide, we'll automatically label code changes to your site in New Relic&reg;'s Deployment page using Pantheon's [Quicksilver hooks](/quicksilver/#hooks) and [Terminus](/terminus). This creates a traceable connection between performance changes and code deployments, allowing developers to see if a code change positively or negatively impacted performance.

## Activate New Relic&reg; Performance Monitoring Pro

Follow the instructions at [New Relic APM Pro](/new-relic/#activate-new-relic-performance-monitoring) to activate New Relic&reg; Performance Monitoring for your site.

## Configure Quicksilver Hook to Record Deployments

Next, we'll use Pantheon's Quicksilver hooks to run our example [New Relic script](https://github.com/pantheon-systems/quicksilver-examples/blob/master/new_relic_deploy/new_relic_deploy.php) immediately after code is synced on Dev or a Multidev environment and after code is deployed to Test and Live. The script configured in this guide applies a label to the Deployment page in New Relic.

<Alert title="Variables" type="export">

This process uses [Terminus](/terminus) commands that require your site name. Before we begin, set the variable `$site` in your terminal session to match your site name:

```bash{promptUser: user}
export site=yoursitename
```

</Alert>

1. If you haven't done so already, [clone your Pantheon site repository](/git#clone-your-site-codebase) and navigate to the project's root directory. You can use Terminus to provide the clone command:

  ```bash{outputLines:2-3}
  terminus connection:info $site.dev --fields='Git Command' --format=string

  git clone ssh://codeserver.dev.2187...d85b@codeserver.dev.2187...d85b.drush.in:2222/~/repository.git sitename
  ```

  After you copy and run the output command, change directory to the site code root:

  ```bash{promptUser: user}
  cd $site
  ```

1. Set the connection mode to Git:

  ```bash{promptUser: user}
  terminus connection:set $site.dev git
  ```

1. Create a copy of [Pantheon's `new_relic_deploy.php`](https://github.com/pantheon-systems/quicksilver-examples/blob/master/new_relic_deploy/) script in the project's private path:

  ``` bash{promptUser: user}
  mkdir -p private/scripts
  curl https://raw.githubusercontent.com/pantheon-systems/quicksilver-examples/master/new_relic_deploy/new_relic_deploy.php --output ./private/scripts/new_relic_deploy.php
  ```

1. Create a `pantheon.yml` file if one doesn't already exist in your root directory.

1. Paste the following workflow into your `pantheon.yml` file to hook into the platform after code is synced on Dev/Multidev and deployed to Test/Live to fire off the New Relic integration script:

  ```yaml:title=pantheon.yml
  api_version: 1

  workflows:
    # Log to New Relic when deploying to test or live.
    deploy:
      after:
        - type: webphp
          description: Log to New Relic
          script: private/scripts/new_relic_deploy.php
    # Also log sync_code so you can track new code going into dev/multidev.
    sync_code:
      after:
        - type: webphp
          description: Log to New Relic
          script: private/scripts/new_relic_deploy.php
  ```

   <Alert title="Note" type="info">

   `api_version` should be set once in [`pantheon.yml`](/pantheon-yml). If you have an existing `pantheon.yml` with this line, don't add it again.

   </Alert>

1. [Add, commit, and push](/git#push-changes-to-pantheon) changes to the Dev environment:

  ```bash{promptUser: user}
  git add private/scripts/new_relic_deploy.php
  git commit -am "Adding deployment recording to New Relic"
  git push origin master
  ```

  In the terminal, you should see that your `pantheon.yml` file is being applied. Even this initial code push should appear in your Dev environment's New Relic account, on the **Deployments** tab:

  ![Deployment tab display](../../images/integrations/newrelic/deploy_tab.png)

1. Once you've tested and confirmed there are no issues, deploy your new commit to Test and Live. From now on, your deploys will be recorded in New Relic&reg; Performance Monitoring.

## Conclusion

This is a fast way to integrate New Relic&reg; Performance Monitoring and Pantheon. The [Quicksilver Examples](https://github.com/pantheon-systems/quicksilver-examples) repository provides many more ways to automate development, so please take advantage of them and extend them to fit your workflow.
