# Contributing

Help us create relevant and useful content for developers like yourself. See something you'd like to add or change? We love pull requests!

**NOTE**: All contributions must be licensed under [CC-BY-SA](https://creativecommons.org/licenses/by-sa/4.0/). Code snippet contributions must additionally be licensed under [The MIT License](http://opensource.org/licenses/MIT). You must have permission to contribute your work under these terms.

## Code of Conduct

This project adheres to the [Contributor Covenant](CODE_OF_CONDUCT.md) code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to docs@pantheon.io.

## Issues - Searching and Creating

Before you edit or create a doc, search [open issues](https://github.com/pantheon-systems/documentation/issues) to make sure you can't find anything related to what you want to work on. If there isn't an issue, create one and add an outline for the article you want to create. This allows contributors to get some initial feedback.

###Titles and Descriptions
When creating issues, add a clear title and description. Issues should contain relevant information e.g., the document title, the information that is incorrect or outdated and your suggestion on how to fix it, reasons why method A is better than method B, and so on.

**Example**:  
Title: Apache Solr doc - Terminus command is not working  
Description: The document currently suggests using XYZ commands, but I get the following error (insert error message). The fix is to use XYZ commands.

###Labels

Add labels to issues by clicking the gear in the sidebar on the right. Labels are used to signify priority, category, and to help filter existing issues. For example, if a doc is incorrect, the label 'Doc Defect' should be applied.

## Edit and Test Locally Using Vagrant

**Note**: To preserve the accuracy of promised information throughout the docs, search the repository for links to sections that have been renamed and update accordingly.

1. [Use Vagrant](https://github.com/pantheon-systems/documentation#option-1-use-vagrant-recommended) to run the docs site locally.
2. Navigate to your local `documentation` repository and use `git checkout -b <new-branch-name>` to switch to a new branch.
3. Edit/Create docs locally using your favorite text editor (e.g. [Atom](https://atom.io/)), then save the file changes.
4. Run `vagrant provision` and verify modifications on the local site <http://docs.local:8000/docs>
5. Test layout or code changes with `vagrant ssh` and `cd /vagrant`, then execute the following tests individually (optional):
 - `grunt`: [a11y](https://github.com/addyosmani/a11y) accessibility audits
 - `rake`: [HTML::Proofer](https://github.com/gjtorikian/html-proofer) HTML validation
 - `bin/behat`: [Behat](https://github.com/Behat/Behat)
 - `wraith capture wraith.yaml`: [Wraith](https://github.com/BBC-News/wraith) visual regression tool
 - `scripts/merge_conflicts.sh`: Look for merge conflicts.
6. Commit changes and push to your fork. Issue pull-requests one document/issue at a time.

### Updating Header and Subheaders
Headers and Subheaders render as H2 and H3 tags when the site is published. These tags automatically generate anchors which can be relatively linked throughout the site. When creating or editing, avoid using numbers and special characters. If used, the URL would either need to be encoded or ignored from html-proofer tests using the `data-proofer-ignore` attribute.

### Use of Images

All images must include a descriptive `alt` value. For details, see the [Images Readme](https://github.com/pantheon-systems/documentation/blob/master/source/assets/images/readme.md).

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
title: Starting With Git
description: Use Git version control with your Pantheon site.
category:
  - getting-started
  - developing

---
```

### Attribution
If you're creating your **first** guide, you must also create an contributor profile. Fill out the information below and add it to the [`sculpin_site.yml`](/app/config/sculpin_site.yml) file. Commit this change alongside your new guide.
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

* Follow our [style guide](https://github.com/pantheon-systems/documentation/blob/master/style-guide.md).
* Write a [good commit message][commit].
* Build and test locally to make sure everything looks good. Refer to [README](https://github.com/pantheon-systems/documentation/blob/master/README.md) for detailed instructions.

[style]: https://github.com/pantheon-systems/documentation/blob/master/style-guide.md
[commit]: http://chris.beams.io/posts/git-commit/

## Moderator Expectations

Moderators will review and comment on pull requests within three business days. We may suggest changes, improvements, or alternatives in which case the original contributor will be tagged directly so follow-up instructions are clear. There may be times where moderators will make commits to your fork directly for clarity and/or alignment with our [style guide](https://github.com/pantheon-systems/documentation/blob/master/style-guide.md).

## Additional Resources

* [General GitHub Documentation](http://help.github.com/)
* [GitHub Pull Request Documentation](http://help.github.com/send-pull-requests/)
* [#pantheon IRC channel on freenode.net](http://irc.netsplit.de/channels/details.php?room=%23pantheon&net=freenode)
