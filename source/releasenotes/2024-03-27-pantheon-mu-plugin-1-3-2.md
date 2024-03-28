---
title: Pantheon MU Plugin v1.3.4 update
published_date: "2024-03-27"
categories: [wordpress, plugins]
---

On March 25, 2024, [it was announced in the WordPress development blog](https://make.wordpress.org/core/2024/03/25/wordpress-6-5-release-delayed-1-week/) that the default storage location for the Font Library (added in WordPress 6.5) will be `wp-content/uploads/fonts`. Previously, we had added a feature to our [Pantheon MU Plugin](https://github.com/pantheon-systems/pantheon-mu-plugin) to support the new Font Library feature by changing the previous default path (`wp-content/fonts`) to `wp-content/uploads/fonts`. This change to our MU plugin removes that override as it is no longer necessary. You can read more about the Font Library feature in our [guide to using the Font Library on Pantheon](/guides/wordpress-configurations/wordpress-font-library).