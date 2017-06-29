---
title: Integrate PagerDuty on Pantheon
description: Learn how to integrate PagerDuty, Slack and New Relic paging service with the Pantheon Platform.
tags: [siteintegrations]
type: guide
permalink: docs/guides/:basename/
date: 6/25/2017
contributors: scottmassey

---

Pantheon runs thousands of checks on every site's infrastructure. However, there may be issues related to an application that result in degraded performance and your development team should be alerted to as soon as possible. If you are managing a high profile site, using PagerDuty is an excellent way to ensure your team is immediately aware of changes in a site's status. 

PagerDuty is a service which allows site owners, agency team members, or other stakeholders to manage on-call scheduling and create response processes for incidents with custom alerting workflows. It allows teams to easily manage escalation policies across multiple timezones, and makes alert notifications a manageable, scalable process. 

In this guide, we will add three members of our team to PagerDuty and configure their alerts. We will then integrate New Relic alerting for a site on Pantheon. Finally, we will connect PagerDuty to our Slack messaging application, allowing our whole team to be notified when incidents occur.

## Before You Begin
Be sure that you:

- Have a Drupal or WordPress site on Pantheon
- A [PagerDuty account](https://signup.pagerduty.com/accounts/new)
- (Optional) A Slack account


## Add users

On your team's PagerDuty administration page, from the **Configuration** menu, click on **Users**. Here you will add your team members. When you sign up for an account, it will automatically create a user for you. Start with this user, and then add two more team members.

First, will add our contact information. Set your time zone, add a phone number, then add an email address:

![New User](/source/docs/assets/images/integrations/pg-user-contact.png)

Next, click on the **Notification Rules** tab and setup your notification rules. The default is alerting everything at once. Click the edit (<span class="glyphicons glyphicons-edit"></span>) buttons to adjust the rules to your preference. In the example below, we changed settings to send an immediate email and text, followed by a phone call 15 minutes later. If the alert is acknowledged, resolved, or reassigned within 15 minutes, PagerDuty will not call the agent. 

There is also a handy setting which alerts a user when they are about to go on call. We kept the default setting, which sends an email 24 hours before the user's on-call shift starts:

![User contact information](/source/docs/assets/images/integrations/pg-user-notifications.png)


Now add our other users by clicking the green **Add Users** button at the top right of the admin page. Users can have different roles, allowing them, for example, to administrate schedules or alert policies. For these team members, we assign the role of **Responder**. Each member then can set up their own alert policies, or you can for them.

![Adding new user](/source/docs/assets/images/integrations/pagerduty/new_user.png)

## Create Schedule

Now create an on-call Schedule, which will manage who receives alerts. From **Configuration** select **Schedules**, then the **+ Add Schedules** button. Note that schedules have **Layers**, which allow for different people or teams to provide additional backup. If the lowest layer agent does not respond to an alert, it will rollover to the next layer. It's a good idea to have one or more layers of fallbacks.

Because I want to be the "backstop" for alerts, I will insert myself in the first layer, by clicking the **Add a user** dropdown and selecting my name. Since I am the only person in this layer, I am on this schedule all the time.

Next I will click **Add another layer** and add my two other teammates. This will create a weekly rotation, and in the **Step 2** area, I can change that to Monthly or create a custom rotation. In **Step 3** I can determine when the first handoff occurs. Add your users accordingly.

![Team schedule](/source/docs/assets/images/integrations/pagerduty/schedule.png)

At the top of the page, name this schedule **Default**, then click **<span class="glyphicons glyphicons-check"></span>Create Schedule** to complete the schedule. At the bottom of the page, you can see the **Final Schedule** which indicates who is currently the first point of contact.

![Final Schedule](/source/docs/assets/images/integrations/pagerduty/final_schedule.png)

## Create Escalation policy

When an incident is created, PagerDuty uses an escalation policy to determine who to contact. An escalation policy can alert PagerDuty users directly, as well as alerting teams and schedules. Since you just created a schedule for your users, this is what your simple policy will alert. 

A default escalation policy should exist. Under **Configuration**, click on **Escalation Policies**, then click on your **Default** policy. Click the **Edit Escalation Policy** button at the top right, and add the **Default** schedule we created. Click **Save** to complete this simple Escalation policy:

![Escalation Policy](/source/docs/assets/images/integrations/pagerduty/escalation.png)

## Add Services

Now we'll add a **Service**, which is any application, component, or team you wish to open incidents against.

### PagerDuty

In this case we want New Relic to alert us when a critical event occurs.

1. Log into your Pantheon site and [enable New Relic](/docs/new-relic/#activate-new-relic-apm-pro) if it isn't already running. Then click the **<span class="glyphicons glyphicons-check"></span> Go to New Relic** button.

2. Go to **Alerts**, then select **Channels and groups** and click **PagerDuty** to create a new PagerDuty channel. The application will ask for permission to access PagerDuty. Enter your PagerDuty username and password. 

    ![NR Authorization](/source/docs/assets/images/integrations/pagerduty/authorize.png)

3. You will be prompted to give the service a name and select the escalation policy. Enter **New Relic** for the name and select **default** for the policy.

4. Then you will be redirected back to your New Relic administration page. Select **First critical event**, which will alert us when an incident first occurs. Often websites may go up and down intermittently in a short period, so we just want to get one notification for each incident. Save your settings.

### Slack

1. For this two-way integration, you will use PagerDuty extensions. In the PagerDuty navigation, go to **Configuration** and select **Extensions**. Then select **New Extension**

    ![Add slack extension](/source/docs/assets/images/integrations/pagerduty/extensions.png)

2. For the new service, use the following configuration:
 - Select **Slack** as extension type
 - Enter "Slack" as the name of the extension
 - Select **New Relic** as the service
 - Select Actions available to **any Slack user**
 - Check all 3 options: Resolves, Acknowledgements, Assignment Changes

3. Click Authorize. 

    ![Completed slack extension](/source/docs/assets/images/integrations/pagerduty/slack_extension.png)

4. Select the channel to which you’d like PagerDuty to send messages and then Authorize the integration. Choose a channel that is actively used.

    ![CSlack authorization](/source/docs/assets/images/integrations/pagerduty/authorize_slack.png)

5. Now return to the PagerDuty **Configuration** menu and select **Services**. Here, you can manually trigger an incident by selecting the gear icon and choosing **New Incident**.

You will see a notification in Slack that an incident has been triggered, and the first point of contact in the escalation will receive a notification according to their settings. You can resolve the issue via Slack or the PagerDuty dashboard.

![CSlack authorization](/source/docs/assets/images/integrations/pagerduty/slack_notification.png)

![CSlack authorization](/source/docs/assets/images/integrations/pagerduty/email_notification.png)

## Conclusion
There are many other ways to enhance the integration we created. See PagerDuty documentation about phone and helpdesk integration, post-mortem reporting, and also be sure to download their mobile application.

