---
title: Jira Integration
description: How to connect Atlassian Jira issue tracking to a Drupal or WordPress site on Pantheon.
tags: [siteintegrations]
type: guide
permalink: docs/guides/:basename/
date: 5/4/2017
contributors: scottmassey
---

Atlassian's [Jira](https://www.atlassian.com/software/jira) issue tracking is one of the most common applications used to manage projects for application development teams. It is part of a larger suite of tools which includes [Bitbucket](https://bitbucket.org/), a code repository, and [HipChat](https://www.hipchat.com/), a team messaging and collaboration application. Jira is extremely customizable, through manual configuration or the use of installable plugins. It allows for integration with tools in the Atlassian suite as well as other common development tools.

In this guide, we'll connect a Jira instance to a site on Pantheon. When changes are pushed to Pantheon that reference a Jira issue ID, the commit message will appear in the Jira issue's activity log.


## What You’ll Need

- A [Jira Instance](https://www.atlassian.com/software/jira/try).

- A Drupal or WordPress site on Pantheon.

- **Optional**: [Terminus](/docs/terminus) installed locally.

## Create a Jira Service Account

1. When you first create a Jira account, you'll need to create a new project:

    ![Create a new project](/source/docs/assets/images/integrations/jira-new-project.png)

    Jira will offer a variety of project templates. Choose the one that best fits your project's needs.

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p markdown="1">The process of creating users and assigning roles may differ depending on your project type. If the steps below don't match what you see, refer to Atlassian's [User management documentation](https://confluence.atlassian.com/adminjiraserver073/user-management-861253163.html).</p>
    </div>

2. Click on <i class="fa fa-gear"></i> in the upper panel to go to **User management** under **SITE ADMINISTRATION**. Under **Create new users**, create an "automation" user. This user will act as the intermediary between Jira and your site. We do this for security and isolation: 

    ![Create an automation user](/source/docs/assets/images/integrations/jira-new-user.png)

    Use the email sent to your automation user's address to set the user password.

## Create a Private Folder for Account Credentials.

1. From your local terminal, use the following PHP command to create a JSON file. Substitute the values for `jira_url` and `jira_pass`  with your Jira URL and the service account's Jira username and password.

        php -r "print json_encode(['jira_url'=>'https://myjira.atlassian.net','jira_user'=>'automator','jira_pass'=>'secret']);" > secrets.json
 
2. In your Pantheon **files** directory, create a directory called private, if it doesn't exist already. This exact naming convention ensures its contents are not web-accessible. Using SFTP, copy this JSON file to the files/private directory. Repeat this process for any multidev environments.

    This upload can also be done quickly with [Terminus](https://pantheon.io/docs/terminus) (if installed) and SFTP commands:


        `terminus connection:info site.dev --field=sftp_command`
        Connected to appserver.dev.00000000-0000-0000-0000-000000000000.drush.in.
        sftp> cd files
        sftp> mkdir private
        sftp> cd private
        sftp> put secrets.json

    Note the backticks (`) around the Terminus command.

    You can also use the [Terminus Secrets Plugin](https://github.com/pantheon-systems/terminus-secrets-plugin) to manage this directory.

## Configure Quicksilver Integration
 
1. Clone Pantheon's [Quicksilver Example Repo](https://github.com/pantheon-systems/quicksilver-examples)to your local computer.


        git clone https://github.com/pantheon-systems/quicksilver-examples.git quicksilver-examples

    The following steps assume you cloned this repository to your home directory (`~/`). Adjust the paths in the following commands to match your directory path.

2. Locate your local copy of your Pantheon site's repository, or clone it if you haven't already. See our [Starting with Git](/docs/git/) guide for more information.


3. From the root directory of your local copy (at the same level as `index.php`), create a directory named "private" and copy `jira_integration.php` script to it.

    ``` bash
    mkdir private
    cd private
    cp ~/quicksilver-examples/jira_integration/jira_integration.php .
    ls
    jira_integration.php
    ```

4. Create a `pantheon.yml` file if one doesn't already exist in your root directory.

5. Add a Quicksilver operation to the `pantheon.yml` to fire the script after a code push.
   

        #always include the api version
        api_version: 1

        workflows:
          sync_code:
            after:
              - type: webphp
                description: Jira Integration
                script: private/jira_integration.php


    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p markdown="1">The `api_version` should always be set in `pantheon.yml`, but isn't part of this code snippet. If you have an existing `pantheon.yml` file with this line, don't add it again.</p>
    </div>

6. [Commit and push](/docs/git/#push-changes-to-pantheon) your changes to all environments.

## Test a Code Push

1. Create a test issue in your new Jira project, and take note of the issue ID. 

2. Push code with a commit message containing that Jira issue ID. The `jira_integration.php` script will parse the commits, searching within the commit message for an alphabetical string and a numeric string, separated by a hyphen ("WEB-123"), and attempt to post it to the relevant ticket. 

    You can also reference multiple commits and it will link to them:

        git commit -m "WEB-113: This commit also fixes WEB-29 and WEB-3"

    When testing, you can use the `terminus workflows:watch` command with the Pantheon site ID to see the integration in real time:

        git commit -am "WEB-13: adding CSS changes, also closes WEB-6 and WEB-5"
        terminus workflow:watch 00000000-0000-0000-0000-000000000000

        [notice] Started ed033e5a-3526-11e7-a3b7-bc764e105ecb Sync code on "dev" (dev) at 2017-05-10 02:18:16
        [notice] Finished workflow ed033e5a-3526-11e7-a3b7-bc764e105ecb Sync code on "dev" (dev) at 2017-05-10 02:18:38
        [notice] ------ Operation: Jira Integration finished in 5s (dev) ------

        ==== Posting to Jira ====
        RESULT: {"self":"https://myjira.atlassian.net/rest/api/2/issue/10012/comment/10101","id":"10101","author":{"self":"https://myjira.atlassian.net/rest/api/2/user?username=circle","name":"circle","key":"circle","emailAddress":"circle@myagency.com","avatarUrls":{"48x48":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=48","24x24":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=24","16x16":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=16","32x32":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=32"},"displayName":"Pantheon Automation","active":true,"timeZone":"Asia/Tokyo"},"body":"{panel:title=Commit: 6e7425d3b5 [dev]|borderStyle=dashed|borderColor=#ccc|titleBGColor=#e5f2ff|bgColor=#f2f2f2}\n    WEB-13: adding CSS changes, also closes WEB-6 and WEB-5\n    ~Author: Scott Massey <scott.massey@myagency.com> - Date:   Wed May 10 11:18:01 2017 +0900~\n    {panel}","updateAuthor":{"self":"https://myjira.atlassian.net/rest/api/2/user?username=circle","name":"circle","key":"circle","emailAddress":"circle@myagency.com","avatarUrls":{"48x48":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=48","24x24":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=24","16x16":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=16","32x32":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=32"},"displayName":"Pantheon Automation","active":true,"timeZone":"Asia/Tokyo"},"created":"2017-05-10T11:18:36.269+0900","updated":"2017-05-10T11:18:36.269+0900"}
        ===== Post Complete! =====

3. When we return to Jira, we can see the commit message in the activity tab of the issue:

    ![Jira issue](/source/docs/assets/images/integrations/jira/jira_log.png)

## Conclusion
In this guide, we covered a simple integration between Jira and Pantheon. There are other ways to connect your Jira with your development workflow on Pantheon if you also use and external repository such as Atlassian's [Bitbucket](https://confluence.atlassian.com/adminjiracloud/getting-started-with-bitbucket-and-jira-cloud-776830280.html) or [GitHub](https://confluence.atlassian.com/adminjiracloud/connect-jira-cloud-to-github-814188429.html). These integrations will provide better insight and clarity into work being performed, while saving time by automating communication within your team.
