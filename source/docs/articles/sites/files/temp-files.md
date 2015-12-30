---
title: Temporary File Management with Multiple Application Containers
description: Learn how to work with temporary files in distributed environments.
category:
- getting-started
keywords: tmp, temp files, tmp files, temporary files, multiple application containers, distributed environments
---
Live sites on Professional plans and above have multiple [application containers](/docs/articles/sites/all-about-application-containers).  Pantheon's distributed system means that requests are spread between all of the available application servers, which is part of how we help the site scale. However, the `/tmp` directory on one instance is not able to access the `/tmp` resources on another application server. There are several solutions available that allow you to upload files and create temporary directories on Pantheon.

## Plupload

 [Plupload](http://www.plupload.com/) is a multi-runtime file uploader and has been used successfully with the Pantheon platform. To do so, change the default upload directory from `tmp` to `private://tmp` in  `filefield_sources_plupload.module`. You may also need to add this line to run through `files/private/tmp` every few hours and delete old files to keep it from piling up:   
 `$temp_destination = file_stream_wrapper_uri_normalize('private://tmp/' . $filename);`  
 This will move the temporary upload destination from the individual server mount `tmp` directory to the shared `mount tmp files/private/tmp directory`, which should preserve the files between requests.

## Specify a Single Appserver

 This method allows you to set a specific appserver until the job is complete.  
 Steps:  
 1.  
 2.  
 3.


## Create a Common Directory

Create a `tmp` directory within the network file mount, which is common across all application containers. Use the following code when applicable to write temporary resources to shared directories:

**Drupal**: `public://sites/default/files/tmp`  
**WordPress**: `public://wp-content/uploads/tmp`

This will allow for consistent execution of requests to temporary files for sites with more than one application container.

## Manage Private Temporary Files
To manage your temporary files privately and reliably when multiple application containers are required to process the request, add this to your code: `private://tmp`

<div class="alert alert-danger" role="alert">
<strong>Note</strong>: Avoid using the <code>temporary://</code> scheme. Temporary files written during a batch process will not be available for processing by other application servers, and the process will fail.</div>

The filesystem settings are set at bootstrap when a request is processed by Drupal. The `public://`, `private://`, and `temporary://` are set dynamically depending on the application server that receives the `$_PRESSFLOW` settings variable.

For sites with multiple application container hosts, this value will change. Refresh the page and this value should change on the Live environment.

## Create a Directory for Web Servers
When the `tmp/` path points to the server `/tmp` directory, it is not accessible by the web server on an application server. You'll need to set the path within files to something like:

`/srv/bindings/2976a45d0d6644caaead02e2cde9a55e/tmp`

<div class="alert alert-warning" role="alert">
<strong>Note</strong>: Remember to change the path depending on the value assigned by your server. However, that path is not accessible from other application servers. If you need a shared location that every server can access, we recommend using a temp directory within the files directory for plup, such as <code>private://tmp</code> or <code>public://tmp</code>.</div>
