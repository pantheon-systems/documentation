---
title: Pantheon Advanced Page Cache Surrogate Key Limit Update
published_date: "2025-06-19"
categories: [drupal, modules]
---

This update on the [Pantheon Advanced Page Cache](https://www.drupal.org/project/pantheon_advanced_page_cache) Drupal module focuses on improving the functionality of the surrogate key header limit in your local development environment.

**Key Update**
Surrogate Key Header Limit Adjustment: To prevent header breaking and enhance the ease of work in your local environment, you now have the ability to override the surrogate key header limit. 

By default, this limit is set to 0 bytes. You can adjust this limit by adding the following line to your site's settings.php file:

```
$settings['pantheon_advanced_page_cache_header_limit'] = [your_desired_value];
```
Please note that the maximum value for this setting is capped at 25,000 bytes. Adjust the value as needed to suit your local development requirements.