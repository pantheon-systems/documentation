---
title: Pantheon Localdev
subtitle: Install & Configure
description: Download, install, and configure Localdev on your workstation.
categories: [develop]
tags: [localdev, local, workflow]
contributors: [edwardangert, alexfornuto]
reviewed: "2020-12-04"
layout: guide
permalink: docs/guides/localdev/install-configure
anchorid: localdev/install-configure
editpath: localdev/02-install-configure.md
---

This section provides information on installing Localdev on your machine.

1. Remove older pre-release versions of Localdev if already installed on your machine to avoid potential compatibility issues. Stable Lando releases include support for automatic updates.

1. Download and install the [latest Localdev](https://pantheon-localdev.s3.amazonaws.com/localdev-stable.dmg) `.dmg` file.

1. Click **Continue installation** after Localdev checks the Docker installation (Localdev will install or update Docker it for you if needed). 

    - If you leave the **Allow Localdev to report usage and errors** box checked, anonymous usage and errors and will be reported to help improve the application. You can change this setting again later if you change your mind.

    - The Docker window may open several times instructing you to start the Docker server. You can ignore this and minimize the window.

1. [Create a machine token](/machine-tokens/#create-a-machine-token) for Localdev:

    1. Click the **here** link in Localdev's **Connect Pantheon account** step to open a browser to the **Create New Token** section of your Pantheon Dashboard.
    1. Click **Generate token** to keep the pre-populated name and create a token.
    1. Copy the **Machine Token** from the modal. This token will only be shown once, so go to the next step before you click **I understand**.
    1. Navigate to Localdev > paste the token into the box below **Enter your Machine Token** > click **Submit**.

      ![Connect a Pantheon Account with a Machine Token](../../../images/localdev/localdev-install-connect-account.png)

1. Click **Start** to sync your account with Localdev after Localdev successfully authenticates your account.

    - If you still have **Your new machine token is ready** in your browser from the previous step, click **I understand** there to close the modal.

1. Click **Go to Localdev** to see the Localdev dashboard.

A list of your sites is displayed in a column on the left after Localdev is installed and synced.

![Localdev's dashboard shows a list of sites](../../../images/localdev/localdev-dashboard.png)

