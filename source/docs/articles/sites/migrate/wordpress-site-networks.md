---
title: Migrate to Pantheon: WordPress Site Networks
description: Learn how to import a WordPress Site Network into Pantheon.
keywords: import, importing site, pantheon, new site, large site, distro, upstream, git history
---

## Requirements

* [Download](http://git-scm.com/downloads) and install [Git](/docs/articles/local/starting-with-git/)
* [Rsync or SFTP Client](https://pantheon.io/docs/articles/local/rsync-and-sftp/)
* [MySQL Client](https://pantheon.io/docs/articles/local/accessing-mysql-databases/)
* A Pantheon employee must create a [WordPress Site Network](/docs/articles/wordpress/site-networks/) for you.

## Import the Codebase

**Codebase** - all executable code, including core, custom and contrib modules or plugins, themes, and libraries.

You can use Git to import your existing code and commit history. If you don’t have a Git version controlled codebase, the following will still work.

1. Navigate to your existing site's code directory in a local terminal. If your existing code is not version controlled with Git, run:

 ```bash
 git init
 ```
2. From the Dev environment of the Site Dashboard, set the site's [connection mode](/docs/articles/getting-started/#interact-with-your-code) to Git.
3. Copy the SSH URL for the site repository, found in the [clone command](/docs/articles/local/starting-with-git/#step-2-copy-the-git-clone-command). **Do not copy `git clone` or the site name.** The URL should look similar to the following:

 ```bash
 ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git
 ```

4. Use Git to pull in the upstream's code (which may have Pantheon-specific optimizations) to your existing site's codebase, replacing `<ssh_url>` with the SSH URL copied in step 3:

 ```bash
 git pull --no-rebase --squash -Xtheirs <ssh_url> master
 ```  

 Will yield:  
 ```bash
 Squash commit -- not updating HEAD  
 Automatic merge went well; stopped before committing as requested
 ```
5. Add Pantheon as a remote destination, replacing `<ssh_url>` with the SSH URL copied in Step 3:

 ```bash
 git remote add pantheon <ssh_url>
 ```

6. Run `git add` and `commit` to prepare the Pantheon core merge for pushing to the repository:
 ```bash
 git add -A
 git commit -m "Adding Pantheon core files"
 ```
7. Push your newly merged codebase up to your Pantheon site repository:

 ```bash
 git push pantheon master
 ```

8. Go to the Code tab of your Dev environment on the Site Dashboard. You will see your site's pre-existing code commit history and the most recent commit adding Pantheon's core files.

## Files

**Files** - `wp-content/uploads` for WordPress. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc. For information on highly populated directories, see [Platform Considerations](/docs/articles/sites/platform-considerations/#highly-populated-directories).

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

If you are unfamiliar or uncomfortable with bash and rsync, an FTP client that supports SFTP, such as FileZilla, is a good option. Find your Dev environment's SFTP connection info and connect with your SFTP client. Navigate to `~/code/sites/default/files/`. You can now start your file upload.  

## Database  

**Database** - a single `.sql` dump that contains the content and active state of the site's configurations.

You'll need a .sql file containing the data from the site you want to import. If you haven't done so already, make sure you remove any data from the cache tables. That will make your .sql file much smaller and your import that much quicker.

If your `.sql` file is less than 500MB, you can use the Import tool on the Workflow tab to import the database from a URL. If it is less than 100MB, you can upload the file directly. Larger files require the use of the command line to import the data.

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

You should now have all three of the major components of your site imported into Pantheon.

## Search and Replace

When you imported your database, all of the URLs remained. 
