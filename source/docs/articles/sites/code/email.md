---
title: Email on Pantheon
description: Learn about outgoing mail and email hosting on Pantheon.
category:
    - drupal
keywords: email, email host, host email, outgoing mail, outgoing email, email solution, sendgrid, smtp, external, external smtp server, external smtp, spf record, spf records, spf, dns records, dns, exim
---
Pantheon does not host inboxes for incoming mail. We recommend making use of an externally hosted email solution, such as [Gmail](http://www.google.com/intl/en/enterprise/apps/business/index.html) as an adjunct to our service.

## Outgoing Email

For outgoing email, your site can send mail immediately using the local MTA (postfix) with few restrictions. However, speed and deliverability (messages erroneously blocked or marked as spam) will not be guaranteed since your messages will be coming from an anonymous cloud server.  


Pantheon has a partner relationship with SendGrid, a high-deliverability email service, which offers up to 400 emails a day for free, and can scale to millions if needed. Find more information, see the [SendGrid HOWTO](/docs/guides/using-sendgrid-to-deliver-email-with-wordpress-and-drupal/).

We recommend using an external SMTP server or service for all production use-cases. For low-volume transactional emails - account registration, forgot password, etc - you may be able to use whatever email service you use for inbound email (including Gmail). For high-volume email, you should integrate with a volume email gateway.

Some customers have successfully used [SendGrid](/docs/guides/using-sendgrid-to-deliver-email-with-wordpress-and-drupal/), Gmail, Amazon SES, Mandrill, or other externally hosted SMTP based email providers.

Once you have chosen your SMTP provider, install and configure Drupal's SMTP module:

[http://drupal.org/project/smtp](http://drupal.org/project/smtp)

## Troubleshooting

#### Failed Opening MimeMailSystem\_\_SmtpMailSystem.mail.inc or HTMLMailSystem\_\_SmtpMailSystem.mail.inc

This is a common error with the SMTP module. It can be fixed in a handful of steps, as follows:

1. Copy the file from .../files/mailsystem/filename.inc
2. Place in a custom module's includes dir and .info file using files[] = includes/filename.inc
3. Remove original file from {registry} table DELETE FROM registry WHERE name='[appropriate-name]' AND module='mailsystem';
4. [`terminus drush --site=<site> --env=<env> cc all`](https://github.com/pantheon-systems/cli)

A patch is available [here.](https://drupal.org/node/1369736#comment-5644064)

## Frequently Asked Questions

#### Can Pantheon provide, publish, or support SPF records?

As consumers of cloud infrastructure, we don’t have control over our IP ranges and they are subject to change without our notice. Publishing an SPF record would imply assurance on our end that it can work, which would be very difficult to guarantee given these circumstances. We take the decision of what we support and what we don’t very seriously, so at this time we’re not in a position to do that due to sustainably.

At this time we do not support email off the platform, and recommend using a third-party solution like those listed above instead.

#### Why does my Gmail user name and password not work?
Please see Google's help article: [My client isn't accepting my username and password](https://support.google.com/mail/answer/14257?p=client_login&rd=1)
