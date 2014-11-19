---
title: Locking your site
filename: source/_common-tasks/locking-your-site.md
---

 **NOTE: When a dev environment is locked, a lock icon will be added to the screenshot of a site on the Your Sites page.**

There are occasions while you are work on your Drupal site that  you would like to keep your progress hidden from the world as you prepare to Go Live or possibly make updates.

This can be done by putting a username and password on the environment similar to basic authentication on Apache. If a request for a resource on your environment is received and the site is _private_ the requesting client will have to supply the authentication credentials you set in order to access the site.

## Password protect your site's environments
 

You have the ability to password protect any of the available environments.

- Select the environment (e.g. Test)
- Select "Security"
- Select "Locked"
- Choose a username and password
- Click "Lock Environment"

![Lock environment](https://pantheon-systems.desk.com/customer/portal/attachments/305964)

If other members of your team on the site need to access the site, they will also be able to view the authentication credentials when they log in to their accounts.

![Credentials](https://pantheon-systems.desk.com/customer/portal/attachments/305968)

Now when your page refreshes you will notice that the environment is now "Private". You will also be able to see the credentials needed to access that environment.

In the event you want to set a different username and password for each environment you do so. This is important if you only want the Live site publicly viewable, while Dev and Test can be private as you work on your code and content.

To verify that everything is working correctly try and visit the URL of the environment that you have made private. You should see a authentication form where you can enter the username and password for that environment to start your session.  
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/62465)
## Unlock a site's environment
 

When you are ready to make your environment public again you can do so. This will clear the credentials you entered and make and web accessible resources available without a basic authentication prompt.

##  
