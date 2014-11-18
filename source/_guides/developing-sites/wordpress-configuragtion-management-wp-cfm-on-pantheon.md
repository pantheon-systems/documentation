---
title: WordPress Configuragtion Management (wp-cfm) on Pantheon
parent_guide:
  - developing
filename: source/_docs/wordpress-configuragtion-management-wp-cfm-on-pantheon.md
---

Use steps 1-3 to track and deploy configuration changes from Dev to Test and Live. 

## Install wp-cfm
Keeping your dev environment in sftp-mode, install the [wp-cfm plugin](https://wordpress.org/plugins/wp-cfm/) on your development site, and create a new directory: wp-content/config. Return to the site dashboard (#dev/code), type “Install wp-cfm for configuration management and create the **wp-content/config** directory for it to function”, and click **Commit** .   
Deploy and enable the plugin on your test and live environments.
## 1. Track configuration
Go to Dev’s wp-admin/options-general.php?page=wpcfm, click **new bundle** , name the bundle, use the check boxes to track options, and click **Push** . 
## 2. Commit and Deploy with the Pantheon Workflow
Return to the site dashboard at **#dev/code** . Verify options, write a message and click **C**** ommit **. Go to** #test/code **, and click** Copy Content from Live and Deploy Code from Development. **  


Go to Test’s wp-admin/options-general.php?page=wpcfm. Click **Pull** and **OK** for the bundle you want to deploy to the database. The settings from Dev are now reflected on Test. Test your configuration against the live content.
## 3. Deploy to the **Live environment. **
In the site dashboard at **#live/code** , pull the tested configuration from Test to Live. Go to Live's wp-admin/options-general.php?page=wpcfm and click **Pull** and **OK** for the same bundle. Verify the successful deployment.
