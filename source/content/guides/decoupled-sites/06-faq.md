---
title: Pantheon Front-End Sites
subtitle: Frequently Asked Questions
description: Learn about frequently asked questions for Pantheon's decoupled architecture using Front-End Sites.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, joa-pan]
type: guide
layout: guide
showtoc: true
anchorid: faq
permalink: docs/guides/decoupled-sites/faq/
editpath: decoupled-sites/06-faq.md
reviewed: "2022-08-11"
contenttype: [guide]
categories: [create]
newcms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---


## Frequently Asked Questions

### Can I use any CMS with Pantheon architecture for Front-End Sites?

WordPress and Drupal are currently the only CMSs supported by Pantheon Decoupled. 


### What dependency versions are supported with Front-End Sites?

Pantheon Front-End Sites currently supports:

* Gatsby v4 
* Next.js v12
* Drupal 9
* WordPress 5.9


### Is Decoupled Site Preview available for all instances on Front-End Sites?

Decoupled Site Preview is only available for sites using Drupal as the CMS.


## Known Issues

<Accordion title="A repository can only be associated with one Front-End Site" id="repo-site" icon="info-sign">
A repository can only be associated with one decoupled Front-End Site at a time. You will receive an error message if you attempt to connect a repository to two or more sites.
</Accordion>

<Accordion title="Builds are only available for Gatsby and Next.js " id="terms-decoupled" icon="info-sign">
Builds will only complete for repositories that are detected as Gatsby or Next.js repositories. Builds for all other frameworks will fail.
</Accordion>

<Accordion title="Gatsby does not support SSR and DSG" id="ssr-gatsby" icon="info-sign">
Server-side Rendering and Deferred Static Generation (DSG) for Gatsby v4 are currently not supported. 
</Accordion>

<Accordion title="Manual support is required" id="support-manual" icon="info-sign">
Manual support is required for domain and DNS setup.
</Accordion>

<Accordion title="Preview functionality is not supported for Gatsby" id="preview" icon="info-sign">
Preview functionality is not currently supported for Gatsby. Currently, it is only available for Drupal sites.
</Accordion>

<Accordion title="Renaming a linked repository in GitHub will cause a break in your decoupled experience." id="rename-repo" icon="info-sign">
Renaming a linked repository in GitHub is not recommended, as it will cause a break in your decoupled experience. In the event a user renames an attached Git repository on GitHub and disconnects the Git repository and attaches the renamed site, this will trigger a false live-build and the Decoupled site will be in a persistent build log state that cannot be canceled. To fix this issue, disconnect the renamed Git repository and revert to the original name. This action will instantly restore all data. Renaming the Git repository on GitHub to the original name should fix the build process.
</Accordion>

<Accordion title="Select files can cause build errors" id="remove-files" icon="info-sign">
Select files, such as `.dockerignore` and `.gcloudignore` files can cause build errors or failed builds. Removing these files from source and adding them to `.gitignore` solves the issue.
</Accordion>

<Accordion title="Users must have permissions to enable decoupled for GitHub organization accounts." id="github-organization" icon="info-sign">
Users must have permissions to enable decoupled for GitHub organization accounts. The user should be the Owner of the account. GitHub organization owners can allow other users to manage the Pantheon GitHub application on their behalf. 
</Accordion>

<Accordion title="You must remove a VCS user record to uninstall a Front-End Site" id="uninstalling" icon="info-sign">
Uninstalling a Pantheon Front-End Site using GitHub settings requires manual removal of a VCS user record.
</Accordion>