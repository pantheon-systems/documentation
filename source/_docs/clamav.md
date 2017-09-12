---
title: Enabling ClamAV for WordPress or Drupal
description: Learn how to protect your site against malicious files with malware and other potential threats using ClamAV, an open source antivirus engine.
tags: [clamav, security, files]
categories: [security]
---

## What is ClamAV? ##

ClamAV® is an open source antivirus engine for detecting trojans, viruses, malware & other malicious threats. It supports multiple file formats, file and archive unpacking, and multiple signature languages.

A file may look like a normal JPG or PDF file, but may actually be malware that run scripts within your site. They may come from files that have been uploaded via fields, attachments or other media forms. These will end up in your public files directory and might cause alerts, harm site SEO scores, make data be compromised or lower site credibility.

There are available modules or plugins that will let you use ClamAV. Pantheon servers have the ClamAV binary installed already, and it will scan every file uploaded. Although this would slow down the upload process because of the scanning, the benefit is that it would provide better security and would ultimately be a good practice for every site.

## How to install ClamAV? ##

Because the ClamAV binary is already installed on Pantheon servers, all you need to do is install the available modules and plugins. 

### [ClamAV Module for Drupal 7 & 8](https://www.drupal.org/project/clamav) ###

Download the module via Terminus Drush

```terminus drush <site-name>.<env> -- dl clamav```

And then Enable the site

```
terminus drush <site-name>.<env> -- en clamav -y
terminus drush <site-name>.<env> -- vset clamav_mode 1
```


### [Upload Scanner for WordPress](https://wordpress.org/plugins/upload-scanner) ###

Download and install the plugin via Terminus and WP CLI 

```terminus wp <site-name>.<env> -- install upload-scanner --activate```

## Known Issues ##

After installation, make sure to Clear Caches via your Site Dashboard.
