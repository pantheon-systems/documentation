---
title: Integrated Composer
subtitle: Integrated Composer Support
description: Learn about support for Integrated Composer.
tags: [composer, workflow]
contributors: [ari, edwardangert]
reviewed: "2022-12-13"

showtoc: true
permalink: docs/guides/integrated-composer/ic-support
contenttype: [guide]
innav: [false]
categories: [dependencies]
cms: [drupal, wordpress]
audience: [development]
product: [composer]
integration: [--]
---

This section provides information on support for Integrated Composer.

## Pantheon Supports Composer 2

The version of Composer on the platform is Composer 2.

Some packages are not compatible with Composer 2. If you encounter a build error that instructs you to contact [Support](/guides/support/contact-support), validate the package version's compatibility locally first, and check Drupal's [Preparing your site for Composer 2](https://www.drupal.org/docs/develop/using-composer/preparing-your-site-for-composer-2#s-composer-plugins) documentation for packages that have already been identified.

## Pantheon's Scope of Support for Composer

Pantheon supports the version of Composer integrated into the Pantheon platform and available for use with all Drupal 8+ and WordPress sites. Pantheon’s support for Composer is limited to the application level, and any Composer scripts or modifications made with a Composer script are outside the [Pantheon Scope of Support](/guides/support/).

## More Resources

- [Composer Fundamentals and WebOps Workflows](/guides/composer)

- [Use Integrated Composer with WordPress](/guides/wordpress-composer/wordpress-ic)