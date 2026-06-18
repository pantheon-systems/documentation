---
contenttype: [partial]
categories: [config]
cms: [wordpress]
product: [--]
integration: [integration]
tags: [--]
reviewed: "2022-11-03"
---

1. Modify your site's `pantheon.yml` file to [allow access](/pantheon-yml#protected-web-paths-override) to the `xmlrpc.php` path:

  ```yml:title=pantheon.yml
  protected_web_paths_override: true
  protected_web_paths:
    - /private
    - /wp-content/uploads/private
  ```

 This will maintain the normal security settings for other paths, but allows access for XMLRPC. Follow the remaining steps below to block all requests to the `xmlrpc.php` file EXCEPT those added to your IP address allowlist.

1. Add [Jetpack IP addresses](https://jetpack.com/support/how-to-add-jetpack-ips-allowlist/) to the [is_from_trusted_ip function](/guides/redirect/advanced#restrict-access-to-paths-based-on-ip) of your `wp-config.php` file.

1. Add `/xmlrpc.php` to your `disallow_uri` array, for example:

  ```php
  $disallow_uri = array(
          '/xmlrpc.php',
      );
  ```

  The [reference code](/guides/redirect/advanced#restrict-access-to-paths-based-on-ip) demonstrates IP based restrictions in context of locking down admin paths (like `/wp-admin/` and `/wp-login.php`). While locking down admin paths is a best practice, it may not fit all site use cases and it is not required in order to solve this specific Jetpack issue. If you opt to keep admin paths in the `$disallow_uri` array you will need to add IP addresses for yourself and every site administrator to the `$trusted_ips` array in addition to the Jetpack IPs added in the previous step. 
