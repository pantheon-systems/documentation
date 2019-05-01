---
title: Use Pantheon Localdev to Easily Develop and Maintain Sites Locally
description: Localdev makes it easy to manage your Sites locally with the Pantheon workflow.
tags: [manage, tools, workflow]
categories: []
earlyaccess: true
earlynote: The documentation on this page discusses features and options that are still in production.
contributors: edwardangert
---

Pantheon offers a number of [ways to connect to your site](/docs/guides/quickstart/connection-modes/). In addition to Git and SFTP modes, [Pantheon Localdev](https://github.com/pantheon-systems/localdev/){.external} gives you a graphical interface to your Pantheon sites, complete with a fully containerized local environment that and makes it easy to develop your site locally while still maintaining the [Pantheon Workflow](/docs/pantheon-workflow/).

## Install Docker Desktop for Mac

Follow the instructions at [Docker.com](https://docs.docker.com/docker-for-mac/install/){.external}, or install using homebrew:

<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#install-docker">Copy</button>
<figure><pre id="install-docker"><code class="command bash" data-lang="bash">brew cask install docker</code></pre></figure></div>

## Install and Connect Localdev

You will need to [create machine token](/docs/machine-tokens/#create-a-machine-token) before you continue.

1.  Download and install the [latest Localdev](http://pantheon-localdev.s3.amazonaws.com/localdev-latest-dev.dmg){.external} `.dmg`
1.  Localdev checks the Docker installation. Once it's done, click **Continue installation**
1.  Enter the machine token you created for Localdev. Click **View your Pantheon machine tokens** to open a browser to the Machine Tokens tab of your account.
1.  Click **Submit Token** and wait for it to connect
1.  Click **Begin sync** to synchronize Localdev with your account

    Once Localdev is installed, a list of your sites is displayed in a column on the left.

## Connect and Clone your Site Locally

Select a site and click **Pull for local development** to clone the site locally and boot the local environment.

This will take a few minutes.

If the process fails, check your site's PHP version by navigating to **Settings** in your Site's Dashboard. Currently, Localdev does not work for sites using PHP 7.3 or higher. After an error, Localdev will revert all changes and return you to the "Clone your development site" screen.

## Start the Container



## Logging out of Localdev

This will remove the machine token and all local copies of your connected sites.

1.  Click **Settings**
1.  **Reset to defaults**
1.  **Proceed with reset**
