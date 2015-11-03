---
title: Reading Pantheon Environment Configuration
description: Learn about the separation of configuration and code within the Pantheon Website Management Platform's runtime container environment.
category:
  - going-live
keywords: environment config, env config, environment configuration, database credentials, db credentials, container, containers, $_ENV, wp-config.php, database error, db errors, superglobal, redis auth, redis authentication, runtime, runtime container, runtime container environment, runtime matrix
---
Pantheon promotes the separation of configuration and code, especially where security is a concern. You should never copy/paste credentials from your Dashboard into any of your sites code.

Database credentials, Redis authentication, and other configuration data is provided as part of the runtime container environment. It is present in PHP's `$_ENV` superglobal.

    <?php var_dump($_ENV); ?>
    array(13) {
      ["FRAMEWORK"]=>
      string(7) "drupal"
      ["DOCROOT"]=>
      string(1) "/"
      ["FILEMOUNT"]=>
      string(19) "sites/default/files"
      ["DRUPAL_HASH_SALT"]=>
      string(44) "xCoEVpEAOYv0OhG6QIpr+Z+oDIV+qwGcz79AAGssLlA="
      ["DB_HOST"]=>
      string(9) "XXX.XXX.XXX.XXX"
      ["DB_PORT"]=>
      string(5) "XXXXXX"
      ["DB_USER"]=>
      string(8) "pantheon"
      ["DB_PASSWORD"]=>
      string(32) "XXXXXXXXXXXXXXXXX"
      ["DB_NAME"]=>
      string(8) "pantheon"
      ["PANTHEON_SITE"]=>
      string(36) "97cf724f-fbe9-49ba-81be-1a3ab4807b98"
      ["PANTHEON_SITE_NAME"]=>
      string(15) "development-demo"
      ["PANTHEON_ENVIRONMENT"]=>
      string(3) "dev"
      ["PANTHEON_INFRASTRUCTURE_ENVIRONMENT"]=>
      string(6) "live"
    }

If you are using a common CMS framework, the code you need to load this configuration and boot your app should already be pre-configured. However, if you need to do something custom, you can work with environmental configuration directly.

For debugging Drupal modules and plugins and for some custom coding, you may need to know the values available in the `$_ENV` variable.  We do not encourage the use of the `$_ENV` variable except in certain instances, e.g. redirects. If a module or plugin is not behaving as expected, reviewing this output versus the value the module/plugin is using may be beneficial. Use `$_ENV` whenever possible.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
The `$_ENV` variable contains sensitive data about a site and should not be publicly exposed. In the same way that you would not leave the output of `phpinfo();` displayed on a site, don't leave this open to public viewing. </div>


This is an example from a Wordpress site homepage:

    <?php var_dump($_ENV);  ?>
    array(63) {
      ["SERVER_SOFTWARE"]=>
      string(11) "nginx/1.4.7"
      ["REQUEST_URI"]=>
      string(1) "/"
      ["USER"]=>
      string(32) "non-static-binding-string-inserted-here"
      ["HOME"]=>
      string(46) "/srv/bindings/non-static-binding-string-inserted-here"
      ["FCGI_ROLE"]=>
      string(9) "RESPONDER"
      ["QUERY_STRING"]=>
      string(0) ""
      ["REQUEST_METHOD"]=>
      string(3) "GET"
      ["CONTENT_TYPE"]=>
      string(0) ""
      ["CONTENT_LENGTH"]=>
      string(0) ""
      ["SCRIPT_NAME"]=>
      string(10) "/index.php"
      ["DOCUMENT_URI"]=>
      string(10) "/index.php"
      ["DOCUMENT_ROOT"]=>
      string(51) "/srv/bindings/non-static-binding-string-inserted-here/code"
      ["SERVER_PROTOCOL"]=>
      string(8) "HTTP/1.1"
      ["GATEWAY_INTERFACE"]=>
      string(7) "CGI/1.1"
      ["REMOTE_ADDR"]=>
      string(12) "72.188.192.8"  <= NOT A SITE IP ADDRESS
      ["REMOTE_PORT"]=>
      string(5) "55982"
      ["SERVER_ADDR"]=>
      string(13) "10.223.192.37"  <= NOT A SITE IP ADDRESS
      ["SERVER_PORT"]=>
      string(5) "11846"
      ["SERVER_NAME"]=>
      string(31) "endpointe7208f3b.chios.panth.io"
      ["REDIRECT_STATUS"]=>
      string(3) "200"
      ["PATH_INFO"]=>
      string(0) ""
      ["PATH_TRANSLATED"]=>
      string(51) "/srv/bindings/non-static-binding-string-inserted-here/code"
      ["HTTPS"]=>
      string(3) "OFF"
      ["SCRIPT_FILENAME"]=>
      string(62) "/srv/bindings/non-static-binding-string-inserted-here/code//index.php"
      ["HTTP_HOST"]=>
      string(25) "example-wp-site.pantheon.io"
      ["HTTP_USER_AGENT"]=>
      string(120) "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko)         Chrome/46.0.2490.80 Safari/537.36"
      ["HTTP_ACCEPT"]=>
      string(74) "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
      ["HTTP_ACCEPT_ENCODING"]=>
      string(4) "gzip"
      ["HTTP_ACCEPT_LANGUAGE"]=>
      string(14) "en-US,en;q=0.8"
      ["HTTP_COOKIE"]=>
      string(8) "has_js=1"
      ["HTTP_DNT"]=>
      string(1) "1"
      ["HTTP_SURROGATE_CAPABILITY"]=>
      string(16) "styx=\"ESI/1.0\""
      ["HTTP_UPGRADE_INSECURE_REQUESTS"]=>
      string(1) "1"
      ["HTTP_USER_AGENT_HTTPS"]=>
      string(3) "OFF"
      ["HTTP_X_FORWARDED_FOR"]=>
      string(26) "72.188.192.8, 72.188.192.8"
      ["HTTP_X_PANTHEON_CLIENT_IP"]=>
      string(12) "72.188.192.8"
      ["HTTP_X_PANTHEON_STYX"]=>
      string(1) "1"
      ["HTTP_X_PROTO"]=>
      string(7) "http://"
      ["HTTP_X_VARNISH"]=>
      string(9) "258415472"
      ["PHP_SELF"]=>
      string(10) "/index.php"
      ["REQUEST_TIME_FLOAT"]=>
      string(15) "1446580110.8389"
      ["REQUEST_TIME"]=>
      string(10) "1446580110"
      ["PRESSFLOW_SETTINGS"]=>
      string(1123) "{\"conf\":{\"pressflow_smart_start\":true,\"pantheon_binding\":\"non-static-binding-string-inserted-here\",\"pantheon_site_uuid\":\"pantheon-site-id-string-inserted-here\",\"pantheon_environment\":\"dev\",\"pantheon_tier\":\"live\",\"pantheon_index_host\":\"index.live.getpantheon.com\",\"pantheon_index_port\":449,\"redis_client_host\":null,\"redis_client_port\":null,\"redis_client_password\":null,\"file_public_path\":\"sites/default/files\",\"file_private_path\":\"sites/default/files/private\",\"file_directory_path\":\"sites/default/files\",\"file_temporary_path\":\"/srv/bindings/non-static-binding-string-inserted-here/tmp\",\"file_directory_temp\":\"/srv/bindings/non-static-binding-string-inserted-here/tmp\",\"css_gzip_compression\":false,\"js_gzip_compression\":false,\"page_compression\":false},\"databases\":{\"default\":{\"default\":{\"host\":\"10.223.176.250\",\"port\":19154,\"username\":\"pantheon\",\"password\":\"password-string-inserted-here\",\"database\":\"pantheon\",\"driver\":\"mysql\"}}},\"drupal_hash_salt\":\"8b6aa967f43e5d739ef284f21def9afd774284e09e45945e3b047ff2a28f2a0b\",\"config_directory_name\":\"config\"}"
      ["FRAMEWORK"]=>
      string(9) "wordpress"
      ["DOCROOT"]=>
      string(1) "/"
      ["FILEMOUNT"]=>
      string(18) "wp-content/uploads"
      ["AUTH_KEY"]=>
      string(44) "Gzm8PoSyFjxyvkZbtDkwRqz5OiIoVFt/TsgVOmzGjL0="
      ["SECURE_AUTH_KEY"]=>
      string(44) "PU+vjoXTBtMY6H97KmtCyAhzS8knh8fRpqrUMuNPGv8="
      ["LOGGED_IN_KEY"]=>
      string(44) "PvoF0lLfvt6Hted/1PHmnu3VOhXNDWIYlqxynDN2qdA="
      ["NONCE_KEY"]=>
      string(44) "cEmspKRVWm9cbf9sEvzOT+VJXLt1iocCcQmmO+xnJ5k="
      ["AUTH_SALT"]=>
      string(44) "25+LnHUXKJJ+qX28kpsfO/vGNZt4n7spMqBZATvV0fI="
      ["SECURE_AUTH_SALT"]=>
      string(44) "34XUC5d+WMXNqq5c4id4hWAzO9+A6dEQ3ZtSrUOvMbo="
      ["LOGGED_IN_SALT"]=>
      string(44) "zT/qgzJNm8IEugsqbN44YBcmyIw3GljZcm/lQgruvK4="
      ["NONCE_SALT"]=>
      string(44) "6zVCyohehJbyq0dxPLunEBDeRvmpfdEOzP56DTsmcgc="
      ["DB_HOST"]=>
      string(14) "10.223.176.250"
      ["DB_PORT"]=>
      string(5) "19154"
      ["DB_USER"]=>
      string(8) "pantheon"
      ["DB_PASSWORD"]=>
      string(32) "password-string-inserted-here"
      ["DB_NAME"]=>
      string(8) "pantheon"
      ["PANTHEON_SITE"]=>
      string(36) "pantheon-site-id-string-inserted-here"
      ["PANTHEON_SITE_NAME"]=>
      string(9) "example-wp-site"
      ["PANTHEON_ENVIRONMENT"]=>
      string(3) "dev"
      ["PANTHEON_INFRASTRUCTURE_ENVIRONMENT"]=>
      string(4) "live"
    }




## Drupal 7 and Drupal 8

<div class="alert alert-warning" role="alert">
<h4>Note</h4>
Unless you're implementing Domain Access, using something other than the standard bootstrap process, or performing Drupal core development, you won't need to manually read the environment configuration. See <a href="/docs/articles/drupal/configuring-settings-php">configuring settings.php</a> for details.</div>

Pantheon uses Pressflow to automatically read the environmental configuration. If you're working with vanilla Drupal or want to pass the credentials and configuration such as the database credentials and temporary directory location to another application, you'll need to manually extract the configuration. In Drupal, this is done in settings.php.

    <?php
    extract(json_decode($_ENV['PRESSFLOW_SETTINGS'], TRUE));

## Drupal 6

    <?php
    $settings = json_decode($_ENV['PRESSFLOW_SETTINGS'], TRUE);
    $db = $settings['databases']['default']['default'];
    // You can do the following on one line. It's broken in two here for readability.
    $db_url = $db['driver'] . '://' . $db['username'] . ':' . $db['password'];
    $db_url .= '@' . $db['host'] . ':' . $db['port'] . '/' . $db['database'];
    $conf = $settings['conf'];

## Domain Access

Place [Domain Access setup routine](http://drupal.org/node/1096962) at the **end** of settings.php. For example, for Drupal 7:

    // All Pantheon Environments.
    if (defined('PANTHEON_ENVIRONMENT')) {

      // Extract Pantheon environmental configuration for Domain Access
      extract(json_decode($_ENV['PRESSFLOW_SETTINGS'], TRUE));
      // All $conf variables and Redis configuration go after extract()

      // If using Redis add appropriate settings per https://pantheon.io/docs/articles/sites/redis-as-a-caching-backend#using-redis-with-drupal-7.x-and-6.x

      // Add other $conf variables, for example for Fast 404 pages

      /**
       * Add the domain module setup routine to the end of settings.php
       */
      include DRUPAL_ROOT . '/sites/all/modules/domain/settings.inc';
    }


## WordPress

Pantheon's default `wp-config.php` includes code to read from the `$_ENV` superglobal so no additional configuration should be required.

For more information, see [configuring wp-config.php](/docs/articles/wordpress/configuring-wp-config-php).
