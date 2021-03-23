Build Status: [![Circle CI](https://circleci.com/gh/pantheon-systems/documentation.svg?style=svg)](https://circleci.com/gh/pantheon-systems/documentation)


Pantheon Documentation
======================

https://pantheon.io/docs/

This repository contains the [Pantheon](https://pantheon.io) documentation, as well as the tools to build local test environments.

## Changelog

 - 8/5/19: We've relaunched the project using [Gatsby](https://www.gatsbyjs.org) for faster development, and _much_ faster page speed.

### Contributing
Our docs are written in [Markdown](https://daringfireball.net/projects/markdown/), extended with [MDX](https://github.com/mdx-js/mdx) components. The pages live in `source/content`. Read [CONTRIBUTING.md](<CONTRIBUTING.md>) for more details on contributing documentation improvements.

### Style Guide
Read [our Style Guide](https://pantheon.io/docs/style-guide/) for our guidelines on how to write documentation.

## Local Installation

### Prerequisites
  - You can optionally use [Lando](https://docs.lando.dev)
    - By leveraging Lando you can avoid havting to install node.js, and gatsby cli on your local computer
  - MacOS or Linux system (untested with Bash on Windows)
  - [Node.js](https://nodejs.org/en/)
  - Gatsby CLI:

```bash
npm install -g gatsby-cli
```

### Get the Code

Fork and clone this repository.

```bash
git clone https://github.com/pantheon-systems/documentation.git
```

Or

```bash
git clone git@github.com:pantheon-systems/documentation.git
cd documentation
```

### Install

You can install via Lando or directly on your host computer. Both ways require the docs app to use a `GITHUB_API` token to operate.

#### GitHub Token
We use the [gatsby-remark-embed-snippet](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-embed-snippet) to use files from GitHub in our docs. Before you can build a local development site, you need to provide a GitHub token to the environment:

1. Log in to GitHub and go to <https://github.com/settings/tokens>
1. Click Generate new token
1. Give it a name and click the public_repo checkbox, then the Generate Token button at the bottom
1. Copy the token to your clipboard.
1. Create or edit `.env.development`, and add (replacing $TOKENHASH ):

```bash
GITHUB_API=$TOKENHASH
```

#### Using Lando

```bash
lando start
```

The `lando start` command will fire up the app, install node dependencies, and start the `gatsby develop` server for you.

#### Using gatsby cli Directly
```bash
npm ci
```

### Run

```bash
cd documentation/
gatsby develop
```

You can view the local environment at `localhost:8000/`. Updates to docs are automatically refreshed in the browser.


## Testing

We include several tools to test that new content doesn't break the documentation. Most of these tests are performed automatically by our continuous integration service, but pull requests created from external contributors aren't included in CI tests. If you want to manually test your branch, you can execute the following tests within the Docker container.

### Merge Conflicts

To check for merge conflict messages accidentally committed into the docs, run `merge_conflicts.sh` from `scripts`.

