---
title: Custom Certificates on Pantheon's Global CDN
description: For contract customers who require dedicated, custom TLS certificates
---

## Access

A white glove concierge service is now available to contract customers, including Enterprise, EDU+, Pantheon One, Elite, and Resellers. For more information, please contact [Sales](https://pantheon.io/why-pantheon-enterprise){.external}.

## Upgrade to the Global CDN

If your site is using our Legacy SSL service, it's on deprecated legacy infrastructure served from a single server in the central US. When you upgrade to the Global CDN you'll see faster performance, with content  delivered from almost 50 points of presence (POPs) around the world.

If your site uses Legacy SSL, it's also on an outdated TLS configuration. The Global CDN is configured to only use TLS 1.2 and no weak 3DES cipher. On the legacy infrastructure, your site isn't as fast, secure, or as resilient as it could be.

### Option 1: Automated Certificate Management via Let's Encrypt

If you just haven’t gotten around to upgrading, consider using our managed HTTPS, which includes automated certificate management, leveraging Let’s Encrypt certificates. As a convenience, when you upgrade to managed HTTPS you’ll never have to worry about an expired certificate again. As long as your domain is pointed to Pantheon, we will automatically renew the certificates required to keep your site secure. [Upgrade](/docs/https/) to get best-in-class encryption and an A+ grade from SSL Labs.

### Option 2: Manually Managed Custom Certificates

If you require a custom, dedicated certificate, you can now bring it the Global CDN.

1. [Open a support ticket](/docs/support/#ticket-support) with the certificate details required to request a **Certificate Signing Request** (CSR) from Pantheon. Use as few certificates as possible. Domains from multiple environments and sites can be combined, with up to 100 [**Subject Alternative Names**](https://en.wikipedia.org/wiki/Subject_Alternative_Name){.external} (SANs) per certificate.

    When requesting a CSR file, you must provide Pantheon Support with the following information:

     - Common name (e.g. `example.com`)
     - DNS names (e.g. `example.com`:`www.example.com`:`blog.example.com`:`dev.example.com`)
     - Email addresses \[optional\] (e.g. `someone@example.com`:`admin@example.com`)
     - Organization (e.g. `ACME, Inc.`)
     - Organizational unit \[optional\] (e.g. `Engineering`)
     - Country (e.g. `US`)
     - Locality (e.g. `San Francisco`)
     - State / Province (e.g. `California`)
     - Technical contact email
     - Technical contact first name
     - Technical contact last name

<br>

2. Pantheon Support will provide you with the CSR file, to pass on to your **Certificate Authority** (CA). See [CA Limitations](#ca-limitations) below for more information.

3. Once you have a set of certificates from the CA, send us:

    - The end-client certificate
    - Any intermediate certificates provided by the CA.<br><br>

    Be sure to send these as separate files, not a "chained cert".

4. Once the certificate is in place, you will see under **Details** for your domain(s) the following:

    ![Custom Certificate Confirmation](/source/docs/assets/images/dashboard/custom-cert-confirm.png)

5. [Test Before Going Live](#test-before-going-live) (optional, recommended)

6.  <a href="#disable-lets-encrypt-with-caa-records-required" data-proofer-ignore>Disable Let's Encrypt by adding CAA DNS records</a>.

7. Update `A` and `AAAA` records provided by Pantheon Support. Note that even for subdomains, `A` and `AAAA` records are required. Do not use a `CNAME` record.

## Test Before Going Live

Test production domain(s) before updating DNS by overriding DNS on your local computer from your local `hosts` file:

{% include("content/hosts-file.html")%}

For non-production domains, test on any environment (Dev, Test, Live or Multidev), just make sure to include the non-production domains on your certificate. We are happy to provide a new CSR if your original CSR and certificate did not initially non-production domains.

## Disable Let's Encrypt with CAA Records (Required)

A **Certification Authority Authorization** (CAA) record is used to specify which certificate authorities (CAs) are allowed to issue certificates for a domain. In order to ensure your custom certificate is served for all traffic, you must prevent Let’s Encrypt from issuing certificates. You have two options to prevent Let’s Encrypt from issuing certificates for domains on your custom certificate:

 - An empty CAA policy,
 - CAA records permitting your CA, but not Let’s Encrypt.

To help generate CAA records, please see the free online tool: <https://sslmate.com/caa/>

CAA records configured for the root domain (e.g., `example.com`) are inherited by subdomains (e.g., `www.example.com`, `blog.example.com`, etc.). Disabling Let's Encrypt for the root domain will disable subdomains.


## Technical Specifications

|                                                                       | Legacy                    | Global CDN with Let's Encrypt   | Global CDN with a Custom Certificate  |
|:--------------------------------------------------------------------- |:------------------------- |:------------------------------- |:--------------------------------------|
| **Certificate Type**                                                  | Bring your own            | Shared, issued by Let's Encrypt | Bring your own                        |
| **Renewal**                                                           | Self-managed (up to you)  | Automatic                       | Self-managed (up to you)              |
| **Inbound IP**                                                        | Static (unique)           | Static (shared)                 | Static (shared)                       |
| **Client Support**                                                    | 96.02% of browsers        | 95.55% of Browsers <br>Some very old browsers not supported <sup><a href="https://caniuse.com/#search=TLS%201.2">1 <a href="https://caniuse.com/#search=SNI">2</a></sup> | 95.55% of Browsers <br>Some very old browsers not supported <sup><a href="https://caniuse.com/#search=TLS%201.2">1 <a href="https://caniuse.com/#search=SNI">2</a></sup> * |
| [**SSL Labs Rating**](https://www.ssllabs.com/ssltest/){.external}    | A                         | A+ [with HSTS](/docs/hsts/)     | A+ [with HSTS](/docs/hsts/) *         |
| **Protocol**                                                          | TLS 1.1 & 1.2             | TLS 1.2 with SNI                | TLS 1.2 with SNI                      |
| **Ciphers**                                                           | Weak 3DES Cipher          | No Weak 3DES cipher             | No Weak 3DES cipher                   |
| **Delivery**                                                          | US Datacenter             | [Global CDN](/docs/global-cdn)  | [Global CDN](/docs/global-cdn)        |
| **Encryption Endpoint**                                               | Load Balancer             | Application Container           | Application Container                 |

\* The browser compatibility and SSL Labs scores are guaranteed for shared Let’s Encrypt certificates. The same results are typical for a custom certificate from a mainstream CA with mainstream attributes, but not guaranteed.  For custom certificates, compatibility and SSL Labs score depends on attributes of that certificate, such as number of SAN entries, CA and signing algorithm.

## Frequently Asked Questions

### Do I need a separate certificate for each site in my organization?

Nope! You can use the a single certificate to cover multiple domains spread across various environments or sites. This capability is enabled because the Global CDN uses a technology called Server Name Indication (SNI), which automatically matches inbound requests with an appropriate certificate, including custom certificates.

### How long will it take to load my certificate into Pantheon?

Please allow two business days to get a CSR and load the certificate.

### How do I renew or replace my custom certificate?

45 days before your custom certificate expires, Pantheon will open a ticket with your team with a new CSR. You can send that CSR to the Certificate Authority to generate new certificates (as described above for <a href="#option-2-manually-managed-custom-certificates" data-proofer-ignore>bringing a custom certificate</a>).

To update a certificate with additional domains, [contact support](/docs/support/) with the following details:

 - The current common name (CN) and any SANs
 - A colon-separated list of domains the certificate is valid for
 - The updated certificate attached

It may take up to two business days to process the request.

### What about sites purchased online?

Custom certificates are available for contract customers (e.g. Elite, Enterprise, EDU+) and we have no plans to offer it for Basic or Performance sites purchased online. If bringing your own certificate for non-contract site is a requirement, please see suggestions on <a href="/docs/https/#can-i-bring-my-own-certificate" data-proofer-ignore>how to terminate TLS through a 3rd-party</a>.

### Will custom certificates be self-serve?

We have no current plans to offer a self-serve option. The concierge service is designed to quickly guide you through the steps required to deliver HTTPS on the Global CDN using your custom certificate, and we may follow-up with a self-serve option in the future.

### Which certificates do I submit?

Include the end-client certificate for your named domains, as well as the intermediate certificate, in separate files.


### What is the maximum number of SAN entries?

For the broadest client compatibility we recommend limiting the number of Subject Alternate Names to 100.


### Are private keys available for export?

Private keys are just that, private, and not available for export. They are stored securely, server side, and it’s a security best practice to not share private keys among different deployments. If you manage multiple domains, with some on Pantheon, and some outside of Pantheon, then we recommend using separate certificates, and we are happy to provide you with a new Certificate Signing Request (CSR) so we can deploy a certificate on Pantheon that only has the domains served on Pantheon.


### What are the Global CDN IP addresses?

The Global CDN currently has 4 offsets. After certificate deployment, we will provide DNS information so you can upgrade. In the examples below, `X` will be replaced with a value of `1`, `2`, `3`, or `4`:

A record: `23.185.0.X`
AAAA record 1:  `2620:12a:8000::X`
AAAA record 2:  `2620:12a:8001::X`

**Note:** `AAAA` records are not required, but recommended as a best practice for performance, especially for mobile devices. See <a href="/docs/dns/#what-are-aaaa-records-and-do-i-need-them" data-proofer-ignore>Introduction to Domain Name Services</a> for more information.

## Caveats / Known Issues

### Let's Encrypt Certificate Served Instead of Custom Certificate
If a Let's Encrypt certificate was deployed to the Global CDN before adding CAA records to prevent Let's Encrypt from issuing certificates, then it will take 10 days for Pantheon to automatically remove the domain from the Let's Encrypt certificate.

### CA limitations
Your CA must accept the CSR Pantheon provides. If your CA fails to accept our CSR, you will not be able to use it to generate a certificate. The CA Globalsign does not currently meet this requirement. The workaround is to simply use another CA.

### Downgrading a Site that uses a Custom Certificate

Since all sites require an encryption certificate, to downgrade a site that uses a custom certificate, use Pantheon’s [Global CDN](/docs/https/) to enable Let’s Encrypt. Alternatively, you can use another CDN like [Cloudflare](/docs/cloudflare/).

## See also
- [Pantheon Global CDN](/docs/global-cdn)
- [HTTPS on Pantheon's Global CDN](/docs/https/)
- [Introduction to Domain Name Services](/docs/dns/)
