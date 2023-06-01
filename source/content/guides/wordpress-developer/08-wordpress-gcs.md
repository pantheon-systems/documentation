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
