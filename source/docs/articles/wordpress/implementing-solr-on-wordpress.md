---
title: Implementing Solr on a WordPress Powered Site
description: Using Solr to index and search WordPress powered websites
draft: true
---
## Overview  
All Pantheon sites come with access to [Apache Solr](http://lucene.apache.org/solr/ "Apache Solr home page"). Solr is a fast, open source, enterprise-grade search platform built on top of Apache Lucene. High traffic sites whose users run many search queries and sites with a lot of content will benefit from using Apache Solr for search as searches are taxing to database servers. By offloading search functionality to Solr, you can ensure that your searches and  overall site remin fast.


## Before You Begin  
Be sure that you:  
1. Create a backup. Nothing we will do in this guide will be destructive, but if something goes wrong, it's better to have a backup.  
2. Have a functioning WordPress site with content. You can spin up a Pantheon sandbox site to test with or you can use your production site.   
**Note**: You can undo everything we do in this guide simply by removing the plugin. 

## Enable Solr For Your Site
Solr is available for every Pantheon site and it can be easily enabled through your Site Dashboard.

![Screen shot of the Add Ons tab in the Pantheon dashboard](/source/docs/assets/images/pantheon-dashboard-add-ons.png)

1. From your Dashboard, click **Settings**.
1. Select the **Add Ons** tab.
1. Click **Add** beneath Apache Solr Index Server.

Congratulations&mdash;you have now activated Apache Solr for your account. Solr is now active, but not yet set up for indexing and searching.

## Install the Solr For Wordpress Pantheon Plugin
We maintain a plugin specifically for using Apache Solr on Pantheon. It is a fork of [palepurple/solr-for-wordpress](https://github.com/palepurple/solr-for-wordpress "PalePurple's Solr for WordPress repo").  

To install Solr for WordPress on Pantheon, download the zip file from the [pantheon-systems/solr-for-wordpress-on-pantheon]() repo and log into your WordPress site.

1. Go to the Plugins page and click **Add New**.
2. Click **Upload Plugin** and click **Browse** to select the zip file from your computer. 
3. Select **Install Now**.
4. Next, select the **Activate Plugin** link once it's installed.
5. From the Settings Menu, you now see a "Solr Options" menu item. Click the **Solr Options** to bring up the options page.
6. Scroll down to the "Actions" section and click **Execute** next to "Check Server Settings". This will ensure that WordPress is working with the Apache Solr server.   

![Screen shot of the Solr for WordPress on Pantheon plugin successfully pinging the Apache Solr server](/source/docs/assets/images/wordpress-solr-ping-success.png)

## Index Your Pages and Posts
Now that you have the plugin installed and have confirmed it's working with your Apache Solr server, you now need to set up Apache Solr to index all of your pages and posts. 

In the "Actions" section of the Options page, click **Execute** next to the "Load All Pages" and "Load All Posts" options.

Your site is now completely indexed and ready to use.

## Searching
You don't need to do anything different when searching your site.  Simply enter your search term in the search box on your site, and the plugin will intercept the call to search and utilize Apache Solr instead of the normal WordPress search routines.

## Maintenance
The plugin will notify Apache Solr whenever a new page or post is published, commented on, or deleted.  You don't need to do anything to keep the index up to date. If your search feature begins to slow down, you can use the "Optimize Index" feature to correct this. From the options page, scroll down to the "Actions" section and click **Execute** next to "Optimize Index".

In very rare cases, your index can become corrupt beyond what optimizing it can fix. If this happens, click **Execute** next to "Delete All". Once the page refreshes, reindex your pages and posts as described above.

## Replacing the Search Results Template
The search results template that comes with the plugin can be replaced by one more suited to your theme. To replace the search results template, copy template/s4wp_search.php into your template's directory and name it s4wp_search.php. You can now edit this local copy to suit your needs. The plugin will detect it and use your local copy instead of the default.

## Why Use This Plugin?
Apache Solr is a power and complex tool; the same can be said for WordPress. Pantheon strived to embrace the spirit of the WordPress core developer with this plugin by keeping it as simple as possible to install and configure. This allows a complex system to be implemented without the assistance of a consultant or developer.


##See Also
[Apache Solr on Pantheon](/docs/articles/sites/apache-solr/)
