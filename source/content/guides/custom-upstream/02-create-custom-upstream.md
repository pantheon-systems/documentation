---
title: Create a Custom Upstream
subtitle: Create a Custom Upstream
description: Connect a remote repository to your Pantheon account and use it as a starting point for new sites.
categories: [develop]
tags: [upstreams, workflow, webops]
layout: guide
showtoc: true
permalink: docs/guides/custom-upstream/create-custom-upstream
anchorid: create-custom-upstream
---

Pantheon Custom Upstreams are a self-serve feature available to anyone with access to the [Organization Dashboard](/organizations) with an eligible plan. Organization members will be able to create new sites from a set common codebase after an Organization Administrator creates a Custom Upstream. The Custom Upstream must be created within each Organization’s Dashboard if you want to use a specific Custom Upstream for multiple Organizations. 

<Alert title="Note" type="info">

Be aware that support for Custom Upstreams is limited to verification that the externally hosted upstream repository is connected to the platform correctly. For details, see [Get Support](/guides/support/#custom-upstreams).

</Alert>

## Create and Host the Repository Remotely

This remote repository serves as the central location for the development and maintenance of your Custom Upstream. Changes are tracked here and distributed downstream to sites within your Organization as one-click updates in the Site Dashboard.

Follow the steps for your preferred Git host below to create your repository.

<TabList>

<Tab title="GitHub" id="gh" active={true}>

1. [Sign up for a GitHub account](https://github.com/join) if you do not have one already.

1. [Log in to GitHub](https://github.com/login/).

1. [Create an SSH Key](/ssh-keys#generate-ssh-key) if you don't already have one  associated with your GitHub account > [add your SSH Key to GitHub](https://github.com/settings/ssh/new).

1. Click [**Start Project**](https://github.com/new) if this is your first time logging in to GitHub. Otherwise click [**New**](https://github.com/new) in the **Repositories** sidebar on the left.

1. Name the repository.

1. Select whether the repository will be private or if it can be publicly accessible from outside your organization.

   **Do not** select the options to create a `README`, `.gitignore`, or license file:

   ![GitHub Initialization options](../../../images/github-avoid-readme.png)

  <Alert type="info" title="Note">

  As of October 1st, 2020, all new repositories on GitHub are initialized with the default branch name `main`.

  As a company, Pantheon is trying to use [more inclusive language in our repositories](https://pantheon.io/blog/diversity-equity-and-inclusion-pantheon?docs). While our team works to make Custom Upstreams less reliant on older naming conventions, new Custom Upstreams currently default to using the `master` branch name.

  Git's default naming convention differs from GitHub's. If you don't initialize the repository on GitHub, Git will assign the default branch name as `master` when you clone the repository locally.

  </Alert>

1. Click **Create Repository**.

1. Copy the repository URI (SSH) found in the **Quick setup** section:

  ![GitHub Repo URI](../../../images/github-repo-url.png)

1. Clone the repository to your local from the command line (replace the URI):

  ```bash{promptUser: user}
  git clone git@github.com:pantheon-systems/custom-upstream.git
  ```

1. Navigate to the repository's root directory:

  ```bash{promptUser: user}
  cd custom-upstream
  ```

</Tab>

<Tab title="Bitbucket" id="bb">

1. [Sign up for a Bitbucket account](https://bitbucket.org/account/signup/) if you do not have one already.

1. [Log in to Bitbucket](https://bitbucket.org/account/signin/) and navigate to [**Repositories**](https://bitbucket.org/dashboard/repositories).

1. Click [**Create a Repository**](https://bitbucket.org/repo/create).

1. Name the repository.

1. Select whether the repository will be private or if it can be publicly accessible from outside your organization.

1. Select **No** from the dropdown menu for **Include a README?**.

1. Select **No** from the dropdown menu for **Include .gitignore?**.

1. Set the **Default branch name** to **master**

  <Alert type="info" title="Note">

  As of January 27th, 2021, all new repositories on Bitbucket are initialized with `main` as the default branch name.
 
  Pantheon intends to remove harmful language from our code and documentation. Please refer to our documentation on [more inclusive language in our      
  repositories](https://pantheon.io/blog/diversity-equity-and-inclusion-pantheon?docs) for more information. 

  As we strive to make Custom Upstreams less reliant on older naming conventions, new Custom Upstreams currently default to using the `master` branch name.

  Please note that Git's default naming convention differs from GitHub's. If you do not initialize the repository on Bitbucket, Git will assign the default branch name as `master` when you clone the repository locally.

  </Alert>

1. Click **Create Repository**.

1. Copy the repository URL (HTTPS), found on the top right of the page:

  ![Bitbucket Repo URL](../../../images/bitbucket-repo-url.png)

1. Clone the repository to your local from the command line (replace the URL):

  ```bash{promptUser: user}
  git clone https://pantheondocs@bitbucket.org/pantheondocs/agency-custom-upstream.git
  ```

1. Navigate to the repository's root directory:

  ```bash{promptUser: user}
  cd agency-custom-upstream
  ```

</Tab>

<Tab title="GitLab" id="gitlab">

You can sign up for a [GitLab.com](https://about.gitlab.com) account, or use a self-managed GitLab installation.

1. Navigate to your GitLab dashboard and click **New project**.

1. Provide a **Project name**, **Project description** (optional), and **Visibility Level** > click **Create project**.

1. Copy the repository URL (HTTPS), and clone the site locally:

    ```bash{promptUser: user}
    git clone https://gitlab.com/pantheondocs/agency-custom-upstream.git
    ```

1. `cd` into the project directory:

    ```bash{promptUser: user}
    cd agency-custom-upstream
    ```

</Tab>

<Tab title="Other" id="other">

Other Git hosting providers (like Azure DevOps or a self-hosted Bitbucket server) can be used, but we cannot detail specific instructions for every provider. You will need to create a new project in that system.

As detailed below, [Pantheon Support](/guides/support/contact-support/) will need to add this Custom Upstream for you from a support ticket.

</Tab>

</TabList>

## Pull in Core from Pantheon's Upstream

You must track Pantheon's corresponding upstream repository within the Custom Upstream to avoid incompatibilities.

1. Navigate to the Custom Upstream's root directory using the command line > add the appropriate Pantheon Upstream as a [remote](https://git-scm.com/docs/git-remote):

    <TabList>

    <Tab title="WordPress" id="wp1" active={true}>

    ```bash{promptUser: user}
    git remote add pantheon-wordpress https://github.com/pantheon-systems/WordPress.git
    ```

    </Tab>

    <Tab title="Drupal 9" id="d91">

    ```bash{promptUser: user}
    git remote add pantheon-drupal-9 https://github.com/pantheon-upstreams/drupal-composer-managed.git
    ```

    </Tab>

    <Tab title=" Drupal 7" id="d71">

    ```bash{promptUser: user}
    git remote add pantheon-drops-7 https://github.com/pantheon-systems/drops-7.git
    ```

    </Tab>

    </TabList>

1. Run the appropriate command below now that the Custom Upstream repository is tracking the corresponding Pantheon core upstream.

    <TabList>

    <Tab title="WordPress" id="wp1" active={true}>

    ```bash{promptUser: user}
    git checkout -b master
    git fetch pantheon-wordpress
    git merge pantheon-wordpress/master
    git push origin master
    ```

    </Tab>

    <Tab title="Drupal 9" id="d91">

    1. Pull and commit the core files:

     ```bash{promptUser: user}
     git checkout -b master
     git fetch pantheon-drupal-9 main
     git merge pantheon-drupal-9/main
     git push origin master
     ```

      - Drupal 9 on Pantheon includes [Integrated Composer](/guides/integrated-composer) to manage dependencies. This adds a separate `composer.json` file in the `upstream-configuration` directory.

    1. Change to the `composer.json` file in the `upstream-configuration` directory  and use `composer require` to add packages to the Upstream > set the `config version` to a number that makes sense for you:

     ```bash{promptUser: user}
     cd upstream-configuration
     composer require drupal/pkg-name --no-update
     ```

       - Note that the optional `--no-update` flag in this command should only be used in Upstreams (as we do here) to instruct Composer not to check for updates now. See [How to Add Dependencies to Your Upstream](/guides/integrated-composer/ic-upstreams) for more information about adding dependencies.

    1. Commit and push the changes:

     ```bash{promptUser: user}
     git commit -am "added composer dependencies"
     git push origin master
     ```

    </Tab>

    <Tab title=" Drupal 7" id="d71">

    ```bash{promptUser: user}
    git checkout -b master
    git fetch pantheon-drops-7
    git merge pantheon-drops-7/master
    git push origin master
    ```

    </Tab>

    </TabList>

## Connect Repository to Pantheon

<TabList>

<Tab title="GitHub" id="gh-auth" active={true}>

1. Navigate to the **[<span class="glyphicons glyphicons-group"></span> Organizations](https://dashboard.pantheon.io/#organizations)** tab within the Pantheon Dashboard and select your organization:

  ![Organization Dashboard](../../../images/dashboard/organizations.png)

1. Select **Debug** > click the **Upstreams** tab.

1. Click the **<span class="glyphicons glyphicons-plus"></span> Add New Upstream** button. You must be an Organization Administrator to add a new upstream.

1. Enter the following information about the Custom Upstream:

   - **Name**
   - **Upstream Repository URL**:

    ![GitHub HTTPS Repo URL](../../../images/github-https-url.png)

     - **Authenticate (private repositories only)**: If you provided the URL to a private repository, a new field will appear:

     ![GitHub Upstream Authentication](../../../images/dashboard/create-upstream-auth-gh.png)

     For privately hosted repositories, create a dedicated user with repository access. If your repository is publicly accessible, you can skip this step.

      1. Click [Go to GitHub to generate a personal access token](https://github.com/settings/tokens).

      1. Click **Generate new token**.

      1. Confirm your password if prompted.

      1. Enter a token description, such as "pantheon read my Custom Upstream"

      1. Select "repo" as the scope:

          ![GitHub generate token](../../../images/github-token.png)

      1. Click **Generate token** and copy the new token to your clipboard.

1. Return to the Pantheon Organization Dashboard where you are creating the Custom Upstream.

1. Paste your new GitHub access token.

   - **Framework**: Drupal 7, Drupal 9, or WordPress

   - **Description**: (Optional) Less than 200 characters, plain text and markdown supported

4. Click **Create**.

</Tab>

<Tab title="Bitbucket" id="bb-auth">

1. Navigate to the **[<span class="glyphicons glyphicons-group"></span> Organizations](https://dashboard.pantheon.io/#organizations)** tab within the Pantheon Dashboard and select your organization:

  ![Organization Dashboard](../../../images/dashboard/organizations.png)

1. Select **Debug** > click the **Upstreams** tab.

1. Click the **<span class="glyphicons glyphicons-plus"></span> Add New Upstream** button. You must be an administrator of the organization to add a new upstream.

1. Enter the following information about the Custom Upstream:

   - **Name**
   - **Upstream Repository URL**:

       ![Bitbucket HTTPS Repo URL](../../../images/bitbucket-https-url.png)

   - **Authenticate (private repositories only)**: If you provided the URL to a private repository, a new field will appear:

      ![BitBucket Upstream Authentication](../../../images/dashboard/create-upstream-auth-bb.png)

      For privately hosted repositories, create a dedicated user with repository access. If your repository is publicly accessible, you can skip this step.

        1. Go to Bitbucket to generate an [app password](https://bitbucket.org/account/admin/app-passwords).

        1. Click **Create app password**.

        1. Enter a label and select the `"Repositories:Read"` permission:

           ![Bitbucket app password](../../../images/bitbucket-app-password.png)

        1. Click **Create** and copy the new password.

        1. Return to the Pantheon Organization Dashboard, where you are creating the Custom Upstream.

        1. Paste your new Bitbucket app password. The username field should already be populated based on the repository URL. 

   - **Framework**: Drupal 7, Drupal 9, or WordPress
   - **Description**: (Optional) Less than 200 characters, plain text and markdown supported

1. Click **Create**.

</Tab>

<Tab title="GitLab" id="gitlab-auth">

A Custom Upstream from a GitLab repository must be set up for you by Pantheon Support.

1. Navigate to the repository > click **<i class="fa fa-gear"></i> Settings** > select **Repository**.

1. Click **Expand** next to **Deploy Tokens** and fill out the fields:

    - **Name**: Used to identify the token in GitLab.
    - **Expires at**: We recommend leaving this blank. If the token expires, you will need to create a new one and contact Pantheon Support again to update it.
    - **Username**: We suggest setting a custom username to provide to Pantheon Support.
    - Select the **read_repository** scope for the token.

    ![Adding a deploy token to a GitLab repository](../../../images/gitlab-deploy-token.png)

1. Click **Create deploy token** > save the token immediately to provide to Pantheon Support. GitLab will not show it again.

1. [Contact support](/guides/support/contact-support/) to add the Custom Upstream to your org. You must provide:

   - A name for the Custom Upstream,
   - The `https` clone URL (ending in `.git`),
   - The Username and Access Token for the deploy token.

</Tab>

<Tab title="Other" id="other-auth">

Custom Upstreams from other repository hosts must be created for you by Pantheon Support.
  
Common steps needed for most Git Providers are provided below.

1. Prepare a new user specifically for Pantheon access.

   - This new account will need to be accessible via API for Pantheon, it must also have access to the repository created in the earlier step.

1. [Contact support](/guides/support/contact-support/) to add the Custom Upstream to your org. You must provide:

    - A name for the Custom Upstream

    - The CMS within (WordPress, Drupal 7/9)

    - The `https` clone URL (ending in `.git`)

    - The username and Access Token for the new user

    - The name of the branch to be used by Pantheon (usually `master`)

</Tab>

</TabList>

### Initial Connection Mode

The default connection mode for new sites created from a Custom Upstream is Git for WordPress and Drupal 7. Drupal 9 defaults to SFTP connection mode.

Configure this setting after connecting your Custom Upstream to Pantheon if new sites need to use an initial connection mode other than the default:

1. Access the **Organization Dashboard** from your Admin dashboard.

1. Select **Debug** > click the **Upstreams** tab.

1. Enter the following:

    - Upstream Name

    - Description (optional)

    - URL of Logo (optional)

    - URL of Upstream Repository

    - Repository Authentication

      - This is only required if the repository is hosted privately. Enter username and a password or token. Access tokens must be alpha-numeric and cannot contain symbols.

    - Repository Branch

    - Visibility

      - Private: Only allow members of your organization to use this upstream.

      - Public: Allow this upstream to be used by any Pantheon user.

    - Initial Connection Mode

      - Select if **Git** or **SFTP** mode should be enabled by default > click **Update**. New sites created from this Custom Upstream will use this connection mode by default going forward.

    - Framework

    - Internal Notes (optional)

  ![Modify initial connection mode](../../../images/dashboard/initial-connection-mode.png)

1. Click **Submit**.

## More Resources

- [How to Add Dependencies to Your Upstream](/guides/integrated-composer/ic-upstreams)

- [Apply Upstream Updates Manually from the Command Line to Resolve Merge Conflicts](/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts)

- [Best Practices for Maintaining Custom Upstreams](/guides/custom-upstream/maintain-custom-upstream)

- [Troubleshoot a Custom Upstream](/guides/custom-upstream/troubleshooting)