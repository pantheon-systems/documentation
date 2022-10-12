---
title: LDAP and LDAPS
description: Detailed information on how to configure LDAP and LDAPS on your Pantheon Drupal or WordPress website.
categories: [integrate]
tags: [code, modules, plugins, security]
---
[Lightweight Directory Access Protocol](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) (LDAP) as a provider is not available on Pantheon. For sites at the Elite plan level that need a secure tunnel between your firewall, contact your sales representative regarding [Pantheon Secure Integration](https://pantheon.io/features/secure-integration).

## LDAP as a Consumer

LDAP provides access and maintenance of a distributed directory storing organized sets of records. Using LDAP as a consumer of services is supported on the platform and will work at all plan levels, assuming correct configuration. The implementation and configuration details are up to the user as not all instances are supported.

PHP on Pantheon includes LDAP using OpenLDAP, so no changes to the platform are necessary in order to enable LDAP on your Pantheon site.

<Alert title="Note" type="info">

Pantheon supports IP-based defense-in-depth firewall configuration schemes *only* when implemented as part of a [Pantheon Secure Integration](/guides/secure-development/secure-integration) configuration. We recommend certificate-based authentication to be compatible with distributed application containers.

</Alert>

### Drupal
Users have reported success using [https://drupal.org/project/ldap](https://drupal.org/project/ldap) and [https://drupal.org/project/simple\_ldap](https://drupal.org/project/simple_ldap) to connect to LDAP servers, including Active Directory.

### WordPress
WordPress has several [LDAP plugins](https://wordpress.org/plugins/search.php?q=LDAP) available. One of the most popular is [Simple LDAP Login](https://wordpress.org/plugins/simple-ldap-login/). It provides you with all the configuration options needed, including the ability to specify an alternate port to run on.

## OpenLDAP Configuration for Client Certificates for LDAPS

Developers do not have access to edit the OpenLDAP ldap.conf configuration. Instead, specify LDAP configuration with the function [putenv()](https://secure.php.net/manual/en/function.putenv.php).

If your LDAP server uses security certificate(s), place them in the [private file directory](/guides/secure-development/private-paths) in your codebase: `SITEROOT/private`.

Then, specify the location of the certificate file(s) in `sites/default/settings.php` using `putenv`. You may need some or all of these settings depending on your configuration. If you don't need a particular settings, don't include it; there's a strong probability that unnecessary directives will prevent communication. Therefore, use your best judgement and knowledge of your infrastructure and choose accordingly.  For more information about working with `settings.php`, see [configuring settings.php](/guides/php/settings-php).

Ensure that your certificates do **not** have a password. There is an extremely strong probability that these certificates are different than the certificates used to secure a site environment using HTTPS. If you're unsure, check with your sever administrator to make sure that you are using the correct TLS certificates to communicate with your LDAP server.

    // LDAP - specify file that contains the TLS CA Certificate.
    // Can also be used to provide intermediate certificate to trust remote servers.
    $tls_cacert = __DIR__ . '/../../private/ca.crt';
    if (!file_exists($tls_cacert)) die($tls_cacert . ' CA cert does not exist');
    putenv("LDAPTLS_CACERT=$tls_cacert");


    // LDAP - specify file that contains the client certificate.
    $tls_cert = __DIR__ . '/../../private/client.crt';
    if (!file_exists($tls_cert)) die($tls_cert . ' client cert does not exist');
    putenv("LDAPTLS_CERT=$tls_cert");


    // LDAP - specify file that contains private key w/o password for TLS_CERT.
    $tls_key = __DIR__ . '/../../private/client.key';
    if (!file_exists($tls_key)) die($tls_key . ' client key does not exist');
    putenv("LDAPTLS_KEY=$tls_key");

You can also specify additional configurations with putnev, such as whether to perform server certificate checks.

    // LDAP - Allow server certificate check in a TLS session.
    putenv('LDAPTLS_REQCERT=allow');


## Frequently Asked Questions

### How can I make changes to the OpenLDAP configuration file?

Users do not have access to make modifications to `ldap.conf`. Instead, use `putenv` within `settings.php` as described above.

### Is ldap_sso supported?

The ldap\_sso submodule from the suite of modules included in [https://drupal.org/project/ldap](https://drupal.org/project/ldap) is not supported. We do have PHP with LDAP support. Any authentication through LDAP needs to be PHP-based and not web server-based.

### Does Secure Integration work with LDAP?

WordPress and Drupal both work with the [Pantheon Secure Integration](/guides/secure-development/secure-integration). If you’re using the Drupal 7 LDAP module, apply the [patch](https://www.drupal.org/files/issues/ldap_php-constant-port_1.patch) prepared by one of our engineers [listed on Drupal.org](https://www.drupal.org/node/2283273). The patch allows the use of a PHP constant for the port number, and gives a good example should you need to write a similar patch for another module.

## Troubleshooting

The majority of problems with LDAP on Pantheon come from misconfigurations. Pantheon does not filter or block LDAP or LDAPS traffic and does not utilize a firewall to restrict traffic between your Pantheon environment and your locally hosted server.

Use the following script to troubleshoot a variety of configuration problems. Customize it with your settings, then place it in your site root with a name like ldap-test.php. This script requires PHP 7.1 to execute properly without PHP errors. If you are connecting via a Pantheon Secure Integration, use the alternate $settings array below the full script instead.  You can execute it remotely using [Terminus](/terminus) to fully bootstrap Drupal and include the environmental configurations from your settings.php:

```bash
terminus drush <site>.<env> -- scr ldap-test.php
```

The entire script:

```php
<?php

$settings = array(
  'NAME' => array(
    'host' => 'ldaps://HOSTNAME:PORT/',
    'port' => 'PORT',
    'bind_rdn' => 'CN=value,OU=value,DC=value,DC=value', //This should be the full rdn and not just the username.
    'bind_password' => '...',
    'display_password' => 'XxXxXxX',  //display an alternate value for security
    'base_dn' => 'OU=value,DC=value,DC=value', //This may be a comma-separated list of values.
    'filter' => '(objectClass=user)', //Could be an alternate objectClass or a uid
    'attributes' => array('cn'),
  ),
);

ldap_set_option(NULL, LDAP_OPT_DEBUG_LEVEL, 7);
ldap_set_option(NULL, LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option(NULL, LDAP_OPT_REFERRALS, 0);
ldap_set_option(NULL, LDAP_OPT_X_TLS_REQUIRE_CERT, LDAP_OPT_X_TLS_ALLOW);


// Custom OpenLDAP Configuration for Client Certificates for LDAPS
// Un-comment lines that you may need for configuration

// LDAP - specify file that contains the TLS CA Certificate.
// Can also be used to provide intermediate certificate to trust remote servers.
# $tls_cacert = __DIR__ . '/../../private/ca.crt';
# if (!file_exists($tls_cacert)) die($tls_cacert . ' CA cert does not exist');
# putenv("LDAPTLS_CACERT=$tls_cacert");

// LDAP - specify file that contains the client certificate.
# $tls_cert = __DIR__ . '/../../private/client.crt';
# if (!file_exists($tls_cert)) die($tls_cert . ' client cert does not exist');
# putenv("LDAPTLS_CERT=$tls_cert");

// LDAP - specify file that contains private key w/o password for TLS_CERT.
# $tls_key = __DIR__ . '/../../private/client.key';
# if (!file_exists($tls_key)) die($tls_key . ' client key does not exist');
# putenv("LDAPTLS_KEY=$tls_key");

// LDAP - Allow server certificate check in a TLS session.
# putenv('LDAPTLS_REQCERT=allow');


echo 'LDAPTLS_CERT=' . getenv('LDAPTLS_CERT') . PHP_EOL;
if (getenv('LDAPTLS_CERT')) {
  echo ' hash: ' . exec('openssl x509 -noout -hash -in ' . getenv('LDAPTLS_CERT')) . PHP_EOL;
}
echo 'LDAPTLS_CACERT=' . getenv('LDAPTLS_CACERT') . PHP_EOL;
if (getenv('LDAPTLS_CACERT')) {
  echo ' hash: ' . exec('openssl x509 -noout -hash -in ' . getenv('LDAPTLS_CACERT')) . PHP_EOL;
}
echo 'LDAPTLS_CACERTDIR=' . getenv('LDAPTLS_CACERTDIR') . PHP_EOL;
echo 'LDAPTLS_REQCERT=' . getenv('LDAPTLS_REQCERT') . PHP_EOL;


foreach ($settings as $host => $setting) {
  echo PHP_EOL;
  echo "Attempting to connect to {$setting['host']} on port {$setting['port']}. " . PHP_EOL;

  $resolved_port = $setting['port'];
  if (!is_numeric($resolved_port)) {
    // If it's a string, then attempt to use it as the name of a PHP constant.
    $resolved_port = constant($resolved_port);
  }

  $resolved_address = $setting['host'];
  // PHP ldap_connect function ignores the port option if scheme is
  // included in the host, so we must appened port number to the 'address'
  if (strpos($resolved_address, 'ldap') !== false) {
    $resolved_address = $resolved_address . ":" . $resolved_port;
  }

  $link_identifier = ldap_connect($resolved_address, $resolved_port);

  if (!$link_identifier) {
    echo 'Unable to connect - ' . ldap_error($link_identifier) . PHP_EOL;
    continue;
  }

  echo 'Connected.' . PHP_EOL;

  ldap_set_option($link_identifier, LDAP_OPT_PROTOCOL_VERSION, 3);
  ldap_set_option($link_identifier, LDAP_OPT_REFERRALS, 0);


  echo "Attempting to bind with rdn {$setting['bind_rdn']} and password {$setting['display_password']}." . PHP_EOL;
  if (!ldap_bind($link_identifier, $setting['bind_rdn'], $setting['bind_password'])) {
    echo 'Unable to bind - ' . ldap_error($link_identifier) . PHP_EOL;
    ldap_unbind($link_identifier);
    continue;
  }


  echo 'Bind succeeded.' . PHP_EOL;


  echo "Attempting to search with base_dn {$setting['base_dn']}, filter {$setting['filter']} and attributes " . var_export($setting['attributes'], TRUE) . PHP_EOL;
  $search_result_identifier = ldap_search($link_identifier, $setting['base_dn'], $setting['filter'], $setting['attributes']);
  if (!$search_result_identifier) {
    echo 'Unable to search - ' . ldap_error($link_identifier) . PHP_EOL;
    ldap_unbind($link_identifier);
    continue;
  }


  echo 'Search succeeded.' . PHP_EOL;


  $entries = ldap_get_entries($link_identifier, $search_result_identifier);
  var_dump($entries);
}
```

Alternate $settings array when using Secure Integration:

```php

<?php
$settings = array(
  'NAME' => array(
    'host' => 'ldaps://127.0.0.1', //when using Secure Integration, this is localhost
    'port' => PANTHEON_SOIP_EXAMPLE, //when using Secure Integration, this is the PHP CONSTANT
    'bind_rdn' => '<insert-bind-dn>', //e.g. CN=usename,CN=value,DC=value,DC=value,DC=value
    'bind_password' => '<insert-password>',
    'display_password' => 'Pxxxxxxx',  //display an alternate value for security
    'base_dn' => 'OU=value,dc=value,dc=value,dc=value',
    'filter' => '(objectClass=user)', //Could be an alternate objectClass or a uid
    'attributes' => array('cn'),
  ),
);
```
