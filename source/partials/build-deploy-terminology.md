---
contenttype: [partial]
categories: [git]
cms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

## Build and Deploy Terminology

*Build* and *deploy* are terms you'll encounter frequently. Your application goes through a build and deploy process every time you push a change to your repository through Git or activate an environment.

The build process scans configuration files in your repository and assembles the necessary containers before deploy. The build then prepares your application, including:

- Compiling
- Linking
- Uploading artifacts

The deploy process uses the build containers to create an updated version of the live application.