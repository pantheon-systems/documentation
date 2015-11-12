---
title: Importing Drush Site Archives with Terminus
description: Import a Drupal Drush site archive using the Terminus, the Pantheon CLI tool.
category:
  - getting-started
keywords: drush, terminus, pantheon, move site, import site,
---
One of the easiest ways to move an existing Drupal site to Pantheon is to import a [Drush archive file](http://drush.ws/#archive-dump) using our [Terminus command-line interface](/docs/articles/local/cli/). This automates the packaging of the existing installation, improving the changes of success.

## Before You Begin

There are a few things you'll need in order to make this work:

1. A Pantheon account with at least one free Dev site slot open. [Pantheon is free](https://dashboard.pantheon.io/register), and if you need an extra Dev site to try this out, just ask and we'll be happy to grant you one.
2. A working local Drush installation that is up to date with 5.x or 6.x stable.
3. Drush access to your existing Drupal site.

## Generate a Drush Archive

The first thing you'll need to do is to generate a Drush archive of your existing site. If you have Drush access to the site direct via the shell, it's easy with the archive-dump command:
```bash
drush archive-dump --destination=drush-archive.tar.gz
```
Executed from the site root will create a file called drush-archive.tar.gz that's available via the public internet. If you have the file locally, you can put it on Dropbox, S3, or any number of other places. The important thing is that you have a Drush archive that can be downloaded via a URL.

## Set Up Terminus

If you haven't already, set up Terminus, the Pantheon CLI, using Composer as described in the [installation instructions on GitHub](https://github.com/pantheon-systems/cli/wiki/installation).

## Import Your Archive

Importing a Drush site archive as we've prepared it above is easy. First you'll authenticate into Pantheon with Terminus:
```bash
terminus auth login
Pantheon account email address: you@yourdomain.com
Pantheon dashboard password for you@yourdomain.com: xxxxxx
Authenticating as you@yourdomain.com
Success!
```
You're now ready to perform command-line operations with Pantheon! For instance, you can run `terminus sites show` to get a list of your existing sites.

Start an interactive import:
```nohighlight
terminus sites import
Provide a name for the site. This will be part of the default URL: my-drush-import
URL containing Drush archive: http://mysite.com/drush-archive.tar.gz
Site is now building.
The new site's UUID is xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
At that point the script will poll as the site containers are spun up and the archive is imported. You can wait for that to complete, or cancel out and check back in your Dashboard.

## Automate Imports

Every aspect of the Terminus process is designed to support automation. You can kick off an import non-interactively using the following options:
```bash
terminus sites import --name=<sitename> --import=<archive/url.tar.gz>
```
You can script out imports like this to run several concurrently (or in serial).

Terminus is a rapidly evolving project, so stay tuned. Let us know what you would like to see, and forks and pull requests are always welcome!
