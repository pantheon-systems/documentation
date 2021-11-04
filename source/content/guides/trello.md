---
title: Integrate Trello on Pantheon with Quicksilver Hooks
description: Learn how to integrate Trello with your dev workflow on Pantheon.
categories: [integrate]
tags: [collaborate, quicksilver, webops, workflow]
type: guide
permalink: docs/guides/:basename
date: 5/4/2017
contributors: [scottmassey]
---
[Trello](https://trello.com) is a simple yet powerful project management tool which helps teams to collaborate on projects in an agile framework. Trello lends itself to not only web projects, but also helps businesses keep [other](https://trello.com/inspiration) internal tasks and objectives organized.

In this guide, we'll use a Trello instance with a site on Pantheon. When changes are pushed to Pantheon that reference a Trello card's unique ID, the commit message will appear in the card.

## Before You Begin
Be sure that you:

- Have a Drupal or WordPress site on Pantheon
- Install [Terminus](/terminus):

        curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install
- [Generate a Machine Token](https://dashboard.pantheon.io/machine-token/create) from **User Dashboard** > **Account** > **Machine Tokens**, then authenticate Terminus:

        terminus auth:login --machine-token=‹machine-token›
- Install the [Terminus Secrets Plugin](https://github.com/pantheon-systems/terminus-secrets-plugin):

        curl https://github.com/pantheon-systems/terminus-secrets-plugin/archive/1.x.tar.gz -L | tar -C ~/.terminus/plugins -xvz
## Create a Machine User in Trello
Start by creating a new machine user in your Trello instance. This user is referred to as a "machine user" because the account is used to automatically create comments out of commit messages on Pantheon using a PHP script.

1. If you haven't done so already, create a team. Login to your Trello instance and click <i class="fa fa-plus"></i>, found in the upper panel, then select **Create Personal Team** or **Create Business Team**, depending on your plan. Add a team name and click **Create**:

    ![Create a team](../../images/integrations/trello/new-team.png)

    If you already have a team, select it from your dashboard.

2. Under **Add Members**, select **Add by name or email**.

3. Enter a name and email address for the machine user, which acts as the intermediary between Trello and the Pantheon Site Dashboard.

  We suggest naming machine users relative to their function, in this example we name our new user `Automation User`. The email needs to be an account you have access to:

    ![Create an automation user](../../images/integrations/trello/add-member.png)

4. Login as the new "Automation User" and make sure you're a team member on the relevant board:

    ![Add a team](../../images/integrations/trello/team-board.png)

5. Copy the machine user's API key from [here](https://trello.com/app-key), then click the link to manually generate a Token:

    ![Copy developer api key](../../images/integrations/trello/developer-keys.png)

    Save your key and token, to be used in the next section.

## Securely Store User Credentials on Pantheon
Next, we need to provide Pantheon with the credentials for our new machine user. We'll securely store these values in the [private path](/private-paths/#private-path-for-files) of Pantheon's filesystem.

We use the filesystem private path in this section because we don't want to track sensitive data like passwords in the codebase with git.

1. First, let's check for existing secrets using Terminus (replace `<site>` with your site name):

        SITE=<site>
        terminus secrets:list $SITE.dev

  If no existing keys are found, execute the following to create a new `secrets.json` file and upload it to Pantheon:

        $ echo '{}' > secrets.json
        $ `terminus connection:info $SITE.dev --field=sftp_command`
        sftp> put ./files/private secrets.json
        sftp> bye
        $ rm secrets.json

  Otherwise, continue to the next step.

2. Use Terminus to store the Automation User's API key in the the private `secrets.json` file (replace `<API key>`):

        terminus secrets:set $SITE.dev trello_key '<API key>'

3. Use Terminus to store the Automation User's token in the the private `secrets.json` file (replace `<Token>`):

        terminus secrets:set $SITE.dev trello_token '<Token>'

<Alert title="Note" type="info">

When it comes to keeping production keys secure, the best solution is to use a key management service like [Lockr](/guides/lockr) to automatically encrypt and secure keys on distributed platforms such as Pantheon.

</Alert>

## Configure Quicksilver Integration
Next we'll add Pantheon's example [Quicksilver](/quicksilver) integration script for Trello to the [private path](/private-paths/#private-path-for-code) of your site's codebase. The private path within the codebase is tracked in version control and is accessible by PHP, but not the web.

1. If you haven't done so already, [clone your Pantheon site repository](/git/#clone-your-site-codebase) and navigate to the project's root directory:

        `terminus connection:info $SITE.dev --fields='Git Command' --format=string`
        cd $SITE

2. Set the connection mode to Git:

        terminus connection:set $SITE.dev git

3. Create a copy of [Pantheon's `trello_integration.php`](https://github.com/pantheon-systems/quicksilver-examples/tree/master/trello_integration) in the project's private path:

    ``` bash
    mkdir private
    mkdir private/scripts
    curl https://raw.githubusercontent.com/pantheon-systems/quicksilver-examples/master/trello_integration/trello_integration.php --output ./private/scripts/trello_integration.php
    ```

4. Create a `pantheon.yml` file if one doesn't already exist in your root directory.

5. Paste the following workflow into your `pantheon.yml` file to hook into the platform upon code being pushed to fire off the Trello integration script:

        #always include the api version
        api_version: 1

        workflows:
          sync_code:
            after:
              - type: webphp
                description: Trello Integration
                script: private/scripts/trello_integration.php

    <Alert title="Note" type="info">

    `api_version` should be set once in [`pantheon.yml`](/pantheon-yml). If you have an existing `pantheon.yml` with this line, don't add it again.

    </Alert>

6. [Commit and push](/git/#push-changes-to-pantheon) changes to the Dev environment:

        git add .
        git commit -m "Create private/scripts/trello_integration.php and configure platform hooks"
        git push origin master


## Test Trello Integration on Pantheon

1. Create a test issue in an existing or new Trello project. Copy the issue ID, which is located in the Trello card's URL:

    ![Trello card ID](../../images/integrations/trello/card-id.png)

    <Alert title="Note" type="info">

    In a separate teriminal window, run `terminus workflow:watch $SITE` to see the process unfold in real time (optional).

    </Alert>

2. Push a code change to Pantheon containing the Trello card ID in the commit message in brackets (e.g., [4K2zqr1A]). This workflow will trigger `trello_integration.php` script, which will search commits for possible issue IDs and comment in Trello when found.

        git commit -m "[4K2zqr1A]: Require wp-redis as dropin via Composer"

3. Return to the issue in Trello to see a message from our machine user:

    ![Trello card](../../images/integrations/trello/trello-card.png)

## Conclusion
In this guide, we covered a simple integration between Trello and Pantheon. There are other ways to connect your Trello with your development workflow on Pantheon if you also use an external repository such as [GitHub](http://help.trello.com/article/1065-using-the-github-power-up). This integrations work in the opposite direction, allowing you to attach pull requests, issues, and commits directly to your Trello cards, from the Trello dashboard. Using and extending integrations like these will provide clarity into work being performed by you and your team, while speeding up the development process.
