---
title: D8 with Build Tools to D9 with Build Tools
subtitle: "Upgrade-in-place: Drupal 8 with Build Tools"
description: Upgrade a Drupal 8 site with Build Tools on Pantheon to a Drupal 9 site with Build Tools on Pantheon
categories: [develop]
cms: drupal-9
tags: [code, launch, migrate, site, updates]
contributors: [stovak]
reviewed: "2021-05-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-migration/build-tools-to-d9-build-tools
anchorid: drupal-9-migration/build-tools-to-d9-build-tools
editpath: drupal-9-migration/06-build-tools-to-d9-build-tools.md
---

This doc shows how to upgrade a Drupal 8 site that uses [Build Tools](/guides/build-tools) to a Drupal 9 site that continues to use the Build Tools workflow.

## Will This Guide Work for Your Build Tools Workflow?

This tutorial is for you if the site:

1. Code is managed using an external repository outside of Pantheon (GitHub, GitLab, Bitbucket, etc.)

1. Is built through a service like GitHub Actions, Circle CI, or Travis

1. Build artifacts are pushed to your Pantheon repository.

1. Has a blue banner across the top that says that the site is compatible with a [database upgrade](/pantheon-yml#specify-a-version-of-mariadb):

   > Good news, your site's database version is now configurable! Learn how.

   [Contact Support](/support) if you're ready to use Drupal 9, but you don't see the banner on the Dashboard.

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

Install Bash JSON Query and rsync if they aren't already installed:

```bash{promptUser: user}
brew install terminus jq rsync
```

This doc uses the following aliases:

- **Alias:** $SITE

## Wagons HO!

- Clone your GitHub source repo and `cd` into the directory, then:

```bash{promptUser: user}
git checkout -b d9-upgrade-2021
```

- Let's export the configs from production to make sure our local version has the latest:

```bash{promptUser: user}
# Export the latest from the live environment
# to sites/default/files/config
terminus drush gk-8.live -- config:export \
   --destination sites/default/files/config

# Use terminus to get the (read-only) SFTP command
# specific to the live environment.
SFTP_COMMAND=$(terminus connection:info gk-8.live \
   --format=json | jq -r ".sftp_command")

# For rysnc, all we really need is the long
# user and host name. Strip out the rest.
# (Make sure the empty space is there at the end
# before the bracket!)
RSYNC_HOST=$(terminus connection:info {Site Name}.live --field=sftp_host)

# Use that hostname to do an rsync from that recent
# config:export
rsync -rvlz --copy-unsafe-links --size-only --checksum \
   --ipv4 --progress -e 'ssh -p 2222' \
   "${RSYNC_HOST}:files/config" .
```

   If you do a `git status` it should show changed files in the `config` directory if there are any changed configs in production.

### Let's start ugradin' stuff!

```bash{promptUser: user}
   composer require \
     drupal/upgrade_status:^3 \
     drupal/devel:^4 \
     drush/drush:^10 \
     -W --no-update
   composer require \
     phpunit/phpunit:"^8 | ^9 | ^10" \
     phpstan/phpstan \
     --dev -W --no-update
```

- Enable deep patching to view the correct MariaDB version.

  The `pantheon-systems/drupal-integrations` project now includes a patch that backports a bugfix from Drupal 9 to Drupal 8 to display the correct version of your MariaDB server. If this patch is not installed, then your database version will always be reported as `Mysql 5.5.30`.

  The `cweagans/composer-patches` Composer plugin will only install patches from dependencies if the `enable-patching` property is set to `true` in `composer.json`

  ```bash{promptUser: user}
  composer config extra.enable-patching true
  ```

- Edit `composer.json` and remove `--no-dev` from the `scripts` section:

```json:title=composer.json
  "scripts": {
    "build-assets": [
      "@prepare-for-pantheon",
      "composer install --optimize-autoloader --no-dev"
    ],
```

To:

```json:title=composer.json
...
  "scripts": {
    "build-assets": [
      "@prepare-for-pantheon",
      "composer install --optimize-autoloader"
    ],
...
```

   Removing the `--no-dev` portion of that line will allow your dev dependencies to be available in the integration environment.

```bash{promptUser: user}
composer require cweagans/composer-patches drupal/upgrade_status --no-update
composer update -W --optimize-autoloader --prefer-dist
```

1. If your site doesn't already have a `pantheon.yml` file, create one with the following values (the comments `#` are optional):

```yaml:title=pantheon.yml
api_version: 1

# Moves the DOCUMENT_ROOT of your site to
# the */web* folder.
web_docroot: true

# Drupal 9 requires 7.3 or higher
# If your code isn't ready for 7.4 you
# may need to back this off to 7.3.
php_version: 7.4

# Drupal 9 requires a higher version of the db.
# this will take a few minutes to complete
# the upgrade to 10.4 once you push this file.
database:
  version: 10.4

# Drupal 9 "likes" drush 10. If you have written
# a lot of custom drush commands you may need to
# go back to drush 9 or 8.
drush_version: 10
```

   It's ok if the file has more values than this in it, but these are the ones with which we are concerned. If the values already exist in the `pantheon.yml` file, change them to the values in this example.

```bash{promptUser: user}
git add composer.json composer.lock pantheon.yml config/*
git commit -m 'updating to drush 10/mariadb 10.4/config'
git push origin d9-upgrade-2021
```

If all has gone well, you will see something like the following:

```bash{outputLines:1-5}
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
remote:
remote: Create a pull request for 'd9-upgrade-2021' on GitHub by visiting:
remote:      {{SOME URL TO YOUR REPOSITORY}}
remote:
```

COPY/PASTE that convenient URL into your browser to create a pull request. Creating a pull request will cause Build Tools to create an INTEGRATION ENVIRONMENT.

After the build has finished without error, you will see a new environment in the dashboard under "multi-dev" named to reference your pull request. Mine was `pr-146`.

```bash{promptUser: user}
terminus drush {site name}.{integration env} pm-enable upgrade_status --yes
```

You can get a one-time login to your site with the following command:

```bash{promptUser: user}
terminus drush {site name}.{integration env} uli admin
```

Log into your site as admin and take a look under reports at "UPGRADE STATUS". Any modules Upgrade Status says are incompatible will need to be updated in the next few steps. Take note of the versions "UPGRADE STATUS" recommends. If your module is incompatible it will need to be removed from the composer file.

## Custom Module Code

Custom module code is outside the scope of this document. See [drupal.org](https://www.drupal.org/docs/creating-custom-modules) for getting your custom code updated with the new version numbers and any code deprecations.

- Temporarily add write access to protected files and directories:

```bash{promptUser: user}
    chmod 777 web/sites/default
    find web/sites/default -name "*settings.php" \
      -exec chmod 777 {} \;
    find web/sites/default -name "*services.yml" \
      -exec chmod 777 {} \;
```

## Heads turn as the star of our show makes an entrance: **CORE**

```bash{outputLines: 3-6,9-14,16}
composer remove drupal/config_installer --no-update
composer require drupal/core-recommended:^9 \
   drupal/core-composer-scaffold:^9 \
   drupal/core-project-message:^9  \
   drush/drush:^10 \
   -W --no-update

composer require phpunit/phpunit:^9 \
   behat/behat:^3 \
   drupal/drupal-extension:^4 \
   --no-update -W --dev

# If you have drupal/core-dev installed.

composer require drupal/core-dev:^9 \
	 --dev -W --no-update
```

If you have any obsolete modules uncovered by `UPGRADE STATUS` update them here using the `**--no-update -W**` switch because that will keep composer from the process of figuring out the module solution (which is the thing that takes so long in a composer run) until the very end and update all the dependencies along with.

When you're done updating modules, run

```bash{promptUser: user}
composer update -W --optimize-autoloader --prefer-dist
```

If you get an error, you probably haven't weeded out all the non-D9 module and theme updates and will need to have another look at the "Upgrade status" report in your integration environment.

Once the update/install runs clean without errors:

- Edit `composer.json` and remove `--no-dev` from the `scripts` section:

```json:title=composer.json
...
  "scripts": {
    "build-assets": [
      "@prepare-for-pantheon",
      "composer install --optimize-autoloader"
    ],
...
```

To:

```json:title=composer.json
...
  "scripts": {
    "build-assets": [
      "@prepare-for-pantheon",
      "composer install --optimize-autoloader --no-dev"
    ],
...
```

That way, when the build arrives in production it arrives without all the dev dependencies.

```bash{promptUser: user}
git add composer.json composer.lock pantheon.yml
git commit -m 'upgrade core to d9'
git push origin d9-upgrade-2021
```

## Validation

Validate your database version with the following command:

```bash{promptUser: user}
terminus drush $site.{env} sqlq "SELECT VERSION();"
```

1. Review the site and [Launch Check Status tab](/drupal-launch-check) to confirm the database version and any outstanding available updates.
