---
title: Early Access: Upstreams
earlyaccess: true
description: Learn how to create and manage Custom Upstreams in the Organization Dashboard.
earlynote: The documentation on this page discusses features and options that are not available across the entire platform.
---
The following feature has not yet been released across the entire platform and is currently invite only. For discussion or to report problems, please visit the [upstreams Slack channel](https://pantheon-community.slack.com/messages/C5EQAM15X/). To request an invite.. [do we want to allow signups?]

## Create Custom Upstream
### Repository Preparation
There are three preparatory steps to complete before you'll be ready to connect a custom Upstream in your Organization Dashboard. Complete each of the following before continuing:

1. [Create and Host the Repository Remotely](/docs/create-custom-upstream/#create-and-host-the-repository-remotely)
2. [Pull in Core from Pantheon's Upstream](/docs/create-custom-upstream/#pull-in-core-from-pantheons-upstream)
3. [Grant Pantheon Access (Privately Hosted Repositories Only)](/docs/create-custom-upstream/#grant-pantheon-access-privately-hosted-repositories-only)

### Connect the Repository to Pantheon
1. From your Organization Dashboard, click the **<span class="glyphicons glyphicons-git-branch"></span> Upstreams** tab.
2. Click the **<span class="glyphicons glyphicons-plus"></span> Add Custom Upstream** button.
3. Enter the following information about the Custom Upstream:
    - **Name**
    - **Logo URL**: (Optional) Recommended size is 70x80px
    - **Description**: (Optional) Less than 200 characters, plain text
    - **Upstream Repository URL**: Must end in `.git` (Example: `user@repovendor.com:sub/file.git`)
    - **Repository Authentication**: Only required if the repository is hosted privately
     - Refer to the user [created above](#grant-pantheon-access-privately-hosted-repositories-only), and provide `username:password` or a [token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) if supported by your repository hosting provider.
    - **Initial Connection Mode**: Git or SFTP
    - **Framework**: Drupal 6 / Drupal 7, Drupal 8, Drupal 8 Backdrop, WordPress, WordPress Multisite

4. Click **Create**.

## Edit Existing Custom Upstream
1. From your Organization Dashboard, click the **<span class="glyphicons glyphicons-git-branch"></span> Upstreams** tab.
2. Click **Edit** next to the existing upstream requiring an update.
3. Make desired updates
