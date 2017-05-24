---
title: Continuous Integration with Jenkins
description: How to create and configure a Pingdom Uptime check on a Pantheon site.
tags: [siteintegrations]
type: guide
permalink: docs/:basename/
draft: true
date: 5/14/2017

---

## Continuous Integration with Jenkins

Jenkins is an open source Continuous Integration server which can be used to build, test, and deploy application changes for Drupal and WordPress websites on Pantheon. Jenkins is to execute a predefined list of steps. The trigger for this execution can be time or event based. For example, every 20 minutes or after a new commit in a Git repository.

## What you will build

This guide will cover how to configure an externally hosted Jenkins server to work with sites on the Pantheon platform. We will configure Jenkins to test our code changes and let us know if changes have passed and are ready to deploy.

## What you’ll need

- Root access to a server with Jenkins. This server in this guide is running Ubuntu 16 x64.
- An externally hosted server with:
    - Drush (for this guide)
    - Terminus
    - Jenkins
- A Drupal or Wordpress website on Pantheon.

## Step 1: Local Project instantiation

1. From your terminal, use composer to make a new local project, called "circle," based on our example repo:

```nohighlight
composer create-project pantheon-systems/example-drops-8-composer circle
```

2. Initialize a local Git repository for your project. 

```nohighlight
cd circle
git init
git add --force -A .
git commit -m "Initial commit."

```
    
## Step 2: Create an Origin GitHub Repository

1. Create a new GitHub repository.

![Github Dashboard](/source/docs/assets/images/integrations/github_repos.png)

We already created a README, etc. in the previous steps so don't check the box to create a new one. Privacy options are up to you.

![New empty repository](/source/docs/assets/images/integrations/new_repo.png)


2. Next, follow the instructions GitHub presents to push the code to the new remote repository:

```nohighlight
git remote add origin git@github.com:YOUR-ORG/YOUR-PROJECT
git push -u origin master
```

At this point you can add a branch and push and open a pull request successfully.

## Step 3 Setup a Pantheon Site




4. You can select the "Install standard plugins" option to complete the install. Create an administrative user. 	

Server must have 
PATH: $PATH:~/.composer/vendor/bin:~/.config/composer/vendor/bin:tests/scripts
composer global require -n "hirak/prestissimo:^0.3"
    - composer global require -n "consolidation/cgr"
    - cgr "pantheon-systems/terminus:^1"
    - terminus --version
    - cgr "drush/drush:~8"
    - mkdir -p ~/.terminus/plugins
    - composer create-project -n -d ~/.terminus/plugins pantheon-systems/terminus-build-tools-plugin:^1
    - composer create-project -n -d ~/.terminus/plugins pantheon-systems/terminus-secrets-plugin:^1
    
    get machine token:

terminus auth:login --machine-token=bwqJiSKLZ-uvAH2fqcCYbg3cQ5JfscwZBAaHZO5LsAOOw

ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDgE2SK6f28WGL3wpxWve2LE98U393bBp86oIks/aDNuM607WiBRevdpBL/3iCM0zo+7qyD4gD7pLkqnguWBHbtNGlC/yqQqnPhNsFa+IwkITtZzJG+Y//nEpsFamcFfQQIBFMakrfAZOTJ/F+qwKuqYjs4yQCngBTFKdyhyATM/US5r45k6SNzSZkjzi692n627sd4kr8GSWaGvRweMQLiUPcUonCFcQ8Llu/mJd2vpKaecPBYopG/55j4BSHNBEnDvl8jqTZdMHt/20khE9lBUwnBsdcOWMTZbUok+LsPGDAS6COb5ZFB0nbM7JPoIj8evfokZgroK9kj8WpC4kex jenkins@CI

# terminus auth:login --machine-token=aWGN_CMQtd1JP4BMBcaI2UpIO5SnWBttZc0t6G39UGlgi

5. Enable security by navigating to Manage Jenkins (a), then Security (b).

6. Authorization make sure Anonymous can View on the Read column.

7. Add a service permission that can do everything
 
8. then create a user who has that permission

9. Install git plugin?
https://wiki.jenkins-ci.org/display/JENKINS/Git+Plugin
https://wiki.jenkins-ci.org/display/JENKINS/Github+Plugin
Jenkins supports the Git version control system via a plugin. Select the Manage Jenkins ▸ Manager Plugins link. Here you have to install the Git Plugin. It may be installed already.

To clone a Git repostory via Jenkins you need to enter the email and user name for your Jenkins system. For this switch into your job directory and run the git config command.

# Need to configure the Git email and user for the Jenkins job
github token 083d1fdf65b92050c6c53760a6fba624e9ac75e3

# switch to the job directory
cd /var/lib/jenkins/jobs/Android/workspace

# setup name and email
sudo git config user.name "jenkins"
sudo git config user.email "test@gmail.com"

Then check "enable security"
Set Jenkins's to use user database and enable sign ups.

Create a new user
Next, go back to admin, check Matrix-based security, disable signups;
Make sure Anonymous only has the Read right under the View group (Jenkins crashes when it doesn't have that set) and add your user with admin rights. Save and log in as that user.
https://gist.github.com/gmhawash/4043232

Click save at the bottom of the page. After the page load, you'll see a login form, ignore that, go to ci.company.net:8080 again instead. You'll see this sign up form:


$ SITE="my-site"
$ terminus site:create $SITE "My Site" "Drupal 8" --org="My Team"
$ composer create-project pantheon-systems/example-drops-8-composer $SITE
$ cd $SITE
$ composer prepare-for-pantheon
$ git init
$ git add -A .
$ git commit -m "Initial commit"
$ terminus  connection:set $SITE.dev git
$ PANTHEON_REPO=$(terminus connection:info $SITE.dev --field=git_url)
$ git remote add origin $PANTHEON_REPO
$ git push --force origin master
$ terminus drush $SITE.dev -- site-install --site-name="My Drupal Site"
$ terminus dashboard:view $SITE

## Configure Quicksilver Integration
 
1. Clone Pantheon's [Quicksilver Example Repo](https://github.com/pantheon-systems/quicksilver-examples)to your local computer.

```
git clone https://github.com/pantheon-systems/quicksilver-examples.git quicksilver-examples

```

2. Locate your local copy of your Pantheon site's repository, or clone it if you haven't already.

```
git clone ssh://codeserver.dev.000000-0000-0000-0000-000000000@codeserver.dev.000000-0000-0000-0000-000000000.drush.in:2222/~/repository.git astro-mktg
```

3. From the root directory of your local copy (at the same level as index.php), create a directory named "private" and copy jira_integration.php script to it.

```
$ mkdir private
$ cd private
$ cp /path/to/your/quicksilver-examples/jira_integration/jira_integration.php .
$ ls
jira_integration.php
```

4. Add the example jira_integration.php script to the private directory of your code repository.

5. Create a pantheon.yml file if one doesn't already exist in your root directory.

6. Add a Quicksilver operation to the pantheon.yml to fire the script after a code push.
   
```
#always include the api version
api_version: 1

workflows:
  deploy:
    after:
        - type: webphp
          description: Integrate With Jenkins
          script: private/scripts/jenkins_integration.php
```

7. Push this YAML file to all environments.

8. Test a code change. This should kick off a build. Currently the build isn't doing anything, so let's add some tasks to the build.

http://jenkins-le-guide-complet.github.io/html/sect-first-steps-first-job.html

https://github.com/pantheon-systems/quicksilver-examples/tree/master/jenkins

http://www.vogella.com/tutorials/Jenkins/article.html

https://www.slideshare.net/philipnorton42/getting-started-with-jenkins-and-drupal

calendar.google.com/calendar/b/2/render#main_7

## Conclusion
solutions. It's a good practice to use services like Pingdom on all high-value sites.