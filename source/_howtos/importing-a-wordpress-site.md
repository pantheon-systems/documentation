---
title: Importing a WordPress Site
filename: source/_docs/importing-a-wordpress-site.md
---

 **NOTE:** Most WordPress sites with session-using code are relying on PHP's default session manager, which uses temporary files on local disk. Pantheon does not support this because it will not work properly in our distributed environment. You can read more [here](/documentation/advanced-topics/wordpress-and-php-sessions/-wordpress-and-php-sessions).

1. Prepare for import

You will need a zip or tar.gz archive of your site in three separate files:

1.

Codebase - all executable code, plugins, themes, and so forth.

2.

Database - contains the content of the site and some site configurations.

3.

Files - anything under wp-content/uploads. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, and so forth.

​There are two ways to import. Direct uploads from your desktop can be 100MB max; using a remote URL can be up to 500MB.

Popular plugins like [Duplicator](http://wordpress.org/plugins/duplicator/) and [BackupBuddy](http://ithemes.com/codex/page/BackupBuddy) will also do this for you. You should be able to simply upload the archive file they produce and Pantheon will do the rest. For large imports, pasting in a web-readable url (e.g. dropbox secret link) will be much faster than manually uploading. Make sure a link goes directly to the file, not a landing page.

Of course you can make an import archive by hand. You simply dump your existing database into a file ending with “.sql”, and make an archive file (zip or tar.gz) that contains that dump along with all your WordPress code.

2. Add and name a site

After you have created an account, you can log in and will be directed to your dashboard.

 

![Your sites & account dashboard](https://pantheon-systems.desk.com/customer/portal/attachments/247520)

 

Click on "Add a site." You will first be prompted to name the site. The only valid characters are letters, numbers and dashes. Enter a name and click continue.

 

![](https://pantheon-systems.desk.com/customer/portal/attachments/247523)

3. Wait while this happens

You will then have a short wait while Pantheon creates and allocates the resources for your site's environments. This takes only a few minutes under normal circumstances.

![](https://pantheon-systems.desk.com/customer/portal/attachments/247524)

4. Choose start state

You now have several options. Rather than start with one of our preconfigured start states, we will import our code, database and files.

 

Select “Import manually.”

 ![](https://pantheon-systems.desk.com/customer/portal/attachments/247521)  
 

Once selected, you can upload a single URL or file archive of the site.  


 ![](https://pantheon-systems.desk.com/customer/portal/attachments/259156)  


Alternatively, you can enter the URL to your site code (required), user files (optional) and database (optional).

 ![](https://pantheon-systems.desk.com/customer/portal/attachments/247522)

5. Relax while we configure your codebase.

 

Click “Import site” and wait while we import and configure your site.

![](https://pantheon-systems.desk.com/customer/portal/attachments/247524)

 

6. Completed Spinup

 

When complete, just click the button to visit your Pantheon Dashboard.

 

![](https://pantheon-systems.desk.com/customer/portal/attachments/247525)

 

7. View your site dashboard

 

Congratulations! Your site has been imported and your Pantheon site environments have been configured. From the dashboard, you can control your site's settings, manage team members, perform workflow operations, and a lot more.

 

8. Launch Site

 

You will eventually have three environments (development, test, and live), each with a separate version of your website. Click the link at the top left of your dashboard to launch the your development site.

 

![](https://pantheon-systems.desk.com/customer/portal/attachments/247528)

 

9. See your site!

You are ready to start development, or if your site is ready to go, to create your test and live environments!

Currently we are shipping with one included/recommended plugin, which is designed to make WordPress play well with our high-performance Edge cache layer.

It sets a default cache lifetime of 10 minutes, and will automatically clear post pages (and taxonomy lists) when new content is created or updated. You can also manually flush the whole cache for a site.

 

**Further Reading:**

Using the Pantheon Workflow  
 [/documentation/howto/using-the-pantheon-workflow/](/documentation/howto/using-the-pantheon-workflow/)

 

Developing with SFTP

<u><a href="/documentation/getting-started/developing-on-pantheon-directly-with-sftp-mode/-enabling-sftp-mode"><span style="color:#0000FF;"><span id="docs-internal-guid-1dbb1e92-5726-5b99-e61c-33bc84fe656b"><span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">/documentation/getting-started/developing-on-pantheon-directly-with-sftp-mode/-enabling-sftp-mode</span></span></span></a></u>

 

Going Live

<u><a href="/documentation/running-drupal/going-live-and-launching-your-site/-going-live-and-launching-your-site"><span style="color:#0000FF;"><span id="docs-internal-guid-1dbb1e92-5726-5b99-e61c-33bc84fe656b"><span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">/documentation/running-drupal/going-live-and-launching-your-site/-going-live-and-launching-your-site</span></span></span></a></u>

 
