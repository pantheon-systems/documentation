---
title: Domains on Pantheon
subtitle: Troubleshoot Domains
description: Review common troubleshooting scenarios for domains.
categories: [develop]
tags: [collaborate, dns, agencies]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/domains/troubleshooting
anchorid: troubleshooting
---

This section provides information on common domain troubleshooting scenarios.

### Failed cache clears, search and replace, or Drush and WP-CLI operations

All redirect logic should include the `php_sapi_name() != "cli"` conditional statement to see if WordPress or Drupal is running via the command line. Drush and WP-CLI are used by the platform for operations like cache clearing and search and replace, so it is important to only redirect web requests, otherwise the redirect will kill the PHP process before Drush or WP-CLI is executed, resulting in a silent failure:

```bash
[notice] Command: site.env -- 'drush <command>' [Exit: 1]
[error]
```


#### HTTP_X_FORWARDED_PROTO

Errors referencing too many redirects may be a result of using the ` $_SERVER['HTTP_X_FORWARDED_PROTO']` variable within redirect logic located in your site's `wp-config.php` or `settings.php` file.

Resolve this error by replacing the offending redirect logic with the [recommended code samples in the above section](/guides/domains/primary-domain#redirect-to-https) and for your specific use case.

#### Modules and Plugins

Modules and plugins that support managing redirects in the Site Admin interface can produce redirect errors when repeating or conflicting with redirects managed via PHP in your site's configuration file. Some examples include:

WordPress plugins: Redirection, Quick Page/Post Redirect, Safe Redirect Manager, Simple 301 Redirects

Drupal modules: Language (when using URL detection), Securepages, Redirect

When troubleshooting a redirect loop, you may want to deactivate any module or plugin that may be providing its own redirect logic.

### Mixed-mode Browser Warnings

Replace `http://` in the site's database and configure your CMS to assume users are visiting via HTTPS and the site’s primary domain. Templates for example should reference HTTPS in absolute CSS and Javascript sources, even when accessed with HTTP.

### Mixed Case DNS Is Not Supported

If you have your name server configured to use a mixed case domain, visitors might not be able to access your site.

Configure your DNS to accept an entirely lowercase domain to avoid this issue.

### Test Domain Names Before DNS

You can modify your local `hosts` file to validate domain-specific settings before DNS is in place.

<Partial file="_hosts-file.md" />

## More Resources

- [Modules and Plugins with Known Issues](/modules-plugins-known-issues)

- [Debug Caching Issues](/debug-cache)

- [Modify the Local Hosts File](/hosts-file)

- [Domains FAQs](/guides/domains/domains-faq)