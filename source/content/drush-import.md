---
title: Importing Drush Site Archives with Terminus
description: Import a Drupal Drush site archive using Terminus, the Pantheon CLI tool.
cms: "Drupal"
categories: [get-started]
tags: [migrate, terminus, drush]
---

One of the easiest ways to move an existing Drupal site to Pantheon is to import a [Drush archive file](https://drushcommands.com/drush-8x/core/archive-dump/) using our [Terminus command-line interface](/terminus). This automates the packaging of the existing installation, improving the chances of success.

Follow the steps below carefully to ensure that you import your Drupal site correctly.

## Before You Begin

1. Create a Pantheon account with at least one free Dev site slot open. 

   - A [Pantheon account is free](https://dashboard.pantheon.io/register), and if you need an extra Dev site to try this out, just ask and we'll be happy to grant you one.

1. Verify that you have Drupal 7 with Drush 8 if you have a non-Composer managed site *or* Drupal 9 with [Drush 11.1.1 or higher](https://www.drush.org/latest/install/) if you have a Composer-managed site.

1. Verify that you have Drush access to your existing Drupal site.

## Generate a Drush Archive

The first thing you'll need to do is to generate a Drush archive of your existing site. 

1. Navigate to site root.

1. Run the command below if you have Drush access to the site direct via the shell:

   ```bash{promptUser: user}
   drush archive-dump --destination=drush-archive.tar.gz
   ```

   - This creates a file called `drush-archive.tar.gz` that's available via the public internet. If you have the file locally, you can put it on Dropbox, S3, or any number of other places. The important thing is that you have a Drush archive that can be downloaded via a URL.

## Import Your Archive

<TabList>

<Tab title="Drupal 7 non-Composer" id="d7" active={true}>

1. Set up Terminus, the Pantheon CLI, if you haven't already using Composer as described in the [installation instructions on GitHub](https://github.com/pantheon-systems/cli/wiki/installation).

1. Authenticate into Pantheon with Terminus:

   ```bash{promptUser: user}
   terminus auth:login --email=<email> --machine-token=<machine_token>
   ```

   You're now ready to perform command-line operations with Pantheon! For instance, you can run `terminus site:list` to get a list of your existing sites.

1. Start an import:

   ```bash{promptUser: user}
   terminus site:import <site> <url>
   ```

    <Alert title="Note" type="info">
    Before starting an import make sure you have an existing site on your account.
    </Alert>

  At that point the script will poll as the site containers are spun up and the archive is imported. You can wait for that to complete, or cancel out and check back in your Dashboard.


</Tab>

<Tab title="Drupal 9 Composer-managed" id="d9">

1. Install [Terminus 3](/terminus/terminus-3-0) if you have a Composer-managed Drupal 9 site with Drush 11.1.1.

1. Install the [Terminus Conversion Tools](https://github.com/pantheon-systems/terminus-conversion-tools-plugin#installation) plugin. 

1. Run the command below to create the site on Pantheon. Change the `site-machine-name` to your machine's name.

```bash{promptUser: user}
 terminus conversion:import-site site-machine-name /path/to/archive.tar.gz --site-label="Site Label"
```

</Tab>

</TabList>

## Automate Imports

Every aspect of the Terminus process is designed to support automation. You can script imports like this to run several concurrently (or in serial).

Terminus is a rapidly evolving project, so stay tuned. Let us know what you would like to see, and forks and pull requests are always welcome!

## More Resources

- [Manually Migrate Sites to Pantheon](/migrate-manual)
- [Terminus Manual](/terminus)
- [Drupal Drush Command-Line Utility](/drush)