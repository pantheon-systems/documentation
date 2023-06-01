---
title: WordPress Developer's Guide
subtitle: Google Cloud Storage Setup for WordPress
description: Add GCS storage integration to a WordPress site on Pantheon.
contenttype: [guide]
innav: [false]
categories: [cms]
cms: [wordpress]
audience: [development]
product: [--]
integration: [aws]
tags: [files]
contributors: [carl-alberto]
reviewed: "2023-06-01"
showtoc: true
permalink: docs/guides/wordpress-developer/wordpress-gcs
---

This section provides information on how to integrate Google Cloud (GCS) Storage with your WordPress Pantheon site.

Google Cloud Platform offers Google Cloud (GCS) Storage for scalable storage and content distribution that you can integrate with sites running on Pantheon. Pantheon already offers content distribution through our [Global CDN](/guides/global-cdn), but GCS is a good option for addressing issues with [highly populated directories](/guides/filesystem/large-files) or serving large files and as alternative for AWS S3.

## Before You Begin

Be sure that you have:

- An existing WordPress site on Pantheon, or [create](https://dashboard.pantheon.io/sites/create) a site.
- A [local clone](/guides/git/git-config#clone-your-site-codebase) of your code repository.
- An account with [Google Cloud Platform (GCP)](https://cloud.google.com/). GCP offers [free credit](https://console.cloud.google.com/freetrial)) to try out their services.
- [Terminus](/terminus) installed on your local computer.

<Alert title="Exports" type="export">

This process uses [Terminus](/terminus) commands. Set the variable `$site` in your terminal session to match your site name before you begin:

```bash{promptUser: user}
export site=yoursitename
export env=dev
```

</Alert>

## Configure Google Cloud Storage within the AWS Console

You must configure the service within your [Google Cloud Console](https://console.cloud.google.com/) before integrating Google Cloud Storage with your Pantheon site.

### Create a Google Service Account

You will need a Service account to programmatically access you GCS bucket and assign fine grain access.

1. Go to **IAM & Admin** > **Service Accounts** and click **Create Service Account** from the top.

   ![GCS Service account 1](../../../images/guides/gcs-aa1.png)

1. Name your service account, hit **Create and Continue** and **Done** to finalize the account creation.

1. Edit the Service account that you created, take note of the email that is automatically assigned, then hit the **Keys** tab. Choose **JSON** from the popup, then hit **Create**. This will download a JSON file and make sure you store the JSON file securely.

### Create a New GCS Bucket

1. Go to **Cloud Storage**, then **Buckets** and click **Create Bucket**.

   ![GCS Bucket Settings 1](../../../images/guides/gcs11.png)

1. Name your bucket, choose Region that is closest to your website (US, Canada, Europe or Australia) during site creation.
 
1. Uncheck the **Enforce public access prevention on this bucket** and Control access is **Fine-grained**.
 
1. Make sure that Data Encryption is set to **Google-managed encryption key** then hit **Create**.

1. Edit the bucket that you created. Go to the **Premissions** tab and hit the **Grant Access** button. Enter the email that was automatically assigned under you service account under the **New Principal** Field then under the **Assign Roles** find the **Storage Admin**.


## Integrate Google Cloud Storage (GCS) in WordPress

You must install a plugin such as [WP Offload Media Lite](https://wordpress.org/plugins/amazon-s3-and-cloudfront/) or [WP Stateless](https://wordpress.org/plugins/wp-stateless/).

WP Offload Media Lite is a free version but there is premium version for support & additional features, including multisite support. You can refer here for full plugin [installation and configuration](https://wordpress.org/plugins/wp-stateless/#installation).

S3 Uploads is open-source but does not include an admin UI and requires [Terminus](/terminus) and [WP-CLI](/guides/wp-cli) for setup and migration.

WP-Stateless is another alternative for GCS integrations, you can refer here for the [full installation guide](https://wp-stateless.github.io/docs/manual-setup/). 


## URL Rewriting

By default, the URLs saved in the database will be using GCS's provided URL (eg: https://storage.googleapis.com/example.com/2023/1/image.jpg), if you need the URLs to be masked to match you site's domain for SEO purpose, our [Advanced Global CDN](/guides/agcdn/agcdn-features#domain-masking-and-reverse-proxy) can help out. You can [reach out our sales](https://pantheon.io/contact-sales) if you do not have AGCDN or open up a [support ticket](/guides/agcdn/submit-request#submit-a-request) so we can help you out with the Domain Masking.

## More Resources

- [Integrate Your Fastly Account on Pantheon with Amazon S3](/guides/fastly-pantheon/fastly-amazon-s3)
- [AWS S3 Setup for WordPress](/guides/wordpress-developer/wordpress-s3)
- [Securely Store your API Keys in WordPress](/guides/wordpress-developer/wordpress-secrets-management)
- [Mask your Google Cloud Storage URLs to match your domain](/guides/agcdn/agcdn-features#domain-masking-and-reverse-proxy)
