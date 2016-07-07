---
title: Create an Alternate Docroot
description: Learn how to create an alternate docroot to serve your Pantheon site from.
categories: [developing,sites]
tags: [platform,code]
keywords: Composer, docroot
---

## Introduction

### What is an alternate docroot?
The docroot is the directory where your website files are served. On Pantheon this defaults to the root directory of your Git repository. Specifying an alternate docroot allows you to serve site files from the `web` subdirectory of the Git root.

### Advantages and Use Cases
While URLs are limited to the web docroot, PHP is not. Using an alternate docroot allows you to put PHP files for use in your web application one level above the web docroot so they are accessible via PHP but not from the web.

This is especially useful for third party dependencies, such as those installed with [Composer](https://getcomposer.org/).

Any non-web scripts, such as [Pantheon Quicksilver scripts](https://github.com/pantheon-systems/quicksilver-examples), should be kept outside of the docroot as well. 

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

## Create the Web Directory
In your code root, create a directory named `web`. This will be the directory where your site is served from when `web_docroot: true` is defined in `pantheon.yml`.
 The directory name is not configurable. If you absolutely need a different directory name, you can create a symlink with Git.

## Move Site Files to the Web Directory
This can be done manually for each file/directory with the `git mv` command or automated with one of the example commands below. After the files are moved, run `git add -A` to add and commit the moved files and deploy them to Pantheon.

### Examples
The idea here is that `find . -type f -maxdepth` finds all files at the document root, including the "dot" files, but skips all of the directories. We list the directories in Drupal/WordPress core out specifically, so that any user-defined directories stay behind. This may or may not produce the correct results, depending on what files the user has added. Please verify file relocation after using one of these commands.

#### Drupal 7:

`mkdir -p web && git mv -k $(find . -type f -maxdepth 1 | grep -v pantheon.yml) includes/ misc/ modules/ profiles/ scripts/ sites/ themes/ web
`
#### Drupal 8:

`mkdir web && git mv -k $(find . -type f -maxdepth 1 | grep -v pantheon.yml) core drush modules profiles sites themes vendor web`

#### WordPress:

`mkdir web && git mv -k $(find . -type f -maxdepth 1  | grep -v pantheon.yml) wp-includes wp-content wp-admin web`

## Alternate Docroot and Quicksilver
If you are using a Quicksilver platform hook with the type `webphp` make sure that the path to the script is relative to the doctroot `web`, and not the project root.

For example, if your `pantheon.yml` has a script location definition of `private/scripts/my_quicksilver_script.php` the file would need to be located at `web/private/scripts/my_quicksilver_script.php`.

This is because `webphp` scripts are run with Nginx, which is serving from the alternate docroot.
