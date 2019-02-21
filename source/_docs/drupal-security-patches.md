---
title: Drupal Security Patches
description: How to manually patch Drupal 7 and 8 with security patches, ahead of the upstream updates.
categories: [drupal]
contributors: [alexfornuto, ari]
---

When Drupal releases critical security releases, Pantheon takes immediate steps to patch our Drupal upstreams. These updates may not always be accessible for users who:

- use a [Custom Upstream](/docs/custom-upstream/) or [Public Distribution](/docs/start-state/#public-distributions) which hasn't been patched, or no upstream
- encounter merge conflicts when applying upstream updates


This doc describes how to manually patch your Drupal core.

<div class="alert alert-danger" role="alert">
<h4 class="info">Warning</h4>
<p markdown="1">Use the [standard process to update core](/docs/core-updates/) if the security patch is available to be applied in the Site Dashboard. The advanced method described on this page is intended to be used when a security patch is not yet available as a one-click update in the Site Dashboard, or when handling merge conflicts.</p>
</div>

## SA-CORE-2018-006

On October 17, 2018 Drupal released a [critical security patch](https://www.drupal.org/SA-CORE-2018-006){.external} for Drupal 7 and 8.

If you need to keep your site on Drupal 8.5.x instead of moving to 8.6 or later, you can apply [this patch](https://patch-diff.githubusercontent.com/raw/pantheon-systems/drops-8/pull/239.patch){.external}.

## SA-CORE-2018-004

On April 25th 2018 Drupal release a [**highly critical** security patch](https://www.drupal.org/SA-CORE-2018-004){.extenral} to prevent remote code execution.

The Drupal community documentation describes how to [apply patches](https://www.drupal.org/patch/apply){.external} using git.

## SA-CORE-2018-002

On March 28 2018 Drupal released a [critical security patch](https://www.drupal.org/SA-CORE-2018-002){.external} for Drupal 7 and 8 (also affecting Drupal 6).

The Drupal community documentation describes how to [apply patches](https://www.drupal.org/patch/apply){.external} using git.

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

## Lock Multidev Environments

As an additional security measures, sites with [Multidev](/docs/multidev/) environments should consider [locking](/docs/security/) them until they can be patched. If you have [Terminus](/docs/terminus/) installed on your local computer, you can lock all environments at once with the following Bash script:

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

##See Also

 - [Drupal Security Advisory](https://www.drupal.org/SA-CORE-2018-002){.external}
