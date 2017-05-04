---
title: Continuous Integration with CircleCI
description: How to integrate Pantheon with CircleCI and GitHub.
tags: [siteintegrations]
type: guide
permalink: docs/guides/:basename/
date: 4/25/2017
contributors: [scottmassey]
---

Continuous Integration service providers such as [CircleCI](https://circleci.com) allow developers to automate the process of building, testing, and deploying code. Given sufficient test coverage, continuous integration ensures errors are caught before code is deployed.

## What You'll Build
- A new Drupal 8 site using an [example repository](https://github.com/pantheon-systems/example-drops-8-composer) that contains Drupal 8, [Drush](http://docs.drush.org/en/master), and [Drupal Console](https://drupalconsole.com)- all of which will be installed and managed with [Composer](https://getcomposer.org).
- A simple implementation of a [Behat](http://behat.org/en/latest/) [test suite](https://github.com/pantheon-systems/example-drops-8-composer/tree/master/tests) and other required configuration files.
- A new GitHub repository and continuous integration implementation on CircleCI.

When code is submitted to GitHub for deployment, CircleCI will create a testing environment and run a suite of tests. If tests pass, the code can be merged into the master branch of the codebase. Before this merge is deployed, CircleCI will repeat the testing process against the production branch.

If you're already familiar with continuous integration and a GitHub workflow, consider reviewing [this guide](/docs/guides/github-pull-requests/), which automates the build process and focuses on Pantheon and Drupal specific workflow techniques.

## What You’ll Need

- [Composer](https://getcomposer.org/) and [Git](https://git-scm.com/download/) running on your local computer. [Terminus](/docs/terminus) is recommended for additional scripting options, but not required.
- A GitHub account
- A Pantheon For Agencies account, needed to create [multidev](/docs/multidev/) sites. Signup at [Pantheon for Agencies](https://pantheon.io/agencies/pantheon-for-agencies) (free) to enable multidev.
- A free [CircleCI](https://circleci.com) account


## Create a New Local Project
1. From your local terminal, use composer to make a new Drupal 8 project based on the [example repo](https://github.com/pantheon-systems/example-drops-8-composer). Our example project below is called `circle`:

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

## Host the Project on GitHub
1. From your GitHub account page, under the **Repositories** tab, click **New**.

    ![Github Dashboard](/source/docs/assets/images/integrations/github_repos.png)

    Give your new repository a name. We've already imported a README file in the previous steps, so don't check the box to create a new one. Privacy options are up to you.

    ![New empty repository](/source/docs/assets/images/integrations/new_repo.png)

    Click **Create Repository** to complete.

2. From your local terminal, use GitHub's instructions to push your project code to the new remote repository:

    ```nohighlight
    git remote add origin git@github.com:YOUR-ORG/YOUR-PROJECT
    git push -u origin master
    ```

3. Once the push is complete on your local, reload the browser to see your files in the GitHub repository:

    ![Initial commit to new repo](/source/docs/assets/images/integrations/first_commit.png)

4. Create a new [GitHub access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/). Keep the token handy so we can use it on CircleCI later. Be sure to give it the "repo" or "private repo" scope to match the privacy settings for the GitHub repository.

## Run the Project on Pantheon
Now we will spin up a Drupal 8 site, then overwrite the default installation with code from our GitHub repository.

1. From your Pantheon User or Organization Dashboard, [create a new Drupal 8 site](/docs/create-sites) and click **Visit your Pantheon Dashboard**.

2. Click **Visit Development Site** and complete the Drupal 8 installation process. Keep the Site Name, Admin email and password handy so we can use it on CircleCI later.

3. Commit your `settings.php` changes to the Dev environment from the Site Dashboard, then change the connection mode to **Git**.

4. Under Connection Info, copy the **SSH clone URL**:

    ![SSH Clone URL from dashboard](/source/docs/assets/images/integrations/ssh_url.png)

5. Paste the URL into a local text editor, and copy the Git repository URL; it's the middle part which begins `ssh://` and ends with `.git`:

    ![SSH Clone URL Detail](/source/docs/assets/images/integrations/ssh_url_det.png)

6. With that URL, create and run the following Git command in the root directory of your local project:

    ```bash
    git remote add pantheon ssh://codeserver...drush.in:2222/~/repository.git
    ```

    This will create a second [remote](https://git-scm.com/docs/git-remote), called `pantheon`.

7. Push your code to the `pantheon` remote:

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

## Create Machine User and Token on Pantheon
Next, we will create a new Pantheon machine user to associate with our CircleCI implementation.

1. Using a unique email address, create a new Pantheon user from the [Pantheon home page](https://pantheon.io/) and log in. For example, this site uses `docs@pantheon.io` for our machine user.  

2. [Create an SSH key](/docs/ssh-keys) for this user.

    <div class="alert alert-danger" role="alert">
    <h4 class="info">Warning</h4><p markdown="1">Be careful not to overwrite any existing SSH keys on your local computer. Enter a non-standard file name and/or location at this prompt:</p>

    <p markdown="1">
    ```
    Enter file in which to save the key (~/.ssh/id_rsa):
    ```
    </p></div>

3. [Add this SSH public key](/docs/ssh-keys/#add-your-ssh-key-to-pantheon) to Pantheon on the User Dashboard.

    ![Add the public key to user dashboard](/source/docs/assets/images/integrations/ssh_key.png)

4. From the User Dashboard, navigate to **Account** > **Machine Tokens** and create a machine token. Keep this token handy so we can use it on CircleCI later.

    ![Create a machine token from user dashboard](/source/docs/assets/images/integrations/machine_token.png)

5. Log out of the machine user's Pantheon account and log back into your personal Pantheon account, then navigate to the Site Dashboard and add the machine user [to your site's team](/docs/change-management/#add-a-user-to-a-site).

## Create CircleCI Project and Authenticate
Next, we'll create a new project on CircleCI and authenticate the machine user's access to GitHub and Pantheon from this service.

1. From [CircleCI](https://circleci.com/vcs-authorize/), log in with GitHub.

2. Click on **Projects** on the left navigation bar. Find your new GitHub repo, and click on **Build project**. Our first build will fail.

3. Go to **Project Settings** by clicking on the gear in the upper right-hand corner.  On the left, under **Permissions** click on **SSH Permissions**. Click **Add SSH Key** and add the machine user's *private* key, created in [step 2 above](#create-circleci-project-and-authenticate):

    ![Add private key](/source/docs/assets/images/integrations/private_key.png)

4. Under **BUILD SETTINGS**, click on **Environment Variables**. Use the **Add Variable** button to create the following environmental variables within the project:

    <table class="table table-responsive table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>TERMINUS_SITE</code></td>
          <td>The name of the Pantheon site.</td>
        </tr>
        <tr>
          <td><code>TERMINUS_TOKEN</code></td>
          <td>The token created for the machine user on Pantheon.</td>
        </tr>
        <tr>
          <td><code>TEST_SITE_NAME</code></td>
          <td>Used to set the name of the test site when installing Drupal.</td>
        </tr>
        <tr>
          <td><code>ADMIN_EMAIL</code></td>
          <td>Used to configure the email address to use when installing Drupal.</td>
        </tr>
        <tr>
          <td><code>ADMIN_PASSWORD</code></td>
          <td>Used to set the password for the UID 1 user during site installation.</td>
        </tr>
        <tr>
          <td><code>GIT_EMAIL</code></td>
          <td>Used to configure the Git user’s email address for commits we make.</td>
        </tr>
        <tr>
          <td><code>GITHUB_TOKEN</code></td>
          <td>Used by CircleCI to post comments on pull requests.</td>
        </tr>
      </tbody>
    </table>

    Now you can rerun the failed job again from the **Builds** tab in CircleCI and follow the build from the dashboard. This time it should pass.

    ![Running tests](/source/docs/assets/images/integrations/running.png)

## Test the New Workflow
Now make a change and submit a pull request to take your new workflow for a spin.

1. From the root directory of your local project, create a new branch and open a new file:

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

4. From your GitHub repository, go to the new branch and open a Pull Request:

    ![New PR](/source/docs/assets/images/integrations/new_pr.png)

    Commits pushed to GitHub will initiate a new build with CircleCI. This is a simple change, so all tests should pass. The tests run on GitHub and then are pushed to a Multidev environment on Pantheon.

5. From the Pantheon Site Dashboard, you can visit the new multidev environment to inspect your changes in action.

6. If you're satisfied with the change, merge your pull request. This will cause another test to run on CircleCI against the master branch. Once these tests pass, CircleCI will merge your pull request on GitHub, and the changes will be available on your development environment.

7. Use the [Pantheon workflow](/docs/pantheon-workflow/) to merge into Dev and deploy to Test then up to Live, either with Terminus or on the Site Dashboard.

## Next Steps 

 - Consider following the steps in [this guide](/docs/guides/github-pull-requests/#configure-site-via-the-admin-interface) to learn how to commit changes made from within Drupal, and how to create your own Behat tests.

 - CircleCI can also be configured to send notifications to messaging apps so your entire team is aware of changes made to the codebase. This can be easily adapted for WordPress sites, or BitBucket code repositories. Please use this example as a foundation to augment your testing process.
