---
title: "Platform Security Enhancement: Blocking Public Access to Potentially Sensitive Configuration Files"
published_date: "2025-08-13"
categories: [infrastructure]
---

## Summary

To enhance the security of all sites on the Pantheon platform, we will be blocking public web access to several common configuration and dependency management files. This is a preventative measure to protect against potential information disclosure vulnerabilities. This change will be rolled out to the platform's infrastructure and **requires no action for the vast majority of users**.

***

## What is Changing?

We are updating our platform's global routing configuration to prevent public access to the following paths:

* `composer.json`
* `composer.lock`
* `package.json`
* `phpunit.xml.dist`

Any attempt to access these files directly via a web browser or other HTTP client will result in a `403 Forbidden` error.

***

## Why We Are Making This Change

These files, while essential for development and deployment workflows, can expose sensitive information if they are publicly accessible. 🛡️

Blocking these files aligns with security best practices by ensuring that information intended for developers and build processes is not publicly exposed.

***

## Impact on Your Site

For most sites, there will be **no noticeable impact**. These files are not intended to be served publicly, and this change simply enforces that best practice at the platform level.

This change **will not affect**:

* Your ability to access or modify these files via Git or SFTP.
* Your local development workflow.
* The execution of `composer` or `npm`/`yarn` commands during your build process on Pantheon.

***

## Action Required

**No action is required for most sites.**

In the unlikely event that your application logic relies on public, web-based access to these files (a practice which is strongly discouraged), please contact our support team.
