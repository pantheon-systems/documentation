---
title: Enabling ClamAV for WordPress or Drupal
description: Learn how to protect your site against malicious files with malware and other potential threats using ClamAV, an open source antivirus engine.
tags: [clamav, security, files]
categories: [security]
---

## What is ClamAV?

**ClamAV** is an open source antivirus engine for detecting trojans, viruses, malware & other malicious threats. It supports multiple file formats, file and archive unpacking, and multiple signature languages.

A file that may look like a normal JPG or PDF file may actually be malware that run scripts within your site. They may come from files that have been uploaded via fields, attachments or other media forms. These may end up in your public files directory and might cause alerts, harm site SEO scores, compromise data, and or lower site credibility.

Pantheon servers have the ClamAV binary installed already. There are modules or plugins available for WordPress and Drupal that will use the binary. Once active, it will scan every file uploaded. Although this would slow down the upload process, the benefit of better security makes it a good practice for every site.

## Install ClamAV

Because the ClamAV binary is already installed on Pantheon servers, all you need to do is install the available modules and plugins.

<!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
    <!-- Active tab -->
    <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">WordPress</a></li>
    <!-- 2nd Tab Nav -->
    <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal</a></li>
  </ul>

<!-- Tab panes -->
<div class="tab-content">
<!-- Active pane content -->
<div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">
[Upload Scanner for WordPress](https://wordpress.org/plugins/upload-scanner){.external}

Download and install the plugin via [Terminus](/docs/terminus/):

```
terminus wp <site-name>.<env> -- install upload-scanner --activate
```
</div>


<!-- 2nd pane content -->
<div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
[ClamAV Module for Drupal 7 & 8](https://www.drupal.org/project/clamav){.external}

1. Download the module via [Terminus](/docs/terminus/):

   ```
   terminus drush <site-name>.<env> -- dl clamav
   ```

2. Enable the module, and set the mode to executable:

    ```
    terminus drush <site-name>.<env> -- en clamav -y
    terminus drush <site-name>.<env> -- vset clamav_mode 1
    ```
</div>
</div>



## Known Issues

After installation, make sure to clear your sites cache via the Site Dashboard.
