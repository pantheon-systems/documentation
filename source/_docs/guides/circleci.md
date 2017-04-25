---
title: Continuous Integration with CircleCI
description: How to integrate Pantheon with CircleCI and GitHub.
tags: [siteintegrations]
type: guide
permalink: docs/:basename/
draft: true
date: 4/25/2017
---

Continuous Integration services such as [CircleCI](https://circleci.com) allow developers to automate the process of testing code. This insures that, if a thorough testing suite is defined, errors are caught before the code is deployed.

## What You Will Build

In this guide, we will start with a [repository](https://github.com/pantheon-systems/example-drops-8-composer) containing the configuration for Drupal 8, [Drush](http://docs.drush.org/en/master), [Drupal Console](https://drupalconsole.com), all of which [Composer](https://getcomposer.org) will install. Also included is a simple example of a Behat [test suite](https://github.com/pantheon-systems/example-drops-8-composer/tree/master/tests) and other required configuration files. We will move this to a new GitHub repository and configure CircleCI.

When code is submitted for deployment, CircleCI will create a testing environment and run a suite of tests. If tests pass, the code can be merged into the master branch of the codebase. Before this merge happens, CircleCI will repeat the testing process against the production branch.


## What You’ll Need

- Composer, git and [Terminus](https://pantheon.io/docs/terminus) running on your local computer.
- A GitHub account
- A [Multidev](https://pantheon.io/docs/multidev/) enabled site on Pantheon. [Pantheon for Agency](https://pantheon.io/agencies/pantheon-for-agencies) signup (free) will enable Multidev.
- A free [CircleCI](https://circleci.com) account


## Clone the example repository

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

## Create A New GitHub Repository

1. Create a new GitHub repository.

    ![Github Dashboard](/source/docs/assets/images/integrations/github_repos.png)

    We already created a README, etc. in the previous steps so don't check the box to create a new one. Privacy options are up to you.

    ![New empty repository](/source/docs/assets/images/integrations/new_repo.png)


2. Next, follow the instructions GitHub presents to push the code to the new remote repository:

    ```nohighlight
    git remote add origin git@github.com:YOUR-ORG/YOUR-PROJECT
    git push -u origin master
    ```

3. Reload the browser, and you should see your files in the repository.

    ![Initial commit to new repo](/source/docs/assets/images/integrations/first_commit.png)

4. Create a GitHub token. You will save this for the CircleCI configuration step

    Generate one of these as shown in the [GitHub documentation](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/), and give it either the “repo” or the “public repo” scope as needed.


## Create A New Site On Pantheon and Push Initial GitHub Commit
Now we will spin up a Drupal 8 site, then overwrite the default install with the code from our github repo.

1. From your User or Agency dashboard, [create a vanilla Drupal 8 site](https://pantheon.io/docs/create-sites).

2. From the new site's dashboard, visit your development site, and complete the site configuration. You will need the Site Name, Admin email and password when configuring CircleCI shortly.

3. Commit your settings.php change from the dashboard and change the connection mode to Git.

4. From the site dashboard Connection Info, copy the SSH Clone URL

    ![SSH Clone URL from dashboard](/source/docs/assets/images/integrations/ssh_url.png)

5. Paste it to a text editor and copy the git repository URL; it's the middle part which begins “ssh://” and ends with “.git”:

    ![SSH Clone URL Detail](/source/docs/assets/images/integrations/ssh_url_det.png)

6. With that URL, create this git command and execute in the terminal:

    ```
    git remote add pantheon ssh://codeserver...drush.in:2222/~/repository.git
    ```

    This will create a second remote, called "pantheon".

7. Push your code to this remote.

    ```
    git push --force pantheon master
    ```

    In the terminal, you should see Pantheon applying the pantheon.yml file configuration. When this is complete, the site should have a single commit, and be in sync with the GitHub repo.

    ![Updated Site Dashboard](/source/docs/assets/images/integrations/updated.png)

## Create CircleCI Authentication

Next, we will connect CircleCI to access both GitHub and Pantheon. For security purposes, we will create and configure a Pantheon user solely for CircleCI continuous integration purposes.

1. Using a unique email address, create a new Pantheon user from the [Pantheon home page](https://pantheon.io/).

2. [Create an SSH key](https://pantheon.io/docs/ssh-keys) for this user.

3. [Add this SSH public key](https://pantheon.io/docs/ssh-keys/#add-your-ssh-key-to-pantheon) to the user's dashboard.

    ![Add the public key to user dashboard](/source/docs/assets/images/integrations/ssh_key.png)

4. Add this user to your site's team.

5. On this user's account page, go to the Machine Token tab on the left navigation, and create a machine token, which is a string of text, for CircleCI to authenticate with. Save this token somewhere temporarily.

    ![Create a machine token from user dashboard](/source/docs/assets/images/integrations/machine_token.png)


## Configure CircleCI

1. In CircleCI, log in with your GitHub account.


2. Click on Projects on the left navigation. Create a new project based on the GitHub repo you created. This project will run and fail.

3. Add the CircleCI user's private key to the SSH Permissions tab in the project.

    ![Add private key](/source/docs/assets/images/integrations/private_key.png)

4. Create the following environmental variables within the project:

    - TERMINUS_SITE: The name of the Pantheon site.
    - TERMINUS_TOKEN: The Terminus Machine token that you created.
    - TEST_SITE_NAME: Used to set the name of the test site when installing Drupal.
    - ADMIN_EMAIL: Used to configure the email address to use when installing Drupal.
    - ADMIN_PASSWORD: Used to set the password for the UID 1 user during site installation.
    - GIT_EMAIL: Used to configure the git user’s email address for commits we make.
    - GITHUB_TOKEN: Used by CircleCI to post comments on pull requests

    Now you can rerun the failed job again from the Builds tab in CircleCI and you can follow the build from the dashboard. This time it should pass.

    ![Running tests](/source/docs/assets/images/integrations/running.png)

## Test the New Workflow
Now try to submit a pull request. Let's add something to the repo and test the workflow. From the terminal:

```
git checkout -b new-feature
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
git commit -m "new feature"
```
From the new branch you can open a Pull Request from the dashboard.

![New PR](/source/docs/assets/images/integrations/new_pr.png)

This should kick off a new build with CircleCI. This is a simple change, so all tests should pass. The tests run on GitHub and then are pushed to a Multidev.

If you are satisfied with the change, merge your pull request. This will cause another test to run on CircleCI against the master branch. Once these tests pass, your pull request will be merged and the changes will be available on your development site. The regular Dev -> Test -> Live Pantheon workflow may still be used to deploy to Live, either with Terminus or on the dasboard.

## Conclusion

The Behat test in the repo are just an example of what you can do, and it's simple to add more tests as you build new features. CircleCI can also be configured to send notifications to messaging apps so your entire team is aware of changes made to the codebase. This can be easily adapted for WordPress sites, or BitBucket code repositories. Please use this example as a foundation to augment your testing process.
