---
title: Updating Modules Through Drupal
description: Learn how to update contributed Drupal modules through the administrative interface.
category:
  - developing
  - drupal
keywords: updating modules, modules, drupal, update
---
Drupal has a very good, built-in system for updating contributed modules through the administrative interface.

## Update Modules Through Drupal

1. Log in to Pantheon, and choose the site you want to update.
2. Select the **Code** tool in the Dev environment.
3. Set the Connection Mode to  **SFTP**.
4. Click **Visit Development Site**, and go to the Modules administration page (`/admin/modules/update`).
5. Select the **Update** tab, and click **Check Manually**.
6. If there are updates available, select the ones you want and click **Download These Updates**.  
7. Once the updates are downloaded successfully, select **Perform updates in site maintenance mode** and click **Continue**.  
8. The updates will run, and if there are any database updates required, you will have the option to do so. If there were no issues, your module(s) will reflect their new versions in the Modules page.
9. Return to the **Code** tool in the Dev environment of the Site Dashboard.
10. Enter a commit message and click **Commit** to add changes to version control.
