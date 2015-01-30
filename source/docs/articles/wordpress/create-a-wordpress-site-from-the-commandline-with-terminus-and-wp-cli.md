---
title: Use the Command Line to Create a WordPress Site Using Terminus and WP-CLI
description: Learn how to install and use Terminus and WP-CLI to control a WordPress site on Pantheon
draft: true
---

Many developers feel more at home at the command line than they do using Windows. Edit a text file, issue a command, and bang—you've completed your task. There's just something about doing it all from the command line that makes it a little more exciting.

Until recently, WordPress did not have a good answer to Drupal's drush tool. Thankfully, it does now: **wp-cli**. 

WP-CLI is a tool used to manage a WordPress installation. However, don't think of it as a simple backup or search and replace tool. Yes, it can do those things, but it's so much more than that. This guide will walk you through creating and configuring a site using nothing but WP-CLI and Pantheon's Terminus.

## Before You Begin

Be sure that you:

- Are familiar with your operating system's command line. 
- Are using a Unix-based system (Linux or Mac OS X). Windows commands may vary slightly. 
- Have created a [Pantheon account](https://dashboard.getpantheon.com/register). Pantheon accounts are always free for development.

## Install Terminus
To use WP-CLI to manage your WordPress powered site hosted on Pantheon, you first need to install Pantheon's command line tool, **terminus**. Terminus gives you access to your Pantheon account and sites, and allows you to execute WP-CLI commands on those sites. To install terminus, follow the [basic installation instructions](https://github.com/pantheon-systems/cli/wiki/Installation).

Once installed, test it using the following command:

```
$ terminus art
```

![The Pantheon logo represented in ASCII art](/source/docs/assets/images/command-line-terminus-art.png)

If you see the Pantheon fist bolt, you'll know that terminus is installed properly.    


## Log In To Pantheon

Now we need to tell terminus who you are. You can do that with the auth command:

```
$ terminus auth login your@email.tld
```

You'll need to enter your password. If you are scripting a process, you can use the ``--password`` argument to pass your password in on the command line. However, this means your password will be visible in both your script and in your command line's history. You;ll know it's successful when you see the Pantheon logo.

## Create a Site

Open a browser and log in to your Pantheon dashboard so you can see the progress being made on some of the commands.

Creating a site is a function of the Pantheon API, not WP-CLI; however, Terminus handles both for us. The first thing you need is your Organization ID. This is a long, hexadecimal GUI assigned to your organization. Use this command to list the organizations of which you are part of.

```
$ terminus organizations list
```

You'll see the human readable name and the ID. If you're a member of more than one organization, select the ID of the organization you want to use when creating your WordPress site.

Next, you need a Product ID. This is an internal Pantheon GUID for the different systems that you can install. Use this command to see the complete list:

```
$ terminus products list 
```

Since these are assigned by Pantheon and used by all customers, they never change. Therefore, the one to look for is: ``e8fe8550-1ab9-4964-8838-2b9abdccf4bf``    

Now you need to create a site name. This can be anything you want it to be, however it can only contain letters and dashes, and must be unique. Next, create the label. The label is the human readable version of the name. It can be anything you like, but it's best to keep it simple.

For your test site, use the following:
- *Site Name* = cli-test
- *Label* = Command Line Test

Terminus is broken up into a series of command modules, each with its on set of sub-commands. To create a site, use the ``sites`` command and the ``create`` sub-command in the format shown below:

```
$ terminus sites create [--product=<productid>] [--name=<name>] [--label=<label>] [--org=<org>] [--import=<url>]
```

Using the values shown above looks like this:

```
$ terminus sites create --product=e8fe8550-1ab9-4964-8838-2b9abdccf4bf --name=cli-test --label="Command Line Test" --org=YOUR-ORG-ID 
```

Just like when you create a site from your dashboard, this will only take a few minutes. You will see a status bar as terminus spins up your new WordPress installation. Once complete, you will be notified that you site is ready to go. 

![Screenshot of the results of creating a new site with Pantheon's terminus](/source/docs/assets/images/command-line-terminus-create-site.png)

Your site is now set up on Pantheon! There's just a couple of things we need to do before it's done. Go to your Dashboard and refresh it, and you'll see your new site. 

![Screenshot of the Pantheon Unicorn letting you know that your site is ready to finish setting up](/source/docs/assets/images/pantheon-unicorn-wordpress-site-is-ready-to-be-setup.png)

Notice that instead of a screenshot of a WordPress powered site, you have the Pantheon Magic Unicorn telling you that your site is ready to set up. 


# Set Up Your Site

Now that WordPress is there, it's time for the famous "5-minute install", only it won't take us five minutes and you don't need anything but use the command line. There's even a wp-config.php already created and ready to use. 

All you need to do now is populate the database and your site will be ready to use. Go to WP-CLI through Terminus, and use the ``wp core install`` command. For this to work, it's necessary that you understand the [wp-cli core install](http://wp-cli.org/commands/core/install/) command. The format is:

```
$ terminus wp core install --url=the.url.of.your.dev.site --title="Command Line Test Site" --admin_user=admin --admin_password=something_incredibly_secure --admin_email=your@emailaddress.tld --site=the-name-of-your-site
```

 With a little bash magic, you can use Terminus to get the URL of your site:

```
$ echo "http://`terminus site hostnames list --site=cli-test --env=dev --bash | awk '{print $1}`"
```

Or you can simply use the format ``http://dev-SITE_NAME.pantheon.io``.

To populate the database of the site you created above, use the following command:

```
$ terminus wp core install --url=http://dev-cli-test.pantheon.io --title="Command Line Test" --admin_user=admin --admin_password=pantheon.rocks --admin_email=bob@example.com --site=cli-test
```

If everything goes as planned, you'll see this message:

```
Success: WordPress installed successfully.
```

Now go to you Dashboard and click the "Command Line Test" site. There's not much to see at this point since we've only just created the site. However, click **Visit Development Site**, and you'll see a WordPress install ready for you to start creating your site.

# Upload Images and Modify Posts
Now that you have a stock WordPress install, let's make it look a little better. WP-CLI can do a number of things to manipulate a WordPress install. The best sites are the ones with images, but sadly the stock WordPress installation doesn't come with any.

Using WP-CLI gives us the ability to upload images and modify posts. In this case, you can do both at once. The following command will add a featured image to the Hello Word post that WordPress installs automatically. 

You can see the full documentation for ``media import`` on the [wp-cli media import documentation page](http://wp-cli.org/commands/media/import/). Since you're using the ``--featured_image`` flag, you also need to pass the ``post_id``. You can pass in either the URL of an image or a local filename to ``media import``. Understand that in this case, "local" means it's already uploaded to your site. Our command to upload an image and set it as the featured image of post #1 looks like this:


```
$ terminus wp media import https://farm8.staticflickr.com/7355/16204225167_1e1bb198e5_b.jpg --post_id=\"1\" --featured_image --site=cli-test
```

After a successful upload you'll see this message:

```
Success: Imported file https://farm8.staticflickr.com/7552/15827270506_ce62e709c9_o_d.jpg as attachment ID 3 and attached to post 1 as featured image.
```

Now, go to your browser and refresh the site (not your dashboard) to see the new image.    


# Add a New Theme
So far, so good. Many will stop there and start updating the content. There is one more thing we need to do to make this site more appealing, and that is to add a better looking theme. Once again, you can do this all without touching WordPress or your Pantheon Dashboard. 

WordPress has a plethora of free and paid themes you can install to customize your site. We've chosen one from the [WordPress.org Themes Repository](https://WordPress.org/themes/) named [Pinboard](https://WordPress.org/themes/pinboard).   
**Note:** There is no need to download the theme first, WP-CLI will pull it for us from WordPress.org.

Position your Pantheon dashboard window where you can see it while working in the terminal. To install and activate the new theme to your site, use the following command:


```
$ terminus wp theme install --activate --site=cli-test https://downloads.WordPress.org/theme/pinboard.1.1.12.zip
```

Before you go to your site, look at your Dashboard to see that you have uncommitted changes. 

![Screenshot of the pantheon dashboard showing uncommitted changes](/source/docs/assets/images/pantheon-dashboard-uncommitted-changes.png)

We can commit the changes to your site's repo through Terminus, without the help of WP-CLI. First, make sure that you position your browser so that you can see it while in your terminal. As soon as you issue the command, things will update in the browser.

```
$ terminus site code commit --site=cli-6 --env=dev --message="I never have to touch the interface again" --yes --branchname=master
```

Terminus connects to Pantheon's API, which makes real-time updates to any dashboard you have open. The things you do in Terminus are immediately represented in your dashboard, so it is always up to date.

Now that we've committed our changes, go back to your test site in the browser and refresh it to see what you've created.

![Screenshot of the final website created following the steps in this guide](/source/docs/assets/images/pantheon-final-command-line-test-site.png)


# The Power of Terminus and WP-CLI

If you're a developer who lives in the command line, you now see the power of Terminus and WP-CLI. This guide has just scratched the surface of what can be done. Terminus provides the power to manage most aspects of your Pantheon sites, while tools like WP-CLI (and drush for Drupal) give you the power to manage the inner workings of your WordPress powered site. Now you're ready to take the sandbox site we've setup and explore on your own to see what else is possible. 
