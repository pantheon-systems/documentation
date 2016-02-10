---
title: The pantheon.yml Configuration File
description: Developers can set project configuration in a pantheon.yml file stored in the root of their code repository.  
---

Configuration stored in [YAML](https://en.wikipedia.org/wiki/YAML) files has become a standard across PAAS providers. The `pantheon.yml` file allows developers to hook into platform workflows. It will soon give developers the ability to configure other settings for their sites.

## About `pantheon.yml`
The file can contain two collections, `api version:` and `workflows:`.  

### API Version
The current API version for pantheon.yml is `1`. This is the only valid value to place in this field. Additional valid values may be introduced in the future.
```yaml
api_version: 1
```
### Workflows 
The workflows collection allows developers to hook into platform operations. Developers Identify the workflows they want to hook into, the workflow “stage” (before or after) to hook into, and then define a sequence of mapping blocks that define the operations the platform will run during the workflow stage. For more information, see [Quicksilver Platform Hooks](/docs/articles/sites/quicksilver/). 


```yaml
# Example workflows block.
workflows:
  # Identify the workflow to hook into
  deploy:
    # Identify the stage of the workflow.
    after:
      # Define a sequence of collections of mappings to define quicksilver operations.
      - 
        # For now, the only "type" available is webphp.
        type: webphp
        # This will show up in output to help you keep track of your operations.
        description: Log to New Relic
        # This is (obviously) the path to the script.
        script: private/scripts/new_relic_deploy.php
      # The operation defined in this collection will run after the previous operation
      - 
        type: webphp
        description: Post deployment notification to Slack
        script: private/scripts/slack_deploy_notification.php
```
## How it Works

1. A developer adds a `pantheon.yml` file to the root of the code repository and attempts to commit it on the server or push a local commit to the platform.
2. Using a pre-receive git-hook, the platform recognizes its existence and validates it. 
3. If the file contents are invalid, it will reject the commit.
4. Once committed, the platform makes a copy of the file and sends it to our automation infrastructure provider. 
5. When developers run workflows identified in the file’s `workflows:` section, it will perform the user-specified operations before or after the platform workflow runs. 
6. If project configurations have changed, the platform will deploy those changes to the site environments. 
