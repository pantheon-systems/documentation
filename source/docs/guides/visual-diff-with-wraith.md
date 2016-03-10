---
title: Using Wraith for Visual Regression Testing
description: Learn how to use Wraith for visual regression testing with composite images.
category:
  - testing
  - Drupal
  - WordPress
authors:
  - kate
date: 5/29/2015
---

Theme changes, particularly CSS changes, can have unexpected consequences that make visual mistakes hard to spot. Visual regression testing uses screenshot comparisons to automatically detect changes and report them back to you. This guide will show you how to use [Wraith](https://github.com/BBC-News/wraith/) to test CSS, layout, graphical and other visual changes on your Pantheon websites using visual regression.

Wraith works by crawling two websites, taking screenshots of both, and then comparing them pixel by pixel with an image comparison tool. This process produces sets of composite images, also known as visual diffs, that illustrate changes.

In the following example, the accidental removal of the date field on the lower right caused spacing and other changes. These changes were automatically detected and highlighted in red.

![Visual Regression Date Change](/source/assets/images/visual-date-diff.png)


## Install

To begin, you will need to install a scriptable browser without a viewport which allows Wraith to crawl websites and take screenshots. Wraith fully supports PhantomJS for versions between 1.82 and 2.0.0.

Wraith needs the ImageMagick library to do image comparisons. Additionally, Wraith can use CasperJS to isolate and compare portions of a website with CSS selectors. This is super useful for comparing sites with dynamic content. When installing CasperJS, it's important to use the latest version.

### OS X

Install via [Homebrew](http://brew.sh/):

```bash
brew install phantomjs198
brew install imagemagick
brew install casperjs --devel
```

### Linux:

On Ubuntu:

```bash
sudo apt-get install phantomjs
sudo apt-get install imagemagick
npm install -g casperjs
```
<hr>

Wraith runs on the command line and installs as a Ruby gem. If you're running Wraith on Linux, you may need to install Ruby first. To install Wraith, run the following command:

```bash
gem install wraith
```

Wraith should now be accessible from the command line.

```bash
$ wraith

  Commands:
    wraith capture [config_name]              # A full Wraith job
    wraith compare_images [config_name]       # compares images to generate diffs
    wraith crop_images [config_name]          # crops images to the same height
    wraith generate_gallery [config_name]     # create page for viewing images
    wraith generate_thumbnails [config_name]  # create thumbnails for gallery
    wraith help [COMMAND]   # Describe available commands or one specific command
    wraith history [config_name]              # Setup a baseline set of shots
    wraith latest [config_name]               # Capture new shots to compare with baseline
    wraith multi_capture [filelist]           # A Batch of Wraith Jobs
    wraith reset_shots [config_name]          # removes all the files in the shots folder
    wraith save_images [config_name]          # captures screenshots
    wraith setup            # creates config folder and default config
    wraith setup_casper     # creates config folder and default config for casper
    wraith setup_folders [config_name]        # create folders for images
```

## Configure and Run Wraith

Wraith stores its configuration within a self-generated YAML file. To set this up, we'll first have to create a directory to store your Wraith configuration files:
```nohighlight
mkdir wraith
cd wraith
```
Next, use the `wraith setup` command to generate a Wraith YAML configuration file and browser navigation script:
```bash
wraith setup
```
You should see the following output:
```bash
create  configs/config.yaml
create  javascript/snap.js
```
Notice that Wraith also created the JavaScript file `javascript/snap.js`, which is a browser navigation script for PhantomJS. This script can be modified to increase the reliability of your screenshot captures by changing the browser timeout from five seconds to ten.

Open the `javascript/snap.js` file in an editor, scroll to the end, and replace the number 5000 with 10000.

```javascript
// Sometimes, straggling requests never make it back, in which
// case, timeout after 5 seconds and render the page anyway
final_timeout = setTimeout(function() {
console.log('Snapping ' + url + ' at width ' + view_port_width);
page.render(image_name);
phantom.exit();
}, 10000);
```
Next, the `configs/config.yaml` file will need to be modified to crawl and capture your websites. For this guide I'm comparing a default installation of Panopoly on my Pantheon Dev and Test environments.

Open `configs/config.yaml`, go to the `domains` label, and change the default values to two websites you want to visually compare.
```javascript
domains:
  dev: "http://dev-panopoly-dreams.pantheon.io"
  test: "http://test-panopoly-dreams.pantheon.io"
```
You also need to add navigation paths in `configs/config.yaml` for Wraith to crawl. In the following example, I've edited the `paths:` to remove the default `uk_index: /uk` item and added some additional pages for Wraith to compare.
```nohighlight
paths:
  home: /
  login: /user/login
  great-vegetables: /content/great-vegetables
  lovely-vegetables: /content/lovely-vegetables
```
<div class="alert alert-info" role="alert">
<h4>Note</h4>
 YAML is space sensitive. Domain and Path entries in the code snippets above should be spaced as illustrated within your local editor.</div>
Finally, execute Wraith:
```bash
wraith capture config
```
Wraith will navigate your two websites and generate an image comparison gallery. Open `wraith/shots/gallery.html` in any web browser to view the results. You can do this by using the browser application (e.g. File > Open File) or by running the following command from within the wraith directory:
```bash
open shots/gallery.html
```
![Full Screen Diff Example](/source/assets/images/fullscreen-diff.png)

## Capture with Selectors

Wraith can capture portions of a website with CSS selectors and display them in the gallery alongside full page captures.  This feature is useful to isolate static content when testing pages with dynamic functionality.
<div class="alert alert-info" role="alert">
<h4>Note</h4>
The latest development version of CasperJS is required to use CSS selectors with Wraith. Please see the above <a href="#install">Install</a> section for instructions.</div>

Generate a CasperJS configuration file and navigation script.
```bash
wraith setup_casper
```
This should produce the following output:
```bash
create  configs/component.yaml
create  javascript/casper.js
```
Edit the new configuration file, `configs/component.yaml`, to re-add the domains and paths.  Note the path format has changed to support URL components with selectors.
```javascript
domains:
  dev: "http://dev-panopoly-dreams.pantheon.io"
  test: "http://test-panopoly-dreams.pantheon.io"

...

paths:
  header:
    path: /
    selector: "#header"
```
To increase the reliability of the screenshot captures, tweak the capture time in `javascript/casper.js`. Change the `this.wait` timeout from 2000 to 10000.
```javascript
casper.start(url, function() {
  this.viewport(view_port_width, 1500).then(function(){
    this.wait(10000, function() {
      if (selector == undefined) {
        this.capture(image_name);
      }
      else {
        this.captureSelector(image_name, selector);
      }
      console.log('Snapping ' + url + ' at width ' + view_port_width);
    });
  });
});
```
Run Wraith to produce a new gallery from the selectors. Note the generated configuration filename changed to `component.yaml`. To execute this Wraith test, run the following command:
```bash
wraith capture component
```
![Headers Diff Example](/source/assets/images/headers-diff.png)


## History Mode

Wraith supports capturing and comparing a single website against previous revisions of itself with a history mode. To set it up, edit the YAML configuration file to remove one of the domains and add a `history_dir` folder.

```javascript
domains:
  dev: "http://dev-panopoly-dreams.pantheon.io"

# Type the name of the directory that shots will be stored in​
directory: "shots"​
history_dir: "shots_history"​
```

The command `wraith history` will populate `history_dir` with a baseline set of images and the command `wraith latest` will compare them against the current website.

## Wraith Artifacts

Wraith's output can be hooked into your continuous integration setup and/or build notification tools. When Wraith performs comparisons, it creates a folder for each of the path keys in your configuration file. These folders contain the comparison images along with a text file specifying the amount of numeric change between them. If any of these numbers are greater than zero, a change has been detected and your scripts can react accordingly.

## Additional Options

More browser options and tweaks can be made by modifying the navigation scripts and configuration files. Possibilities include specifying custom viewport heights, loading pages without JavaScript, or even the page capture timeout modifications described previously in this guide. Examples are located in the Wraith GitHub repository under [configs](https://github.com/BBC-News/wraith/tree/master/configs) and [javascript](https://github.com/BBC-News/wraith/tree/master/lib/wraith/javascript).

Wraith also supports captures with Firefox through SlimerJS as well as additional YAML configuration options not described here. More information is available in the [Wraith GitHub repository](https://github.com/BBC-News/wraith).
