---
title: Frequently Asked Questions
description: Frequently asked questions about Drupal or WordPress sites on Pantheon.
category:
  - getting-started
keywords: getting started, faqs, sites, pantheon, plans, developing, security
---
## Getting Started

### Can I put production sites on Pantheon?

Yes. Thousands of live production sites run on Pantheon.

### What versions of Drupal does Pantheon support?

Pantheon supports Drupal 6, 7, and 8 sites.

### What versions of WordPress does Pantheon support?

Pantheon supports the most recent release of WordPress via [upstream](https://github.com/pantheon-systems/WordPress), which includes platform integration plugins and a pre-configured wp-config.php.

### How much does Pantheon cost?

Pantheon is free for developers. Our live site plans currently start as low as $25 monthly for personal sites, and $100 for professional sites. Learn more on [our pricing page](https://pantheon.io/pricing).


### Where are the Pantheon servers located?

All Pantheon servers are currently located in the United States. We have plans to expand to Europe, but we don't have an ETA for when they will be available for end-users.

You can use a [CDN](/docs/articles/drupal/content-delivery-network-cdn-for-file-distribution/) for rapidly serving files from multiple locations. In most cases, sites running on Pantheon in the U.S. perform faster than sites running on local hosting, even if the user is halfway around the world.

Transatlantic hops in are usually 200-300ms, while Pantheon can usually speed up site page load times by seconds.

### Can I run other applications on Pantheon?

Only WordPress and Drupal applications are officially supported, but the PHP runtime is complete. Some users have experimented with running applications with custom PHP code.

### Does Pantheon have FTP or shell access?

Pantheon supports toggling between local development mode using `git push` to transfer all code changes, and an on-server development mode, which provides access to the codebase via SFTP.

Direct SSH access is not supported, but you are able to directly interface with mysql, use CLI tools ([Terminus](/docs/articles/local/cli/), [drush](/docs/articles/local/drupal-drush-command-line-utility/), [WP-CLI](/docs/articles/frequently-asked-questions#does-pantheon-support-wp-cli%3F), and SFTP files.


### How does Pantheon work with DNS?

Pantheon can handle any domain name you point at it, however DNS configuration is still your responsibility. For more information, see [Domains](/docs/articles/sites/domains/) and [Going Live](/docs/articles/going-live/).

## Developing Sites

#### Does Pantheon offer professional services?
No. Pantheon provides an infrastructure for professional web developers at agencies and development shops everywhere. We do not build sites or offer professional services. There is a rich ecosystem of Pantheon partners who provide Drupal and WordPress services. See the [Pantheon Partner Directory](https://www.pantheon.io/partners) for more information.

### Can Pantheon run sites on highly available server clusters?

Yes. Pantheon sites run on a highly available clustered infrastructure. The primary upstream provider is Rackspace.

### Can I use my own Git repository (e.g GitHub)?

Not at the moment, but we're looking for a way to support it that allows us to maintain tight integration with our workflow visualization and tools.

### Does Pantheon support Drupal Multisite?

No. Pantheon's architecture is designed to provide high performance and a rich feature set for individual Drupal sites. Individual sites can end up in states of configuration that make module or Drupal core updates impossible to do across all the sites. The codebase also becomes a single point of failure.

Our solution is to deliver granular resources and powerful code management tools so that users who want to run a large portfolio of sites can do so easily, without running the risks inherent in multisite.

### Does Pantheon support WordPress Multisite?
Yes, Pantheon supports the following use cases of [WordPress Site Networks](/docs/articles/wordpress/site-networks) created by WordPress' Multisite feature:

- Blogs for faculty at a university
- Franchise sites under a parent organization site
- Sections within a media publication

### Does Pantheon support Drush?

Yes. Pantheon comes with Drush pre-integrated with `@alias` files. For more details, see [Drupal Drush Command-Line Utility](/docs/articles/local/drupal-drush-command-line-utility/).

### Does Pantheon support WP-CLI?

Yes. You can invoke WP-CLI commands on Pantheon sites using [Terminus](/docs/articles/local/cli/), the Pantheon CLI.

### Does Pantheon support local development?

Yes. [Local development](/docs/articles/local) is a great best practice, and Pantheon supports a wide array of local development tools (e.g. MAMP, WAMP, Homebrew, etc).

### How does cron work with Drupal on Pantheon?

The platform will use Drush to run cron on an hourly basis automatically. More fine-tuned cron control is in development. If you need to run cron more frequently, you are free to do so using your own timing system and Drush aliases.

### How does cron work with WordPress on Pantheon?

WordPress runs its own internal cron-like system as visitors load your site. You can also use external services to schedule and create tasks. For more information, see [Cron for WordPress](/docs/articles/wordpress/cron-for-wordpress).

### Do you support ffmpeg transcoding?

No. We do not have plans to add this feature. However, it is possible to run a site on the platform and integrate with a third-party transcoding service.

### How do I increase the maximum execution time limit for a PHP script?

The best way to do this by calling the PHP function [set\_time\_limit()](http://php.net/manual/en/function.set-time-limit.php) in your routine that takes more time.

## Caching and Performance

### What version of Apache Solr does Pantheon run?

We're currently testing out integration strategies for Solr with our next-generation infrastructure. When we deploy it, it will almost certainly be the latest stable Solr available at that time.


## Support

### What support is available for Pantheon?

For paid customers, we provide 24x7 platform-wide monitoring for Pantheon sites and technical support via priority support tickets. We also have Elite plans available that offer Service Level Agreements and 24x7 on-call support.

Read more about [getting support](https://pantheon.io/docs/articles/getting-support/) and our support offerings on [our pricing page](https://pantheon.io/pricing).


## Security

### Is the Pantheon platform PCI compliant?

Because PCI certifications have yet to catch up to modern cloud infrastructures, Pantheon cannot currently offer PCI compliance out of the box. If this is a hard requirement for your project, please contact us to discuss details.
