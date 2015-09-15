---
title: Importing a Large Site
description: Learn how to import a large Drupal or WordPress site into Pantheon outside of the Dashboard.
category:
  - getting-started
  - developing
keywords: import, importing site, pantheon, new site, large site
---

This article covers the techniques required to import a large site into Pantheon outside of the Pantheon Dashboard. Follow this procedure if:

* Your site’s code, files, or SQL archive is greater than 100MB (the direct file upload import size limit).
* Your site’s code, files, or SQL archive is greater than 500MB (the URL upload import file limit).

## Requirements

1. Intermediate to advanced [Git](http://git-scm.com/) command line interface (CLI) knowledge.
2. Familiarity with using [bash](http://www.gnu.org/software/bash/) and [rsync](http://rsync.samba.org/) or an FTP program that supports [SFTP](http://en.wikipedia.org/wiki/SFTP).
3. Intermediate to advanced [MySQL CLI](https://mariadb.com/kb/en/mariadb/documentation/clients-and-utilities/mysql-client/mysql-command-line-client/) knowledge.
4. Access to the code, database, and files of the site being imported.  

## Create A New Pantheon Site  

From your Pantheon Dashboard, choose **Create a new site**. Name your site, select **Start from scratch**, and choose your starting codebase. After the site is created, switch the site's connection mode from SFTP to Git.  

## Import the Codebase

**Codebase** - all executable code, including core, custom and contrib modules or plugins, themes, and libraries.

As long as you've chosen the same codebase (Drupal 7, Commerce Kickstarter, etc.) as the starting point of your Pantheon site, you can use Git to import your existing code with commit history intact. If you don’t have a version controlled codebase, the following will still work, though there won’t be a commit history for Pantheon’s Git repository to reference.

1. Go to your code directory within your terminal.
2. Bring in the Pantheon core files. If your existing site code is not version controlled with Git, run 'git init' first.
3. From your site's Dashboard, go to the **Dev** environment.
4. Click **Settings**, then select **About Site**.
5. Place your mouse over the upstream value, left click and select **Copy link** to get the site's Pantheon upstream location.  
 ![](/source/docs/assets/images/pantheon-dashboard-settings-about-site-upstream.png)  
6. The following Git command pulls in the Pantheon Drupal 7 specific core. Replace the {paste-value-here} with the link from step 5:

**Original:**

```bash
git pull --no-rebase -Xtheirs --squash {paste-value-here} master
```
**Updated:**

```bash
git pull --no-rebase -Xtheirs --squash http://github.com/pantheon-systems/drops-7 master
```
<div class="alert alert-warning" role="alert">
<h4>Note</h4>
Replace "http" with "git" and then add ".git" to the end of the URL you just pasted. The URL will go from this: <code>http://github.com/pantheon-systems/drops-7</code> to <code>git://github.com/pantheon-systems/drops-7.git</code>.</div>

**Final Command:**

```bash
git pull --no-rebase -Xtheirs --squash git://github.com/pantheon-systems/drops-7.git master
```  

Once executed, Pantheon pulls in your core files, but doesn't commit them; you will be able to do a final review. You will see this message when it's done:  
```bash
Squash commit -- not updating HEAD  
Automatic merge went well; stopped before committing as requested
```

7. From your Pantheon Dashboard, go to the **Dev** tab and select **Code**. Make sure your site is in Git mode, and copy the Git connection information found to the right of the Git tab.

  ![](/source/docs/assets/images/pantheon-dashboard-git-connection-info.png)

8. From your terminal within the site directory, use the Git remote add command with an alias to make sure you know when you are moving code to or from Pantheon. Replace the pantheon-site-git-repo-information with the Git information from the previous step.  
  **From:**
 ```bash
 git remote add pantheon pantheon-site-git-repo-information
 ```

  **To:**
  ```bash
  git remote add pantheon ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git pantheon-new-site-import
  ```

  <div class="alert alert-warning" role="alert">
  <h4>Note</h4>
  Remove the site name from the end of the connection information, otherwise you will get an error and the command will fail. The final command will look like:</div>

```bash
git remote add pantheon ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git
```

9. Run git add and commit to prepare the Pantheon core merge for pushing to the repository:
 ```
 git add -A
 ```
 ```
 git commit -m "Adding Pantheon core files"
 ```
10. Now pull from your Pantheon repository master branch: `git pull pantheon master`. Handle any conflicts as needed.  
11. Git push back to your Pantheon site repository: `git push pantheon master`  
12. Go to the Code tab of your Dev environment. You will see your site's pre-existing code commit history and the most recent commits adding Pantheon's core files.

![Pantheon Dashboard with Commit Messages](/source/docs/assets/images/pantheon-dashboard-git-commit-messages.png)

## Files

**Files** - anything in `sites/default/files` for Drupal or `wp-content/uploads` for WordPress. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc. For information on highly populated directories, see [Known Limitations](/docs/articles/sites/known-limitations/#highly-populated-directories).

Files are stored separately from the site's code. Larger file structures can fail in the Dashboard import due to sheer volume. For these, it's best to use a utility such as an SFTP client or rsync. The biggest issue with these is having the transfer stopped due to connectivity issues. To handle that scenario, try this handy bash script:  

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
sshpass -p "$PASSWORD" rsync --partial -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/* ./files/
if [ "$?" = "0" ] ; then
echo "rsync completed normally"
exit
else
echo "Rsync failure. Backing off and retrying..."
sleep 180
fi
done
```
This connects to your Pantheon site's Dev environment and starts uploading your files. If an error occurs during transfer, rather than stopping completely, it waits for 180 seconds and picks up where it left off.  
If you are unfamiliar or uncomfortable with bash and rsync, an FTP client that supports SFTP, such as FileZilla, is a good option. To do this, [switch your site to SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode#enabling-sftp-mode) and then using your site's SFTP connection information, connect to your site with your SFTP client. Navigate to `/code/sites/default/files/`. You can now start your file upload.  

## Database  

**Database** - a single .sql dump that contains the content and active state of the site's configurations.

You'll need a .sql file containing the data from the site you want to import. If you haven't done so already, make sure you remove any data from the cache tables. That will make your .sql file much smaller and your import that much quicker.

### Connect via Drush
1. Set up the aliases by running the three commands shown below:

 ```
 terminus auth login
 terminus sites aliases
 drush cc drush
 ```
2. Use Drush sql-connect to generate the MySQL command line options.

 ```
 export SITENAME='your-site'
 export ENV="dev"
 $(drush @pantheon.$SITENAME.$ENV sql-connect) < your-local-site-db-dump.sql
 ```

### Connect via wp-cli

### Import with Drush `sql-connect`
Use [Terminus](https://github.com/pantheon-systems/cli) to update your local aliases file:
```
$ terminus auth login
$ terminus sites aliases
```
Replace `database.sql` with the path to your local `.sql` archive and run:
```
export SITENAME='your-site'
export ENV="dev"
$(drush @pantheon.$SITENAME.$ENV sql-connect) < database.sql
```

### Import with MySQL CLI

1. From the Dev environment on the site Dashboard, click **Connection Info** and copy the connection string. It will look similar to this:

 ```
 mysql -u pantheon -p{massive-random-pw} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon
 ```
2. From terminal, `cd` into the directory containing your `.sql` archive. Paste the connection string and ammend it with:
`< database.sql`
Your command will now look like:

 ```
 mysql -u pantheon -p{massive-random-pw} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon < database.sql
 ```
3. After you run the command, the .sql file is imported into your Pantheon Dev database.  

You should now have all three of the major components of your site imported into Pantheon. Clear your caches via the Pantheon Dashboard, and you are good to go.
