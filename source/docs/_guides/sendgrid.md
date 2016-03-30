---
title: Using SendGrid To Deliver Email with WordPress and Drupal
description: Detailed information on using SendGrid to deliver email through your WordPress and Drupal site.
categories: [sites]
tags: [code]
contributors:
  - erikmathy
  - rvtraveller
date: 9/8/2015
---
Email is a necessity when running a website, whether it’s used with a simple contact form or to manage subscription based services, odds are you’re going to need it. Users may want to receive notices of content updates, have sales receipts sent to them, update their password or membership information, and more. Email is the most effective way of communicating with a site's user base, but it does no good if these messages are filtered and marked as spam.

One of the most common reasons that email gets blocked is because it originates from a website hosted by a third party service, like Pantheon. In order to ensure this doesn't happen to you, we at Pantheon highly encourage using your own email server or a service provider such as SendGrid.

## Why SendGrid?

[SendGrid](https://sendgrid.com) has a lot of things going for it, all of which do the hard work for you when it comes to how mail is managed on your site. It can handle massive email campaigns while providing highly detailed and flexible reporting, along with the ability to scale and increase deliverability.

## Create a SendGrid Account

Get started by [signing up](https://sendgrid.com/partners/pantheon) for an account and selecting a plan that meets your business needs. After receiving your confirmation email, sign in to your [SendGrid account](https://sendgrid.com/login). From within the Settings menu, click **Credentials**.

![SendGrid Multiple User setup](/source/docs/assets/images/sendgrid-multiple-users.png)

This is where you can create site specific credentials so that sites have their own unique access to your SendGrid features and mail. Once you have created your site's credentials, and allowed the desired access (UI/API and Mail), go to the applicable section below for the CMS your site is running.

## WordPress

### Download the WordPress SendGrid Plugin

The official [SendGrid Plugin](https://wordpress.org/plugins/sendgrid-email-delivery-simplified/) replaces the wp_mail function with API integration, making it a breeze to configure and get started.
Install and activate the latest release through the WordPress dashboard or place it in the `code/wp-content/plugins` directory and activate via the dashboard.

### Add Your SendGrid Account Details
Once you have installed and activated the plugin, click on the SendGrid menu item in the Settings tab on the site’s Dashboard. You will be able to select between sending mail via the SendGrid Web API or SMTP. We strongly recommend configuring the plugin to send mail through SendGrid's API. SMTP requests are associated with dynamic outgoing IP addresses on Pantheon, which can have a negative impact on deliverability.

Simply enter your site's SendGrid account credentials and select the desired the protocol for sending mail. Next, enter the sending email address and provide a reply email address if you prefer replies to go to another address (optional).  SendGrid supports categories so you can track email analytics and organize message types. Include any categories you would like to use, separated by commas.


![WP Settings example](/source/docs/assets/images/sendgrid_wpconfig.png)​

Your WordPress application is now set up to send email through SendGrid! Complete the fields in the SendGrid Test section of the Settings page and watch the magic work its way to your inbox. For guidance on checking deliverability in SendGrid, see [Checking Deliverability in SendGrid](#deliverability).

## Drupal

### Download the Drupal SendGrid Integration module

Pantheon recommends using the actively maintained [SendGrid Integration module](https://www.drupal.org/project/sendgrid_integration) to send email with Drupal.

Download and enable the latest recommended release in the `code/sites/all/modules` directory. You can push it with Git, use the SFTP account in your Pantheon dashboard, or even use [Drush](https://pantheon.io/blog/five-steps-feeling-drupal-drush). The following commands can be used to download and enable the module if you have Drush configured locally:
```nohighlight
drush @pantheon.your-site.dev dl sendgrid_integration
drush @pantheon.your-site.dev en sendgrid_integration -y
```

At this time, this module is only available for Drupal 7 sites. Follow [this issue](https://www.drupal.org/node/2676416) for details on Drupal 8 development.
### Add Your SendGrid Account Details

Log into Drupal in your Pantheon Dev environment. From the menu at the top of the screen, select **Configuration**, and go to SendGrid Settings in the System section.

![Settings example](source/docs/assets/images/sendgrid_integration.png)​  

Add your SendGrid credentials. After you save the configuration, your Drupal application on Pantheon is now set up to send email through SendGrid's API.

## <a name="deliverability"></a>Checking Deliverability in SendGrid
For testing purposes, your first few deliveries should be to email addresses that you control directly. You can track and measure unique aspects of mail behaviors from within your site's SendGrid account, which should be monitored regularly.

First, log into [SendGrid](https://sendgrid.com/login) and select **Activity**. You will be taken to a page with a form to search by email. Enter the email address, and press **Enter**. SendGrid will search through your mail queue for any messages sent to that address. For additional search parameters, select the filters near the top right corner.

![SendGrid email search options](/source/docs/assets/images/sendgrid-search-options.png)​

You can explore the Statistics and Email Reports from within your site's account to gain insight into email activity, statistics on email clients, and much more.


## Congratulations!

You have now successfully integrated an industrial strength, simple to use, email delivery service into your website. If you have any questions, contact [SendGrid's support team](https://support.sendgrid.com/hc/en-us) or check out SendGrid’s [Email Infrastructure Guide](http://resources.sendgrid.com/email-infrastructure-guide/) for advanced tips on how to create and publish DNS records for increased deliverability.
