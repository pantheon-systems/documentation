---
title: Jenkins
description: How to configure continuous integration for a Drupal site on Pantheon with Jenkins.
tags: [siteintegrations]
type: guide
permalink: docs/:basename/
draft: true
date: 5/30/2017

---

## Continuous Integration with Jenkins

[Jenkins](https://jenkins.io) is an open source Continuous Integration server which can be used to build, test, and deploy code on any Drupal and WordPress website on Pantheon. Unlike services such as [CircleCI](https://circleci.com/), it is a Java application installed and run on a server, and requires regular upkeep and maintenance. However, it is very customizable and can even run non-CI related tasks, such as calling periodic cron jobs.

## What you will build

This guide will cover how to configure an existing Jenkins server to work with sites on the Pantheon platform. Because we want to submit pull requests and take advantage of existing GitHub and Jenkins integration, we will configure GitHub as the main code repository. When we push code to the GitHub repo, it will trigger Jenkins to test our code changes on a multidev environment. Jenkins will run tests against both the pull request and Pantheon's master branch and display the results.

## What you’ll need

- Root access to a server running Jenkins.
- Install the following applications, both locally and on the Jenkins server. Verify the default Jenkins user has the ability to run them on the Jenkins server from the command line. 
    - [Composer](https://getcomposer.org/) 
    - [Drush](http://docs.drush.org/en/8.x/install-alternative)
    - [Terminus](https://github.com/pantheon-systems/terminus#installing-with-composer)
    - [Terminus Build Tools plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin)
    
    Verify you can run Terminus, Drush and Composer commands to test.
- Be sure the default Jenkins user has a private key in its $HOME/.ssh directory that has a matching user on with a public key installed on Pantheon. Clone a Pantheon site to the Jenkins user's home directory to test.
- In the Jenkins user's $HOME/.ssh/config (if this file doesn't exist, create it), add these two lines:
``` 
 Host *
     StrictHostKeyChecking no
```
- The following Jenkins plugins should be enabled: [Git](https://wiki.jenkins-ci.org/display/JENKINS/Github+Plugin) , [Github](https://wiki.jenkins-ci.org/display/JENKINS/GitHub+Plugin), [Github Pull Request Builder](https://wiki.jenkins-ci.org/display/JENKINS/GitHub+pull+request+builder+plugin), [Environment Injector](https://wiki.jenkins-ci.org/display/JENKINS/EnvInject+Plugin), [Conditional Build Step](https://wiki.jenkins-ci.org/display/JENKINS/Conditional+BuildStep+Plugin), and [Run Condition](https://wiki.jenkins-ci.org/display/JENKINS/Run+Condition+Plugin) and [Rebuild](https://wiki.jenkins.io/display/JENKINS/Rebuild+Plugin).
- It is recommended to use matrix-based security when using Jenkins. Anonymous users should have read access to Jenkins projects.
- Ability to create a Drupal site on Pantheon, with [multidev](https://pantheon.io/features/multidev-cloud-environments) enabled.
- A [GitHub](https://github.com) account.

## Step 1: Local Project instantiation

1. From your local terminal, use Composer to make a new local project based on our example, which contains Drupal 8, behat, and other configuration settings. In this example our project is call called "my-site":

```nohighlight
SITE="my-site"
composer create-project pantheon-systems/example-drops-8-composer $SITE
cd $SITE
composer prepare-for-pantheon
```

2. Initialize a local Git repository within your project. 

```nohighlight
git init
git add -A .
git commit -m "Initial commit."
git config --global user.email "Your Email"
git config --global user.name "Your Name"
```
   
## Step 2: Create and configure a GitHub Repository

1. Create a new GitHub repository, without creating a readme or .gitignore file.

![New empty repository](/source/docs/assets/images/integrations/jenkins/new_repo.png)


2. Next, connect your local project to this repo as "origin," and push the code to the master branch:

```nohighlight
git remote add origin git@github.com:YOUR-ORG/YOUR-PROJECT.git
git push -u origin master
```

At this point, you should be able to create a local branch, commit a change, and push to GitHub. On GitHub, you should then be able to open a pull request successfully.

## Step 3: Create a Pantheon Site

Now we will spin up a Drupal 8 site on Pantheon with Terminus, then overwrite the default install with the code from our GitHub repo.

1. From your local terminus, use terminus to create a site on Pantheon:
```nohighlight
terminus site:create $SITE "My Site" "Drupal 8" --org "My Team"
terminus connection:set $SITE.dev git
```

2. Add the Pantheon remote repository address and push the code to it.
```nohighlight
PANTHEON_REPO=$(terminus connection:info $SITE.dev --field=git_url)
git remote add pantheon $PANTHEON_REPO
git push --force pantheon master

```

3. Then complete the installation on Pantheon.

```nohighlight
terminus build:env:install --site-mail="your email" --site-name="My Drupal Site" --account-mail="<your email>" --account-name="admin" $SITE.dev
```

5. Verify the site is installed and working.
```nohighlight
terminus env:view $SITE.dev
```

Now the master branch of GitHub, your local, and Pantheon are in sync.

### Step 4: Authentication

1. From the main Jenkins menu on the left side, select ```Credentials```. Then select the ```System``` submenu item that appears below. Select the Global Domain option, then ```Add Credentials```. Here we will add two, our GitHub token and our Terminus token.

![Credentials Page](/source/docs/assets/images/integrations/jenkins/credentials.png)

2. From your GitHub account, go to "Settings" and create a personal access token. This should have repo (all) and admin:repo-hook scope. Copy the generated token

- Kind: Secret Text
- Scope: Global
- Secret: Paste the GitHub token you created.
- ID: blank
- Description: GitHub

Create another for a Terminus Token, which can either be an existing token or [create a new token](https://pantheon.io/docs/machine-tokens) from your user dashboard for Jenkins.

- Kind: Secret Text
- Scope: Global
- Secret: Paste the Terminus token you created.
- ID: blank
- Description: Terminus

After saving both, your credentials will be accessible for secure use.

![Credentials Page](/source/docs/assets/images/integrations/jenkins/2_credentials.png)

## Step 5: GitHub/Jenkins Integration

1. Return to the main Jenkins dashboard, select "Manage Jenkins," then "Configure System."

2. Scroll to "GitHub Servers" and select "Add GitHub Server."

3. Leave the API URL as "https://api.github.com." For credentials, select "Add," And from the dropdown menu select the GitHub Token you created.

4. Click ```Test Connection``` and you should see the GitHub username which created the token.

## Step 5: Create Jenkins Project

1. Log into the Jenkins dashboard as an admin user. Click "New Item."

![Jenkins dashboard](/source/docs/assets/images/integrations/jenkins/jenkins_dash.png)

2. Give the project a name. Do not use spaces. Select "Freestyle Project" and "OK" to save.

![New Jenkins project](/source/docs/assets/images/integrations/jenkins/new_job.png)

3. In the General section, check the box to select "GitHub project" and enter the repo url (e.g. https://github.com/YOUR-ORG/YOUR-PROJECT).

4. In the Source Code Management section, select "Git" and add:
- Repository URL: The path to the .git file of your repository, e.g. https://github.com/YOUR-ORG/YOUR-PROJECT.git 
Click ```Advanced```, and add:
- Name: origin
- Refspec: leave blank
- Branches specifier: origin/*
- Additional Behaviours: Prune stale remote-tracking branches

![SCM view](/source/docs/assets/images/integrations/jenkins/scm_settings.png)

5. We want code changes to trigger our build, as opposed to setting up a periodic build, for example. Check the box labelled, "GitHub hook trigger for GITScm polling."

6. For "Build Environment," check the box labelled, "Inject environment variables to the build process." Add the SITE_ID variables to the "Properties Content" field, one per line, with no quotations marks. This will be set as the $SITE_ID environmental variable.

- SITE_ID=your-site-name

![Env vars view](/source/docs/assets/images/integrations/jenkins/env_vars.png)

7. Check "Use secret text(s) or file(s)" option, and add a secret text binding. Name it ```TERMINUS_TOKEN``` and select the Terminus secret text credential from the dropdown.
  
## Step 6: Add Build Steps

Under the Build section, find the ```Add Build Step``` dropdown. Start by selecting, "Set  build status to "Pending" on GitHub commit. Keep the default values.

For the next several tasks, select "Execute shell." They will execute in sequence, and the job will quit if any fail. Add these in separate build steps:

Jenkins logs into Pantheon:
```nohighlight
#!/bin/bash
echo "Logging into Terminus"
terminus auth:login --machine-token=${TERMINUS_TOKEN}
```
Verifies the dev site is awake and in git mode.
```nohighlight
echo "Waking Dev environment."
terminus env:wake -n ${SITE_ID}.dev
```

```nohighlight
echo "Setting site to git mode."
terminus connection:set ${SITE_ID}.dev git
```
Jenkins creates a multidev and pushes the new code to this environment
```nohighlight
echo "Creating multidev"
cd ${WORKSPACE}
terminus build:env:create ${SITE_ID}.dev ci-${BUILD_ID} --yes
```

```nohighlight
echo "Run database updates and clear cache"
terminus drush -n ${SITE_ID}.ci-${BUILD_ID} -- updatedb -y
terminus drush ${SITE_ID}.ci-${BUILD_ID} cr
```
Then the test suite we include with the example is run.
```nohighlight
echo "Running behat"
TERMINUS_ENV=ci-$BUILD_ID TERMINUS_SITE=$SITE_ID $WORKSPACE/tests/scripts/run-behat
```

Add one *Conditional (single step)* build task, to merge the code from the Pantheon multidev to the pantheon/master, i.e. your dev site on Pantheon. This will only happen when changing the master branch.

Conditions:
```nohighlight
Run: Regular Expression Match
Expression: (?i).*origin/master.*
Label: ${ENV,var="GIT_BRANCH"}
```
Execute Shell Tasks:
```nohighlight
echo "Merging multi-dev changes to master"
terminus build:env:merge -n ${SITE_ID}.ci-${BUILD_ID} --yes
```
And a final *Execute shell* cleanup task:
```nohighlight
echo "Cleaning up multidev & branches"
git -C ${WORKSPACE} remote remove pantheon
git -C ${WORKSPACE} remote prune origin
terminus build:env:delete:ci ${SITE_ID} --keep=2 --delete-branch
```

## Step 7: Add Post-build Actions

1. Select the Drop-down option, "Set GitHub commit status (universal)"

2. Select "Latest Build Revision" and for Repositories, select "Any defined in job repository."

3. Set the GitHub Context to: "From GitHub property with fallback to job name" and Status Result to "One of default messages and statuses."

4. Save the Jenkins project.

5. Now create a branch and makes a change. When you commit and push to GitHub, a build should initiate. You should see the results of the test, which link to the Jenkins job. 

![Passing Github test](/source/docs/assets/images/integrations/jenkins/test_pass.png)

If a test fails, you can see the details by clicking the job, then "Console Output"

![Job Details](/source/docs/assets/images/integrations/jenkins/job_details.png)


## Conclusion
If you usually use only the Pantheon repository, be sure to now push to your new origin repo on GitHub. You can still add the Pantheon repo as a remote to take advantage of Multidev and work on your own environment. As you add new features, continue to add new tests.