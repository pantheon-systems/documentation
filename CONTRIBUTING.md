# Contributing

Help us create relevant and useful content for developers like yourself. See something you'd like to add or change? We love pull requests! We won't just thank you for your work, we will compensate you as well.

## Get Started

### External Contributors

* If you don't have one already, sign up for a [GitHub account](https://github.com/signup/free).
* Fork the pantheon-systems/documentation repository on GitHub. Trying to edit or create a file in this repository will create your fork automatically.
* Optional: Clone your fork locally.

### Pantheon Employees
* Clone the pantheon-systems/documentation repository to your local machine.

## Edit Docs

1. Search existing issues; if you can't find anything related to what you want to work on, open a new issue so that you can get some initial feedback.
2. Locally, cd to the `documentation` repository and use `git checkout -b <new-branch-name>` to switch to a new branch.
3. Edit existing docs using GitHub's inline markdown editor or clone your fork, edit locally, commit changes, and push to your fork. You'll need to do this for every individual doc you edit.

## Add a New Doc

All of our articles and guides are generated from markdown files in the repository, located at [`source/docs/articles/`](/source/docs/articles/) and [`source/docs/guides/`](source/docs/guides/), respectively. These markdown files must have frontmatter that matches the patterns within the document. 

If you're creating your first guide, you must also create an Author profile in the [`sculpin_site.yml`](/app/config/sculpin_site.yml) file. Include it in the pull request with your guide.

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

* [General GitHub documentation](http://help.github.com/)
* [GitHub pull request documentation](http://help.github.com/send-pull-requests/)
* #pantheon IRC channel on freenode.org


####TODO
- [ ] Identify contribution types
