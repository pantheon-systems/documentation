---
title: Using SendGrid To Deliver Email with WordPress and Drupal
description: SendGrid is the world's largest Email Infrastructure as a Service provider. Learn to send email from your website reliably.
category:
  - developing
---

Email is a necessity when running a website, whether it’s used with a simple contact form or to manage subscription based services, odds are you’re going to need it. Users may want to receive notices of content updates, have sales receipts sent to them, update their password or membership information, and more. Email is the most effective way of communicating with a site's user base, but it does no good if these messages are filtered and marked as spam.

One of the most common reasons that email gets blocked is because it originates from a website hosted by a third party service, like Pantheon. In order to ensure this doesn't happen to you, we at Pantheon highly encourage using your own email server or a service provider such as SendGrid.

## Why SendGrid?

[SendGrid](https://sendgrid.com) has a lot of things going for it, all of which do the hard work for you when it comes to how mail is managed on your site. It can handle massive email campaigns while providing highly detailed and flexible reporting, along with the ability to scale and increase deliverability.

For smaller sites with less traffic, it also allows up to 400 free emails per month. Regardless of your situation, SendGrid has you covered!

## Create a SendGrid Account

As a SendGrid partner, we offer Pantheon users a discount on higher-volume plans. Get started by [signing up](https://sendgrid.com/partners/pantheon) for an account and selecting a free or paid package that meets your business needs. If you’re going for the free plan to test the service out, you won’t have to provide any payment details.

![SendGrid sign up form](/source/docs/assets/images/sendgrid-signup.png)​

After receiving your confirmation email, sign in to your [SendGrid account](https://sendgrid.com/marketing/login). From within the Account Settings page, click on **Manage Multiple User Credentials**.

![SendGrid Multiple User setup](/source/docs/assets/images/sendgrid-multiple-users.png)

This is where you can create site specific credentials so that sites have their own unique access to your SendGrid features and mail. Once you have created your site's credentials, and allowed the desired access (Web, API, and Mail), go to the applicable section below for the CMS your site is running.

## WordPress

### Download the WordPress SendGrid Plugin

The official [SendGrid Plugin](https://wordpress.org/plugins/sendgrid-email-delivery-simplified/) replaces the wp_mail function with API integration, making it a breeze to configure and get started.
Install and activate the latest release through the WordPress dashboard or place it in the `code/wp-content/plugins` directory and activate via the dashboard.

### Add Your SendGrid Account Details
Once you have installed and activated the plugin, click on the SendGrid menu item in the Settings tab on the site’s dashboard. Simply enter your site's SendGrid account credentials and select API as the protocol for sending mail. Next, enter the sending email address and provide a reply email address if you prefer replies to go to another address (optional).  SendGrid supports categories so you can track email analytics and organize message types. Include any categories you would like to use, separated by commas.

**Note**: At this time, choosing SMTP for the "Send mail with" option will not work on Pantheon, because the code uses PHP short tags. See [Known Limitations](https://www.getpantheon.com/docs/articles/sites/known-limitations/) for more information. Currently, the API protocol is the only one that will work with SendGrid on Pantheon.

![WP Settings example](/source/docs/assets/images/sendgrid_wpconfig.png)​

Your WordPress application is now set up to send email through SendGrid! Complete the fields in the SendGrid Test section of the Settings page and watch the magic work its way to your inbox. For guidance on checking deliverability in SendGrid, [click here](#deliverability).

## Drupal

### Download the Drupal SMTP Module

Pantheon recommends using the actively maintained [SMTP module](https://www.drupal.org/project/smtp) to send email with Drupal, regardless of your email gateway. Luckily, SendGrid plugs right in.

Download and enable the latest recommended release in the `code/sites/all/modules` directory. You can push it with Git, use the SFTP account in your Pantheon dashboard, or even use [Drush](https://www.getpantheon.com/blog/five-steps-feeling-drush). The following commands can be used to download and enable the module if you have Drush configured locally:
```
drush @pantheon.your-site.dev dl smtp
drush @pantheon.your-site.dev en smtp -y
```
### Add Your SendGrid Account Details

Log into Drupal in your Pantheon Dev environment. From the menu at the top of the screen, select **Modules**, and go to SMTP Authentication Support in the Mail section. Click **Configure** and you’ll see the SMTP settings page.  

![Settings example](https://www.getpantheon.com/sites/default/files/docs/desk_images/151706)​  
​
First, make sure the module is enabled by selecting **On** in the Install Options box.
Add the following values for the associated fields:  
SMTP server: smtp.sendgrid.net  
SMTP port: 25  
Username: Your site's SendGrid username  
Password: Your site's SendGrid password  

Include a valid From address and name for the sender within the email options section.

After you save the configuration, your Drupal application on Pantheon is now set up to send email through SendGrid. You can also send a test email from the configuration page and watch it safely arrive in your inbox shortly thereafter.

## Deploy Drupal SendGrid Configuration in Code

When making any changes to Pantheon installations, first make the change in your Dev environment. Next, move it to Test, and after testing, migrate your changes to Live.

If you don't want to re-enter the configuration, and can't push your database to Live (e.g. because the site is already launched), you can get started with exported configuration. SMTP credentials are among the easiest to export to code, since you can drop them right into your settings.php file using the $conf array:

```
$conf['smtp_on'] = TRUE;
$conf['smtp_host'] = 'smtp.sendgrid.net';
$conf['smtp_port'] = 25;
$conf['smtp_username'] = 'your-sendgrid-username';
$conf['smtp_password'] = 'your-sendgrid-password';
$conf['smtp_from'] = 'your-email@yoursite.com';
$conf['smtp_fromname'] = 'Your Name';
```

Using a code block like that will ensure that SendGrid is enabled wherever that settings.php file is used, and allows you to push the configuration from Dev to Test to Live.

## <a name="deliverability"></a>Checking Deliverability in SendGrid
For testing purposes, your first few deliveries should be to email addresses that you control directly. You can track and measure unique aspects of mail behaviors from within your site's SendGrid account, which should be monitored regularly.

First, log into [SendGrid](https://sendgrid.com/marketing/login) and select **Email Activity**.

![SendGrid logged in user navigation](/source/docs/assets/images/sendgrid-user-navbar.png)​

You will be taken to a page with a simple form marked Search by email. Enter the email address, and click **Search**. SendGrid will search through your mail queue for any messages sent to that address. For additional search parameters, select the **Search Options** link.

![SendGrid email search options](/source/docs/assets/images/sendgrid-search-options.png)​

You can explore the Statistics and Email Reports from within your site's account to gain insight into email activity, statistics on email clients, and much more.


## Congratulations!

You have now successfully integrated an industrial strength, simple to use, email delivery service into your website. When you're ready to add advanced features like click and open tracking, access your [SendGrid account](https://sendgrid.com/marketing/login) and [upgrade plans](https://sendgrid.com/partners/pantheon). If you have questions at any point, contact [SendGrid's support team](https://support.sendgrid.com/hc/en-us). Or check out SendGrid’s [Email Infrastructure Guide](http://resources.sendgrid.com/email-infrastructure-guide/) for more advanced tips on how to create and publish DNS records for increased deliverability.
