---
title: WordPress with Composer on Pantheon
subtitle: Develop Locally with Lando
description: Learn how develop locally with Lando on your Composer-managed WordPress sites.
categories: [develop]
tags: [wordpress]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/wordpress-composer/lando-composer
anchorid: lando-composer
---

This section provides information on how to use Lando to develop your Composer-manged WordPress site locally.

Complete the one-time steps below to get started using [Lando](https://docs.devwithlando.io/) for local development. Please note than Lando is an independent product and is not supported by Pantheon. Refer to the [Lando documentation](https://docs.devwithlando.io/) for more information.

1. [Install Lando](https://docs.lando.dev/getting-started/installation.html) if it is not already installed.

1. Clone your project repository from GitHub to your local.

1. Manually create a `.lando.yml` file with your preferred configuration, based on the WordPress recipe.

1. Run `lando start` to start Lando.
    
1. Save the local site URL. 

    - The local site URL should look similar to: `https://<PROJECT_NAME>.lndo.site.`

1. Run the command below to download dependencies.

    ```bash
    `lando composer install --no-ansi --no-interaction --optimize-autoloader --no-progress`
    ```

1. Run the command below to download the media files and database from Pantheon.

    ```bash
    `lando pull --code=none`
    ``` 
    
1. Visit the local site URL saved in the preceding steps.

    - You should now be able to edit your site locally. The steps above do not need to be completed on subsequent starts. You can stop Lando with `lando stop` and start it again with `lando start`.

1. Run all Composer, Terminus and wp-cli commands in Lando instead of the host machine. 

    - This is done by prefixing the desired command with `lando`. For example, after a change to `composer.json` run `lando composer update` rather than `composer update`.

<Alert title="Warning" type="danger" >

Do NOT push/pull code between Lando and Pantheon directly. All code should be pushed to GitHub and deployed to Pantheon through a continuous integration service, such as CircleCI.

</Alert>

## More Resources

- [Install and Configure Lando for WordPress](/guides/lando-wordpress)
