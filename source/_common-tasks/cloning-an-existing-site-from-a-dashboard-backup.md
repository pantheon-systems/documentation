---
title: Cloning an Existing Site from a Dashboard Backup
filename: source/_common-tasks/cloning-an-existing-site-from-a-dashboard-backup.md
---

## Cloning an Existing Site from a Dashboard Backup
All Pantheon sites consist of three parts:
1. Code: The code that makes up your Drupal or WordPress site . This is contained within your Pantheon Git repository.
2. Files: Images, user uploads and other files which are not stored in version control, located in /sites/default/files (Drupal) or /wherever/wp-uploads/go (WordPress).
3. Database: The MySQL database utilized by your code to store content, settings, etc.

### **Step 1. Copying Your Code/Files/Database**

1. In the Dashboard for the site you want to copy, go to the Live environment and click on "Backups".
2. Select the backup you want to clone from, and download each of the backup files (Code, Database, Files) by clicking on the download icon. 

### **Step 2. Creating A New Pantheon Site​, Importing Your Code/Files/Database.**

1. Go to your Sites and Account page on [https://dashboard.getpantheon.com/](https://dashboard.getpantheon.com/)
2. Click on "Create A New Site".
3. Name your new site.
4. Select "Import site" from the "Choose your Start State" options.
5. Choose the "click here to provide separate code, files and database archives" link.
6. In each of the form fields provided, change the option from URL to File, then select the respective archives previously downloaded. Then click the "Import Site" button.  
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/344272)
7. The import process will create and deploy a new site based on the files uploaded. If there are issues, please refer to our [importing](/documentation/advanced-topics/importing-an-existing-drupal-site-to-pantheon/-importing-an-existing-site) document for possible solutions or open a support ticket from your dashboard. Be sure to include any error messages or relevant information.




<!-- strong>Additional Considerations:</strong> <!-- ol>
	<li><strong>Retaining Git History, importing large file structures and/or databases:</strong><br />
	​The methods in this article will work well for small to medium sized sites, but will not import the Git repository commit history or logs. Also, Pantheon&#39;s import process is not made to hand exceptionally large file structures or databases. For any of these scenarios, please see: <a href="/documentation/howto/importing-a-large-site/-importing-a-large-site" target="_blank">Importing A Large Site</a>.​</li --> ** **
