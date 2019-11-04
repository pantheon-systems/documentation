---
title: Basic Troubleshooting 
description: Common first-step practices to troubleshoot misbehaving sites.
categories: [wordpress, drupal]
contributors: [alexfornuto, eabquina, carlalberto]
---

This page is a collection of common troubleshooting tactics, curated from our Customer Success Engineers. These procedures can help you solve issues your site may have, or at the very least rule out potential causes.

## Pantheon Dashboard
In general, if the Pantheon Dashboard stops responding, the first step is to refresh the page. But note that doing so after executing a change may cause that process to be run twice (CONFIRM WITH PRODUCT). The next step is to log out and back in to the Site Dashboard. If the problem persists, [contact support](/support/)

### HTTPS Issues
When resolving issues with Pantheon's [HTTPS](/https/) certificates, a good first step is to remove and re-add the domain, which will restart the certificate provisioning process.

## WordPress
### White Screen of Death (WSOD)
The **WSOD** is a frustrating issue on WordPress sites, since it provides no useful information on the cause. The first place you should look for information is the [log files](/logs/). See [PHP Errors and Exceptions](https://pantheon.io/docs/php-errors) for more information on the type of errors you may find.

### Disable All Plugins
If your WordPress site exhibits unwanted behavior and you're not sure of the cause, try disabling all your plugins. If the behavior stops, turn the plugins back on one by one, checking after each one to identify the culprit.

### Disable Plugins Incrementally

## Drupal 7

## Drupal 8

