---
title: Use Pantheon Localdev to Easily Develop and Maintain Sites Locally
description: Localdev makes it easy to manage your Sites locally with the Pantheon workflow.
tags: [manage, tools, workflow]
categories: []
earlyaccess: true
earlynote: The documentation on this page discusses features and options that are still in production.
contributors: edwardangert
---

Pantheon offers a number of [ways to connect to your site](/docs/guides/quickstart/connection-modes/). In addition to Git and SFTP modes, [Pantheon Localdev](https://github.com/pantheon-systems/localdev/){.external} gives you a graphical interface to your Pantheon sites, complete with a fully containerized local environment that makes it easy to develop your site
locally while still maintaining the [Pantheon Workflow](/docs/pantheon-workflow/).

Localdev lets you [use an integrated development environment (**IDE**)](#use-a-local-ide-to-develop-your-pantheon-site) to edit and transfer files right from your desktop. Many IDEs also help take care of the Git steps, so your site stays current and properly version controlled.

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

If there are any errors, Localdev will revert all changes and return you to the "Clone your development site" screen.

## Start the Container

## Use a Local IDE to Develop your Pantheon Site

There are a number of IDEs that have built-in Git tools or plugins available for working with Git from within the IDE:
- [Atom](https://atom.io/)
- [Sublime Text](https://www.sublimetext.com/)
- [TextMate](https://macromates.com/)
- [Visual Studio Code](https://code.visualstudio.com)

In Atom, pushing changes to your site will look something like:



See your editor's documentation for specific steps on how to commit and push changes.

## Limitations

Localdev does not connect to [Multidev](/docs/multidev/) environments or allow direct database access.

## FAQ and Troubleshooting

### Log out and Reset to Defaults

This will remove the machine token and all local copies of your connected sites.

1.  Click **Settings**
1.  **Reset to defaults**
1.  **Proceed with reset**
