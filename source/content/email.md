---
title: Email on Pantheon
description: Detailed information on outgoing mail and email hosting for your Pantheon Drupal or WordPress site.
categories: [platform]
tags: [email]
---
## Incoming Email

Pantheon does not host inboxes for incoming mail. We recommend using an externally hosted email solution, such as [Gmail](https://gsuite.google.com/index.html).

## Outgoing Email

For outgoing emails, we recommend integrating a third-party service provider that supports a REST API configuration. You can use an SMTP configuration, but because SMTP requests are associated with dynamic outgoing IPs there can be negative impacts to deliverability. For a detailed comparison between API configurations and SMTP, see [this related blog post from SendGrid](https://sendgrid.com/blog/web-api-or-smtp-relay-how-should-you-send-your-mail/).

### REST API Providers

Here are some popular email services you can use on the platform and their corresponding Drupal or WordPress integration method:

| Provider  | Integration |
|:--------- |:----------- |
| Mailgun   | [Drupal](https://www.drupal.org/project/mailgun) \| [WordPress](https://wordpress.org/plugins/mailgun/) |
| Mandrill  | [Drupal](https://www.drupal.org/project/mandrill) \| [WordPress](https://wordpress.org/plugins/wpmandrill/) |
| Postmark | [Drupal](https://www.drupal.org/project/postmark) \| [WordPress](https://wordpress.org/plugins/postmark-approved-wordpress-plugin/) |
| Sendgrid  | [Drupal](https://www.drupal.org/project/sendgrid_integration) \| [WordPress](/guides/sendgrid) |
| Sendinblue | [Drupal](https://www.drupal.org/project/sendinblue) \| [WordPress](https://wordpress.org/plugins/mailin/) |
| SparkPost | [Drupal](https://www.drupal.org/project/sparkpost) \| [WordPress](https://wordpress.org/plugins/sparkpost/) |

[SendGrid](https://sendgrid.com/), a high-deliverability email service, offers several plans to meet your specific needs. Review our guide [Using SendGrid To Deliver Email](/guides/sendgrid) for details.

### SMTP Providers & Configurations

Customers have successfully used [SendGrid](/guides/sendgrid), Gmail, Amazon SES, Mandrill, and other externally hosted SMTP based email providers.

Pantheon strongly encourages using ports other than `25`, `465` or `587` to send email because those ports are often blocked by service providers as an anti-spam measure. Here’s a list of popular email providers and the alternate ports which Pantheon recommends:

| Provider   | Port Documentation                                                                                          |
|:---------- |:----------------------------------------------------------------------------------------------------------- |
| Amazon SES | [587 (STARTTLS), 2465 (TLSWRAPPER)](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/smtp-connect.html) |
| Mailgun    | [2525](http://blog.mailgun.com/25-465-587-what-port-should-i-use/)                                          |
| Mandrill   | [2525](https://mandrill.zendesk.com/hc/en-us/articles/205582167-Which-SMTP-ports-can-I-use-)                |
| Sendgrid   | [2525](https://sendgrid.com/docs/API_Reference/SMTP_API/integrating_with_the_smtp_api.html)                 |
| SparkPost  | [2525](https://www.sparkpost.com/docs/faq/smtp-connection-problems/)                                        |

If you do not find your service provider in the table above, check with their support and/or documentation.

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

## Frequently Asked Questions

### Can I use Pantheon's local MTA (postfix)?

We strongly recommend that you do not use the local <abbr title="mail transfer agent">MTA</abbr> (postfix) as described [above](#outgoing-email). Instead, we recommend using a third-party email service provider.

### Can I access the mail logs for my site?

No, mail logs are not available for download and we do not recommend using the local MTA (postfix).

### What ports are recommended by Pantheon?

Pantheon strongly encourages using ports other than `25`, `465` or `587` to send email because those ports are often blocked by service providers as an anti-spam measure.  Make sure that your service provider allows traffic on a port other than those mentioned and that you have correctly configured your site to use that port.

### Are there SPF records for Pantheon's local MTA (postfix)?

If you are using Pantheon's local MTA ([not recommended](#outgoing-email)), and your domain contains an <abbr title="sender policy framework">SPF</abbr> record, then you should include Pantheon's SPF record, as shown below:

```none
v=spf1 include:spf.example.com include:spf.pantheon.io ~all
```

Adjust the above example record as needed for your domain:

- Be sure that you replace `include:spf.example.com` with the appropriate list of mail relays that also send email for your domain.
- If an SPF record exists for that domain, then add just the `include:spf.pantheon.io` part to whatever is already there, keeping the rest unchanged.
- To craft a new SPF record for a domain that does not yet have one, use the [SPF Record Generator](https://mxtoolbox.com/SPFRecordGenerator.aspx?domain=example.com), and enter `spf.pantheon.io` in the **3rd party mail systems** text box.

### Why does my Gmail user name and password not work?

Please see Google's help article: [My client isn't accepting my username and password](https://support.google.com/mail/answer/14257?p=client_login&rd=1).

### Can I use Microsoft Exchange or Office 365 for my emails?

Office 365 uses ports `25` and `587` by default, and different options for sending via SMTP client, Direct send or SMTP relay. [This document](https://docs.microsoft.com/en-us/Exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-office-3) outlines the limitations and configurations of each, to know what will work for your application.

Because we don't support SPF, it is likely that most Exchange or Office 365 servers won't work if [configured at your email server](https://docs.microsoft.com/en-us/office365/SecurityCompliance/set-up-spf-in-office-365-to-help-prevent-spoofing). Check your organization's Microsoft Exchange settings to see what's allowed by your system.

### Why does my site receive numerous requests to autodiscover.xml?

[`Autodiscover.xml`](https://docs.microsoft.com/en-us/exchange/architecture/client-access/autodiscover?view=exchserver-2019) automates the configuration of Outlook email server authentication. An issue can occur when the mail software erroneously and repeatedly calls for an `autodiscover.xml` file that does not exist. If left unmanaged, this may start using unnecessary resources, return 404 errors, and can result in a slower site.

To stop `autodiscover.xml` requests that can cause 404 errors, you can configure `pantheon.yml` to block requests to `autodiscover.xml`. 

Add the `autodiscover.xml` path to the [`protected_web_paths`](/pantheon-yml#protected-web-paths) directive in `pantheon.yml`. This lets you block requests at NGINX web server and will return a 403 error instead.
