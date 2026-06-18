[![Actively Maintained](https://img.shields.io/badge/Pantheon-Actively_Maintained-yellow?logo=pantheon&color=FFDC28)](https://docs.pantheon.io/oss-support-levels#actively-maintained-support)


# Pantheon Documentation

This repository contains the Next.js source code and the content of [Pantheon's Documentation site](https://newdocs.pantheon.io/).

## Contributing documentation changes

The content of this website lives within markdown files in the [`src/source`](src/source) folder.
If you wish to [contribute to or edit documentation](https://docs.pantheon.io/contribute), you can make pull requests to this repository like any other on GitHub.

## Site Architecture

This site is built in Next.js and relies mainly on dynamic rendering (SSR) of routes. While a site like this one could function just as well with pages rendered statically, dynamic rendering is used

* to reduce initial build times
* to fit with the trend in Next.js sites toward "[dynamic by default](https://pantheon.io/blog/next-js-beta)" architectures
* to accommodate future changes in which some content will be sourced from Pantheon's [Content Publisher](https://docs.content.pantheon.io/) in addition to local markdown files

## Local Development

To perform local development tasks on this Next.js site, clone it to your local machine.

Install dependencies:

```
npm install
```

Start a local development server:

```
npm run dev
```

For some development tasks you may want to do a full build that matches how this site is [deployed to the web on Pantheon's own Next.js infrastructure](https://docs.pantheon.io/nextjs/architecture#build-and-deploy-process).

Execute a full production build with:

```
npm run build
```

Then start that site with

```
npm run start
```

Some pages and React components may behave differently in the dev server compared to a full build.
