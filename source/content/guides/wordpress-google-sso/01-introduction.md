---
title: Using WP SAML Auth with Google Apps
subtitle: Introduction
description: WP SAML Auth makes it possible to sign in to your WordPress site using Google Apps
contributors: [alexfornuto, danielbachhuber]
cms: "WordPress"
categories: [integrate]
tags: [sso, saml, users, security, plugins]
reviewed: "2020-02-19"
layout: guide
permalink: docs/guides/wordpress-google-sso/
anchorid: wordpress-google-sso
editpath: wordpress-google-sso/01-introduction.md
---

If your organization uses Google's G Suite, [WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/) lets your users sign into WordPress using their Google Account. This makes it much easier to manage user accounts; rather than recreate WordPress accounts for every user, you can treat Google Apps as your **Identity Provider** for **Single Sign-On** (SSO) and have WordPress defer to Google when determining who should have access and who shouldn’t.

This guide will help you install the WP SAML Auth plugin, create a SAML App within the Google Admin dashboard, and map the attributes required for successful login.

## Before You Begin

- Setting up is a matter of applying the correct configuration. It should take an hour or less. If you get stuck on a configuration error along the way, please reach out by creating an issue on [this doc](https://github.com/pantheon-systems/documentation/issues/new?title=Using%20WP%20SAML%20Auth%20with%20Google%20Apps%20Doc%20Update%20&body=Re%3A%20%5BUsing%20WP%20SAML%20Auth%20with%20Google%20Apps%5D(https%3A%2F%2Fpantheon.io/docs/wordpress-google-sso/)%0A%0APriority%20(Low%E2%80%9A%20Medium%E2%80%9A%20High)%3A%0A%0A%23%23%20Issue%20Description%3A%0A%0A%23%23%20Suggested%20Resolution%20&labels=fix%20content) or the [plugin project](https://github.com/pantheon-systems/wp-saml-auth) on GitHub.

- Creating a custom Google Apps SAML application requires a G Suite administrator account. If you don’t have appropriate permissions, you’ll need to pair up with someone that does.

- As you work through this process, there are two key SAML authentication terms to keep in mind:

  <dl>

  <dt>Identity Provider (SAML)</dt>

  <dd>

  Where user information is housed (e.g. Google Apps).

  </dd>

  <dt>Service Provider (SAML)</dt>

  <dd>

  Application depending on user information provided by the Identity Provider (e.g. WordPress).

  </dd>

  </dl>

You’ll see these in reference documentation, so it’s important to keep them straight so you know what configuration goes where.

<Alert title="Environment Variables" type="export">

This guide provides instructions using both the WordPress admin dashboard and [Terminus](/terminus). In order to make the Terminus instructions easier to use, you can set local environment variables to match those used in our code snippets.

To begin, let's set the `$site` variable to match your Pantheon Site name:

```bash{promptUser: user}
export site=yoursitename
```

</Alert>
