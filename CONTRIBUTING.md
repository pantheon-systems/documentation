# Contributing

Help us create relevant and useful content for developers like yourself. See something you'd like to add or change? We love pull requests!

## Before You Start

* If you don't have one already, sign up for a [GitHub account](https://github.com/signup/free).
* Fork the pantheon-systems/documentation repository on GitHub.
  Trying to edit or create a file in this repository will create your fork automatically.
* [Clone your fork locally](https://help.github.com/articles/cloning-a-repository/).

## Edit Existing Docs

1. Search [open issues](https://github.com/pantheon-systems/documentation/issues); if you can't find anything related to what you want to work on, open a new issue so that you can get some initial feedback.
2. Locally, cd to the `documentation` repository and use `git checkout -b <new-branch-name>` to switch to a new branch.
3. Edit locally, commit changes, and push to your fork.


## Add a New Doc
### Front Matter
All of our documentation is generated from markdown files, found at [`source/docs/articles/`](/source/docs/articles/) and [`source/docs/guides/`](source/docs/guides/). These markdown files must have front matter that allow the page to render successfully. This is required if you plan to create a new doc. Here's an example:
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
If you're creating your **first** guide, you must also create an Author profile. Fill out the information below and add it to the [`sculpin_site.yml`](/app/config/sculpin_site.yml) file. Commit this change alongside your new guide.
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
Please provide at least "name" and "bio". The "gplus" url is useful to show your author info on Google search results.


## Submit a Pull Request

When you're done making changes, [submit a pull request](https://github.com/pantheon-systems/documentation/compare/).

We will review and comment on pull requests within three business days. We may suggest some changes, improvements, or alternatives.

Some things to follow to help increase the chance that your pull request will be accepted:

* Follow our [style guide](https://github.com/pantheon-systems/documentation/blob/master/style-guide.md).
* Write a [good commit message][commit].
* Build and test locally to make sure everything looks good. Refer to [README](https://github.com/pantheon-systems/documentation/blob/master/README.md) for instructions.

[style]: https://docs.getpantheon.com/style-guide.html
[commit]: http://chris.beams.io/posts/git-commit/

## Use of Images

See the [Images Readme](https://github.com/pantheon-systems/documentation/blob/master/source/docs/assets/images/readme.md).

# Additional Resources

* [General GitHub Documentation](http://help.github.com/)
* [GitHub Pull Request Documentation](http://help.github.com/send-pull-requests/)
* #pantheon IRC channel on freenode.org


####TODO
- [ ] Identify contribution types
