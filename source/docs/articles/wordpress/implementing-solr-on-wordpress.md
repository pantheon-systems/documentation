---
title: Implementing Solr on a WordPress Powered Site
description: Using Solr to index and search WordPress powered websites
draft: true
---
## Overview  
All Pantheon sites come with access to an instance of [Apache Solr](http://lucene.apache.org/solr/ "Apache Solr home page"). Solr is a fast, open source, enterprise grade search platform built on top of Apache Lucene. High traffic sites whose users run many search queries, or sites with a lot of content will both benefit from using Apache Solr for search. Searchs are taxing to database servers. By off-loading search functionality to Solr, you can ensure that your searches and your overall site remin fast.


## Before You Begin  
Before you make any major change to your system, back everything up. Nothing we will do in this guide will be destructive, but if things do go horribly wrong, it's better to have  a backup.

Also, you will need a functioning WordPress site with content. How much content you have is irrelevant. You can spin up a Pantheon sandbox site to test this with, or you can do all of this on your production site. Nothing we will do in this guide cannot be undone by simply removing the plugin.

## Turn on Solr for your site
Solr is available for every Pantheon site, however, you do have to turn it on on a per site basis before you can use it. This can easily be done on your site's dashboard.
![Screen shot of the Add Ons tab in the Pantheon dashboard](/source/docs/assets/images/pantheon-dashboard-add-ons.png)

1. From your dashboard, click on Settings in the upper right corner of the browser.
1. Select the Add Ons tab
1. Click the Add button beneath Apache Solr Index Server

Congratulations, you have now activated Apache Solr for your account. Solr is now active, but not yet being used by your site for indexing and searching.

## Install the solr-for-wordpress-pantheon Plugin
We maintain a plugin specifically for using Apache Solr on Pantheon. It is a fork of [palepurple/solr-for-wordpress](https://github.com/palepurple/solr-for-wordpress "PalePurple's Solr for WordPress repo"). Our configuration is different enough so that a fork was required. You can install Solr for WordPress on Pantheon by following these instructions.

1. Download the plugin zip file from the [solr-for-wordpress-on-pantheon](https://github.com/calevans/solr-for-wordpress-on-pantheon) repo.
1. Log into your WordPress powered site.
1. Go to the Plugin's page
1. Click the Add New button at the top of the page
1. Click the Upload Plugin button at the top of the page
1. Click the Browse button in the  middle of the page
1. Select the zip file from your file system and confirm the selection
1. Click the Install Now button
1. Click the Activate Plugin link once the plugin is properly installed.
1. From the Settings Menu, you can now see a "Solr Options" menu item. Click the Solr Options to bring up the options page.
1. Scroll down to the "Actions" section and click the Execute button next to "Check Server Settings". This will ensure that WordPress is talking to the Apache Solr server. When the page refreshes, you should see a message at the top of the screen indicating success
![Screen shot of the Solr for WordPress on Pantheon plugin successfully pinging the Apache Solr server](/source/docs/assets/images/wordpress-solr-ping-success.png)

## Index your Pages and Posts
Now that you have the plugin installed and have confirmed that it is talking to your Apache Solr server, you now need to tell Apache Solr to index all of your pages and posts. In the "Actions" section of the options page, you will find a button for each.

1. Click the Execute button beside the "Load All Pages" option.
1. Once that is complete, click the Execute button beside "Load All Posts"

Your site is now completely indexed and ready to use.

## Searching
You do not need to do anything different when searching your site.  Simply enter your search term in the search box on your site. The plugin will intercept the call to search and utilize Apache Solr instead of the normal WordPress search routines.

## Maintenance
Whenever you Publish a new Page or Post, a comment is added to an existing Page or Post, or you delete a comment, Page or Post, the plugin will notify Apache Solr of the changes. You do not need to do anything to keep the index up to date. If your search feature begins to slow down, you can use the "Optimize Index" feature to correct this. From the options page, scroll down to the "Actions" section and click "Execute" beside "Optimize Index".

In rare cases, your index can become corrupt beyond what optimizing it can fix. In this very rare case, you can click "Execute" next to "Delete All". Then, once the page refreshes, reindex your pages and posts as described above.

## Replacing the Search Results Template
The search results template that comes with the plugin can be replaced by one more suited to your theme's. To replace the search results template, copy template/s4wp_search.php into your template's directory and name it s4wp_search.php. You may now edit this local copy to suite your needs. The plugin will detect and use your local copy instead of the default one.

## Wrapup
Apache Solr is a power and complex tool; the same can be said for WordPress. Pantheon strived to embrace the spirit of the WordPress core developer with this plugin by not offering you the user needless choices or options. Our goal was to make this plugin as simple as possible to install and configure. This allowing a complex system to be implemented without the aid of the need of consulting a developer.


##See Also
[Apache Solr on Pantheon](/docs/articles/sites/apache-solr/)
