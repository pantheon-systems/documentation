---
contenttype: partial
categories: [migrate]
newcms: [--]
product: [--]
integration: [wordpress]
tags: [--]
reviewed: ""
---

## WordPress FAQ

### Does the WordPress migration cause downtime?

No, there is no downtime expected as part of the migration process. For details, see related [BlogVault resource (question #13)](https://blogvault.net/migration-using-blogvault-faq/). Performance implications to a live site are similar to running a backup for the site.

### How long does the WordPress migration process take?

Most migrations are completed within two hours. The migration time depends solely on the size of your site, so be aware that it may take more or less time than estimated. We will send you an email when your migration is complete. If there are any issues with the migration, we will notify you by email.

### How do I use the Pantheon Migrations plugin with a custom WordPress upstream?

If you'd like your existing WordPress site to get one-click updates from your [Custom Upstream](/guides/custom-upstream), then the migration process will be slightly different. The general process will be the same as a vanilla WordPress site with a few differences.

1. Click **Create New Site** instead of **Migrate existing site**.

1. Name your new site, and be sure to add it to the workspace with access to the Custom Upstream you want to use.

1. Choose your Custom Upstream and complete the installation.

You can now proceed with the [standard migration procedure](migrate), starting at Step 8.

### Are database table prefixes supported?

You must review [WordPress known issues](/wordpress-known-issues/#table-prefixes) for potential extra steps.

### How do I migrate a local site to Pantheon?

The Pantheon Migration plugin for WordPress does not support local sites. WordPress users should [manually migrate](/migrate-manual).

### How do I clone an existing Pantheon site?

You can make a copy of a WordPress site on Pantheon by following the [standard migration procedure](migrate). The procedure does not deviate for WordPress sites already hosted on Pantheon, and is preferred since it's built into the Site Dashboard.
