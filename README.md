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
git@github.com:pantheon-systems/documentation.git
```

### Install

```
cd documentation/gatsby
npm install
```

### Run

```
cd documentation/gatsby
gatsby develop
```

You can view the local environment at `localhost:8000/`. Updates to docs are automatically refreshed in the browser.


## Testing

Tests are performed automatically by our continuous integration service.
