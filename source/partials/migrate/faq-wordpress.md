### Does the WordPress migration cause downtime?

No, there is no downtime expected as part of the migration process. For details, see related [BlogVault resource (question #13)](https://blogvault.net/migration-using-blogvault-faq/). Performance implications to a live site are similar to running a backup for the site.

### How long does the WordPress migration process take?

Most migrations are completed within two hours. The migration time depends solely on the size of your site, so be aware that it may take more or less time than estimated. We will send you an email once your migration is complete. If there are any issues with the migration, we will notify you by email.

### How do I use the Pantheon Migrations plugin with a custom WordPress upstream?

If you'd like your existing WordPress site to get one-click updates from your [Custom Upstream](/custom-upstream), then the migration process will be slightly different.

1. The general process will be the same as a vanilla WordPress site, but start with **Create New Site** instead of **Migrate existing site**.

1. Name your new site, and be sure to add it to the organization with access to the Custom Upstream you want to use.

1. On the next page, choose your Custom Upstream, and complete the installation.

You can now proceed with the [standard migration procedure](migrate), starting at Step 8.

### Are database table prefixes supported?

See [WordPress known issues](/wordpress-known-issues/#table-prefixes).

