---
contenttype: [partial]
categories: [migrate]
cms: [drupal]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

<Alert type="info" title="Note"> 

The process described on this page is supported for Drupal 7 sites only. 
   * Modern Drupal sites should instead refer to [this composer-based migration process](/guides/drupal-unhosted-composer). 
   * Older Drupal 8 sites not managed by composer should instead refer to this [manual migration process](/migrate-manual). 

</Alert>

1. Open your Personal or Professional Workspace dashboard and click the **Migrate Existing Site** button.

   ![Migrate site button](../../../images/dashboard/new-dashboard/2025/migrate-site-button.png)

1. Select **Drupal 7**:

   ![Enter URL and select CMS](../../../images/dashboard/new-dashboard/2025/migrate-site-cms.png)

1. Enter the name of your new Pantheon site, select a workspace for the site (optional), and click **Create Site**:

   ![Site creation form for Drupal 7 migrations prompting user to input site name and associated workspace](../../../images/dashboard/new-dashboard/2025/migrate-site-drupal-create-site.png)

   When a workspace is selected, you will be prompted to confirm your selection. Review your selection and when ready click **Confirm** in the popup to continue: 

   ![Confirmation prompt for workspace selection during site creation in the dashboard](../../../images/dashboard/new-dashboard/2025/confirm-workspace-prompt.png)

1. When the Drupal site deployment is complete, click **Continue**:

   ![Site creation form for Drupal 7 migrations prompting user to input site name and associated workspace](../../../images/dashboard/new-dashboard/2025/migrate-site-drupal-create-site.png)

1. Finish the Drupal 7 site migration process by following the prompts on screen, which includes: 
   
   * [Importing your code](/migrate-manual#import-your-code) 
   * [Adding your database](/migrate-manual#add-your-database)
   * [Uploading your files](/migrate-manual#upload-your-files).