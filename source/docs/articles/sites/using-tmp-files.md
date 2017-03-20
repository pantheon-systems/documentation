---
title: Temporary File Management with Multiple Application Containers
description: Instructions for using temporary files in distributed environments.
category:
- getting-started
keywords: tmp, temp files, tmp files, temporary files, mulitiple application containers, distributed environments
---
Live sites on Professional plans and above have multiple [Application Containers](/docs/articles/sites/all-about-application-containers).  Pantheon's distributed system means that requests are spread between all of the available application servers, which is part of how we help the site scale. However, the `/tmp` directory on one instance is not able to access the `/tmp` resources on another application server. The solution is to create a common, or shared, directory within the file mount which is accessible by all environments.

## Create a Common Directory

Create a `tmp/` directory within the network file mount, which is common across all application containers. Use the following code when applicable to write temporary resources to shared directories:

**Drupal**: `public://sites/default/files/tmp`  
**WordPress**: `public://wp-content/uploads`

This will allow for consistent execution of requests to temporary files for sites with more than one application container.

## Private Temporary Files
To manage your temporary files privately and reliably for when multiple application containers are required to process the request, add this to your code: `private://tmp`

<div class="alert alert-danger" role="alert">
<strong>Note</strong>: Avoid using the <code>temporary://</code> scheme. Temporary files written during a batch process will not be available for processing by other application servers, and the process will fail.</div>

The filesystem settings are set at bootstrap when a request is processed by Drupal. The `public://`, `private://`, and `temporary://` are set dynamically depending on the application server that receives the `$_PRESSFLOW` settings variable.

For sites with multiple application container hosts, this value will change. Refresh the page and this value should change on the Live environment.

##Create a Directory for Web Servers
When the `tmp/` path points to the server `/tmp` directory, it is not accessible by the web server on an application server. You'll need to set the path within files to something like:

`/srv/bindings/2976a45d0d6644caaead02e2cde9a55e/tmp`

<div class="alert alert-warning" role="alert">
<strong>Note</strong>: Remember to change the path depending on the value assigned by your server. However, that path is not accessible from other application servers. If you need a shared location that every server can access, we recommend using a temp directory within the files directory for plup, such as <code>private://tmp</code> or <code>public://tmp</code>.</div>

##Troubleshooting
###ReduxFramework/Theme Issues
You may receive errors if you are writing:  
- sess_*files to the `/tmp` directory on application endpoints  
- files names with the format googlefonts###.tmp to the server’s root `/tmp` directory

This seems to be related to a site's theme, which appears to be based on the ReduxFramework. Please try the recommendations suggested in this [redux-framework thread](https://github.com/reduxframework/redux-framework/issues/1383) so the theme won't write temporary files to the server `/tmp` directory. The Redux maintainer suggests installing the Redux Framework plugin or manually updating redux within your theme.
