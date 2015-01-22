---
title: Frequently Asked Questions
description: Answers to common questions about using Pantheon.
category:
- getting-started

---

## Can I put production sites on Pantheon?

Yes. Hundreds of live production sites run on Pantheon.

## What support is available for Pantheon?

We provide support through this helpdesk, as well as public community support on [our Get Satisfaction site](http://help.getpantheon.com). For paid customers, we provide 24x7 platform-wide monitoring for Pantheon sites and technical support via priority support tickets and IRC. We also have enterprise support plans available that offer Service Level Agreements and 24x7 on-call support.

You can read more about our support offerings on [our pricing page](https://getpantheon.com/pricing).

## What versions of Drupal does Pantheon support?

Pantheon supports Drupal 6 and 7, as well as development sandboxes for Drupal 8.

## What versions of WordPress does Pantheon support?

Pantheon supports the most recent release of WordPress via [upstream](https://github.com/pantheon-systems/WordPress), which includes platform integration plugins and a pre-configured wp-config.php.

## How does Pantheon work with DNS?

Pantheon can handle any internet domain name you point at it. DNS configuration is still your responsibility at this time, but our [going live](/docs/articles/going-live) instructions provide you with the necessary IP addresses and/or CNAME records to configure with your DNS provider.

In order for your site to begin "listening" for your domain, you must first become a paying customer. We consider placing a real domain on on a site to be the point at which the site starts to go live.

## How much does Pantheon cost?

Pantheon is free for developers. Our live site plans currently start as low as $25 monthly for personal sites, and $100 for professional sites. Learn more on [our pricing page](https://getpantheon.com/pricing).

## Can Pantheon run sites on highly available server clusters?

Yes. Pantheon sites run on a highly available clustered infrastructure. The primary upstream provider is Rackspace.

## Where are the Pantheon servers located?

All Pantheon servers are currently located in the United States. We have plans to expand to Europe, but we don't have an ETA for when they will be available for end-users.

## Can I use my own git repository (e.g github)?

Not at the moment, but we're looking for a way to support it that allows us to maintain tight integration with our workflow visualization and tools.

## Does Pantheon support Drupal Multisite?

No. Pantheon's architecture is designed to provide high performance and a rich feature set for individual Drupal sites. There are inherent risks when running multisite. Individual sites can end up in states of configuration that make module or Drupal core updates impossible to do across all the sites. The codebase also becomes a single point of failure.

Our solution is to deliver granular resources and powerful code management tools so that users who want to run a large portfolio of sites can do so easily, without running the risks inherent in multisite.

## Does Pantheon support WordPress Multisite?

No. While WordPress Mulitsites have been successfully installed on the Pantheon platform, it is not a supported development practice due to [known issues](/docs/articles/wordpress/wordpress-known-issues#site-networks-/-multisite).

## Does Pantheon support Drush?

Yes. Pantheon comes with Drush pre-integrated and with  [@alias files pre-generated for you](https://getpantheon.com/news/drush-aliases-available) to use in your local environment.

## Does Pantheon support WP-CLI?

Yes. [The Pantheon CLI (Terminus)](https://github.com/pantheon-systems/cli) incorporates WP-CLI commands so that users can perform operations on the Pantheon platform.

## Does Pantheon support local development?

Yes. Local development is a great best practice, and Pantheon supports a wide array of local development tools (e.g. MAMP, WAMP, Homebrew, etc).

## How does cron work with Drupal on Pantheon?

The plafrorm will use drush to run cron on an hourly basis automatically. More fine-tuned cron control is in development. If you need to run cron more frequently, you are free to do so using your own timing system and drush aliases.

## How does cron work with WordPress on Pantheon?


## Does Pantheon Have FTP or Shell access?

Pantheon supports toggling between local development mode using `git push` to transfer all code changes, and an on-server development mode, which provides access to the codebase via SFTP.

Direct SSH access is not supported, but you are able to directly interface with mysql, use drush, and SFTP files. Rsync is currently unstable on Pantheon. The engineering team is at work to improve its functionality on the platform.

## Can I run non Drupal applications on Pantheon?

This is not officially supported, but the PHP runtime is complete. Some users have experimented with running applications with custom PHP code.

## Do you support ffmpeg transcoding?

We don't currently have support for transcoding. We do not have plans to add this feature. However, it is possible to run a site on the platform and integrate with a third-party transcoding service.

## What version of Apache Solr does Pantheon run?

We're currently testing out integration strategies for Solr with our next-generation infrastructure. When we deploy it, it will almost certainly be the latest stable Solr available at that time.

## Is the Pantheon platform PCI compliant?

Because PCI certifications have yet to catch up to modern cloud infrastructures, Pantheon cannot currently offer PCI compliance out of the box. If this is a hard requirement for your project, please contact us to discuss details.

## How do I increase the maximum execution time limit for a PHP script?

The best way to do this by calling the PHP function set\_time\_limit() in your routine that takes more time. Function reference: http://php.net/manual/en/function.set-time-limit.php

## What is the difference between Pantheon v1 and v2?

Pantheon v1 (sometimes referred to as the "legacy" version) was launched in early 2011 and has been supporting live sites since the middle of that year. It has had several iterations of revision and is considered stable and secure for all but the most extreme use-cases.

Pantheon v2 is a complete rebuild of the platform, launched in October of 2011. It has many capabilities which were not possible in v1, as well as an improved dashboard and user-interface. New feature development is focused on the v2 product.

Live sites on Pantheon v1 will be supported as long as necessary, though we also support migrations if site-owners or developers are interested.

## How do I know if I am on v1 or v2?

Pantheon v1 is accessed via the bare \*getpantheon.com\* domain, and looks like this:

![v1 Example](https://pantheon-systems.desk.com/customer/portal/attachments/27145)

The v2 product is accessible via \*dashboard.getpantheon.com\* and looks like this:

![v2 screenshot](https://pantheon-systems.desk.com/customer/portal/attachments/27147)

Accounts between the two products are not linked. If you have sites on both, you will need to log into the dashboards separately.
