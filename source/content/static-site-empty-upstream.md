---
title: Use an Empty Upstream to Host a Static Site on Pantheon
description: How to create a static site using an empty Upstream on Pantheon.
contributors: [michellecolon-pantheon, kyletaylored]
categories: [get-started]
tags: [upstreams, site]
reviewed: "2021-08-12"
---

Pantheon supports two of the largest open source content management systems (CMS) on the web, WordPress and Drupal. Occasionally, when customers move their portfolio of sites over to Pantheon, some sites are static and do not need a full CMS, and this is where empty Upstreams come in.

The usual [Scope of Support](/support#scope-of-support) applies: Pantheon Support will help diagnose and remedy platform-related issues, but cannot resolve code-related issues.

This process assumes you already have a static site developed and that you have access to the files. For more information about dependencies and which files to upload, consult the documentation for the static site generator you use.

## What is an Empty Upstream?

An empty Upstream is a [Custom Upstream](/custom-upstream) repository (a [Start State](/start-state) that does not have any content or code. For cases when a customer needs a blank start state, Pantheon provides an empty Upstream.

Commonly, an empty Upstream is used as part of a [Build Tools](/guides/build-tools) setup. In this doc, we use it to host static HTML or PHP sites.

## Create a Site With an Empty Upstream

<Youtube src="PTVqXxwOJ4Q" title="Pantheon Static Site and Empty Upstreams" />

There are two ways to create an empty Upstream site: via the [Pantheon Dashboard](/create-sites) and via [Terminus](/terminus).

- Via the Pantheon Dashboard:

  - Use the [Empty Site Upstream](https://dashboard.pantheon.io/sites/create?upstream_id=4c7176de-e079-eed1-154d-44d5a9945b65)

- Via Terminus:

  ```bash{promptUser: user}
  terminus site:create my-new-site "My New Site" empty
  ```

## Upload the Static Site to Pantheon

Now that you have static files and an empty Upstream that is ready to host them, add files to the Pantheon Site using [SFTP](/sftp) or [Git](/git).

Once the files have been added to the Site, [commit the code](/sftp#committing-sftp-changes), and deploy the changes through Test to Live.

## Frequently Asked Questions

### Can I create a static site on Pantheon?

Yes! You can start a new static site using an [empty Upstream](https://dashboard.pantheon.io/sites/create?upstream_id=4c7176de-e079-eed1-154d-44d5a9945b65).

### Can I add static files to an existing WordPress or Drupal site?

Yes, you can commit any static HTML file to your site that is unrelated to the CMS.

If you would like the path to have a clean URL (for example, `example.com/page-name` vs. `example.com/page-name.html`), the HTML file should be an `index.html` file in a directory of the desired path name.

This example directory structure shows a WordPress site that contains a static landing page located at `example.com/landing-page`:

```bash:title=docroot/
docroot/
├── wp-content
│   ├── index.php
│   ├── mu-plugins/
│   ├── plugins/
│   ├── themes/
│   └── uploads/
├── index.php
//highlight-start
└── landing-page
    ├── index.html
    ├── assets/
    ├── css/
    └── js/
//highlight-end
```

### Are there platform features I can/cannot use with this?

An empty Upstream, behind the scenes, is essentially an empty Drupal environment. All of the tools available to the Site Plan will be available. But, if you are only using static HTML, tools like Redis and New Relic are not utilized as no requests are being processed by PHP.

### Does traffic count the same way?

Yes, traffic will be counted the same way. Refer to our [Traffic Metrics](/traffic-limits) documentation for more information.

### Can I use this process to host statically generated JAMStack sites?

Yes, compiled static sites that don't require a Drupal or WordPress CMS backend can be hosted on Pantheon using this method.

Some customers utilize a two-site approach on Pantheon where one site is the CMS backend (headless WordPress or Drupal), and the other site is the decoupled frontend (Frontity, Gatsby, [etc.](https://jamstack.org/generators/)). Of course, you will likely have different deployment workflows for updating each site, and you would need to determine the best workflow for you and your team.

For other Decoupled configurations, please refer to our [Decoupled Sites](/decoupled-sites) documentation.

## More on How Pantheon Uses Upstreams

- [Choosing Your Start State](/start-state)
- [Switch Upstreams](/terminus/examples#switch-upstreams)
- [Introduction to Custom Upstreams](/custom-upstream)
- [Drupal 8 and Composer on Pantheon Without Continuous Integration](/guides/drupal-8-composer-no-ci#creating-the-pantheon-site)
