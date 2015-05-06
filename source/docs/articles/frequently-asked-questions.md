---
title: Frequently Asked Questions
description: Answers to common questions about using Pantheon.
category:
  - getting-started
keywords: getting started, faqs, sites, pantheon, plans, developing, security
---
## Getting Started

### Can I put production sites on Pantheon?

Yes. Hundreds of live production sites run on Pantheon.

### What versions of Drupal does Pantheon support?

Pantheon supports Drupal 6 and 7, as well as development sandboxes for Drupal 8.

## What versions of WordPress does Pantheon support?

Pantheon supports the most recent release of WordPress via [upstream](https://github.com/pantheon-systems/WordPress), which includes platform integration plugins and a pre-configured wp-config.php.

### How much does Pantheon cost?

Pantheon is free for developers. Our live site plans currently start as low as $25 monthly for personal sites, and $100 for professional sites. Learn more on [our pricing page](https://getpantheon.com/pricing).

### Where are the Pantheon servers located?

All Pantheon servers are currently located in the United States. We have plans to expand to Europe, but we don't have an ETA for when they will be available for end-users.

### Can I run non Drupal applications on Pantheon?

This is not officially supported, but the PHP runtime is complete. Some users have experimented with running applications with custom PHP code.

### Does Pantheon have FTP or shell access?

Pantheon supports toggling between local development mode using `git push` to transfer all code changes, and an on-server development mode, which provides access to the codebase via SFTP.

Direct SSH access is not supported, but you are able to directly interface with mysql, use CLI tools ([Terminus](https://github.com/pantheon-systems/cli), [drush](/docs/articles/local/drush-command-line-utility/), [WP-CLI](#does-pantheon-support-wp-cli?)), and SFTP files. Rsync is currently unstable on Pantheon. The engineering team is at work to improve its functionality on the platform.

### How does Pantheon work with DNS?

Pantheon can handle any internet domain name you point at it. DNS configuration is still your responsibility at this time, but our [going live](/docs/articles/going-live) instructions provide you with the necessary IP addresses and/or CNAME records to configure with your DNS provider. Also see [Domains and SSL Tool](/docs/articles/sites/domains) for more information. 

In order for your site to begin "listening" for your domain, you must first become a paying customer. We consider placing a real domain on on a site to be the point at which the site starts to go live.


## Developing Sites

### Can Pantheon run sites on highly available server clusters?

Yes. Pantheon sites run on a highly available clustered infrastructure. The primary upstream provider is Rackspace.

### Can I use my own Git repository (e.g GitHub)?

Not at the moment, but we're looking for a way to support it that allows us to maintain tight integration with our workflow visualization and tools.

### Does Pantheon support Drupal Multisite?

No. Pantheon's architecture is designed to provide high performance and a rich feature set for individual Drupal sites. There are inherent risks when running multisite. Individual sites can end up in states of configuration that make module or Drupal core updates impossible to do across all the sites. The codebase also becomes a single point of failure.

Our solution is to deliver granular resources and powerful code management tools so that users who want to run a large portfolio of sites can do so easily, without running the risks inherent in multisite.

## Does Pantheon support WordPress Multisite?

No. While WordPress Mulitsites have been successfully installed on the Pantheon platform, it is not a supported development practice due to [known issues](/docs/articles/wordpress/wordpress-known-issues#site-networks-/-multisite).

### Does Pantheon support Drush?

Yes. Pantheon comes with Drush pre-integrated and with  [@alias files pre-generated for you](https://getpantheon.com/blog/drush-aliases-available) to use in your local environment.

## Does Pantheon support WP-CLI?

Yes. [Terminus](https://github.com/pantheon-systems/cli) incorporates WP-CLI commands so that users can perform operations on the Pantheon platform.

### Does Pantheon support local development?

Yes. Local development is a great best practice, and Pantheon supports a wide array of local development tools (e.g. MAMP, WAMP, Homebrew, etc).

### How does cron work with Drupal on Pantheon?

The plafrorm will use drush to run cron on an hourly basis automatically. More fine-tuned cron control is in development. If you need to run cron more frequently, you are free to do so using your own timing system and drush aliases.

### How does cron work with WordPress on Pantheon?

WordPress runs it's own internal cron-like system as visitors load your site. You can also use external services to schedule and create tasks, for more information see [Cron for WordPress](/docs/articles/wordpress/cron-for-wordpress).

### Do you support ffmpeg transcoding?

We don't currently have support for transcoding. We do not have plans to add this feature. However, it is possible to run a site on the platform and integrate with a third-party transcoding service.

### How do I increase the maximum execution time limit for a PHP script?

The best way to do this by calling the PHP function set\_time\_limit() in your routine that takes more time. Function reference: http://php.net/manual/en/function.set-time-limit.php

## Caching and Performance

### What version of Apache Solr does Pantheon run?

We're currently testing out integration strategies for Solr with our next-generation infrastructure. When we deploy it, it will almost certainly be the latest stable Solr available at that time.


## Debugging

### What support is available for Pantheon?

We provide support through this helpdesk, as well as public community support on [our Get Satisfaction site](http://help.getpantheon.com). For paid customers, we provide 24x7 platform-wide monitoring for Pantheon sites and technical support via priority support tickets and IRC. We also have enterprise support plans available that offer Service Level Agreements and 24x7 on-call support.

You can read more about our support offerings on [our pricing page](https://getpantheon.com/pricing).

## Security

### Is the Pantheon platform PCI compliant?

Because PCI certifications have yet to catch up to modern cloud infrastructures, Pantheon cannot currently offer PCI compliance out of the box. If this is a hard requirement for your project, please contact us to discuss details.
