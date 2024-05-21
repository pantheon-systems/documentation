---
contenttype: [partial]
categories: [cli]
cms: [drupal]
product: [--]
integration: [drush]
tags: [--]
reviewed: ""
---

<Alert title="Note" type="info">

We highly recommend running Drush version 8.3.2 or higher when running Drush locally.

__Is that still true?__


</Alert>

See the [Drush Drupal Compatibility chart](https://www.drush.org/latest/install/#drupal-compatibility) for version compatibility information. Consider the following information when determining which Drush version is best suited for your site.


### Drush Requirements and Compatibility

| Drush Version  | PHP Version | End of Life     | Drupal 7| Drupal 8 ⚠️ <Popover title="Drupal 8 EOL" content="Drupal 8 is past its end of life date. While a version of Drush may function with Drupal 8, do not build for the future on that combination" /> | Drupal 9+
| ------------- |-------------|-------------|-------------   |------------- |-------------  |-----------  |
| 11*      | 7.4+     | TBD      |  <span style="color:red">❌ </span>    |<span style="color:red">❌ </span> |<span style="color:green">✔</span>  |
| 10      | 7.1+ | Jan. 2022| ❌ | ⚠️ <Popover title="Drupal 8 EOL" content="Drupal 8 is past its end of life date. While this version of Drush may function with Drupal 8, do not build for the future on this combination" /> | ⚠️ <Popover title="Upgrade recommended" content="Drush 10 may function with the newest version of Drupal but we can only provide support assistance to sites using newer versions of Drush" />|
| 9      | 5.6+     | May 2020  | ❌      | ⚠️ <Popover title="Drupal 8 EOL" content="Drupal 8 is past its end of life date. While this version of Drush may function with Drupal 8, do not build for the future on this combination" /> |<span style="color:red">❌ </span>|
| 8     | 5.4.5+     | Nov. 2022| <span style="color:green">✔</span>    | ⚠️ <Popover title="Drupal 8 EOL" content="Drupal 8 is past its end of life date. While this version of Drush may function with Drupal 8, do not build for the future on this combination" />    |<span style="color:red">❌ </span>|
| 7      | 5.3.0+     | July 2017|   ⚠️ <Popover title="Available but unsupported" content="Drush 7 is long past it's End of Life date and is kept available only to serve old sites." />   |<span style="color:red">❌ </span>  |<span style="color:red">❌ </span>|
| 6      | 5.3.0+     | Dec. 2015| ⚠️ <Popover title="Available but unsupported" content="Drush 6 is long past it's End of Life date and is kept available only to serve old sites."  /> |<span style="color:red">❌ </span> |<span style="color:red">❌ </span>|
| 5     | 5.2.0+    | May 2015 | ⚠️ <Popover title="Available but unsupported" content="Drush 5 is long past it's End of Life date and is kept available only to serve old sites." />                    |<span style="color:red">❌ </span>  |<span style="color:red">❌ </span>

*Drush 11 is not available through `pantheon.yml`. Drush 11 can only be used through a [site-local installation](#site-local-drush-usage).

Refer to our guide on [Upgrading PHP Versions](/guides/php/php-versions) for more information.
