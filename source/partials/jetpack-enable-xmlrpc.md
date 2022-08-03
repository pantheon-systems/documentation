1. Modify your site's `pantheon.yml` file to [allow access](/pantheon-yml#protected-web-paths-override) to the `xmlrpc.php` path:

  ```yml:title=pantheon.yml
  protected_web_paths_override: true
  protected_web_paths:
    - /private
    - /wp-content/uploads/private
  ```

 This will maintain the normal security settings for other paths, but allows access for XMLRPC. Follow the remaining steps below to block all requests to the `xmlrpc.php` file EXCEPT those added to your IP address allowlist. 

1. Add [Jetpack IP addresses](https://jetpack.com/support/how-to-add-jetpack-ips-allowlist/) to the [is_from_trusted_ip function](/guides/redirect/advanced#restrict-access-to-paths-based-on-ip) of your `wp-config.php` file.

1. Change your `disallow_uri` array to:

  ```php
  $disallow_uri = array(
          '/wp-login.php',
          '/wp-admin/',
          '/xmlrpc.php',
      ); 
  ```