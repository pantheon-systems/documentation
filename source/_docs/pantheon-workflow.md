---
title: Use the Pantheon Workflow
description: Understand the Pantheon workflow, and how to use separate Dev, Test, and Live environments for your Drupal or WordPress sites.
tags: [workflow, dashboard]
categories: []
---

Every Pantheon site comes with three environments: Dev, Test, and Live. Separate Dev, Test, and Live environments allow you to develop and test your site without impacting the live site's availability to the world. Additional development environments are available with [Multidev](/docs/multidev/).


## Code Moves Up, Content Moves Down
<img src="/source/docs/assets/images/workflow.png" alt="Dev Test and Live icon" style="border:0;margin-left:auto;margin-right:auto;display:block;">

The core of the Pantheon workflow is to move code up from Dev to Test to Live and content down from Live to Test to Dev.

- **Code** includes plugins, modules, themes, CSS, JS—anything that's under Git version control.
- **Content** includes files not under Git version control, like images, PDFs, and the database.

### Commit Code in Dev

Update code in the Dev environment via [SFTP](/docs/sftp/#sftp-mode) or [Git](/docs/git/).

### Combine Code from Dev and Content from Live in Test

When you're ready to test a new set of changes, deploy your code from Dev, pull your content from Live, and combine them in Test to be absolutely certain that your deployment to Live will go as planned. Deploys are performed by adding a git tag to the last commit on the Test environment.

<div class="alert alert-info" role="alert">
<h3 class="info">Note</h3>
<p markdown="1">While you are able to update Dev via Git, if you would like to deploy your changes to Test or Live from the command line, you'll need to use [Terminus](/docs/terminus/).</p>
</div>

Once changes are pushed to Dev, the Deploys panel in the Test tab will prompt you to commit the changes to Test:

![Site dashboard, test environment, Deploys section](/source/docs/assets/images/dashboard/deploy-to-test-env.png)

 - The **Deploy Log** helps you group a batch of commits into a single deployment. Best practice is to keep logical groups of edits together and then summarize those groups with a single deployment message.

 - Check the **Pull files and the database from the Live environment?** Checkbox to pull the content from your Live site to the Test environment.

 - Drupal site deploys come with the ability to run `update.php` after  code deploys. `hook update n` and any other necessary database updates will be made automatically on the Test environment.

   On WordPress site dashboards, cloning the content will expose an option to convert URLs from the Live environment's pattern to the Test environment's, including the protocol from HTTPS to HTTP for encrypted live environments.

After running this operation, be sure that:

* Your database updates succeed
* Your exported configuration is in place
* The site is functioning as expected in the Test environment

It's also a good idea to review the Status tab and run **Launch Check**, and make sure everything looks good. For details, see the following:

- [Launch Check - Drupal Performance and Configuration Analysis](/docs/drupal-launch-check/)
- [Launch Check - WordPress Performance and Configuration Analysis](/docs/wordpress-launch-check/)

If there are additional manual "go live" instructions, now is a good time to review them and make sure they work and are properly documented.

This may be a good time to run regression or smoke tests by stepping through your main workflows manually, or by running an automated test suite. Use Test to make sure that everything is working correctly before deploying to Live.


### Deploy Code to Live

After testing your changes you can take them live. Deploying code from Test to Live will immediately update your live website; however, static assets such as images and css may still be outdated. To update them, check the **Clear Caches** option when deploying changes to your Live environment. For more details, see [Clearing Caches for Drupal and WordPress](/docs/clear-caches/).

![Site dashboard, live environment, workflow section](/source/docs/assets/images/dashboard/deploy-live.png)

## Configuration Management

Dealing with changes to your site's configuration, stored in the database, can be a challenge. Moving the database up from Dev to Test and Live typically won't work, because it will overwrite content in Live. While you can make manual configuration changes on each environment, **it's a best practice to manage configuration in code**.

### WordPress

* [WP-CFM](https://wordpress.org/plugins/wp-cfm/) plugin: exports bundles of configuration to `.json` files in `wp-content/config`
* [Advanced custom fields can be exported to code](http://stevegrunwell.com/blog/exploring-the-wordpress-advanced-custom-fields-export-feature/).


### Drupal

* [hook\_update\_N()](http://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_update_N/7): Encapsulate changes into a custom module and apply them by running `update.php`. Great example of this approach: [Automate Drupal site updates with a deployment module](http://befused.com/drupal/site-deployment-module).
* [Views: Export to code](https://www.chapterthree.com/blog/howto-best-practices-for-embedding-views-code)
* [Features](http://drupal.org/project/features) module: Export sets of configuration like content types and fields to code as modules. 
* Drupal 8 tackles configuration management head on. For more information, see [Configuration Workflow for Drupal 8 Sites](/docs/drupal-8-configuration-management/).

## Understanding Write Permissions in Test and Live

By design, code changes via SFTP are prevented in Test and Live. All code changes should be done in Dev. There are two ways to update code in Test or Live:

1. **Use the Workflow** (Recommended): Deploy code from Dev to Test to Live via the Site Dashboard as outlined above.

2. **Hotfixes**: Hotfixes is not a best practice and should be the exception, not the norm.  Pushing a [hotfix via Git](/docs/hotfixes) is the only way to push code changes directly to Live without deploying through Dev and Test.

## Managing Database and Files: Clone, Import, Export, Wipe

You may also clone, import, export, and wipe the database and files per environment. Wiping completely resets the database and files, but leaves the codebase intact. This means you will lose all data and will need to either re-import, or re-install to get your site back online.

The database clone operation excludes some tables by default. The excluded tables are: cache, cache_block, cache_bootstrap, cache_field, cache_filter, cache_form, cache_image, cache_menu, cache_page, cache_path, cache_update, cache_views, cache_views_data, accesslog, and watchdog.

<div class="alert alert-info">
<h4 class="info">Note</h4><p>The <strong>Export</strong> tool does not include a copy of the site's codebase and cannot be used as the basis to create a new site. Use the archive files generated by the <a href="/docs/backups">Backups Tool</a> if you wish to create a new site.</p>
</div>

## Uncommon Workflows

Typically, you'll create content in the Live environment. However, when deploying a newly-built site for the very first time, it is often necessary to push the content "up", which is the opposite of the normal content workflow. In this case, you may move the database and files (e.g. images) from Dev or Test to Live via the  **Database/Files** > **Clone** area of the Dashboard.

Moving content up to Live should almost never be done on a launched site. The only exception is if that site is 100% read-only, as pushing the database and files will overwrite all changes made. Also note that overwriting the database of a live site may cause downtime.

If there are other workflows you would like to see, contact us. We're always looking for ways to improve the platform.

## Troubleshooting

#### Uncaught Exception: Table 'pantheon.semaphore' Doesn't Exist

If you access the site before a database import is complete, you may see the following error:

```sql
Uncaught exception 'PDOException' with message 'SQLSTATE[42S02]: Base table or view not found: 1146 Table 'pantheon.semaphore' doesn't exist'
```

MySQL imports tables sequentially, in alphabetical order from A to Z. If you access the site before the operation is complete, Drupal will try to bootstrap, and the MySQL import may be at the table letter G, for example, and the result is the semaphore table does not exist error. Once the import or clone operation has finished, the error should no longer appear.

## See Also
[Infographic: The Pantheon Development Cycle Workflow](https://pantheon.io/blog/infographic-pantheon-development-cycle-workflow)
