---
title: Early Access: Free HTTPS
earlyaccess: true
description: Upgrade to Free HTTPS on the Pantheon Global Edge.
---
Upgrade eligible sites to the new Pantheon Global Edge for access to free HTTPS across all domains and environments. This service allows for automatic certificate provisioning and renewal for all domains routed to any Pantheon environment using the recommended DNS values provided in the Site Dashboard.

Free HTTPS is currently invite only. The upgrade procedures do not cause downtime or HTTPS interruption.

## Upgrade Your Site
1. From the User or Organization Dashboard, select a site that shows **HTTPS Upgrade** as available.
2. Click the **Start HTTPS Upgrade** button to begin the certificate provisioning and deployment process across all environments, including Multidevs.

    You will receive an email once this process is complete, which can take up to an hour.

    The **HTTP Status** within the site's **Domains & HTTPS** tab is automatically updated once the certificate is deployed to indicate additional action required.

3. Click **Show DNS Recommendations** next to each of the domains indicating action required and configure DNS as recommended using the provided values.

    <div markdown="1" class="alert alert-danger">
    ### Warning {.info}
    **Pantheon does not register domains or host/manage DNS.** You will need to make these changes yourself at the registrar and/or DNS host for the domain.
    </div>

    The **HTTPS Status** is automatically updated once all domains are correctly routed to Pantheon using the provided DNS values.

4. Standardize traffic across a common URL for the Live environment (either `https://www.example.com` or `https://example.com`) in addition to Dev, Test, and Multidev environments using 301 redirects. The best way to do this on Pantheon is to make use of our environment variables within `settings.php` or `wp-config.php`:

    ```php
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
    	(php_sapi_name() != "cli")) {
        if ($_ENV['PANTHEON_ENVIRONMENT'] === 'dev'):
          /** Replace dev.example.com with domain added to the dev environment */
          $domain = 'dev.example.com';
        elseif ($_ENV['PANTHEON_ENVIRONMENT'] === 'test'):
          /** Replace test.example.com with domain added to the test environment */
          $domain = 'test.example.com';
        elseif ($_ENV['PANTHEON_ENVIRONMENT'] === 'live'):
          /** Replace www.example.com with domain added to the live environment */
          $domain = 'www.example.com';
        else:
          # Fallback value for multidev or other environments.
          # This covers environment-sitename.pantheonsite.io domains
          # that are generated per environment.
          $domain = $_SERVER['HTTP_HOST'];
        endif;
    	if ($_SERVER['HTTP_HOST'] != $domain ||
    			!isset($_SERVER['HTTP_X_SSL']) ||
    			$_SERVER['HTTP_X_SSL'] != 'ON' ) {
    		header('HTTP/1.0 301 Moved Permanently');
    		header('Location: https://' . $domain . $_SERVER['REQUEST_URI']);
    		exit();
    	}
    }
    ```

    Redirecting www to non-www, or vice versa on Live, optimizes SEO by avoiding duplicate content and prevents session strangeness, where a user can be signed on one domain but logged out of other domains at the same time.

## Frequently Asked Questions
### Which sites are eligible for upgrade?
Currently, Professional sites that have custom domains routed to a legacy HTTPS-terminating load balancer are eligible for upgrade.

If you have HTTPS enabled on a site that does not show as eligible, ensure that DNS for custom domains is routed per the DNS recommendations shown on the environment's **Domains & HTTPS** tool within the Site Dashboard.

### Does upgrading involve interruption in HTTPS availability or downtime?
No, upgrading existing domains already routed to Pantheon involves no downtime or HTTPS interruption.

If you add a new domain after upgrading, however, then it can take a few hours for certificates to be issued and deployed after you route DNS to your Pantheon site, so there will be no downtime, but there will be an interruption of HTTPS availability.

### What level of encryption is provided?
TLS 1.2 encryption with up-to-date ciphers. For a deep analysis of the HTTPS configuration on sites using the Pantheon Global Edge, see this [SSL Report](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

### What browsers and operating systems are supported?
All modern browsers and operating systems are supported. For details, see the **Handshake Simulation** portion of an [SSL Report for a site running on the new Pantheon Global Edge](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io) and the  [Certificate Compatibility](https://letsencrypt.org/docs/certificate-compatibility/) resource from Let’s Encrypt.


### Is Extended Validation supported?
No, please contact us if you require Extended Validation.

### Are wildcard certificates supported?
No, but you don’t need a wildcard certificate to secure communications for multiple domains because we will automatically deploy certificates for all domains on your site

### Is the CDN configurable? Do I get access to hit rates or other statistics?
We manage the CDN so you don’t have to hassle with configuration. We’ve optimized configuration for Drupal and WordPress sites. Hit rates or other statistics are not currently available.

### What is a shared certificate?
Shared certificates use a Subject Alternative Name (SAN) certificate to host multiple hostnames or domains on one certificate. You provide your domain name list or one or more wildcard domain name entries. We add these domain names to our certificate SAN field and take care of certificate administration.

### What is TLS?
TLS (Transport Layer Security) is a protocol for secure HTTP connections. This protocol replaces its less secure predecessor, the SSL (Secure Socket Layer) protocol, which we no longer support. Pantheon uses the term HTTPS to refer to secure HTTP connections.

### Does the Pantheon Global Edge use Server Name Indication (SNI)?

### Can I downgrade back to the legacy HTTPS loadbalancer?
