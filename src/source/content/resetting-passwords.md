---
title: Resetting Passwords
description: Learn how to reset passwords for WordPress, Drupal, and the Pantheon Dashboard.
tags: [dashboard, teams, users, security]
contenttype: [doc]
innav: [true]
showtoc: true
categories: [dashboard, security]
cms: [drupal, wordpress]
audience: [agency, development]
product: [dashboard]
integration: [--]
---

## Pantheon Dashboard Login

If you need to reset your Pantheon Dashboard user password, logout and visit the [Dashboard password reset page](https://dashboard.pantheon.io/reset-password) and follow the instructions.

If you need to reset the password for your account on your Drupal or WordPress site, you have several options:

- Use the password reset link provided by Drupal or WordPress (easiest).
- Use Terminus to set your password via either Drush or WP-CLI.
- Reset your password directly in the MySQL database (advanced).
- WordPress only: use the Emergency Password Reset script.

## Drupal Site User Login

### Password reset link from Drupal

If you need to reset your Drupal site user login, append `/user/password` to your site's URL and follow the directions to reset your password. For example, to reset the password for the development environment of mysite, you would visit the following example link:

```none
https://dev-mysite.pantheonsite.io/user/password
```

In the password reset form, enter either the username or email address you used to sign up for the administrative account, and you will receive an email with a link. When you click the link in your email, you will be logged in to your site and brought to your user profile edit page, where you can reset your password. You need to enter your new password at this point. Don’t leave the page without setting a new password, or else you will have to go through this  process again the next time you want to login to your Drupal site.

Please keep in mind that your site password is stored in a database, so whatever you set in the Development environment may be different than Test or live, unless you keep the database content synced between the environments using the tools in Database / Files tab of the Pantheon Dashboard or during deployment.

### Use Terminus Drush to set a password

If you still can’t get access to your site using password reset, for example if you don't have access to the corresponding email address for the account, you can still generate a one-time password reset link by using the following [Terminus](/terminus) command for generating one-time login links:

```bash{promptUser: user}
terminus drush <site>.<env> -- user-login
```

Or you can reset any user's password from the command line:

<TabList>

<Tab title="Drupal 8" id="drupal8" active={true}>

Run the [`user-password` Drush command](https://drushcommands.com/drush-8x/user/user-password/) in [Terminus](/terminus). Be sure to update `user-password` and `user_name` in the example.

```bash{promptUser: user}
terminus drush <site>.<env> -- user-password user_name --password='Astr0nGP455w0rD'
```

</Tab>

<Tab title="Drupal 9 and higher" id="d9+">

Run the command below in [Terminus](/terminus). Be sure to update `user-password` and `user_name` in the example.

```bash{promptUser: user}
terminus drush <site>.<env> -- user-password user_name 'Astr0nGP455w0rD'
```

</Tab>

</TabList>


### Reset your password directly in the database (advanced)

If an application issue is preventing a password reset via Terminus, you may need to do a password reset or add a new user account directly in the MySQL database. See the documentation on [drupal.org](https://www.drupal.org/node/44164) and [Accessing MySQL Databases](/guides/mariadb-mysql/mysql-access) for more information.

## WordPress Site User Login

### Password reset link from WordPress

1. From the main login form, click **Lost Your Password?**.

1. Enter your username or password, and click **Get New Password**.

You will receive an email that contains a link you can use one time to reset your password. When you click the link, enter your new password twice. It will also show you the strength of your new password; however, it will not prevent you from using a weak password.

### Use Terminus WP-CLI to set a password

You can reset any user's password from the command line by running [WP-CLI's `user update` command](https://wp-cli.org/commands/user/update/) via [Terminus](/terminus):

```bash{promptUser: user}
terminus wp <site>.<env> -- user update you@example.com --user_pass=NEWPASSWORD
```

Remember to change the password from the example above.

As a side note, `terminus 'wp user update'` can be used to change almost any property of a WordPress user's account. `wp_update_user()` gives a complete list of all the fields that can be changed. You can change any of them by using `--field=value`. In the above command, field is "user_pass" and value is NEWPASSWORD.

### Reset your password directly in the database (advanced)

If an application issue is preventing a password reset via Terminus, you may need to do a password reset or add a new user account directly in the MySQL database. Please see documentation on [wordpress.org](https://wordpress.org/support/article/resetting-your-password/#through-mysql-command-line) and [Accessing MySQL Databases](/guides/mariadb-mysql/mysql-access) for more information.

### Use the Emergency Password Reset Script

If the other options listed don't work, try the Emergency Password Reset Script. See the [wordpress.org documentation](https://wordpress.org/support/article/resetting-your-password/#using-the-emergency-password-reset-script) for instructions.  Please note that it's not a plugin but a PHP script. For security reasons, remember to delete the script when you are done.
