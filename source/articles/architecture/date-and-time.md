---
title: Date and Time
filename: source/_tools/date-and-time.md
tool_type:
  -
tool_url:
tool_image:
draft: true
---

Pantheon standardizes on [Coordinated Universal Time (UTC)](http://en.wikipedia.org/wiki/Coordinated_Universal_Time), the primary time standard by which the world regulates clocks and time. This includes all servers, PHP, and MySQL, and cannot be changed.

Your Drupal site can be configured to use any time zone that you need, and users can have their own distinct time zone preferences. To learn more, see the Drupal.org article on [date locale and timezone settings](https://drupal.org/node/767182).

If you're looking to convert a UTC timestamp into your local time, try  [http://www.epochconverter.com/](http://www.epochconverter.com/)

## MySQL and Time Zones

Pantheon provides [MySQL Server Time Zone support](http://dev.mysql.com/doc/refman/5.5/en/time-zone-support.html) to facilitate functions like [CONVERT\_TZ](http://dev.mysql.com/doc/refman/5.5/en/date-and-time-functions.html#function_convert-tz).
