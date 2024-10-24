[![Actively Maintained](https://img.shields.io/badge/Pantheon-Actively_Maintained-yellow?logo=pantheon&color=FFDC28)](https://docs.pantheon.io/oss-support-levels#actively-maintained-support)

Pantheon Documentation
======================

https://docs.pantheon.io/

This repository contains the [Pantheon](https://pantheon.io) documentation as well as the tools to build local test environments.

## Changelog
 - 2023/02: Pantheon Docs is now a [Pantheon Front-End site](https://docs.pantheon.io/guides/decoupled/overview) running Gatsby 4.
 - 2019/08: We've relaunched the project using [Gatsby](https://www.gatsbyjs.org) for faster development, and _much_ faster page speed.

### Contributing

Our docs are written in [Markdown](https://daringfireball.net/projects/markdown/) and extended with [MDX](https://github.com/mdx-js/mdx) components. The pages live in `source/content`. Read [CONTRIBUTING](<CONTRIBUTING.md>) for more details on contributing documentation improvements.

### Style Guide

Read [our Style Guide](https://docs.pantheon.io/style-guide) for our guidelines on how to write documentation.

## Local Installation

### Prerequisites

 - MacOS or Linux system (untested with Bash on Windows)
 - [Node.js](https://nodejs.org/en/)
 - [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
 - Gatsby CLI:

   ```bash
   npm install -g gatsby-cli
    ```

 - Alternatively, you can use [Lando](https://docs.lando.dev). Use Lando to bypass installing Node.js and the Gatsby CLI on your local machine. Lando requires a Docker version in the `2.1.0.0` - `3.1.99` range.

#### Mac Steps

This list of steps should work on a Mac with [Homebrew](https://brew.sh/):

```bash
brew install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install 18
npm install -g gatsby-cli
```

### Get the Code

Fork and clone this repository:

```bash
git clone git@github.com:pantheon-systems/documentation.git
cd documentation
```

### Create a GitHub API Token

We use the [gatsby-remark-embed-snippet](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-embed-snippet) to use files from GitHub in our docs. Before you can build a local development site, you need to provide a GitHub token to the environment:

1. Log in to GitHub and go to <https://github.com/settings/tokens>
1. Click **Generate new token**.
1. Give the token a name, expiration, and description.
1. Select your GitHub user as the resource owner.
1. For repository access, select **Only select repositories** and select your fork of this repository.
1. Under Repository permissions, choose **Access: Read-only** from the **Access** dropdown button for **Contents**.
1. Click **Generate token**.

#### GitHub Tokens (classic)

Alternatively, if you'd rather create a classic-style token:

1. Log in to GitHub and go to <https://github.com/settings/tokens>
1. Click **Generate new token (classic)**
1. Give the token a name and click the **public_repo** checkbox, then the **Generate Token** button at the bottom
1. Copy the token to your clipboard
1. In the root `documentation` directory, create a new file called `.env.development` and add (replacing `$TOKENHASH` ):

   ```bash
   GITHUB_API=$TOKENHASH
   ```

## Using GitHub Codespaces

A [GitHub Codespace](https://github.com/features/codespaces) can be used to test the site as well. To set up a Codespace, navigate to the branch you want to use as the base (e.g. `main`) and click the Code dropdown.

![Codespaces screenshot](/source/images/assets/codespaces-setup.png)

This will take you to a VSCode-like interface with a Terminal window. From here, export your GitHub API token you created in the previous step using the following command (replacing `$TOKENHASH` with your API token):

```bash{promptUser: user}
export GITHUB_API=$TOKENHASH
```

Now you can run `npm ci` and `npm start` in the Terminal panel at the bottom of the page. The docs site will build inside the Codespaces container and install Node dependencies just like it would on your local machine. When the Node server is running, a dialog box will appear at the bottom right corner asking if you want to open the Codespace in a browser and if you want to make the Codespace public.

![Codespaces open in browser](/source/images/assets/codespaces-application-available.png)

Clicking on the link will take you to a live site that's running on the current branch of the repository. If you opted to make the Codespace public, you can share the link to others and they will be able to view the site after accepting a warning that they are visiting someone else's Codespace. If the Codespace was not made public, only your GitHub user will be able to see it.

### Working with branches on Codespaces
You can open a Codespace (or load an existing Codespace) on a particular branch by first navigating to that branch in the GitHub repository. Alternately, if you already have the VSCode editor open, you can select a specific branch by clicking the branch name at the bottom left, then selecting the branch you would like to switch to in the panel that appears at the top of the screen. The Codespace will make the necessary adjustments and rebuild the docs site on that branch.

![Codespaces branch](/source/images/assets/codespaces-branch.png)

![Codespaces branch selection](/source/images/assets/codespaces-branch-list.png)

### Notes on running in Codespaces

Codespaces is free for individuals for [60 hours of runtime for 2 cores](https://github.com/features/codespaces#pricing), after which your _user_ is billed for additional time. It's unclear whether Pantheon's Enterprise account would own billing, but as of this writing it appears to be billed on a per user basis. For this reason, it's important to _not leave your Codespaces running_ when you're done with them.

## Install With The Gatsby Cli

From the `documentation` directory:

```bash
npm ci
```

### Run

Still in the `documentation` directory:

```bash
npm start
```

Use your local browser to navigate to `localhost:8000/`.

Locally saved updates to docs are automatically refreshed in the browser.

## Install With Lando

Alternatively, you can use [Lando](https://gist.github.com/tormi/a8b8fc39f9481373b24dc94cb8d2ee31). The `lando start` command initiates the app, installs node dependencies, and starts the `gatsby develop` server for you:

```bash
lando start
```

You can view the local environment at `localhost:8000/`. Updates to docs are automatically refreshed in the browser.

## Code Formatting
We use Prettier to enforce code style on changed files. On each pull request to the repository, if any `.js`, `.jsx`, `.ts` or `.tsx` files are modified in the `/src` directory, We run Prettier to check for code styling issues on the updated/changed files. If Prettier made any changes, those changes are automatically committed back to the PR (see [example PR](https://github.com/pantheon-systems/documentation/pull/9180#issuecomment-2292403319)).


To automatically fix formatting issues across the entire `/src` directory, run:
```bash
npm run format
```
Be cautious when running this command, as it will automatically fix any formatting issues it can.

## Testing

To reduced the likelihood of regressions and bugs this site uses a few different testing tools:

### Visual Regression Tests

Within the [`tests`](/tests/) directory there are a number of visual regression tests that can be run to compare the current state of the site to a PR preview or the live site.
These tests are meant to be run locally instead of CI as they have a high rate of false positives.

### Unit Tests

Unit tests for custom logic are written in in Vitest and can be executed with

```bash
npx vitest src/components
```

These tests are executed in CI via a [GitHub Action](.github/workflows/vitest.yml).
