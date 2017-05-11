---
title: Continuous Integration with Jenkins
description: How to create and configure a Pingdom Uptime check on a Pantheon site.
tags: [siteintegrations]
type: guide
permalink: docs/:basename/
draft: true
date: 5/14/2017

---

## Continuous Integration with Jenkins

Jenkins is an open source Continuous Integration server which can be used to build, test, and deploy application changes for Drupal and WordPress websites on Pantheon. Jenkins is to execute a predefined list of steps. The trigger for this execution can be time or event based. For example, every 20 minutes or after a new commit in a Git repository.

## What you will build

This guide will cover how to install and configure an externally hosted Jenkins server to work with sites on the Pantheon platform. We will configure Jenkins to test our code changes and let us know if changes have passed and are ready to deploy.

## What you’ll need

- Root access to a server. This server in this guide is running Ubuntu 16 x64.
- A Drupal or Wordpress website on Pantheon.

## Step 1: Install Jenkins

1.  As a root user, log into your remote server and add the Jenkins key and sources, to download the application.

```
wget -q -O - http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key | apt-key add -
echo deb http://pkg.jenkins-ci.org/debian binary/ > /etc/apt/sources.list.d/jenkins.list
apt-get update
```

2. Then you can download the application:

```
apt-get install jenkins
```

3. After install, you should be able to load the application on your remote server, either on port 8080 of the server's IP address or if you can assign it a domain name, e.g. ci.yoursite.com:8080

4. You can select the "Install standard plugins" option to complete the install. Create an administrative user. 	
GitHub Authentication plugin
terminus auth:login --machine-token=aWGN_CMQtd1JP4BMBcaI2UpIO5SnWBttZc0t6G39UGlgi

5. Enable security by navigating to Manage Jenkins (a), then Security (b).

6. Authorization make sure Anonymous can View on the Read column.

7. Add a service permission that can do everything
 
8. then create a user who has that permission

9. Install git plugin?
https://wiki.jenkins-ci.org/display/JENKINS/Git+Plugin
https://wiki.jenkins-ci.org/display/JENKINS/Github+Plugin
Jenkins supports the Git version control system via a plugin. Select the Manage Jenkins ▸ Manager Plugins link. Here you have to install the Git Plugin. It may be installed already.

To clone a Git repostory via Jenkins you need to enter the email and user name for your Jenkins system. For this switch into your job directory and run the git config command.

# Need to configure the Git email and user for the Jenkins job

# switch to the job directory
cd /var/lib/jenkins/jobs/Android/workspace

# setup name and email
sudo git config user.name "jenkins"
sudo git config user.email "test@gmail.com"

Then check "enable security"


Set Jenkins's to use user database and enable sign ups.

Create a new user


Next, go back to admin, check Matrix-based security, disable signups;


Make sure Anonymous only has the Read right under the View group (Jenkins crashes when it doesn't have that set) and add your user with admin rights. Save and log in as that user.

//https://gist.github.com/gmhawash/4043232


Click save at the bottom of the page. After the page load, you'll see a login form, ignore that, go to ci.company.net:8080 again instead. You'll see this sign up form:



## Step 2: Add job to pantheon.yml

```
api_version: 1

workflows:
  deploy:
    after:
        - type: webphp
          description: Integrate With Jenkins
          script: private/scripts/jenkins_integration.php
```

1.  The left navigation menu contains the different types of monitoring checks, reports, and a few other features. From the [main user dashboard](https://my.pingdom.com/dashboard) or from the left navigation Monitoring > Uptime sub-menu, select “Add Uptime Check.”

![My.pingdom.com dashboard](/source/docs/assets/images/integrations/dashboard.png)

In the modal that opens, add this information where indicated:

- **Name of Check:** An easily recognizable name for the check, e.g. “mysite.com Home Page.”
- **Check Interval:** How often Pingdom will check the site. While one minute is the minimum and acceptable to use, often a check every 5 minutes or more is adequate, and will allow for brief network throughput issues. Remember, these checks also will appear in web access logs, so too many checks may make it harder to debug other issues.
- **Check Type:** You can monitor several different things with Pingdom: email services, network components such as DNS or specific ports, or a website. Choose “Web.”
- **URL/IP:** On the “Required” tab, enter the URL for the website. If your site is using HTTPS, select that dropdown option. You can optionally add user credentials and expected response text. This is very useful if you are using Varnish to cache a site; you can create a simple PHP script which queries the database and returns a specific value to determine if the site is functioning as expected.
- **Test From:** Select the region. We suggest you select the region where the majority of the site's users are located.
- **Alerting Settings:** You can create teams, or assign alerts directly to users. It's better to create teams within Pingdom, rather than a forwarding email address (e.g. monitoring@mysite.com), as each user can set up their own alerting preferences. For now, select yourself.
- **When down, alert after:** 1-5 minutes, depending on the risk of false positives. If you are aware your site is having performance issues, it isn’t helpful to be reminded constantly, so sometimes a longer time period before being alerted ensures you are only notified of a severe failure.
- **Resend alert every:** Never, 1 or 2 down cycles is adequate. It’s assumed that you will be working on the issue, so you don’t need to be alerted to an issue you are currently handling. It becomes noise during a potentially stressful time.
- **Alert when back up.** Leave this checked. You may not be the one responding to the issue, but you probably want to know when it’s back up. Sometimes intermittent issues result in a site going up and down within a few minute period.

When you are done, you will see a new check in the dashboard.

![Pingdom.com uptime check](/source/docs/assets/images/integrations/complete_check.png)

## Step 3: Checking your Check
Let the check run a while (a few hours), then you can access reports for each site in either the left navigation menu or the individual check dropdown menu.

![Pingdom reports](/source/docs/assets/images/integrations/reporting_options.png)

Let’s look at a site that is having some trouble to see how Pingdom can help.

![Downtime modal](/source/docs/assets/images/integrations/downtime_modal.png)

- Item 1 tells us when the issue started occurring, which we can attempt to correlate to any recent changes or external events.
- Item 2 provides the site's response to the check and Pingdom’s attempt to determine the root cause of the downtime. In this case, we see that the site returned a 200, which is a successful response, but took so long that Pingdom considered it a timeout.

![Root cause analysis](/source/docs/assets/images/integrations/root_cause.png)

This could point to a scaling, performance, or something simple, like lack of caching. Sometimes a server error will be returned, which can be connected to a PHP or permissions error.

The Test Log Results will also display which regions encountered downtime. Sometimes the root cause of downtime is not related to site performance, as when a regional DNS server encounters issues. This report is helpful determining an incident when a certain region of users encounter downtime while others do not.

![Test log results](/source/docs/assets/images/integrations/test_result.png)

## Step 4: Customize Alerts

Before finishing, each user should customize how they receive alerts. Here I added my mobile telephone number, so I also get text alerts as well as email notifications.

![User configuration page](/source/docs/assets/images/integrations/user_config.png)


## Conclusion
Pingdom has a few more checks and features we did not cover. Depending on plan it provides a site status page, multi-tier alerting schedules, and API access for custom integration.

When a site is having issues, Pingdom lets the right people know quickly and provides good data to help find solutions. It's a good practice to use services like Pingdom on all high-value sites.