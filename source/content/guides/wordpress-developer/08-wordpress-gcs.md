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

1. Name your service account, hit **Create and Continue** and **Done** to finalize the account creation.

1. Edit the Service account that you created, take note of the email that is automatically assigned, then hit the **Keys** tab. Choose **JSON** from the popup, then hit **Create**. This will download a JSON file and make sure you store the JSON file securely.

### Create a New GCS Bucket

1. Go to **Cloud Storage**, then **Buckets** and click **Create Bucket**.

1. Name your bucket, choose Region that is closest to your website (US, Canada, Europe or Australia) during site creation.
 
1. Uncheck the **Enforce public access prevention on this bucket** and Control access is **Fine-grained**.
 
1. Make sure that Data Encryption is set to **Google-managed encryption key** then hit **Create**.

