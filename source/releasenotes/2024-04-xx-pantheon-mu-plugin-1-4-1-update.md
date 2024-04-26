---
title: Pantheon MU Plugin v1.4.1 update
published_date: "2024-04-2x"
categories: [wordpress, plugins]
---

The latest [1.4.1 release](https://github.com/pantheon-systems/pantheon-mu-plugin/releases) of the Pantheon MU Plugin updates the recommended configuration for  WordPress multisite to handle PHP warnings that the array key `HTTP_HOST` is undefined. This change follows the best practice of checking if the key is set before using it. For more information, refer to our [WordPress Multisite configuration guide](/guides/multisite/config).