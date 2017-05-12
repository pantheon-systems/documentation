---
title: Email on Pantheon
description: Detailed information on outgoing mail and email hosting for your Pantheon Drupal or WordPress site.
tags: [services]
categories: []
---
Pantheon does not host inboxes for incoming mail. We recommend using an externally hosted email solution, such as [Gmail](http://www.google.com/intl/en/enterprise/apps/business/index.html) as an adjunct to our service.

## Outgoing Email

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Pantheon recommends using a third-party email provider.  Failure to do so will result in significant delays and deleted messages.</p>
</div>

For outgoing email, your site can send mail immediately using the local MTA (postfix) with few restrictions. However, speed and deliverability (messages erroneously blocked or marked as spam) will not be guaranteed since your messages will be coming from an anonymous cloud server.  

[SendGrid](https://sendgrid.com/), a high-deliverability email service, offers several plans to meet your specific needs. For more information, see [Using SendGrid To Deliver Email](/docs/guides/sendgrid/). Keep in mind that SendGrid has a provisioning process (not all requests to use SendGrid are automatically approved) that can take from a couple of hours to a couple of days. If you need email when your site launches and you plan on using SendGrid, be sure to get started before your launch date. See [Provisioning at the SendGrid website](https://sendgrid.com/docs/Glossary/provisioning.html).

We recommend using an external SMTP server or service for all use-cases. 

Some customers have successfully used [SendGrid](/docs/guides/sendgrid/), Gmail, Amazon SES, Mandrill, or other externally hosted SMTP based email providers.

Once you have chosen your SMTP provider, install and configure Drupal's [SMTP Authentication Support](http://drupal.org/project/smtp) module.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Support for Drupal 8 is not yet available for the <a href="https://www.drupal.org/project/smtp"> SMTP Authentication Support</a> module. However, <a href="https://groups.google.com/a/pantheon.io/forum/#!topic/power-users/HxvK7T0MPEM"> some users</a> have reported success with the pre-release version. For details, see <a href="/docs/guides/sendgrid/#sendgrid-smtp-integration"> this article</a>.</p>
</div>

## Troubleshooting

#### Failed Opening MimeMailSystem\_\_SmtpMailSystem.mail.inc or HTMLMailSystem\_\_SmtpMailSystem.mail.inc

This is a common error with the SMTP Authentication Support module. It can be fixed in a few steps:

1. Copy the file from .../files/mailsystem/filename.inc
2. Place in a custom module's includes dir and .info file using files[] = includes/filename.inc
3. Remove original file from {registry} table DELETE FROM registry WHERE name='[appropriate-name]' AND module='mailsystem';
4. [`terminus drush <site>.<env> -- cc all`](https://github.com/pantheon-systems/cli)

See [available patch](https://drupal.org/node/1369736#comment-5644064).

## Frequently Asked Questions

#### Can Pantheon provide, publish, or support SPF records?

As consumers of cloud infrastructure, we don’t have control over our IP ranges and they are subject to change without our notice. Publishing an SPF record would imply assurance on our end that it can work, which would be very difficult to guarantee given these circumstances. We take the decision of what we support and what we don’t very seriously, so at this time we’re not in a position to do that due to sustainably.

At this time we do not support email off the platform, and recommend using a third-party solution like those listed above instead.

#### Why does my Gmail user name and password not work?

Please see Google's help article: [My client isn't accepting my username and password](https://support.google.com/mail/answer/14257?p=client_login&rd=1).
