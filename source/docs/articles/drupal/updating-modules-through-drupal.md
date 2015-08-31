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
2. Once you’re in that site’s Dashboard, click the **Code** tab in the Dev environment.
3. Make sure **SFTP** mode is selected.  
 ![](/source/docs/assets/images/desk_images/360095.png)
4. Click **Visit Development Site**, and go to the Modules administration page (`/admin/modules/update`).
5. Select the **Update** tab, and click **Check Manually**.
6. If there are updates available, select the ones you want and click **Download These Updates**.  
 ![](/source/docs/assets/images/desk_images/360097.png)
7. Once the updates are downloaded successfully, select **“Perform updates…”** and click **Continue**.  
 ![](/source/docs/assets/images/desk_images/360098.png)
8. The updates will run, and if there are any database updates required, you will have the option to do so. If there were no issues, your module(s) will reflect their new versions in the Modules page.
9. Go back to your site’s Pantheon Dashboard. The updated files will now show in the Dev environment’s Code tab, ready to commit. Add a commit message, and click **Commit** to add them to your Git repository.  
 ![](/source/docs/assets/images/desk_images/360246.png)
