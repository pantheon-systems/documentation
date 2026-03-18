---
title: "This is a test"
published_date: "2026-03-18"
categories: [user-interface]
description: "This is a test description. It should show up in slack and social shares."
---

Pantheon has released version 2.3.1 of the [WP SAML Auth WordPress plugin](https://wordpress.org/plugins/wp-saml-auth/). This update adds a new filter for multisite environments to give developers more control over how SAML-provisioned users are added to sites. No action is required — existing behavior is unchanged.

## What's new

* **Multisite user provisioning control** — A new `wp_saml_auth_auto_add_to_blog` filter allows developers to prevent auto-provisioned SAML users from being automatically added to the current site. When set to `false`, users are created as network-level users without a role on any specific site, giving full control over site membership. The filter defaults to `true`, preserving existing behavior. See [#465](https://github.com/pantheon-systems/wp-saml-auth/pull/465) for details.
