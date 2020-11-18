---
title: Use Pantheon Localdev to Develop Sites Locally
description: Localdev makes it easy to develop your sites locally with the Pantheon workflow.
categories: [develop]
tags: [localdev, local, workflow]
contributors: [edwardangert]
reviewed: "2020-12-04"
---

Pantheon offers a number of [ways to connect to your site](/guides/quickstart/connection-modes). In addition to Git and SFTP modes, [Pantheon Localdev](https://pantheon.io/localdev) gives you a graphical interface to your Pantheon sites, complete with a containerized local environment that makes it easy to develop and preview your site locally while still maintaining [Pantheon Workflow](/pantheon-workflow).

Localdev lets you [use an integrated development environment (**IDE**)](#use-a-local-ide-to-develop-your-pantheon-site) to edit files and code, and push changes to Pantheon right from your desktop. Use it if you want to avoid the command line, or to develop sites with a fully functional local preview.

## Install and Connect Localdev

If you have an older version of Localdev already installed on your machine, remove it to avoid potential compatibility issues. Newer versions of Localdev include support for automatic updates.

1. Download and install the [latest Localdev](https://pantheon-localdev.s3.amazonaws.com/localdev-stable.dmg) `.dmg`.

1. Localdev checks the Docker installation. Once it's done, click **Continue installation**.

    - If you leave the **Allow Localdev to report usage and errors** box checked, anonymous usage and will be reported to help improve the application. You can change this setting again later if you change your mind.

1. [Create a machine token](/machine-tokens/#create-a-machine-token) for Localdev:

    1. Click the **here** link in Localdev's **Connect Pantheon account** step to open a browser to the **Create New Token** section of your Pantheon Dashboard.
    1. Click **Generate token** to keep the pre-populated name and create a token.
    1. Copy the **Machine Token** from the modal that appears. This token will only be shown once, so go to the next step before you click **I understand**.
    1. In Localdev, paste the token into the box below **Enter your Machine Token** and click **Submit**.

     ![Connect a Pantheon Account with a Machine Token](../images/localdev/localdev-install-connect-account.png)

1. Once Localdev successfully authenticates your account, click **Start** to sync your account with Localdev.

    - If you still have **Your new machine token is ready** in your browser from the previous step, click **I understand** there to close that modal.

1. Click **Go to Localdev** to show the Localdev dashboard.

Once Localdev is installed and synced, a list of your sites is displayed in a column on the left:

![Localdev's dashboard shows a list of sites](../images/localdev/localdev-dashboard.png)

## Connect and Clone your Site Locally

Select a site from the **Sites** panel on the left, and **Choose an Environment** if the site has any Multidev environments. Click **Pull for local development** to clone the site locally and boot the local environment. This process will take several minutes.

Each site is cloned to its own directory within `~/Localdev/` by default. If your site specifies `web_docroot: true` in its [pantheon.yml](/pantheon-yml/#site-local-configurations-pantheonyml) or [pantheon.upstream.yml](/pantheon-yml/#custom-upstream-configurations-pantheonupstreamyml) file (a nested docroot) the site's code will be located in the `web` subdirectory.

![Localdev clones the site code](../images/localdev/localdev-cloning-site.png)

Since this is the first time you are cloning the entire site code, this will take several minutes. Unless you [reset Localdev to its defaults](#log-out-and-reset-to-defaults), you will only need to do this once per site.

If there are any errors, Localdev will revert all changes and return you to the "Clone your development site" screen. Try the process again, then consult the [Troubleshooting section](#faq-troubleshooting-and-support) below for how to contact Support.

### The Localdev Site Screen

![Screenshot of the Localdev Site screen](../images/localdev/localdev-site-running-screen.png)

Sometimes the lower right corner says **site started**, sometimes **your site is ready to go!**

## Start and Stop the Container

When you first pull a Site for local development, Localdev automatically starts a Docker container for it in way that closely resembles [Pantheon's Platform architecture](https://pantheon.io/features/elastic-hosting?docs). This allows you to develop your site locally, without risking compatibility issues once synced.

To start a stopped site container, click the grey **Stopped** button in the upper right-hand corner and click **Start** to start the local server.

![In the Stopped button's dropdown, click Start](../images/localdev/localdev-start-destroy.png)

Once the container has been started, you can preview the site using the **Open Browser** button in the **Local Site** row in the <i className="fa fa-wrench"></i> **Develop** tab, and track changed files using the <i className="fa fa-arrow-down"></i> **Pull** and <i className="fa fa-arrow-up"></i> **Push** tabs.

![Localdev Develop tab shows that the container is running](../images/localdev/localdev-develop-tab-container-running.png)

## Your Pantheon Site in Localdev

- Not local yet cloud: <i className="fa fa-cloud"></i>
- Container stopped: <i className="fa fa-stop-circle"></i>
- Container started: <i className="fa fa-play-circle"></i>
- Develop tab: <i className="fa fa-wrench"></i>
- Pull tab: <i className="fa fa-arrow-down"></i>
- Push tab: <i className="fa fa-arrow-up"></i>
- Config tab: <i className="fa fa-cog"></i>
- Advanced tab: <i className="fa fa-bolt"></i>
- Logs tab: <i className="fa fa-bug"></i>

screenshot

Open Browser
Open Dashboard
Open Finder
Launch terminal

/hosts-file#configure-your-hosts-file-with-a-local-alias-to-your-pantheon-environment


## Use a Local IDE to Develop your Pantheon Site

There are a number of IDEs that have built-in Git tools or plugins available for working with Git from within the IDE:

- [Atom](https://atom.io/)
- [Sublime Text](https://www.sublimetext.com/)
- [TextMate](https://macromates.com/)
- [Visual Studio Code](https://code.visualstudio.com)
- [PhpStorm](https://www.jetbrains.com/phpstorm)

See your editor's documentation for specific steps on how to commit and push changes from inside the editor.

## Push and Pull Changes to Pantheon

If you have a Git client that you're already comfortable with, you can use it to track, commit, push, and pull as you normally would. Navigate or point your Git client to track your local code directory, for example: `/Users/yourUser/Localdev/examplesite`.

To have Localdev deal with Git for you, use the **Pull** and **Push** tabs.

In **Pull** tab, check the **Pull code** option to copy the site's code from the Pantheon Dev environment to your local environment. The *Last Pull* line below each option's area shows the last time the code was synched.

After you make changes to your site:

1. Navigate to the **Push** tab
1. Select the information you want pushed to the Pantheon Development environment
1. Enter a **Git commit message** that describes the changes made in this particular push
1. Click **Push**

## Advanced Steps

For users looking to be more hands on and willing to use the terminal, try [Terminus](/terminus) and [Lando](https://docs.devwithlando.io/started.html). The [Local Development](/local-development) doc can help you get started.

## Download and Test Beta Versions

Download Edge versions to get the latest features, bug fixes, instructions, and help test Localdev.

Note that some versions of Localdev are not compatible with some versions of Docker. See GitHub for more information, or (we don't recommend this) to continue with an untested version of Docker, you can turn off the compatibility check in Localdev's settings.

1. From within your Localdev installation, select Settings in left menu.

1. In the Current Version section, click on `switch to edge`:

  ![Switch to edge version](../images/localdev/localdev-switch-to-edge.png)

<Alert type="info" title="Note">

Help improve Localdev by sharing bug reports and feedback in the [GitHub issue queue](https://github.com/pantheon-systems/localdev-issues), or join the [Pantheon Community](/pantheon-community) to post in the [Localdev Slack channel](https://pantheon-community.slack.com/messages/CB2H8065D). Get your [Slack invite here](https://slackin.pantheon.io/).

</Alert>

## FAQ, Troubleshooting, and Support

### What does Localdev do about existing Lando config files?

Localdev will use the existing `.lando` file only when the site is initially cloned. After the initial site clone, there is currently no `lando rebuild` equivalent that will force Localdev to reconsider the landofile.

Note that if there are services specified in `.lando`, Localdev will return an error.

### Can WordPress Site Networks be developed through Localdev?

At this time, WordPress Site Network (also known as WordPress Multisite) development is not supported through Localdev.

### How do you configure PHP versions for sites in the LocalDev environment?

LocalDev will [respect the changes made to your local `pantheon.yml`](/php-versions#configure-php-version) file.

A force rebuild is required for changes in `pantheon.yml` to take effect:

![Force Rebuild your app in LocalDev](../images/localdev/localdev-rebuild.png)

You can verify which version of PHP your site is using by clicking **Launch Terminal**, then running `php -v`:

![Verify your app's version of PHP](../images/localdev/localdev-php-version.png)

### Contact Support / File an Issue

While Localdev is in beta, [support request best practices](/support/#best-practices) are especially important for our team to help you resolve the issue, or to report any potential issues in Localdev itself.

1. Navigate to the **Settings** tab and confirm that *Usage and Crash Data* is set to **Allow reports**. This allows the application to automatically submit crash data to Pantheon Support.

   - Application reports are collected and stored locally in `~/.pantheonlocaldev`.

1. Reproduce the error and note the steps taken.

   - If the error is inconsistent, make note of this as well. Multiple reports of an inconsistent error help our team troubleshoot.

1. Report the error:

   - [Contact Support via your Dashboard](https://dashboard.pantheon.io/#support/support/all) or [via Chat](/support/#real-time-chat-support) and include the steps you took to reproduce the error.

### Provide Feedback or Feature Requests

Please submit feedback and feature requests through the [Pantheon Localdev Customer Feedback](https://docs.google.com/forms/d/e/1FAIpQLSdy2WU7H3bSd94YmEuTvGhzmmT_xP3LlCgORXOkTt-M8UIAXw/viewform) form.

### Log out and Reset to Defaults

The steps in this section should only be used as a last resort. This resets Localdev and will remove the machine token and all local copies of your connected sites.

1. Click **Settings**

1. **Reset to defaults**

1. **Proceed with reset**

## Docs: FA icons Localdev uses

- Not local yet cloud: <i className="fa fa-cloud"></i>
- Container stopped: <i className="fa fa-stop-circle"></i>
- Container started: <i className="fa fa-play-circle"></i>
- Develop tab: <i className="fa fa-wrench"></i>
- Pull tab: <i className="fa fa-arrow-down"></i>
- Push tab: <i className="fa fa-arrow-up"></i>
- Config tab: <i className="fa fa-cog"></i>
- Advanced tab: <i className="fa fa-bolt"></i>
- Logs tab: <i className="fa fa-bug"></i>
## Changelog

<LocaldevChangelog />
