---
title: Enabling ClamAV for WordPress or Drupal
description: Learn how to protect your site against malicious files with malware and other potential threats using ClamAV, an open source antivirus engine.
tags: [clamav, security, files]
categories: [security]
---

**ClamAV** is an open source antivirus engine for detecting trojans, viruses, malware & other malicious threats. It supports multiple file formats, file and archive unpacking, and multiple signature languages.

A file that may look like a normal JPG or PDF file may actually be malware that run scripts within your site. They may come from files that have been uploaded via fields, attachments or other media forms. These may end up in your public files directory and might cause alerts, harm site SEO scores, compromise data, and or lower site credibility.

## Install ClamAV

<div class="alert alert-export" role="alert">
<h4 class="info">Exports</h4>
<p markdown="1">This process uses [Terminus](/docs/terminus/) commands. Before we begin, set the variables `$site` and `$env` in your terminal session to match your site name and the Dev environment:
<pre>
<code class="bash">export site=yoursitename
export env=dev
</code></pre>
</p>
</div>

Because the ClamAV binary is already installed on Pantheon servers, all you need to do is install one of the available modules or plugins.

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
Use the [Upload Scanner for WordPress](https://wordpress.org/plugins/upload-scanner){.external} plugin, which you can install through the [WordPress dashboard](/docs/cms-admin/#wordpress-dashboard) in [SFTP mode](/docs/cms-admin/#sftp-mode), on your local dev environment, or through [Terminus](/docs/terminus/):

```bash
terminus wp $site.$env -- install upload-scanner --activate
```
</div>


<!-- 2nd pane content -->
<div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
[ClamAV Module for Drupal 7 & 8](https://www.drupal.org/project/clamav){.external}

1. Download the module via [Terminus](/docs/terminus/):

   ```bash
   terminus drush $site.$env -- dl clamav
   ```

2. Enable the module and set the scan method to daemon mode:

    ```bash
    terminus drush $site.$env -- en clamav -y
    terminus drush $site.$env -- vset clamav_mode 0
    ```

3. From the module's configuration page, set the hostname to `localhost` and the port number to `3310`.
</div>
</div>



## Known Issues

After installation, make sure to clear your sites cache via the Site Dashboard.
