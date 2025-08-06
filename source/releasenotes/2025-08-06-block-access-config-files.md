---
title: "Certain configuration files will no longer be publicly web accessible starting August 13th"
published_date: "2025-08-06"
categories: [infrastructure, security]
---
Starting August 13th, 2025 Pantheon will start blocking web access to several common configuration and dependency management paths. This is a preventative security measure to protect against potential information disclosure vulnerabilities. For the vast majority of users, no site impact is expected and no action is required.

## Key Changes

We are updating our platform's global routing configuration to prevent public access to the following paths:

* `composer.json`
* `composer.lock`
* `package.json`
* `phpunit.xml.dist`

Any attempt to access these files directly via a web browser or other HTTP client will result in a `403 Forbidden` error.

### Why make this change? 

These files, while essential for development and deployment workflows, can expose sensitive information if they are publicly accessible.

Blocking these files aligns with security best practices by ensuring that information intended for developers and build processes is not publicly exposed.

### Site Impact

For most sites, there will be **no noticeable impact**. These files are not intended to be served publicly, and this change simply enforces security best practices at the platform level.

This change **will not affect**:

* Your ability to access or modify these files via Git or SFTP.
* Your local development workflow.
* The execution of `composer` or `npm`/`yarn` commands during your build process on Pantheon.

In the unlikely event that your application logic relies on public, web-based access to these files (a practice which is strongly discouraged), please [contact support](/guides/support/contact-support).
