---
title: CMS Email Service on Pantheon
description: Detailed information on configuring a third-party outgoing email service for your Pantheon Drupal or WordPress site.
contenttype: [doc]
innav: [true]
categories: [email]
cms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [email]
reviewed: "2025-01-22"
---

## Incoming Email

Pantheon does not host inboxes for incoming mail. We recommend using an externally hosted email solution, such as Gmail from [Google Workspace](https://workspace.google.com/).

## Outgoing Email

Drupal and WordPress both require a configured outgoing email service.

For outgoing emails, we offer multiple options:

* **Recommended** Rest API Integration: Integrating WordPress and Drupal directly with a third-party service provider that supports a REST API configuration.
* Pantheon SMTP: A basic transactional email service (limited to 500 emails daily).
* SMTP Port Forwarding: Alternatively, you can use an SMTP configuration, but because SMTP requests are associated with dynamic, outgoing IPs, this can negatively impact deliverability.

For a detailed comparison between API configurations and SMTP, see [this related blog post from SendGrid](https://sendgrid.com/blog/web-api-or-smtp-relay-how-should-you-send-your-mail/).

### REST API Integration
Pantheon recommends using SendGrid as a Rest API email provider. This configuration is completed within WordPress or Drupal so that transactional emails are sent directly from your hosted CMS to SendGrid (or your preferred provider) and finally to the recipient.

There are many benefits to using SendGrid, including the following:
* Email domain authentication (SPF support).
* Clear visibility into the emails being sent.
* Send up to 100 emails daily at no cost (using a free SendGrid account).
* Additional features to support sending marketing emails.

Additional email vendors can be used, although our support team needs to gain more knowledge of the integration process (it will require working with the email provider if you have any issues).

#### Configuring SendGrid:
The setup process with SendGrid takes a few minutes and differs depending on whether you use Drupal or WordPress.

[SendGrid](https://sendgrid.com/), a high-deliverability email service, offers several plans to meet your needs. Review our guide [Using SendGrid To Deliver Email](/sendgrid) for details.

##### Drupal
[Sendgrid Integration](https://www.drupal.org/project/sendgrid_integration)

##### WordPress 
[Use WP Mail SMTP to Send Email with SendGrid](/guides/wordpress-configurations/sendgrid-wordpress-wp-mail-smtp)

### Pantheon SMTP
Pantheon provides a basic SMTP service for delivering transactional emails. This service allows you to send transactional emails from your Pantheon hosted WordPress and Drupal sites with no action (will begin automatically work once the site has been created).

#### Features and limitations
Pantheons SMTP service allows up to 25 emails daily per environment. A pantheon site with multiple environments will be able to send up to 25 emails daily per environment. Upon reaching the daily limit, any emails sent beyond the limit will not be sent.

There is not support for SPF or email domain authentication. It’s important if your environment will need to send more emails then the daily limit to configure WP Mail to work with Sendgrid (or the email provider of your choice). This will ensure that the transactional emails requested from your site will be sent.

### SMTP Port Forwarders Configurations
Pantheon strongly encourages using port `2525`. We don’t recommend using ports `25`, `465`, or `587` to send email because service providers often block those ports as an anti-spam measure. 

Customers have successfully used [SendGrid](https://sendgrid.com/docs/API_Reference/SMTP_API/integrating_with_the_smtp_api.html), [Amazon SES](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/smtp-connect.html), [Mailgun](http://blog.mailgun.com/25-465-587-what-port-should-i-use/), [Mandrill](https://mandrill.zendesk.com/hc/en-us/articles/205582167-Which-SMTP-ports-can-I-use-), and other externally hosted SMTP-based email providers. If your service provider is not listed in the table above, check with their support and documentation.

Use the following integration methods for Drupal and WordPress to configure an external SMTP service:

<TabList>

<Tab title="Drupal" id="drupal" active={true}>

Once you have chosen your SMTP provider, install and configure Drupal's [SMTP Authentication Support](https://drupal.org/project/smtp) module.

</Tab>

<Tab title="WordPress" id="wp">

Once you have chosen your SMTP provider, install and configure WordPress's [WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/) plugin.

</Tab>

</TabList>

## Troubleshooting

### Failed Opening `MimeMailSystem__SmtpMailSystem.mail.inc` or `HTMLMailSystem__SmtpMailSystem.mail.inc`

This is a common error with the SMTP Authentication Support module. It can be fixed in a few steps:

1. Copy the file from `.../files/mailsystem/filename.inc`
1. Place in a custom module's includes dir and .info file using `files[] = includes/filename.inc`.
1. Remove the original file from the `{registry}` table:

  ```sql
  DELETE FROM registry WHERE name='[appropriate-name]' AND module='mailsystem';
  ```

1. [Clear the cache](https://github.com/pantheon-systems/cli):

  ```bash{promptUser: user}
  terminus drush <site>.<env> -- cc all
  ```

See [available patch](https://drupal.org/node/1369736#comment-5644064).

### Unable to Send Mail with Amazon SES

SES places new users into 'sandbox mode' to help prevent fraud and abuse. If you are having trouble sending mail and are using SES, confirm you are not in sandbox mode. For more information, [see AWS documentation on sandbox mode](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html).

### WordPress Password Reset Emails Are Not Delivered

The password reset email may not be delivered. This happens when the current URL does not match the URL that is stored in the environment's `wp_options` table. Emails will only be sent if the URLs match. This applies to all emails sent by WordPress, including instances when a new user is added.

In the following example, a password reset email will not be sent because the URL is not listed in the table:

current URL: `https://dev-example.pantheonsite.io/wp-login.php?action=lostpassword`

 ```bash
 +-----------+--------------------+-------------------------------------------------+----------+
 | option_id | option_name        | option_value                                    | autoload |
 +-----------+--------------------+-------------------------------------------------+----------+
 |         1 | siteurl            | https://www.example.com | yes      |
 |         2 | home               | https://www.example.com | yes      |
 |         3 | blogname           | CSE WP AGCDN Practice                           | yes      |
 |         4 | blogdescription    | Just another WordPress site                     | yes      |
 |         5 | users_can_register | 0                                               | yes      |
 ```

## Frequently Asked Questions

### Can I use Pantheon's local MTA (postfix)?

Yes, this is limited to sending 25 emails per day from each site environment (e.g., staging can send 25 per day, live can send 25 per day). We strongly recommend using a third-party email service provider as they offer additional features to ensure deliverability such as email domain authentication link branding, and allow you to send more than 25 emails daily.

### Can I access the mail logs for my site?

No, mail logs are unavailable. If you need to see your site's email traffic, we recommend using SendGrid.

### What ports are recommended by Pantheon?

Pantheon strongly encourages using ports other than `25`, `465` or `587` to send email because those ports are often blocked by service providers as an anti-spam measure.  Make sure that your service provider allows traffic on a port other than those mentioned and that you have correctly configured your site to use that port.

### Are there SPF records for Pantheon's local MTA (postfix)?

No, we don’t provide SPF records for Pantheon local MTA. We encourage you to use SendGrid instead to ensure email deliverability.

### Why does my Gmail user name and password not work?

Please see Google's help article: [My client isn't accepting my username and password](https://support.google.com/mail/answer/14257?p=client_login&rd=1).

### Can I use Microsoft Exchange or Office 365 for my emails?

Office 365 uses ports `25` and `587` by default, and different options for sending via SMTP client, Direct send or SMTP relay. [This document](https://docs.microsoft.com/en-us/Exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-office-3) outlines the limitations and configurations of each, to know what will work for your application.

Because we don't support SPF, it is likely that most Exchange or Office 365 servers won't work if [configured at your email server](https://docs.microsoft.com/en-us/office365/SecurityCompliance/set-up-spf-in-office-365-to-help-prevent-spoofing). Check your organization's Microsoft Exchange settings to see what's allowed by your system.

### Why does my site receive numerous requests to autodiscover.xml?

[`Autodiscover.xml`](https://docs.microsoft.com/en-us/exchange/architecture/client-access/autodiscover?view=exchserver-2019) automates the configuration of Outlook email server authentication. An issue can occur when the mail software erroneously and repeatedly calls for an `autodiscover.xml` file that does not exist. If left unmanaged, this may start using unnecessary resources, return 404 errors, and can result in a slower site.

To stop `autodiscover.xml` requests that can cause 404 errors, you can configure `pantheon.yml` to block requests to `autodiscover.xml`.

Add the `autodiscover.xml` path to the [`protected_web_paths`](/pantheon-yml#protected-web-paths) directive in `pantheon.yml`. This lets you block requests at NGINX web server and will return a 403 error instead.

## More Resources

- [Resetting Passwords](/resetting-passwords)
