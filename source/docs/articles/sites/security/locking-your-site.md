---
title: Locking Your Site
description: Learn how to keep your work hidden from the public for development or updates.
category:
  - getting-started
  - drupal
---

## Overview
 **Note**: When a Dev environment is locked, a lock icon will be added to the thumbnail of the site on the Your Sites page.

There are occasions you are working on a site and want to keep your progress hidden from the world as you prepare to Go Live or make updates.

This can be done by putting a username and password on the environment similar to basic authentication on Apache. If a request for a resource on your environment is received and the site is private, the requesting client will have to supply the authentication credentials you set in order to access the site.

## Password Protect Your Site's Environments


1. Select the environment (e.g. Dev), and click **Security**.
2. Click **Locked**.
3. Choose a username and password, and click **Lock Environment**.

![Lock environment](/source/docs/assets/images/lock-environment.png)

If other members of your team on the site need to access the site, they will also be able to view the authentication credentials when they log in to their accounts.

![Credentials](/source/docs/assets/images/environment-access.png)

When your page refreshes, you will notice that the environment is now private. You will also be able to see the credentials needed to access that environment.

You can set a different username and password for each environment. This is important if you only want the Live site publicly viewable, while Dev and Test can be private as you work on your code and content.


To verify that everything is working correctly, visit the URL of the environment that you have made private. You should see an authentication form where you can enter the username and password for that environment to start your session.  

 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/62465)
## Unlock a Site's Environment

When you are ready to make your environment public again, click **Public** on the Security page. This will clear the credentials you entered and make web accessible resources available without a basic authentication prompt.
