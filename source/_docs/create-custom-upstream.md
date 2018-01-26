---
title: Create a Custom Upstream
description: Connect a remote repository with Pantheon to use as a starting point for new sites.
tags: [tools, workflow]
---
Pantheon Custom Upstreams are a self-serve feature available to anyone with access to the Organization Dashboard. Once created, members of the organization will be able to create new sites from a set common codebase. For an overview of this feature, see [Introduction to Custom Upstreams](/docs/custom-upstream). In order to use a specific Custom Upstream on multiple Organizations, the upstream must be created within each Organization’s Dashboard.

<div class="alert alert-info" role="alert" markdown="1">
#### Note {.info}
Be aware that support for Custom Upstreams is limited to verification that the externally hosted upstream repository is connected properly to the platform. For details, see [Get Support](/docs/getting-support/#custom-upstreams).
</div>


## Create and Host the Repository Remotely
This remote repository serves as the central location for the development and maintenance of your Custom Upstream. Changes are tracked here and distributed downstream to sites within your Organization as one-click updates in the Site Dashboard.

Choose your preferred Git host:

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#gh" aria-controls="gh" role="tab" data-toggle="tab">GitHub</a></li>
  <li role="presentation"><a href="#bb" aria-controls="bb" role="tab" data-toggle="tab">Bitbucket</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div markdown="1" role="tabpanel" class="tab-pane active" id="gh">
  1. <a href="https://github.com/join" target=blank>Sign up for a GitHub account</a> if you do not have one already.
  2. [Log in to GitHub](https://github.com/login/).
  3. If this is your first time logging into GitHub, click [**Start Project**](https://github.com/new). Otherwise, click [**New Repository**](https://github.com/new) from the Repository sidebar on the right.
  4. Name the repository.
  5. Select whether the repository will be private or if it can be publicly accessible from outside your organization.
  6. Click **Create Repository**.
  7. Copy the repository URL (HTTPS), found in the Quick setup section:

    ![GitHub Repo URL](/source/docs/assets/images/github-repo-url.png)

  8. Clone the repository to your local from the command line (replace the URL):

    ```
    git clone https://github.com/pantheondocs/agency-custom-upstream.git
    ```

  9. Navigate to the repository's root directory:

    ```
    cd agency-custom-upstream
    ```

  </div>
  <div markdown="1" role="tabpanel" class="tab-pane" id="bb">
  1. [Sign up for a Bitbucket account](https://bitbucket.org/account/signup/) if you do not have one already.
  2. [Log in to Bitbucket](https://bitbucket.org/account/signin/) and navigate to [**Repositories**](https://bitbucket.org/dashboard/repositories).
  3. Click [**Create a Repository**](https://bitbucket.org/repo/create).
  4. Name the repository.
  5. Select whether the repository will be private or if it can be publicly accessible from outside your organization.
  6. Click **Create Repository**.
  7. Copy the repository URL (HTTPS), found on the top right of the page:

    ![Bitbucket Repo URL](/source/docs/assets/images/bitbucket-repo-url.png)

  8. Clone the repository to your local from the command line (replace the URL):

    ```
    git clone https://pantheondocs@bitbucket.org/pantheondocs/agency-custom-upstream.git
    ```

  9. Navigate to the repository's root directory:

    ```
    cd agency-custom-upstream
    ```
  </div>
</div>

## Pull in Core from Pantheon's Upstream
To avoid incompatibilities, you must track Pantheon's corresponding upstream repository within the Custom Upstream.

1. Navigate to the Custom Upstream's root directory using the command line, then add the appropriate Pantheon upstream as a [remote](https://git-scm.com/docs/git-remote):
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li id="wptab1" role="presentation" class="active"><a href="#wp1" aria-controls="wp1" role="tab" data-toggle="tab">WordPress</a></li>
      <li id="d8tab1" role="presentation"><a href="#d81" aria-controls="d81" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li id="d7tab1" role="presentation"><a href="#d71" aria-controls="d71" role="tab" data-toggle="tab"> Drupal 7</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content no-border">
    <div role="tabpanel" class="tab-pane active" id="wp1"><div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#wp1copy">Copy</button>
    <figure><pre id="wp1copy"><code class="command bash" data-lang="bash">git remote add pantheon-wordpress git://github.com/pantheon-systems/WordPress.git</code></pre></figure>
    </div>
    </div>
    <div role="tabpanel" class="tab-pane" id="d81"><div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#d81copy">Copy</button>
    <figure><pre id="d81copy"><code class="command bash" data-lang="bash">git remote add pantheon-drops-8 git://github.com/pantheon-systems/drops-8.git</code></pre></figure></div>
    </div>
    <div role="tabpanel" class="tab-pane" id="d71"><div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#d71copy">Copy</button>
    <figure><pre id="d71copy"><code class="command bash" data-lang="bash">git remote add pantheon-drops-7 git://github.com/pantheon-systems/drops-7.git</code></pre></figure></div>
    </div>
    </div>

2. Now that the Custom Upstream repository is tracking the corresponding Pantheon core upstream, we can pull in core:
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li id="wptab" role="presentation" class="active"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
      <li id="d8tab" role="presentation"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li id="d7tab" role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content no-border">
    <div role="tabpanel" class="tab-pane active" id="wp"><div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#wp2copy">Copy</button>
    <figure><pre id="wp2copy"><code class="command bash" data-lang="bash">git checkout master
    git fetch pantheon-wordpress
    git merge pantheon-wordpress/master
    git push origin master</code></pre></figure></div>
    </div>
    <div role="tabpanel" class="tab-pane" id="d8"><div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#d82copy">Copy</button>
    <figure><pre id="d82copy"><code class="command bash" data-lang="bash">git checkout master
    git fetch pantheon-drops-8
    git merge pantheon-drops-8/master
    git push origin master</code></pre></figure></div>
    </div>
    <div role="tabpanel" class="tab-pane" id="d7"><div class="copy-snippet">
    <button class="btn btn-default btn-clippy" data-clipboard-target="#d72copy">Copy</button>
    <figure><pre id="d72copy"><code class="command bash" data-lang="bash">git checkout master
    git fetch pantheon-drops-7
    git merge pantheon-drops-7/master
    git push origin master</code></pre></figure></div>
    </div>
    </div>

## Connect Repository to Pantheon
1. Navigate to the **<a href="https://dashboard.pantheon.io/#organizations" target="blank"><span class="glyphicons glyphicons-group"></span> Organizations</a>** tab within the Pantheon Dashboard and select your organization:

  ![Organization Dashobard](/source/docs/assets/images/dashboard/organizations.png)

2. Select the **<span class="upstreams-regular"></span> Upstreams** tab.
3. Click the **<span class="glyphicons glyphicons-plus"></span> Add New Upstream** button. You must be an administrator of the organization to add a new upstream.
4. Enter the following information about the Custom Upstream:

    * **Name**
    * **Upstream Repository URL**:

        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="#gh-https" aria-controls="gh-auth" role="tab" data-toggle="tab">GitHub</a></li>
          <li role="presentation"><a href="#bb-https" aria-controls="bb-auth" role="tab" data-toggle="tab">Bitbucket</a></li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="gh-https" markdown="1">
            ![GitHub HTTPS Repo URL](/source/docs/assets/images/github-https-url.png)
          </div>
          <div role="tabpanel" class="tab-pane" id="bb-https" markdown="1">
          ![Bitbucket HTTPS Repo URL](/source/docs/assets/images/bitbucket-https-url.png)
          </div>
        </div>

    * **Authenticate (private repositories only)**: For privately hosted repositories, create a dedicated user with repository access. If your repository is publicly accessible, you can skip this step.

        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="#gh-auth" aria-controls="gh-auth" role="tab" data-toggle="tab">GitHub</a></li>
          <li role="presentation"><a href="#bb-auth" aria-controls="bb-auth" role="tab" data-toggle="tab">Bitbucket</a></li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="gh-auth" markdown="1">
          1. Go to GitHub to [generate a personal access token](https://github.com/settings/tokens).
          2. Click **Generate new token**.
          3. Confirm your password if prompted.
          4. Enter a token description, such as "pantheon read my custom upstream"
          5. Select "repo" as the scope:

            ![GitHub generate token](/source/docs/assets/images/github-token.png)

          6. Click **Generate token** and copy the new token to your clipboard.
          7. Return to the Pantheon Organization Dashboard, where you are creating the Custom Upstream.
          8. Paste your new GitHub access token.
          </div>
          <div role="tabpanel" class="tab-pane" id="bb-auth" markdown="1">
          1. Go to Bitbucket to generate an [app password](https://bitbucket.org/account/admin/app-passwords).
          2. Click **Create app password**.
          3. Enter a label and select the `"Repositories:Read"` permission:

            ![Bitbucket app password](/source/docs/assets/images/bitbucket-app-password.png)

          4. Click **Create** and copy the new password.
          5. Return to the Pantheon Organization Dashboard, where you are creating the Custom Upstream.
          6. The username field should already be populated, based on the repository URL. Paste your new Bitbucket app password.
          </div>
        </div>

    * **Framework**: Drupal 7, Drupal 8, or WordPress
    * **Description**: (Optional) Less than 200 characters, plain text and markdown supported

4. Click **Create**.
## Edit Existing Custom Upstream Settings
If you would like to change the name or description of your Custom Upstream:

1. Navigate to the **<a href="https://dashboard.pantheon.io/#organizations" target="blank"><span class="glyphicons glyphicons-group"></span> Organizations</a>** tab within the Pantheon Dashboard and select your organization.
2. Select the **<span class="upstreams-regular"></span> Upstreams** tab.
3. Click **Settings** next to the existing upstream requiring an update.
4. Make desired changes, then click **Update**.

### Initial Connection Mode
The default connection mode for new sites created from a Custom Upstream is Git for WordPress and Drupal 7. Drupal 8 defaults to the SFTP connection mode.

Configure this setting after connecting your Custom Upstream to Pantheon if new sites need to use an initial connection mode other than the default:

1. Navigate to the **<a href="https://dashboard.pantheon.io/#organizations" target="blank"><span class="glyphicons glyphicons-group"></span> Organizations</a>** tab within the Pantheon Dashboard and select your organization.
2. Select the **<span class="upstreams-regular"></span> Upstreams** tab.
3. Click **Settings** next to the existing upstream requiring an update.
4. Select the desired connection mode, then click **Update**:

  ![Modify initial connection mode](/source/docs/assets/images/dashboard/initial-connection-mode.png)

New sites created from this Custom Upstream will use this connection mode by default going forward.

### Switch the Repository URL
You cannot modify the repository URL on existing Custom Upstreams. If there is a new URL you need to use, we recommend creating a new Custom Upstream and switching each site to the new upstream individually with [Terminus](/docs/terminus/):

<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#terminus1copy">Copy</button>
<figure><pre id="terminus1copy"><code class="command bash" data-lang="bash">terminus site:upstream:set my-site "My New Custom Upstream"</code></pre></figure></div>

After a site's upstream has been changed, you will need to merge changes as a one-click update. For details, see [Example Usage](/docs/terminus/examples/#switch-upstreams).

Once all sites have been updated to track the new Custom Upstream, you can safely delete the old one:

1. Navigate to the **<a href="https://dashboard.pantheon.io/#organizations" target="blank"><span class="glyphicons glyphicons-group"></span> Organizations</a>** tab within the Pantheon Dashboard and select your organization.
2. Select the **<span class="upstreams-regular"></span> Upstreams** tab.
3. Click **Settings** next to the existing upstream, then click **Delete**.

## Next Steps
- [Best Practices for Maintaining Custom Upstreams](/docs/maintain-custom-upstream)
