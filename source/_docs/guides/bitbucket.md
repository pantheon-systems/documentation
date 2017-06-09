---
title: Continuous Integration with CircleCI
description: How to integrate Pantheon with CircleCI and Bitbucket.
tags: [siteintegrations]
type: guide
permalink: docs/:basename/
draft: true
date: 4/25/2017
h
---

## CircleCI

Continuous Integration services such as [CircleCI](https://circleci.com) allow developers to automate the process of testing code. This insures that, if a thorough testing suite is defined, errors are caught before the code is deployed.

## What you will build

In this guide, we will use [Composer](https://getcomposer.org) to build a project containing the configuration for Drupal 8, [Drush](http://docs.drush.org/en/master), a simple example of a Behat [test suite](https://github.com/pantheon-systems/example-drops-8-composer/tree/master/tests) and other required configuration files. We will move this to a Bitbucket repository and configure CircleCI.

When code is submitted for deployment, CircleCI will create a testing environment and run a suite of tests. If tests pass, the code can be merged into the master branch of the codebase. Before this merge happens, CircleCI will repeat the testing process against the production branch.
 

## What you’ll need

- Composer, git and [Terminus](https://pantheon.io/docs/terminus) running on your local computer.
- A Bitbucket account
- A [Multidev](https://pantheon.io/docs/multidev/) enabled site on Pantheon. [Pantheon for Agency](https://pantheon.io/agencies/pantheon-for-agencies) signup (free) will enable Multidev.
- A free [CircleCI](https://circleci.com) account


## Step 1: Create the Example Project and Add Version Control

1. From your terminal, use composer to make a new local project, called "bitbucket," based on our example repo:

```nohighlight
composer create-project pantheon-systems/example-drops-8-composer bitbucket
```

2. Important Note: Currently, a plugin used to manage multidev environments is only configured to work with GitHub. While a fix will be released shortly in a future version, tests will fail because of this build step. At this point, now would be a good time to comment out the following line in the ```bitbucket/circle.yml``` file we just cloned:

```
- terminus build:env:delete:ci -n "$TERMINUS_SITE" --keep=2 --yes
```

Also, you will need to periodically delete multidev environments through the dashboard or via the Terminus command below:

```
terminus multidev:delete --delete-branch -y <site>.<multedev>
```

3. Initialize a local Git repository for your project. 

```nohighlight
cd bitbucket
git init
git add --force -A .
git commit -m "Initial commit."

```
    
## Step 2: Create A New Bitbucket Repository

1. Create a new Bitbucket repository.

![Bitbucket Dashboard](/source/docs/assets/images/integrations/bb_repo.png)


2. Next, follow the instructions Bitbucket presents to push the existing code to the new remote repository:

```nohighlight
git remote add origin https://sukottokun@bitbucket.org/sukottokun/drupal-site.git
git push -u origin master
```

3. Reload the browser, and you should see your files in the repository.

![Initial commit to new repo](/source/docs/assets/images/integrations/bitbucket/first_commit.png)


## Step 3: Create A New Site On Pantheon and Push Initial Commit
Now we will spin up a Drupal 8 site with terminus.

```
SITE=<your site name>
terminus site:create $SITE bitbucket "Drupal 8" --org="Astrocollosal"
terminus drush $SITE.dev -- site-install -y
terminus env:commit $SITE --message="Initial Commit" -y
```

Now we will add this pantheon site as a remote repo then overwrite the default install we just created with the code from our Bitbucket repo.

```
terminus  connection:set $SITE.dev git
PANTHEON_REPO=$(terminus connection:info $SITE.dev --field=git_url)
git remote add pantheon $PANTHEON_REPO
git push --force pantheon master
```

In the terminal, you should see Pantheon applying the pantheon.yml file configuration. When this is complete, the site should have a single commit, and be in sync with the Bitbucket repo. You should be able to view the site:

```
terminus env:view $SITE.dev
```

## Step 4: Create CircleCI Authentication

Next, we will connect CircleCI to access both Bitbucket and Pantheon. For security purposes, we will create and configure a Pantheon user solely for CircleCI continuous integration purposes.  

1. Using a unique email address, create a new Pantheon user from the [Pantheon home page](https://pantheon.io/).

2. [Create an SSH key](https://pantheon.io/docs/ssh-keys) for this user.

3. [Add this SSH public key](https://pantheon.io/docs/ssh-keys/#add-your-ssh-key-to-pantheon) to the user's dashboard.

![Add the public key to user dashboard](/source/docs/assets/images/integrations/bitbucket/ssh_key.png)

4. Add this user to your site's team.

5. On this user's account page, go to the Machine Token tab on the left navigation, and create a machine token, which is a string of text, for CircleCI to authenticate with. Save this token somewhere temporarily.

![Create a machine token from user dashboard](/source/docs/assets/images/integrations/bitbucket/machine_token.png)


## Step 5: Configure CircleCI

1. Log into CircleCi and click on Projects on the left navigation. Authorize Bitbucket access.

![Authorize Bitbucke repo access](/source/docs/assets/images/integrations/bitbucket/circle_bb.png)

Create a new project based on the Bitbucket repo you created. This project will run and fail.

![CFirst build](/source/docs/assets/images/integrations/bitbucket/circle_first_build.png)

3. Add the CircleCI user's private key to the SSH Permissions tab in the project.

![Add private key](/source/docs/assets/images/integrations/bitbucket/private_key.png)

4. Create the following environmental variables within the project:

- TERMINUS_SITE: The name of the Pantheon site.
- TERMINUS_TOKEN: The Terminus Machine token that you created.
- TEST_SITE_NAME: Used to set the name of the test site when installing Drupal.
- ADMIN_EMAIL: Used to configure the email address to use when installing Drupal.
- ADMIN_PASSWORD: Used to set the password for the UID 1 user during site installation.
- GIT_EMAIL: Used to configure the git user’s email address for commits we make.

Now you can rerun the failed job again from the Builds tab in CircleCI and you can follow the build from the dashboard. This time it should pass. 

![Running tests](/source/docs/assets/images/integrations/bitbucket/running.png)

## Final Step: Test the New Workflow
Now try to submit a pull request. Let's add something to the repo and test the workflow. From the terminal:

```
git checkout -b test
vim tests/features/content-ui.feature
```
Now add this test:

```
Feature: Create Content through Drupal Content UI
  In order to know that the Drupal content UI is working
  As a website user
  I need to be able to add a basic page

  @api
  Scenario: Add a basic page
    Given I am logged in as a user with the "administrator" role
    And I am on "/node/add/page"
    And I enter "Test Page" for "Title"
    And I press "Save and publish"
    Then I should see "Basic page Test Page has been created."
```

Type ```ESC``` then ```wq``` to save.

```
git add .
git commit -m "new UI test"
git push origin test
```
From the new branch you can open a Pull Request from the dashboard.

![New PR](/source/docs/assets/images/integrations/bitbucket/bb_pr.png)

This should kick off a new build with CircleCI. This is a simple change, so all tests should pass. The tests run on Bitbucket and then are pushed to a Multidev.

If you are satisfied with the change, merge your pull request. This will cause another test to run on CircleCI against the master branch. Once these tests pass, your pull request will be merged and the changes will be available on your development site. The regular Dev -> Test -> Live Pantheon workflow may still be used to deploy to Live, either with Terminus or on the dashboard.

## Conclusion

The Behat test in the repo are just an example of what you can do, and it's simple to add more tests as you build new features. CircleCI can also be configured to send notifications to messaging apps so your entire team is aware of changes made to the codebase. This can be easily adapted for WordPress sites, or BitBucket code repositories. Please use this example as a foundation to augment your testing process.

## Next Steps 

 - Consider following the steps in [this guide](/docs/guides/github-pull-requests/#configure-site-via-the-admin-interface) to learn how to commit changes made from within Drupal, and how to create your own Behat tests.

 - CircleCI can also be configured to send notifications to messaging apps so your entire team is aware of changes made to the codebase. This can be easily adapted for WordPress sites, or BitBucket code repositories. Please use this example as a foundation to augment your testing process.
>>>>>>> upstream/circleci
