---
title: Clone a Drupal site on Pantheon using Drush
filename: source/_common-tasks/clone-a-drupal-site-on-pantheon-using-drush.md
---

## Clone a Drupal site on Pantheon using Drush
There are times when you need to copy an existing Drupal site to an entirely new, separate environment. While this isn't possible in an automated fashion via your Pantheon Dashboard, it is a relatively simple manual process. This article will step you through the basic method of doing so.
### **Step 1. Archiving Your Live Code/Files/Database**
 **Prerequisites:**  
 [Current drush aliases](/documentation/advanced-topics/drush-command-line-utility/-using-drush-on-pantheon)
1. From the command line, run [the drush ard](http://www.drushcommands.com/drush-6x/archive/archive-dump) command against the live environment. Set the destination parameter to include a file name.  
ex: `drush @pantheon.your-site.live ard --strict=0 --destination=sites/default/files/site\_export.tar.gz`

### **Step 2. Importing your archive to a new p**

1. Within your dashboard click link below to "Create A New Site".
2. Name your new site, and then select "Import site" from the "Choose your Start State" options. Next, select “import archive”.
3. Enter the full URL of the Live site you are cloning, plus the path of the archive created in Step 1.  
(ex. [https://your-live-site.gotpantheon.com/sites/default/site\_export.tar.gz](https://your-live-site.gotpantheon.com/sites/default/site_export.tar.gz)) Then click the “Import site” button.
4. The import process will create and deploy a new site based on the file uploaded. If there are issues, please refer to our [importing](/documentation/advanced-topics/importing-an-existing-drupal-site-to-pantheon/-importing-an-existing-site) document for possible solutions or open a support ticket from your dashboard. Be sure to include any error messages or relevant information.
