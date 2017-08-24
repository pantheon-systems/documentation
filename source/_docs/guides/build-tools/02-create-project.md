---
title: Build Tools
subtitle: Create a New Project
anchorid: create-project
layout: guide
buildtools: true
generator: pagination
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/create-project/
nexturl: guides/build-tools/create-pr/
previousurl: guides/build-tools/
editpath: build-tools/02-create-project.md
---
Setting up multiple distributed services can be complicated, and, at the moment, this can only be done from the command line. Fortunately, the Terminus Build Tools Plugin makes this setup relatively simple.

In this section we'll create a new Pantheon Site, a corresponding GitHub repository, and configure CircleCI to run tests.

To begin, create a new project:

```bash
terminus build-env:create-project my-pantheon-project
```
Replace `my-pantheon-project` with the name of your new site.

The `create-project` command will prompt for any additional information it may need to set up the build workflow. The required information needed includes:

- GitHub [personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/).
- CircleCI [personal API token](https://circleci.com/account/api).
- Password for the CMS admin account, used to log in to your test environments.
- The Pantheon team the site should be associated with (recommended).

Answer the questions when prompted, as shown below:

![Create Project Prompts](/source/docs/assets/images/pr-workflow/build-env-create-project-prompts.png)

You can avoid prompting by providing the necessary information either via [environment variables](https://github.com/pantheon-systems/terminus-build-tools-plugin#credentials) or command line options. Run `terminus help build-env:create-project`, or see the [Terminus Build Tools Plugin project page](https://github.com/pantheon-systems/terminus-build-tools-plugin) for more information.

Once you have provided the required information, the rest of the process is automatic. Once your site is ready, the URL to your project page on GitHub will be printed to your terminal window. Copy this address and paste it into a browser to visit your new project.

## Your Project Page
Your project page will start off with a README file that is initially blank, save for the project title and three badges:

![Initial Project Page](/source/docs/assets/images/pr-workflow/initial-project-page.png)

The badges on your project page are linked to locations you will frequently visit while working on your site.

- The CircleCI page for your project
- Your Pantheon dashboard
- Your test site

Click on these badges to quickly navigate to the different components used to manage your site. If you click on the CircleCI badge, you can watch your project's initial test run. Once your tests successfully complete, the orange CircleCI "no tests" badge will become a green "passing" badge.
