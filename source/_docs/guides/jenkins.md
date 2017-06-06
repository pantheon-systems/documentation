---
title: Use Jenkins to Test and Automate Drupal Development
description: How to configure continuous integration for a Drupal site on Pantheon.
tags: [siteintegrations]
type: guide
permalink: docs/guides/:basename/
date: 5/30/2017
---

## Continuous Integration with Jenkins

[Jenkins](https://jenkins.io) is an open source Continuous Integration (**CI**) server which can be used to build, test, and deploy code on any Drupal and WordPress website on Pantheon. Unlike hosted services such as [CircleCI](https://circleci.com/), it is a Java application installed and run on a server, and requires regular upkeep and maintenance. However, it is very customizable and can even run non-CI related tasks, such as calling periodic cron jobs and other site-related tasks.

## What You Will Build

This guide will cover how to configure an existing Jenkins server to work with sites on the Pantheon platform. Because we want to submit pull requests and take advantage of existing GitHub and Jenkins integration, we will configure GitHub as the main code repository. When we push code to the GitHub repo, it will trigger Jenkins to test our code changes on a multidev environment. Jenkins will run tests against both the pull request and Pantheon's master branch and display the results.

## Before You Begin

You will need:

- Root access to a server running Jenkins. Assigning a domain name to this server, e.g. "ci.yourdomain.com," is recommended.
- The following applications, installed both locally and on the Jenkins server. Verify the default Jenkins user has the ability to run them on the Jenkins server from the command line.
    - [Git](https://git-scm.com/)
    - [Composer](https://getcomposer.org/) 
    - [Drush](http://docs.drush.org/en/8.x/install-alternative)
    - [Terminus](https://github.com/pantheon-systems/terminus#installing-with-composer)
    - [Terminus Build Tools plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin)
- The following Jenkins plugins should be enabled: [Git](https://wiki.jenkins-ci.org/display/JENKINS/Github+Plugin) , [Github](https://wiki.jenkins-ci.org/display/JENKINS/GitHub+Plugin), [Github Pull Request Builder](https://wiki.jenkins-ci.org/display/JENKINS/GitHub+pull+request+builder+plugin), [Environment Injector](https://wiki.jenkins-ci.org/display/JENKINS/EnvInject+Plugin), [Conditional Build Step](https://wiki.jenkins-ci.org/display/JENKINS/Conditional+BuildStep+Plugin), and [Run Condition](https://wiki.jenkins-ci.org/display/JENKINS/Run+Condition+Plugin).
- A Drupal site on Pantheon, with [multidev](https://pantheon.io/features/multidev-cloud-environments) enabled.
- A [GitHub](https://github.com) account.

## Create A New Site

### Local Project Instantiation

1. From your local terminal, use Composer to make a new local project based on our example, which contains Drupal 8, Behat, and other configuration settings:

    <div class="alert alert-info" role="alert">
    <h4 class="info">Note</h4>
    <p markdown="1">In this example our project is call called `my-site`, so we begin by setting a local environment variable to this value. Adjust this any other variables to match your site settings.</p>
    </div>

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
    ```
   
### Create and configure a GitHub Repository

1. From the GitHub dashboard, [create a new repository](https://github.com/new), without creating a `README` or `.gitignore` file.

    ![New empty repository](/source/docs/assets/images/integrations/jenkins/new_repo.png)


2. From your local command line, connect your local project to this repository as `origin`, and push the code to the master branch. Remember to replace the URL path:

    ```nohighlight
    git remote add origin git@github.com:YOUR-ORG/YOUR-PROJECT.git
    git push -u origin master
    ```

At this point, you should be able to create a local branch, commit a change, and push to GitHub. On GitHub, you should then be able to open a pull request successfully.

### Create a Pantheon Site

Now we will spin up a Drupal 8 site on Pantheon with Terminus, then overwrite the default install with the code from our GitHub repository. In the commands below, replace the value for `--org=` with your organization's name.

1. From your local terminal, use terminus to create a site on Pantheon:

    ```nohighlight
    terminus site:create $SITE "My Site" "Drupal 8" --org="My Team"
    terminus connection:set $SITE.dev git
    ```

2. Add the Pantheon remote repository address and push the code to it:

    ```nohighlight
    PANTHEON_REPO=$(terminus connection:info $SITE.dev --field=git_url)
    git remote add pantheon $PANTHEON_REPO
    git push --force pantheon master
    ```

3. Complete the Drupal site configuration on Pantheon, replacing the values for `--site-mail`, `--account-mail`, and `--account-name`:

    ```nohighlight
    terminus build-env:site-install --site-mail="<your email>" --site-name="My Drupal Site" --account-mail="<your email>" --account-name="admin" $SITE.dev
    ```

4. Verify the site is installed and working:

    ```nohighlight
    terminus env:view $SITE.dev
    ```

    Now the master branch of GitHub, your local, and Pantheon are in sync.



## Configure Jenkins

### Create the Jenkins Project

1. Log into the Jenkins dashboard as an admin user. Click on **New Item**.

    ![Jenkins dashboard](/source/docs/assets/images/integrations/jenkins/jenkins_dash.png)

2. Give the project a name with no spaces. Select **Freestyle Project** and click **OK** to save.

    ![New Jenkins project](/source/docs/assets/images/integrations/jenkins/new_job.png)

3. The next page lets you configure options for this project. In the **General** tab, select "GitHub project" and enter the repository URL (e.g. `https://github.com/YOUR-ORG/YOUR-PROJECT`).

4. In the **Source Code Management** tab select **Git**, then **Advanced**. Add the following information:

    - **Repository URL**: The path to the .git file of your repository, e.g. `https://github.com/YOUR-ORG/YOUR-PROJECT.git`
    - **Name**: `origin`
    - **Refspec**: `+refs/heads/*:refs/remotes/origin/*`
    - **Branch specifier**: `origin/*`
    - **Additional Behaviours**: Add **Prune stale remote-tracking branches**, and **Clean after checkout**:

    ![SCM view](/source/docs/assets/images/integrations/jenkins/scm_settings.png)

5. We want code changes to trigger our build (as opposed to setting up a periodic build, for example). Under **Build Triggers**, Check the box labelled, "GitHub hook trigger for GITScm polling".

6. Under **Build Environment**, check the box labelled "Inject environment variables to the build process."

    The first new field to appear is the **Properties File Path**. The convention is to add these files to `/var/lib/jenkins/`. Verify the file path exists on the Jenkins server, or create a file and add the path accordingly. In our example we create a file called `envVars.properties` in the standard path.

7. In the **Properties Content** field, add the following variables one per line, with no quotation marks:

    - **TERMINUS_TOKEN=** enter an existing token or [create a new token](https://dashboard.pantheon.io/users/#account/tokens/) from your user dashboard for Jenkins.
    - **SITE_ID=** your site name:

    ![Env vars view](/source/docs/assets/images/integrations/jenkins/env_vars.png)
  
### Add Build Steps

Under the **Build** tab is a button labeled **Add build step**. These tasks will execute in sequence, and the job will quit if any fail. Add these in separate build steps, selecting **Execute shell** for all but step 5.

1. Jenkins logs into Pantheon:

    ```nohighlight
    echo "Logging into Terminus"
    terminus auth:login --machine-token=${TERMINUS_TOKEN}
    ```

2. Verifies the dev site is awake and in git mode. Note that these are separate build steps:

    ```nohighlight
    echo "Waking Dev environment."
    terminus env:wake -n ${SITE_ID}.dev
    ```

    ```nohighlight
    echo "Setting site to git mode."
    terminus connection:set ${SITE_ID}.dev git
    ```

3. Jenkins creates a multidev and pushes the new code to this environment

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
4. Then the test suite we include with the example is run.

    ```nohighlight
    echo "Running behat"
    TERMINUS_ENV=ci-$BUILD_ID TERMINUS_SITE=$SITE_ID $WORKSPACE/tests/scripts/run-behat
    ```

5. Add one **Conditional step (single)** build task, to merge the code from the Pantheon multidev to the pantheon/master, i.e. your dev site on Pantheon. This will only happen when changing the master branch.

    - Under **Run?** select **Regular expression match**.

        - **Expression**: `(?i).*origin/master.*`

        - **Label**: `${ENV,var="GIT_BRANCH"}`

    - Under **Builder** select **Execute Shell**

        - Command:

                echo "Merging multi-dev changes to master"
                terminus build:env:merge -n ${SITE_ID}.ci-${BUILD_ID} --yes

    Your conditional step should look like this:
    ![Conditional Step](/source/docs/assets/images/integrations/jenkins-conditional.png)

6. Finally, a  cleanup task:

    ```nohighlight
    echo "Cleaning up multidev & branches"
    git -C ${WORKSPACE} remote remove pantheon
    git -C ${WORKSPACE} remote prune origin
    terminus build:env:delete:ci ${SITE_ID} --keep=2 --delete-branch
    ```

### Add Post-build Actions

Under **Post-build Actions** is another button labelled **Add post-build action**. Click on it and select the option "Set GitHub commit status (universal)". In the fields that appear, choose the following options:

 - **Commit SHA**: "Latest build revision".

 - **Repositories**: "Any defined in job repository".

 - **Commit context**: "From GitHub property with fallback to job name".

 - **Status Result**: "One of default messages and statuses".

Finally, hit **Save** to complete the configuration of your Jenkins build process.

## GitHub/Jenkins Integration

1. From your GitHub account, go to [Settings](https://github.com/settings/profile). Under **Developer Settings** click on **Personal access tokens**  and generate a new token. This should have all **repo**  and **admin:repo-hook** options:

    ![GitHub token permissions](/source/docs/assets/images/integrations/jenkins-gh-token-access.png)

    Copy the generated token. Be careful, as you will not be able to view it again.

2. Return to the main Jenkins dashboard and select **Manage Jenkins**, then **Configure System**.

3. Scroll to the **GitHub Servers** section  and click on **Add GitHub Server**.

4. Leave the **API URL** as "https://api.github.com." For **Credentials**, click **Add** then select the **Jenkins** user.

5. In the pop-up menu, add the following settings:

    - **Domain**: "Global credentials (unrestricted)
    - **Kind**: "Secret Text"
    - **Scope**: "Global (Jenkins, nodes, items, all child items, etc)
    - **Secret**: Paste the GitHub token you created
    - **ID** (Optional): An internal unique ID, if left blank, Jenkins will generate an ID
    - **Description**: Optional description

    When you're satisfied with these values, click **Add**. Now under the **Credentials** drown-down you can select your new credentials. Then **Save**.


6. Now on your local computer, create a new branch and makes a change to it. When you commit and push to GitHub, a build should initiate. You should see the results of the test, which link to the Jenkins job:

![Passing Github test](/source/docs/assets/images/integrations/jenkins/test_pass.png)

If a test fails, you can see the details by clicking the job, then "Console Output"

![Job Details](/source/docs/assets/images/integrations/jenkins/job_details.png)


## Conclusion
If you usually use only the Pantheon repository, be sure to now push to your new origin repo on GitHub. You can still add the Pantheon repo as a remote to take advantage of Multidev and work on your own environment. As you add new features, continue to add new tests.
