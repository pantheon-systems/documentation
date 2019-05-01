# Contributing

Help us create relevant and useful content for developers like yourself. See something you'd like to add or change? We love pull requests!

**NOTE**: All contributions must be licensed under [CC-BY-SA](https://creativecommons.org/licenses/by-sa/4.0/). Code snippet contributions must additionally be licensed under [The MIT License](http://opensource.org/licenses/MIT). You must have permission to contribute your work under these terms.

If you're looking for a place to start, try copying our [Doc Template](/source/_docs/doc-template.md) file and using it to outline your new doc.

## Code of Conduct

Pantheon is dedicated to a positive and harassment-free community experience for everyone. [See our full code of conduct](source/_docs/code-of-conduct.md) for details, including how to report abuse.


## Issues - Searching and Creating

Before you edit or create a doc, search [open issues](https://github.com/pantheon-systems/documentation/issues/) to make sure there isn't an existing issue tracking work related to the issue you're trying to resolve. If there is, feel free to contribute to the existing discussion. If there isn't an issue, create one and add an outline for the article you want to create, or explain the issue and resolution for existing content. When possible, fill out as much information as possible requested in the Issue Template.

### Titles and Descriptions
When creating issues, add a clear title and description. Issues should contain relevant information e.g., the document title, the information that is incorrect or outdated and your suggestion on how to fix it, reasons why method A is better than method B, and so on.

**Example**:
Title: Apache Solr doc - Terminus command is not working
Description: The document currently suggests using `XYZ` commands, but I get the following error (insert error message). The fix is to use `ABC` commands.

## Edit and Test Locally

Pantheon provides a Docker image with which you can test your local edits. See [Local Setup](<README.md#local-setup-optional>) for details.

Branch names should start with the corresponding issue number followed by a brief description. If no issues exists, [you can create one](https://github.com/pantheon-systems/documentation/issues/new?title=New%20Doc%20Proposal%20&body=Priority%20(Low%E2%80%9A%20Medium%E2%80%9A%20High)%3A%0A%0A%23%23%20Title%0A%0A%0A%23%23%20Description%0A%0A%0A%23%23%20Outline%0A%0A%0A%23%23%20Expected%20Audience%0A%0A%0A%23%23%20Path%0A(e.g.%20%60source%2Fdocs%2Farticles%2Fsites%2Fcode%60%20or%20%60source%2Fdocs%2Farticles%2Fwordpress%60)&labels=new%20doc) first, or proceed without it. For example, `3830-add-branch-guidelines-to-contributing-md`.

### Updating Header and Subheaders
Headers and Subheaders render as H2 and H3 tags when the site is published. These tags automatically generate anchors which can be relatively linked throughout the site. When creating or editing, avoid using numbers and special characters. If used, the URL would either need to be encoded or ignored from html-proofer tests using the `data-proofer-ignore` attribute.


## Edit on GitHub

Trying to edit or create a file in this repository will create your fork automatically. Commit changes and issue pull-requests one document/issue at a time. For more information, see [Using Pull Requests](https://help.github.com/articles/using-pull-requests/).

## Keep your Local Updated with Master

From your local repo, run the following commands in order:
1. `git checkout master`
2. `git pull --rebase upstream master`
3. `git push origin master`

## Add a New Doc

### Front Matter
All of our documentation is generated from markdown files, found at [`source/_docs/`](/source/_docs/) and [`source/docs/guides/`](source/docs/guides/). These markdown files must have front matter that allow the page to render successfully. This is required if you plan to create a new doc. Here's an example:
```
---
title: Git FAQs
description: Answers to commonly asked questions about Git, Drupal 7, Drupal 6 and Pantheon.
tags: [performance, cache]
contributors: mrfelton
---
```
### Taxonomies
Docs should include three unique taxonomies: categories, tags, and contributors. Currently, the only taxonomy used within Guides is contributors.
#### Categories
Only the following categories should be included (case sensitive):

- developing
- managing
- wordpress
- drupal

 If you feel that another category should be created, indicate the suggestion within your pull request and a moderator will review.
#### Tags
Only the following tags should be included (case sensitive):

- platform
- getting-started
- local
- code
- backups
- domains
- varnish
- organizations
- migrate
- files
- create
- database
- debug
- logs
- drupal-8
- terminus

If you feel that another tag should be created, indicate the suggestion within your pull request and a moderator will review.

### Style Guide

Review our [Style Guide](https://pantheon.io/docs/style-guide/) for more detailed information on the Pantheon voice and style, and examples of the formatting we use for notes & warnings, code blocks, etc.

### Contributors
Create a contributor profile within your **first** contribution. Fill out the information below and add it to the [`sculpin_site.yml`](/app/config/sculpin_site.yml) file. Commit this change alongside your new guide.
```
your_handle:
   name: Your Name
   url: http://yourURL.com
   avatar: http://url.to.a.valid/avatar.jpeg
   twitter: http://twitter.com/
   gplus: https://plus.google.com/
   github: https://github.com/
   linkedin: https://www.linkedin.com/in/
   drupal: https://www.drupal.org/u/
   wordpress: https://profiles.wordpress.org/
bio: This shouldn't be long, just a short intro.
```
Please provide at least "name" and "bio". The "gplus" URL is useful to show your contributor info on Google search results.


## Submit a Pull Request

When you're done making changes, [submit a pull request](https://github.com/pantheon-systems/documentation/compare/).

Some things to follow to help increase the chance that your pull request will be accepted:

* Follow our [style guide][style].
* Write a [good commit message][commit].
* Build and test locally to make sure everything looks good. Refer to [README](https://github.com/pantheon-systems/documentation/blob/master/README.md) for detailed instructions.


## Moderator Expectations

Moderators will review and comment on pull requests. We may suggest changes, improvements, or alternatives in which case the original contributor will be tagged directly so follow-up instructions are clear. There may be times where moderators will make commits to your fork directly for clarity and/or alignment with our [style guide][style].

## Additional Resources

* [General GitHub Documentation](http://help.github.com/)
* [GitHub Pull Request Documentation](http://help.github.com/send-pull-requests/)
* [Pantheon Power Users Group on Slack](https://pantheon.io/docs/power-users/)
* [How to Write a Git Commit Message](http://chris.beams.io/posts/git-commit/)

