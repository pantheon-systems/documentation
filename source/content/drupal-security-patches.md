---
title: Drupal Security Patches
description: How to manually patch Drupal 7 and 8 with security patches, ahead of the upstream updates.
cms: "Drupal"
categories: [develop]
tags: [security, updates]
contributors: [alexfornuto, ari]
---

When Drupal releases critical security releases, Pantheon takes immediate steps to patch our Drupal upstreams. These updates may not always be accessible for users who:

- use a [Custom Upstream](/guides/custom-upstream) or [Public Distribution](/start-state/#public-distributions) which hasn't been patched, or no upstream
- encounter merge conflicts when applying upstream updates

This doc describes how to manually patch your Drupal core.

<Alert title="Warning" type="danger">

Use the [standard process to update core](/core-updates) if the security patch is available to be applied in the Site Dashboard. The advanced method described on this page is intended to be used when a security patch is not yet available as a one-click update in the Site Dashboard, or when handling merge conflicts.

</Alert>

Visit the [Drupal Security page](https://www.drupal.org/security) for the latest Drupal security announcements and patches.

## Apply Patch Using Git

You'll need a local git clone of your site code.

For the steps below, replace `$PATCHNUM` with the patch number from Drupal and `$PATCHPATH` with the URL to the patch, or export the variables to your shell session.

1. Change directory to your site code. For example:

    ```bash
    cd ~/repos/site-name/
    ```

2. Make sure your local copy is up to date:

    ```bash
    git pull origin master
    ```

3. Download and apply the patch:

    ```bash
    curl -O $PATCHPATH
    patch -p1 < $PATCHNUM.patch
    ```

4. Remove the patch file, and stage code changes:

    ```bash
    rm $PATCHNUM.patch
    git add .
    ```

5. Confirm your changes:

    ```bash
    git status
    ```

6. Commit and push your changes back to Pantheon:

    ```bash
    git commit -m "Manually apply Drupal security patch"
    git push origin master
    ```

## Apply Patch Using Composer

1. Add `patch` to your `composer.json` file:

    ```json:title=composer.json
    {
    "require": {
      "cweagans/composer-patches": "~1.0",
      "drupal/core-recommended": "^8.8",
    },
    ```

1. Add a `patches` folder to the root of your `composer.json` file.

1. Add an `extras` section inside your `composer.json` file:

    ```json:title=composer.json
    "extra": {
      "patches-file": "local/path/to/your/composer.patches.json"
    }
    ```

1. Run `composer install`.

  This removes the core version, including libraries and dependencies, before re-downloading the core (plus libraries and dependencies), and applying the patch.

## Apply and Manage Drupal Module Patches with Composer

  Read [Drupal's documentation](https://www.drupal.org/docs/develop/using-composer/using-composer-to-install-drupal-and-manage-dependencies#patches) to learn more about applying and managing module patches with Composer.

## Lock Multidev Environments


As an additional security measure, sites with [Multidev](/guides/multidev) environments should consider [locking](/guides/secure-development/security-tool) them until they can be patched. If you have [Terminus](/terminus) installed on your local computer, you can lock all environments at once with the following Bash script:

```bash
#!/bin/bash

#############################################################
# This script will, for a specified Pantheon site, lock all #
# multidev environments for the site.                       #
############################################################

# Asks user for the site name.
read -p 'Site name: ' SITE

# Define a user name and password to lock the site with.
read -p 'Username to unlock the environments (NOT your Pantheon account username): ' USER
read -sp 'Password: ' PASSWORD

echo

ALL_ENVS="$(terminus env:list $SITE --field=id | grep -v live | grep -v dev | grep -v test)"

for ENV in $ALL_ENVS ; do
  is_locked="$(terminus lock:info "$SITE.$ENV" --field=locked)"
  if [[ "$is_locked" == "true" ]] ; then
    echo "# $SITE.$ENV is already locked"
  else
    echo "# Locking $SITE.$ENV"
    terminus lock:enable "$SITE.$ENV" "$USER" "$PASSWORD"
  fi
done

```

## More Resources

- [Drupal Security Advisory](https://www.drupal.org/security)
