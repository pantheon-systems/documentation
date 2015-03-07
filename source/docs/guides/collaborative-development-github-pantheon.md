While Pantheon provides git repositories for all sites on the platform some teams might need to make a different repo the canonical repo. If your workflow leverages GitHub’s team management, issue queue, pull requests, wiki, or any other GitHub features, then you will want to synchronize your official github-hosted repository with the Pantheon site repository.

## Git Repositories on Pantheon

The codebase for your site is stored in a git repository that contains all of the code your site needs to run. This includes Drupal or WordPress core, all of the custom and contributed modules, plugins, and themes that work together to make your site go. It doesn’t include the `/sites/default/files/` or `/wp-content/uploads/` directories, or your database.

This repository will be a clone of one of the upstreams running on the platform, usually https://github.com/pantheon-systems/drops-7 or https://github.com/pantheon-systems/WordPress,
or one of the many forks that our users create as custom upstreams. Your site’s repository on our platform will track one of these upstream repositories as a git remote. To see which repo your site is tracking, go to your site dashboard’s settings>about site menu.

These repositories control the common codebase for several sites. For individual sites, using github to collaborate on custom code is often a requirement for teams. In order to do so, you’ll need a quick and efficient way to keep your Pantheon repo in sync with github.

Whether your site:

*is only on Pantheon and you’re moving development to Github,
*exists on Github and you want to deploy to Pantheon,
*isn’t using Git,
*doesn’t yet exist,

this guide will show you the basics for collaborating with others.

## Synchronizing Existing Pantheon Sites to Github
At your site dashboard’s development environment, copy the git SSH clone URL and clone it to your local machine. Your local copy will now track the Pantheon repository as origin.

```
$ git clone <ssh://codeserver.dev.UUID@codeserver.dev.UUID.drush.in:2222/~/repository.git d7-ci>
$ git clone ssh://codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88@codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88.drush.in:2222/~/repository.git d7-ci
Cloning into 'd7-ci'...
The authenticity of host '[codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88.drush.in]:2222 ([2001:4801:7821:77:c5ce:526c:ff10:ebdd]:2222)' can't be established.
RSA key fingerprint is b5:ea:23:eb:7b:7b:0d:17:c7:13:47:92:ea:70:c1:b5.
Are you sure you want to continue connecting (yes/no)? **yes**
Warning: Permanently added '[codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88.drush.in]:2222' (RSA) to the list of known hosts.
remote: Counting objects: 298630, done.
remote: Compressing objects: 100% (59210/59210), done.
remote: Total 298630 (delta 208616), reused 298143 (delta 208186)
Receiving objects: 100% (298630/298630), 67.23 MiB | 479.00 KiB/s, done.
Resolving deltas: 100% (208616/208616), done.
Checking connectivity... done.
```

Change directory into the site repository and verify your connection to the Pantheon server.

```
$ cd d7-ci
$ git remote -v
origin	ssh://codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88@codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88.drush.in:2222/~/repository.git (fetch)
origin	ssh://codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88@codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88.drush.in:2222/~/repository.git (push)
```

Create a repository on Github

![Create a Repository on GitHub](/source/docs/assets/images/create-git-repo.png)

Add the github repository as a remote. As long as you keep “Initialize this repository with a README” unchecked, you will see options for adding code to your repo. You need to replace the word “origin” in this case, because your local clone is already tracking the Pantheon site repository as origin.

![Push an existing repo to GitHub](/source/docs/assets/images/push-existing-repo.png)

```
$ git remote add github git@github.com:pantheon-learning/d7-ci.git
$ git remote -v
github	git@github.com:pantheon-learning/d7-ci.git (fetch)
github	git@github.com:pantheon-learning/d7-ci.git (push)
origin	ssh://codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88@codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88.drush.in:2222/~/repository.git (fetch)
origin	ssh://codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88@codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88.drush.in:2222/~/repository.git (push)
$ git push -u github master
Writing objects: 100% (120046/120046), 31.88 MiB | 3.26 MiB/s, done.
Total 120046 (delta 89679), reused 120039 (delta 89679)
To git@github.com:pantheon-learning/d7-ci.git
 * [new branch]      master -> master
Branch master set up to track remote branch master from github.
```

The repository on Github now has all of the same code as my site.

![GitHub repo same as site](/source/docs/assets/images/github-repo-origin-sameas-remote.png)

## Synchronizing Existing Github Repos to Pantheon
This process will follow the same general procedures as moving your repo from Pantheon to Github, in reverse.
### Import the Code

As long as you've chosen the same codebase (Drupal 7, WordPress, Commerce Kickstart, etc.) as the starting point of your Pantheon site, you can use Git to import your existing code with your commit history intact.

1. Go to your code directory within your terminal.
2. Bring in the Pantheon core files. If your existing site code is not version controlled with Git, run 'git init' first.
3. From your site's Dashboard, go to the Dev environment.
4. Click **Settings**, then select **About Site**.
5. Place your mouse over the upstream value, left click and select **Copy link** to get the site's Pantheon upstream location.
 ![](/source/docs/assets/images/pantheon-dashboard-settings-about-site-upstream.png)
6. The following Git command will pull in the Pantheon Drupal 7 specific core. Replace the {paste-value-here} with the value from step 5:
  **Original:** `git pull --no-rebase -Xtheirs --squash {paste-value-here} master`
  **Updated:** `git pull --no-rebase -Xtheirs --squash http://github.com/pantheon-systems/drops-7 master`
  **Important:** Replace "http" with "git" and then add ".git" to the end of the URL you just pasted. The URL will go from this: `http://github.com/pantheon-systems/drops-7` to `git://github.com/pantheon-systems/drops-7.git`.
  **Final Command:** `git pull --no-rebase -Xtheirs --squash git://github.com/pantheon-systems/drops-7.git master`

Once executed, that command will pull in the Pantheon core files, but not commit them; you will be able to do a final review before doing so. You will see this message when it's done:

```
Squash commit -- not updating HEAD
Automatic merge went well; stopped before committing as requested
```

![Git Connection Info](/source/docs/assets/images/pantheon-dashboard-git-connection-info.png)

8. From your terminal within the site directory, use the Git remote add command with an alias to make sure you know when you are moving code to or from Pantheon. Replace the {pantheon-site-git-repo-information} with the Git information from the previous step.
  **From:** `git remote add pantheon {pantheon-site-git-repo-information}`
  **To:** `git remote add pantheon ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git pantheon-new-site-import`
  **Important: ** Remove the site name from the end of the connection information, otherwise you will get an error and the command will fail. The final command will look like:
  `git remote add pantheon ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git pantheon-new-site-import`

9. Run a Git add and commit to prepare the Pantheon core merge for pushing to the repository:
`git add -A`
`git commit -m "Adding Pantheon core files"`
10. Now pull from your Pantheon repository master branch: `git pull pantheon master`. Handle any conflicts as needed.
11. Git push back to your Pantheon site repository: `git push pantheon master`
12. Go to the Code tab of your Dev environment. You should now see your site's pre-existing code commit history, plus the most recent commits adding Pantheon's core files.

![Pantheon Dashboard with Commit Messages](/source/docs/assets/images/pantheon-dashboard-git-commit-messages.png)

1. Create Canonical Repository on Github
2. Create Pantheon Site
You can either create the site using your account dashboard interface or with terminus with the following commands.

```
$ terminus auth login
$ terminus sites create
```

3. Clone Github repo locally

```
$ git clone wp_panth
$ cd wp_panth
```

4. Add Pantheon site as remote and pull

```
$ git remote add pantheon [dashboard git ssh clone string]
$ git pull pantheon master
```

5. Push to Github

```
$ git push origin master
```

Now both repositories are in sync with one another and we’re ready to do some development.

## Commands for development

Work
For this example we’ll create the settings.php file

```
$ cd sites/default
$ touch settings.php
```

Add the file to version control and Push to origin feature-branch
Now that we have our changes in place, we’ll need to push this to the origin feature branch.

```
$ git status
On branch master
Your branch is up-to-date with 'github/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	settings.php

nothing added to commit but untracked files present (use "git add" to track)
$ git add .
$ git status
On branch master
Your branch is up-to-date with 'github/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   settings.php

$ git commit -m “Create settings.php”
master b802550] Create settings.php
 1 file changed, 577 insertions(+)
 create mode 100644 sites/default/settings.php
```

You’re ready to push the change to github and Pantheon.

```
 $ git push github master
Counting objects: 4, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 384 bytes | 0 bytes/s, done.
Total 4 (delta 2), reused 0 (delta 0)
To git@github.com:pantheon-learning/d7-ci.git
   fe267cb..b802550  master -> master

```

```
$ git push origin master
Counting objects: 4, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 384 bytes | 0 bytes/s, done.
Total 4 (delta 2), reused 0 (delta 0)
remote:
remote: PANTHEON NOTICE:
remote:
remote: Environment 'dev' (branch: master) is currently in SFTP mode.
remote: It cannot recieve git pushes until you disable this via the Pantheon dashboard.
remote: If you are trying to push changes to a different branch or environment, try:
remote:     git push origin [branch-name]
remote:
To ssh://codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88@codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88.drush.in:2222/~/repository.git
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'ssh://codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88@codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88.drush.in:2222/~/repository.git'
```

This push failed, because the development environment was in SFTP mode.

![Connection Mode set to SFTP](/source/docs/assets/images/connection-mode-sftp.png)

Switch the connection mode to Git by clicking on the toggle, or with

```
$ terminus site connection-mode --site=d7-ci --env=dev --set=git
```

![Connection Mode set to Git](/source/docs/assets/images/connection-mode-git.png)

Push to Pantheon

```
$ git push origin master
Counting objects: 4, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 384 bytes | 0 bytes/s, done.
Total 4 (delta 2), reused 0 (delta 0)
To ssh://codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88@codeserver.dev.59b2dd69-2305-4ca2-a745-4f00e4100c88.drush.in:2222/~/repository.git
   fe267cb..b802550  master -> master
```

![Commit deployed to Pantheon Dashboard](/source/docs/assets/images/commit-deployed-pantheon-dashboard.png)

The github repo and Pantheon site both now have a settings.php file. This will allow for environment-specific configuration, for enabling modules via remote Drush calls, and other essential functionality.

## Feature Branching

Working with teams on Github requires a branching strategy. We are fans of github flow and continuous integration here at Pantheon. In order to collaborate, I need to add my colleagues to the site we’re developing, both [on Github](https://help.github.com/enterprise/2.0/admin/guides/user-management/organizations-and-teams/) and on Pantheon.
Locally, our codebase is in sync with both repositories. In order to start working on a new feature, we’ll checkout a branch.

```
$ git checkout -b configuration-management
Switched to a new branch 'configuration-management'
```
I’m responsible for adding the configuration management module as a feature of this site, and tracking initial configurations with it.

Create pull request for master and discuss on github. Look good? Merge.

We’re now ready to create a pull request on GitHub. Once the rest of the team is on board, a team member will merge the pull request.

Locally checkout master and pull origin master, then push pantheon master (Dev)

## How to check that it worked

Github Pull Request (PR) merge commits will be reflected in the dashboard and on the development environment under deployments.

## Known Limitations

On Pantheon, there is currently an 11-character limit for naming multidev environments.

## Optional Tools to optimize workflows:

Once we have the basic setup there are more options to further optimize workflows.

*A Continuous Integration Server like Jenkins, TravisCI, Bamboo, or CircleCI
*A suite of automated acceptance tests using Behat or PHPUnit

These tools will allow your team to fully implement continuous development with testing and  integration.


## Additional reading and resources:

(Starting with Git)[https://pantheon.io/docs/articles/local/starting-with-git/]

(Git FAQs)[https://pantheon.io/docs/articles/local/git-faq/]
