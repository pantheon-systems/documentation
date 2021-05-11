---
title: Build Tools to D9 with Build Tools
subtitle: subtitle
description: Description
categories: [develop]
cms: drupal-9
tags: [code, launch, migrate, site, updates]
contributors: [stovak]
reviewed: "2021-05-15"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-migration/build-tools-to-d9-build-tools
anchorid: drupal-9-migration/build-tools-to-d9-build-tools
editpath: drupal-9-migration/06-build-tools-to-d9-build-tools.md
---

In this doc, you'll create a new Drupal 9 site and migrate the code from an existing Drupal 8 site to it.

## Will This Guide Work for Your Site?

<Partial file="drupal-9/upgrade-site-requirements.md" />

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

This doc uses the following aliases:

- **Alias:** alias

## Build Tools Workflow

This tutorial is for you if you meet the following criterion:

1. You have an external repository outside of pantheon that manages your site's code.

1. You use a build service like Github Actions, Circle CI or Travis to "build" the site.

1. Those build artifacts are pushed to your pantheon repo.

1. Your site has a blue banner and is database-ready for the upgrade to d9


## Tools you will need:

brew install terminus jq rsync


## Wagons HO!:

* clone your github source repo and cd into the directory, then:

 `git checkout -b d9-upgrade-2021` 

* Let's export the configs from production to make sure our local version has the latest:

```bash
# Export the latest from the live environment
# to sites/default/files/config
terminus drush gk-8.live -- config:export \
   --destination sites/default/files/config

# Use terminus to get the (read-only) SFTP command
# specific to the live environment.
SFTP_COMMAND=$(terminus connection:info gk-8.live \
   --format=json | jq -r ".sftp_command")

# For rysnc, all we really need is the crazy-long
# user and host name. Strip out the rest.
# (Make sure the empty space is there at the end 
# before the bracket!)
RSYNC_HOST=${SFTP_COMMAND#sftp -o Port=2222 } 

# Use that hostname to do an rsync from that recent
# config:export
rsync -rvlz --copy-unsafe-links --size-only --checksum \
   --ipv4 --progress -e 'ssh -p 2222' \
   "${RSYNC_HOST}:files/config" .
```

   If you do a `git status` it should changed files in the `config` directory if there are any changed configs in production.

### Let's start ugradin' stuff!

```bash
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

* Edit your composer file and change the following:

```json
  "scripts": {
    "build-assets": [
      "@prepare-for-pantheon",
      "composer install --optimize-autoloader --no-dev"
    ],
```

TO:

```json
[...]
  "scripts": {
    "build-assets": [
      "@prepare-for-pantheon",
      "composer install --optimize-autoloader"
    ],
[...]
```

   Removing the "--no-dev" portion of that line. This will allow your dev dependencies to be available in the integration environment.

`composer update -W --optimize-autoloader --prefer-dist`

1. If your site doesn't already have a pantheon.yml file, create one ensuring the following values:

```yaml
api_version: 1
web_docroot: true
php_version: 7.4
database:
  version: 10.4
drush_version: 10
enforce_https: full+subdomains
```

   It's ok if the file has more values than this in it, but these are the ones with which we are concerned. If the values already exist in the `pantheon.yml` file, change them to the values above. (Values accurate as of date())

```
git add composer.json composer.lock pantheon.yml config/*
git commit -m 'updating to drush 10/mariadb 10.4/config'
git push origin d9-upgrade-2021
```

If all has gone well, you will see something like the following:
```
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
remote: 
remote: Create a pull request for 'd9-upgrade-2021' on GitHub by visiting:
remote:      {{SOME URL TO YOUR REPOSITORY}}
remote: 
```

COPY/PASTE that convenient URL into your browser to create a pull request. Creating a pull request will cause Build Tools to create an INTEGRATION ENVIRONMENT. 

After the build has finished without error, you will see a new environment in the dashboard under "multi-dev" named to reference your pull request. Mine was `pr-146`.

`terminus drush {site name}.{integration env} pm-enable upgrade_status --yes`

You can get a one-time login to your site with the following command: 
`terminus drush {site name}.{integration env} uli admin`

Log into your site as admin and take a look under reports at "UPGRADE STATUS". Any modules Upgrade Status says are incompatible will need to be updated in the next few steps. Take note of the versions "UPGRADE STATUS" recommends. If your module is compatible it will need to be removed from the composer file.

## Custom Module Code:

Custom module code is outside the scope of this document. See drupal.org for getting your custom code updated with the new version numbers and any code deprecations.

* Temporarily add write access to protected files and directories:

```bash
		chmod 777 web/sites/default
		find web/sites/default -name "*settings.php" \
		  -exec chmod 777 {} \;
		find web/sites/default -name "*services.yml" \
		  -exec chmod 777 {} \;
```

## Heads turn as the star of our show makes an entrance: **CORE**

```bash

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

If you have any obsolete modules uncovered by "UPGRADE STATUS" update them here using the '**--no-update -W**' switch because that will keep composer from the process of figuring out the module solution (which is the thing that takes so long in a composer run) until the very end and update all the dependencies along with.

When you're done updating modules, run

`composer update -W --optimize-autoloader --prefer-dist`

If you get an error, you probably haven't weeded out all the non-d9 module and theme updates and will need to have another look at the "Upgrade status" report in your integration environment.

Once the update/install runs clean without errors:

* Edit your composer file and change the following:

```composer.json
[...]
  "scripts": {
    "build-assets": [
      "@prepare-for-pantheon",
      "composer install --optimize-autoloader"
    ],
[...]
```

TO:

```composer.json
[...]
  "scripts": {
    "build-assets": [
      "@prepare-for-pantheon",
      "composer install --optimize-autoloader --no-dev"
    ],
[...]
```

That way, when the build arrives in production it arrives without all the dev dependencies.

```
git add composer.json composer.lock pantheon.yml
git commit -m 'upgrade core to d9'
git push origin d9-upgrade-2021
```

1. Review the site, then proceed to launch using the [Pantheon Relauch](/relaunch) documentation.
