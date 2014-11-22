---
title: Importing a large site
filename: source/_common-tasks/importing-a-large-site.md
tools:
  -
---

While the Pantheon Dashboard works exceptionally well for small to mid sized sites, there are some instances where a more manual approach is needed. This article will cover the techniques required to import a large site into Pantheon outside of the Dashboard interface. You will need to follow this procedure if:

1. Your site’s Code, Files or SQL archive is greater than 100MB (This is the direct file upload import size limit)
2. Your site’s Code, Files or SQL archive is greater than 500MB (This is the URL upload import file limit)
**Technical Requirements & Tools:**
1. Mid level to advanced [Git](http://git-scm.com/) command line interface (CLI) knowledge.
2. Familiarity with using [bash](http://www.gnu.org/software/bash/) and [rsync](http://rsync.samba.org/) or an FTP program that supports [SFTP](http://en.wikipedia.org/wiki/SFTP).
3. Mid level to advanced [MySQL CLI knowledge.](https://mariadb.com/kb/en/mariadb/documentation/clients-and-utilities/mysql-client/mysql-command-line-client/)
4. Access to the code, database and files of the site being imported.
**Create A New Pantheon Site:**  
Go to your pantheon Dashboard, sign in, and choose the "Create a new site" option. Name your site, then on the next page keep the "Start from scratch" and choose your starting codebase. This will probably be WordPress, Drupal 6.x, or Drupal 7.x. Once the site is created, switch the site's connection mode from SFTP to Git.  


**Importing Code:**  
As long as you've chosen the same codebase (Drupal 7, Commerce Kickstarter, etc...) as the starting point of your Pantheon site, you can use Git to import your existing code with commit history intact. If you don’t have a version controlled codebase, the following will still work perfectly, there just won’t be a commit history for Pantheon’s Git repository to reference.

As long as you've chosen the same codebase (Drupal 7, Commerce Kickstarter, etc...) as the starting point of your Pantheon site, using Git to import your existing code is fairly straightforward. 

1. Navigate into your code directory within your terminal.
2. Let's bring in the Pantheon core files. If your existing site code is not version controlled with Git, run "git init" first. 
3. Go to your site's Dashboard, the Dev environment, click on Settings, then click on About Site. Place your mouse over the Upstream value, left click and select "Copy link." That will get the site's Pantheon upstream location.   
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/343668)
4. The following Git command will pull in purely the Pantheon Drupal 7 specific core. Replace the {paste-value-here} with the value from step 3:
5.
**Original:**  git pull --no-rebase -Xtheirs --squash {paste-value-here} master  
**Updated: ** git pull --no-rebase -Xtheirs --squash http://github.com/pantheon-systems/drops-7 master  
**Important:**  Replace "http" with "git" and then append ".git" to the end of the URL you just pasted. The URL will go from this: http://github.com/pantheon-systems/drops-7 to git://github.com/pantheon-systems/drops-7.git, for example.  


**Final Command: ** git pull --no-rebase -Xtheirs --squash git://github.com/pantheon-systems/drops-7.git master  


Once executed, that command will pull in the Pantheon core files but not commit them so you will be able to do a final review yourself before doing so. The following message will show when it's done:

Squash commit -- not updating HEAD  
Automatic merge went well; stopped before committing as requested

6. Now that your site has the Pantheon core merged in, the final step is putting it onto your Pantheon environment. On your Pantheon Dashboard, go to the Dev tab and select Code. Make sure your site is on Git mode, and copy the Git connection information found to the right of the Git tab.  


 ![](https://pantheon-systems.desk.com/customer/portal/attachments/335378)  
 
7. In your terminal, within the site directory, use the git remote add command with an alias to make sure you know when you are moving code to or from Pantheon. Replace the {pantheon-site-git-repo-information} with the Git information from the previous step  


**From:** git remote add pantheon {pantheon-site-git-repo-information}  
**To:** git remote add pantheon ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git pantheon-new-site-import  
**Important: ** Remove the site name from the end of the connection information, otherwise you will get an error and the command will fail! The final command will look like:  


git remote add pantheon ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git pantheon-new-site-import
8. Run a Git add and commit to prepare the Pantheon core merge for pushing to the repository:   


git add -A  
git commit -m "Adding Pantheon core files."  
 
9. Now git pull from your Pantheon repository master branch: git pull pantheon master. Handle any conflicts as needed. 
10. Git push back to your Pantheon site repository: git push pantheon master.
11. Look in your Dev environment Code tab. You should now see your site's pre-existing code commit history, plus the most recent commits adding Pantheon's core files.  
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/343667)


**Files:**  
The next step are the files, which are stored separately from the site's code. Larger file structures can fail in the Dashboard import due to sheer volume. For these, it's best to use a utility such as an SFTP client or rsync. The biggest issue with these is having the transfer stopped due to connectivity issues. [To handle that scenario, try this handy bash script](https://www.evernote.com/shard/s404/sh/5bcfedb7-cda1-4647-9390-0112c2f9e703/f8defb098e992e2acd57280c4dcddb63):  


---------------------------  
`#!/bin/bash
ENV='dev'
SITE='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'


while [1]
do
rsync --partial -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' ./files/* $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/
if ["$?" = "0"] ; then
echo "rsync completed normally"
exit
else
echo "Rsync failure. Backing off and retrying..."
sleep 180
fi
done`  


---------------------------  


This will connect to your Pantheon site's Dev environment, and then start uploading your files. If an error comes in mid transfer, rather than stopping completely, it simply waits for 180 seconds and picks back up where it left off.  


If you are unfamiliar or uncomfortable with bash and rsync, an FTP client that supports SFTP, such as Filezilla, is a viable option. To do this, first you need to [switch your site to SFTP](/documentation/getting-started/developing-on-pantheon-directly-with-sftp-mode/-enabling-sftp-mode) and then using your site's SFTP connection information, connect to your site with your S/FTP client. Then navigate to /code/sites/default/files/. You can now start your file upload.  


**Database:**  
You'll need a .sql file containing the data from the site you wish to import. If you haven't done so already, make sure you remove any data from the cache tables! That will make your sql file a great deal smaller and your import that much quicker.  


Go to your site's Dev environment in your Pantheon Dashboard. Get the MySQL CLI connection by clicking on the "Connection info" tab. The connection string will look something like this:  


mysql -u pantheon -p{massive-random-pw} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon  


Then, in your command shell, navigate to the directory containing your SQL export. Place the MySQL connection information there, but add the following to the end:  


< {database\_dump\_file.sql}  


Your command will now look like:  


mysql -u pantheon -p{massive-random-pw} -h dbserver.dev.{site-id}.drush.in -P {site-port} pantheon < database\_dump.sql  


Run the command by hitting return and the sql file will be imported into your Pantheon Dev database.  


You should now have all three of the major components of your site imported into Pantheon. Clear your caches via the Pantheon Dashboard and you are good to go!  
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/343671)  


 
