---
title: Pantheon Advanced Page Cache Drupal Module Surrogate Key Limit Update
published_date: "2025-07-03"
categories: [drupal, modules]
---

Version 2.3.3 of the [Pantheon Advanced Page Cache](https://www.drupal.org/project/pantheon_advanced_page_cache) Drupal module adds support for overriding the surrogate key header size limit to better support local development environments.

**Key Update**
Surrogate Key Header Limit Adjustment: To prevent header breaking and enhance the ease of work in your local environment, you now have the ability to override the surrogate key header limit. 

By default, this limit is set to 25,000 bytes. You can adjust this limit by adding the following line to your site's pantheon.yml file:

```
$settings['pantheon_advanced_page_cache_header_limit'] = [your_desired_value];
```
Note that setting the value to zero is not allowed; in such cases, it will default to 25,000 bytes. Additionally, the maximum allowed value for this setting is 25,000 bytes. You may adjust the value as needed to meet your local development needs.