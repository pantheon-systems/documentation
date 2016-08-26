---
title: Cloning an Existing Pantheon Site
description: Learn how to make a copy of your existing Drupal or WordPress site code, files, and database.
categories: [developing]
tags: [backups, platform, migrate]
keywords: clone, restore backup, clone existing pantheon site, clone from pantheon backup, clone pantheon site, copy pantheon site
---

## WordPress
After selecting **[Migrate Existing Site](https://dashboard.pantheon.io/sites/migrate/)**, you'll create a new Pantheon site and install the Pantheon Migrations plugin on your existing Pantheon site. Visit the plugin settings and paste in your newly created Pantheon site name, as well as the machine token we generate for you, which gives the plugin access to move data to your new Pantheon site.

See exactly how it works in the following video:
<iframe width="420" height="315" src="https://www.youtube.com/embed/3_DjdIueKM4" frameborder="0" allowfullscreen></iframe>

For more information see: [Migrate to Pantheon: WordPress](/docs/migrate-wordpress)

## Drupal
After selecting **[Migrate Existing Site](https://dashboard.pantheon.io/sites/migrate/)**, you'll create a new Pantheon site. During the **Create Site Archive** step of the migration process, use [Terminus](/docs/terminus) to create an archive of your existing Pantheon site:

```bash
terminus drush 'ard --destination=sites/default/files/cC1j4cP0GWaMWrD.tgz'
```

This operation writes the archive to Pantheon's filesystem in a web accessible location (e.g. `http://env-site-name.pantheonsite.io/sites/default/files/cC1j4cP0GWaMWrD.tgz`). Click **Continue Migration** and follow all remaining instructions within the guided migration process.

### Troubleshooting
If your archive is larger than 256MB the operation will fail, resulting in the following error:

```bash
Connection to appserver.<ENV>.<Site UUID>.drush.in closed by remote host.
```

If your database and code compressed are less than 256MB you can exclude the files directory from export using the following steps, otherwise [manually migrate](/docs/migrate-manual) the site.

<ol><li>Use <a href="/docs/terminus">Terminus</a> and the <code>--tar-options</code> flag:<br><br>
<pre><code class="bash hljs">terminus drush <span class="hljs-string">'ard <b>--tar-options="--exclude=sites/default/files"</b> --destination=sites/default/files/cC1j4cP0GWaMWrD.tgz'</span></code></pre></li></ol>

2. Click **Continue Migration**.
3. Provide the web accessible URL for your site archive (e.g. `http://env-site-name.pantheonsite.io/sites/default/files/cC1j4cP0GWaMWrD.tgz`) and select **Import Archive**.
4. Once the migration is complete, click **Visit the Site Dashboard**.
5. Create an archive of your site's files directory if you have not done so already:

 ```bash
 cd $SOURCE/sites/default/files
 tar -czf $TARGET/files.tar.gz .
 ```
6. Navigate to **Database / Files** > **Import** and upload the archive of your files directory.

## See Also
- [Migrate Sites to Pantheon: Manual Method](/docs/migrate-manual)
- [Migrate Sites to Pantheon: Troubleshooting](/docs/migrate-troubleshooting)
