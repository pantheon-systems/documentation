---
title: New Relic Integration
description: A guide to integrating Pantheon and New Relic for deployment labeling.
tags: [siteintegrations]
type: guide
permalink: docs/guides/:basename/
date: 5/1/2017
contributors: scottmassey
---

## New Relic Application Performance Monitoring

New Relic is a powerful tool for monitoring the performance of a WordPress or Drupal site. It provides insight into how efficiently a website is using resources, and where improvements can be made in the application. Because Pantheon includes New Relic Pro with every site, it is simple to enable. There are several valuable ways to extend this integration, one of which we will cover in this guide.

## What you will build

In this guide, we will enable New Relic Pro and integrate Pantheon's Quicksilver webhooks to automatically label deploys. This creates a traceable connection between performance changes and code deployments, allowing developers to see if a code change positively or negatively impacted performance.

## Before You Begin

You will need:

- A Drupal or WordPress site on Pantheon.
- A [local clone](/docs/git/) of the codebase.

## Enable New Relic

1.  On the WordPress or Drupal site, enable New Relic from the site dashboard. It will begin showing data shortly after an environment receives web requests.

    ![Enable New Relic](/source/docs/assets/images/integrations/newrelic/nr_enable.png)

2.  Once enabled, click the **Go to New Relic** button to access the New Relic dashboard. Each environment should be visible and as live traffic occurs, performance will be analyzed and displayed.

    ![Enable New Relic](/source/docs/assets/images/integrations/newrelic/goto_nr.png)
    

## Recording Deployments

This will require the use of Pantheon's Quicksilver webhooks, which are provided on all sites on the platform. When a code push to the development environment occurs, or a deployment to the test or live environments happen, Quicksilver will run a script. In this example Pantheon has pre-written the script, [along with many others](https://github.com/pantheon-systems/quicksilver-examples).

1.  Clone the example script repository to a local directory. In this example we're cloning the repository to your home directory (`~/`). Be sure to adjust the paths in this and the remaining commands to match your local directory structure:

        git clone https://github.com/pantheon-systems/quicksilver-examples.git ~/quicksilver-examples


2. On your local machine, navigate to your website repository's root and create a `pantheon.yml` file, if it does not exist. This is the file that tells Quicksilver to execute a script when a specific event occurs. Add this code to the `pantheon.yml` file:

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


    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p markdown="1">`api_version` should be set once in [`pantheon.yml`](/docs/pantheon-yml/). If you have an existing `pantheon.yml` with this line, don't add it again.</p>
    </div>

3.  Create a directory named `private` at the same directory level. This naming convention lets Pantheon know to keep this directory publicly inaccessible. Copy the New Relic script from the example folder to the "private/scripts" folder.


        mkdir private && mkdir private/scripts
        cd private/scripts
        cp ~/quicksilver-examples/new_relic_deploy/new_relic_deploy.php .


4.  Commit and push these files to your dev environment.

        git add .
        git commit -am "Adding deployment recording to New Relic"
        git push origin master

    In the terminal, you should see that your `pantheon.yml` file is being applied. Even this initial code push should appear now in your New Relic dashboard, on the **Deployments** tab under your dev site.

    ![Deployment tab display](/source/docs/assets/images/integrations/newrelic/deploy_tab.png)

    You can also view deployments from the dashboard overview.

    ![Deployment overview display](/source/docs/assets/images/integrations/newrelic/deploy_marker.png)

5.   Once you've tested and confirmed there are no issues,, deploy your new commit to test and live. From now on, your deploys will be recorded in New Relic.

## Conclusion
This is a fast way to integrated New Relic and Pantheon. The Quicksilver examples in the repository cover many more ways to automate development, so please take advantage of them and extend them to fit your workflow.
