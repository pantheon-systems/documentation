---
title: Create an Alternate Docroot
description: Learn how to create an alternate docroot to serve your Pantheon site from.
categories: [developing,sites]
tags: [platform,code]
keywords: Composer, docroot
---

## Define Alternate Docroot in pantheon.yml
- Clone your website locally with Git. For details, see [Starting with Git article](https://pantheon.io/docs/git/).
- Create a `pantheon.yml file` if it doesn't already exist.
- Add the line `web_docroot: true` to the top level of the YAML file, typically after `api_version`.
- Add, commit, and push the `pantheon.yml` file with Git.

### Example `pantheon.yml`
```
api_version: 1

web_docroot: true
```

### Create the Web Directory
In your code root, create a directory named `web`. This will be the directory where your site is served from when `web_docroot: true` is defined in `pantheon.yml`.
 The directory name is not configurable. If you absolutely need a different directory name, you can create a symlink with Git.

### Move Site Files to the Web Directory
This can be done with the `mv` command. After the files are moved, run `git add -A` to add and commit the moved files and deploy them to Pantheon.

### Alternate Docroot and Quicksilver
If you are using a Quicksilver platform hook with the type `webphp` make sure that the path to the script is relative to the doctroot `web`, and not the project root.

For example, if your `pantheon.yml` has a script location definition of `private/scripts/my_quicksilver_script.php` the file would need to be located at `web/private/scripts/my_quicksilver_script.php`.

This is because `webphp` scripts are run with Nginx, which is serving from the alternate docroot.
