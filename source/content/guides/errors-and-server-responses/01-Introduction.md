---
title: Errors and Server Responses
subtitle: Introduction
description: Detailed information on your Pantheon site's server responses and error messages.
tags: [services]
categories: [platform]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/errors-and-server-responses
anchorid: errors-and-server-responses
---

Error messages in the cloud are served when Pantheon is unable to fulfill a request. These messages cannot be customized for a particular site because of the low-level nature of these errors, and the fact that changes are system-wide, not site specific.

There are some extreme circumstances where these error messages can be inadvertently triggered by your site code without an actual server error. Monitor plugins or modules that integrate external applications closely, such as [services](https://www.drupal.org/project/services) for Drupal.

[Contact support](/guides/support/contact-support/) if you think that you reached one of these messages in error, and be sure to provide the full URL and the circumstances which led to the error.

## Error Messages

Review the [4xx errors page](/guides/errors-and-server-responses/4xx-errors) for 400 level error explanations and the [5xx errors page](/guides/errors-and-server-responses/5xx-errors) for 500 level error explanations.

## More Resources

- [PHP Errors and Exceptions](/guides/php/php-errors)

- [Database Connection Errors](/database-connection-errors)

- [Timeouts on Pantheon](/timeouts)