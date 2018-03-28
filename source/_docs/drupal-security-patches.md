---
title: Drupal Security Patches
description: How to manually patch Drupal 7 and 8 with security patches, ahead of the upstream updates.

---

On March 28 2018 Drupal released a critical security patch for D7 and D8. Pantheon provided this patch into their upstream immediately, but that may not be accessible for users who:

 - use a [Custom Upstream](/docs/custom-upstream/) or [Public Distribution](/docs/start-state/#public-distributions) which hasn't been patched, or no upstream
 - encounter merge conflicts when applying upstream updates

This doc describes how to manually patch your Drupal core.

## Mannually Patch Core

The Drupal community documentation describes how to [apply patches](https://www.drupal.org/patch/apply){.external} using git.


<ul class="nav nav-tabs" role="tablist">
  <li id="tab-1-id" role="presentation" class="active"><a href="#tab-2-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">Drupal 8.5</a></li>
  <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal 8.4</a></li>
  <li id="tab-3-id" role="presentation"><a href="#tab-3-anchor" aria-controls="tab-3-anchor" role="tab" data-toggle="tab">Drupal 8.3</a></li>
  <li id="tab-4-id" role="presentation"><a href="#tab-4-anchor" aria-controls="tab-3-anchor" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li id="tab-5-id" role="presentation"><a href="#tab-5-anchor" aria-controls="tab-3-anchor" role="tab" data-toggle="tab">Drupal 6.38</a></li>
</ul>
<div class="tab-content">

<div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">

### Apply Patch Using Git {.info}

You'll need a local git clone of your site code.

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
    curl -O https://github.com/drupal/drupal/commit/CHANGEME.patch
    patch -p1 < CHANGEME.patch
    ```

4. Commit and push your changes back to Pantheon:

    ```bash
    git commit -m "Mannually apply Drupal security patch"
    git push origin master
    ```

### Apply Patch Manually {.info}

</div>


<div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">

### Apply Patch Using Git {.info}

You'll need a local git clone of your site code.

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
    curl -O https://github.com/drupal/drupal/commit/CHANGEME.patch
    patch -p1 < CHANGEME.patch
    ```

4. Commit and push your changes back to Pantheon:

    ```bash
    git commit -m "Mannually apply Drupal security patch"
    git push origin master
    ```

### Apply Patch Manually {.info}

</div>


<div role="tabpanel" class="tab-pane" id="tab-3-anchor" markdown="1">

### Apply Patch Using Git {.info}

You'll need a local git clone of your site code.

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
    curl -O https://github.com/drupal/drupal/commit/CHANGEME.patch
    patch -p1 < CHANGEME.patch
    ```

4. Commit and push your changes back to Pantheon:

    ```bash
    git commit -m "Mannually apply Drupal security patch"
    git push origin master
    ```

### Apply Patch Manually {.info}

</div>


<div role="tabpanel" class="tab-pane" id="tab-4-anchor" markdown="1">

### Apply Patch Using Git {.info}

You'll need a local git clone of your site code.

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
    curl -O https://github.com/drupal/drupal/commit/CHANGEME.patch
    patch -p1 < CHANGEME.patch
    ```

4. Commit and push your changes back to Pantheon:

    ```bash
    git commit -m "Mannually apply Drupal security patch"
    git push origin master
    ```

### Apply Patch Manually {.info}

</div>

<div role="tabpanel" class="tab-pane" id="tab-5-anchor" markdown="1">

### Apply Patch Using Git {.info}

You'll need a local git clone of your site code.

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
    curl -O https://github.com/drupal/drupal/commit/CHANGEME.patch
    patch -p1 < CHANGEME.patch
    ```

4. Commit and push your changes back to Pantheon:

    ```bash
    git commit -m "Mannually apply Drupal security patch"
    git push origin master
    ```

### Apply Patch Manually {.info}

</div>

</div>

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

If you can, end your doc with links to external resources that can be used to improve the reader's comprehension, or to guides on logical next steps in a common development workflow.

 - [An internal guide with a relative link](/docs/get-started)
 - [An external guide with a full URL](http://writing.rocks/)
