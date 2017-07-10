---
title: Integrate Pivotal Tracker Project Management Application with a site on Pantheon
description: Using Pivotal Tracker to track application development progress, using Quicksilver webhooks.
tags: [siteintegrations]
type: guide
permalink: docs/guides/:basename/
date: 6/20/2017
---

Pivotal's project management application, [Pivotal Tracker](https://www.pivotaltracker.com) is a simple but powerful tool designed for agile teams which may need to balance several projects at once, but need short term clarity into work-in-progress. It provides rich reporting and velocity estimation, and is very easy to get started with, as well as offering considerable customization. 

In this guide, we'll connect a Pivotal Tracker project to a site on Pantheon. When changes are pushed to Pantheon that reference the Tracker issue, the commit message will appear in the issue's activity log. Additionally, we can change story status, allowing us to complete stories with our commit messages.

## Before You Begin

Be sure to:

- Have an active pivotal tracker account
- Have a Drupal or WordPress site on Pantheon, with a local clone of the repository.
- Locally install [Terminus](/docs/terminus):

        curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install
        
- Install the [Terminus Secrets Plugin](https://github.com/pantheon-systems/terminus-secrets-plugin):

        curl https://github.com/pantheon-systems/terminus-secrets-plugin/archive/1.x.tar.gz -L | tar -C ~/.terminus/plugins -xvz


## Create a Machine User in Pivotal Tracker
As a best practice, start by creating a new machine user in Tracker. This user is referred to as a "machine user" because the account is used to automatically parse commit messages on Pantheon using a PHP script and send them to Pivotal Tracker.

1. Login to your Tracker instance and click on your username in the top right dropdown. Then select **Accounts**, **Manage Account**, **Account Members**. Click **Add Member**:

    ![Create an automation user](/source/docs/assets/images/integrations/pivotal-tracker/new-user.png)

3. Enter a name and email address for the machine user, then add them to an existing project. Then click **Create users**.

  We suggest naming machine users relative to their function, in this example we name our new user `Automation User`. Add this account to an existing project if you have one. The email needs to be an account you have access to:

   ![Add member](/source/docs/assets/images/integrations/pivotal-tracker/add-member.png)

4. On the user's profile page, save the API token for the next steps.

   ![Get token](/source/docs/assets/images/integrations/pivotal-tracker/api-token.png)


## Prepare your site: Securely Store User Credentials on Pantheon
Next, we need to provide Pantheon with the credentials for our new machine user. We'll securely store these values in the [private path](/docs/private-paths/#private-path-for-files) of Pantheon's filesystem.

We use the filesystem private path in this section because we don't want to track sensitive data like passwords in the codebase with git.

In the commands below, replace `<site>` with your site name, `<example>` with your Pivotal Tracker project name, `<user>` with your machine account username in Jira, and `<password>` with its password.

1. First, let's check for existing secrets using Terminus:

        SITE=<site>
        terminus secrets:list $SITE.dev

  If no existing keys are found, run the following to create a new `secrets.json` file and upload it to Pantheon:

        echo '{}' > secrets.json
        `terminus connection:info $SITE.dev --field=sftp_command`
  If the `files/private` directory doesn't exist, create it:
        
        mkdir files/private
        
  Put the secrets file into the `private` directory:
  
        sftp> cd files/private
        sftp> put secrets.json
        sftp> bye
        rm secrets.json

  Otherwise, continue to the next step.

2. Use Terminus to write your Pivotal Tracker URL value in the private `secrets.json` file:

        terminus secrets:set $SITE.dev tracker_token <token value>
        terminus secrets:list $SITE.dev //verify

## Configure Quicksilver Hook
 
 1. Clone the [Quicksilver Examples](https://github.com/pantheon-systems/quicksilver-examples) repo to a separate directory, and copy the example `pivotal_integration.php` script to a directory named `private` in the sites docroot. Note: this is not the same `private` directory as the aforementioned files/private directory.
 
 ```bash
ls
README.md		readme.html
 ...
wp-comments-post.php	wp-includes		wp-settings.php

mkdir private
cd private/
cp ~/Websites/Pantheon/quicksilver/pivotal-tracker/pivotal_integration.php .
ls
pivotal_integration.php
 ```

 2. Add a Quicksilver operation to your `pantheon.yml` to fire the script after a deploy, as shown here:

```yaml
api_version: 1

workflows:
  sync_code:
    after:
      - type: webphp
        description: Pivotal Integration
        script: private/pivotal_integration.php
```

3. Commit this file to your local repo and push to the Pantheon dev environment. You should see confirmation from the platform that the `pantheon.yml` file was changed:
 
 ```
 remote: PANTHEON NOTICE:
 remote:
 remote: Changes to `pantheon.yml` detected.
 remote:
 remote: Successfully applied `pantheon.yml` to the 'dev' environment.
 ```


## Test

1. Push code with a commit message containing a Pivotal story ID in square brackets.

```
  git commit -m "[#148392061] Testing Pivotal Tracker Integration"
```

You should see the change appear in the Activity log of the story:

 ![successful commit in Pivotal Tracker](/source/docs/assets/images/integrations/pivotal-tracker/commit-story.png)

The Pivotal Tracker API will also change story status by including "fixed", "completed", or "finished" within the square brackets, in addition to the story ID. You may use different cases or forms of these verbs, such as "Fix" or "FIXES", and they may appear before or after the story ID. In Pivotal vernacular, for features, one of these keywords will put the story in the finished state. For chores, it will put the story in the accepted state. The square brackets can appear anywhere in the commit message. Examples:

```shell
  [Completed #148528125] adding requested feature.
  I finally [finished #148528125] this functionality.
  This commit [fixes #148528125]
```

If code is automatically tested and deployed when pushed to the origin repository in your organization, use the keyword "delivers" and feature stories will be put in the "delivered" state, rather than "completed." 

```
  [Delivers #148528125] Small bug fix.
```

Optionally, you may want to use the `terminus workflows watch` command to get immediate debugging feedback.

## Conclusion
In this guide, we covered a simple but time-saving integration between [Pivotal Tracker](https://www.pivotaltracker.com) and Pantheon. There are similar ways to integrate other project management applications using [Quicksilver hooks](https://github.com/pantheon-systems/quicksilver-examples). Additionally, you can use continuous integration tools such as [CircleCI](https://pantheon.io/docs/guides/github-pull-requests/) if you use an external repository such as GitHub. Using these integrations will give clarity into work being performed across your team, while saving time by automating your development workflow.
