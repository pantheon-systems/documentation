---
contenttype: [partial]
categories: [cli]
cms: [drupal]
product: [--]
integration: [drush]
tags: [--]
reviewed: ""
---

See the [Drush Drupal Compatibility chart](https://www.drush.org/latest/install/#drupal-compatibility) for version compatibility information. Consider the following information when determining which Drush version is best suited for your site.


### Drush Requirements and Compatibility

| Drush Version  | PHP Version | End of Life  | Available in `pantheon.yml` | Drupal 7| Drupal 8 ⚠️ <Popover title="Drupal 8 EOL" content="Drupal 8 is past its end of life date. While a version of Drush may function with Drupal 8, do not build for the future on that combination" /> | Drupal 9+
| ------------- |-------------|-------------|-------------   |------------- |-------------  |-----------  |
| 12      | 8.1+     | TBD      |   ⚠️ <Popover title="Use Site-Local Installation" content="To use this version of Drush, do not specify a version of Drush in pantheon.yml and specify this version with Composer instead" /> |   <span style="color:red">❌ </span>    |<span style="color:red">❌ </span> |<span style="color:green">✔</span>  |
| 11      | 7.4+     | Nov. 2023    |   ⚠️  <Popover title="Use Site-Local Installation" content="To use this version of Drush, do not specify a version of Drush in pantheon.yml and specify this version with Composer instead" />   |  <span style="color:red">❌ </span>    |<span style="color:red">❌ </span> |<span style="color:green">✔</span>  |
| 10      | 7.1+ | Jan. 2022 |   <span style="color:green">✔</span>  | ❌ | ⚠️ <Popover title="Drupal 8 EOL" content="Drupal 8 is past its end of life date. While this version of Drush may function with Drupal 8, do not build for the future on this combination" /> | ⚠️ <Popover title="Upgrade recommended" content="Drush 10 may function with the newest version of Drupal but we can only provide support assistance to sites using newer versions of Drush" />|
| 9      | 5.6+     | May 2020   |   <span style="color:green">✔</span>    | ❌      | ⚠️ <Popover title="Drupal 8 EOL" content="Drupal 8 is past its end of life date. While this version of Drush may function with Drupal 8, do not build for the future on this combination" /> |<span style="color:red">❌ </span>|
| 8     | 5.4.5+     | Nov. 2022  |    <span style="color:green">✔</span>    | <span style="color:green">✔</span>    | ⚠️ <Popover title="Drupal 8 EOL" content="Drupal 8 is past its end of life date. While this version of Drush may function with Drupal 8, do not build for the future on this combination" />    |<span style="color:red">❌ </span>|
| 7      | 5.3.0+     | July 2017  |   <span style="color:green">✔</span>    |   ⚠️ <Popover title="Available but unsupported" content="Drush 7 is long past it's End of Life date and is kept available only to serve out-of-date sites." />   |<span style="color:red">❌ </span>  |<span style="color:red">❌ </span>|
| 6      | 5.3.0+     | Dec. 2015 |   ❌    | ⚠️ <Popover title="Available but unsupported" content="Drush 6 is long past it's End of Life date and is kept available only to serve out-of-date sites."  /> |<span style="color:red">❌ </span> |<span style="color:red">❌ </span>|
| 5     | 5.2.0+    | May 2015  |   <span style="color:green">✔</span>   | ⚠️ <Popover title="Available but unsupported" content="Drush 5 is long past it's End of Life date and is kept available only to serve out-of-date sites." />                    |<span style="color:red">❌ </span>  |<span style="color:red">❌ </span>

Refer to our guide on [Upgrading PHP Versions](/guides/php/php-versions) for more information.
