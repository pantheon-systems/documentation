---
title: Unsupported Modules and Plugins
description: An up-to-date list of Drupal modules and WordPress plugins Pantheon does not support.
keywords: modules, plugins, unsupported, drupal, wordpress
---
This article lists modules and plugins that do not work with or are currently unsupported on the Pantheon platform.

##Drupal Modules

- APC

- Adaptive Image Styles

- Background Process  
**Issue**: The module allows for Drupal to perform "parallel" (asynchronous non-blocking mode) requests. However, there are a number of limitations working in a distributed environment and function correctly on the platform.

- Backup & Migrate

- Boost

- Cache Expiration

- HTTPRL  
**Issue**: This module can severely impact performance. This may be the result of module code or its configuration on the platform that results in the spikes.

- IMCE

- Media: Browser Plus - tmp

- Media: Filesystem /tmp

- Mollom  
 **Issue**: Cookies break Varnish.

- Pathologic  
 **Issue**: The path of the base URL is changed and cached by the module itself.  
 **Solution**: The [documentation on Drupal.org](https://drupal.org/node/257026) for the module mentions the issues and the remedy, which is a cache clear operation. If you are unable to exclude cached data from your dumps or avoid migrating cache data, you should clear your site’s cache after importing the data.

- Plupload - tmp directory

- Registry Rebuild  
This is built into the Pantheon platform.

- Schema  
**Issue**: The module doesn't work with the MySQL TIMESTAMP column type in our heartbeat table, which is part of how we maintain status around whether or not a site and its database is active. This is a [known bug](https://drupal.org/node/468644) in the schema module.  
**Solution**: Set a variable to suppress the error, [shown here](http://drupalcode.org/project/schema.git/blob/08b02458694d186f8ab3bd0b24fbc738f9271108:/schema.module#l372). Setting the variable `schema_suppress_type_warnings` to **true** will do it. You can achieve that by adding the following line to `settings.php`:  
   ```
   $conf[‘schema_suppress_type_warnings’] = TRUE;
   ```

- Taxonomy CSV - tmp directory  
  **Issue**: The problem is that with multiple application servers as exists on your Live environment, Drupal assumes the `tmp` directory will be on the same application container. However, as we run a distributed application container matrix, the `/tmp` directory is not shared.  
  **Solution**: You can try using the `sites/default/files/tmp` directory, as this will be shared between all the environments and can essentially serve the same purpose as the `/tmp` directory. If you need a shared location that doesn’t provide any public access to the files, we recommend using a tmp directory within the private files directors: `sites/default/files/private/tmp`.

- Varnish

- Views Exports  
 **Issue**: The distributed system means that requests are spread between all of the available application servers which is part of how we help sites scale. However, the `tmp/` directory on one instance is not able to access the `tmp/` resources on another application server. Rather than file disappearing, the subsequent request is handled by a different application server.  
 **Solution**: Avoid using the `tmp/` directory on the default server that the batch API uses, and create a `tmp/` directory within `sites/default/files/`. That is a network file mount and common to all of the application servers. It should allow you to get more consistency when requests come in, but the default `tmp/` path for that functionality will need to be changed.

##WordPress Plugins

- [WP Super Cache](https://wordpress.org/plugins/wp-super-cache/)

- [W3 Total Cache](https://wordpress.org/plugins/w3-total-cache/)

- [batcache](https://wordpress.org/plugins/batcache/)
