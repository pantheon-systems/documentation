While Pantheon provides Git repositories for all sites on the platform, some teams might need to use an external repository hosted at a provider like Github or BitBucket as the canonical version of the site's codebase. This guide will show you how to get up and running using a Github account as the example. The steps should be similar for any provider. 

## Git Repositories on Pantheon

The codebase for your site is stored in a Git repository. This includes our versions Drupal or WordPress core, and all of the custom and contributed modules, plugins, and themes that work together to make your site go. It doesn’t include the `/sites/default/files/` or `/wp-content/uploads/` directories, or your database.

This repository will be a clone of one of the upstreams running on the platform, usually [Drupal 7](https://github.com/pantheon-systems/drops-7/ "Pantheon's Drupal 7 repository at Github") or [WordPress](https://github.com/pantheon-systems/WordPress/ "Pantheon's WordPress repository at Github"),
or one of their forks that our users manage as [custom upstreams](/docs/articles/organizations/running-a-custom-upstream/ "Documentation article about running custom upstreams on Pantheon"). Your site’s repository on our platform will track one of these upstream repositories as a Git remote. To see which repo your site is tracking, go to your site Dashboard, click **Settings** and then **About site**. The name of the upstream will be linked to the repository's hosted location. 

These repositories control the common codebase for several sites. The most common change to an upstream is in the event of a core version release. These changes to the upstream repository become available to the sites running them within a day. For individual sites, using Github to collaborate on custom code is often a requirement for teams. In order to do so, you’ll need a quick and efficient way to keep your Pantheon repo in sync with Github.

This guide will show you the basics for collaborating with others if your site:

* is only on Pantheon and you’re moving development to Github
* exists on Github and you want to deploy to Pantheon
* isn’t using Git
* doesn’t yet exist



## Synchronizing Existing Pantheon Sites to Github
From your Site Dashboard’s Development environment, copy the Git SSH clone URL and clone it to your local machine. Your local copy will now track the Pantheon repository as origin.

```
$ git clone <ssh://codeserver.dev.UUID@codeserver.dev.UUID.drush.in:2222/~/repository.git d7-ci>
Cloning into 'd7-ci'...
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
origin	ssh://codeserver.dev.UUID@codeserver.dev.UUID.drush.in:2222/~/repository.git (fetch)
origin	ssh://codeserver.dev.UUID@codeserver.dev.UUID.drush.in:2222/~/repository.git (push)
```
The output lists "origin" as the the remote with Pantheon ssh git clone connection information as its address.

### Create a repository on Github

![Create a Repository on GitHub](/source/docs/assets/images/create-git-repo.png)

### Add the github repository as a remote. 

As long as you keep “Initialize this repository with a README” unchecked, you will see options for adding code to your repo. You need to replace the word “origin” in this case, because your local clone is already tracking the Pantheon site repository as origin.

![Push an existing repo to GitHub](/source/docs/assets/images/push-existing-repo.png)

I chose to name this remote "github". 
```
$ git remote add github git@github.com:pantheon-learning/d7-ci.git
$ git remote -v
github	git@github.com:pantheon-learning/d7-ci.git (fetch)
github	git@github.com:pantheon-learning/d7-ci.git (push)
origin	ssh://codeserver.dev.UUID@codeserver.dev.UUID.drush.in:2222/~/repository.git (fetch)
origin	ssh://codeserver.dev.UUID@codeserver.dev.UUID.drush.in:2222/~/repository.git (push)
```
### Push the Pantheon site's codebase to Github

```
$ git push -u github master
Writing objects: 100% (120046/120046), 31.88 MiB | 3.26 MiB/s, done.
Total 120046 (delta 89679), reused 120039 (delta 89679)
To git@github.com:pantheon-learning/d7-ci.git
 * [new branch]      master -> master
Branch master set up to track remote branch master from github.
```

The repository on Github now has all of the same code as my site.

![GitHub repo same as site](/source/docs/assets/images/github-repo-origin-sameas-remote.png)

## Synchronizing Existing Site Repositories to Pantheon
This process will follow the same general procedures as moving your repo from Pantheon to Github, in reverse.

### Create the Site

At our [site creation page](https://dashboard.pantheon.io/sites/create/ "Pantheon's site creation page, used to select an upstream"), name your site. At the next screen, `/sites/UUID/configure` select the upstream your site will track. If you need a custom upstream, like one managed by your organization, or one of the public upstreams running on the platform, it is important that you create it as a new site based on that upstream. This will set the upstream for your site, which cannot be changed after the fact.  

### Pull in Pantheon's Upstream

As long as you've chosen the same codebase (Drupal 7, WordPress, Commerce Kickstart, etc.) as the starting point of your Pantheon site, you can use Git to import your existing code with your commit history intact, while also preserving Pantheon's [upstream update](/docs/articles/sites/code/applying-upstream-updates/) function.

From your site's Dashboard, go to the Dev environment. Click **Settings**, then select **About Site**. Copy the Upstream URL and modify it by replacing `https` with `git` and appending `.git master` to the end of the string. For example, A site running Drupal 7, `https://github.com/pantheon-systems/drops-7` will change to `git://github.com/pantheon-systems/drops-7.git master` in the git command used to pull in the upstream.  
 ![](/source/docs/assets/images/pantheon-dashboard-settings-about-site-upstream.png)
At the root of your local clone of the site repository, run 
`git pull --no-rebase -Xtheirs --squash git://github.com/pantheon-systems/drops-7.git master`, replacing the upstream URL with the one you copied from the site dashboard and modified, if you need something other than Drupal 7. 

Once executed, that command will pull in the Pantheon core files, but not commit them; you will be able to do a final review before doing so. You will see this message when it's done:

```
Squash commit -- not updating HEAD
Automatic merge went well; stopped before committing as requested
```

![Git Connection Info](/source/docs/assets/images/pantheon-dashboard-git-connection-info.png)

### Add the Pantheon Site as a Git Remote
8. From your terminal within the site directory, use the Git remote add command with an alias to make sure you know when you are moving code to or from Pantheon. 
  `git remote add pantheon ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git pantheon-new-site-import`

9. Run a Git add and commit to prepare the Pantheon core merge for pushing to the repository:
`git add -A`
`git commit -m "Adding Pantheon core files"`
10. Now pull from your Pantheon repository master branch: `git pull pantheon master`. Handle any conflicts as needed.
11. Git push back to your Pantheon site repository: `git push pantheon master`
12. Go to the Code tab of your Dev environment. You should now see your site's pre-existing code commit history, plus the most recent commits adding Pantheon's core files.
13. Push the repo with the newly updated core files to github
  `$ git push origin master`

![Pantheon Dashboard with Commit Messages](/source/docs/assets/images/pantheon-dashboard-git-commit-messages.png)

## Developing in Sync

For this example we’ll create the settings.php file

```
$ cd sites/default
$ touch settings.php
```

Add the file to version control and Push to both remotes

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

This push to Pantheon failed, because the development environment was in SFTP mode.

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

Working with teams on Github requires a branching strategy. We are fans of github flow and continuous integration here at Pantheon. In order to collaborate, I need to add my colleagues to the site we’re developing, both [on Github](https://help.github.com/enterprise/2.0/admin/guides/user-management/organizations-and-teams/) and [on Pantheon](/docs/articles/sites/team-management).
Locally, our codebase is in sync with both repositories. In order to start working on a new feature, we’ll checkout a branch. Since my site is associated with a supporting organization that has Multidev, I can test out any feature in a Cloud Development Environment. These environments have an 11-character limit for branch names, so I'm choosing to use short branch names for my feature branches.  

```
$ git checkout -b configs
Switched to a new branch 'configs'
```
I’m responsible for adding the configuration management module as a feature of this site, and tracking initial configurations with it.
In my local environment, I'm going to download the module and its dependencies
```$ drush dl configuration xautoload```
I enable the module, test and verify that the module is working, then push to Pantheon and Github.
```
$ git push pantheon configs
$ git push master configs
```
The module will now be available to activate and test on Pantheon, for my colleagues to experience. I'll add a link to the module's configuration page on my github pull request. 
@TODO ^^^
Create pull request for master and discuss on github. Look good? Merge.

We’re now ready to create a pull request on GitHub. Once the rest of the team is on board, a team member will merge the pull request.

Locally checkout master, pull origin master, then push pantheon master (Dev)

## How to check that it worked

Github Pull Request (PR) merge commits will be reflected in the dashboard and on the development environment under deployments.


## Optional Tools to optimize workflows:

Once we have the basic setup there are more options to further optimize workflows.

*A Continuous Integration Server like Jenkins, TravisCI, Bamboo, or CircleCI
*A suite of automated acceptance tests using Behat or PHPUnit

These tools will allow your team to fully implement continuous development with testing and  integration.


## Additional reading and resources:

(Starting with Git)[https://pantheon.io/docs/articles/local/starting-with-git/]

(Git FAQs)[https://pantheon.io/docs/articles/local/git-faq/]
