---
title: Enable Secure HTTPS Communication
description: Learn how to implement secure HTTPS communication and utilize a static IP address.
category:
  - developing
  - launch
keywords: secure https, https, security, encryption, add ssl cert, add https, add encryption, dns, csr, generate csr, generate key, update dns for ssl, ssl certificate types, ssl cert types,  ssl provider, intermediary ssl, intermediary ssl cert, intermediary ssl certificate
---
HTTPS is a standard for establishing an encrypted link between your Pantheon site and a client (e.g. web browser). You should enable HTTPS on a custom domain, e.g., www.example.com, if you are transmitting any sensitive data. Google takes this a step further, and recommends [protecting all of your websites with HTTPS](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https?hl=en). Loading a valid OpenSSL certificate into a Pantheon environment provisions an HTTPS load balancer with a dedicated IP address, allowing secure communication over HTTPS. All traffic within the Pantheon infrastructure, from Varnish to application containers, is encrypted.

Adding HTTPS to your site is a completely self-serve option; Pantheon does not provide private keys or certificate signing requests (CSRs), or any SSH login for you to generate these. The key and certificates are cryptographically sensitive elements that you should not send through email, as cleartext is very insecure.

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
Enable HTTPS before updating DNS. HTTPS for custom domains is available for Professional plans and above. All plans can <a href="/docs/guides/ssl-with-cloudflare/">enable HTTPS with Cloudflare's Universal SSL</a>.</div>

## Steps to Enable HTTPS

1. Generate an RSA Key and CSR
2. Get a certificate
3. Load the certificate into Pantheon environment
4. Test HTTPS (optional, but recommended)
5. Update DNS
6. Require HTTPS for all pages (optional, but recommended)

## Generate RSA Key and CSR

Run `openssl` from the command line to generate an [RSA private key](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) (.key file) and [certificate signing request](https://en.wikipedia.org/wiki/Certificate_signing_request) (.csr) file:

```bash
openssl req -new -newkey rsa:2048 -nodes -out www_example_com.csr
-keyout www_example_com.key
```

You'll be prompted interactively to enter the information needed to request your certificate. The most important part of this information is the *Common Name*, which is the domain.

You can also use a tool like the [OpenSSL CSR Wizard](https://www.digicert.com/easy-csr/openssl.htm) to generate an `openssl` command that you can paste into the command line, so you won't be prompted for that information interactively.

The output of `openssl` should be two files:

`www_example_com.csr`  
`www_example_com.key`

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Do not add a password to your key. It is important to keep your .key file private and secure. You'll use the .key file later when loading your cert into a Pantheon environment.</div>
<div class="alert alert-info" role="alert">
<h4>Note</h4>
You'll need Cygwin to run <code>openssl</code> on Windows. See <a href="/docs/articles/local/installing-cygwin-on-windows">Installing Cygwin on Windows</a>.</div>

## Get SSL Certificate

Give the CSR to your SSL provider and they will supply you with one or more certificate (.crt or .pem) files. The CSR is not used after you get your certificates.  

If the SSL provider asks you to select a web host server type, look for an option that supports OpenSSL, such as Apache with mod\_SSL support.

## SSL Certificate Types

### Multiple Domains with Subject Alternative Names (SANs)

A Subject Alternative Name is a public key certificate that is permitted to identify more than one entity or device. SANs may be the right choice if you need to manage multiple domains with a single certificate. For more information, see [SAN Certificates](http://www.digicert.com/subject-alternative-name.htm).

### Wildcard

You can upload the same wildcard SSL certificate for multiple sites that share a domain, and add the correct subdomain to each site's Domain tab in the Live environment.

### Intermediary Certificates/Bundles

Some SSL providers will give you an intermediary certificate, which is used to establish a chain of trust. If you received one, you'll need to add it in the Dashboard. If you get more than one intermediary certificate file, you'll need to combine them into one. Your provider may also send you a "certificate authority" or "CA" cert. If you have problems with your intermediate certificate, try [https://whatsmychaincert.com/](https://whatsmychaincert.com/) to generate the correct intermediary certificate.

GoDaddy.com provides a bundle (gd\_bundle.crt). Use this as the intermediary certificate.

### Algorithms

When selecting a certificate algorithm, you can choose from the following:

 - SHA-1(deprecated)
 - SHA256 cert with SHA-1 root
 - SHA256 cert and root

While all will function on Pantheon, selecting **SHA256 cert and root** will prevent [errors in the Chrome browser](https://www.chromium.org/Home/chromium-security/education/tls#TOC-Deprecation-of-TLS-Features-Algorithms-in-Chrome). In general, it is a best practice to avoid a certificate with a [deprecated SHA-1 algorithm](https://community.qualys.com/blogs/securitylabs/2014/09/09/sha1-deprecation-what-you-need-to-know).

## SSL Providers

We don't specifically recommend one, but here are a few of many SSL providers:

- [Comodo](http://www.comodo.com/ "Comodo Group")
- [DigiCert](http://www.digicert.com/ "DigiCert")
- [Entrust](http://www.entrust.com/ "Entrust")
- [GeoTrust](http://www.geotrust.com/ "GeoTrust")
- [Go Daddy](http://www.godaddy.com/ "Go Daddy") 
- [SSLMate](http://sslmate.com/ "SSLMate")
- [Thawte](http://www.thawte.com/ "Thawte")
- [TrustWave](https://ssl.trustwave.com/support/install-certificate-cpanel.php "TrustWave")
- [VeriSign](http://www.verisigninc.com/ "VeriSign")

## Load Certificate into Pantheon

1. From your Site Dashboard, select **Dev**, **Test**, or **Live** (most commonly **Live**).
2. Select **Domains/HTTPS**.
2. Click **HTTPS**.
3. Paste in the certificate information, including the header and footer, and click **Add Cert**.

After submitting your certificates, you'll see a confirmation message:

"HTTPS is enabled for the Live environment with loadbalancer IP: X.X.X.X" under the **HTTPS** tab. The **Domains/HTTPS** tab will be updated with new DNS recommendations.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
It may take up to 120 seconds to see the new IP address. If you're experiencing problems with the SSL load balancer provisioning with your new IP address, please contact support.</div>

## DNS

There are two options for configuring your DNS when you are using HTTPS. The platform has support for IPv4 (A records) and IPv6 (AAAA record).

We recommend using an IPv4 address, unless you are familiar with and understand IPv6.

## Test HTTPS

Before you point your DNS to the custom IP address you received after enabling HTTPS, you can verify that the certificate is correct.

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
You may see that the SSL certificate matches your intended domain, but do not expect to view the contents of the site, as we use HTTP headers to route your domain correctly.</div>

### Test with Chrome

1. Point your browser to the custom IP address you received after enabling HTTPS: https://x.x.x.x
2. Click the padlock in the address bar.
3. Select **Certificate Information**.<br />
 ![Image showing to click padlock and Certificate Information](/source/docs/assets/images/verify-ssl-cert-valid-chrome-0.png)
4. Verify certificate details match the domain(s) you'll point to the site.
 ![Certificate information](/source/docs/assets/images/verify-ssl-cert-valid-chrome.png)

### Test with cURL

Test HTTPS with `cURL` by issuing the following command:

```
$ curl -Ikv https://x.x.x.x --header "Host: mywebsite.com"
```

The `-k` option tells cURL to ignore untrusted certificates, but if you pay close attention to the output you'll
see that your certificate is being served:

```
...
* Connected to live-sitename.pantheon.io (x.x.x.x) port 443 (#0)
* TLS 1.2 connection using TLS_DHE_RSA_WITH_AES_128_CBC_SHA
* Server certificate: www.yourdomain.com
...
```

## Require HTTPS for All Pages

It's a best-practice to put all traffic on your site under HTTPS, which you can accomplish by adding a short PHP snippet to `settings.php` or `wp-config.php`. See Pantheon documentation: [Redirecting Incoming Requests: Redirecting to HTTPS](/docs/articles/sites/code/redirect-incoming-requests/#redirect-to-https).


## Frequently Asked Questions

### What should I do with a GoDaddy gd\_bundle.crt?

Use it as the intermediary certificate.

### Which order do I use for a basic Network Solutions SSL pack?

    MYSITE_COM.crt-------------------Cert
    UTNAddTrustServer_CA----------Intermediate
    mysite_com.key---------------------Private Key

### Which Comodo SSL pack should I use?

Visit Comodo's support site to read about [SSL packs](https://support.comodo.com/index.php?/Default/Knowledgebase/Article/View/620/1/).

### How do I fix a chain file signing key mismatch?

`400: Error the cert at line 1 of the chain file does not sign the main cert, Signing key mismatch`  
This indicates that some part of the chain is out of order. Check that you have the main and intermediary in the right places, and if you have multiple intermediaries check that they're in the right order. Also see [https://whatsmychaincert.com/](https://whatsmychaincert.com/).

### What if I receive SSL chain errors on a mobile device?

If you receive SSL chain errors, on a mobile device for example, make sure that the certificate has a certificate authority that supports your use case.

Using an SSL checker (http://www.sslshopper.com/ssl-checker.html) will perform a number of tests, such as the validity of the certificate, expiration date, certificate authority, and validity of the SSL chain. If the certificate is valid, all the responses should be green with no breaks in the SSL chain.

If the SSL chain is broken or you experience issues with mobile versions of the site, we recommend getting an SSL certificate from a different provider or attempting to correct the chain with [https://whatsmychaincert.com/](https://whatsmychaincert.com/).

### What about mixed mode (HTTP and HTTPS for different pages)?

If you are transmitting any sensitive data, we recommend [redirecting all traffic to HTTPS](/docs/articles/sites/code/redirect-incoming-requests/#redirect-to-https), rather than using mixed mode.
