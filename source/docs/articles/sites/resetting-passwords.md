---
title: Resetting Passwords
description: Learn how to reset your Pantheon and Drupal dashboard passwords.
category:
  - managing
---
## Pantheon Dashboard User Password

If you need to reset your Pantheon dashboard user password, visit this link and follow the instructions:  
 [https://dashboard.getpantheon.com/password](https://dashboard.getpantheon.com/password)

## Drupal Site User Login

If you need to reset your Drupal site user login, append /user/password to your site's URL and follow the directions to reset your password. For example, to reset the password for the development environment of mysite, you would visit the following example link:

    http://dev-mysite.gotpantheon.com/user/password

In the password reset form, enter either the username or email address you used to sign up for the administrative account, and you will receive an email with a link. When you click the link in your email, you will be logged in to your site and brought to your user profile edit page, where you can reset your password. You need to enter your new password at this point. Don’t surf away from the page without setting a new password, or else you will have to go through this whole process again the next time you want to login to your Drupal site.

Please keep in mind that your site password is stored in a database, so whatever you set in the development environment may be different than test or live, unless you keep the database content synced between the environments using the Pantheon dashboard workflow tools, or during deployment.

If you still can’t get access to your site using password reset, for example if you don't have access to the corresponding email address for the account, you can still generate a one-time password reset link by using Drush and your Pantheon site aliases. Here is a Drush command for generating one-time login links:

```
$ drush @pantheon.SITENAME.ENV user-login
```

For further information about using Drush with Pantheon, see our article on the [Drush command-line utility](/docs/articles/local/drush-command-line-utility/).


## WordPress User Login
If your site is powered by WordPress you have two options. The first is to request a password reset from the log in form. From the main login form, click the "Lost Your Password?" link beneath the log in form.  This will take you to a form where you can enter either your username or your email address. Entering either of those and then clicking "Get New Password" will trigger an email to be sent to you. The email will contain a link that you can use one time to reset your password. When you click the link, the form WordPress presents you with asks you to enter your new password twice. It will also show you the strength of your new password, however, it will not prevent you from using a weak password.

If you have access to the site view Terminus, yoyu can also reset yours, or anyone's password from the command line. 

```
$ terminus wp user update \
           --user_pass=NEWPASSWORD \
           --site=YOUR-PANTHEON-SITE-NAME 
           --env=dev|test|live
```

As with most terminus commands, you have to give the site's name and the environment you want to make the change in.

As a side note, `terminus wp user update` can be used to change almost any property of a WordPress user's account. `wp_update_user()` gives a complete list of all the firleds that can be changed. You can change any of them by using `--field=value`. In the above command, field is "user_pass" and value is NEWPASSWORD.

