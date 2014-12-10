---
title: Using SendGrid for Outbound Email
description: Send email from Pantheon using SendGrid.
filename: source/_common-tasks/using-sendgrid-for-outbound-email.md
---

## Overview

Your application will need to send email for a variety of reasons — new user registrations, password resets and social notifications, for example. We provide a working mail tool with every environment, but because our platform utilizes a very large array of machines, and your application could be running on any one of them on any given day, you may have problems with deliverability using the built-in mail agent.

To ensure that email is delivered, we recommend using an email gateway which insures your mail originates from a constant source. SendGrid is a cloud service for email which provides such a service, and helps you eliminate the complexity of sending high-deliverability email e.g. maintaining good relations with other internet postmasters, helping with DKIM and SPF setup, etc.

There are three simple steps to sending email from Pantheon using SendGrid.

## 1. Create a SendGrid Account

You can send up to 200 emails per day for free with SendGrid, so it's risk-free to try out. Also, as a Pantheon customer, we are also able to offer you a discount on higher-volume plans. [Sign up](http://sendgrid.com/partners/pantheon.html) for an account to get started.

## 2. Download the Drupal SMTP Module

Pantheon recommends using the actively maintained [SMTP module](http://drupal.org/project/smtp) to send email with Drupal, regardless of your email gateway. Luckily, SendGrid plugs right in.

Download the latest recommended release and install it in the _code/sites/all/modules_ directory. You can push it with git, use the SFTP account in your Pantheon dashboard, or even use `drush dl`, the same as you would with any other module.


## 3. Add Your SendGrid Account Details

Login to your Drupal dev site with your Pantheon username and password, which gives you administrator access. Along the menu at the top of the screen, click on Modules, where you'll see _SMTP Authentication Support_ in the Mail section. Click "Configure" and you will see the SMTP settings page.

![Settings example](https://pantheon-systems.desk.com/customer/portal/attachments/151706)​

First, make sure to activate the module by selecting "On" in the Install Options box.

SMTP server: `smtp.sendgrid.net`  

SMTP port: `25`  

Username: _Your SendGrid username_  

Password: _Your SendGrid password_

Under email options, be sure to include a valid from address and a name for the sender of the email (such as your name or your website's name).

After you save the configuration, your Drupal application on Pantheon is now set up to send email through SendGrid. You can also send a test email from the configuration screen and watch it safely arrive in your inbox shortly thereafter.

## Deploy SendGrid Configuration in Code

When making any changes to Pantheon installations, you first make the change on your Dev installation. Next, move it to the test server using the Pantheon dashboard. After testing, you migrate your changes to the live server, using the Pantheon dashboard.

If you don't want to re-enter the configuration, and can't push your database "up" to Live (e.g. because the site is already launched), you can get started with exported configuration. SMTP credentials are among the easiest to export to code, since you can drop them right into your settings.php file using the `$conf array, like so:`

    $conf['smtp_on'] = TRUE;
    $conf['smtp_host'] = 'smtp.sendgrid.net';
    $conf['smtp_port'] = 25;
    $conf['smtp_username'] = 'your-sendgrid-username';
    $conf['smtp_password'] = 'your-sendgrid-password';
    $conf['smtp_from'] = 'your-email@yoursite.com';
    $conf['smtp_fromname'] = 'Your Name';

` `

Using a code block like that will ensure that SendGrid is enabled wherever that settings.php file is used, and allows you to "push" the configuration up from Dev to Test to Live.

` `
## Next Steps

When you're ready to send more emails or access advanced features like click and open tracking, visit your SendGrid account to [upgrade plans](http://sendgrid.com/partners/pantheon.html). If you have questions at any point, contact [SendGrid's responsive support](http://support.sendgrid.com/).
