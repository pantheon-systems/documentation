---
title: Using SendGrid To Deliver Email with WordPress and Drupal
type: guide
permalink: docs/guides/:basename/
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
1. After you have installed and activated the plugin, go to your site's Dashboard and select **Settings**, then click the SendGrid menu item.
2. Although you can select the SendGrid Web API or SMTP to send mail, we strongly recommend configuring the plugin to send mail through SendGrid's API. SMTP requests are associated with dynamic outgoing IP addresses on Pantheon, which can have a negative impact on deliverability.
3. Enter your site's SendGrid account credentials and select the desired the protocol for sending mail.
4. Enter the sending email address and provide a reply email address if you prefer replies to go to another address (optional).  
5. SendGrid supports categories so you can track email analytics and organize message types. Include any categories you would like to use, separated by commas.


![WP Settings example](/source/docs/assets/images/sendgrid_wpconfig.png)​

Your WordPress application is now set up to send email through SendGrid! Complete the fields in the SendGrid Test section of the Settings page and watch the magic work its way to your inbox. For guidance on checking deliverability in SendGrid, see [Checking Deliverability in SendGrid](#deliverability).

## Drupal
Two methods can be used to integrate SendGrid with your Drupal site: SMTP or API.
#### Considerations
- SMTP requests are associated with dynamic outgoing IPs, which can have a negative impact on deliverability.
- API integration can be problematic on Pantheon due to [Composer Manager](https://www.drupal.org/project/composer_manager) (required by [SendGrid Integration](https://www.drupal.org/project/sendgrid_integration)).
 For more details, see [Unsupported/Problematic Modules and Plugins](/docs/unsupported-modules-plugins/#composer-manager).

### SendGrid SMTP Integration

<div class="alert alert-info" role="alert"> The Sendgrid API module currently needs a patch to work with Drupal 7, see [The issue report for more information](https://www.drupal.org/node/2759433#comment-11359957).</div>

Support for Drupal 8 is not yet available for the [SMTP Authentication Support](https://www.drupal.org/project/smtp) module. However, [some users](https://groups.google.com/a/pantheon.io/forum/#!topic/power-users/HxvK7T0MPEM) have reported success with the pre-release version.

1. Install the [SMTP Authentication Support](https://www.drupal.org/project/smtp) module using the [Drupal interface](https://drupal.org/documentation/install/modules-themes) or with [Terminus](/docs/terminus):

 ```nohighlight
 terminus drush 'en smtp -y'
 ```
2. Visit `/admin/config/system/smtp` once you've logged in as administrator.
3. From within Install Options, select **On**.
4. Use the following within SMTP Server Settings:

 **SMTP server**: smtp.sendgrid.com <br>
 **SMTP port**: 465<br>
 **Use encrypted protocol**: Use SSL<br>

5. Provide your site-specific SendGrid credentials and click **Save configuration**.  

Your Drupal application on Pantheon is now set up to send email through SendGrid. Provide an address within the Send Test E-mail configuration field and click **Save configuration** to test.

### SendGrid API Integration
The SendGrid Integration module is not supported on Drupal 8 sites at this time. This method can be problematic on Pantheon due to [Composer Manager](https://www.drupal.org/project/composer_manager) (required by [SendGrid Integration](https://www.drupal.org/project/sendgrid_integration)).

1. Install the [SendGrid Integration](https://www.drupal.org/project/sendgrid_integration) module using the [Drupal interface](https://drupal.org/documentation/install/modules-themes) or with [Terminus](/docs/terminus):

 ```nohighlight
 terminus drush 'en sendgrid_integration -y'
 ```

2. From within your SendGrid account, navigate to **Settings** > **API Keys** and create a site-specific API Key. Click the key to copy it to your keyboard.

3. Visit `/admin/config/services/sendgrid` once you've logged into your Drupal site as administrator. Paste your API Key and click **Save Settings**.

4. Add the provided [code block](/docs/unsupported-modules-plugins/#composer-manager) within `settings.php` to address issues with the required Composer Manager module.

5. Run the following [Terminus](/docs/terminus) command to install SendGrid Integration dependencies with Composer Manager:

 ```
 terminus drush 'composer-manager install'
 ```

Your Drupal application on Pantheon is now set up to send email through SendGrid's API. Test your configuration from `/admin/config/services/sendgrid/test`.


## <a name="deliverability"></a>Checking Deliverability in SendGrid
For testing purposes, your first few deliveries should be to email addresses that you control directly. You can track and measure unique aspects of mail behaviors from within your site's SendGrid account, which should be monitored regularly.

First, log into [SendGrid](https://sendgrid.com/login) and select **Activity**. You will be taken to a page with a form to search by email. Enter the email address, and press **Enter**. SendGrid will search through your mail queue for any messages sent to that address. For additional search parameters, select the filters near the top right corner.

![SendGrid email search options](/source/docs/assets/images/sendgrid-search-options.png)​

You can explore the Statistics and Email Reports from within your site's account to gain insight into email activity, statistics on email clients, and much more.


## Congratulations!

You have now successfully integrated an industrial strength, simple to use, email delivery service into your website. If you have any questions, contact [SendGrid's support team](https://support.sendgrid.com/hc/en-us) or check out SendGrid’s [Email Infrastructure Guide](http://resources.sendgrid.com/email-infrastructure-guide/) for advanced tips on how to create and publish DNS records for increased deliverability.

## See Also

- [Prevent Spamming During Drupal Debugging and Testing](/docs/guides/rerouting-outbound-email)
