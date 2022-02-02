---
title: WordPress wp_options Table Autoloading Cache
description: Learn more about checking and configuring autoloading cache in the wp_options table.
cms: "WordPress"
categories: [performance]
tags: [cache]
---

The `wp_options` table stores several types of data for your site, including:

    - settings for your plugins, widgets, and themes
    - temporarily cached data
    - site URL and home URL
    - category settings
    - autoloaded data

 If your website is running slow and you receive the following message in the database stats: `consider autoloading only necessary options`, follow the steps below.

 First, start by checking the size of your autoloaded data.

1. Log in to your [MySQL client](/mysql-access).

1. Select your database and then click the `SQL` tab.

1. Run the following code:

    ```sql
    SELECT SUM(LENGTH(option_value)) as autoload_size FROM example_options WHERE autoload='yes';
    ```

    If your autoloaded data is less than 1 MB, it is unlikely that autoloaded data is slowing down your site. If your data is higher than 1 MB, you have a high number of options being autoloaded, and it is most likely slowing down your site.

1. Run the following code to see the top items with autoloaded data:

    ```sql
    SELECT option_name, length(option_value) AS option_value_length FROM example_options WHERE autoload='yes' ORDER BY option_value_length DESC LIMIT 10;
    ```

1. Run the following code if you want to turn off autoload for an item:

    ```sql
    update_option( 'example_option', 'value' ); to be update_option( 'example_option', 'value', 'no' );
    ```

    You must specify `no` in the third parameter (if left blank it will default to `yes`). 

 