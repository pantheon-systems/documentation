---
title: "Custom Certificates on Pantheon Advanced and Global CDN"
description: For contract customers who require dedicated, custom TLS certificates.
tags: [cdn, https, professional-services]
reviewed: "2025-03-19"
contenttype: [doc]
innav: [true]
categories: [security]
cms: [--]
audience: [development]
product: [cdn]
integration: [--]
---

This article provides an overview of the steps to set up and work with manually managed, custom certificates through Pantheon's Custom Certificates concierge service.

Our Custom Certificates service is available to contract customers only, but it does not require the Advanced Global CDN product or an Elite plan. There is a fee to utilize the service. To get started, contact your account manager or our [Sales Team](https://pantheon.io/contact-us?docs).


## Add a Custom Certificate

Follow the steps below to request and send the appropriate certificate, and private key information for AGCDN where applicable:

<TabList>

<Tab title="Global CDN" id="ccgcdn" active={true}>

### Send the CSR to Your CA

Approximately two business days after a closed contract, the [Pantheon Onboarding Team](/guides/professional-services/onboarding) will provide you with the CSR file, to pass on to your **Certificate Authority** (CA).

Allow two business days for your Account Team to load the certificate.

#### CSR Notes

- You must use a Pantheon-generated CSR. This is a hard requirement. If you already have a certificate, it will need to be re-keyed to match the CSR we provide.

- Your CA must accept the CSR Pantheon provides. If your CA fails to accept our CSR, you will not be able to use it to generate a certificate. The CA GlobalSign does not currently meet this requirement. The workaround is to use another CA.

- Your CA must generate your custom certificate in PEM format containing all the certificates.

  <Alert title="Streamlined AGCDN"  type="info" >
    This procedure also applies for customers who use Streamlined AGCDN. Pantheon staff uploads your certificate and the related domains are marked or show an indicator the same way regular domains with custom certificates do.
  </Alert>

</Tab>


<Tab title="Legacy AGCDN" id="newagcdn">

You can use the self service tool to add your custom certificate if you have a legacy AGCDN setup.

## Before You Begin

Make sure you have your certificate bundle ready:

- Main certificate
- Intermediate certificate
- Private Key

Note: The platform currently only accepts 2048-bit RSA keys. AGCDN custom certificates (and private keys) must be in `.PEM` format.


1. Navigate to your [**Customer Cert Management**](https://certs.ps-pantheon.com/) account and log in.

  <Alert title="Note"  type="info" >

  You must [contact Professional Services](https://pantheon.io/professional-services?docs) to have your account created for you if you don't have an existing account.

  </Alert>

1. Optional. Click **Upload New Key**, paste your key into the **Key** field, enter a name for the key in the **Key name** field, and then click **Upload**. Note that this step is required if your certificate has a private key. You can click the **Refresh Key List** button to see the newly added key.

1. Click **Upload New Cert**, paste your certificate and intermediate certificate into the appropriate fields, and then click **Upload**. Both certificates must be in `.PEM` format. You can click **Refresh Cert List** to see the newly added certificate.


As an alternative, you can also submit the certificate bundle to Pantheon Support to upload. You must allow two business days for your Account Team to load the certificate.

</Tab>

</TabList>

### Add the Domain

Next, [add the domain to your environment](/guides/domains).

Once the certificate is in place, you will see the following under **Details** for your domain(s):

  ![Custom Certificate Confirmation](../images/dashboard/custom-cert-confirm.png)

## Test Before Going Live

Test production domain(s) before updating DNS by overriding DNS on your local computer from your local `hosts` file:

<Partial file="_hosts-file.md" />

For non-production domains, test on any environment (Dev, Test, Live or Multidev), just make sure to include the non-production domains on your certificate. We are happy to provide a new CSR if your original CSR and certificate did not initially non-production domains.

### Disable Let's Encrypt with CAA Records

A **Certification Authority Authorization** (CAA) record is used to specify which certificate authorities (CAs) are allowed to issue certificates for a domain. In order to ensure your custom certificate is served for all traffic, you must prevent Let’s Encrypt from issuing certificates. 

You have two options to prevent Let’s Encrypt from issuing certificates for domains on your custom certificate:

- An empty CAA policy
- CAA records permitting your CA, but not Let’s Encrypt

To help generate CAA records, please see the free online tool: <https://sslmate.com/caa/>

CAA records configured for the root domain (e.g., `example.com`) are inherited by subdomains (e.g., `www.example.com`, `blog.example.com`, etc.). Disabling Let's Encrypt for the root domain will disable subdomains.

#### Issue: A Let's Encrypt Certificate is being served instead of the custom certificate

If a Let's Encrypt Certificate is deployed before the CAA record preventing it, [contact Pantheon Support](/guides/support/contact-support/) for assistance. Please allow at least 3 business days for Pantheon to resolve the Let's Encrypt Certificate.

### Update A and AAAA Records

Update `A` and `AAAA` records provided by Pantheon Support. Note that even for subdomains, `A` and `AAAA` records are required. Do not use a `CNAME` record.

## Renew or Replace a Custom Certificate

About 45 days before your custom certificate expires, Pantheon will open a ticket with your team with a new CSR. You can send that CSR to the Certificate Authority to generate new certificates (as described above for bringing a custom certificate).

To update a certificate with additional domains, [contact Pantheon Support](/guides/support/contact-support/) with the following details:

- The current common name (CN) and any SANs
- A colon-separated list of domains the certificate is valid for
- The updated certificate attached

It may take up to two business days to process the request.

## Remove a Custom Certificate

All sites require an encryption certificate. To downgrade a site that uses a custom certificate, [modify the site's CAA records](/custom-certificates#disable-lets-encrypt-with-caa-records) to re-enable Pantheon’s [Global CDN](/guides/global-cdn/https) Let's Encrypt to issue certificates. Alternatively, you can use another CDN like [Cloudflare](/cloudflare).


## Frequently Asked Questions

### Do I need a separate certificate for each site in my organization?

You can use a single certificate to cover multiple domains spread across various environments or sites. Pantheon's Global and Advanced Global CDN use Server Name Indication (SNI), which automatically matches inbound requests with an appropriate certificate, including custom certificates.

### What about sites purchased online?

Custom certificates are available for contract customers (e.g. Elite, Enterprise, EDU+) and we have no plans to offer it for Basic or Performance sites purchased online. If bringing your own certificate for non-contract site is a requirement, please see suggestions on [how to terminate TLS through a 3rd-party](/guides/global-cdn/https/#can-i-bring-my-own-certificate).

### Will custom certificates be self-serve?

We have no current plans to offer a self-serve option. The concierge service is designed to quickly guide you through the steps required to deliver HTTPS on the Global CDN using your custom certificate, and we may follow-up with a self-serve option in the future.

### What is the maximum number of SAN entries?

For the broadest client compatibility we recommend limiting the number of Subject Alternate Names to 100.

### Are private keys available for export?

Private keys are just that, private, and not available for export. They are stored securely, server side, and it’s a security best practice to not share private keys among different deployments. 

If you manage multiple domains, with some on Pantheon, and some outside of Pantheon, then we recommend using separate certificates, and we are happy to provide you with a new Certificate Signing Request (CSR) so we can deploy a certificate on Pantheon that only has the domains served on Pantheon.

### What are the Global CDN IP addresses?

The Global CDN currently has 4 offsets. After certificate deployment, we will provide DNS information so you can upgrade. In the examples below, `X` will be replaced with a value of `1`, `2`, `3`, or `4`:

A record: `23.185.0.X`
AAAA record 1:  `2620:12a:8000::X`
AAAA record 2:  `2620:12a:8001::X`

**Note:** `AAAA` records are not required, but recommended as a best practice for performance, especially for mobile devices. See [Introduction to Domain Name Services](/guides/domains/dns/#what-are-aaaa-records-and-do-i-need-them) for more information.

### What if my DNS manager doesn't support CAA DNS records?

CAA records are required in order to [prohibit Let's Encrypt from issuing certificates](#disable-lets-encrypt-with-caa-records). If your DNS provider does not support CAA records, consider one that does. If using a DNS provider that supports CAA records is not possible, please contact your [Professional Services](/guides/professional-services) Engagement Manager for help.


### How do I relaunch an existing site with a custom certificate?

To take your site live by moving custom domains from one Site Dashboard to another, with minimal HTTPS interruptions, please refer to [Relaunch Existing Pantheon Site](/relaunch#prepare-for-relaunch).

## Technical Specifications

<Partial file="tables/https-specs.md" />


## You May Also Refer To

- [Pantheon Global CDN](/guides/global-cdn)
- [Advanced Global CDN](/guides/professional-services#advanced-global-cdn)
- [HTTPS on Pantheon's Global CDN](/guides/global-cdn/https)
- [Introduction to Domain Name Services](/guides/domains/dns)
