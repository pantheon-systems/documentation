---
title: Email on Pantheon
description: Detailed information on outgoing mail and email hosting for your Pantheon Drupal or WordPress site.
tags: [services]
categories: []
---
## Incoming Email

Pantheon does not host inboxes for incoming mail. We recommend using an externally hosted email solution, such as [Gmail](https://gsuite.google.com/index.html).

## Outgoing Email

For outgoing emails, we recommend integrating a third-party service provider that supports a REST API configuration. You can use an SMTP configuration, but because SMTP requests are associated with dynamic outgoing IPs there can be negative impacts to deliverability. For a detailed comparison between API configurations and SMTP, see [this related blog post from SendGrid](https://sendgrid.com/blog/web-api-or-smtp-relay-how-should-you-send-your-mail/).


### REST API Providers

Here are some popular email services you can use on the platform and their corresponding Drupal or WordPress integration method:

<table class="table table-responsive table-bordered">
    <thead class="thead-inverse">
      <tr>
        <th scope="row" class="thead-inverse">Provider</th>
        <th>Integration</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td scope="row" class="thead-inverse">SendGrid</td>
        <td><a href="https://www.drupal.org/project/sendgrid_integration" target="blank">Drupal</a> | <a target="blank" href="https://wordpress.org/plugins/sendgrid-email-delivery-simplified/">WordPress</a></td>
      </tr>
      <tr>
        <td scope="row" class="thead-inverse">Mandrill</td>
        <td><a href="https://www.drupal.org/project/mandrill" target="blank">Drupal</a> | <a target="blank" href="https://wordpress.org/plugins/wpmandrill/">WordPress</a></td>
      </tr>
      <tr>
        <td scope="row" class="thead-inverse">Mailgun</td>
        <td><a href="https://www.drupal.org/project/mailgun" target="blank">Drupal</a> | <a target="blank" href="https://wordpress.org/plugins/mailgun/">WordPress</a></td>
      </tr>
      <tr>
        <td scope="row" class="thead-inverse">SparkPost</td>
        <td><a href="https://www.drupal.org/project/sparkpost" target="blank">Drupal</a> | <a target="blank" href="https://wordpress.org/plugins/sparkpost/">WordPress</a></td>
      </tr>
    </tbody>
</table>

[SendGrid](https://sendgrid.com/), a high-deliverability email service, offers several plans to meet your specific needs. For more information, see [Using SendGrid To Deliver Email](/docs/guides/sendgrid/).

### SMTP Providers & Configurations
Use the following integration methods for Drupal and WordPress to configure an external SMTP service:

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

Customers have successfully used [SendGrid](/docs/guides/sendgrid/), Gmail, Amazon SES, Mandrill, and other externally hosted SMTP based email providers.

Since we block traffic on ports 25, 465 and 587, here’s a list of popular email providers and the additional ports which will work on Pantheon. We suggest you refer to the corresponding documentation for any updated information.

<table class="table table-responsive table-bordered">
    <thead class="thead-inverse">
      <tr>
        <th scope="row" class="thead-inverse">Provider</th>
        <th>Port Documentation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SendGrid</td>
        <td><a href="https://sendgrid.com/docs/Classroom/Basics/Email_Infrastructure/smtp_ports.html" target="blank">2525</a></td>
      </tr>
      <tr>
        <td>Mandrill</td>
        <td><a href="https://mandrill.zendesk.com/hc/en-us/articles/205582167-Which-SMTP-ports-can-I-use-" target="blank">2525</a></td>
      </tr>
      <tr>
        <td>Mailgun</td>
        <td><a href="http://blog.mailgun.com/25-465-587-what-port-should-i-use/" target="blank">2525</a></td>
      </tr>
      <tr>
        <td>SparkPost</td>
        <td><a href="https://www.sparkpost.com/docs/faq/smtp-connection-problems/" target="blank">2525</a></td>
      </tr>
      <tr>
        <td>Amazon SES</td>
        <td><a href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide/smtp-connect.html" target="blank">2587 (STARTTS), 2465 (TLSWRAPPER)</a></td>
      </tr>
    </tbody>
</table>

If you do not find your service provider in the table above, check with their support and/or documentation.

## Troubleshooting

### Failed Opening `MimeMailSystem__SmtpMailSystem.mail.inc` or `HTMLMailSystem__SmtpMailSystem.mail.inc`

This is a common error with the SMTP Authentication Support module. It can be fixed in a few steps:

1. Copy the file from `.../files/mailsystem/filename.inc`
2. Place in a custom module's includes dir and .info file using `files[] = includes/filename.inc`.
3. Remove the original file from the `{registry}` table:

        DELETE FROM registry WHERE name='[appropriate-name]' AND module='mailsystem';

4. [Clear the cache](https://github.com/pantheon-systems/cli):

        terminus drush <site>.<env> -- cc all

See [available patch](https://drupal.org/node/1369736#comment-5644064).

## Frequently Asked Questions
### Can I use Pantheon's local MTA (postfix)?
We strongly recommend that you do not use the local MTA (postfix) as described [above](#outgoing-email). Instead, we recommend using a third-party email service provider.

### What ports are blocked by Pantheon?
In order to fight spam, Pantheon blocks traffic on popular email ports 25, 465, and 587. Your emails will not be processed if you use any of these ports. Make sure that your service provider allows traffic on a port other than 25, 465 and 587 and that you have correctly configured your site to use that port.

### Can Pantheon provide, publish, or support SPF records?

As consumers of cloud infrastructure, we don’t have control over our IP ranges and they are subject to change without our notice. Publishing an SPF record would imply assurance on our end that it can work, which would be very difficult to guarantee given these circumstances. We take the decision of what we support and what we don’t very seriously, and at this time we’re not in a position to support SPF records.

At this time we do not support email off the platform, and recommend using a third-party solution like those listed above instead.

### Why does my Gmail user name and password not work?

Please see Google's help article: [My client isn't accepting my username and password](https://support.google.com/mail/answer/14257?p=client_login&rd=1).
