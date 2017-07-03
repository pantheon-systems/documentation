---
title: Early Access: Create a Custom Upstream
description: Connect a remote repository with Pantheon to use as a starting point for new sites.
tags: [tools, workflow]
earlyaccess: true
earlynote: The documentation on this page discusses features and options that are not available across the entire platform.
---
Pantheon is rolling out a new self-serve feature to support creating Custom Upstreams in the Organization Dashboard. Once created, members of the organization will be able to create new sites from the common codebase. For an overview of this feature, see [Introduction to Custom Upstreams](/docs/custom-upstream).

## Eligibility
Access to this feature is currently invite only for Agency and Enterprise Organizations. Repositories must be hosted on [GitHub](https://github.com/) or [BitBucket](https://bitbucket.org/). If you would like early access to this feature, or if you need to use an alternate repository hosting provider, please let us know.

**TODO ADD LINK TO REQUEST INVITE**

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
      <li id="d7tab1" role="presentation"><a href="#d71" aria-controls="d71" role="tab" data-toggle="tab">Drupal 7</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="wp1">
    <pre id="git-pull-wp"><code class="command hljs" data-lang="hljs">git remote add pantheon-wordpress git://github.com/pantheon-systems/WordPress.git</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d81">
    <pre id="git-pull-drops-8"><code class="command hljs" data-lang="hljs">git remote add pantheon-drops-8 git://github.com/pantheon-systems/drops-8.git</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d71">
    <pre id="git-pull-drops-7"><code class="command hljs" data-lang="hljs">git remote add pantheon-drops-7 git://github.com/pantheon-systems/drops-7.git</code></pre>
    </div>
    </div><br>

2. Now that the Custom Upstream repository is tracking the corresponding Pantheon core upstream, we can pull in core:
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li id="wptab" role="presentation" class="active"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
      <li id="d8tab" role="presentation"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li id="d7tab" role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="wp">
    <pre id="git-pull-wp"><code class="command hljs" data-lang="hljs">git checkout master
    git fetch pantheon-wordpress
    git merge pantheon-wordpress/master
    git push origin master</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d8">
    <pre id="git-pull-drops-8"><code class="command hljs" data-lang="hljs">git checkout master
    git fetch pantheon-drops-8
    git merge pantheon-drops-8/master
    git push origin master</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d7">
    <pre id="git-pull-drops-7"><code class="command hljs" data-lang="hljs">git checkout master
    git fetch pantheon-drops-7
    git merge pantheon-drops-7/master
    git push origin master</code></pre>
    </div>
    </div>

## Connect Repository to Pantheon
1. Access the **<span class="upstreams-regular"></span> Upstreams** page in your Pantheon Organization Dashboard.
2. Click the **<span class="glyphicons glyphicons-plus"></span> Add New Upstream** button.
3. Enter the following information about the Custom Upstream:

    * **Name**
    * **Upstream Repository URL**: The HTTPS URL, which must end in `.git`:

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

    * **Framework**: Drupal 6 / Drupal 7, Drupal 8, WordPress, WordPress Site Network
    * **Description**: (Optional) Less than 200 characters, plain text and markdown supported

4. Click **Create**.
## Edit Existing Custom Upstream Settings
If you would like to change the name or description of your Custom Upstream:

1. From your Organization Dashboard, click the **<span class="upstreams-regular"></span> Upstreams** tab.
2. Click **Settings** next to the existing upstream requiring an update.
3. Make desired updates.
4. Click **Update**.
### Switch the Repository URL
At this time, we do not support changing the repository URL (source) on existing Custom Upstreams. If there is a new URL you need to use, we recommend creating a new Custom Upstream and switching each site to the new upstream individually with [Terminus](/docs/terminus/):

```
terminus site:upstream:set my-site "My New Custom Upstream"
```

After a site's upstream has been changed, you will need to merge changes as a one-click update. For details, see [Example Usage](/docs/terminus/examples/#switch-upstreams).

Once all sites have been updated to track the new Custom Upstream, you can safely delete the old one:

1. From your Organization Dashboard, click the **<span class="upstreams-regular"></span> Upstreams** tab.
2. Click **Settings** next to the existing upstream requiring an update.
3. Click **Delete**.

## Next Steps
- [Best Practices for Maintaining Custom Upstreams](/docs/maintain-custom-upstream)
