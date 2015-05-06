---
title: Manually Apply Drupal 7.32 Security Update
description: Instructions on updating to Drupal 7.32.
category:
  - drupal
keywords: drupal, update, updating, security,
---
If your Drupal 7 site is based on the Pantheon Drupal 7 upstream, you will be able to apply a one-click update in your dashboard. If you are running a site that does not yet have a one-click update available, we recommend you manually make the update immediately.

1. Download [Drupal 7.32 Security Update](https://github.com/drupal/drupal/commit/26a7752c34321fd9cb889308f507ca6bdb777f08.patch)
2. Apply the patch [per usual](https://www.drupal.org/patch/apply) or if you don’t use Git you can connect to your Dev environment via SFTP and edit includes/database/database.inc changing line 739 from
  ```
  foreach ($data as $i => $value) {
    ```
    to
    ```
    foreach (array_values($data) as $i => $value) {
    ```
3. That's it! Just make sure to pull your code from Dev, to Test, to Live.
 

For example, from your local machine:

    $ cd panopoly-site/includes/database/


    $ git pull origin master


    $ curl -O https://github.com/drupal/drupal/commit/26a7752c34321fd9cb889308f507ca6bdb777f08.patch


    $ patch -p1 < 26a7752c34321fd9cb889308f507ca6bdb777f08.patch


    File to patch: database.inc


    $ git add database.inc


    $ git commit -m "Manually apply Drupal 7.32 security patch"


    $ git push origin master

 
