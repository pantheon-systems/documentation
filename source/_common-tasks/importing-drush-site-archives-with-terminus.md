---
title: Importing Drush Site Archives with Terminus
filename: source/_common-tasks/importing-drush-site-archives-with-terminus.md
---

One of the easiest ways to move an existing Drupal site to Pantheon is to import a [Drush archive file](http://drush.ws/#archive-dump) using our [Terminus command-line interface](/documentation/advanced-topics/terminus-the-pantheon-command-line-interface/-terminus---the-pantheon-command-line-interface). This automates the packaging of the existing installation, improving the changes of success!

## Prerequisites

There are a few things you'll need in order to make this work:

1. A Pantheon account with at least one free dev site slot open. [Pantheon is free](https://dashboard.getpantheon.com/register), and if you need an extra dev site to try this out, just ask and we'll be happy to grant you one.
2. A working local Drush installation that is up to date with 5.x or 6.x stable.
3. Drush access to your existing Drupal site.

Once you've got the above taken care of, you are ready to roll.

## Generate a Drush Archive

The first thing we'll need is to generate a drush archive of your existing site. If you have Drush access to the site direct via the shell, this is pretty easy using the archive-dump command:

    $shell> drush archive-dump --destination=drush-archive.tar.gz

Executed from the site root, that will create a file called `drush-archive.tar.gz` that's available via the public internet. If you have the file locally, you can put it on dropbox, S3 or any number of other palces.

The important thing is that you have a drush archive that can be downloaded via a URL. Now to pull it onto Pantheon.

## Set up Terminus

If you haven't already, you'll want to set up Terminus, the Pantheon CLI tool, using Composer as described in [the GitHub Readme file](https://github.com/pantheon-systems/terminus):

    # Install composer if needed.
    curl -sS https://getcomposer.org/installer | php
    mv composer.phar /usr/local/bin/composer
    # Download Terminus for non-development use.
    composer create-project pantheon-systems/terminus $HOME/.drush/terminus -s dev --no-dev -n
    # Clear Drush's cache.
    drush cc drush

If you'd like to install Terminus via another method, there are alternatives at the [GitHub project](https://github.com/pantheon-systems/terminus).

## Import Your Archive

Importing a Drush site archive as we've prepared it above is easy. First you'll authenticate into Pantheon with Terminus:

    $shell> drush pantheon-auth
    Pantheon account email address: you@yourdomain.com
    Pantheon dashboard password for you@yourdomain.com: xxxxxx
    Authenticating as you@yourdomain.com
    Success!

You're now ready to perform command-line operations with Pantheon! For instance, you can run `drush pantheon-sites` to get a list of your existing sites.

The process to interactively start an import is as follows:

    $shell>: drush psite-import
    Provide a name for the site. This will be part of the default URL: my-drush-import
    URL containing Drush archive: http://mysite.com/drush-archive.tar.gz
    Site is now building.
    The new site's UUID is xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

At that point the script will poll as the site containers are spun up and the archive is imported. You can wait for that to complete, or cancel out and check back in your dashboard.

## Automating Imports

Every aspect of the Terminus process is designed to support automation. You can kick off an import non-interactively using the following options:

    drush psite-import sitename http://url.to/archive.tar.gz --label="Site Name" --nopoll

You can script out imports like this to run several concurrently (or in serial).

Terminus is a rapidly evolving project, so stay tuned. Let us know what you would like to see, and forks and pull requests are always welcome!
