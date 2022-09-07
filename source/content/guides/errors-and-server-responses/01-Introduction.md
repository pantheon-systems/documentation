---
title: Errors and Server Responses
subtitle: Introduction
description: Learn more about errors and server responses on Pantheon.
tags: [services]
categories: [platform]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/errors-and-server-responses
anchorid: errors-and-server-responses
---

Pantheon serves error messages when a request cannot be fulfilled. These error messages cannot be customized for a particular site because of the low-level nature of these errors, and the fact that changes are system-wide, not site specific.

There are some extreme circumstances in which these error messages can be inadvertently triggered by your site code without an actual cloud server error. You should monitor plugins or modules that integrate with external applications closely, such as [services](https://www.drupal.org/project/services) for Drupal, to learn to distinguish actual errors from false alarms.

[Contact support](/guides/support/contact-support/) if you think that you reached one of these messages in error, and be sure to provide the full URL and the circumstances which led to the error.

## Error Messages

Review the [4xx errors page](/guides/errors-and-server-responses/4xx-errors) for 400 level error explanations and the [5xx errors page](/guides/errors-and-server-responses/5xx-errors) for 500 level error explanations.

## More Resources

- [PHP Errors and Exceptions](/guides/php/php-errors)

- [Database Connection Errors](/database-connection-errors)

- [Timeouts on Pantheon](/timeouts)