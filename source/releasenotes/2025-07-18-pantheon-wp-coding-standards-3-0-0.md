---
title: "Pantheon WP Coding Standards 3.0.0 is now available"
published_date: "2025-07-18"
categories: [tools-apis,wordpress]
---

We have released [version 3.0.0](https://github.com/pantheon-systems/pantheon-wp-coding-standards/releases/tag/3.0.0) of the Pantheon WP Coding Standards. This is a major release that adds new sniffs for use of the PHP `rename()` function, [which is not supported on Pantheon](/guides/filesystem/files-directories#renamemove-files-or-directories), and commenting.

The [Pantheon WP Coding Standards](https://github.com/pantheon-systems/pantheon-wp-coding-standards) are a set of custom rules for PHP_CodeSniffer that help developers write maintainable code that is compatible with Pantheon’s platform. They are not used by default in Pantheon’s WordPress sites, but can be installed and configured to run in your local development environment or CI/CD pipelines and are actively used by the [WordPress plugins](https://profiles.wordpress.org/getpantheon/#content-plugins) that Pantheon maintains.

For a full list of changes in this release, please refer to the [3.0.0 release notes](https://github.com/pantheon-systems/pantheon-wp-coding-standards/releases/tag/3.0.0). Learn more about our Pantheon WP Coding Standard in [our video on YouTube](https://www.youtube.com/watch?v=WpxG7TJAFhU).