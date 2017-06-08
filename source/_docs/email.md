---
title: Email on Pantheon
description: Detailed information on outgoing mail and email hosting for your Pantheon Drupal or WordPress site.
tags: [services]
categories: []
---
## Incoming Email

Pantheon does not host inboxes for incoming mail. We recommend using an externally hosted email solution, such as [Gmail](https://gsuite.google.com/index.html).

## Outgoing Email

For outgoing emails, your site can use one of the three configurations explained below. Pantheon strongly recommends Approach 1 to ensure high-deliverability (that emails reach inboxes).

#### Approach 1: High-deliverability service via REST API

Most popular email services provide both REST API or an SMTP relay host to send emails. Use a REST API to ensure high-deliverability.

[SendGrid](https://sendgrid.com/), a high-deliverability email service, offers several plans to meet your specific needs. For more information, see [Using SendGrid To Deliver Email](/docs/guides/sendgrid/).

The table below lists popular email services and their Drupal module or Wordpress plugin which uses REST API.

<table class="table table-condensed table-bordered">
    <thead class="thead-inverse">
      <tr>
        <th scope="row" class="thead-inverse">Provider</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="thead-inverse">SendGrid</th>
        <td><a href="https://www.drupal.org/project/sendgrid_integration" target="_blank">Drupal</a> | <a target="_blank" href="https://wordpress.org/plugins/sendgrid-email-delivery-simplified/">Wordpress</a></td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">Mandrill</th>
        <td><a href="https://www.drupal.org/project/mandrill" target="_blank">Drupal</a> | <a target="_blank" href="https://wordpress.org/plugins/wpmandrill/">Wordpress</a></td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">Mailgun</th>
        <td><a href="https://www.drupal.org/project/mailgun" target="_blank">Drupal</a> | <a target="_blank" href="https://wordpress.org/plugins/mailgun/">Wordpress</a></td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">SparkPost</th>
        <td><a href="https://www.drupal.org/project/sparkpost" target="_blank">Drupal</a> | <a target="_blank" href="https://wordpress.org/plugins/sparkpost/">Wordpress</a></td>
      </tr>
    </tbody>
</table>

#### Approach 2 : High-deliverability service via SMTP

Using a plugin/ module is the most popular way to integrate with a high-deliverability service provider.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>In order to fight spam, Pantheon blocks traffic on popular email ports 25, 465, and 587. Your emails will not be processed if you use any of these 3 ports. Most of the email services provide ports other than 25, 465 and 587 which can be used while configuring your SMTP plugin/ module. So, ensure that your service provider allows traffic on a port other than 25, 465 and 587 and that you have correctly configured your plugin/ module to use that port.</p>
</div>

Use the below information for Drupal and WordPress to configure the external service.

<ul class="nav nav-tabs" role="tablist">
  <li class="active" role="presentation"><a href="#drupal" aria-controls="drupal" role="tab" data-toggle="tab">Drupal 7/8</a></li>
  <li role="presentation"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="drupal">
    Once you have chosen your SMTP provider, install and configure Drupal's <a href="https://drupal.org/project/smtp">SMTP Authentication Support</a> module.

    <div class="alert alert-info" role="alert">
      <h4 class="info">Note</h4>
        <p>Support for Drupal 8 is in Beta. <a href="https://www.drupal.org/project/smtp"> SMTP Authentication Support</a> module.</p>
    </div>
  </div>
  <div role="tabpanel" class="tab-pane" id="wp">
    Once you have chosen your SMTP provider, install and configure Wordpress's <a href="https://wordpress.org/plugins/wp-mail-smtp/">WP Mail SMTP</a> plugin.
  </div>
</div>

Customers have successfully used [SendGrid](/docs/guides/sendgrid/), Gmail, Amazon SES, Mandrill, or other externally hosted SMTP based email providers.

Since we block traffic on ports 25, 465 and 587, here’s a list of popular email providers and the additional ports which will work on Pantheon. We suggest you refer to the corresponding documentation for any updated information.

<table class="table table-condensed table-bordered">
    <thead class="thead-inverse">
      <tr>
        <th scope="row" class="thead-inverse">Provider</th>
        <th>Port Documentation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="thead-inverse">SendGrid</th>
        <td><a href="https://sendgrid.com/docs/Classroom/Basics/Email_Infrastructure/smtp_ports.html" target="_blank">2525</a></td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">Mandrill</th>
        <td><a href="https://mandrill.zendesk.com/hc/en-us/articles/205582167-Which-SMTP-ports-can-I-use-" target="_blank">2525</a></td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">Mailgun</th>
        <td><a href="http://blog.mailgun.com/25-465-587-what-port-should-i-use/" target="_blank">2525</a></td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">SparkPost</th>
        <td><a href="https://www.sparkpost.com/docs/faq/smtp-connection-problems/" target="_blank">2525</a></td>
      </tr>
      <tr>
        <th scope="row" class="thead-inverse">Amazon SES</th>
        <td><a href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide/smtp-connect.html" target="_blank">2587 (STARTTS), 2465 (TLSWRAPPER)</a></td>
      </tr>
    </tbody>
</table>

If you do not find your service provider in the table above, kindly check with their support/ documentation.

#### Approach 3: Pantheon via Local MTA (may result in emails not being delivered)

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Pantheon recommends using a third-party email provider. (see Approach 1 and 2).  Failure to do so will result in significant delays and/or deleted messages.</p>
</div>

For outgoing email, your site can send mail using the local MTA (postfix). However, speed and deliverability (messages erroneously blocked or marked as spam) will not be guaranteed since your messages will be coming from an anonymous cloud server.  

## Troubleshooting

#### Failed Opening `MimeMailSystem__SmtpMailSystem.mail.inc` or `HTMLMailSystem__SmtpMailSystem.mail.inc`

This is a common error with the SMTP Authentication Support module. It can be fixed in a few steps:

1. Copy the file from `.../files/mailsystem/filename.inc`
2. Place in a custom module's includes dir and .info file using `files[] = includes/filename.inc`.
3. Remove the original file from the `{registry}` table:

        DELETE FROM registry WHERE name='[appropriate-name]' AND module='mailsystem';

4. [Clear the cache](https://github.com/pantheon-systems/cli):

        terminus drush <site>.<env> -- cc all

See [available patch](https://drupal.org/node/1369736#comment-5644064).

## Frequently Asked Questions

#### Can Pantheon provide, publish, or support SPF records?

As consumers of cloud infrastructure, we don’t have control over our IP ranges and they are subject to change without our notice. Publishing an SPF record would imply assurance on our end that it can work, which would be very difficult to guarantee given these circumstances. We take the decision of what we support and what we don’t very seriously, so at this time we’re not in a position to do that due to sustainably.

At this time we do not support email off the platform, and recommend using a third-party solution like those listed above instead.

#### Why does my Gmail user name and password not work?

Please see Google's help article: [My client isn't accepting my username and password](https://support.google.com/mail/answer/14257?p=client_login&rd=1).
