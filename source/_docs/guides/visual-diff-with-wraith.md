---
title: Using Wraith for Visual Regression Testing
description: Learn how to use Wraith for visual regression testing with composite images.
tags: [siteintegrations]
categories: []
type: guide
permalink: docs/guides/:basename/
contributors:
  - kate
date: 5/29/2015
---

Theme changes, particularly CSS changes, can have unexpected consequences that make visual mistakes hard to spot. Visual regression testing uses screenshot comparisons to automatically detect changes and report them back to you. This guide will show you how to use [Wraith](https://github.com/BBC-News/wraith/) to test CSS, layout, graphical and other visual changes on your Pantheon websites using visual regression.

Wraith works by crawling two websites, taking screenshots of both, and then comparing them pixel by pixel with an image comparison tool. This process produces sets of composite images, also known as visual diffs, that illustrate changes.

In the following example, the accidental removal of the date field on the lower right caused spacing and other changes. These changes were automatically detected and highlighted in red.

![Visual Regression Date Change](/source/docs/assets/images/visual-date-diff.png)


## Installation

To begin, you will need to install a scriptable browser without a viewport which allows Wraith to crawl websites and take screenshots. Wraith fully supports PhantomJS for versions between 1.82 and 1.9.8.

Wraith needs the ImageMagick library to do image comparisons. Additionally, Wraith can use CasperJS to isolate and compare portions of a website with CSS selectors. This is super useful for comparing sites with dynamic content. When installing CasperJS, it's important to use the latest version.

### Install Wraith on OS X

Install via [Homebrew](http://brew.sh/):

```nohighlight
brew install phantomjs198
brew install imagemagick
brew install casperjs --devel
```

### Install Wraith on Linux

On Ubuntu:

```nohighlight
sudo apt-get install phantomjs
sudo apt-get install imagemagick
npm install -g casperjs
```
<hr>

Wraith runs on the command line and installs as a Ruby gem. If you're running Wraith on Linux, you may need to install Ruby first. To install Wraith, run the following command:

```nohighlight
gem install wraith
```

Wraith should now be accessible from the command line.

```nohighlight
$ wraith

  Commands:
    wraith capture [config_name]              # A full Wraith job
    wraith compare_images [config_name]       # compares images to generate diffs
    wraith copy_base_images [config_name]     # copies the required base images over for comparison with latest images
    wraith crop_images [config_name]          # crops images to the same height
    wraith generate_gallery [config_name]     # create page for viewing images
    wraith generate_thumbnails [config_name]  # create thumbnails for gallery
    wraith help [COMMAND]                     # Describe available commands or one specific command
    wraith history [config_name]              # Setup a baseline set of shots
    wraith latest [config_name]               # Capture new shots to compare with baseline
    wraith multi_capture [filelist]           # A Batch of Wraith Jobs
    wraith reset_shots [config_name]          # removes all the files in the shots folder
    wraith save_images [config_name]          # captures screenshots
    wraith setup                              # creates config folder and default config
    wraith setup_folders [config_name]        # create folders for images
    wraith validate [config_name]             # checks your configuration and validates that all required properties exist
```

### Install Wraith on Windows

See Wraith's [installation guide](http://bbc-news.github.io/wraith/os-install.html#InstallonWindows) to install on Windows.

## Configure and Run Wraith

Wraith stores its configuration within a self-generated YAML file. To set this up, we'll first have to create a directory to store your Wraith configuration files:
```nohighlight
mkdir wraith
cd wraith
```
Next, use the `wraith setup` command to generate a Wraith YAML configuration file and browser navigation script:
```nohighlight
wraith setup
```
You should see the following output:
```nohighlight
create  configs
create  configs/capture.yaml
create  configs/history.yaml
create  configs/spider.yaml
create  javascript
create  javascript/cookies_and_headers--casper.js
create  javascript/cookies_and_headers--phantom.js
create  javascript/disable_javascript--casper.js
create  javascript/disable_javascript--phantom.js
create  javascript/interact--casper.js
create  javascript/interact--phantom.js
create  javascript/wait--casper.js
create  javascript/wait--phantom.js
```
Notice that Wraith also created the JavaScript file `javascript/wait--phantom.js`, which is a browser navigation script for PhantomJS. This script can be modified to increase the reliability of your screenshot captures by changing the browser timeout from two seconds to ten.

Open the `javascript/wait--phantom.js` file in an editor, scroll to the end, and replace the number 2000 with 10000.

```javascript
// ######################################################
// This is an example module provided by Wraith.
// Feel free to amend for your own requirements.
// ######################################################
module.exports = function (phantom, ready) {
    // make Wraith wait a bit longer before taking the screenshot
    setTimeout(ready, 10000); // you MUST call the ready() callback for Wraith to continue
}
```
Next, the `configs/capture.yaml` file will need to be modified to crawl and capture your websites. For this guide I'm comparing a default installation of Panopoly on my Pantheon Dev and Test environments.

Open `configs/capture.yaml`, go to the `domains` label, and change the default values to two websites you want to visually compare.
```yaml
domains:
  dev: "http://dev-panopoly-dreams.pantheon.io"
  test: "http://test-panopoly-dreams.pantheon.io"
```
You also need to add navigation paths in `configs/capture.yaml` for Wraith to crawl. In the following example, I've edited the `paths:` to remove the default `about` and `contact` items and added some additional pages for Wraith to compare.
```yaml
paths:
  home: "/"
  login: "/user/login"
  great-vegetables: "/content/great-vegetables"
  lovely-vegetables: "/content/lovely-vegetables"
```
Next, update the global `before_capture:` hook and replace its value with the `javascript/wait--phantom.js` script you updated.
```yaml
# (optional) JavaScript file to execute before taking screenshot of every path. Default: nil
#before_capture: 'javascript/disable_javascript--phantom.js'
before_capture: 'javascript/wait--phantom.js'
```
<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
 <p>YAML is space sensitive. Domain and Path entries in the code snippets above should be spaced as illustrated within your local editor.</p></div>
Finally, execute Wraith:
```nohighlight
wraith capture capture
```
Wraith will navigate your two websites and generate an image comparison gallery. Open `wraith/shots/gallery.html` in any web browser to view the results. You can do this by using the browser application (e.g. File > Open File) or by running the following command from within the wraith directory:
```nohighlight
open shots/gallery.html
```
![Full Screen Diff Example](/source/docs/assets/images/fullscreen-diff.png)

## Capture with Selectors

Wraith can capture portions of a website with CSS selectors and display them in the gallery alongside full page captures.  This feature is useful to isolate static content when testing pages with dynamic functionality.
<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">The latest development version of CasperJS is required to use CSS selectors with Wraith. Please see the above [Install](#installation) section for instructions.</p></div>

First, edit `configs/capture.yaml` to change the `browser:` setting to `casperjs`.
```yaml
# (required) The engine to run Wraith with. Examples: 'phantomjs', 'casperjs', 'slimerjs'
browser: "casperjs"
```

Edit the new configuration file, `configs/capture.yaml`, to add selectors to the paths.  Note the path format has changed to support URL components with selectors.
```yaml
domains:
  dev: "http://dev-panopoly-dreams.pantheon.io"
  test: "http://test-panopoly-dreams.pantheon.io"

...

paths:
  home:
    path: "/"
    selector: "#header"
```
To increase the reliability of the screenshot captures, tweak the capture time in `javascript/wait--casper.js`. Change the timeout from 2000 to 10000.
```javascript
// ######################################################
// This is an example module provided by Wraith.
// Feel free to amend for your own requirements.
// ######################################################
module.exports = function (phantom, ready) {
    // make Wraith wait a bit longer before taking the screenshot
    setTimeout(ready, 10000); // you MUST call the ready() callback for Wraith to continue
}
```
Finally, tweak the `before_capture:` line in `configs/capture.yaml` to use the CasperJS wait script.
```yaml
# (optional) JavaScript file to execute before taking screenshot of every path. Default: nil
before_capture: 'javascript/wait--casper.js'
```
Run Wraith to produce a new gallery from the selectors. To execute this Wraith test, run the following command:
```nohighlight
wraith capture capture
```
![Headers Diff Example](/source/docs/assets/images/headers-diff.png)


## History Mode

Wraith supports capturing and comparing a single website against previous revisions of itself with a history mode. To set it up, edit the YAML configuration file to remove one of the domains and add a `history_dir` folder.

```yaml
domains:
  dev: "http://dev-panopoly-dreams.pantheon.io"

...

# (required) The directory that your screenshots will be stored in
directory: "shots"​
history_dir: "shots_history"​
```

The command `wraith history` will populate `history_dir` with a baseline set of images and the command `wraith latest` will compare them against the current website.

## Wraith Artifacts

Wraith's output can be hooked into your continuous integration setup and/or build notification tools. When Wraith performs comparisons, it creates a folder for each of the path keys in your configuration file. These folders contain the comparison images along with a text file specifying the amount of numeric change between them. If any of these numbers are greater than zero, a change has been detected and your scripts can react accordingly.

## Additional Options

More browser options and tweaks can be made by modifying the navigation scripts and configuration files. Possibilities include specifying custom viewport heights, loading pages without JavaScript, or even the page capture timeout modifications described previously in this guide. Examples are located in the Wraith GitHub repository under [configs](https://github.com/BBC-News/wraith/tree/master/templates/configs) and [javascript](https://github.com/BBC-News/wraith/tree/master/templates/javascript).

Wraith also supports captures with Firefox through SlimerJS as well as additional YAML configuration options not described here. More information is available in the [Wraith GitHub repository](https://github.com/BBC-News/wraith).
