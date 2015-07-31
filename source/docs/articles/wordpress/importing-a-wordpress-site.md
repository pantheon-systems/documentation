---
title: Importing a WordPress Site
description: Learn how to import an existing WordPress site into the Pantheon Website Management Platform.
category:
  - wordpress
  - getting-started
keywords: wordpress, importing, import site
---
## Overview  
<div class="alert alert-info" role="alert">
<h4>Note</h4>
Most WordPress sites with session-using code are relying on PHP's default session manager, which uses temporary files on local disk. Pantheon does not support this because it will not work properly in our distributed environment. You can read <a href="/docs/articles/wordpress/wordpress-and-php-sessions#wordpress-and-php-sessions">more here</a>.</div>

##Prepare for Import  
You will need a zip or tar.gz archive of your site in three separate files:

* Codebase - all executable code, plugins, themes, and so forth.

* Database - contains the content of the site and some site configurations.

* Files - anything under wp-content/uploads. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc.

There are two ways to import. Direct uploads from your desktop can be 100MB max; using a remote URL can be up to 500MB.

Popular plugins like [Duplicator](http://wordpress.org/plugins/duplicator/) and [BackupBuddy](http://ithemes.com/codex/page/BackupBuddy) will also do this for you. You should be able to simply upload the archive file they produce and Pantheon will do the rest. For large imports, pasting in a web-readable url (e.g. dropbox secret link) will be much faster than manually uploading. Make sure a link goes directly to the file, not a landing page.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Dropbox URL's need to be modified so they end in <code>dl=1</code> instead of the default <code>dl=0</code>. This forces a download of your archive and avoids the Dropbox landing page.</div>  


Of course you can make an import archive by hand. You simply dump your existing database into a file ending with “.sql”, and make an archive file (zip or tar.gz) that contains that dump along with all your WordPress code.

## Add and Name a Site

After you have created an account, you can log in and will be directed to your Dashboard.
![Your sites & account dashboard](/source/docs/assets/images/create-site-dashboard.png)
Click **Add a site**. You will first be prompted to name the site. The only valid characters are letters, numbers, and dashes. Enter a name and click **Continue**.
![](/source/docs/assets/images/desk_images/247523.png)
## Wait While It's Configured

You will then have a short wait while Pantheon creates and allocates the resources for your site's environments. This takes only a few minutes under normal circumstances.
![](/source/docs/assets/images/desk_images/247524.png)
## Choose a Start State
You now have several options. Rather than start with one of our preconfigured start states, we will import our code, database, and files.

Select **Import manually**.<br />
![](/source/docs/assets/images/desk_images/247521.png)  
Once selected, you can upload a single URL or file archive of the site.  
![](/source/docs/assets/images/desk_images/259156.png)  
Alternatively, you can enter the URL to your site code (required), user files (optional) and database (optional).
![](/source/docs/assets/images/desk_images/247522.png)

## Relax While We Configure Your Codebase
Click **Import Site** and wait while we import and configure your site.
![](/source/docs/assets/images/desk_images/247524.png)
## Completed Installation
When complete, just click the button to visit your Pantheon Dashboard.
![](/source/docs/assets/images/desk_images/247525.png)
#### View Your Site Dashboard
Congratulations! Your site has been imported and your Pantheon site environments have been configured. From the Dashboard, you can control your site's settings, manage team members, perform workflow operations, and a lot more.
#### Launch Site
You will eventually have three environments (Dev, Test, and Live), each with a separate version of your website. Click the link at the top left of your Dashboard to launch the your development site.
![](/source/docs/assets/images/desk_images/247528.png)
#### View Your Site
You are ready to start development, or if your site is ready to go, to create your test and live environments!

Currently, we are shipping with one included/recommended plugin, which is designed to make WordPress play well with our high-performance Edge cache layer.

It sets a default cache lifetime of 10 minutes, and will automatically clear post pages (and taxonomy lists) when new content is created or updated. You can also manually flush the whole cache for a site.

## Troubleshooting
If you see this error:

```php
Warning: session_start(): user session functions not defined
```
It means you have some code (plugin or theme) that's using PHP Sessions, which require a plugin to work on Pantheon. [Read more on WordPress and PHP Sessions](/docs/articles/wordpress/wordpress-and-php-sessions/).

**Further Reading:**

- [Using the Pantheon Workflow](/docs/articles/sites/code/using-the-pantheon-workflow/)
- [Developing with SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode)
- [Going Live](/docs/articles/going-live)
