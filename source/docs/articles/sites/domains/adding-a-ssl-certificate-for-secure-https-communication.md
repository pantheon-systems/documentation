---
title: Enable SSL for Secure HTTPS Communication
description: Learn how to implement SSL secure HTTPS communication and utilize a static IP address.
category:
  - developing
  - launch
keywords: secure https, https, ssl, security, encryption, enable ssl, enable ssl certificate, add ssl cert, add ssl, add https, add encryption, how to add an ssl, dns, csr, generate csr, generate key, update dns for ssl, ssl certificate types, ssl cert types, ssl types, ssl provider, intermediary ssl, intermediary ssl cert, intermediary ssl certificate
---
SSL is a standard for establishing an encrypted link between your Pantheon site and a client (e.g. web browser). You should enable SSL on a custom domain, e.g., www.example.com, if you are transmitting any sensitive data. Loading a valid OpenSSL certificate into a Pantheon environment provisions an SSL load balancer with a dedicated IP address, allowing secure communication over HTTPS. All traffic within the Pantheon infrastructure, from Varnish to application containers, is encrypted.

Adding SSL to your site is a completely self-serve option; Pantheon does not provide private keys or CSRs, or any SSH login for you to generate these. The key and certificates are cryptographically sensitive elements that you should not send through email, as cleartext is very insecure.

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
Enable SSL before updating DNS. SSL for custom domains is available for Professional plans and above.</div>

## Steps to Enable SSL

1. Generate Key and CSR
2. Get SSL certificate
3. Load certificate into Pantheon environment
4. Test SSL (optional, but recommended)
5. Update DNS
6. Require SSL for all pages (optional, but recommended)

## Generate Key and CSR

Run `openssl` from the command line to generate a RSA Private Key (.key file) and Certificate Signing Request (.csr file):

```bash
openssl req -new -newkey rsa:2048 -nodes -out www_example_com.csr
-keyout www_example_com.key
```

You'll be prompted interactively to enter information needed to request your certificate. The most important part of this information is the *Common Name*, which is the domain.

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

A Subject Alternative Name is a public key certificate that is permitted to identify more than one entity or device. SANs may be the right choice if you need to manage multiple domains with a single certificate. For more information, see [SAN Certificates](http://www.digicert.com/subject-alternative-name.htm )

### Wildcard

You can upload the same wildcard SSL certificate for multiple sites that share a domain, and add the correct subdomain to each site's domain tab in the Live environment.

### Intermediary Certificates

Your SSL provider may give you an intermediary certificate, which is used establish a chain of trust. If you get more than one intermediary certificate file, you'll need to combine them into one. Your provider may also send you a "certificate authority" or "CA" cert. If you have problems with your intermediate certificate, try [https://whatsmychaincert.com/](https://whatsmychaincert.com/), which tests if the correct certificate chain is being served, and tells you which chain you should be serving.

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
2. Select **Domains**.
2. Select **SSL**.
3. Paste in the requested information and press **Add Cert**.
 ![Site dashboard add SSL certificate step 2](/source/docs/assets/images/desk_images/259882.png)​

After submitting your certificates, you'll see:

"HTTPS/SSL is enabled for the Live environment with loadbalancer IP: X.X.X.X" under the **SSL** tab. The **Domains** tab will be updated with new DNS recommendations.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
It may take up to 120 seconds to see the new IP address. If you're experiencing problems with the SSL load balancer provisioning with your new IP address, please contact support.</div>

## DNS

There are two options for configuring your DNS when you are using SSL. The platform has support for IPv4 (A records) and IPv6 (AAAA record).

We recommend using an IPv4 address, unless you are familiar with and understand IPv6.

## Test SSL

Before you point your DNS to the custom IP address you received after enabling SSL, you may verify that the certificate is correct.

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
You may see that the SSL certificate matches your intended domain, but do not expect to view the contents of the site, as we use HTTP headers to route your domain correctly.</div>

### Chrome

Testing SSL is Chrome is similar for other browsers as well.

1. Point Chrome to the custom IP address you received after enabling SSL: https://x.x.x.x
2. Click the padlock in the address bar.
3. Click **Certificate Information**.<br />
 ![Image showing to click padlock and Certificate Information](/source/docs/assets/images/verify-ssl-cert-valid-chrome-0.png)
4. Verify certificate details match the domain(s) you'll point to the site.
 ![Certificate information](/source/docs/assets/images/verify-ssl-cert-valid-chrome.png)
### cURL

Test SSL with `cURL` by issuing the following command:

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

## Require SSL for All Pages

It's a best-practice to put all traffic on your site under HTTPS, which you can accomplish by adding a short PHP snippet to `settings.php` or `wp-config.php`. See Pantheon documentation: [Redirecting Incoming Requests: Redirecting to HTTPS](/docs/articles/sites/code/redirect-incoming-requests/#redirecting-to-https).


## Frequently Asked Questions

### What should I do with a GoDaddy gd\_bundle.crt?

Use it as the Intermediary Certificate.

### Which order do I use for a basic Network Solutions SSL pack?

    MYSITE_COM.crt-------------------Cert
    UTNAddTrustServer_CA----------Intermediate
    mysite_com.key---------------------Private Key

### Which Comodo SSL pack should I use?

Visit Comodo's support site to read about [SSL packs](https://support.comodo.com/index.php?/Default/Knowledgebase/Article/View/620/1/).

### How do I fix a chain file signing key mismatch?

If you see `400: Error the cert at line 1 of the chain file does not sign the main cert, Signing key mismatch`
it indicates that some part of the chain is out of order. Check that you have the main and intermediary in the right places, and if you have multiple intermediaries check that they're in the right order. Also see [https://whatsmychaincert.com/](https://whatsmychaincert.com/).

### What if I receive SSL chain errors on a mobile device?

If you receive SSL chain errors, on a mobile device for example, make sure that the certificate has a certificate authority that supports your use case.

Using an SSL checker (http://www.sslshopper.com/ssl-checker.html) will perform a number of tests, such as the validity of the certificate, expiration date, certificate authority, and validity of the SSL chain. If the certificate is valid, all the responses should be green with no breaks in the SSL chain.

If the SSL chain is broken or you experience issues with mobile versions of the site, we recommend getting an SSL certificate from a different provider or attempting to correct the chain with [https://whatsmychaincert.com/](https://whatsmychaincert.com/).

### What about mixed mode? (HTTP and HTTPS for different pages)

If you are transmitting any sensitive data we recommend [redirecting all traffic to HTTPS](/docs/articles/sites/code/redirect-incoming-requests/#redirecting-to-https), rather than using mixed mode.
