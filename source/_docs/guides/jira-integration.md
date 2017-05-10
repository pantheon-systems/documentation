---
title: Jira Integration
description: How to connect Atlassian Jira issue tracking to a Drupal or WordPress site on Pantheon.
tags: [siteintegrations]
type: guide
permalink: docs/guides/:basename/
date: 5/4/2017
contributors: scottmassey
---

Atlassian's Jira issue tracking is one of the most common applications used to manage projects for application development teams. It is part of a larger suite of tools which includes Bitbucket, a code repository, and Hipchat, a team messaging and collaboration application. Jira is extremely customizable, through manual configuration or the use of installable plugins. It allows for integration with tools in the Atlassian suite as well as other common development tools.

In this guide, we will connect a Jira instance to a site on Pantheon. When changes are pushed to Pantheon that reference a jira issue ID, the commit message will appear in the Jira issue's activity log.


## What You’ll Need

- A Jira Instance.

- A Drupal or Wordpress site on Pantheon.

- Optional: [Terminus](https://pantheon.io/docs/terminus) installed locally.

## Create a Jira Service Account

1. For security and isolation, on the Jira user administration dashboard, create a user with standard permissions.

![Service account creation](/source/docs/assets/images/integrations/jira/service_account.png)

## Create a private folder for this accounts credentials.

1. From your local terminal, use the following php command to create a JSON file, substituting the below values with your Jira url and the service account's Jira username and password.
```
  $> php -r "print json_encode(['jira_url'=>'https://myjira.atlassian.net','jira_user'=>'serviceaccount','jira_pass'=>'secret']);" > secrets.json
```
 
2. In your Pantheon **files** directory, create a directory called private, if it doesn't exist already. This exact naming convention ensures its contents are not web-accessible. FTP this JSON file to the files/private directory. Repeat this process for all of the sites environments. Each environment should look similar to this:

![Secrets folder](/source/docs/assets/images/integrations/jira/secrets.png)

This upload can also be done quickly with [Terminus](https://pantheon.io/docs/terminus) if it is installed and SFTP commands:

```
$> `terminus site connection-info --env=dev --site=your-site --field=sftp_command`
      Connected to appserver.dev.000000-0000-0000-0000-000000000.drush.in.
  sftp> cd files
  sftp> mkdir private
  sftp> cd private
  sftp> put secrets.json
 ```

## Configure Quicksilver Integration
 
1. Clone Pantheon's [Quicksilver Example Repo](https://github.com/pantheon-systems/quicksilver-examples)to your local computer.

```
git clone https://github.com/pantheon-systems/quicksilver-examples.git quicksilver-examples

```

2. Locate your local copy of your Pantheon site's repository, or clone it if you haven't already.

```
git clone git clone ssh://codeserver.dev.000000-0000-0000-0000-000000000@codeserver.dev.000000-0000-0000-0000-000000000.drush.in:2222/~/repository.git astro-mktg
```

3. From the root directory of your local copy (at the same level as index.php), create a directory named "private" and copy jira_integration.php script to it.

```
$ mkdir private
$ cd private
$ cp /path/to/your/quicksilver-examples/jira_integration/jira_integration.php .
$ ls
jira_integration.php
```


4. Add the example jira_integration.php script to the private directory of your code repository.

5. Add a Quicksilver operation to your pantheon.yml to fire the script after a deploy.
   
```
#always include the api version
api_version: 1

workflows:
  sync_code:
    after:
      - type: webphp
        description: Jira Integration
        script: private/jira_integration.php
```
## Test

Now if you push code with a commit message containing a Jira issue ID, the jira_integration.php script will parse the commits, searching within the commit message for an alphabetical string and a numeric string, separated by a hyphen ("WEB-123"), and attempt to post it to the relevant ticket. You can also reference multiple commits and it will link to them:

```
git commit -m "WEB-113: This commit also fixes WEB-294 and INF-3"
```

When testing, use the **terminus workflows:watch** command with the Pantheon site ID to see the integration in real time:

```
$ git commit -am "WEB-13: adding CSS changes, also closes WEB-6 and WEB-5"
$ terminus workflow:watch 00000000-0000-0000-0000-000000000000

 [notice] Started ed033e5a-3526-11e7-a3b7-bc764e105ecb Sync code on "dev" (dev) at 2017-05-10 02:18:16
 [notice] Finished workflow ed033e5a-3526-11e7-a3b7-bc764e105ecb Sync code on "dev" (dev) at 2017-05-10 02:18:38
 [notice] ------ Operation: Jira Integration finished in 5s (dev) ------

==== Posting to Jira ====
RESULT: {"self":"https://myjira.atlassian.net/rest/api/2/issue/10012/comment/10101","id":"10101","author":{"self":"https://myjira.atlassian.net/rest/api/2/user?username=circle","name":"circle","key":"circle","emailAddress":"circle@myagency.com","avatarUrls":{"48x48":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=48","24x24":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=24","16x16":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=16","32x32":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=32"},"displayName":"Pantheon Automation","active":true,"timeZone":"Asia/Tokyo"},"body":"{panel:title=Commit: 6e7425d3b5 [dev]|borderStyle=dashed|borderColor=#ccc|titleBGColor=#e5f2ff|bgColor=#f2f2f2}\n    WEB-13: adding CSS changes, also closes WEB-6 and WEB-5\n    ~Author: Scott Massey <scott.massey@myagency.com> - Date:   Wed May 10 11:18:01 2017 +0900~\n    {panel}","updateAuthor":{"self":"https://myjira.atlassian.net/rest/api/2/user?username=circle","name":"circle","key":"circle","emailAddress":"circle@myagency.com","avatarUrls":{"48x48":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=48","24x24":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=24","16x16":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=16","32x32":"https://secure.gravatar.com/avatar/bacfe00bab4fbbd429a38bf280bff147?d=mm&s=32"},"displayName":"Pantheon Automation","active":true,"timeZone":"Asia/Tokyo"},"created":"2017-05-10T11:18:36.269+0900","updated":"2017-05-10T11:18:36.269+0900"}
===== Post Complete! =====
```

When we return to Jira, we can see the commit message in the activity tab of the issue:

![Jira issue](/source/docs/assets/images/integrations/jira/jira_log.png)

## Conclusion
In this guide, we covered a simple integration between Jira and Pantheon. There are other ways to connect your Jira with your development workflow on Pantheon if you also use and external repository such as Atlassians's [Bitbucket](https://confluence.atlassian.com/adminjiracloud/getting-started-with-bitbucket-and-jira-cloud-776830280.html) or [GitHub](https://confluence.atlassian.com/adminjiracloud/connect-jira-cloud-to-github-814188429.html). These integrations will provide better insight and clarity into work being performed, while saving time by automating communication within your team.