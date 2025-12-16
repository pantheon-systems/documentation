---
title: Pantheon Advanced Page Cache 2.3.4 for Drupal now available
published_date: "2025-11-07"
categories: [drupal, modules]
---

The latest update to the [Pantheon Advanced Page Cache](https://www.drupal.org/project/pantheon_advanced_page_cache) Drupal module includes a change regarding module compatibility to ensure the best performance for your site.

## Key Update 

The BigPipe module is fundamentally incompatible with the architecture of Pantheon's Global CDN and the functionality provided by Pantheon Advanced Page Cache module. To improve site reliability, the module will now automatically disable BigPipe when Pantheon Advanced Page Cache is enabled.

If the BigPipe module is somehow enabled after PAPC is installed, a clear error message will now be displayed on the Drupal Status Report page (/admin/reports/status). 

This warning clearly highlights the fatal incompatibility and the risk of site errors.
