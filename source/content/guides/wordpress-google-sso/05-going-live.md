---
title: Using WP SAML Auth with Google Apps
subtitle: Going Live
description: Merge your new SAML configuration to your live environment, and update the appropriate values
contributors: [alexfornuto, danielbachhuber]
cms: "WordPress"
categories: [integrate]
tags: [sso, saml, users, security, launch]
reviewed: "2020-02-19"
layout: guide
permalink: docs/guides/wordpress-google-sso/going-live
anchorid: wordpress-google-sso/going-live
editpath: wordpress-google-sso/05-going-live.md
---

Once you've thoroughly tested your new WordPress SAML authentication, it's time to go live. Follow the [Pantheon WebOps Workflow](/pantheon-workflow) to merge your code to the Test environment (via Dev first, if you're working from a Multidev environment), and on to Live.

<Alert type="info" title="Note">

The settings defined on the WP SAML Auth settings page are stored in the database, and do not move along with code changes. Take note of the values listed under **Identity Provider Settings** to replicate in other environments.

</Alert>

Be sure to update and test the settings in each environment before moving up to Live.

## Service Provider Settings

The values under **Service Provider Settings** will change for each environment the WP SAML Auth plugin is activated on. To properly test each environment on your way to Live, you can edit these values in the Google SAML App settings, or create a new App for each environment.

<Alert type="danger" title="Warning">

We do *not* recommend transferring the `wp_saml_auth_settings` database values between environments with tools like WP-CFM, as this can overwrite environment-specific values.

</Alert>

Once you've merged and tested your changes in the Live environment, you're done! Congratulations on successfully configuring SAML authentication from your Google organization on your WordPress site.

You can stop here, or go on to Advanced Configuration Options to learn how to further customize your authentication gateway.
