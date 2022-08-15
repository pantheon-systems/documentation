---
title: WordPress with Composer on Pantheon
subtitle: Create a Composer-managed WordPress Site with Bedrock
description: Learn more about Bedrock for Composer-managed WordPress sites.
categories: [develop]
tags: [wordpress]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/wordpress-composer/bedrock-composer
anchorid: bedrock-composer
---

This section provides information on how to use Bedrock with Integrated Composer on a WordPress site.

WordPress does not natively support [Composer](https://getcomposer.org/), however, Bedrock is a WordPress-specific framework for using Composer on WordPress sites. [Bedrock](https://roots.io/bedrock/) also provides a custom WordPress project structure that helps simplify working on large projects with multiple plugins and custom code.

## Create a New Pantheon WordPress Site with Bedrock

1. Run the following command in Terminus:

    ```bash
    composer create-project roots/bedrock your_site
    ```

1. Run the `git init` command.

1. Navigate to the Pantheon dashboard and click **Connection Info**.

1. Copy the SSH Clone Url string and remove everything except the git repository, for example:

    ```bash
    ssh://codeserver.dev.{your site id}@codeserver.dev.{your site id}.drush.in:2222/~/repository.git).
    ```

1. Run the following command in Terminus:

    ```bash
    git remote add origin your_git_repository_url
    ```

1. Run the following commands to add the Bedrock-initialized files to your new git project:

    ```bash
    git add .
    git commit -m "Initialize Bedrock"
    ```

1. Switch to Git mode in the [Pantheon Dashboard](/guides/quickstart/connection-modes/#git-connection-mode) or via Terminus: 

    ```bash
    terminus connection:set your_site_name.dev git`
    ```

1. Run the following command to force-push your changes:

    ```bash
    git push --set-upstream origin master -f
    ```

1. Move your project's `.env`file to `files/private` and update the [environment variables](https://docs.roots.io/bedrock/master/environment-variables/#wp-env).

1. Remove the `vendor` directory from the `gitignore` folder and commit it.

    - Pantheon does not support using Composer to install dependencies that are deployed to Pantheon servers. You must commit the entire `vendor` directory into your Git repo to ensure that your dependencies are installed for the new project.

1. Convert the `web/app/uploads` directory to a symlink that points to the `files` directory.

    - This is necessary because Pantheon stores media files in the `files` directory instead of the `uploads` directory.

1. Remove the `.env` file from the Bedrock `gitignore` folder and store it outside of the project root on the Pantheon server.

    - Bedrock uses environment variables to manage sensitive credentials. These environment variables usually come from multiple sources. The most important variable is the `.env` file which Bedrock uses instead of the standard WordPress `wp-config.php` file. Bedrock is configured to look for the `.env` file in the `files/private` directory by default. This is also the location where Pantheon stores all files that shouldn't be accessible to the public.

1. Use [SFTP or git](/guides/wordpress-git/) to push changes directly to your Pantheon site.

## More Resources

- [Using Git with SFTP & WordPress](/guides/wordpress-git/)

- [Terminus Connection Info](/terminus/commands/connection-info)