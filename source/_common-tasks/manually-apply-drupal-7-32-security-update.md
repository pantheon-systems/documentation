---
title: Manually apply Drupal 7.32 security update
filename: source/_docs/manually-apply-drupal-7-32-security-update.md
---

If your Drupal 7 site is based on the Pantheon Drupal 7 upstream then you will be able to apply a 1-click update in your dashboard. If you are running a site that does not yet have a 1-click update available, however, we recommend you immediately manually make the update.

1. Download [https://github.com/drupal/drupal/commit/26a7752c34321fd9cb889308f507ca6bdb777f08.patch](https://github.com/drupal/drupal/commit/26a7752c34321fd9cb889308f507ca6bdb777f08.patch)
2. Apply patch per usual [https://www.drupal.org/patch/apply](https://www.drupal.org/patch/apply) or if you don’t use Git you can connect to your Dev environment via SFTP and edit includes/database/database.inc changing line 739 from

    foreach ($data as $i => $value) {

to

    foreach (array_values($data) as $i => $value) {

3. That's it! Just make sure to pull your code from Dev, to Test, to Live.
 

For example, from local machine:

    $ cd panopoly-site/includes/database/


    $ git pull origin master


    $ curl -O https://github.com/drupal/drupal/commit/26a7752c34321fd9cb889308f507ca6bdb777f08.patch


    $ patch -p1 < 26a7752c34321fd9cb889308f507ca6bdb777f08.patch


    File to patch: database.inc


    $ git add database.inc


    $ git commit -m "Manually apply Drupal 7.32 security patch"


    $ git push origin master

 
