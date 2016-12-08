---
title: Enable Debugging in Drupal 8
description:
tags: [troubleshoot]
categories: [troubleshoot]
contributors: [peter-pantheon]
---

The Pantheon Drupal 8 upstream that you use to spin up a new Drupal 8 site on Pantheon will contain all the files that are required to enable verbose debugging. 

You can enable verbose debugging in Drupal 8 by using .yml files that contain environment-specific settings and are located in the sites/default directory. 

This Drupal 8 debugging setup takes into account that verbose debugging output is only ever meant to appear on Dev. The steps outlined below are designed to achieve only that and prevent debugging output and performance-hurting settings from getting deployed to Live unintentionally. See: [Creating a services.yml File for Drupal 8](/docs/services-yml/).

**1. Enable twig debugging.**
  * Rename the provided default.services.pantheon.preproduction.yml to services.pantheon.preproduction.yml 
 
       The needed yaml settings are already included in this file. Twig debugging will output HTML comments in the web page source showing every twig template used and the path to the template. (In order to prevent verbose debugging from accidentally displaying on Test or Live, this preproduction services file will only get loaded on Dev by the settings.pantheon.php file.)

**2. Set verbose logging. Disable CSS/JS aggregation.**
  * Rename the provided example.settings.local.php to settings.local.php
  
       The needed settings are already included and uncommented.
   
**3. Modify cache settings.**
  * Uncomment: # $settings['cache']['bins']['render'] = 'cache.backend.null';
  * Uncomment: # $settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

       These additional settings are found in settings.local.php. This is optional, only change these cache settings if you understand the consequences. Review the comments found in the example.settings.local.php file.
 
**4. Devel module (optional).**
  * Download and install Devel module:
 ```
 drush en devel -y
 ```
  * Enable the included Web Profiler module (D8 only):
 ```
 drush en webprofiler
 ```

## Settings and Services Files for Drupal 8 on Pantheon

For reference, this is the inclusions and loading order of settings and services files for Drupal 8 on Pantheon:

<table class="table  table-bordered table-responsive">
  <tbody>
    <tr>
      <td>default.settings.php<br />copied to<br />settings.php</td>
      <td> (Occurs upon site installation)</td>
    </tr>
    <tr>
      <td>default.services.yml<br />copied to<br />services.yml </td>
      <td>(Optional, done by developer, not automatic)</td>
    </tr>
    <tr>
      <td>settings.php</td>
      <td>Includes:<br /> 
   1. services.yml (if found) [template file: default.services.yml],<br />2. settings.pantheon.php (contains custom Pantheon settings, must always be included),<br />3. settings.local.php (if found) [template file: example.settings.local.php]</td>
    </tr>
    <tr>
      <td>settings.pantheon.php</td>
      <td>Includes:<br />
   1. services.pantheon.preproduction.yml (loads on Dev only) [template file: default.services.pantheon.preproduction.yml]<br />or<br />services.pantheon.production.yml (loads on Test and Live)</td>
    </tr>
    <tr>
      <td>settings.local.php</td>
      <td>Includes:<br />
   1. development.services.yml</td>
    </tr>

  </tbody>
</table>

To further clarify, if your Drupal 8 site were using all the settings and services files this would be the loading order on Dev:

settings.php  
services.yml  
settings.pantheon.php  
services.pantheon.preproduction.php  
settings.local.php  
development.services.yml  
 
View the following [Drupal.org](https://drupal.org) resources for more information:

- [Debugging Twig templates](https://www.drupal.org/docs/8/theming/twig/debugging-twig-templates)
- [Debugging compiled Twig templates](https://www.drupal.org/docs/8/theming/twig/debugging-compiled-twig-templates)
- [Locating Template Files with Debugging](https://www.drupal.org/docs/8/theming/twig/locating-template-files-with-debugging) 
