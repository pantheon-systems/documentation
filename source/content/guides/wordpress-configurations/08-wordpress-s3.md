---
title: WordPress Configurations Guide
subtitle: AWS S3 Setup for WordPress
description: Add AWS S3 storage integration to a WordPress site on Pantheon.
cms: "WordPress"
contenttype: [guide]
categories: [config]
newcms: [wordpress]
audience: [development]
product: [--]
integration: [aws]
tags: [files]
contributors: [sarahg]
date: 7/7/2021
permalink: docs/guides/wordpress-configurations/wordpress-s3
anchorid: wordpress-s3
---

This section provides information on how to integrate AWS S3 storage with your WordPress Pantheon site.

Amazon Web Services (AWS) offers Simple Storage Service (S3) for scalable storage and content distribution, which can be integrated with sites running on Pantheon. Pantheon already offers content distribution through the [Global CDN](/guides/global-cdn), but S3 is a good option for addressing issues with [highly populated directories](/guides/filesystem/large-files) or serving large files.

## Before You Begin

Be sure that you have:

- An existing WordPress site on Pantheon, or [create](https://dashboard.pantheon.io/sites/create) a site.
- A [local clone](/guides/git/git-config#clone-your-site-codebase) of your code repository.
- An account with [Amazon Web Services (AWS)](https://aws.amazon.com/s3/). Amazon offers [free access](https://aws.amazon.com/free/) to most of their services for the first year.
- [Terminus](/terminus) installed on your local computer.


<Alert title="Exports" type="export">

This process uses [Terminus](/terminus) commands. Before we begin, set the variable `$site` in your terminal session to match your site name:

```bash{promptUser: user}
export site=yoursitename
export env=dev
```

</Alert>

## Configure S3 within the AWS Console

You must configure the service within your [AWS Management Console](https://console.aws.amazon.com) before integrating S3 with your site.

### Create a New AWS S3 Bucket

If you do not have an existing bucket for your site, create one:

1. Open your [AWS Console](https://console.aws.amazon.com) and click **S3**.

1. Click **Create Bucket**.

1. Enter a bucket name. The bucket name you choose must be unique across all existing bucket names in Amazon S3, and after you create a bucket, you cannot change its name. Note that the bucket name you choose is visible in the URL that points to the objects stored in the bucket.

1. Select a region and click **Create**.

1. Configure the **Set properties** section and click **Next** when complete. You can configure these options now, or wait and configure later.

1. Open the **Permissions** tab, select the boxes for **Read** and **Write** access for both **Objects** and **Permissions**, then click **Next**.

1. Review your settings, and then click **Create bucket**.

## Integrate S3 with WordPress

You must install a plugin such as [S3 Uploads](https://github.com/humanmade/S3-Uploads) or [WP Offload Media](https://wordpress.org/plugins/amazon-s3-and-cloudfront/).

WP Offload Media requires a paid license but is configurable in the WordPress admin UI and offers a number of options and features, including multisite support. S3 Uploads is open-source but does not include an admin UI and requires [Terminus](/terminus) and [WP-CLI](/guides/wp-cli) for setup and migration.

### Install and Deploy S3 Uploads

<Alert title="Note" type="info">

This plugin has known [multisite issues](https://github.com/humanmade/S3-Uploads/pull/214). If you need an alternative plugin with premium support and a multisite version, consider [WP Offload Media](#install-and-deploy-wp-offload-media).

</Alert>

1. Download the latest plugin release from [Github](https://github.com/humanmade/S3-Uploads/releases) and extract it to `wp-content/plugins/`. Note that our documentation has been tested for version 2.0.0.

  <Alert title="Warning" type="danger">

  **Do not** add the plugin as a Git submodule. Git submodules are not supported on the platform ([more info](/guides/git/faq-git#does-pantheon-support-git-submodules)).

  </Alert>

1. Rename the extracted folder to remove the version number. For example:

   ```bash{promptUser: user}
   mv S3-Uploads-2.0.0/ S3-Uploads
   ```

1. Create and/or copy your **Access Key ID** key and **Secret Access Key** from the **My security credentials** section of your AWS account to a text editor on your local computer.

   <Alert title="Note" type="info">

   As a standard security measure, consider creating a unique user with limited permissions covering this S3 bucket to authenticate the plugin.

   </Alert>

1. Add the credentials to `wp-config.php`, as described in the plugin's [README](https://github.com/humanmade/S3-Uploads#getting-set-up) file. For security, we recommend a service like [Lockr](/guides/lockr) or the [Terminus Secrets plugin](https://github.com/pantheon-systems/terminus-secrets-plugin) to store and retrieve these credentials securely.

1. Commit and push the new plugin and your `wp-config.php` updates to the Dev environment, then  switch to SFTP mode and activate the plugin:

    ```bash{promptUser: user}
    terminus wp $site.dev plugin activate S3-Uploads
    ```

1. Use WP-CLI to verify your AWS setup.

    ```bash{promptUser: user}
    terminus wp $site.dev s3-uploads verify
    ```

#### Migrate existing media with S3 Uploads and WP-CLI

You can migrate existing media files to S3 with the following command:

```bash{promptUser: user}
terminus wp $site.dev -- s3-uploads migrate-attachments
```

Optionally, add the `--delete-local` flag to remove the local copies of the media files.

This command will also provide a search/replace command for your database to update references to the newly-migrated files when completed. Note that you must run this on all Pantheon environments (Dev, Test, and Live).

#### Multisite Compatibility

WP Offload Media plugin is supported.

Refer to the [WP Offload Media documentation](https://deliciousbrains.com/wp-offload-media/doc/multisite-per-subsite-bucket-and-custom-domain-settings/) for more information.

#### Additional Configuration

Check out the plugin's [README file](https://github.com/humanmade/S3-Uploads/blob/master/README.md) for information on advanced configuration, such as cache control, URL rewriting, and offline development.

### Install and Deploy WP Offload Media

Follow documentation from [DeliciousBrains](https://deliciousbrains.com/wp-offload-media/doc/quick-start-guide). No specialized configuration is required for this plugin to run on Pantheon.


## More Resources

- [Integrate Your Fastly Account on Pantheon with Amazon S3](/guides/fastly-pantheon/fastly-amazon-s3)
- [AWS S3 Setup for Drupal](/drupal-s3)