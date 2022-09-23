---
title: September 2022 Changelog
changelog: true
description: September 2022 Pantheon changelog
reviewed: "2022-09-01"
---

## Platform Improvements

### Drupal 9.4.5

[Drupal 9.4.5](https://www.drupal.org/project/drupal/releases/9.4.5) is available for production sites. is available for production sites. This is a patch (bugfix) release of Drupal 9 and is ready for use on production sites.

### PHP 8.1

PHP 8.1 is now [recommended](https://pantheon.io/docs/php-versions) for Drupal sites greater than or equal [9.3.0](https://www.drupal.org/docs/system-requirements/php-requirements#versions) as an underlying bug with ProxySql was fixed in [version 2.4.3](https://proxysql.com/blog/releasing-proxysql-v2-4-3/). PHP 8.1 was updated on the platform to include this fix.

### WordPress 6.0.2

[WordPress 6.0.2](https://wordpress.org/news/2022/08/wordpress-6-0-2-security-and-maintenance-release/) is currently available on the Pantheon platform. This release features nearly a thousand enhancements and bug fixes. Because this is a security release, it is recommended that you update your sites immediately. The next major release will be version 6.1 which is planned for late 2022.


### WordPress Composer Managed Upstream in Early Access

The Pantheon-maintained WordPress Composer Managed upstream is available for [Early Access](https://pantheon.io/docs/oss-support-levels#early-access) participants. This upstream leverages [Bedrock](https://roots.io/bedrock/), a WordPress-specific framework for using Composer on WordPress sites. Complete the [request form](https://docs.google.com/forms/d/e/1FAIpQLSe5WvxnzA7_U7B4clhhIYsPxI7DXkmQC-Y8J6pXmrbHYPzviw/viewform) if you are interested in participating in this Early Access offering.


## Documentation

[Advanced Global CDN](/guides/agcdn) - AGCDN is now in General Availability and allows for advanced site management, enhanced security, and custom WAF. You can review the [AGCDN case study](https://pantheon.io/blog/fight-cyberattacks-advanced-global-cdn) for a real-life example of an AGCDN implementation.

[Create a Composer-managed WordPress Site with Bedrock](/guides/wordpress-composer/wordpress-composer-managed) - WordPress does not natively support [Composer](https://getcomposer.org/), however, [Bedrock](https://roots.io/bedrock/) is a WordPress-specific framework for using Composer on WordPress sites. You can create a site based on the Pantheon-maintained [WordPress Composer Managed](https://github.com/pantheon-upstreams/wordpress-composer-managed) upstream. Bedrock installs WordPress as a required package so updates can be managed by Composer. The WordPress Composer Managed upstream is available for [Early Access](https://pantheon.io/docs/oss-support-levels#early-access) participants. Learn more about [Bedrock and Composer-managed WordPress sites](/guides/wordpress-composer/wordpress-composer-managed#more-resources).

[Environment Configuration](/guides/environment-configuration) - Learn about [environment configurations](/guides/environment-configuration#code-and-configuration-in-separate-environments) on Pantheon in our new accessible guide. Each site on Pantheon comes with three environments: Dev, Test, and Live. This allows you to develop and test features without impacting your Live site. Additional development environments are available with [Multidev](/guides/multidev). Refer to the [Pantheon WebOps Workflow](/pantheon-workflow) documentation for more details.

