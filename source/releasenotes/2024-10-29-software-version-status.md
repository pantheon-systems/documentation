---
title: New Site Status block for Software Versions
published_date: "2024-10-29"
categories: [new-feature, security]
---

* new status block for viewing a site's software versions. this helps customers know if their site is currently running end-of-life software
    * access through Pantheon Dashboard > Site > Status tab
* the block currently shows PHP & Solr status.
* PHP -- versions PHP 8.0 and below are end-of-life. We suggest upgrading to PHP 8.2 or above https://docs.pantheon.io/guides/php/php-versions
* Solr -- we offer version 3 and 8. Version 3 is end-of-life. Upgrade to version 8 for full security coverage. https://docs.pantheon.io/guides/solr-drupal/solr-drupal#configure-the-version 
    * We're working on D7 solr 8 compatibility coming soon
* Redis version is not currently displayed in this module, but we also recommend upgrading to Redis 6.2 https://docs.pantheon.io/pantheon-yml#specify-a-redis-version 

# 

We have rolled out a new **Site Status Block** to improve visibility into software versions, helping customers track whether their site’s software is end-of-life (EOL).

### Features and Access
- **Location**: Access the status block via **Pantheon Dashboard** > **Site** > **Status**.
- **Software Coverage**: The block shows version information for **PHP** and **Solr**.

### PHP Version Status
- PHP 8.0 and below are [end-of-life](https://www.php.net/supported-versions.php). [Upgrade to PHP 8.2](https://docs.pantheon.io/guides/php/php-versions) or above for full security coverage.

### Solr Version Status
- Pantheon provides Solr versions 3 and 8. Version 3 is end-of-life. We recommend [upgrading to Solr 8](https://docs.pantheon.io/guides/solr-drupal/solr-drupal#configure-the-version). Solr 8 support for Drupal 7 is in progress.

### Redis Recommendation
- Redis versions aren’t shown in the new block currently, but we recommend [upgrading to Redis 6.2](https://docs.pantheon.io/pantheon-yml#specify-a-redis-version).

This addition helps you easily monitor and maintain your site's software for improved performance and security.

![new software versions module on site status page](../images/software-version-status.png)
