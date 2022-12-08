---
title: Date and Time
description: Configure your Pantheon Drupal or WordPress site with UTC time zone information.
tags: [services]
contenttype: [doc]
categories: [--]
newcms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-12-07"
---
Pantheon standardizes on [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), the primary time standard by which the world regulates clocks and time. This includes all servers, PHP, and MySQL, and cannot be changed.

Your Drupal or WordPress site can be configured to use any time zone that you need, and users can have their own distinct time zone preferences.

If you're looking to convert a UTC timestamp into your local time, try [https://www.epochconverter.com/](https://www.epochconverter.com/)

## MySQL and Time Zones

Pantheon provides [MySQL Server Time Zone support](https://dev.mysql.com/doc/refman/5.5/en/time-zone-support.html) to facilitate functions like [CONVERT\_TZ](https://dev.mysql.com/doc/refman/5.5/en/date-and-time-functions.html#function_convert-tz).
