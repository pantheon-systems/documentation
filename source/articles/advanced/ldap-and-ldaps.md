---
title: LDAP and LDAPS
description: Configure LDAP on your Pantheon site.
category:
  - getting-started
slug: "sites/code"

---

## LDAP as a Provider  

This not available on Pantheon. For sites at the Enterprise plan level that need a secure tunnel between your firewall, contact your sales representative regarding [Pantheon Enterprise Gateway](https://www.getpantheon.com/pantheon-enterprise-gateway).

## LDAP as a Consumer  

Using LDAP as a consumer of services is supported on the platform and will work at all plan levels, assuming correct configuration. The implementation and configuration details will be up to the user as not all _instances_ can be supported.

[Lightweight Directory Access Protocol](http://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) (LDAP) provides access and maintenance of a distributed directory storing organized sets of records. LDAP is often used for single sign-on authentication, and many Drupal sites on Pantheon use LDAP and LDAPS for authentication. Authentication requests will originate from Pantheon to the LDAP server used (outbound from Pantheon).  

PHP on Pantheon includes LDAP using OpenLDAP, so no changes to the platform are necessary in order to enable LDAP on your Pantheon Drupal site.  

Users have reported success using [https://drupal.org/project/ldap](https://drupal.org/project/ldap) and [https://drupal.org/project/simple\_ldap](https://drupal.org/project/simple_ldap) to connect to LDAP servers, including Active Directory.

**Note:** Pantheon does not support IP authentication schemes. We recommend certificate-based authentication to be compatible with distributed application servers.

## OpenLDAP Configuration for Client Certificates for LDAPS

Developers do not have access to edit the OpenLDAP ldap.conf configuration. Instead, LDAP configuration can be specified using the function [putenv()](http://php.net/manual/en/function.putenv.php).  

If your LDAP server uses security certificate(s), place them in the [private file directory](/documentation/running-drupal/private-files/) in your codebase:

    SITEROOT/private

Then, specify the location of the certificate file(s) in sites/default/settings.php using putenv. You may need some or all of these settings depending on your configuration. If you don't need a particular settings, don't include it; there's a strong probability that unnecessary directives will prevent communication. Therefore, use your best judgement and knowledge of your infrastructure and choose accordingly.  

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

Additional configurations, such as whether to perform server certificate checks, can also be specified using putenv.

    // LDAP - Never perform server certificate check in a TLS session.
    putenv('LDAPTLS_REQCERT=never');

For general information about implementing LDAPS, see [https://drupal.org/node/1404368](https://drupal.org/node/1404368) and [https://drupal.org/node/1302032](https://drupal.org/node/1302032)

For more information about working with settings.php, see [configuring settings.php](/documentation/howto/configuring-settings-php/).

## Frequently Asked Questions

#### How can I make changes to the OpenLDAP configuration file?

Users do not have access to make modifications to ldap.conf. Instead, use putenv within settings.php as described above.

#### Is ldap\_sso supported?

The ldap\_sso submodule from the suite of modules included in [https://drupal.org/project/ldap](https://drupal.org/project/ldap) is not supported. We do have PHP with LDAP support. Any authentication through LDAP will need to be PHP-based and not webserver-based.  

## Troubleshooting

The majority of problems with LDAP on Pantheon come from misconfigurations. Pantheon does not filter or block LDAP or LDAPS traffic and does not utilize a firewall to restrict traffic between your Pantheon environment and your locally hosted server.  

The following script has been used to troubleshoot a variety of configuration problems. Customize it with your settings, then place it in your site root with a name like ldap-test.php. You can execute it remotely using drush to fully bootstrap Drupal and include the environmental configurations from your settings.php:

    drush @pantheon.SITENAME.ENV scr ldap-test.php

The entire script:

    <?php
    $settings = array(
      'NAME' => array(
        'hostname' => 'ldaps://HOSTNAME:PORT/',
        'port' => 'PORT',
        'bind_rdn' => 'uid=...',
        'bind_password' => '...',
        'base_dn' => 'ou=...',
        'filter' => '(uid=...)',
        'attributes' => array('cn'),
      ),
    );


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
      echo "Attempting to connect to {$setting['hostname']} on port {$setting['port']}." . PHP_EOL;


      $link_identifier = ldap_connect($setting['hostname'], $setting['port']);
      if (!$link_identifier) {
        echo 'Unable to connect - ' . ldap_error($link_identifier) . PHP_EOL;
        continue;
      }


      echo 'Connected.' . PHP_EOL;


      ldap_set_option($link_identifier, LDAP_OPT_PROTOCOL_VERSION, 3);
      ldap_set_option($link_identifier, LDAP_OPT_REFERRALS, 0);


      echo "Attempting to bind with rdn {$setting['bind_rdn']} and password {$setting['bind_password']}." . PHP_EOL;
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
