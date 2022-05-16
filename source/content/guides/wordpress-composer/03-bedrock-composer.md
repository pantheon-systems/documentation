---
title: Using Bedrock on Your WordPress Pantheon Site
subtitle: Bedrock for Composer-managed WordPress Site 
description: Learn more about Bedrock for Composer-managed WordPress sites.
categories: [develop]
tags: [wordpress]
layout: guide
showtoc: true
permalink: docs/guides/wordpress-composer/bedrock-composer
anchorid: bedrock-composer
---

Composer does not fully support WordPress, however, Bedrock is a central feature of Composer.[Bedrock](https://roots.io/bedrock/) is a custom WordPress project structure. Bedrock helps simplify working on large WordPress projects with multiple plugins and custom code. Bedrock is great resource for WordPress developers who want to use modern web development methodologies.

## Create a New Pantheon WordPress Site with Bedrock

1. Run the following command:

    ```bash
    composer create-project your_site
    ```

1. Update the [environment variables](https://docs.roots.io/bedrock/master/environment-variables/#wp-env) in your project's `.env` file.

1. Store your `.env` outside of the project root on the Pantheon server. 

    - Bedrock is configured to look for the `.env` file in the `files/private` directory by default. This is also the location where Pantheon stores all files that shouldn't be accessible to the public.

1. Commit the `vendor` and `web` directories.

    - Pantheon does not support using Composer to install dependencies that are deployed to Pantheon servers. You must commit the entire vendor and web directories into your git repo to ensure that your dependencies are installed for the new project.

1. Convert the `web/app/uploads` directory to a symlink that points to the `files` directory. 

    - This is necessary because Pantheon stores media files in the `files` directory instead of the `uploads` directory.

1. Create the initial `.env` file.

    - This is necessary because Bedrock uses environment variables to manage sensitive credentials. These environment variables usually come from multiple sources. The most important variable is the `.env` file which Bedrock uses instead of the standard WordPress `wp-config.php` file. Pantheon was not designed to create the initial `.env` file that your Bedrock site requires. You must create it yourself and upload it to the Pantheon server. The easiest way to do that is by connecting to your Pantheon server using FTP and creating the `.env` file. 

1. Upload the newly created `.env` file by connecting to the Pantheon server using an FTP.

    To find your connection information: Navigate to the site's **Dev environment** in Pantheon > click **Connection Info** > scroll to the bottom of the menu to view your SFTP connection information.

1. Connect to your Pantheon site using the SFTP credentials located in the previous step > navigate to the `files` directory > create a `private` directory > create the `.env` file in the `private` directory by running the following command:

    ```bash
    WP_ENV=development
    WP_SITEURL=${WP_HOME}/wp

    Generate your keys here: https://roots.io/salts.html
    AUTH_KEY='generateme'
    SECURE_AUTH_KEY='generateme'
    LOGGED_IN_KEY='generateme'
    NONCE_KEY='generateme'
    AUTH_SALT='generateme'
    SECURE_AUTH_SALT='generateme'
    LOGGED_IN_SALT='generateme'
    NONCE_SALT='generateme'
    ```

    - Your `.env` will be created. Pantheon automatically supplies many of the environment variables that are usually stored in the .env file normally.
    This is why your new `.env` file is smaller than the original Bedrock `.env` file. 

1. Replace all placeholder keys with the [new keys](https://roots.io/salts.html).

1. Use [SFTP or git](/guides/wordpress-git/) to push changes directly to your Pantheon site.

## See Also

- [Using Git with SFTP & WordPress](/guides/wordpress-git/)

- [Terminus Connection Info](/terminus/commands/connection-info)