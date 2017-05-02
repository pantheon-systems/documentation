---
title: Continuous Integration with CircleCI
description: How to integrate Pantheon with CircleCI and GitHub.
tags: [siteintegrations]
type: guide
permalink: docs/guides/:basename/
draft: true
date: 4/25/2017
---

Continuous Integration services such as [CircleCI](https://circleci.com) allow developers to automate the process of testing code. This insures that, if a thorough testing suite is defined, errors are caught before the code is deployed.

## What You Will Build

In this guide, we will start with a [repository](https://github.com/pantheon-systems/example-drops-8-composer) containing the configuration for Drupal 8, [Drush](http://docs.drush.org/en/master), [Drupal Console](https://drupalconsole.com), all of which [Composer](https://getcomposer.org) will install. Also included is a simple example of a [Behat](http://behat.org/en/latest/) [test suite](https://github.com/pantheon-systems/example-drops-8-composer/tree/master/tests) and other required configuration files. We will move this to a new GitHub repository and configure CircleCI.

When code is submitted for deployment, CircleCI will create a testing environment and run a suite of tests. If tests pass, the code can be merged into the master branch of the codebase. Before this merge happens, CircleCI will repeat the testing process against the production branch.


## What You’ll Need

- Composer, git and [Terminus](/docs/terminus) running on your local computer.
- A GitHub account
- A [Multidev](/docs/multidev/) enabled site on Pantheon. Signup at [Pantheon for Agencies](https://pantheon.io/agencies/pantheon-for-agencies) (free) to enable Multidev.
- A free [CircleCI](https://circleci.com) account


## Clone the example repository

1. From local your terminal, use composer to make a new local project based on our example repo. Our example project is called `circle`:

    ```bash
    composer create-project pantheon-systems/example-drops-8-composer circle
    ```

2. Initialize a local Git repository for your project:

    ```nohighlight
    cd circle
    git init
    git add --force -A .
    git commit -m "Initial commit."
    ```

## Create A New GitHub Repository

1. From your GitHub account page, under the **Repositories** tab, click **New**.

    ![Github Dashboard](/source/docs/assets/images/integrations/github_repos.png)

    Give your new repository a name. We've already imported a README file in the previous steps, so don't check the box to create a new one. Privacy options are up to you.

    ![New empty repository](/source/docs/assets/images/integrations/new_repo.png)

    Click **Create Repository** to complete.

2. From the instructions GitHub presents, push the code to the new remote repository:

    ```nohighlight
    git remote add origin git@github.com:YOUR-ORG/YOUR-PROJECT
    git push -u origin master
    ```

3. Once the push is complete, reload your browser to see your files in the repository:

    ![Initial commit to new repo](/source/docs/assets/images/integrations/first_commit.png)

4. Create a GitHub token. Refer to the [GitHub documentation](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) if you're unfamiliar with the process. Save this for the CircleCI configuration step. Be sure to give it the "repo" or "private repo" scope to match the privacy settings defined in step 1.

## Create A New Site On Pantheon and Push Initial GitHub Commit
Now we will spin up a Drupal 8 site, then overwrite the default installation with the code from our github repo.

1. From your User or Agency dashboard, [create a vanilla Drupal 8 site](/docs/create-sites).

2. From the new site's dashboard, visit your development site, and complete the site configuration. You will need the Site Name, Admin email and password when configuring CircleCI shortly.

3. Commit your `settings.php` changes from the Site Dashboard, then change the connection mode to **Git**.

4. Under Connection Info, copy the **SSH clone URL**:

    ![SSH Clone URL from dashboard](/source/docs/assets/images/integrations/ssh_url.png)

5. Paste the URL into a text editor, and copy the git repository URL; it's the middle part which begins `ssh://` and ends with `.git`:

    ![SSH Clone URL Detail](/source/docs/assets/images/integrations/ssh_url_det.png)

6. With that URL, create this git command and execute in your repo directory:

    ```bash
    git remote add pantheon ssh://codeserver...drush.in:2222/~/repository.git
    ```

    This will create a second [remote](https://git-scm.com/docs/git-remote), called `pantheon`.

7. Push your code to this remote:

    ```bash
    git push --force pantheon master
    ```

    In the terminal, you should see Pantheon applying the pantheon.yml file configuration:

    ``` bash
    remote: PANTHEON NOTICE:
    remote:
    remote: Changes to `pantheon.yml` detected.
    remote:
    remote: Successfully applied `pantheon.yml` to the 'dev' environment.
    ```

    When this is complete, the site should have a single commit, and be in sync with the GitHub repo.

    ![Updated Site Dashboard](/source/docs/assets/images/integrations/updated.png)

## Create CircleCI Authentication

Next, we will connect CircleCI to access both GitHub and Pantheon. For security purposes, we will create and configure a Pantheon user solely for CircleCI continuous integration purposes.

1. Using a unique email address, create a new Pantheon user from the [Pantheon home page](https://pantheon.io/).

2. [Create an SSH key](/docs/ssh-keys) for this user. Be careful not to overwrite any existing SSH keys.

3. [Add this SSH public key](/docs/ssh-keys/#add-your-ssh-key-to-pantheon) to the user's dashboard.

    ![Add the public key to user dashboard](/source/docs/assets/images/integrations/ssh_key.png)

4. On this user's **Account** tab, go to the **Machine Tokens** tool and create a machine token for CircleCI to authenticate with. Save this token somewhere temporarily.

    ![Create a machine token from user dashboard](/source/docs/assets/images/integrations/machine_token.png)

5. Back in your regular Pantheon user account, add your CircleCI user [to your site's team](/docs/change-management/#add-a-user-to-a-site).



## Configure CircleCI

1. At [CircleCI](https://circleci.com/), log in with your GitHub account.


2. Click on **Projects** on the left navigation bar. Find your new GitHub repo, and click on **Build Project**. This first build will fail.

3. Go to **Project Settings** by clicking on the gear in the upper right-hand corner.  On the left, under **Permissions** click on **SSH Permissions**. Click **Add SSH Key** and add the CircleCI user's *private* key, created in step 2 under [Create CircleCI Authentication](#create-circleci-authentication):

    ![Add private key](/source/docs/assets/images/integrations/private_key.png)

4. Under **BUILD SETTINGS**, click on **Environment Variables**. Use the **Add Variable** button to create the following environmental variables within the project:

    | Name             | Value                          |
    |:-----------------|--------------------------------|
    | `TERMINUS_SITE`  | The name of the Pantheon site. |
    | `TERMINUS_TOKEN` | The Terminus Machine token that you created. |
    | `TEST_SITE_NAME` | Used to set the name of the test site when installing Drupal. |
    | `ADMIN_EMAIL`    | Used to configure the email address to use when installing Drupal. |
    | `ADMIN_PASSWORD` | Used to set the password for the UID 1 user during site installation. |
    | `GIT_EMAIL`      | Used to configure the git user’s email address for commits we make. |
    | `GITHUB_TOKEN`   | Used by CircleCI to post comments on pull requests |

    <br>

    Now you can rerun the failed job again from the **Builds** tab in CircleCI and you can follow the build from the dashboard. This time it should pass.

    ![Running tests](/source/docs/assets/images/integrations/running.png)

## Test the New Workflow
Now try to submit a pull request. Let's add something to the repo and test the workflow.

1. From your local terminal, create a new branch and open a new file:

    ``` bash
    git checkout -b new-feature
    vim tests/features/content-ui.feature
    ```

    If you're unfamiliar with `vim`, you can use another text editor to create the new file.


2. Add the following:

    ``` ruby
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

3. Commit your change, and push your new branch to GitHub:

    ```
    git add .
    git commit -m "new feature"
    git push origin new-feature
    ```

4. From your GitHub repo dashboard, go to the new branch and open a Pull Request:

    ![New PR](/source/docs/assets/images/integrations/new_pr.png)

    This will initiate a new build with CircleCI. This is a simple change, so all tests should pass. The tests run on GitHub and then are pushed to a Multidev environment on Pantheon.

If you are satisfied with the change, merge your pull request. This will cause another test to run on CircleCI against the master branch. Once these tests pass, your pull request will be merged and the changes will be available on your development site. The regular Dev -> Test -> Live [Pantheon workflow](/docs/pantheon-workflow/) can now be used to deploy to Live, either with Terminus or on the dasboard.

## Conclusion

The Behat tests in the repo are just an example of what you can do, and it's simple to add more tests as you build new features. CircleCI can also be configured to send notifications to messaging apps so your entire team is aware of changes made to the codebase. This can be easily adapted for WordPress sites, or BitBucket code repositories. Please use this example as a foundation to augment your testing process.
