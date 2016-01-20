---
title: Migrate to Pantheon: Manual Site Import
description: Learn how to import a Drupal or WordPress site into Pantheon outside of the Importer Tool.
keywords: import, importing site, pantheon, new site, large site, distro, upstream, git history
---

Manually import your site to Pantheon outside of the provided [Importer Tool](/docs/articles/sites/migrate/#plan-the-import) when any of the following apply:

* **Large Site Archives**: Site archive is greater than the automated import limits (100MB for direct file upload or 500MB for URL upload).
* **Custom Upstream**: Site should receive updates based on an upstream other than vanilla Drupal or WordPress (e.g Panopoly or your agency's customized WordPress).
* **Preserve Git History**: Site's existing Git commit history should be retained.
* **Sites running Drupal 8**
* **[WordPress Site Networks](/docs/articles/sites/migrate/wordpress-site-networks/)**

## Requirements

* [Download](http://git-scm.com/downloads) and install [Git](/docs/articles/local/starting-with-git/)
* [Rsync or SFTP Client](/docs/articles/local/rsync-and-sftp/)
* [MySQL Client](/docs/articles/local/accessing-mysql-databases/)

## Create a New Pantheon Site and Start from Scratch

From your Pantheon Dashboard:

* Choose **Create a new site**.
* Name your site.
* Select **Start from scratch**, and choose your starting codebase.

Starting from scratch allows your site to connect to that upstream so you can later [apply upstream updates](/docs/articles/sites/code/applying-upstream-updates/) from your Dashboard with one click.

## Import the Codebase

**Codebase** - all executable code, including core, custom and contrib modules or plugins, themes, and libraries.

As long as you've chosen the same codebase (Drupal 7, Commerce Kickstart, etc.) as the starting point of your Pantheon site, you can use Git to import your existing code and commit history. If you don’t have a Git version controlled codebase, the following will still work.

1. Navigate to your existing site's code directory in a local terminal. If your existing code is not version controlled with Git, create a repository and add an initial commit:

 ```bash
 git init
 git add .
 git commit -m "initial commit"
 ```
2. From the Dev environment of the site Dashboard, set the site's [connection mode](/docs/articles/getting-started/#interact-with-your-code) to Git.
3. Copy the SSH URL for the site repository, found in the <a href="/docs/articles/local/starting-with-git/#step-2-copy-the-git-clone-command" data-proofer-ignore>clone command</a>. **Do not copy `git clone` or the site name.** The URL should look similar to the following:

 ```bash
 ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git
 ```

4. Add Pantheon as a remote destination, replacing `<ssh_url>` with the SSH URL copied in Step 3:

 ```bash
 git remote add pantheon <ssh_url>
 ```

5. **Drupal only**: Move your settings file to `settings.local.php` so that it will be ignored by git  and included from Pantheon's `settings.php`. First, make sure that you can modify it, and restore the protections after the move:

 ```bash
 chmod u+w sites/default/{.,settings.php}
 mv sites/default/{settings.php,settings.local.php}
 chmod u-w sites/default/{settings.local.php,.}
 ```
 Drupal 8 sites running on Pantheon come with a bundled `settings.php` that includes the `settings.local.php` file, so no additional steps are required. However, sites running Drupal 6 or 7 must add a `settings.php` file that includes `settings.local.php`, as this file is not bundled on Pantheon.

6. Use Git to pull in the upstream's code (which may have Pantheon-specific optimizations) to your existing site's codebase:

 ```bash
 git pull --no-rebase --squash -Xtheirs pantheon master
 ```  

 Will yield:  
 ```bash
 Squash commit -- not updating HEAD  
 Automatic merge went well; stopped before committing as requested
 ```

7. Run git commit to prepare the Pantheon core merge for pushing to the repository:
 ```bash
 git commit -m "Adding Pantheon core files"
 ```
8. Align your local branch with it's remote counterpart on Pantheon:

 ```bash
 git pull pantheon master
 ```
9. Push your newly merged codebase up to your Pantheon site repository:

 ```bash
 git push pantheon master
 ```

10. Go to the Code tab of your Dev environment on the site Dashboard. You will see your site's pre-existing code commit history and the most recent commit adding Pantheon's core files.

## Files

**Files** - anything in `sites/default/files` for Drupal or `wp-content/uploads` for WordPress. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc. For information on highly populated directories, see [Platform Considerations](/docs/articles/sites/platform-considerations/#highly-populated-directories).

Files are stored separately from the site's code. Larger file structures can fail in the Dashboard import due to sheer volume. It's best to use a utility such as an SFTP client or rsync. The biggest issue is having the transfer stopped due to connectivity issues. To handle that scenario, try this handy bash script:  

```bash
ENV='ENV'
SITE='SITEID'

read -sp "Your Pantheon Password: " PASSWORD
if [[ -z "$PASSWORD" ]]; then
echo "Woops, need password"
exit
fi

while [ 1 ]
do
sshpass -p "$PASSWORD" rsync --partial -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222'  $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/* --temp-dir=../tmp/  ./files/
if [ "$?" = "0" ] ; then
echo "rsync completed normally"
exit
else
echo "Rsync failure. Backing off and retrying..."
sleep 180
fi
done
```
This script connects to your Pantheon site's Dev environment and starts uploading your files. If an error occurs during transfer, rather than stopping, it waits 180 seconds and picks up where it left off.  

If you are unfamiliar or uncomfortable with bash and rsync, an FTP client that supports SFTP, such as FileZilla, is a good option. Find your Dev environment's SFTP connection info and connect with your SFTP client. Navigate to `/code/sites/default/files/`. You can now start your file upload.  

## Database  

**Database** - a single .sql dump that contains the content and active state of the site's configurations.

You'll need an .sql file containing the data from the site you want to import. If you haven't done so already, make sure you remove any data from the cache tables. That will make your .sql file much smaller and your import that much quicker.


1. From the Dev environment on the Site Dashboard, click **Connection Info** and copy the Database connection string. It will look similar to this:

 ```
 mysql -u pantheon -p{massive-random-pw} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon
 ```
2. From your terminal, `cd` into the directory containing your `.sql` archive. Paste the connection string and append it with:
`< database.sql`
Your command will now look like:

 ```
 mysql -u pantheon -p{massive-random-pw} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon < database.sql
 ```
3. After you run the command, the .sql file is imported into your Pantheon Dev database.  

You should now have all three of the major components of your site imported into Pantheon. Clear your caches via the Pantheon Dashboard, and you are good to go.
