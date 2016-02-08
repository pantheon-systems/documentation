---
title: Using the Pantheon Workflow
description: Understand how to use separate Dev, Test, and Live environments while learning more about the Pantheon Website Management Platform workflow.
category:
  - going-live
  - developing
keywords: pantheon workflow, workflow, dev, test, live, environment, pantheon environments, multidev, how to deploy, deploy, what is a commit, commit, write permission, write to live, why cant i write to live, write access, commits, separate environment, environment, environments
---

Every Pantheon site comes with three environments: Dev, Test, and Live. Separate Dev, Test, and Live environments allow you to develop and test your site without impacting the live site that's available to the world. Additional development environments are available with [Multidev](/docs/articles/sites/multidev/).


## Code Moves Up, Content Moves Down
<img src="/source/docs/assets/images/workflow.png" alt="Dev Test and Live icon" style="border:0;margin-left:auto;margin-right:auto;display:block;">

The core of the Pantheon workflow is to move code up from Dev to Test to Live and content down from Live to Test to Dev.

- **Code** includes plugins, modules, themes, CSS, JS—anything that's under Git version control.
- **Content** includes files not under Git version control, like images and pdfs, and the database.

### 1. Commit code in Dev

Update code in the Dev environment via [SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode/) or [Git](/docs/articles/local/starting-with-git/).

### 2. Combine fresh code from Dev and fresh content from Live in Test

When you're ready to test a new set of changes, take your code from Dev, your content from Live, and freshly combine them in Test to be absolutely certain that your deployment to Live will go as planned.

![Site dashboard, test environment, code section](/source/docs/assets/images/desk_images/376212.png)

After running this operation, be sure that:  
- Your database updates succeed.  
- Your exported configuration is in place.  
- The site is functioning as expected.

It's also a good idea to review the Status tab and run [**Launch Check**](/docs/articles/drupal/launch-check-drupal-performance-and-configuration-analysis/), and make sure everything looks good.  If there are additional manual "go live" instructions, now is a good time to review them and make sure they work and are properly documented.

This may be a good time to run regression or "smoke" tests by stepping through your main workflows by hand, or by running an automated test suite. Use Test to make sure that everything is working correctly before deploying to Live.


### 3. Deploy code to Live

After testing your changes, you can take them live. Deploying code from Test to Live will immediately update your live website; however, static assets such as images and css may still be outdated. To update them, check the **Clear Caches** option when deploying changes to your Live environment. For more details, see [Understanding and Debugging Varnish Cache Issues](/docs/articles/sites/varnish/debugging-cache/).

![Site dashboard, live environment, workflow section](/source/docs/assets/images/desk_images/376217.png)

## Configuration Management

Dealing with changes to your site's configuration, stored in the database, can be a challenge. Moving the database up from Dev to Test and Live typically won't work, because it will overwrite content in Live. While you can make manual configuration changes on each environment, **it's a best practice to manage configuration in code**.

### WordPress

* [WP-CFM plugin](https://github.com/forumone/wp-cfm): exports bundles of configuration to `.json` files in `wp-content/config`.

* [Advanced custom fields can be exported to code](http://stevegrunwell.com/blog/exploring-the-wordpress-advanced-custom-fields-export-feature/).


### Drupal

* [hook\_update\_N()](http://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_update_N/7): Encapsulate changes into a custom module and apply them by running `update.php`. Great example of this approach: [Automate Drupal site updates with a deployment module](http://befused.com/drupal/site-deployment-module).

* [Views: Export to code](http://www.chapterthree.com/blog/matt_cheney/howto_best_practices_embedding_views_code)

* [Features module](http://drupal.org/project/features): Export sets of configuration like content types and fields to code as modules. 

* Drupal 8 is tackling configuration management head on. For more information, see [Configuration Workflow for Drupal 8 Sites](/docs/articles/drupal/drupal8/configuration-management/).

## Uncommon Workflows

Typically, you'll create content in the Live environment. However, when deploying a newly-built site for the very first time, it is often necessary to push the content "up", which is the opposite of the normal content workflow. In this uncommon case, you may move the database and files (e.g. images) from Dev or Test to Live via the  **Workflow** > **Clone** areas of the Dashboard.

Moving content up to Live should almost never be done on a launched site. The only exception is if that site is 100% read-only, as pushing the database and files will overwrite all changes made. Also note that overwriting the database of a live site may cause downtime.

If there are other workflows you would like to see, contact us. We're always looking for ways to improve the platform.


## Understanding Write Permissions in Test and Live

By design, code changes via SFTP are prevented in Test and Live. All code changes should be done in Dev.

There are two ways to update code in Test or Live:

1. **Use the Workflow**  

  Deploy code from Dev to Test to Live via the Site Dashboard as outlined above.

2. **Hotfixes**  

  We do not recommend hotfixing. Hotfixes should be the exception, not the norm.  Pushing a [hotfix via Git](/docs/articles/sites/code/hot-fixes) is the only way to push code directly to Live without having to go through Dev and Test. Hotfixing is not a best practice.

## Other Workflow Tools: Import, Export, Wipe

You may also import, export, and wipe the database and files per environment. Wiping completely resets the database and files, but leaves the codebase intact. This means you will lose all data and will need to either re-import, or re-install to get your site back online.

<div class="alert alert-info">
<h4>Note</h4> The <strong>Workflow</strong> > <strong>Export</strong> tool does not include a copy of the site's codebase and cannot be used as the basis to create a new site. Use the archive files generated by the <a href="/docs/articles/sites/backups/">Backups Tool</a> if you wish to create a new site.
</div>

## Troubleshooting

#### Uncaught exception: Table 'pantheon.semaphore' doesn't exist

If you access the site before a database import is complete, you may see the following error:

```sql
Uncaught exception 'PDOException' with message 'SQLSTATE[42S02]: Base table or view not found: 1146 Table 'pantheon.semaphore' doesn't exist'
```

MySQL imports tables sequentially, in alphabetical order, from A to Z. If you access the site before the operation is complete, Drupal will try to bootstrap, and the MySQL import may be at the table letter G, for example, and the result is the semaphore table does not exist error. Once the import or clone operation has finished, the error should no longer appear.
