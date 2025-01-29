---
contenttype: [partial]
categories: [todo]
cms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

1. [Go to the workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces) and select the **Create New Site** button:

   ![Create new site button](../../images/dashboard/new-dashboard/2024/create-new-site-button.png)

1. Select **WordPress** or **Drupal**.

   ![Select CMS](../../images/dashboard/new-dashboard/2024/create-new-site-cms.png)

   If you select Drupal, you will have the option to select the Drupal version you want to use.

   ![Select Drupal version](../../images/dashboard/new-dashboard/2024/create-new-site-cms-drupal-11crop.png)

   <Alert title="Note" type="info" >

   The above options are available during site creation in the **new dashboard**. The legacy dashboard site creation experience does not match today, but it will be aligned in the future.

   Upgrade today by clicking **Try the New Dashboard**, located in the top right of the legacy dashboard navigation. Or if you prefer not to upgrade, use the following site creation links:

   * [Drupal 11](https://dashboard.pantheon.io/sites/create?upstream_machine_name=drupal-11-composer-managed)
   * [Drupal 10](https://dashboard.pantheon.io/sites/create?upstream_machine_name=drupal-10-composer-managed)

   </Alert>

1. Enter the following information and click **Continue**:
   - Sitename
   - Select a region for this site.
   - If this site is to be part of a Professional Workspace, select a Workspace from **Choose a Workspace for the Site**.

   ![Enter site information](../../images/create-new-site-info.png)

1. The deployment process begins. It can take several minutes to create a new site on Pantheon.

   ![Deploying a new site](../../images/create-new-site-deploy.png)

   <Alert title="Note" type="info" >

   You can navigate away from this page during this process, but later, you'll have access the site via the **Sites** tab in your Workspace.

   </Alert>

1. Click **Visit your Pantheon Site Dashboard** when the process is complete.

   ![Site creation completed](../../images/create-site-done.png)

You've now created the core portion of your Dev environment; now you have to install the CMS.
