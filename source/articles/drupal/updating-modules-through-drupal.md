---
title: Updating Modules Through Drupal
description: Learn how to update Drupal modules.
parent_guide:
  - developing
  - supporting
framework:
  - drupal
filename: source/_guides/updating-modules-through-drupal.md
---

## **Updating Modules Through Drupal**
Drupal has a very good, built-in system for updating contributed modules through the administrative interface.
1. Log in to Pantheon, and choose the site you want to update.
2. Once you’re in that site’s Dashboard, click the Code tab in the Dev environment.
3. Make sure  SFTP mode is selected.  
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/360095)
4. Click Visit Development Site, and go to the Modules administration page (/admin/modules/update).
5. Select the Update tab, and click Check Manually.
6. If there are updates available, select the ones you want and click Download These Updates.  
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/360097)
7. Once the updates are downloaded successfully, choose “Perform updates…” and Continue.  
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/360098)
8. The updates will run, and if there are any database updates required, you will have the option to do so. If not, and there were no issues and Drupal will finish and your module(s) will reflect their new versions in the Modules page.
9. Go back to your site’s Pantheon dashboard. The updated files will now show in the Dev environment’s code tab, ready to commit. Add a commit message, and then click the Commit button to add them to your Git repository.  
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/360246)
10. The updated modules are now committed to your Drupal site’s repository, and you can continue using it as normal.
