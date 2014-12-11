---
title: Using the Pantheon Workflow
description: Learn the Pantheon environments and overall workflow.

---

 
## Overview

Pantheon provides 3 environments for your site. This allows you to develop and test your site without impacting the live site that's available to the world.

![Pantheon Workflow Diagram](https://pantheon-systems.desk.com/customer/portal/attachments/29437)

The **Dev** environment is connected directly to Git, and anything "pushed" via git ends up there immediately. The **Live** environment is, as the name suggests, the public/production instance for your site. The **Test** environment allows you to synchronize the latest code-changes from dev with the latest content from live so you can effectively simulate a deployment. This lets you preview and evaluate functionality before launching.

Pantheon provides pre-set actions for commons workflows, such as synchronizing your test environment. We also allow you to perform uncommon workflows (e.g. overwriting the live database with test or dev data) when needed.

When running updates, you should wait for the job to complete before resuming development.

## Update Dev Content

If you are working on a site where the **Live** environment is active, you will want to make frequent syncs of content/configuration from your Live site into Dev. This insures your code development continues against an up-to-date set of environmental circumstances. Use this option to synchronize the content (database as well as <tt>sites/default/files</tt>) of your **Dev** environment with that of **Live** or **Test** .

![Site dashboard, workflow section, clone tab](https://pantheon-systems.desk.com/customer/portal/attachments/259903)

## Clone and Update Test Environment

When you are ready to test a new set of changes, the proper procedure is to take your code from **Dev** , your content from **Live** and freshly combine them to be absolutely certain that your deployment to live will go as planned.

After running this operation, be sure your database updates (or other <tt>hook_update()</tt> actions) succeeded, your exported configuration is in place, and that the site is functioning as expected. If there are additional manual "go live" instructions, now is a good time to review them and make sure they work and are properly documented.

![Site dashboard, test environment, code section](https://pantheon-systems.desk.com/customer/portal/attachments/259918)

This my be a good time to run regression or "smoketest" checks (stepping through your main workflows by hand) to be sure that everything is working correctly.

You can also use the clone tool in the "Code" deployment area to just pull the code without making any changes to the DB or files.

## Deploy Code To Live

After testing your changes, you can take them live. This will deploy the code that is currently in the **Test** environment and immediately update your live website.

When deploying a newly-built site for the very first time, it is often necessary to push the Content "forward", which is the opposite of the normal content workflow. In this case, you can use the "Test Content" and "Live Content" areas of the dashboard to pull the database and any uploaded content files (e.g. images) from Dev to Test to Live. You may also continue to use this workflow while a site is in development but not yet launched.

![Site dashboard, live environment, workflow section](https://pantheon-systems.desk.com/customer/portal/attachments/259920)

However, this workflow should almost never be used on a launched site. The only exception is if that site is 100% read-only, as pushing the database and files will overwrite all changes made via the Drupal system in the live environment.

If there are other workflows you would like to see, contact us with your ideas. We're always looking for ways to improve the platform.

## Handling Configuration Changes

Dealing with changes to your site's configuration can be a challenge in Drupal. Because the only reliable way to synchronize databases is to do so completely, and because Drupal stores its configuration in the database, it is not possible to "push configuration" from dev to test to live without taking some additional steps.

### hook\_update\_N()

Drupal core manages database/configuration changes via the use of [hook\_update\_N()](http://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_update_N/7), and you can too. If you have a custom module, you can add update functions to your .install file which encapsulate your config changes, deploy them along with your code, and run update.php to make the changes in test and live.

## Exporting Configuration

A growing array of common configurations are "exportable". In WordPress, [advanced custom fields can be exported to code](http://stevegrunwell.com/blog/exploring-the-wordpress-advanced-custom-fields-export-feature/). [ForumOne created](http://forumone.com/insights/configuration-management-finally-comes-to-wordpress/) the  [WP-CFM plugin](https://github.com/forumone/wp-cfm), which exports bundles of WordPress configuration to .json files in wp-content/config. In Drupal,  [views are easily exported to code](http://www.chapterthree.com/blog/matt_cheney/howto_best_practices_embedding_views_code). The  [features module](http://drupal.org/project/features) allows you to export sets of configuration like content types and their associated fields, to code as modules. It is a best practice to take advantage of this. Changes to exportable configurations should always take place in the Development environment, because only that environment can write to the file system, while in SFTP mode.

### Manual Changes

Of course, manually making configuration changes as part of your deployment is always an option. There are a number of modules designed to help you track configuration changes.

Ultimately, the right answer for managing configuration updates to your site depends on your use-case and comfort-level with these techniques. It's an ongoing debate in the Drupal and WordPress universe, with new solutions being developed all the time.

## Understanding Write Permissions in Test & Live

Preventing write permissions to the code in the Live environment via SFTP is not a bug but rather a feature and the desired functionality on the platform. We will not allow for changes to code to be made in Live via SFTP because these paths are managed by version control. Uploading the changes to Live directly would result in unstaged changes and this would be problematic as we use version control for code backups and when you pull code between environments.

If we allowed SFTP changes to be applied it would break a lot of functionality on the platform. Experience has also shown that this can destroy your codebase and cause long term issues if we allowed changes to be pushed to Live via SFTP.

**NOTE: There are only two ways to achieve the goal of updating code files in Test or Live on Pantheon.**

1. **Using the Workflow Tools**  
You can move your code through the workflow using the tools on the dashboard from Dev → Test → Live. This is outlined in the workflow documentation on the helpdesk. /documentation/howto/using-the-pantheon-workflow/
2. **A hotfix using git**  
If you need to make the changes directly to Live this is against development best practices which are the core of the platform but we make this accessible via git: Read more about hotfixes [here](/documentation/advanced-topics/hot-fixes/). Pushing a hotfix via git is the only option to push changes directly to Live without having to go through Dev and Test and there are no alternatives.

## Other Workflow Operations: Import, Export & Wipe

You may also import, export, and wipe the database and files per environment. Wiping completely resets the database and files. This means you will lose all data and will need to either re-import, or re-run install.php to get your site back online.

## Troubleshooting

### **Uncaught exception 'PDOException' with message 'SQLSTATE[42S02]: Base table or view not found: 1146 Table 'pantheon.semaphore' doesn't exist'**

This may occur during a database clone or import. A standard mysql import happens sequentially and in alphabetical order from A to Z. If you access the site before the operation is complete Drupal will try and bootstrap and the MySQL import may only be at the table letter G and the result is the semaphore does not exist error.
