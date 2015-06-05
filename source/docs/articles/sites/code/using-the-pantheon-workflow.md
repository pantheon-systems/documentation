---
title: Using the Pantheon Workflow
description: Understand how to use separate Dev, Test, and Live environments while learning more about the Pantheon Website Management Platform Workflow.
category:
  - going-live
  - developing
keywords: pantheon workflow, workflow, dev, test, live, environment, pantheon environments, multidev, how to deploy, deploy, what is a commit, commit, write permission, write to live, why cant i write to live, write access, commits, separate environment, environment, environments
---
Every Pantheon site comes with three environments: Dev, Test, and Live. Separate Dev, Test, and Live environments allow you to develop and test your site without impacting the live site that's available to the world. Additional development environments are available with [Multidev](/docs/articles/sites/multidev/).


## Code Moves Up, Content Moves Down

The core of the Pantheon Workflow is to move code up from Dev to Test to Live and content down from Live to Test to Dev.

- **Code** includes plugins, modules, themes, CSS, JS—anything that's under Git version control.
- **Content** includes files not under Git version control, like images and pdfs, and the database.

### 1. Commit Code in Dev

Update code in the Dev environment via [SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode/) or [Git](/docs/articles/local/starting-with-git/).
### 2. Combine fresh code from Dev and fresh content from Live in Test

When you're ready to test a new set of changes, take your code from Dev, your content from Live, and freshly combine them in Test to be absolutely certain that your deployment to Live will go as planned.
![Site dashboard, test environment, code section](/source/docs/assets/images/desk_images/376212.png)
After running this operation, be sure your database updates succeed, your exported configuration is in place, and the site is functioning as expected. It's also a good idea to review the **Status** tab and run [**Launch Check**](/docs/articles/drupal/launch-check-drupal-performance-and-configuration-analysis/), and make sure everything looks good.  If there are additional manual "go live" instructions, now is a good time to review them and make sure they work and are properly documented.

This may be a good time to run regression or "smoke" tests by stepping through your main workflows by hand, or by running an automated test suite. Use Test to make sure that everything is working correctly before deploying to Live.


### 3. Deploy Code To Live

After testing your changes, you can take them live. Deploying code from Test to Live will immediately update your live website.
![Site dashboard, live environment, workflow section](/source/docs/assets/images/desk_images/376217.png)
![Site Dashboard, live environment](/source/docs/assets/images/desk_images/376218.png)


## Uncommon Workflows

Typically, you'll create content in the **Live** environment. However, when deploying a newly-built site for the very first time, it is often necessary to push the Content "up" which is the opposite of the normal content workflow. In this uncommon case, you may move the database and files (e.g. images) from Dev or Test to Live via the  **Workflow** > **Clone** areas of the Dashboard.

Moving content up to Live should almost never be done on a launched site. The only exception is if that site is 100% read-only, as pushing the database and files will overwrite all changes made. Also note that overwriting the database of a live site may cause downtime.

If there are other workflows you would like to see, contact us. We're always looking for ways to improve the platform.

## Handling Configuration Changes

Dealing with changes to your site's configuration can be a challenge. Because the only reliable way to synchronize databases is to do so completely, and because configuration is stored in the database, it is not possible to "push configuration" from Dev to Test to Live without taking additional steps.

### hook\_update\_N()

Drupal core manages database and config changes via the use of [hook\_update\_N()](http://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_update_N/7). You may add update functions to your `.install` file in a custom module to encapsulate your config changes. Doing so allows you to deploy the config changes in code. Run `update.php` to apply the changes listed in your `hook_update_N` function.

## Exporting Configuration

A growing array of common configurations are "exportable". In WordPress, [advanced custom fields can be exported to code](http://stevegrunwell.com/blog/exploring-the-wordpress-advanced-custom-fields-export-feature/). [ForumOne created](http://forumone.com/insights/configuration-management-finally-comes-to-wordpress/) the  [WP-CFM plugin](https://github.com/forumone/wp-cfm), which exports bundles of WordPress configuration to `.json` files in `wp-content/config`. In Drupal,  [views are easily exported to code](http://www.chapterthree.com/blog/matt_cheney/howto_best_practices_embedding_views_code). The  [features module](http://drupal.org/project/features) allows you to export sets of configuration like content types and their associated fields, to code as modules. It is a best practice to manage configuration in code.

Changes to exportable configurations should always take place in the Development environment, because only that environment can write to the file system while in SFTP mode.

### Manual Changes

Of course, manually making configuration changes as part of your deployment is always an option. There are a number of modules designed to help you track configuration changes.

Ultimately, the right answer for managing configuration updates to your site depends on your use case and comfort level with these techniques. It's an ongoing debate in the Drupal and WordPress universe, with new solutions being developed all the time.

## Understanding Write Permissions in Test & Live

By design, code changes via SFTP are prevented in Test and Live. All code changes should be done in Dev.

There are two ways to update code in Test or Live:

1. **Use the Workflow**  

  Deploy code from Dev to Test to Live via the Site Dashboard as outlined above.

2. **Hotfixes**  

  We do not recommend hotfixing. Hotfixes should be the exception, not the norm.  Pushing a [hotfix via Git](/docs/articles/sites/code/hot-fixes) is the only way to push code directly to Live without having to go through Dev and Test. Hotfixing is not a best practice.

## Other Workflow Tools: Import, Export, & Wipe

You may also import, export, and wipe the database and files per environment. Wiping completely resets the database and files, but leaves the codebase intact. This means you will lose all data and will need to either re-import, or re-install to get your site back online.

## Troubleshooting

#### Uncaught exception: Table 'pantheon.semaphore' doesn't exist

If you access the site before a database import is complete, you may see the following error:

```
Uncaught exception 'PDOException' with message 'SQLSTATE[42S02]: Base table or view not found: 1146 Table 'pantheon.semaphore' doesn't exist'
```

MySQL imports tables sequentially, in alphabetical order, from A to Z. If you access the site before the operation is complete, Drupal will try to bootstrap, and the MySQL import may be at the table letter G, for example, and the result is the semaphore table does not exist error. Once the import or clone operation has finished, the error should no longer appear.
