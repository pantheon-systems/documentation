---
title: Create a Custom Upstream
description: Connect a remote repository with Pantheon to use as a starting point for new sites.
tags: [tools, workflow]
---
Pantheon Custom Upstreams are a self-serve feature available to anyone with access to the Organization Dashboard of an eligible plan. Once created, members of the organization will be able to create new sites from a set common codebase. For an overview of this feature, see [Introduction to Custom Upstreams](/docs/custom-upstream/). In order to use a specific Custom Upstream on multiple Organizations, the upstream must be created within each Organization’s Dashboard.

<Alert title="Note" type="info">

Be aware that support for Custom Upstreams is limited to verification that the externally hosted upstream repository is connected properly to the platform. For details, see [Get Support](/docs/support/#custom-upstreams).

</Alert>


## Create and Host the Repository Remotely
This remote repository serves as the central location for the development and maintenance of your Custom Upstream. Changes are tracked here and distributed downstream to sites within your Organization as one-click updates in the Site Dashboard.

Choose your preferred Git host:

<TabList>

<Tab title="GitHub" id="gh" active={true}>

1. [Sign up for a GitHub account](https://github.com/join) if you do not have one already.

2. [Log in to GitHub](https://github.com/login/).

3. If this is your first time logging in to GitHub, click [**Start Project**](https://github.com/new). Otherwise, click [**New**](https://github.com/new) from the Repositories sidebar on the left.

4. Name the repository.

5. Select whether the repository will be private or if it can be publicly accessible from outside your organization.

   **Do not** select the options to create a `README`, `.gitignore`, or license file:

   ![GitHub Initialization options](../docs/assets/images/github-create-readme.png)

6. Click **Create Repository**.

7. Copy the repository URL (HTTPS), found in the Quick setup section:

  ![GitHub Repo URL](../docs/assets/images/github-repo-url.png)

8. Clone the repository to your local from the command line (replace the URL):

  ```
  git clone https://github.com/pantheondocs/agency-custom-upstream.git
  ```

9. Navigate to the repository's root directory:

  ```
  cd agency-custom-upstream
  ```


</Tab>

<Tab title="Bitbucket" id="bb">

1. [Sign up for a Bitbucket account](https://bitbucket.org/account/signup/) if you do not have one already.

2. [Log in to Bitbucket](https://bitbucket.org/account/signin/) and navigate to [**Repositories**](https://bitbucket.org/dashboard/repositories).

3. Click [**Create a Repository**](https://bitbucket.org/repo/create).

4. Name the repository.

5. Select whether the repository will be private or if it can be publicly accessible from outside your organization.

6. Click **Create Repository**.

7. Copy the repository URL (HTTPS), found on the top right of the page:

  ![Bitbucket Repo URL](../docs/assets/images/bitbucket-repo-url.png)

8. Clone the repository to your local from the command line (replace the URL):

  ```
  git clone https://pantheondocs@bitbucket.org/pantheondocs/agency-custom-upstream.git
  ```

9. Navigate to the repository's root directory:

  ```
  cd agency-custom-upstream
  ```

</Tab>

<Tab title="GitLab" id="gitlab">

You can [sign up](https://gitlab.com/users/sign_in) for a GitLab.com account, or use a self-managed GitLab installation.

1. From your GitLab dashboard click **New project**.

2. Provide a **Project name**, **Project description** (optional), and **Visibility Level**, then click **Create project**.

3. Copy the repository URL (HTTPS), and clone the site locally:

    ```bash
    git clone https://gitlab.com/pantheondocs/agency-custom-upstream.git
    ```

4. `cd` into the project directory:

    ```bash
    cd agency-custom-upstream
    ```


</Tab>

</TabList>

## Pull in Core from Pantheon's Upstream
To avoid incompatibilities, you must track Pantheon's corresponding upstream repository within the Custom Upstream.

1. Navigate to the Custom Upstream's root directory using the command line, then add the appropriate Pantheon upstream as a [remote](https://git-scm.com/docs/git-remote):

    <TabList>

    <Tab title="WordPress" id="wp1" active={true}>

    ```bash
    git remote add pantheon-wordpress git://github.com/pantheon-systems/WordPress.git
    ```

    </Tab>

    <Tab title="Drupal 8" id="d81">

    ```bash
    git remote add pantheon-drops-8 git://github.com/pantheon-systems/drops-8.git
    ```

    </Tab>

    <Tab title=" Drupal 7" id="d71">

    ```bash
    git remote add pantheon-drops-7 git://github.com/pantheon-systems/drops-7.git
    ```

    </Tab>

    </TabList>

2. Now that the Custom Upstream repository is tracking the corresponding Pantheon core upstream, we can pull in core:

    <TabList>

    <Tab title="WordPress" id="wp1" active={true}>

    ```bash
    git checkout master
    git fetch pantheon-wordpress
    git merge pantheon-wordpress/master
    git push origin master
    ```

    </Tab>

    <Tab title="Drupal 8" id="d81">

    ```bash
    git checkout master
    git fetch pantheon-drops-8
    git merge pantheon-drops-8/master
    git push origin master
    ```

    </Tab>

    <Tab title=" Drupal 7" id="d71">

    ```bash
    git checkout master
    git fetch pantheon-drops-7
    git merge pantheon-drops-7/master
    git push origin master
    ```

    </Tab>

    </TabList>

## Connect Repository to Pantheon

<TabList>

<Tab title="GitHub" id="gh-auth" active={true}>
  1. Navigate to the **[<span class="glyphicons glyphicons-group"></span> Organizations](https://dashboard.pantheon.io/#organizations" target="blank)** tab within the Pantheon Dashboard and select your organization:

    ![Organization Dashobard](../docs/assets/images/dashboard/organizations.png)

  2. Select the **<span class="upstreams-regular"></span> Upstreams** tab.
  3. Click the **<span class="glyphicons glyphicons-plus"></span> Add New Upstream** button. You must be an administrator of the organization to add a new upstream.
  4. Enter the following information about the Custom Upstream:

      * **Name**
      * **Upstream Repository URL**:

            ![GitHub HTTPS Repo URL](../docs/assets/images/github-https-url.png)


          * **Authenticate (private repositories only)**: If you provided the URL to a private repository, a new field will appear:

              ![GitHub Upstream Authentication](../docs/assets/images/dashboard/create-upstream-auth-gh.png)

            For privately hosted repositories, create a dedicated user with repository access. If your repository is publicly accessible, you can skip this step.

            1. Go to GitHub to [generate a personal access token](https://github.com/settings/tokens).
            2. Click **Generate new token**.
            3. Confirm your password if prompted.
            4. Enter a token description, such as "pantheon read my Custom Upstream"
            5. Select "repo" as the scope:

                ![GitHub generate token](../docs/assets/images/github-token.png)

            6. Click **Generate token** and copy the new token to your clipboard.
            7. Return to the Pantheon Organization Dashboard, where you are creating the Custom Upstream.
            8. Paste your new GitHub access token.

      * **Framework**: Drupal 7, Drupal 8, or WordPress
      * **Description**: (Optional) Less than 200 characters, plain text and markdown supported


  4. Click **Create**.

</Tab>

<Tab title="Bitbucket" id="bb-auth">

  1. Navigate to the **[<span class="glyphicons glyphicons-group"></span> Organizations](https://dashboard.pantheon.io/#organizations" target="blank)** tab within the Pantheon Dashboard and select your organization:

    ![Organization Dashobard](../docs/assets/images/dashboard/organizations.png)

  2. Select the **<span class="upstreams-regular"></span> Upstreams** tab.
  3. Click the **<span class="glyphicons glyphicons-plus"></span> Add New Upstream** button. You must be an administrator of the organization to add a new upstream.
  4. Enter the following information about the Custom Upstream:

      * **Name**
      * **Upstream Repository URL**:

            ![Bitbucket HTTPS Repo URL](../docs/assets/images/bitbucket-https-url.png)

      * **Authenticate (private repositories only)**: If you provided the URL to a private repository, a new field will appear:

        ![BitBucket Upstream Authentication](../docs/assets/images/dashboard/create-upstream-auth-bb.png)

        For privately hosted repositories, create a dedicated user with repository access. If your repository is publicly accessible, you can skip this step.

          1. Go to Bitbucket to generate an [app password](https://bitbucket.org/account/admin/app-passwords).
          2. Click **Create app password**.
          3. Enter a label and select the `"Repositories:Read"` permission:

            ![Bitbucket app password](../docs/assets/images/bitbucket-app-password.png)

          4. Click **Create** and copy the new password.
          5. Return to the Pantheon Organization Dashboard, where you are creating the Custom Upstream.
          6. The username field should already be populated, based on the repository URL. Paste your new Bitbucket app password.

      * **Framework**: Drupal 7, Drupal 8, or WordPress
      * **Description**: (Optional) Less than 200 characters, plain text and markdown supported

  4. Click **Create**.

</Tab>

<Tab title="Gitlab" id="gitlab-auth">

  Custom Upstreams from GitLab repositories must be created for you by Pantheon Support.

  1. Prepare a new GitLab user specifically for Pantheon access.

  1. From this new account, [generate an Access Token](https://gitlab.com/profile/personal_access_tokens) with the `API` scope:

      ![GitLab Personal Access Token](../docs/assets/images/gitlab-api.png)

  1. From the GitLab account that maintains the repository, add the new user to the repo under **Members** with **Reporter** access.

      ![GitLab reporter permission](../docs/assets/images/gitlab-reporter.png)

  1. [Contact support](/docs/support/) to add the Custom Upstream to your org. You must provide:

     - A name for the custom upstream
     - The `https` clone URL (ending in `.git`)
     - The Access Token for the new user.


</Tab>

</TabList>


## Edit Existing Custom Upstream Settings
If you would like to change the name or description of your Custom Upstream:

1. Navigate to the **[<span class="glyphicons glyphicons-group"></span> Organizations](https://dashboard.pantheon.io/#organizations" target="blank)** tab within the Pantheon Dashboard and select your organization.
2. Select the **<span class="upstreams-regular"></span> Upstreams** tab.
3. Click **Settings** next to the existing upstream requiring an update.
4. Make desired changes, then click **Update**.

### Initial Connection Mode
The default connection mode for new sites created from a Custom Upstream is Git for WordPress and Drupal 7. Drupal 8 defaults to the SFTP connection mode.

Configure this setting after connecting your Custom Upstream to Pantheon if new sites need to use an initial connection mode other than the default:

1. Navigate to the **[<span class="glyphicons glyphicons-group"></span> Organizations](https://dashboard.pantheon.io/#organizations" target="blank)** tab within the Pantheon Dashboard and select your organization.
2. Select the **<span class="upstreams-regular"></span> Upstreams** tab.
3. Click **Settings** next to the existing upstream requiring an update.
4. Select the desired connection mode, then click **Update**:

  ![Modify initial connection mode](../docs/assets/images/dashboard/initial-connection-mode.png)

New sites created from this Custom Upstream will use this connection mode by default going forward.

### Repository URL and password
You cannot modify the repository details on existing Custom Upstreams. If there is a new URL or password you need to use, we recommend creating a new Custom Upstream and switching each site to the new upstream individually with [Terminus](/docs/terminus/):

```bash
terminus site:upstream:set my-site "My New Custom Upstream"
```

You must be a site owner to switch a site's upstream. After a site's upstream has been changed, you will need to merge changes as a one-click update. For details, see [Example Usage](/docs/terminus/examples/#switch-upstreams).

Once all sites have been updated to track the new Custom Upstream, you can safely delete the old one:

1. Navigate to the **[<span class="glyphicons glyphicons-group"></span> Organizations](https://dashboard.pantheon.io/#organizations" target="blank)** tab within the Pantheon Dashboard and select your organization.
2. Select the **<span class="upstreams-regular"></span> Upstreams** tab.
3. Click **Settings** next to the existing upstream, then click **Delete**.

## Switch an Existing Site to a Custom Upstream

<Alert title="Warning" type="danger">

Switching the upstream of an existing site is risky. Consider creating a new site from your Custom Upstream and migrating the contents. If you must switch upstreams, [back up](/docs/backups/) your site first, and consider our documentation on [upstream merge conflicts](/docs/core-updates/#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts).

</Alert>

Only a Site Owner, User in Charge, or Organization Administrator can change an existing site to use a new Custom Upstream using [Terminus](/docs/terminus/):

```bash
terminus site:upstream:set $site $upstream_id
```

In the example above, set or replace the variables `$site` and `$upstream_id` with your site name and upstream machine name, respectively. You can find your Custom Upstream's machine name using `terminus org:upstream:list $org`, where `$org` is your organization name.

## Next Steps
- [Best Practices for Maintaining Custom Upstreams](/docs/maintain-custom-upstream)
- [Switching an Existing site to a Custom Upstream with Terminus](/docs/terminus/examples/#switch-upstreams)
