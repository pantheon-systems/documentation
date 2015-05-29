---
title: Visual regression testing and perceptual diffing with Wraith
description: Set up the Drupal reroute_email module.
category:
  - testing
  - Drupal
  - WordPress
authors:
  - kate
date: 5/29/2015
---

Theme changes, particuarly CSS changes, can have unexpected consequences and visual mistakes can be hard to spot. Visual regression testing uses screenshot comparisons to automatically detect visual changes and report them back to you. This guide will show you how to use <a href="https://github.com/BBC-News/wraith/">Wraith</a>, a visual regression tool, to check for css, layout, graphical and other visual mistakes on your Pantheon websites.

Wraith works by crawling two websites, taking screenshots of both, and then comparing them pixel by pixel with an image comparison tool. This process produces sets of composite images, also called a visual diffs, that will show you if anything's changed.

This is what a visual diff image looks like. In the following screenshot, the accidental removal of the date field on the lower right caused spacing and other changes. These changes were automatically detected and highlighted in red.

![Visual Regression Date Change](/source/docs/assets/images/visual-date-diff.png)


## Install

Wraith uses a scriptable browser without a viewport, also known as a headless browser, to crawl websites and take screenshots. Wraith fully supports PhantomJS, a headless webkit/chrome browser, for versions between 1.82 and 2.0.0. Wraith also needs the ImageMagick library to do image comparisons.

Wraith can also use CasperJS to isolate and compare portions of a website with CSS selectors. This is super useful for comparing sites with dynamic content. When installing CasperJS, it's important to use the latest version, presently this is 1.1-beta3.

Here's how to install PhantomJS, ImageMagick, CasparJS and Wraith on OS X or Linux.

#### OS X

Install via homebrew

```
brew install phantomjs198
brew install imagemagick
brew install casperjs --devel
```

#### Linux:

On ubuntu:

```
sudo apt-get install phantomjs
sudo apt-get install imagemagick
npm install -g casperjs
```

Finally, it's time to install Wraith. Wraith runs on the command-line and installs as a Ruby gem. If you're running Wraith on Linux you may need to install Ruby first.

```
gem install wraith
```

Wraith should now be accessible from the command line.

```
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

## Configure

Wraith stores its configuration in a YAML file that it can generate for you.  Here's how to set this up.

1. Create a directory to store your wraith configuration files.
   ```
   mkdir wraith
   cd wraith
   ```
2. Use the wraith setup command to generate a Wraith YAML configuration file and browser navigation script.
   ```
   wraith setup
   ```
   You should see the following output:
   ```
   create  configs/config.yaml
   create  javascript/snap.js
   ```
   Notice that Wraith also created the JavaScript file javascript/snap.js, which is a browser navigation script for PhantomJS. This script can be modified to increase the reliability of your screenshot captures by changing the browser timeout from five seconds to ten. Open the javascript/snap.js file in an editor, scroll to the end, and replace the number 5000 with 10000.
   ```
   // Sometimes, straggling requests never make it back, in which
   // case, timeout after 5 seconds and render the page anyway
   final_timeout = setTimeout(function() {
     console.log('Snapping ' + url + ' at width ' + view_port_width);
     page.render(image_name);
     phantom.exit();
   }, 10000);
  ```
3. Next, the configs/config.yaml file will need to be edited to crawl and capture your websites. For this guide I'm comparing a default install of Panopoly on my Pantheon dev and test environments. Open configs/config.yaml, go to the domains label, and change the default values to two websites you want to visually compare.
  ```
  domains:
  dev: "http://dev-panopoly-dreams.pantheon.io"
  test: "http://test-panopoly-dreams.pantheon.io"
  ```
4. You will also need to add navigation paths in configs/config.yaml for Wraith to crawl. In the following example, I've edited the 'paths:' to remove the default 'uk_index: /uk' item and added some additional pages for Wraith to compare.
  ```
  paths:
  home: /
  login: /user/login
  great-vegetables: /content/great-vegetables
  lovely-vegetables: /content/lovely-vegetables
  ```
4. Finally, run wraith.
   ```
   wraith capture config
   ```
   Wraith will navigate your two websites and generate an image comparison gallery. Open wraith/snaps/gallery.html in a web browser to view the results.
   ![Full Screen Diff Example](/source/docs/assets/images/fullscreen-diff.png)

## Capture with Selectors

Wraith can capture portions of a website with CSS selectors and display them in the gallery alongside full page captures.  This feature is useful to isolate static content when testing pages with dynamic functionality.

1. Install CasperJS. To use selectors you will need to install the latest development version of CasperJS as described in the install section of this guide.
2. Generate a CasperJS configuration file and navigation script.
   ```
   <pre><code>wraith setup_casper</code></pre>
   ```
   This should produce the following output:
   ```
   create  configs/component.yaml
   create  javascript/casper.js
   ```
3. Edit the new configuration file, configs/component.yaml, to re-add the domains and paths.  Note the path format has changed to support URL components with selectors.
  ```
domains:
dev: "http://dev-panopoly-dreams.pantheon.io"
test: "http://test-panopoly-dreams.pantheon.io"

...

paths:
  header:
    path: /
    selector: "#header"
  ```
4. Tweak the capture time in javascript/casper.js to increase the reliability of the screenshot captures. Change this.wait's timeout from 2000 to 10000.
  ```
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
5. Run Wraith to produce a new gallery from the selectors. Note the generated configuration filename changed to component.yaml. The Wraith command is now:
   ```
   wraith capture component
   ```
   ![Headers Diff Example](/source/docs/assets/images/headers-diff.png)


## History Mode

Wraith supports capturing and comparing a single website against previous revisions of itself with a history mode. To set it up, edit the YAML configuration file to remove one of the domains and add a history_dir folder.

```
domains:
  dev: "http://dev-panopoly-dreams.pantheon.io"

# Type the name of the directory that shots will be stored in​
directory: "shots"​
history_dir: "shots_history"​
```

The command `wraith history` will populate the history_dir with a baseline set of images and the command `wraith latest` will compare them against the current website.<

## Wraith Artifacts

Wraith's output can be hooked into your continuous integration setup and/or build notification tools. When Wraith performs comparisons it creates a folder for each of the path keys in your configuration file. These folders contain the comparison images along with a text file specifying the amount of numeric change between them. If any of these numbers are greater than zero then a change has been detected and your scripts can react accordingly.

## Additional Options

Additonal browser options and tweaks can be made by modifying the navigation scripts and configuration files. Possibilities include specifying custom viewport heights, loading pages without JavaScript, or even the page capture timeout modifications described previously in this guide. Examples are located in the Wraith GitHub repository under <a href="https://github.com/BBC-News/wraith/tree/master/configs">configs</a> and <a href="https://github.com/BBC-News/wraith/tree/master/lib/wraith/javascript">javascript</a>.

Wraith also supports captures with Firefox through SlimerJS as well as additional YAML configuration options not described here. More information is available in the <a href="https://github.com/BBC-News/wraith">Wraith GitHub repository</a>.








