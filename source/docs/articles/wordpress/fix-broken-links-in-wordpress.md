---
title: Fix broken links in WordPress
description: Learn how to update broken links so that the URL references the correct file path and domain name.
category:
  - debugging
  - drupal

---

## Overview
Whether by accident or by virtue of "web rot", links in your content may eventually stop working. SOmetimes this happens when you or plugins that you use insert links into your code that use an IP address instead of your actual domain name. Since your site will occasionally change IP addresses, this can leave you with brken links that you might not even be aware of. This document helps you address this problem. 

## There's a plugin for that
As with most problems that Wordpress site owners face, there is a plugin to help. Actually, there are many. If you go to WordPress.org and search for [Broken Link](https://wordpress.org/plugins/search.php?q=broken+link) you will find more than 700 plugins come up. Of those, [Broken Link Checker](https://wordpress.org/plugins/broken-link-checker/) is the most popular with over 400,000 WordPress sites currently running it. 

## Installation
Like most WordPress plugins, installation is simple.

- Click Plugins->Add New
- Search for "Broken Link Checker"
- Click Install Now
- CLick the link to Activate the plugin

## Using the plugin
Once you have the plugin installed, you now have a new option in your "Tools" menu. When you first intall it, you won't see any broken links. Don't get too excited, you won't see any until WordPress runs it's next cron job. In the background, WordPress will run the code to quietly check all your posts, comments, pages, etc. and look for URLS. It will then check each of these. It doesn't do them all at once, it spaces them out. CHeck back in a few minutes, an hour, tomorrow. If you have a lot of content, it will take a while to run. 

## Conclusion
Broken Link Checker won't keep you from putting bad links into your content. You can still do things that are a bad idea, like using the IP address for your site instead of it's domain name. It will however, help you clean things up. The best solution for linking to your own content is still not to use a domain name at all. use `/my-cool-blog-post` instead of `http://example.com/my-cool-blog-post` and you never have to worry about portability. For everything else though, there is Broken Link Checker.
