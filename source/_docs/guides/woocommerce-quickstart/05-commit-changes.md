---
title: WooCommerce Quick Start
subtitle: Commit Changes
woocommercequickstart: true
anchorid: commit-changes
generator: pagination
layout: guide
type: guide
pagination:
    provider: data.woocommercequickstartpages
use:
    - woocommercequickstartpages
permalink: docs/guides/woocommerce-quickstart/commit-changes/
nexturl: guides/woocommerce-quickstart/create-test-and-live-environments/
nextpage: Create Test and Live Environments
previousurl: guides/woocommerce-quickstart/site-configuration/
previouspage: Site Configuration
editpath: woocommerce-quickstart/05-commit-changes.md
image: guides/woocommerce-quickstart/WooCommerce-logo-400-200
---
At Pantheon, we believe in best practices for development, and that includes using [version control](/features/version-control-workflow) - that's why it's built into our platform. We've done a lot on the dev environment so far and at this point we're just about ready to move everything over to the live environment.

However, there's one thing we need to do first. Whenever you install a plugin or write custom code you'll have to commit your changes

Pantheon has two ways to commit changes. [SFTP mode](/docs/sftp/), which looks at what files you uploaded and automatically tracks them to be committed, and git mode, which allows you to commit files directly with git. git mode is great for working locally, and SFTP mode is great for working directly on Pantheon.

Since we uploaded files through our WordPress site, and not through a terminal or code editor, let's use SFTP mode to commit these changes.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/13-Pantheon-dashboard-SFTP-changes.png" style="max-width:100%;" alt="Pantheon dashboard SFTP changes">
</p>

In your site settings in Pantheon make sure SFTP mode is enabled. Then type in a commit message. Try to be as explicit as possible to help you remember exactly what happened when. And it's a best practice to make a commit for each change you make. That way if you wish to revert one thing it can be done easily without losing the other changes.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/14-Pantheon-dashboard-commit-SFTP-changes.png" style="max-width:100%;" alt="Committing SFTP changes">
</p>

Once you're all done click Commit. When you've finished you should see your changes in the commit log.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/15-Pantheon-dashboard-commit-log.png" style="max-width:100%;" alt="Pantheon dashboard commit log">
</p>

We've just made a ton of changes and, before we hand this off to someone to add content to the site, we should [make a backup](/docs/backups/) in case we need to restore to this starting state.

With a free plan you can make as many manual backups as you like. If you upgrade to a paid plan you enable automatic backups. Let's create a manual backup.

In your site settings go to Backups and then select how long you want to store your backup. I like to set mine to 6 months which gives me plenty of time to fix any issues.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/16-Pantheon-dashboard-create-backup.png" style="max-width:100%;" alt="Creating a backup on the Pantheon dashboard">
</p>

Click the yellow "Create New Backup" button. You can keep an eye on the backup progress from the "Workflows" menu in the upper-right side of the dashboard.
