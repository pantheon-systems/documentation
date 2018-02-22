---
title: Manually Migrate Sites to Pantheon
description: Learn how to manually migrate a Drupal or WordPress site to Pantheon
tags: [migratemanual]
categories: []
---
Manually migrate your site to Pantheon when any of the following apply:

* **Large Drupal Site Archive**: Site archive exceeds the import file size limit of 500MB.
* **Preserve Git History**: You'd like to preserve your site's existing Git commit history.
* **[WordPress Site Networks](/docs/guides/multisite/)**
* **Plugin install unavailable on existing WordPress site**: For example, if your existing site is hosted on WordPress.com, you'll be unable to install the Pantheon Migrations plugin.
* **Local WordPress Site**: If your WordPress site is only on your local machine and not yet live.
* **Debug Failed Migration**: It can be helpful to migrate your code, database, and files separately if the standard migration procedure failed.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">Use the [standard migration procedure](/docs/migrate) if none of the above apply to your project.</p></div>

## Before You Begin
To ensure a successful migration, complete the following tasks on the source site first:

- Upgrade to the latest version of WordPress or Drupal core
- Clear all caches
- Remove unneeded code, database tables, and files
- [Configure SSH keys](/docs/ssh-keys)

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#advanced-before-you-begin">
      <h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Advanced Tips for Successful Migration</h3>
    </a>
  </div>
  <div id="advanced-before-you-begin" class="collapse" markdown="1" style="padding:10px;">
  #### .gitignore
  Check the contents of your current codebase for existing `.gitignore` files. To be compatible with the platform, using the Pantheon version is advised.  Otherwise, attempts to import files to restricted paths could break the import process. See the platform-provided versions for [Wordpress](https://github.com/pantheon-systems/WordPress/blob/master/.gitignore), [Drupal 7](https://github.com/pantheon-systems/drops-7/blob/master/.gitignore), and [Drupal 8](https://github.com/pantheon-systems/drops-8).
  #### Local Drupal configurations
  To preserve the database connection credentials for a site built on a local development environment, and to exclude them from version control, move your `settings.php` file to `settings.local.php` and add it to `.gitignore` so that it will be ignored by Git and included from Pantheon's `settings.php` when working on your site locally. Make sure that you can modify it, and restore the protections after the move:

  ```bash
  chmod u+w sites/default/{.,settings.php}
  mv sites/default/{settings.php,settings.local.php}
  chmod u-w sites/default/{settings.local.php,.}
  ```

  Drupal 8 sites running on Pantheon come with a bundled `settings.php` that includes the `settings.local.php` file, so no additional steps are required. However, sites running Drupal 6 or 7 must add a `settings.php` file that includes `settings.local.php`, as this file is not bundled on Pantheon.

  </div>
</div>

## Create Pantheon Site
1. Navigate to your User Dashboard and click the **Migrate Existing Site** button:

    ![The Migrate Existing Site Button](/source/docs/assets/images/dashboard/migrate-existing-site.png)
2. Enter your current website URL, choose your site type (Drupal 7, Drupal 8, or WordPress,), and click **Continue**:

    ![Choose the Starting State for your Migrated Site](/source/docs/assets/images/dashboard/migrate-step2.png)
3. Name your site and select an [Organization](/docs/organizations/) (optional), then click **Create Site**:

    ![Name the Migrated Site and Optionally Choose an Organization](/source/docs/assets/images/dashboard/migrate-step3.png)
4.  Click the link to manually migrate your site then select **Yes** to confirm:

     <!-- Nav tabs -->
     <ul class="nav nav-tabs" role="tablist">
        <!-- Active tab -->
        <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">WordPress</a></li>

        <!-- 2nd Tab Nav -->
        <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal</a></li>

     </ul>

     <!-- Tab panes -->
     <div class="tab-content">
       <!-- Active pane content -->
       <div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">
       ![Choose Manual WordPress Migration](/source/docs/assets/images/dashboard/migrate-manual-wp.png)
        </div>

       <!-- 2nd pane content -->
       <div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
       ![Choose Manual Drupal Migration](/source/docs/assets/images/dashboard/migrate-manual-drops.png)
      </div>

     </div>
5. Click **Visit your Pantheon Site Dashboard**:

  ![Creating Your Site on Pantheon Complete for manual migration](/source/docs/assets/images/dashboard/migrate-manual-visit-your-site-dashboard.png)

Now that you have a new site on Pantheon, you're ready to add the major components from your existing site: custom code, files, and the database.

## Import Your Code
Your **code** is all custom and contributed modules or plugins, themes, and libraries. The codebase should not include the `wp-content/uploads` (WordPress) / `sites/default/files` (Drupal) directory, or any other static assets you do not want tracked by version control.
  <div class="panel panel-drop panel-guide" id="accordion">
    <div class="panel-heading panel-drop-heading">
      <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#unique-anchor">
        <h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Code Directory Structure</h3>
      </a>
    </div>
    <div id="unique-anchor" class="collapse" markdown="1" style="padding:10px;">
      {% include("content/code.html")%}
    </div>
  </div>
  <div class="alert alert-info">
  <h4 class="info">Note</h4>
  <p markdown="1">If your existing site is already version controlled and you would like to preserve the commit history, import the code from the command line with Git. If you prefer to avoid the command line entirely, we suggest importing the codebase using an SFTP Client such as [Transmit](https://panic.com/transmit/){.external} or [Cyberduck](https://cyberduck.io/){.external}.</p></div>

### Using an SFTP Client
1. Navigate to **<span class="glyphicons glyphicons-embed-close"></span> Code** in the **<span class="glyphicons glyphicons-wrench"></span> Dev** tab of your Site Dashboard. Confirm your Connection Mode is set to **SFTP**.
2. Click **<span class="glyphicons glyphicons-info-sign"></span> SFTP Connection Info** to access the credentials for connecting to your preferred SFTP client.
3. Click **Open in your default SFTP client**, and enter your User Dashboard password when prompted.

  If you run into issues, please refer to [this documentation](/docs/sftp/#sftp-connection-information).

4. Upload your existing site's plugins, modules, and themes to the `code` directory. Do not overwrite WordPress or Drupal core files on your Pantheon site.
5. Return to the Site Dashboard on Pantheon, and you should see quite a few files ready to be committed to version control. Write a commit message such as "Import existing codebase" then click **Commit**.

### From the Command Line with Git
1. Navigate to your existing site's code directory in a local terminal. If your existing code is _not_ already version controlled with Git, create a repository and add an initial commit:

    ```bash
    git init
    git add .
    git commit -m "initial commit"
    ```

2. From the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment of the Site Dashboard, set the site's connection mode to Git:

  ![Git connection mode](/source/docs/assets/images/dashboard/connection-mode-git.png)

3. Copy the SSH URL for the site repository. *Do not copy* `git clone` or the site name.

  The URL should look similar to the following:

  ```bash
  ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git
  ```

4. Add your new Pantheon site as a remote destination for your local code repository (replace `<ssh_url>` with the SSH URL copied in the previous step):

  ```bash
  git remote add pantheon <ssh_url>
  ```

5. Select the appropriate version of Git running on your local machine (`git --version`), then merge the codebase from your new Pantheon site with your existing site's codebase:

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
     <li role="presentation" class="active"><a href="#28-step6" aria-controls="28-step6" role="tab" data-toggle="tab">Git 2.8 and Below</a></li>
     <li role="presentation"><a href="#29-step6" aria-controls="29-step6" role="tab" data-toggle="tab">Git 2.9 and Above</a></li>
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
     <div role="tabpanel" class="tab-pane active" id="28-step6">
     <pre><code class="bash hljs">git pull --no-rebase --squash -Xtheirs pantheon master</code></pre>
    </div>
     <div role="tabpanel" class="tab-pane" id="29-step6">
      <pre><code class="bash hljs">git pull --no-rebase --squash -Xtheirs pantheon master --allow-unrelated-histories</code></pre>
     </div>
    </div>

  The output will resemble:

  ```bash
  Squash commit -- not updating HEAD
  Automatic merge went well; stopped before committing as requested
  ```

  If you haven't already configured [SSH Keys](/docs/ssh-keys), authenticate using your Pantheon Dashboard credentials when prompted for a password.

7. Review your current index using `git status`, then commit all changes:

  ```bash
  git add .
  git commit -m "Adding Pantheon core files"
  ```
8. Align your local branch with its remote counterpart on Pantheon:

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
     <li role="presentation" class="active"><a href="#28-step8" aria-controls="28-step8" role="tab" data-toggle="tab">Git 2.8 and Below</a></li>
     <li role="presentation"><a href="#29-step8" aria-controls="29-step8" role="tab" data-toggle="tab">Git 2.9 and Above</a></li>
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
     <div role="tabpanel" class="tab-pane active" id="28-step8">
     <pre><code class="bash hljs">git pull pantheon master --no-rebase</code></pre>
     </div>
     <div role="tabpanel" class="tab-pane" id="29-step8">
      <pre><code class="bash hljs">git pull pantheon master --no-rebase --allow-unrelated-histories</code></pre>
     </div>
    </div>

9. Push your newly merged codebase up to your Pantheon site repository:

    ```bash
    git push pantheon master
    ```

10. Go to the **<span class="glyphicons glyphicons-embed-close"></span> Code** tab of your **<span class="glyphicons glyphicons-wrench"></span> Dev** environment on the Site Dashboard. You should see your site's pre-existing commit history and the most recent commit adding Pantheon's core files.

## Add Your Database
The **Database** import requires a single `.sql` dump that contains the site's content and configurations.

1. Create a `.sql` dump using the [mysqldump](https://dev.mysql.com/doc/refman/5.7/en/mysqldump.html){.external} utility. To reduce the size for a faster transfer, we recommend you compress the resulting archive with gzip:

  ```bash
  mysqldump -uUSERNAME -pPASSWORD DATABASENAME > ~/db.sql
  gzip ~/db.sql
  ```

     - Replace `USERNAME` with a MySQL user with permissions to access your site's database.
     - Replace `PASSWORD` with the MySQL user's password. You can also move `-p` to the end of the command and leave it blank, to be prompted for your password. This prevents your MySQL password from being visible on your terminal.
     - Replace `DATABASE` with the name of your site database within MySQL.
     - `~/db.sql` defines the output target to a file named `db.sql` in your user's home directory. Adjust to match your desired location.


  The resulting file will be named `db.sql.gz` You can use either the Pantheon Dashboard or a MySQL client to add your site's database.

2. From the Site Dashboard, select the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment.
3. Select **<span class="glyphicons glyphicons-server"></span> Database / Files**.
4. Click **Import** and add your archive accordingly (based on file size):

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
    <!-- Active tab -->
    <li id="100mbs-id" role="presentation" class="active"><a href="#100mbs" aria-controls="100mbs" role="tab" data-toggle="tab">Up to 100MBs</a></li>

    <!-- 2nd Tab Nav -->
    <li id="500mbs-id" role="presentation"><a href="#500mbs" aria-controls="500mbs" role="tab" data-toggle="tab">Up to 500MBs</a></li>

    <!-- 3rd Tab Nav -->
    <li id="500mbsplus-id" role="presentation"><a href="#500mbsplus" aria-controls="500mbsplus" role="tab" data-toggle="tab">Over 500MBs</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
    <!-- Active pane content -->
    <div role="tabpanel" class="tab-pane active" id="100mbs" markdown="1">
    If your archive is under 100MB, you can upload the file directly:

    1. In the **MySQL database** field, click **File**, then **Choose File**.
    2. Select your local archive file, then press **Import**.

        ![Import MySQL database from file](/source/docs/assets/images/dashboard/import-mysql-file.png)
    </div>

    <!-- 2nd pane content -->
    <div role="tabpanel" class="tab-pane" id="500mbs" markdown="1">
    If your archive is less than 500MB, you can import it from URL:

    1. In the **MySQL database** field, click **URL**.
    2. Paste a publicly accessible URL for the `.sql.gz` file, and press **Import**. Change the end of Dropbox URLs from `dl=0` to `dl=1` so we can import your archive properly.

      ![Import MySQL Database from URL](/source/docs/assets/images/dashboard/import-mysql-url.png)
    </div>

    <!-- 3rd pane content -->
    <div role="tabpanel" class="tab-pane" id="500mbsplus" markdown="1">
    The following instructions will allow you to add database archives larger than 500MBs using the command line MySQL client, but you can also use a GUI client like Sequel Pro or Navicat. For more information, see [Accessing MySQL Databases](/docs/mysql-access/).

    1. From the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment on the Pantheon Site Dashboard, click **Connection Info** and copy the Database connection string. It will look similar to this:

     ```
     mysql -u pantheon -p{random-password} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon
     ```

    2. From your terminal, `cd` into the directory containing your `.sql` file. Paste the connection string and append it with:
    `< database.sql`. Your command will look like:

     ```
     mysql -u pantheon -p{random-password} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon < database.sql
     ```

       If you encounter a connection-related error, the DB server could be in sleep mode. To resolve this, load the site in your browser to wake it up, and try again. For more information, see [Troubleshooting MySQL Connections](/docs/mysql-access/#troubleshooting-mysql-connections).

    3. After you run the command, the `.sql` file is imported to the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment.
    </div>
    </div>

## Upload Your Files
**Files** refer to anything within `sites/default/files` for Drupal or `wp-content/uploads` for WordPress, which typically includes uploaded images, along with generated stylesheets, aggregated scripts, etc. Files are not under Git version control and are stored separately from the site's code.

You can use the Pantheon Dashboard, SFTP, or Rsync to upload your site's files.

1. Export a `tar.gz` or `.zip` file of your files directory:

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <!-- Active tab -->
      <li id="files-wp" role="presentation" class="active"><a href="#files-wp-anchor" aria-controls="files-wp-anchor" role="tab" data-toggle="tab">WordPress</a></li>

      <!-- 2nd Tab Nav -->
      <li id="files-drops" role="presentation"><a href="#files-drops-anchor" aria-controls="files-drops-anchor" role="tab" data-toggle="tab">Drupal</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
      <!-- Active pane content -->
      <div role="tabpanel" class="tab-pane active" id="files-wp-anchor" markdown="1">
      Navigate to your WordPress site's root directory to run this command, which will create an archive file in your user's home directory:

      ```bash
      cd wp-content/uploads
      tar -czf ~/files.tar.gz .
      ```
      </div>

      <!-- 2nd pane content -->
      <div role="tabpanel" class="tab-pane" id="files-drops-anchor" markdown="1">
      Navigate to your Drupal site's root directory to run this command, which will create an archive file in your user's home directory:

      ```bash
      cd sites/default/files
      tar -czf ~/files.tar.gz .
      ```
      </div>
    </div>
2. From the Site Dashboard, select the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment.
3. Select **<span class="glyphicons glyphicons-server"></span> Database / Files**.
4. Click **Import** and add your archive accordingly (based on file size):

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
    <!-- Active tab -->
    <li id="100mbsfiles-id" role="presentation" class="active"><a href="#100mbsfiles" aria-controls="100mbsfiles" role="tab" data-toggle="tab">Up to 100MBs</a></li>

    <!-- 2nd Tab Nav -->
    <li id="500mbsfiles-id" role="presentation"><a href="#500mbsfiles" aria-controls="500mbsfiles" role="tab" data-toggle="tab">Up to 500MBs</a></li>

    <!-- 3rd Tab Nav -->
    <li id="500mbsplusfiles-id" role="presentation"><a href="#500mbsplusfiles" aria-controls="500mbsplusfiles" role="tab" data-toggle="tab">Over 500MBs</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
    <!-- Active pane content -->
    <div role="tabpanel" class="tab-pane active" id="100mbsfiles" markdown="1">
    If your archive is under 100MB, you can upload the file directly:

    1. In the **Archive of site files** field, click **File**, then **Choose File**.
    2. Select your local archive file, then press **Import**.
    </div>

    <!-- 2nd pane content -->
    <div role="tabpanel" class="tab-pane" id="500mbsfiles" markdown="1">
    If your archive is less than 500MB, you can import it from URL:

    1. In the **Archive of site files** field, click **URL**.
    2. Paste a publicly accessible URL for the archive, and press **Import**. Change the end of Dropbox URLs from `dl=0` to `dl=1` so we can import your archive properly.
    </div>

    <!-- 3rd pane content -->
    <div role="tabpanel" class="tab-pane" id="500mbsplusfiles" markdown="1">
    Rsync is an excellent method for transferring a large number of files. After performing an initial rsync, subsequent jobs will only transfer the latest changes. This can help minimize the amount of time a site is in an unpredictable state (or offline) during the final step of migration, as it allows you to bring over only new content rather than re-copying every single file.

    We recommend looking into the [Terminus Rsync Plugin](https://github.com/pantheon-systems/terminus-rsync-plugin) as a helper when doing these operations, as the number of command line arguments and specifics of directory structure make it easy for human error to impact your operation.

    To sync your current directory to Pantheon:

    ```bash
    terminus rsync . my_site.dev:files
    ```

    When using Rsync manually, the script below is useful for dealing with transfers being interrupted due to connectivity issues. It uploads files to your Pantheon site's **<span class="glyphicons glyphicons-wrench"></span> Dev** environment. If an error occurs during transfer, it waits 180 seconds and picks up where it left off:


    ```bash
    ENV='dev'
    SITE='SITEID'

    read -sp "Your Pantheon Password: " PASSWORD
    if [[ -z "$PASSWORD" ]]; then
    echo "Whoops, need password"
    exit
    fi

    while [ 1 ]
    do
    sshpass -p "$PASSWORD" rsync --partial -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' ./files/* --temp-dir=../tmp/ $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/
    if [ "$?" = "0" ] ; then
    echo "rsync completed normally"
    exit
    else
    echo "Rsync failure. Backing off and retrying..."
    sleep 180
    fi
    done
    ```
    </div>
    </div>

You should now have all three of the major components of your site imported into Pantheon. Clear your caches on the the Pantheon Dashboard, and you are good to go! Once everything looks good, click **I've Successfully Migrated Manually**:

![Finish Manual Migration](/source/docs/assets/images/successfully-migrated.png)
## Troubleshooting

### fatal: Not possible to fast-forward, aborting.
This error may occur when trying to merge Pantheon's codebase into your existing repository as described earlier on this page in (step 5 of [importing your code from the commandline](#from-the-command-line-with-git):

```
Not possible to fast-forward, aborting.
```

Depending on your Git version, you may see the following error instead: 

```
fatal: refusing to merge unrelated histories
```

If you see this, it is possible your local Git configuration is disallowing non-fastforward merges:

```
[pull]
rebase = TRUE
ff = only
```

In this case, you will want to remove `ff = only` from your `.gitconfig` file and try the merge command again. 

## See Also
Check our standard migration procedure for related <a href="/docs/migrate#frequently-asked-questions-faqs" data-proofer-ignore>Frequently Asked Questions</a> and [Troubleshooting](/docs/migrate#troubleshooting) tips.
