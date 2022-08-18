---
title: Pantheon Front-End Sites
subtitle: Frequently Asked Questions
description: Learn about Pantheon's decoupled architecture using Front-End Site
categories: [platform]
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, joa-pan]
type: guide
layout: guide
showtoc: true
anchorid: faq
permalink: docs/guides/decoupled-sites/
editpath: decoupled-sites/faq.md
reviewed: "2022-08-11"
---

## Frequently Asked Questions

### Can I use any CMS with Pantheon Decoupled?

Wordpress and Drupal are currently the only CMSs supported on Pantheon Decoupled. 


### What dependency versions are compatible with Pantheon Decoupled?

Pantheon Front-End Sites currently support:

* Gatsby v4 
* Next.js v12
* Drupal 9
* WordPress 5.9


### Is Decoupled Site Preview available for all instances on Pantheon Decoupled?

Decoupled Site Preview is only available for sites using Drupal as the CMS.



## Known Limitations 

<Accordion title="Preview functionality is not supported for Gatsby" id="preview" icon="info-sign">
Preview functionality is not currently supported for Gatsby. Currently, it is only available for Drupal sites.
</Accordion>

<Accordion title="Gatsby does not support SSR and DSG" id="ssr-gatsby" icon="info-sign">
Server-side Rendering and Deferred Static Generation (DSG) for Gatsby v4 are currently not supported. 
</Accordion>

<Accordion title="Manual support is required" id="support-manual" icon="info-sign">
Manual support is required for domain and DNS setup.
</Accordion>

<Accordion title="You must remove a VCS user record to uninstall a Front-End Site  " id="uninstalling" icon="info-sign">
Uninstalling a Pantheon Front-End Site using GitHub settings requires manual removal of a VCS user record.
</Accordion>

<Accordion title="Select files can cause build errors" id="remove-files" icon="info-sign">
Select files, such as `.dockerignore` and `.gcloudignore` files can cause build errors or failed builds. Removing these files from source and adding them to `.gitignore` solves the issue.
</Accordion>

<Accordion title="Builds are triggered by updates to the default branch" id="build-trigger" icon="info-sign">
Only pull requests made against the default branch will trigger a build. An update to the default branch will promote a build, however; creation of a new branch, an update or pull request on a non-default branch will trigger a build.
</Accordion>

<Accordion title="Builds " id="terms-decoupled" icon="info-sign">
Builds will only complete for repositories that are detected as Gatsby or Next.js repositories. Builds for all other frameworks will fail.
</Accordion>

<Accordion title="Users must have permissions to enable decoupled for GitHub organization accounts." id="github-organization" icon="info-sign">
Users must have permissions to enable decoupled for GitHub organization accounts. The user should be the Owner of the account. GitHub organization owners can allow other users to manage the Pantheon GitHub application on their behalf. 
</Accordion>

<Accordion title="Renaming a linked repository in GitHub will cause a break in your decoupled experience." id="rename-repo" icon="info-sign">
Renaming a linked repository in GitHub is not recommended, as it will cause a break in your decoupled experience. In the event a user renames an attached Git repository on GitHub and disconnects the Git repository and attaches the renamed site, this will trigger a false live-build and the Decoupled site will be in a persistent build log state that cannot be canceled. To fix this issue, disconnect the renamed Git repository and revert to the original name. This action will instantly restore all data. Renaming the Git repository on GitHub to the original name should fix the build process.
</Accordion>



