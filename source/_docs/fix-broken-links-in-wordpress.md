---
title: Fix Broken Links in WordPress
description: Learn how to update broken links on your Pantheon WordPress site so that the URL references the correct file path and domain name.
category:
  - debugging
  - drupal
keywords: wordpress, broken links
---
## Update Links Referencing IP:Port
Whether by accident or by virtue of "web rot", links in your content may eventually stop working. This happens when links are placed into your site's code that use an IP address instead of your actual domain name. These links will eventually break when your application container’s IP address changes due to the nature of Pantheon’s cloud-based infrastructure.

## There's a Plugin For That
As with most common problems WordPress site owners face, there's a plugin to help. Actually, there are many. If you go to WordPress.org and search for [broken link](https://wordpress.org/plugins/search.php?q=broken+link), you'll find over 700 plugins to evaluate. The [Broken Link Checker](https://wordpress.org/plugins/broken-link-checker/) plugin is the most popular and is active on more than 400,000 WordPress sites.

## Installation
You can install the plugin from your [WordPress dashboard](/docs/more-ways-of-managing-code-in-sftp-mode#manage-plugins-and-themes-with-wp-admin) by following these steps:

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Your site's Connection Mode must be <a href="/docs/developing-directly-with-sftp-mode#sftp-mode">set to SFTP</a>.</div>

1. Click **Plugins**, then select **Add New**.
2. Search for "Broken Link Checker".
3. Click **Install Now**, then click **Activate**.


## Using the Plugin
Once you have the plugin installed and activated, you will see a new option within the Tools section of your WordPress dashboard. Notice that there are no reported broken links. Don't get too excited&mdash;you won't see any until WordPress runs it's next Cron job. In the background, WordPress will quietly check all your posts, comments, pages, etc., and look for broken URLs. Each URL is queued to be checked so that performance is not negatively affected. Check back later; if you have a lot of content, it will take a while to run.

Broken Link Checker won't keep you from creating bad links, it is simply a reporting tool. You can still do things that are a bad idea, like using the IP address for your site instead of it's domain name, but this resource helps you clean things up. The best solution for linking to your own content is to use relative paths. Use `/my-cool-blog-post` instead of `http://example.com/my-cool-blog-post` and you never have to worry about portability. For everything else, there is Broken Link Checker.

## Update Environment URLs on Pantheon
WordPress stores URLs in various places in the database; considering Pantheon's multi-environment workflow, this can cause unexpected behavior. However, we've integrated the WP-CLI's search & replace functionality into the workflow to assist in updating these URLs.
![Dashboard DB URL converter](/source/assets/images/convert-urls.png)​
[Pantheon's workflow](/docs/using-the-pantheon-workflow/) for WordPress includes an additional feature to update environment URLs automatically. Note that the defaults that are selected when performing a clone operation aren't overridable, as we update the URL to match whatever environment you're cloning to. We do offer the option to convert HTTP to HTTPS and vice versa; in the case you have HTTPS in one environment and not another.
